# Starlight Analytics Sandbox Handoff

Updated: 2026-09-14

## Current boundary

- This repository owns `stockstarlight.sandbox.codeworkslabs.dev`.
- The qualified local candidate integrates Analytics for Astro
  `0.1.0-alpha.20` from product commit
  `ae6a9884e3cada297f11c641a90082f296380bcb`.
- The exact candidate package is 27,344 bytes with SHA-256
  `6734b4b449d85ecc8cdf2c9009aac4e8a733e06e045634468ba59277cd37b228`.
- Qualification commit `38901b2a21992882a52e0ae127757a40d49f5e4e`
  is pushed and deployed.

## Live state

- The live Cloudflare Worker version is
  `b9d215d6-1b83-40ec-8f0f-4311cb5ab275`.
- It deploys the qualified Alpha.20 consumer from commit `38901b2a`.
- `https://stockstarlight.sandbox.codeworkslabs.dev/analytics/` and
  `/analytics/next/` returned HTTP 200 after deployment. The live analytics
  bundle contains all five configured provider integrations.

## Verification state

- A clean local install resolved the exact Alpha.20 package.
- Fresh verification passed: production dependency audit with zero
  vulnerabilities, 8/8 site tests, Astro diagnostics with zero findings,
  a six-page Starlight production build, and a 56-asset Wrangler deployment
  dry run. The existing empty `i18n`/missing custom 404 content warnings remain
  non-fatal and unrelated to Analytics.
- All five configured providers remain present in the built output. No code
  review, release, push, deployment, or live acceptance occurred.

## Recovery and next action

- The pre-cleanup 17-commit local history is preserved in
  `C:\CodeProjects\Archives\Astro Analytics Recovery\2026-09-14\starlight-sandbox-before-cleanup.bundle`.
- Alpha.20 is locally qualified, pushed, and deployed for this consumer.
- Product development does not authorize GitHub, credential, Cloudflare,
  deployment, or release changes.
