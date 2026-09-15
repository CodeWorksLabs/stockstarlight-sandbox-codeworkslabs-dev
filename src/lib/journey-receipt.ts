const RECEIPT_VERSION = 4;
export const JOURNEY_SOURCE_PATH = '/analytics/';
export const JOURNEY_HANDOFF_PATH = '/analytics/handoff/';
export const JOURNEY_DESTINATION_PATH = '/analytics/next/';
export const JOURNEY_ID_PARAMETER = 'cwl_journey';
export const JOURNEY_RECEIPT_MAX_AGE_MS = 120_000;

type JourneyStorage = Pick<Storage, 'getItem' | 'removeItem'>;
type JourneyWritableStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export const JOURNEY_PROVIDER_NAMES = ['fathom', 'google-analytics', 'plausible', 'matomo', 'umami'] as const;
export type JourneyProviderName = typeof JOURNEY_PROVIDER_NAMES[number];
const PROVIDER_FAILURE_REASONS = ['adapter-not-loaded', 'consent-pending', 'invalid-event'] as const;
type ProviderFailureReason = typeof PROVIDER_FAILURE_REASONS[number];
type ValidatedProviderResult = { ok: true } | { ok: false; reason: ProviderFailureReason };

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null && !Array.isArray(value);

const hasExactKeys = (value: Record<string, unknown>, keys: readonly string[]) => {
	const actual = Reflect.ownKeys(value);
	return actual.length === keys.length && keys.every((key) => actual.includes(key));
};

export function createJourneyReceipt(
	journeyId: string,
	selectedProvider: string,
	response: unknown,
	createdAt: number,
) {
	if (journeyId.length === 0 || journeyId.length > 128 || !Number.isSafeInteger(createdAt)) {
		throw new TypeError('Invalid journey receipt identity');
	}
	return {
		version: RECEIPT_VERSION,
		journeyId,
		createdAt,
		sourcePath: JOURNEY_SOURCE_PATH,
		destinationPath: JOURNEY_DESTINATION_PATH,
		selectedProvider,
		response,
		phase: 'pending' as const,
	};
}

type PendingJourneyReceipt = ReturnType<typeof createJourneyReceipt>;
type HandoffJourneyReceipt = Omit<PendingJourneyReceipt, 'phase'> & {
	phase: 'handoff';
	handoffAt: number;
	destinationHref: string;
};

export function createJourneyHandoffUrl(handoffHref: string, journeyId: string, expectedOrigin: string): string {
	if (journeyId.length === 0 || journeyId.length > 128) throw new TypeError('Invalid journey identity');
	const handoff = new URL(handoffHref);
	if (handoff.origin !== expectedOrigin || handoff.pathname !== JOURNEY_HANDOFF_PATH) {
		throw new TypeError('Invalid journey handoff');
	}
	handoff.searchParams.set(JOURNEY_ID_PARAMETER, journeyId);
	return handoff.href;
}

export function isCurrentJourneyReceipt(
	value: unknown,
	currentPath: string,
	journeyId: string,
	now: number,
): value is HandoffJourneyReceipt {
	if (!isRecord(value) ||
		!hasExactKeys(value, ['version', 'journeyId', 'createdAt', 'sourcePath', 'destinationPath', 'selectedProvider', 'response', 'phase', 'handoffAt', 'destinationHref']) ||
		value.version !== RECEIPT_VERSION ||
		typeof value.journeyId !== 'string' ||
		value.journeyId !== journeyId ||
		value.journeyId.length === 0 ||
		value.journeyId.length > 128 ||
		!Number.isSafeInteger(value.createdAt) ||
		typeof value.createdAt !== 'number' ||
		value.createdAt > now ||
		now - value.createdAt > JOURNEY_RECEIPT_MAX_AGE_MS ||
		value.sourcePath !== JOURNEY_SOURCE_PATH ||
		value.destinationPath !== JOURNEY_DESTINATION_PATH ||
		value.phase !== 'handoff' ||
		typeof value.destinationHref !== 'string' ||
		!Number.isSafeInteger(value.handoffAt) ||
		typeof value.handoffAt !== 'number' ||
		value.handoffAt < value.createdAt ||
		value.handoffAt > now ||
		now - value.handoffAt > 10_000 ||
		currentPath !== JOURNEY_DESTINATION_PATH) return false;
	return true;
}

export function persistJourneyReceipt(
	storage: JourneyWritableStorage,
	storageKey: string,
	receipt: PendingJourneyReceipt,
): void {
	const serialized = JSON.stringify(receipt);
	storage.setItem(storageKey, serialized);
	if (storage.getItem(storageKey) !== serialized) throw new TypeError('Journey receipt was not persisted');
}

export function clearJourneyReceipt(storage: JourneyStorage, storageKey: string): void {
	storage.removeItem(storageKey);
	if (storage.getItem(storageKey) !== null) throw new TypeError('Journey receipt was not cleared');
}

