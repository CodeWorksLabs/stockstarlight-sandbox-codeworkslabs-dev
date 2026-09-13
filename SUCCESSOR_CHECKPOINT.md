# Successor checkpoint

Updated: 2026-09-12

## Current state

- Site: `https://stockstarlight.sandbox.codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/stockstarlight-sandbox-codeworkslabs-dev`
- Branch: `main`
- Cloudflare Worker configuration: `stockstarlight-sandbox-codeworkslabs-dev`
- Repository establishment originally preserved source without altering the live Worker; the repository-driven deployment cutover described below is now authorized.
- The site source is self-contained within this repository root.
- The prepared repository build pins annotated tag `v0.1.0-alpha.7` and verifies
  that it resolves to Analytics for Astro product commit
  `454893359f8588a71d35d51d1a5e0d16bf355c63` before packing version
  `0.1.0-alpha.7`.
- The Starlight wrapper uses canonical Fathom sandbox site ID `FRMRGPFB` and
  supplied Plausible site-specific script
  `https://plausible.io/js/pa-CBnNKxrJQtEjbu5PVs0LA.js` with `events: true`;
  the generated runtime loads Fathom with `data-auto="false"`.
- The zero-vulnerability production audit, forced clean production build, and
  Wrangler dry-run passed on 2026-09-11. The current emitted runtime chunk is
  `_astro/page.BVS9fqoY.js`, SHA-256
  `b8a7da80bc60a535057564442e8d569040c594e73ad07000012e5048ba4e282a`.
- The deployed root returned 200, an unknown route returned 404, and
  `robots.txt` returned `User-agent: *` / `Disallow: /`. A clean-profile Chrome
  load of the real HTTPS site inserted the exact Fathom script and issued the
  earlier pageview flow for superseded site ID `CTRRUUJD`; evidence is retained
  under `C:\Users\Owner\AppData\Local\Temp\afa-live-starlight-20260911`.
- Phil selected replacement Fathom site ID `FRMRGPFB` as canonical on
  2026-09-11. Live verification confirmed the deployed runtime contains
  `FRMRGPFB` and does not contain `CTRRUUJD`. An ordinary extension-free Edge
  visit produced one current visitor and one pageview on the new dashboard,
  and Fathom's installer then reported: "Success! Your embed code is working
  and you're collecting analytics."
- A temporary unlinked, `noindex` probe route imported the public client entry
  point and called `track("CWL Starlight sandbox probe")` after adapter
  readiness. Fathom recorded exactly one view for the probe path and one event
  completion. The probe was then removed; the clean build was redeployed and
  its live URL now returns 404 while the root still returns 200 with `FRMRGPFB`
  present.
- Current deployed Worker version:
  `de6269e8-dbf1-4a5d-97db-5a61285491a8`.
- With Phil's explicit confirmation, obsolete Fathom site IDs `CTRRUUJD`,
  `XMTWPVGM`, and `ZSSEHZYH` and their analytics data were permanently deleted
  on 2026-09-11. A final Fathom inventory search for `starlight` returned only
  canonical site ID `FRMRGPFB`; the account site count fell from 33 to 30.
