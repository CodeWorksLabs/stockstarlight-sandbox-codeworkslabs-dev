# Starlight Analytics Sandbox Handoff

Updated: 2026-10-28

## Current authorized dependency correction

Phil authorized assessment/correction in both sandboxes, rerun checks and
independent reviews on2026-10-28, with no push/deployment. Starlight starts at
clean main738835db17595d9314aeb5d467c9bdf704751806. Planned direct pins:
Astro7.3.3,Sharp0.35.5,Wrangler4.155.0, with targeted compatible transitive
updates including PostCSS selector parser. Starlight0.42.0 and exact Alpha.23
artifact/provider/site behavior remain unchanged. No overrides or force-fix.

Astro's dependency Composite review at2a29ef2 passed with one P3; its displayed
version correction atbc0754794d4fd43b2fdce599454dd75d15a60101 independently
closed under AFA-ASTRO-SANDBOX-DEPENDENCY-LABEL-CLOSURE-20261028-01, PASS,
zero open focused findings. These results do not qualify Starlight.

Starlight's corrected dependencies and fresh checks are complete. Internal
Composite review AFA-STARLIGHT-SANDBOX-DEPENDENCY-CORRECTION-20261028-01 at
e92b59bbb04a507cf290d68db466b766b5a1edab,
tree 99cb7f2167fef561592dcf1a0a1a2fc489a94d2c passed with one P3 reporting
finding and zero P0-P2. It requires separate recording/classification of the
new MDX MODULE_LEVEL_DIRECTIVE head-injection warning. The raw build log was
preserved. Reviewer established no demonstrated regression in exact static
output through query-flag/metadata tracing, HTML comparison and generated
analytics replay. No universal MDX/native-browser qualification is implied.
The records now include that warning. Focused Correction Closure Check
AFA-STARLIGHT-SANDBOX-DEPENDENCY-REPORT-CLOSURE-20261028-01 concluded INTERNAL
CODE REVIEW PASS at be143b55443dc91719a0b1fb742b3caa33aca2fb,
tree ae447f3cfc0ab6ad48337acc79c65dc56b4327d2, clean closing state. P3 closed,
zero open focused findings. No executable, graph or output changed. This later
record entry is not a new full-candidate disposition. See
DEPENDENCY_CORRECTION_20261028.md for assessment/full delta/fresh exits. Normal
install, production/full audits(zero), 16 tests, check10zero, 6page/45file build
and Wrangler4.155.0 dry run all passed. No source/config/artifact/CI changes.
At the declared freeze, editing stopped and queue empty; commissioning message
binds exact commit/tree containing this checkpoint. Evidence root:
C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-dependency-fix-bcd48957febb48e89fb8c0095537894f.
Full before audit:12 affected package entries (7high,4moderate,1low), including
development-tool chains. Both sandbox dependency corrections, preflight checks,
internal sub-agent Composite reviews and focused P3 closures are now complete
within their exact local scopes. No open findings remain from these reviews.
Next action requires separate authorization for push/deployment and subsequent
native browser/provider rollout verification; none has occurred. No previous
PASS transfers to changed candidates. Product source/provider/live/remote CI
remain unchanged. Local records are committed; nothing has been pushed.

## Historical deployment-check state before correction

Phil authorized deployment checks on 2026-10-28 with no push/deployment.
Against source HEAD99f2275dc0234c9efa95d7e2ccd95ce1f511b16e, normal npm ci,
16 tests, rebuild and Wrangler dry run succeeded. Production audit failed:
9 affected package entries (6 high,2 moderate,1 low). No dependencies changed
and no fixes ran. Deployment checks are NOT all green.
Read DEPLOYMENT_CHECKS_20261028.md for exits, findings, evidence and boundaries.
The new45-file output is byte-equal to the independently reviewed output.
Subsequent record-only changes do not alter that executable/output identity.
Next: decide a bounded dependency correction, then rerun affected gates. No
push or deployment is authorized; native/live-provider checks remain unexecuted.

## Reviewed local migration record (before deployment checks)

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
The exact independently reviewed executable candidate is main commit
3c4c252f89c969ae14ea6a6b9462d6f6f6296f1e, tree
de26c5719e68efdb3982850d7faf136df6fd343e, upstream
b51cf374ac53ffbfc549e8732dd1121a48929cb6. Review
AFA-STARLIGHT-SANDBOX-ALPHA23-LOCAL-MIGRATION-20261028-01, Composite candidate
review, concluded INTERNAL CODE REVIEW PASS for all three bounded local
preparation sub-gates. P0/P1/P2/P3 all zero. Opening/closing state was clean,
editing stopped, queue empty, no replacement or integrity event.
See REVIEW_ALPHA23_LOCAL.md for the durable coordinator report record; the
full independent report remains visible in the Analytics chat.

This checkpoint/report follow-up is record-only after disposition. It changes
no executable, tests, fixtures, dependency, artifact, configuration, workflow
or output. The disposition stays bound to the exact source candidate above;
no new full-candidate PASS is inferred for later record-only commits.
The inherited Alpha.21 deployment record below is historical, not reverified.

Evidence root:
C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-alpha23-0001af263d1f47958ee95cc96a31f035.
The first author preparation script stopped on a line-ending-dependent text
match before writing the new test; its corrected step succeeded. No product
failure or live traffic occurred. Exact artifact SHA-256 remains
190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127.

No local correction remains from the review. Both sandbox local gates are
complete; no live demo rollout has occurred. Next gates require separate
authorization: native browser/ClientRouter/accessibility, normal lifecycle
install/audit/Wrangler/remote CI and eventual live/provider/rollout acceptance.
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
