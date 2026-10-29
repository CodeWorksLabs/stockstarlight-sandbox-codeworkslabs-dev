# Starlight sandbox deployment checks

Executed 2026-10-28 under Phil's explicit deployment-check authorization.
No push, publication, deployment, provider setting change or live analytics
test was authorized or performed. This is execution evidence, not a new code
review or product/release acceptance.

## Identity and execution

Opening main HEAD99f2275dc0234c9efa95d7e2ccd95ce1f511b16e,
tree1168f04f76fc21bb755ae36805fdc754507bb277, clean. Existing origin/main
b51cf374ac53ffbfc549e8732dd1121a48929cb6. Reviewed executable candidate
3c4c252f89c969ae14ea6a6b9462d6f6f6296f1e. Alpha.23 tarball unchanged:
SHA-256190408df5cc9b34462081ed213669cbf1149d84e11123969cc82624a87691127.

Node22.22.2/npm11.12.1. ASTRO_TELEMETRY_DISABLED=1,
WRANGLER_SEND_METRICS=false, NPM_CONFIG_UPDATE_NOTIFIER=false. Wrangler logs
directed to the named evidence directory. Existing npm cache used; no cleanup.
Normal install enabled dependency lifecycle scripts (esbuild/workerd and
platform-optional packages). Registry/advisory queries were permitted by the
requested checks; no provider account mutation or browser traffic occurred.

| Command | Exit | Result |
| --- | --- | --- |
| npm ci | 0 | Normal clean install; full-tree summary12 vulnerabilities |
| npm audit --omit=dev --json | 1 | Production audit9 affected package entries |
| npm test | 0 | 16/16 |
| npm run build | 0 | 6 pages plus handoff/search/sitemap,45 output files |
| npm run deploy:dry-run | 0 | Wrangler4.131.1, assets-only Worker, no bindings, dry-run exit |

Production severity census: high6,moderate2,low1,critical0. Affected entries:
astro(low),devalue(high),postcss-selector-parser(moderate),sharp(high),
smol-toml(moderate),source-map-js(high),undici(high),vite(high),zod(high).
Raw audit.json preserves advisory URLs/ranges and suggested fixes. These are
current registry audit findings, not independent exploitability conclusions
for the static site. No npm audit fix or dependency edit was run.

Build warnings for optional i18n/custom docs404 remain in build.log; the earlier
independent source/output review classified them as stock content behavior,
with a generated fallback404. No new contrary evidence arose in this rebuild.
Wrangler's update notice was recorded; its version was not changed.

## Evidence and impact

Evidence root:
C:\Users\Owner\AppData\Local\Temp\starlight-sandbox-deployment-checks-3de25121f4b14ca78e8a428f4f5032e7.
Includes ci.log,audit.json,audit-stderr.log,test.log,build.log,dry-run.log,
wrangler.log,exits.json,dist-ledger.json and dist.zip.
Ledger SHA-2565cdfcd30761b37fec82f2699a75775a7c99a2b566be08908e4be795c1ac9700a.
Archive SHA-25690512d2a1cda76cc50b6ac2cdee4e9cbab1b9eac5dbab5b35f50135828784035.
All45 output paths/byte counts/SHA-256 match the independently reviewed ledger;
no generated runtime change from normal lifecycle installation. Archive identity
is new because it is a new execution snapshot. Wrangler's CLI reading56 entries
does not replace the exact45-file filesystem ledger.

Generated residue remains node_modules,.astro/Vite,dist,ignored Wrangler derived
state,npm cache metadata and the named evidence/log/archive directory. No source,
lock,manifest,config,workflow or provider was modified during checks. This report
and checkpoint are subsequent record-only changes.

The prior bounded local review remains historical exact-candidate evidence.
Audit and normal install/Wrangler were excluded then; these new executions do
not retroactively turn that review into release acceptance. Normal install,
build and dry-run gates now passed; audit failed. Native browser/provider
ingestion/autonomy,remote CI and actual rollout remain unexecuted.

Current gate: deployment checks not all green. Next is a separately bounded
dependency correction or documented assessment by the appropriate authority.
This record authorizes no correction,push or deployment.
