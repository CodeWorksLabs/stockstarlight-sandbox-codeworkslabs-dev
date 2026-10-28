# Starlight Analytics Sandbox Handoff

Updated: 2026-10-28

## Current local Alpha.23 preparation

Phil authorized local migration and independent review, one sandbox at a time,
with no push, deployment or provider changes. Astro's local candidate b2654c8
received its bounded composite review and its continuity correction at 23bd2f4
received a focused closure PASS. This does not qualify Starlight.

This site's local Alpha.23 work starts at clean main/origin/main
b51cf374ac53ffbfc549e8732dd1121a48929cb6. Changes bind exact package/source,
lock and workflow; explicit GA Astro pageviews with Phil's attestation;
denied UI/strict receipt handling; and self-contained Starlight-wrapper VM
fixtures. Read MIGRATION_ALPHA23.md for contract, authority and evidence.
Fresh offline install passed (383 packages), final tests passed16/16, check
reported10 files with zero findings, and build passed with45 output files.
The build emitted i18n/docs404 content warnings, retained in build.log.
Initial fixture failures and the corrections are recorded in the control.
This is the pre-review snapshot: the freeze commissioning message identifies
the commit/tree containing this checkpoint. No source editing or queued changes
remain at that freeze. No independent Starlight disposition is claimed here.
The inherited Alpha.21 deployment record below is historical, not reverified.

Evidence root:
C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-alpha23-0001af263d1f47958ee95cc96a31f035.
The first author preparation script stopped on a line-ending-dependent text
match before writing the new test; its corrected step succeeded. No product
failure or live traffic occurred. Exact artifact SHA-256 remains
190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127.

Next at this pre-review snapshot: independent doctrine review of the exact
candidate, including package/source/installed/output binding and all recorded
failures. Do not interpret author verification as independent acceptance.
Do not execute audits, Wrangler, browsers/providers, remote CI, push or deploy
under the present local-only authority. Product source remains unchanged.

## Historical Alpha.21 boundary

- This repository owns `stockstarlight.sandbox.codeworkslabs.dev`.
- The qualified consumer integrates Analytics for Astro `0.1.0-alpha.21`
  from product commit `40713fc7f52ac1b3a0e968d995de10640f851934`.
- The exact package is 28,046 bytes with SHA-256
  `0237b5d93c79b4ea90b842f96079e759076c0ea87ea01f97097383998541a9c7`.
- Consumer commit `715a488388cdf3dc19343f28902b0880940f596e`
  is pushed and deployed.

## Historical live-state record

- The live Cloudflare Worker version is
  `3b5c75f0-81e2-4b40-84df-04d80dc2bbef`.
- It deploys the qualified Alpha.21 consumer from commit `715a488`.
- `https://stockstarlight.sandbox.codeworkslabs.dev/analytics/` and
  `/analytics/next/` returned HTTP 200 after deployment. The live analytics
  bundle contains all five configured provider integrations.

## Historical Alpha.21 verification

- A clean local install resolved the exact Alpha.21 package.
- Fresh verification passed: production dependency audit with zero
  vulnerabilities, 8/8 site tests, Astro diagnostics with zero findings,
  a six-page Starlight production build, and a 56-asset Wrangler deployment
  dry run. The existing empty `i18n`/missing custom 404 content warnings remain
  non-fatal and unrelated to Analytics.
- GitHub Actions run `34934311749` passed against the pushed consumer commit.
- All five configured providers remain present in the built output. The
  Alpha.21 event-property correction rejects malformed public-browser property
  bags before provider dispatch. No release or product-risk acceptance occurred.

## Historical Alpha.21 recovery

- The pre-cleanup 17-commit local history is preserved in
  `C:\CodeProjects\Archives\Astro Analytics Recovery\2026-09-14\starlight-sandbox-before-cleanup.bundle`.
- Alpha.21 is locally qualified, pushed, and deployed for this consumer.
- Product development does not authorize GitHub, credential, Cloudflare,
  deployment, or release changes.
