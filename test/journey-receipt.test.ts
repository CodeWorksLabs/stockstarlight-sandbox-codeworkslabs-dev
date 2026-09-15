import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import {
	clearPendingJourneyReceiptIfCurrent,
	clearJourneyReceipt,
	consumeJourneyReceipt,
	createJourneyHandoffUrl,
	createJourneyReceipt,
	isCurrentJourneyReceipt,
	JOURNEY_DESTINATION_PATH,
	JOURNEY_HANDOFF_PATH,
	JOURNEY_RECEIPT_MAX_AGE_MS,
	persistJourneyReceipt,
	validateJourneyTrackResult,
} from '../src/lib/journey-receipt.ts';

const storageKey = 'journey';

function memoryStorage(
	initial: string | null = null,
	removeMode: 'normal' | 'throw' | 'noop' = 'normal',
	setMode: 'normal' | 'throw' | 'noop' = 'normal',
) {
	let value = initial;
	return {
		get value() { return value; },
		getItem(key: string) {
			assert.equal(key, storageKey);
			return value;
		},
		removeItem(key: string) {
			assert.equal(key, storageKey);
			if (removeMode === 'throw') throw new Error('remove failed');
			if (removeMode === 'normal') value = null;
		},
		setItem(key: string, next: string) {
			assert.equal(key, storageKey);
			if (setMode === 'throw') throw new Error('set failed');
			if (setMode === 'normal') value = next;
		},
	};
}

const completedReceipt = (journeyId: string, now: number, destinationHref = 'https://example.test/analytics/next/') => ({
	...createJourneyReceipt(journeyId, 'fathom', {
		ok: true,
		providers: { fathom: { ok: true }, plausible: { ok: true } },
	}, now),
	phase: 'handoff' as const,
	handoffAt: now,
	destinationHref,
});

test('source timeout clears only its own still-pending attempt', () => {
	const oldReceipt = createJourneyReceipt('old-attempt', 'fathom', { ok: true }, 1);
	const oldStorage = memoryStorage(JSON.stringify(oldReceipt));
	assert.equal(clearPendingJourneyReceiptIfCurrent(oldStorage, storageKey, 'old-attempt'), true);
	assert.equal(oldStorage.value, null);

	const newerReceipt = createJourneyReceipt('new-attempt', 'fathom', { ok: true }, 2);
	const newerSerialized = JSON.stringify(newerReceipt);
	const newerStorage = memoryStorage(newerSerialized);
	assert.equal(clearPendingJourneyReceiptIfCurrent(newerStorage, storageKey, 'old-attempt'), false);
	assert.equal(newerStorage.value, newerSerialized);

	const advancedSerialized = JSON.stringify(completedReceipt('old-attempt', 3));
	const advancedStorage = memoryStorage(advancedSerialized);
	assert.equal(clearPendingJourneyReceiptIfCurrent(advancedStorage, storageKey, 'old-attempt'), false);
	assert.equal(advancedStorage.value, advancedSerialized);
});

test('source creates only a same-origin token-bound analytics-free handoff URL', () => {
	const href = createJourneyHandoffUrl(
		'https://example.test/analytics/handoff/?keep=yes#result',
		'journey-1',
		'https://example.test',
	);
	assert.equal(href, 'https://example.test/analytics/handoff/?keep=yes&cwl_journey=journey-1#result');
	assert.throws(() => createJourneyHandoffUrl('https://example.test/analytics/next/', 'journey-1', 'https://example.test'));
	assert.throws(() => createJourneyHandoffUrl('https://other.test/analytics/handoff/', 'journey-1', 'https://example.test'));
});

test('clean destination consumes a recent handoff exactly once', () => {
	const now = 10_000;
	const destination = 'https://example.test/analytics/next/?keep=yes#result';
	const receipt = completedReceipt('journey-2', now, destination);
	const storage = memoryStorage(JSON.stringify(receipt));
	const referrer = 'https://example.test/analytics/handoff/?keep=yes';
	assert.equal(isCurrentJourneyReceipt(receipt, JOURNEY_DESTINATION_PATH, receipt.journeyId, now), true);
	assert.deepEqual(consumeJourneyReceipt(storage, storageKey, destination, referrer, now), receipt);
	assert.equal(storage.value, null);
	assert.throws(() => consumeJourneyReceipt(storage, storageKey, destination, referrer, now), /Missing journey receipt/);
});

