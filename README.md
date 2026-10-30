# stockstarlight.sandbox.codeworkslabs.dev

The clean stock Astro + Starlight control used for CodeWorksLabs Astro product testing.

Production URL: https://stockstarlight.sandbox.codeworkslabs.dev/
Cloudflare Worker configuration name: `stockstarlight-sandbox-codeworkslabs-dev`

## Local verification

```sh
npm ci
npm audit --omit=dev
npm test
npm run check
npm run build
npm run deploy:dry-run
```

The dry run does not publish. Deployment is deliberately separate and requires explicit authorization.

## Historical Alpha.23 migration

The original Alpha.23 migration vendored its package with unchanged provider
IDs and ordinary immediate-consent defaults. GA4 uses Astro-owned pageviews
with Phil's 2026-10-28 operator attestation that history-pageview collection
is off. Read MIGRATION_ALPHA23.md for identity, provenance and local gate limits.
No deployment or independent provider verification is claimed.

Use Node 22.18.0 or later; verification uses Node 22.22.2 and npm 11.12.1.
The package-scoped Node test loader handles TypeScript source under node_modules.
Self-contained synthetic fixtures exercise the installed Starlight wrapper and
core with fake providers; simulated router events do not prove native behavior
or ingestion. Fixtures are not imported by pages and do not change defaults.

Local verification disables telemetry with ASTRO_TELEMETRY_DISABLED=1 and npm
update notices. Audits and Wrangler dry runs remain release gates, unexecuted
in this no-provider-traffic local phase.

## Dependency correction preflight

The 2026-10-28 corrected candidate pins Astro 7.3.3, Sharp 0.35.5 and Wrangler
4.155.0, with targeted compatible security updates in the lockfile. Starlight
remains 0.42.0. See DEPENDENCY_CORRECTION_20261028.md for fresh normal-install,
zero production/full audit, test/check/build/dry-run evidence and the separate
independent review. Earlier migration/audit records are historical. No push or
deployment is implied.

## Rights

Site software and content carry no repository-wide license unless a file explicitly states one. Artwork is not open licensed by publication or repository access. The public ownership wording is `© 2026 CodeWorksLabs, a WebSynergetics property.`

## Analytics RC.1 trial

The Analytics trial installs exact npm version `0.1.0-rc.1`. The source
manifest and committed reference tarball bind the registry dependency to the
reviewed release bytes; normal builds use the public registry lock entry.
