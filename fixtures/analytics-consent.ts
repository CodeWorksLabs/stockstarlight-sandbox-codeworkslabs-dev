import vm from 'node:vm';
import type { AstroIntegration } from 'astro';
import type { ConsentMode } from '@codeworkslabs/astro-analytics';
import { starlightAnalytics } from '@codeworkslabs/astro-analytics/starlight';

// Exercise the installed Starlight wrapper before the installed core injection.
function analytics(config: Parameters<typeof starlightAnalytics>[0]): AstroIntegration {
  let integration: AstroIntegration | undefined;
  starlightAnalytics(config).hooks['config:setup']?.({
    addIntegration(value: AstroIntegration) { integration = value; },
  } as never);
  if (!integration) throw new Error('Starlight did not add the analytics integration');
  return integration;
}

/** Synthetic, process-local fixture. None of these scripts is fetched/executed. */
export function consentFixture(mode: ConsentMode, router = true) {
	const code: string[] = [];
	analytics({
		blockedQueryParameters: ['cwl_journey'],
		events: true,
		providers: [
			{ name: 'fathom', siteId: 'SYNTHETIC', scriptSrc: 'https://fake.invalid/fathom.js', consent: { mode } },
			{ name: 'plausible', scriptSrc: 'https://fake.invalid/plausible.js', consent: { mode } },
			{ name: 'google-analytics', measurementId: 'G-SYNTHETIC', scriptSrc: 'https://fake.invalid/google.js', pageviews: 'astro', historyPageviewsDisabled: true, consent: { mode, initial: { analyticsStorage: 'denied', adStorage: 'denied', adUserData: 'denied', adPersonalization: 'denied' } } },
			{ name: 'matomo', trackerUrl: 'https://fake.invalid/matomo.php', siteId: '1', eventCategory: 'Synthetic fixture', consent: { mode } },
			{ name: 'umami', websiteId: '00000000-0000-0000-0000-000000000001', scriptSrc: 'https://fake.invalid/umami.js', consent: { mode } },
		],
	}).hooks['astro:config:setup']?.({ command: 'build', injectScript(_stage: string, content: string) { code.push(content); } } as never);
	const scripts: Array<Record<string, any>> = [];
	const calls: Record<string, unknown[][]> = { fathom: [], plausible: [], umami: [] };
	const listeners = new Map<string, Array<() => void>>();
	const document = {
		title: 'Fixture landing', referrer: 'https://referrer.invalid/start', prerendering: false,
		addEventListener(name: string, listener: () => void) { listeners.set(name, [...(listeners.get(name) ?? []), listener]); },
		removeEventListener(name: string, listener: () => void) { listeners.set(name, (listeners.get(name) ?? []).filter((value) => value !== listener)); },
		querySelector() { return router ? {} : null; },
		getElementById(id: string) { return scripts.find((script) => script.id === id && script.isConnected); },
		createElement() {
			const handlers = new Map<string, Array<() => void>>();
			return {
				attributes: {} as Record<string, string>, isConnected: false,
				setAttribute(name: string, value: string) { this.attributes[name] = value; },
				getAttribute(name: string) { return this.attributes[name] ?? null; },
				addEventListener(name: string, listener: () => void) { handlers.set(name, [...(handlers.get(name) ?? []), listener]); },
				dispatch(name: string) { for (const listener of handlers.get(name) ?? []) listener(); },
				remove() { this.isConnected = false; },
			};
		},
		head: { appendChild(script: Record<string, any>) {
			if (new URL(script.src).hostname !== 'fake.invalid') throw new Error('Only synthetic fixture script URLs are allowed');
			script.isConnected = true; scripts.push(script);
		} },
	};
	const context = vm.createContext({ URL, document, location: { href: 'https://fixture.invalid/analytics/' } });
	const run = (source: string) => vm.runInContext(source, context, { timeout: 5_000 });
	const boot = () => run(code.join('\n'));
	const emit = (name: string) => { for (const listener of [...(listeners.get(name) ?? [])]) listener(); };
	const load = () => {
		context.fathom = { trackPageview: (...args: unknown[]) => calls.fathom!.push(['pageview', ...args]), trackEvent: (...args: unknown[]) => calls.fathom!.push(['event', ...args]) };
		const plausible: any = (...args: unknown[]) => calls.plausible!.push(args);
		plausible.l = true; context.plausible = plausible;
		context.umami = { track: (factory: (payload: object) => object) => calls.umami!.push(['track', factory({})]) };
		for (const script of scripts) if (script.isConnected && !script.loaded) { script.loaded = true; script.dispatch('load'); }
	};
	const count = () => Object.values(calls).reduce((total, rows) => total + rows.length, 0) + (context.dataLayer?.length ?? 0) + (context._paq?.length ?? 0);
	const recorded = () => JSON.stringify({ calls, google: context.dataLayer?.map((args: ArrayLike<unknown>) => Array.from(args)), matomo: context._paq });
	return { context, document, scripts, calls, run, boot, emit, load, count, recorded };
}