- Integration changes remain local and uncommitted; no push was performed.
- On 2026-09-11 the sandbox advanced to exact alpha.5 and simultaneous Fathom
  plus Plausible configuration. The supplied Plausible script returned 200 and
  exposed the expected init/pageview runtime. The complete audit initially
  found three high-severity advisories in Wrangler 4.130.0's bundled
  Miniflare/sharp chain; the exact compatible update to Wrangler 4.131.1
  removed them without a force fix. Complete and production audits now report
  zero vulnerabilities. The package lock SHA-256 is
  `65bc126b2f4d28b58fe7c2b0880a348bdec19250d6b84eaaf03924ce1c72f786`.
  The four-page build, emitted-runtime inspection, Wrangler dry-run, and diff
  check passed. Worker `de6269e8-dbf1-4a5d-97db-5a61285491a8` is live. Root,
  guide, and reference pages return 200; an unknown route returns 404; and
  `robots.txt` remains blocking. A clean browser observed both exact owned
  vendor scripts connected. After explicit authorization, Plausible's
  `I've installed it` action advanced to the site dashboard and confirmed
  `🎉 Your first pageview has landed!`.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`.

## Boundaries

Keep this stock. Do not install product integrations except for an explicitly authorized, bounded test phase.

Treat the checked-out \`main\` commit as the exact source identity. Verify it with
\`git rev-parse HEAD\` and confirm it matches \`origin/main\` before release work.

## GA4 alpha.6 implementation and sandbox deployment — 2026-09-11

Phil supplied separate GA4 Measurement IDs for the two dedicated sandboxes:
`G-T44ECDWXRJ` for `astro.sandbox.codeworkslabs.dev` and
`G-QNPCRXMMW5` for `stockstarlight.sandbox.codeworkslabs.dev`.

The package advanced locally from unpublished alpha.5 to unpublished
`0.1.0-alpha.6`. The GA4 browser adapter is now implemented rather than
validation-only. It owns its `gtag`/`dataLayer` bootstrap, emits configured
Consent Mode defaults before `config`, forces `send_page_view: false`, sends
Astro-lifecycle pageviews with current location/title and virtual referrer,
routes events to the configured Measurement ID, and reports independent
provider readiness/results. Deferred and external consent still fail closed
until a future activation API exists.

The existing internal review task performed multiple passes. It found and
closed substantive lifecycle, cleanup, exception-containment, GA limit, and
naming defects. Final review result: no actionable defects in the GA4 alpha.6
scope. Final source gates passed: strict typecheck plus 97/97 tests, zero npm
audit vulnerabilities, correct npm pack dry-run, and git diff check clean apart
from line-ending warnings.

The exact immutable local candidate artifact is:
`C:\Users\Owner\AppData\Local\Temp\afa-m2-alpha6-final-20260911\codeworkslabs-astro-analytics-0.1.0-alpha.6.tgz`
with SHA256
`162977FFE743B9339F0C70E4D236DA5A5616BCAC52FE27AEC6677DC3B2340A01`.
Byte-identical copies are present in both sandbox `vendor` directories.
Both sites reference that exact alpha.6 filename, retain Fathom and Plausible,
and add their separate GA4 providers with immediate analytics storage granted
and all three advertising consent fields denied. The Astro journey event was
renamed to the GA-compatible `cwl_astro_journey_continued`.

Both consumer installs, complete audits, production audits, Astro builds,
Wrangler dry-runs, and diff checks exited successfully. Both authorized
Cloudflare sandbox deployments then succeeded:

- Astro Worker version `4cdb0355-3426-43df-9c52-eb888769cb1b`.
- Stock Starlight Worker version `c515e878-f9da-4af9-a9be-23d276290777`.

HTTP checks after deployment returned 200 for both roots and representative
content routes; the Astro unknown route returned 404. A raw HTML substring scan
did not find provider markers because Astro emits the injected page runtime
through generated assets, so this is not a provider failure determination.
The next action is clean live-browser inspection of both sites: verify all
three configured provider statuses become ready, confirm the emitted Google
script marker and correct per-site Measurement ID, and send one explicitly
selected GA4 journey event from the Astro operator page. Then obtain
provider-side Realtime/DebugView evidence if available. Also remind Phil to
disable **Page changes based on browser history events** under Enhanced
Measurement for each GA4 web stream to prevent duplicate Astro SPA pageviews.

No commit, push, npm publication, tag, release, or production-site integration
occurred. Preserve all preexisting and current uncommitted work.

### GA4 live verification correction — 2026-09-11

Worker version `c515e878-f9da-4af9-a9be-23d276290777` above was produced from
a stale pre-crash `dist` directory and uploaded no changed assets; it is not
evidence that alpha.6 was live. A direct clean rebuild emitted the correct GA4
marker and `G-QNPCRXMMW5`, after which five changed assets were uploaded as
Worker version `3d1b74a4-dc57-4809-8cea-30fb08245739`.

Live DOM inspection confirmed Fathom, Plausible, and the Google Analytics 4
script with the exact Starlight Measurement ID. Reloading the live site issued
the package-owned pageview attempt. Google-side receipt could not be verified:
the intended Code Works Labs Analytics property does not expose this stream,
and universal-picker search returned no result for
`stockstarlight.sandbox`. A valid stream in the intended account is required
before repeating Realtime/DebugView verification. Disable Enhanced
Measurement's browser-history page-change tracking on that stream to prevent
duplicate Astro lifecycle pageviews.

### Corrected Code Works Labs GA4 stream — 2026-09-12

The canonical Code Works Labs stream is now `G-SW9Z74X4XT`, stream ID
`15764286673`, under `Code Works Labs / codeworkslabs.dev`. The site replaced
only the superseded Measurement ID. A clean install, complete and production
audits, four-page build, Wrangler dry-run, and diff check passed; both audits
reported zero vulnerabilities. `_astro/page.BfTIdcx3.js` contains the new ID
and none of the superseded sandbox IDs.

Worker version `720d970a-2c38-4110-8eec-34d436d31558` deployed five changed
assets. Live DOM inspection confirmed
`https://www.googletagmanager.com/gtag/js?id=G-SW9Z74X4XT`, and a clean
extension-free load supplied a new pageview attempt without browser console
warnings or errors. Google Realtime still showed zero active users immediately
afterward, so provider-side receipt remains pending new-stream provisioning and
must not yet be claimed.