test('direct, mismatched, token-bearing, stale, future, and pending destinations fail closed', () => {
	const now = 30_000;
	const destination = 'https://example.test/analytics/next/';
	const referrer = 'https://example.test/analytics/handoff/';
	const receipt = completedReceipt('journey-3', now);
	const rejects = (stored: unknown, href = destination, from = referrer, at = now) =>
		assert.throws(() => consumeJourneyReceipt(memoryStorage(JSON.stringify(stored)), storageKey, href, from, at));
	rejects(receipt, destination, '');
	rejects(receipt, destination, 'https://other.test/analytics/handoff/');
	rejects(receipt, destination + '?cwl_journey=journey-3');
	rejects(receipt, destination + '?keep=1', referrer);
	rejects({ ...receipt, destinationHref: destination + '?different=1' });
	rejects({ ...receipt, handoffAt: now - 10_001 });
	rejects({ ...receipt, handoffAt: now + 1 });
	rejects(createJourneyReceipt('journey-3', 'fathom', { ok: true }, now));
	rejects(receipt, destination, referrer, now + JOURNEY_RECEIPT_MAX_AGE_MS + 1);
});

test('storage postconditions are required for persistence, recovery, and consumption', () => {
	const pending = createJourneyReceipt('journey-4', 'fathom', { ok: true }, 40_000);
	const normal = memoryStorage();
	persistJourneyReceipt(normal, storageKey, pending);
	assert.doesNotThrow(() => clearJourneyReceipt(normal, storageKey));
	assert.throws(() => persistJourneyReceipt(memoryStorage(null, 'normal', 'noop'), storageKey, pending), /not persisted/);
	assert.throws(() => persistJourneyReceipt(memoryStorage(null, 'normal', 'throw'), storageKey, pending), /set failed/);
	assert.throws(() => clearJourneyReceipt(memoryStorage('stale', 'noop'), storageKey), /not cleared/);
	assert.throws(() => clearJourneyReceipt(memoryStorage('stale', 'throw'), storageKey), /remove failed/);
	const receipt = completedReceipt('journey-4', 40_000);
	assert.throws(() => consumeJourneyReceipt(
		memoryStorage(JSON.stringify(receipt), 'noop'),
		storageKey,
		'https://example.test/analytics/next/',
		'https://example.test/analytics/handoff/',
		40_000,
	), /not cleared/);
});

test('provider results require exact shapes, membership, and aggregate consistency', () => {
	const valid = (response: unknown, provider = 'fathom') =>
		validateJourneyTrackResult({ selectedProvider: provider, response }, ['fathom', 'plausible']);
	assert.deepEqual(valid({ ok: true, providers: { fathom: { ok: true }, plausible: { ok: true } } }), [
		['fathom', { ok: true }], ['plausible', { ok: true }],
	]);
	assert.deepEqual(valid({ ok: false, providers: { fathom: { ok: true }, plausible: { ok: false, reason: 'consent-pending' } } }), [
		['fathom', { ok: true }], ['plausible', { ok: false, reason: 'consent-pending' }],
	]);
	const invalid = [
		{ ok: true, providers: { fathom: { ok: true }, plausible: { ok: true } }, extra: true },
		{ ok: true, providers: { fathom: { ok: true, reason: 'invalid-event' }, plausible: { ok: true } } },
		{ ok: false, providers: { fathom: { ok: true }, plausible: { ok: false } } },
		{ ok: false, providers: { fathom: { ok: true }, plausible: { ok: false, reason: 'bogus' } } },
		{ ok: true, providers: { fathom: { ok: true }, plausible: { ok: false, reason: 'invalid-event' } } },
		{ ok: false, providers: { fathom: { ok: true } } },
		{ ok: false, providers: { fathom: { ok: true }, plausible: { ok: false, reason: 'invalid-event' }, umami: { ok: true } } },
		{ ok: false, providers: { fathom: { ok: true }, plausible: { ok: false, reason: 'invalid-event' } }, reason: 'invalid-event' },
	];
	for (const response of invalid) assert.throws(() => valid(response));
	assert.throws(() => valid({ ok: false, providers: { fathom: { ok: false, reason: 'invalid-event' }, plausible: { ok: true } } }));
});

