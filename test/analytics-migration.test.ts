import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import test from 'node:test';
import vm from 'node:vm';
import type { AstroIntegration } from 'astro';
import { starlightAnalytics } from '@codeworkslabs/astro-analytics/starlight';
import { consentFixture } from '../fixtures/analytics-consent.ts';
import * as journey from '../src/lib/journey-receipt.ts';

test('accepted artifact, source manifest, dependency, lock and workflow pin agree', () => {
	const manifest = JSON.parse(readFileSync(new URL('../analytics-source.json', import.meta.url), 'utf8'));
	const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
	const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url), 'utf8'));
	const entry = lock.packages['node_modules/@codeworkslabs/astro-analytics'];
	const bytes = readFileSync(new URL(`../vendor/${manifest.tarball}`, import.meta.url));
	assert.equal(manifest.commit, '3a58043a6cc22a8778cc5c1d17cd9e15531d2bb3');
	assert.equal(manifest.ref, manifest.commit);
	assert.equal(manifest.version, '0.1.0-alpha.23');
	assert.equal(bytes.length, 32752);
	assert.equal(createHash('sha256').update(bytes).digest('hex'), '190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127');
	assert.equal(manifest.sha256, createHash('sha256').update(bytes).digest('hex'));
	assert.equal(manifest.integrity, `sha512-${createHash('sha512').update(bytes).digest('base64')}`);
	assert.equal(entry.version, manifest.version);
	assert.equal(entry.resolved, `file:vendor/${manifest.tarball}`);
	assert.equal(entry.integrity, manifest.integrity);
	assert.equal(pkg.dependencies['@codeworkslabs/astro-analytics'], entry.resolved);
	assert.ok(readFileSync(new URL('../.github/workflows/verify.yml', import.meta.url), 'utf8').includes(`ANALYTICS_COMMIT: ${manifest.commit}`));
});

test('ordinary site configuration keeps its IDs, immediate defaults and blocked-query/manual ownership', async () => {
	// Evaluate actual site options with the installed analytics wrapper. The
	// outer factories are captured; this is not the separately executed build.
	const configSource = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
	// Configuration records must be created in the same realm as the imported
	// integration, matching the actual Astro configuration-loader boundary.
	const evaluateConfig = new Function('defineConfig', 'starlight', 'starlightAnalytics',
		configSource.replace(/^import .*;\r?$/gm, '').replace('export default defineConfig(', 'return defineConfig('));
	const captured = evaluateConfig((options: unknown) => options, (options: unknown) => options, starlightAnalytics);
	const plugins = captured.integrations[0].plugins;
	assert.equal(plugins.length, 1);
	let integration: AstroIntegration | undefined;
	plugins[0].hooks['config:setup']({ addIntegration(value: AstroIntegration) { integration = value; } });
	assert.ok(integration);
	const injected: string[] = [];
	integration.hooks['astro:config:setup']?.({ command: 'build', injectScript(_stage: string, content: string) { injected.push(content); } } as never);
	assert.equal(injected.length, 1);
	const source = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
	assert.match(source, /blockedQueryParameters: \['cwl_journey'\]/);
	assert.match(source, /measurementId: 'G-SW9Z74X4XT'/);
	assert.match(source, /pageviews: 'astro'/);
	assert.match(source, /historyPageviewsDisabled: true/);
	assert.match(source, /mode: 'immediate'/);
	assert.match(source, /analyticsStorage: 'granted'/);
	assert.doesNotMatch(source, /fake\.invalid|deferred|external/);
});

for (const mode of ['deferred', 'external'] as const) {
	test(`${mode} fixture keeps pending/denied zero-load and grants without reload`, () => {
		for (const router of [false, true]) {
			const h = consentFixture(mode, router);
			h.boot();
			const client = h.context.astroAnalytics;
			assert.equal(h.scripts.length, 0);
			assert.equal(client.track('before_grant').reason, 'consent-pending');
			client.setConsent('denied'); client.setConsent('denied');
			assert.equal(h.scripts.length, 0);
			assert.equal(h.count(), 0);
			assert.equal(client.track('denied_event').reason, 'consent-denied');
			client.setConsent('granted'); client.setConsent('granted');
			assert.equal(h.scripts.length, 5);
			h.load();
			if (router) h.emit('astro:page-load');
			assert.ok(Object.values(client.status()).every((value) => value === 'ready'));
			assert.equal(h.run('astroAnalytics.track("fixture_event", {value: 2})').ok, true);
			client.setConsent('denied');
			const deniedCount = h.count();
			h.context.location.href = 'https://fixture.invalid/withdrawn';
			h.emit('astro:before-preparation'); h.emit('astro:page-load');
			assert.equal(client.track('after_withdrawal').reason, 'consent-denied');
			assert.equal(h.count(), deniedCount);
			client.setConsent('granted');
			assert.equal(client.track('after_regrant').ok, true);
			const resumedCount = h.count(); client.setConsent('granted');
			assert.equal(h.count(), resumedCount);
			assert.equal(h.scripts.length, 5);
		}
	});
}