### GA4 alpha.7 correction and provider qualification — 2026-09-12

The prior pending result was not provisioning delay. Alpha.6 queued ordinary
arrays, but Google's canonical gtag.js contract requires `arguments` objects;
Google therefore ignored the locally accepted commands. Reviewed unpublished
alpha.7 corrects that queue shape and adds an identity regression test. The site
vendors the exact final alpha.7 artifact, SHA-256
`1EEAD543DD0A9BFF4668B68BDA72554D0FF5C93A18118E8ED0A0FBCD2073EE9E`.

The clean install, both audits, four-page build, emitted-runtime inspection,
Wrangler dry-run, and diff check passed. The live corrected Worker is
`64d3e206-5b06-4b95-8e96-d06dc8bf75d3`; its runtime contains the minified
canonical `function(){dataLayer.push(arguments)}` implementation.

An extension-free root load supplied the Starlight pageview. Google Realtime
then showed one active user and the page title `Welcome to Starlight | My Docs`
with one view, alongside the two Astro journey views. Provider-side pageview
qualification is complete. No commit or push occurred.

Phil subsequently exercised the deployed Starlight content routes and reported
GA4 provider totals of one active user and one view for each of
`/guides/example/` and `/reference/example/`. The shared property also reported
six `/` views across its Astro and Starlight streams. These Starlight-only paths
independently confirm that the corrected alpha.7 pageview queue reaches Google
from this wrapper implementation.

### Repository-driven deployment cutover preparation — 2026-09-12

Phil authorized replacing local Wrangler deployments with permanent
repository-authoritative builds. The public sandbox repository now records the
exact private product commit, package version, tarball filename, and SHA-256 in
`analytics-source.json`; `vendor/*.tgz` is ignored so private pre-RC package
source cannot be committed publicly. The workflow uses a narrowly scoped GitHub
App to read the one private product commit, packs with pinned npm 11.12.1,
verifies the tarball hash, runs clean install, production audit, Starlight
build, and Wrangler dry-run, then deploys only for trusted non-PR runs.

The exact candidate artifact was regenerated from product commit `4548933`, the
lockfile was refreshed from that artifact, and the local production audit,
four-page Starlight build, Wrangler dry-run, workflow formatting, and diff check
passed. The workflow must not be pushed until `CWL_BUILD_APP_ID`,
`CWL_BUILD_APP_PRIVATE_KEY`, and `CLOUDFLARE_API_TOKEN` exist as repository
secrets; otherwise the repository deployment gate will fail before checkout.

### Public product-source correction — 2026-09-12

Phil confirmed that Analytics for Astro is developed in public. The private
pre-RC checkout and direct GitHub Actions deployment plan above is superseded.
The retained workflow checks out annotated public tag `v0.1.0-alpha.7` without
a GitHub App, verifies that it resolves to exact commit `4548933`, packs that
source on the runner, and runs the repository verification and Wrangler dry-run
gates. It does not deploy and does
not require `CWL_BUILD_APP_ID`, `CWL_BUILD_APP_PRIVATE_KEY`, or
`CLOUDFLARE_API_TOKEN`. Deployment remains with the repository-connected
Cloudflare build path when this local commit is separately authorized to push.
The fixed tarball-hash gate was removed after the first remote run proved that
`npm pack` archive bytes varied between the Windows and Linux pack environments
despite resolving to the same tracked source. The stable workflow identity is
the annotated tag plus its exact resolved commit; the runner-produced package
is then used for the clean consumer build. Earlier Windows tarball hashes remain
historical local/deployment evidence and are not cross-platform identities.