function runHandoff(
	html: string,
	receipt: ReturnType<typeof createJourneyReceipt>,
	historyMode: 'normal' | 'throw' | 'noop' = 'normal',
	setMode: 'normal' | 'throw' | 'noop' = 'normal',
	navigationMode: 'normal' | 'throw' | 'noop' = 'normal',
) {
	const source = html.slice(html.indexOf('<script>') + 8, html.indexOf('</script>'));
	let stored: string | null = JSON.stringify(receipt);
	const location = {
		href: `https://example.test${JOURNEY_HANDOFF_PATH}?keep=yes&cwl_journey=${receipt.journeyId}#result`,
		get pathname() { return new URL(this.href).pathname; },
		replace(url: string) {
			if (navigationMode === 'throw') throw new Error('navigation failed');
			if (navigationMode === 'normal') this.href = url;
		},
	};
	const timers: Array<{ callback: () => void; delay: number }> = [];
	const status = { textContent: '' };
	const sessionStorage = {
		getItem: () => stored,
		removeItem: () => { stored = null; },
		setItem: (_key: string, value: string) => {
			if (setMode === 'throw') throw new Error('set failed');
			if (setMode === 'normal') stored = value;
		},
	};
	const history = {
		state: { preserved: true },
		replaceState(_state: unknown, _unused: string, url: string) {
			if (historyMode === 'throw') throw new Error('history failed');
			if (historyMode === 'normal') location.href = new URL(url, location.href).href;
		},
	};
	const window = { location, sessionStorage, history, setTimeout: (callback: () => void, delay: number) => timers.push({ callback, delay }) };
	vm.runInNewContext(source, {
		URL,
		Date,
		JSON,
		Number,
		Reflect,
		document: { getElementById: () => status },
		history,
		sessionStorage,
		window,
	});
	return { location, status, get stored() { return stored; }, timers };
}

test('analytics-free handoff strips identity before redirect and fails closed on browser no-ops', () => {
	const html = readFileSync(new URL('../public/analytics/handoff/index.html', import.meta.url), 'utf8');
	const receipt = createJourneyReceipt('early', 'fathom', { ok: true }, Date.now());
	const normal = runHandoff(html, receipt);
	assert.equal(normal.location.href, 'https://example.test/analytics/next/?keep=yes#result');
	assert.equal(JSON.parse(normal.stored ?? '{}').phase, 'handoff');
	assert.equal(JSON.parse(normal.stored ?? '{}').destinationHref, normal.location.href);
	assert.equal(normal.timers[0]?.delay, JOURNEY_RECEIPT_MAX_AGE_MS + 1);
	normal.timers[0]?.callback();
	assert.notEqual(normal.stored, null);
	for (const mode of ['noop', 'throw'] as const) {
		const failed = runHandoff(html, receipt, mode);
		assert.equal(failed.location.pathname, JOURNEY_HANDOFF_PATH);
		assert.equal(failed.stored, null);
		assert.match(failed.status.textContent, /could not be verified/);
	}
	const setFailed = runHandoff(html, receipt, 'normal', 'noop');
	assert.equal(setFailed.location.pathname, JOURNEY_HANDOFF_PATH);
	assert.equal(setFailed.stored, null);
	const noNavigation = runHandoff(html, receipt, 'normal', 'normal', 'noop');
	assert.notEqual(noNavigation.stored, null);
	noNavigation.timers[0]?.callback();
	assert.equal(noNavigation.stored, null);
	assert.match(noNavigation.status.textContent, /did not complete/);
	const thrownNavigation = runHandoff(html, receipt, 'normal', 'normal', 'throw');
	assert.equal(thrownNavigation.stored, null);
	assert.doesNotMatch(html, /astroAnalytics|fathom|plausible|gtag|matomo|umami/i);
});

test('actual source and destination UI use the isolated handoff boundary', () => {
	const source = readFileSync(new URL('../src/components/AnalyticsJourney.astro', import.meta.url), 'utf8');
	assert.match(source, /href="\/analytics\/handoff\/"/);
	assert.match(source, /createJourneyHandoffUrl\(next\.href, journeyId, window\.location\.origin\)/);
	assert.match(source, /JOURNEY_RECEIPT_MAX_AGE_MS \+ 1/);
	assert.match(source, /const journeyStorageKey = 'cwl-starlight-journey-result'/);
	assert.match(source, /clearPendingJourneyReceiptIfCurrent\(sessionStorage, journeyStorageKey, journeyId\)/);
	assert.doesNotMatch(source, /cwl-astro-journey-result/);
	assert.match(source, /navigation did not complete/);
	assert.match(source, /expired receipt could not be cleared/);
	const handler = source.slice(source.indexOf("next?.addEventListener('click'"));
	assert.ok(handler.indexOf('if (outcomeLocked) return;') < handler.indexOf("track('cwl_"));
	const destination = readFileSync(new URL('../src/components/AnalyticsReceipt.astro', import.meta.url), 'utf8');
	assert.match(destination, /document\.referrer/);
	assert.doesNotMatch(destination, /journey-handoff-prelude|JOURNEY_ID_PARAMETER|history\.replaceState/);
});
