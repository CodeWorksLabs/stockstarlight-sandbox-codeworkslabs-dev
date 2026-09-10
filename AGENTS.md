# Repository instructions

This repository owns the source for `stockstarlight.sandbox.codeworkslabs.dev` and nothing outside this repository root.

- Use the `main` branch.
- Keep the source self-contained; do not import files from parent or sibling site roots.
- Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run` before proposing release.
- Deployment, DNS, Worker, route, and provider changes require separate explicit authorization.
- Never store passwords, API keys, tokens, credentials, private account values, or production secrets.
- Preserve the exact public ownership wording: `© 2026 CodeWorksLabs, a WebSynergetics property.`
- Public repository access does not grant rights to artwork unless a file explicitly says otherwise.

Keep this stock. Do not install product integrations except for an explicitly authorized, bounded test phase.

When starting the development server, use \`astro dev --background\`. Manage it
with \`astro dev stop\`, \`astro dev status\`, and \`astro dev logs\`.
