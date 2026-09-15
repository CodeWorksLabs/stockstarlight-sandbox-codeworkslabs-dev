# Starlight Analytics Sandbox Handoff

Updated: 2026-09-14

## Current boundary

- This repository owns `stockstarlight.sandbox.codeworkslabs.dev`.
- The unpublished local candidate integrates Analytics for Astro
  `0.1.0-alpha.19` from product content commit
  `b7f81f7da106229dfa9112b8851788b69f46b88e`.
- The exact candidate package is 53,490 bytes with SHA-256
  `0ab90794159670cabbed0c7e974a722cd8254434d83f95b15286dd4366abaffa`.
- The local candidate has not been pushed or deployed.

## Live state

- The live Cloudflare Worker remains
  `6683e6fa-357d-43fa-acf8-6f3c19c7fac2`.
- That deployment belongs to the accepted Alpha.10 generation, not the local
  Alpha.19 candidate.
- `https://stockstarlight.sandbox.codeworkslabs.dev/analytics/` returned HTTP
  200 during the 2026-09-14 recovery inventory.

## Verification state

- The local Alpha.19 functional suite previously reported 8/8 passing.
- The final isolated Starlight export stopped during `astro check`; its docs
  export had not begun.
- No F9 review was launched, and no release or deployment acceptance exists.

## Recovery and next action

- The pre-cleanup 17-commit local history is preserved in
  `C:\CodeProjects\Archives\Astro Analytics Recovery\2026-09-14\starlight-sandbox-before-cleanup.bundle`.
- Do not push or deploy until the Alpha.19 technical assessment and final
  bounded verification are complete and Phil authorizes the exact action.
- Product development does not authorize GitHub, credential, Cloudflare,
  deployment, or release changes.