Before push on 2026-09-12, the corrected public-checkout artifact was installed
locally and the clean install, production audit, four-page Starlight build, and
Wrangler 4.131.1 dry-run all passed. The production audit found zero
vulnerabilities. The build retained only the pre-existing nonblocking empty
`i18n` and missing `docs -> 404` content warnings. This verification performed
no deployment.

The first pushed workflow run, `34731642107` at commit `363fd11`, correctly
failed the nonportable tarball-hash gate. Commit `56ef789` replaced that gate
with annotated-tag plus resolved-commit verification; GitHub Actions run
`34731828128` then completed successfully. The active workflow contains no
GitHub App credential reference, fixed tarball hash, or non-dry-run Wrangler
deployment. No repository push in this correction was used as Cloudflare
deployment evidence. Cloudflare version history still ended at the existing
manual version `64d3e206-5b06-4b95-8e96-d06dc8bf75d3`, so these pushes did not
deploy or change Cloudflare configuration. The public sandbox remained HTTP
200.

### Matomo alpha.8 repository candidate — 2026-09-13

Phil authorized the bounded Matomo sandbox integration and repository-driven
deployment. The site now declares public Analytics for Astro tag
`v0.1.0-alpha.8`, resolved commit
`f480c3ce152c49637efcfea6dc38c7577fa28d82`, and exact package version
`0.1.0-alpha.8`. The local vendor artifact has SHA-256
`FE5C5FD1F8DFECDD2BF0C233663FE88507A5C9744DD6FE8C98E2D42AD71E0717`;
the GitHub workflow will pack the same tagged tracked source on Linux.

Matomo is configured with public tracker
`https://matomo.codeworkslabs.net/matomo.php`, standard sibling script
`https://matomo.codeworkslabs.net/matomo.js`, site ID `3`, and event category
`Starlight sandbox`. Existing Fathom, Plausible, and GA4 configuration is
retained.

The required clean install, complete audit, production-only audit, four-page
production build, Pagefind, sitemap, image optimization, emitted-runtime
inspection, Wrangler dry-run, and diff check passed. Both audits reported zero
vulnerabilities. The build retained only the stock fixture's known nonblocking
empty-`i18n` and missing `docs -> 404` warnings. The exact lockfile SHA-256 is
`424D0CE4C013CFAA6D55156BCF665A8F9A691CE377E51D25274CB345659E545D`.
The emitted Matomo runtime is `dist/_astro/page.DhMdtTf6.js`, SHA-256
`7964290EE65A8834AB3A10C697BEC2677AA6A1AD01AE692A1CF3AFB6D27CBBA0`.
No deployment or provider-side receipt is claimed by these local gates.

The first remote alpha.8 verification run, `34747128556` at commit `96256ae`,
failed at `npm ci` before build or deployment. The public tag resolved to the
correct commit and packed successfully, but npm correctly rejected the Linux
tarball against the Windows-generated local-file integrity in the committed
lockfile. This is the previously documented cross-platform gzip identity issue,
not a source-content or Matomo failure. The workflow correction refreshes only
the runner-local package-lock metadata from the exact commit-pinned tarball
before `npm ci`; the tag and resolved commit remain the stable source identity.

Remote run `34747215373` proved that an ordinary package-lock-only install does
not refresh an unchanged local-file dependency's integrity. The replacement
step validates the declared tarball, installed package version, and resolved
lock path, computes SHA-512 directly over the runner-produced artifact, and
updates only that lock entry before the clean install.

Remote run `34747308461` completed successfully at commit `5a66ac4`. Every
declared verification step passed, including the exact public tag/commit
reconciliation, clean install, audits, production build, emitted-runtime
checks, and Wrangler dry-run.

