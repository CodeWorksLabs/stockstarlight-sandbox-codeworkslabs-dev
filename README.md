# stockstarlight.sandbox.codeworkslabs.dev

The clean stock Astro + Starlight control used for CodeWorksLabs Astro product testing.

Production URL: https://stockstarlight.sandbox.codeworkslabs.dev/
Cloudflare Worker configuration name: `stockstarlight-sandbox-codeworkslabs-dev`

## Local verification

```sh
npm ci
npm audit --omit=dev
npm run build
npm run deploy:dry-run
```

The dry run does not publish. Deployment is deliberately separate and requires explicit authorization.

## Rights

Site software and content carry no repository-wide license unless a file explicitly states one. Artwork is not open licensed by publication or repository access. The public ownership wording is `© 2026 CodeWorksLabs, a WebSynergetics property.`
