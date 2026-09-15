# Deployment

This repository builds a static Astro site for `https://stockstarlight.sandbox.codeworkslabs.dev/`. Wrangler reads `wrangler.jsonc` and targets the Cloudflare Worker configuration named `stockstarlight-sandbox-codeworkslabs-dev`.

## Release gate

1. Start from a clean, current `main` checkout.
2. Run `npm ci`.
3. Run `npm audit --omit=dev` and resolve any production vulnerability before release.
4. Run `npm run build`.
5. Run `npm run deploy:dry-run`.

No command above deploys. Cloudflare Workers Builds is connected to this
repository with `main` as its production branch, so pushing a commit to this
repository's own `main` triggers a production build and deployment. Treat that
push as a deployment action and require separate explicit deployment
authorization before performing it. An operator may also deploy explicitly
with `npm run deploy`, but only under the same authorization. A deployment does
not authorize DNS, route, domain, or other provider changes.