The exact reviewed public alpha.8 package archive is now retained in this
repository as a deployment input. Its SHA-256 remains
`FE5C5FD1F8DFECDD2BF0C233663FE88507A5C9744DD6FE8C98E2D42AD71E0717`.
This makes a fresh Cloudflare Git checkout independently installable before any
custom build command runs. Older local package archives remain ignored. The
GitHub workflow continues to reconstruct and verify the annotated public tag
and exact commit independently; retaining this archive does not replace that
source-identity gate.

After making the archive trackable, a fresh sequential `npm ci`, complete
audit, production-only audit, four-page production build, Pagefind, sitemap,
image optimization, and Wrangler dry-run all passed. Both audits reported zero
vulnerabilities. Only the stock fixture's known empty-`i18n` and missing
`docs -> 404` warnings remained. This verification made no Cloudflare or
provider mutation.

Commit `3b9697d` retained the exact reviewed alpha.8 package and was pushed to
public `main`. GitHub Actions run `34767343511` completed successfully for that
exact commit. Cloudflare's native Builds integration was then connected to
`CodeWorksLabs/stockstarlight-sandbox-codeworkslabs-dev`, production branch
`main`, with build command `npm run build`, deploy command `npm run deploy`,
root directory `/`, and non-production branch builds enabled. Cloudflare
reported that the first repository-driven build would begin on the next push;
this checkpoint update is that triggering push. Live deployment and Matomo
receipt remain to be verified after the build completes.

The first repository-driven deployment completed as Worker version
`fbe2a737-919c-405b-9f8c-5a8b0e94cd10`. The live root returned HTTP 200 and
its primary runtime contained the Matomo endpoint. Browser qualification then
proved that the earlier manually exercised `/analytics/` and
`/analytics/next/` journey surface had never been retained in this repository;
the repository-driven deployment therefore returned the stock Starlight 404
for `/analytics/`. The repository now contains permanent Starlight-native
journey and receipt pages, exposes the test through the sidebar, distinguishes
all four configured provider labels including Matomo, and uses the dedicated
`cwl_starlight_journey_continued` event name. The corrected build emitted six
pages, completed Pagefind, sitemap, and image optimization, and passed the
Wrangler dry-run. Only the two known stock-content warnings remained. The
reviewed alpha.8 package is unchanged.

## Analytics for Astro alpha.9 preparation — 2026-09-13

Public product `main` commit
`43473be89dd9e29144c92f3ac0f6e6ab0776f104` and annotated tag
`v0.1.0-alpha.9` add the reviewed Umami adapter. This repository now declares
that exact tag/commit in `analytics-source.json` and CI, vendors the exact
tag-built archive, updates its lock to alpha.9, and labels Umami explicitly in
the journey receipt UI. The archive is 45,298 bytes with SHA-256
`0F52A54583AB7A875BEC39B55E2B1095B872D47C712588335B634B8EC9AE253A` and npm
integrity
`sha512-tQOoC/1EadcOP0sHjhGbD0ecI0HzJsONFXyP/pJzk6+hygbeEn/y6d73DQryOYuFE92UucJF0t/qWN56NkcaGQ==`.

Before Umami configuration was available, the exact alpha.9 dependency passed
the repository's sequential `npm ci`, production audit, Starlight build,
Pagefind/sitemap/image generation, and Wrangler dry-run gates. Analytics Tools
then created the site's distinct Umami record after Site Registry admitted
canonical Site `site-000028` and deployment `sdep-000028`. The public website
UUID is `b668a0a3-9058-409c-bbef-f1ac9aa7d81f`, using
`https://umami.codeworkslabs.net/script.js`; no separate `hostUrl` is needed
because collection uses the same origin. Final gate replay, commit, push,
repository-driven deployment, and live receipt remain pending. The two known
stock-content warnings remained unchanged.

The fully configured final local gate passed sequentially: clean `npm ci`, zero
production dependency vulnerabilities, six-page Starlight production build,
Pagefind/sitemap/image generation, Wrangler dry-run, and `git diff --check`.
The installed runtime SHA-256 is
`4DC88354F6C562FC42A1BA64889819958C36FC966706038FC55C1B103F598400`. Emitted
bundle `dist/_astro/page.C00njAER.js` contains the exact Umami script origin and
Starlight website UUID. The repository is ready for its alpha.9 commit/push and
Cloudflare Workers Builds deployment.
