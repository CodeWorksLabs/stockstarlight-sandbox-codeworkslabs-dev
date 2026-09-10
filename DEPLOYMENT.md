# Deployment

This repository builds a static Astro site for `https://stockstarlight.sandbox.codeworkslabs.dev/`. Wrangler reads `wrangler.jsonc` and targets the Cloudflare Worker configuration named `stockstarlight-sandbox-codeworkslabs-dev`.

## Release gate

1. Start from a clean, current `main` checkout.
2. Run `npm ci`.
3. Run `npm audit --omit=dev` and resolve any production vulnerability before release.
4. Run `npm run build`.
5. Run `npm run deploy:dry-run`.

No command above deploys. Only after separate explicit authorization may an operator run `npm run deploy`. A deployment does not authorize DNS, route, domain, or other provider changes.