test('blocked initial routes and later blocked grants create no fixture provider script', () => {
	const initial = consentFixture('deferred');
	initial.context.location.href = 'https://fixture.invalid/analytics/?cwl_journey=PRIVATE_TOKEN_VALUE';
	initial.boot();
	assert.equal(initial.scripts.length, 0);
	assert.equal(initial.context.astroAnalytics, undefined);
	const h = consentFixture('deferred'); h.boot();
	h.context.location.href = 'https://fixture.invalid/private?cwl_journey=PRIVATE_TOKEN_VALUE';
	h.emit('astro:page-load'); h.context.astroAnalytics.setConsent('granted');
	assert.equal(h.scripts.length, 0);
	assert.equal(h.count(), 0);
	h.context.location.href = 'https://fixture.invalid/clean'; h.emit('astro:page-load');
	assert.equal(h.scripts.length, 5); h.load();
	assert.equal(h.recorded().includes('PRIVATE_TOKEN_VALUE'), false);
});

test('simulated completed routes produce one manual GA pageview per push/replace/pop completion', () => {
	const h = consentFixture('immediate'); h.boot(); h.load();
	const pageviews = () => h.context.dataLayer.filter((args: ArrayLike<unknown>) => args[0] === 'event' && args[1] === 'page_view');
	assert.equal(pageviews().length, 0);
	h.emit('astro:page-load');
	assert.equal(pageviews().length, 1);
	for (const [index, action] of ['push', 'replace', 'pop'].entries()) {
		h.emit('astro:before-preparation');
		h.context.location.href = `https://fixture.invalid/${action}`;
		h.document.title = action;
		assert.equal(pageviews().length, index + 1);
		h.emit('astro:page-load');
		assert.equal(pageviews().length, index + 2);
		assert.equal(pageviews().at(-1)[2].page_location, h.context.location.href);
	}
	assert.ok(h.context.dataLayer.some((args: any[]) => args[0] === 'config' && args[2].send_page_view === false));
});

test('accepted denial survives script error and identical generated bootstrap re-entry', () => {
	const h = consentFixture('immediate'); h.boot();
	assert.equal(h.context.astroAnalytics.setConsent('denied').ok, true);
	for (const script of h.scripts) script.dispatch('error');
	h.boot(); h.boot();
	assert.equal(h.scripts.length, 5);
	assert.ok(Object.values(h.context.astroAnalytics.consent()).every((value) => value === 'denied'));
	assert.equal(h.context.astroAnalytics.track('blocked_retry').reason, 'consent-denied');
	h.context.astroAnalytics.setConsent('granted');
	assert.equal(h.scripts.length, 10);
});

test('the actual journey UI distinguishes denial and never sends a probe event to check readiness', () => {
	const file = readFileSync(new URL('../src/components/AnalyticsJourney.astro', import.meta.url), 'utf8');
	const script = file.slice(file.indexOf('<script>') + 8, file.indexOf('</script>'));
	const body = stripTypeScriptTypes(script.replace(/import\s+[\s\S]*?\sfrom\s+['"][^'"]+['"];?/g, ''), { mode: 'strip' });
	let runtimeStatus = 'consent-pending'; let tracked = 0; let stored: string | null = null; let destination = '';
	const polls: Array<() => void> = [];
	const clicks: Record<string, (event: any) => void> = {};
	const attributes = new Map<string, string>();
	const next = { href: 'https://fixture.invalid/analytics/handoff/', setAttribute: (name: string, value: string) => attributes.set(name, value), removeAttribute: (name: string) => attributes.delete(name), addEventListener: (name: string, fn: (event: any) => void) => { clicks[name] = fn; } };
	const output = { textContent: '' };
	const select = { value: 'fathom', disabled: false, replaceChildren() {}, addEventListener() {} };
	const window = { clearInterval() {}, setInterval(fn: () => void) { polls.push(fn); return 1; }, clearTimeout() {}, setTimeout() { return 1; }, addEventListener() {}, location: { origin: 'https://fixture.invalid', pathname: '/analytics/', assign(href: string) { destination = href; } } };
	vm.runInNewContext(body, {
		...journey, window, Date, crypto: { randomUUID: () => 'fixture-journey' },
		document: { querySelector: (selector: string) => selector === '[data-journey-next]' ? next : selector === '#journey-status' ? output : select, createElement: () => ({ value: '', textContent: '' }) },
		sessionStorage: { getItem: () => stored, removeItem() { stored = null; }, setItem(_key: string, value: string) { stored = value; } },
		configuredProviders: () => ['fathom'], providerStatuses: () => ({ fathom: runtimeStatus }),
		track() { tracked++; return { ok: true, providers: { fathom: { ok: true } } }; },
	});
	assert.match(output.textContent, /waiting for consent/);
	runtimeStatus = 'consent-denied'; polls.at(-1)!();
	assert.match(output.textContent, /consent is denied/);
	assert.doesNotMatch(output.textContent, /is loading/);
	assert.equal(attributes.get('aria-disabled'), 'true');
	clicks.click!({ preventDefault() {} });
	assert.equal(tracked, 0); assert.equal(destination, '');
	runtimeStatus = 'ready'; polls.at(-1)!();
	assert.equal(attributes.get('aria-disabled'), 'false');
	clicks.click!({ preventDefault() {} });
	assert.equal(tracked, 1);
	assert.match(destination, /\/analytics\/handoff\/\?cwl_journey=fixture-journey/);
});
