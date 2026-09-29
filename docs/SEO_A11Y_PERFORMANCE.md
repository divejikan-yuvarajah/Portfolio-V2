# SEO, Accessibility & Performance Audit — Task 16

**Date:** 2026-09-29 (Asia/Colombo)
**Repository:** `divejikan-yuvarajah/Portfolio-V2`
**Task branch:** `task/16-seo-accessibility-performance`
**Approved Task 15 base:** `origin/task/15-mobile-tablet-optimisation-digital-atlas` at `98b2606a542d3e598de694b488fea5d220e9834e`
**Base status:** Task 15 is available on its dedicated pushed branch. It is not integrated into `origin/main` (`eb71267` at audit time). The later `origin/feature/mobile` commit (`d4e37a3`) adds only the supplied Task 15 prompt file; it does not change portfolio source. No open pull requests were returned by the repository API check. The owner-provided Task 16 prompt remains untracked and is not part of this implementation.

This is a focused static-site technical audit and implementation. The Digital Atlas structure, copy, project statuses/order, navigation IDs, project filters, contact email-app handoff, CV, GSAP coordinator, and optional Three.js scene are retained. This report distinguishes source checks, local HTTP checks, inherited Task 15 browser evidence, and browser checks that could not be repeated here. It does **not** claim WCAG conformance, search indexing, or field Core Web Vitals. The accessibility target is [W3C WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/); descriptive metadata and crawl guidance are informed by Google's [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Inspected pages and baseline

Inspected `index.html`, each of the four generated case-study routes, and `404.html`; the case-study data and generator; shared CSS and design tokens; navigation, contact, project-filter, motion, Three.js and case-study modules; the Task 14B/15 QA records; CV and image assets; repository and deployment configuration. No confirmed portfolio production origin, `CNAME`, hosting manifest, sitemap, or robots file was present.

### Before-change findings (Task 15 base)

| Area | Baseline evidence | Task 16 decision |
|---|---|---|
| Homepage search/social metadata | Unique title and description; no theme-color, Open Graph, Twitter card, or structured data | Added porcelain theme-color, descriptive Open Graph and Twitter summary tags, and a small verifiable `Person` JSON-LD object |
| Case-study metadata | Four distinct titles, descriptions, article Open Graph titles/descriptions/types, and truthful `WebPage` JSON-LD; no Twitter card metadata | Added Twitter summary card/title/description in the source generator; regenerated all four routes |
| Canonical and crawl files | No approved production host found; no canonical, sitemap, or robots file; 404 already had `noindex` | Kept absolute URL metadata, sitemap, and robots sitemap declaration gated; retained 404 `noindex` and did not invent an origin |
| Headline and language | English document language and one H1 per document | Confirmed in all six pages and included in repeatable static audit |
| Hero portrait | Original `images/profile_new.jpeg`: 3081 × 3072, 1,589,703 bytes; eager/high-priority with intrinsic dimensions | Added locally derived responsive WebP sources at three widths; preserved the original JPEG fallback and the existing loading priority/dimensions |
| Skip navigation | Homepage main target was focusable; generated case-study and 404 main targets were not explicitly programmatically focusable | Added `tabindex="-1"` to those main targets so the skip-link destination can receive focus |
| Static paths and CV | Four direct route files, 404 document, and PDF exist | Rechecked all local references and direct local HTTP routes; confirmed PDF signature |
| Interaction and motion resilience | Task 15 browser QA covered nav, filters, contact, reduced motion, no-JS, constrained devices, and blocked GSAP/Three.js | Runtime owners were left unchanged; inherited QA evidence is listed separately below because a browser session was unavailable for fresh interaction testing |

### Baseline metadata inventory

| Page | Title / description | Robots | Open Graph / schema | Canonical |
|---|---|---|---|---|
| Home | `Yuvarajah Divejikan | AI/ML Software Developer & Tech Founder`; `Explore the software, applied AI projects, technical interests, and experience of Yuvarajah Divejikan, an AI/ML-focused software developer and tech founder.` | Default indexable | Missing / missing | Not set |
| FlowPilot AI | `FlowPilot AI — Project case study | Yuvarajah Divejikan`; fact-checked SME finance workflows, sandbox integrations, reported team contribution | Default indexable | Unique article metadata / `WebPage` | Not set |
| CORTEX | `CORTEX — Project case study | Yuvarajah Divejikan`; collaborator team AI business operating system, verified links and contribution boundary | Default indexable | Unique article metadata / `WebPage` | Not set |
| MediGuardian AI | `MediGuardian AI — Project case study | Yuvarajah Divejikan`; qualified health-memory competition prototype, not a diagnostic service or verified clinical product | Default indexable | Unique article metadata / `WebPage` | Not set |
| INFRAOS | `INFRAOS — Project case study | Yuvarajah Divejikan`; in-development university infrastructure-coordination concept, details remain unverified | Default indexable | Unique article metadata / `WebPage` | Not set |
| 404 | `Page not found | Yuvarajah Divejikan`; page-not-found guidance | `noindex` | Not required | Not set |