export function clearPendingJourneyReceiptIfCurrent(
	storage: JourneyStorage,
	storageKey: string,
	journeyId: string,
): boolean {
	if (journeyId.length === 0 || journeyId.length > 128) return false;
	const stored = storage.getItem(storageKey);
	if (stored === null) return false;
	let receipt: unknown;
	try { receipt = JSON.parse(stored); } catch { return false; }
	if (!isRecord(receipt) ||
		!hasExactKeys(receipt, ['version', 'journeyId', 'createdAt', 'sourcePath', 'destinationPath', 'selectedProvider', 'response', 'phase']) ||
		receipt.version !== RECEIPT_VERSION ||
		receipt.journeyId !== journeyId ||
		receipt.phase !== 'pending' ||
		receipt.sourcePath !== JOURNEY_SOURCE_PATH ||
		receipt.destinationPath !== JOURNEY_DESTINATION_PATH) return false;
	clearJourneyReceipt(storage, storageKey);
	return true;
}

export function validateJourneyTrackResult(
	receipt: Pick<PendingJourneyReceipt, 'selectedProvider' | 'response'>,
	configuredProviders: readonly string[],
): Array<[JourneyProviderName, ValidatedProviderResult]> {
	if (!JOURNEY_PROVIDER_NAMES.includes(receipt.selectedProvider as JourneyProviderName) ||
		!configuredProviders.includes(receipt.selectedProvider) ||
		configuredProviders.length === 0 ||
		new Set(configuredProviders).size !== configuredProviders.length ||
		configuredProviders.some((provider) => !JOURNEY_PROVIDER_NAMES.includes(provider as JourneyProviderName)) ||
		!isRecord(receipt.response) ||
		(!hasExactKeys(receipt.response, ['ok', 'providers']) &&
			!hasExactKeys(receipt.response, ['ok', 'providers', 'reason'])) ||
		!isRecord(receipt.response.providers)) throw new TypeError('Invalid journey result');

	const providerKeys = Reflect.ownKeys(receipt.response.providers);
	if (providerKeys.length !== configuredProviders.length ||
		configuredProviders.some((provider) => !providerKeys.includes(provider))) {
		throw new TypeError('Invalid journey provider set');
	}

	const entries: Array<[JourneyProviderName, ValidatedProviderResult]> = [];
	let failures = 0;
	let sharedReason: ProviderFailureReason | undefined;
	for (const provider of configuredProviders) {
		const outcome = Reflect.get(receipt.response.providers, provider) as unknown;
		if (!isRecord(outcome)) throw new TypeError('Invalid provider result');
		if (hasExactKeys(outcome, ['ok']) && outcome.ok === true) {
			entries.push([provider as JourneyProviderName, { ok: true }]);
			continue;
		}
		if (!hasExactKeys(outcome, ['ok', 'reason']) || outcome.ok !== false ||
			typeof outcome.reason !== 'string' ||
			!PROVIDER_FAILURE_REASONS.includes(outcome.reason as ProviderFailureReason)) {
			throw new TypeError('Invalid provider result');
		}
		failures += 1;
		const reason = outcome.reason as ProviderFailureReason;
		sharedReason = failures === 1 ? reason : sharedReason === reason ? reason : undefined;
		entries.push([provider as JourneyProviderName, { ok: false, reason }]);
	}

	const allAccepted = failures === 0;
	if (receipt.response.ok !== allAccepted) throw new TypeError('Inconsistent journey result');
	if (allAccepted && Reflect.has(receipt.response, 'reason')) throw new TypeError('Unexpected journey result reason');
	if (!allAccepted && Reflect.has(receipt.response, 'reason')) {
		const reason = receipt.response.reason;
		if (typeof reason !== 'string' || failures !== configuredProviders.length || sharedReason !== reason) {
			throw new TypeError('Inconsistent journey result reason');
		}
	}
	const selected = entries.find(([provider]) => provider === receipt.selectedProvider)?.[1];
	if (selected?.ok !== true) throw new TypeError('Selected provider did not accept event');
	return entries;
}

export function consumeJourneyReceipt(
	storage: JourneyStorage,
	storageKey: string,
	currentHref: string,
	referrer: string,
	now: number,
): HandoffJourneyReceipt {
	const currentUrl = new URL(currentHref);
	if (currentUrl.pathname !== JOURNEY_DESTINATION_PATH || currentUrl.searchParams.has(JOURNEY_ID_PARAMETER)) {
		throw new TypeError('Invalid clean journey destination');
	}
	const handoffUrl = new URL(referrer);
	if (handoffUrl.origin !== currentUrl.origin || handoffUrl.pathname !== JOURNEY_HANDOFF_PATH ||
		handoffUrl.searchParams.has(JOURNEY_ID_PARAMETER)) throw new TypeError('Missing clean journey handoff');
	if (handoffUrl.search !== currentUrl.search) throw new TypeError('Journey handoff destination mismatch');
	const stored = storage.getItem(storageKey);
	if (stored === null) throw new TypeError('Missing journey receipt');
	const receipt: unknown = JSON.parse(stored);
	if (!isRecord(receipt) || typeof receipt.journeyId !== 'string' ||
		!isCurrentJourneyReceipt(receipt, currentUrl.pathname, receipt.journeyId, now)) {
		throw new TypeError('Invalid journey receipt');
	}
	if (receipt.destinationHref !== currentUrl.href) throw new TypeError('Journey receipt destination mismatch');
	clearJourneyReceipt(storage, storageKey);
	return receipt;
}
