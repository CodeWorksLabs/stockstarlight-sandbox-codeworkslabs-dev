# Local Alpha.23 Starlight migration control

Updated 2026-10-28, America/Los_Angeles. Owner: Astro Analytics under Phil's
explicit local two-sandbox migration/review authorization. This candidate owns
only stockstarlight.sandbox.codeworkslabs.dev. Astro was separately reviewed.
No push, publication, deployment, provider change or live traffic is authorized.

## Baseline, contract and provenance

Repository CodeWorksLabs/stockstarlight-sandbox-codeworkslabs-dev, main.
Starting HEAD/origin/main b51cf374ac53ffbfc549e8732dd1121a48929cb6,
tree dcf3981969a2e04e43dc3abc9431a9237bcba4f8, clean worktree.
Previous executable consumer 715a488388cdf3dc19343f28902b0880940f596e.
Retain previous Alpha.21 artifact for rollback (SHA-256
0237b5d93c79b4ea90b842f96079e759076c0ea87ea01f97097383998541a9c7).

Phil attested on 2026-10-28 that Page views/history-based collection is OFF on
both exact sandbox streams and always has been. Astro Boss relayed it in task
019f954e-a5d3-77f1-ad33-fa44553040c9. This is supplied direct operator attestation,
not provider inspection by Analytics. Starlight's ID remains G-SW9Z74X4XT.
historyPageviewsDisabled:true records this prerequisite; the package cannot
inspect GA Admin. Do not reopen inspection or infer provider access authority.

Migrate the artifact/dependency/lock/source manifest/workflow atomically;
preserve cwl_journey privacy, all five IDs/endpoints, events and immediate
defaults. Use explicit Astro-owned GA pageviews. Distinguish denied UI and
strict receipt results. Synthetic deferred/external variants remain fixtures,
not page configuration or a persistence/CMP policy. Preserve the exact ownership
wording and self-contained site source with no sibling/parent runtime imports.

## Target

- Version 0.1.0-alpha.23, 19 members, 32,752 packed bytes.
- Source commit 3a58043a6cc22a8778cc5c1d17cd9e15531d2bb3.
- Executable ancestry 50d659900d53f2586e37208064226666ea7f981a.
- Product checkpoint 20ab007c597d1750c2a6234741d368d36665ce4c.
- SHA-256 190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127.

## Local verification and review

Author Local Verification permits named generated dependency/build/evidence
state and synthetic VM collectors only. No vendor code is fetched/executed by
fixtures. The Starlight wrapper adds the installed integration before runtime
injection; actual journey UI code is exercised with a fake DOM. Actual native
router/provider behavior is not implied by simulated lifecycle tests.

Fresh author verification on 2026-10-28 used Node v22.22.2/npm11.12.1 with
ASTRO_TELEMETRY_DISABLED=1 and NPM_CONFIG_UPDATE_NOTIFIER=false. Evidence root:
C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-alpha23-0001af263d1f47958ee95cc96a31f035.

- Offline package-lock-only update, ignore-scripts/no-audit/no-fund: exit0;
  only analytics dependency/artifact and root Node engine metadata changed.
- npm ci --offline --ignore-scripts --no-audit --no-fund with existing npm
  cache: exit0, 383 packages, 3minutes; no shared cache cleanup.
- Initial preparation script stopped on an expected text/line-ending mismatch
  before writing the new test; corrected matching step completed.
- Initial npm test: exit1,14/16. Config fixture crossed VM realms and strict
  config validation rejected it; deferred fixture hit its one-second VM limit.
  test.log preserves both. No product configuration was changed to bypass them.
- Corrected config fixture creates records in the integration's host realm,
  matching actual config loading; bounded VM timeout is five seconds.
  Final npm test: exit0,16/16 (test-final.log).
- npm run check: exit0,10files,zero errors/warnings/hints (check.log).
- npm run build: exit0,six generated pages plus public handoff/search/sitemap,
  45 output files (build.log). Build warnings: empty/missing i18n collection and
  missing docs404 entry. These are recorded for review, not suppressed or
  described as new analytics defects without evidence.
- No fake.invalid/G-SYNTHETIC/PRIVATE_TOKEN_VALUE markers in dist; diff check
  passes. Diagnostics and output are fresh, not historical Alpha.21 evidence.

dist-ledger.json records all45 output paths/sizes/SHA-256, hash
5cdfcd30761b37fec82f2699a75775a7c99a2b566be08908e4be795c1ac9700a.
dist.zip snapshot hash
a06f83d126b6cccf014334c84e9855cb9994097d5e4be23dfc06c831d1baf5aa.
After the successful build, only continuity/control documentation changed;
runtime/config/tests/dependencies/toolchain remain the exercised final inputs.
Generated residue: node_modules, .astro/Vite state, dist and the named evidence
directory/npm cache metadata. No unrelated state was cleaned up. No audit,
Wrangler, remote CI, native browser or provider test has run for this candidate.

Freeze commissioning message binds the exact commit/tree containing this
record and checkpoint; no self-referential commit hash is implied here.
Implementation is stopped and queue empty at that declared freeze. Independent
review is pending at this pre-review snapshot; later results are separate.

Independent review must use the complete Code Review Doctrine,
C:\CodeProjects\Governance\Boss\CODE_REVIEW_DOCTRINE.md (52,273 bytes; SHA-256
5610f2ab5b2e9dc2cd649e2e11321dec6b5f1bacd174a1c32babd49174888c5d,
approved 2026-08-27), with exact freeze, empty queue and source editing stopped.
This local composite gate excludes native browser/ClientRouter/accessibility,
provider ingestion/autonomous traffic, normal lifecycle-enabled install, audit,
Wrangler dry run, remote CI, executed rollout/rollback and release acceptance.
Those gates stay open; no previous PASS is inherited.

Mixed-version document runtimes are unsupported. A later authorized rollout or
rollback needs a clean document boundary and exact asset/artifact identity;
do not assume hot replacement or discard an actually persisted denial. Existing
provider scripts may retain autonomy after load despite package-level denial.
