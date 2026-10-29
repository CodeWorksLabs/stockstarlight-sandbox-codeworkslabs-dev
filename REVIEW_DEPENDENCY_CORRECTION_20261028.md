# Starlight dependency review record

Recorded by Analytics, 2026-10-28, from independent internal sub-agent
/root/astro_sandbox_alpha23_review's full final report in Analytics chat. This
is a coordinator summary, not a verbatim reviewer-authored report. Scope,
findings, identity, provenance and disposition are preserved without promotion.

## Exact review and decision

ID AFA-STARLIGHT-SANDBOX-DEPENDENCY-CORRECTION-20261028-01, Composite candidate
review. Requester Phil via Analytics; candidate owner root Analytics; reviewer
the sub-agent above. Static read/process-local in-memory only, no writes,
install, network/audit calls, provider actions or cleanup. Doctrine and appendix
completely read through EOF previously; identity freshly verified unchanged:
C:\CodeProjects\Governance\Boss\CODE_REVIEW_DOCTRINE.md, 52,273 bytes, approved
2026-08-27, SHA-256 5610f2ab5b2e9dc2cd649e2e11321dec6b5f1bacd174a1c32babd49174888c5d.
Method audit not commissioned. Freeze acknowledged before tracing; editing
stopped, queue empty, no replacement/integrity event; DISPOSITION ISSUED.

Opening/closing main HEAD e92b59bbb04a507cf290d68db466b766b5a1edab,
tree 99cb7f2167fef561592dcf1a0a1a2fc489a94d2c,
origin/main b51cf374ac53ffbfc549e8732dd1121a48929cb6,
baseline 738835db17595d9314aeb5d467c9bdf704751806. Clean tracked/staged/relevant
untracked state; no source nested repo/submodule. Full member/evidence hash
ledgers are preserved in reviewer tool evidence.

Required source/baseline, before/current package/lock, complete delta,
advisory/registry records, installed dependencies, artifact/tests/preflight
logs/exits/output ledgers/archive/delta/workflow/recovery present. Databases/
containers inapplicable; native/browser/provider/remote evidence excluded.
All requested material scope inspected; no known findings withheld.

Original census P0 0/P1 0/P2 0/P3 1. Exact disposition:
INTERNAL CODE REVIEW PASS WITH P2/P3 FINDINGS.

## Full finding and warning classification

P3: DEPENDENCY_CORRECTION_20261028.md:99-101 at the original freeze omits new
MODULE_LEVEL_DIRECTIVE warnings for use astro:head-inject in propagated-asset
modules for index.mdx, analytics.mdx and analytics/next.mdx. Existing i18n/404
warnings are named, but the new compiler diagnostic is not distinguished.
Independently observed reporting discrepancy by direct record/log inspection
on 2026-10-28. Raw evidence retained; no evidence loss. Required property:
record the warning separately with bounded classification/supporting output.
Closure evidence: corrected records against immutable build log, exact output
identity and original report. Owner Analytics, reporting/continuity gate only;
finding grants no implementation authority.

Reviewer classified the diagnostic as new bundler warning without demonstrated
functional regression in this exact static candidate, neither a confirmed
analytics defect nor assumed universally harmless behavior. Astro emits the
literal directive but separately handles asset boundaries via
astroPropagatedAssets flags, module metadata and collected assets. All six
HTML pages equal the previous output after substituting only three bundle
references and Astro generator version. Expected component scripts/styles/
markup/links remain; actual new analytics bundle passes synthetic replay.
This does not qualify every future MDX combination or native browser behavior.
Existing i18n/custom404 boundaries remain unchanged stock-content behavior.

## Threats and coverage

Assets: advisory closure, reproducible resolution, trusted native/build/install
execution, correct Starlight output, truthful records, consent/receipt/navigation/
token privacy. Boundaries: registry/archives/lock/integrity, native hooks,
Astro/Vite/Rolldown, Starlight/MDX/content/schema/search/image, Wrangler chain,
CI, operator public IDs and visitor URL/session/provider globals. No consumer
SSR/auth/database. Distinct boundaries directly inspected; platform alternatives
accounted, no unsupported exhaustive third-party or native-search audit claim.

Coverage: full before-audit indirect/range closure; all 94 named-package changes
plus root metadata, engines/origins/integrity/installed identities/native
families/deduplication; esbuild/Workerd lifecycle/fallback trust and Sharp/
Rolldown native alternatives; wrapper/plugin insertion/MDX/routes/components,
consent/events/privacy/strict receipts/handoff/rendering/CI/recovery; all45
output files, changed bundles/HTML/assets and actual generated analytics replay;
reporting classified separately as the P3 above.

## Evidence and dependency conclusions