## Changes implemented

### Search metadata and structured data

- The homepage retains its existing unique title and truthful summary description. Added `theme-color #F8FAFC`, Open Graph title/description/type/site name, and Twitter `summary` card/title/description. No image URL is published in card metadata because no public deployment origin or publicly resolvable portfolio image URL is confirmed.
- Added one homepage `Person` JSON-LD object with the visible name, concise visible role, and the same GitHub/LinkedIn URLs already linked in the page. It contains no invented address, organization, award, certification, start date, image, or public URL. The four case-study `WebPage` objects remain generated from the approved case data.
- Added Twitter summary card/title/description values to `scripts/generate_case_studies.py` and regenerated all four HTML outputs. Project titles, descriptions, status/contribution wording, and factual caveats remain sourced from existing data and gallery content.
- No production URL could be verified from deployment configuration. Consequently, canonical links, absolute `og:url`/`og:image`, `sitemap.xml`, and a sitemap-bearing `robots.txt` are deliberately deferred. The repository URL and linked demo hosts are not treated as the portfolio origin. No 404 canonical or sitemap entry is created. See [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Google recommends structured data reflect the visible page and its general policies; the markup here is limited to visible person information and case `WebPage` facts. No ProfilePage rich-result eligibility or search ranking is claimed. Remote Rich Results Test/URL Inspection was not run because there is no production URL. See [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

### Accessibility review

The working target is WCAG 2.2 AA; this source audit is **not** a conformance claim.

| Check / issue | Resolution or result | Verification boundary |
|---|---|---|
| Language, landmarks, H1, duplicate IDs | All six documents use `lang="en"`, one H1, and unique IDs; homepage/case landmarks and labels remain in place | Static parser; axe and assistive-technology review unavailable |
| Skip link destination focus | Case-study and 404 `<main>` targets now have `tabindex="-1"`; homepage already did | Source verified; keyboard activation not repeated in a browser |
| Image alternatives | Every `<img>` has an `alt` attribute; the page's illustrative SVGs/case posters are intentionally hidden from the accessibility tree | Static source audit; visual meaning review retained from existing design and copy |
| Programmatic ID references and safe external links | `for`, `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-errormessage` targets resolve; `_blank` anchors use `noopener noreferrer` | Repeatable static audit |
| Palette contrast spot checks | Calculated from current tokens: body `#475569` on porcelain `#F8FAFC` **7.24:1**; subtle `#64748B` on porcelain **4.55:1**; cobalt `#2563EB` on porcelain **4.94:1** and white **5.17:1**; inverse white on navy `#0F172A` **17.85:1**; arctic `#60A5FA` on white **2.54:1** | WCAG relative-luminance calculation for selected token pairs, not a complete computed-style/element audit. Arctic blue is decorative in the current hero divider and is not relied on as small text |
| Forms and controls | Existing contact fields keep visible labels, descriptive/error references and live status feedback; email remains an honest mail-app handoff. Navigation/filter buttons and contact inputs keep their existing target sizing/focus rules | Markup/CSS review only in this run; no new form submission or mail client launch was attempted |
| Motion and visual modes | Reduced-motion, forced-colors, static content, and optional-motion separation were not changed | Covered by inherited Task 15 QA; not re-driven in this turn |

Outstanding manual accessibility work is native 200%/400% zoom and reflow review, keyboard-only browser traversal (including the changed skip destinations), screen-reader testing, and complete computed contrast/target-size inspection in supported browsers. Automated axe/Lighthouse/HTML-validator output is unavailable here. No WCAG certification is asserted.

### Measured image and source sizes

The real owner-supplied portrait was re-encoded locally with Pillow WebP support (quality 84, high-effort method); its JPEG original remains untouched as the `<img>` fallback. These are measured file sizes, not estimated transfer totals:

| Selected responsive source | Dimensions | Bytes | Reduction vs original JPEG |
|---|---:|---:|---:|
| Original JPEG fallback | 3081 × 3072 | 1,589,703 | — |
| `profile-640.webp` | 640 × 638 | 22,784 | 98.6% |
| `profile-960.webp` | 960 × 957 | 40,316 | 97.5% |
| `profile-1280.webp` | 1280 × 1276 | 59,992 | 96.2% |

The `<picture>` source selects a size appropriate to its layout and device pixel ratio; its fallback `<img>` keeps the existing meaningful alt, intrinsic width/height, eager default loading, `fetchpriority="high"`, and async decoding. CSS makes the new `<picture>` fill the already aspect-ratio-reserved portrait frame. Since no browser/network trace was available, these numbers compare source files only; actual chosen request, transferred bytes, LCP, CLS, and visual layout shift were not measured after the change. JPEG-only clients continue to use the original source.

Pillow 11.2.1 was available; it was used only to create the responsive image assets. The baseline image directory contained 12 assets: 9 PNG files (4,016,030 bytes), 1 JPEG (1,589,703 bytes), 1 PDF (173,440 bytes), and 1 SVG (1,655 bytes), totaling **5,780,828 bytes**. Task 16 adds 3 WebP sources (123,092 bytes); the full on-disk image directory now totals **5,903,920 bytes**. A browser selects a WebP source where supported or the unchanged JPEG fallback; it does not download all formats for the portrait.

The page continues to request Google Fonts with `display=swap` and preconnects to the font origins. Core navigation/filter/contact JS is one local module graph; GSAP/ScrollTrigger remain dynamically loaded at the existing pinned CDN version, and Three.js remains optional and gated. The tracked `package.json`/lockfile list GSAP `^3.15.0`, but runtime source loads the pinned 3.15.0 browser files from cdnjs; no application JS imports the npm package and there is no build/test script. This audit leaves that existing package contract unchanged. No dependency or analytics was added. CSS source sizes at the Task 15 base were 6,045 bytes (`tokens.css`), 94,167 (`style.css`), and 15,167 (`case-studies.css`); current sources are 6,045, 94,246, and 15,167 bytes respectively, all before gzip/Brotli. No hosting compression/cache headers were configured or inferred.

## Test results

### Task 16 checks run

| Check | Result |
|---|---|
| `python scripts/generate_case_studies.py` | PASS; regenerated four routes and 404 from generator source |
| `python scripts/generate_case_studies.py --check` | PASS; all five generated static documents current |
| `python scripts/audit_site.py --json-out docs/qa/task16/static-audit.json` | PASS; 6 documents, 1 H1 each, distinct indexable titles/descriptions, valid JSON-LD, unique IDs, local references and IDREFs resolve, 2 local dynamic JS imports resolve, safe new-tab links, no missing image alt/dimensions, 0 errors / 0 warnings; 107 HTML local references checked; CV starts with `%PDF-` |
| Python syntax: `python -m py_compile scripts/generate_case_studies.py scripts/audit_site.py` | PASS |
| `node --check` on all 8 runtime files (`main`, `navigation`, `animations`, `motion`, `projects`, `contact`, `three-scene`, `case-study`) | PASS |
| tinycss2 parse of `tokens.css`, `style.css`, `case-studies.css` | PASS; 0 parse errors each |
| Direct local HTTP GETs through the existing server at `127.0.0.1:8765` | PASS: `/`, all four `/projects/<slug>/` routes, `/404.html`, all three WebP files and `/images/My_CV.pdf` returned 200 with expected content types. An unmatched route returned 404. The standalone `404.html` file is a normal 200 response when requested by its literal path; host-specific not-found rewrite behavior remains unverified. |
| CV download target | PASS: local PDF returned `application/pdf`, 173,440 bytes, and `%PDF-` signature |
| Contrast token spot checks | PASS for listed text pairs; arctic blue on white measures 2.54:1 and is not used for small text |
| `git -c core.whitespace=cr-at-eol diff --cached --check` | PASS; all staged Task 16 changes are whitespace-clean (CRLF-aware for the Windows repository) |

### Browser, field, and inherited evidence

- **Fresh Task 16 browser run:** not available. The installed Edge executable did not expose a working CDP endpoint when launched headless; `mcp__cua_repl` listed no browser surfaces. Lighthouse, axe, browser accessibility snapshots, local lab Core Web Vitals, request waterfall, final visual screenshot comparison, physical devices and assistive technology were therefore not run. Current Google Fonts, cdnjs GSAP/ScrollTrigger, and unpkg Three.js request outcomes were not measured in a new session. No scores or performance values are inferred.
- **Field Core Web Vitals:** unavailable; no Search Console / CrUX origin data was supplied. The published good thresholds are LCP ≤2.5 s, INP ≤200 ms and CLS ≤0.1 at the 75th percentile. These thresholds are context, not measured project results; see [web.dev Core Web Vitals](https://web.dev/articles/vitals) and [threshold guidance](https://web.dev/articles/defining-core-web-vitals-thresholds).
- **Inherited Task 15 browser QA at base `98b2606`:** Microsoft Edge 154 headless emulation, 14 viewport widths from 320–1440 px, direct four case routes, no-JS, reduced motion, forced colors, save-data/low-core, blocked GSAP/Three.js, nav/filter/contact, and responsive motion gates passed in the committed [Task 15 result record](qa/task15/results.json). Those results establish the baseline implementation, not post-Task16 browser verification. Native devices, zoom, screen readers, and real GPU behavior were not covered there either.
- **Motion and fallback preservation:** Task 16 changed no runtime JS module. The image/source and HTML changes preserve static content; core interaction ownership and reduced-motion/constrained-device gates remain as they were at Task 15. Blocked CDN and live motion transitions are inherited QA only, not freshly retested.

## Issue ledger and release gates

| Priority | Finding | Action / verification | Remaining work |
|---|---|---|---|
| Release gate | Public portfolio host is not confirmed | Did not fabricate canonical, absolute OG URLs, sitemap, or robots sitemap | Owner must confirm final HTTPS origin and URL/trailing-slash policy before Task 17 configures canonical URLs, `og:url`, public share image, sitemap, and matching robots sitemap entry |
| High | Portrait is 1.59 MB when served as original | Added 22.8–60.0 KB responsive WebP sources with retained JPEG fallback; sizes verified from disk | Confirm browser-selected source, portrait quality at desktop/mobile densities, and post-change LCP in real browser lab; optimize JPEG fallback only if target-browser coverage and quality justify it |
| Medium | Homepage had no social card or structured person metadata; case pages omitted Twitter metadata | Added accurate page-specific tags and visible-content-only JSON-LD; static JSON and page checks pass | Once host is known, decide whether a public social image can be safely referenced; validate remote preview in a share debugger |
| Medium | Case/404 skip targets had no explicit programmatic focus target | Added `tabindex="-1"` to main; generated output and static references pass | Verify focus appearance, scroll position, and announcements in browser/AT |
| Medium | No current post-change browser/performance audit tools are exposed | Recorded the limitation; static audit, HTTP route and byte checks are reproducible | Run browser, axe/Lighthouse, network throttling, layout shift and screenshot comparison before production release |
| Low | Hosting-specific 404 routing, caching, compression, redirects and crawl behavior are unknown | Made no server/header claims or guessed hosting settings | Verify actual host rules and HTTP headers during Task 17 |

## Repeatable checks

```powershell
python scripts/generate_case_studies.py --check
python scripts/audit_site.py --json-out docs/qa/task16/static-audit.json
python -m py_compile scripts/generate_case_studies.py scripts/audit_site.py
Get-ChildItem js -Filter *.js | ForEach-Object { node --check $_.FullName }
git -c core.whitespace=cr-at-eol diff --check
```

The audit script uses only Python's standard library. Pillow was used as an available local image tool; it is not a runtime or project dependency. `static-audit.json` records page metadata, route-reference checks, JSON-LD, and findings for this source revision.

## Task 17 handoff

1. Confirm the production hostname and route normalization; then set the site-origin configuration or approved metadata in source, generate self-canonicals and absolute social URLs, build `sitemap.xml` for the homepage plus four case studies only, and add a matching sitemap declaration to `robots.txt` if appropriate.
2. Choose and publish a real social preview image at a public absolute URL; then validate crawler access and social-card rendering.
3. Run Lighthouse/axe and real-browser network traces after the production-like host is configured; compare mobile/desktop screenshots and confirm WebP selection, LCP/CLS, reduced-motion/CDN failure paths and live navigation/form interactions.
4. Complete native keyboard, 200%/400% zoom, screen-reader, contrast, focus, target-size, browser/device and host-specific 404/redirect checks; inspect caching/compression headers only on the actual deployment.

No merge or deployment was performed. This task stops before Task 17.
