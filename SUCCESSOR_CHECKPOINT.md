# Successor checkpoint

Updated: 2026-09-10

## Current state

- Site: `https://stockstarlight.sandbox.codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/stockstarlight-sandbox-codeworkslabs-dev`
- Branch: `main`
- Cloudflare Worker configuration: `stockstarlight-sandbox-codeworkslabs-dev`
- Repository establishment is a source-control correction; it does not deploy or alter the live Worker.
- The site source is self-contained within this repository root.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`.

## Boundaries

Keep this stock. Do not install product integrations except for an explicitly authorized, bounded test phase.

The exact commit identity and completed verification evidence will be recorded here when the initial public baseline is pushed.