Direct pins Astro7.3.3, Sharp0.35.5, Wrangler4.155.0; Starlight0.42.0 unchanged.
Corrected resolutions in control agree with lock/install and fall outside
before-audit affected ranges, including selector parser6.1.5 and Wrangler chain.
No range/active-engine/install mismatch, override or unexpected origin.
Registry entries use registry.npmjs.org with integrity; analytics is local.
Astro satisfies Starlight ^7.2.10 and analytics >=7.3.2 <8. Node22.22.2 meets
active requirements. Native/fallback sources identical to versions traced in
Astro carry only by exact byte comparison, not all-platform/fallback execution.

Fresh independent observations/replays: 16/16 tests exit0; all19 analytics
artifact members match canonical3a58043a6cc22a8778cc5c1d17cd9e15531d2bb3 after
LF/CRLF normalization, installed bytes match tarball; consumer source/content/
config/tests/fixtures/workflow/manifest/recovery/deploy config unchanged from
baseline. All45 outputs match new ledger, no synthetic markers. Six HTML pages
preserve content/assets after declared substitutions. Actual analytics bundle
was isolated from unrelated prefetch initialization and replayed in synthetic
plain/simulated-router DOMs: five scripts captured without fetch, five adapters
accepted, denial/blocked route suppressed package calls. Search/UI-core changes
were inspected for updated preload/import handling and minifier changes.

Initial reviewer extraction used a wrong delimiter, yielded an empty slice and
failed script-count assertion. Corrected extraction passed both modes; diagnostic
error, not product defect. No source mutation or hidden execution failure.

Supplied author logs inspected, not rerun: normal ci382 installed/383 audited,
zero; production/full audits zero; tests16; check10zero; build6pages/45files with
warnings; Wrangler4.155.0 assets-only/no bindings/dry-run0; exits agree. Telemetry/
environment remains supplied provenance. Dated advisory data is not enduring
security assurance or exploitability proof. Three bundles/six HTML changed,
36 other files match. Unchanged-source evidence carries by exact comparison;
framework/tooling/install/audit/output refreshed. Shared registry metadata is
supplied query evidence, not a second independent registry verification. No old
PASS inherited. Reviewer authored no corrections, prior exposure disclosed,
independence from authorship not blindness. No reviewer residue or cleanup.

Material hashes (full ledgers in reviewer tool evidence):
```
b8aa96ac439a9a995db57008f182931c353d4beae0f69790a2056e2a54605ac4 package-lock.json
5be485a28a8495c9cd05dd07bf2afd375aa76a2b09e4eb1a71432d1af7c45b44 package.json
c5a187b8d8e3fb824289011bee0a821dc02eb8215ada6eeb14cdccdbf569e722 original control
987c7dfb213c7ef1d8f2c5fda5328dbe5b95ef5dede3414c1aa203822606f3d4 original checkpoint
190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127 Alpha.23 artifact
b374781bd0a0f78f02040fe03c605f96e2c9952bcc236240c1e7bc70b86f13b3 audit-before-full.json
827d999e9713fd5e94593c981a2e7a2ba21e93a1efe84515882d9382761d4eaa audit-prod.json/audit-full.json
f227afc7825c182bec60a2925f01850c92e01873bebfbd5a3bc73929bc3279cc lock-delta.json
9c79af298d44f580c6d6c7e9502483479cb1e19f5d4d6f7bfb19251fc8ee40c6 output-delta.json
46ae224f72224615ff3e45bf3b71d47661b08b88995b057f3d6e7b841c4cfab5 build.log
eabc59cfeb00d9ffa51cb6c897273caa54316c74970d37c134e1db1ce79f7280 exits.json
53ae514a10376026ae2451af9870d2be6e72d46e2b18d46c1266fb51d6b4c6f1 dist-ledger.json
070209bba2b07353886179028ffdf5299fa9600a9a84bec552b78eb41a1f8657 dist.zip
```
Evidence root: C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-dependency-fix-bcd48957febb48e89fb8c0095537894f.

## Gates and submitted reporting closure

Sub-gates: advisory/resolution PASS; whole consumer PASS; installed artifact/
fresh preflight/output binding PASS WITH P3 reporting finding. No blocking
correction remains. Native browser/ClientRouter/accessibility, actual vendors/
autonomy/ingestion, remoteCI, live rollout/rollback, publish/deploy and release/
product acceptance remain open/excluded. Author dependency/build/Wrangler/npm/
evidence state remains. No downstream authority is implied.

After disposition, control/checkpoint and this record were updated only to
report/classify the directive warning with exact bounded evidence. No source,
dependency, artifact, test, workflow, config, raw log or output changed. Those
evidence identities/provenance stay unchanged; no rerun is warranted for these
non-build-input records. Original disposition stays bound to e92b59b. Exact
new documentation freeze is in the commissioning message. Focused independent
reporting closure is pending at this snapshot, not a new full-candidate PASS.
