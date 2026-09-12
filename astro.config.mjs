// @ts-check
import { starlightAnalytics } from '@codeworkslabs/astro-analytics/starlight';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://stockstarlight.sandbox.codeworkslabs.dev',
	integrations: [
		starlight({
			title: 'My Docs',
			plugins: [
				starlightAnalytics({
					providers: [
						{ name: 'fathom', siteId: 'FRMRGPFB' },
						{
							name: 'plausible',
							scriptSrc: 'https://plausible.io/js/pa-CBnNKxrJQtEjbu5PVs0LA.js',
						},
						{
							name: 'google-analytics',
							measurementId: 'G-SW9Z74X4XT',
							consent: {
								mode: 'immediate',
								initial: {
									analyticsStorage: 'granted',
									adStorage: 'denied',
									adUserData: 'denied',
									adPersonalization: 'denied',
								},
							},
						},
					],
					events: true,
				}),
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' },
			],
			sidebar: [
				{ label: 'Guides', items: [{ label: 'Example Guide', slug: 'guides/example' }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
		}),
	],
});
