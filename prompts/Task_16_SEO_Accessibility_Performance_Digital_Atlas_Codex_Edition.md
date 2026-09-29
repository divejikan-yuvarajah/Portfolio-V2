# PORTFOLIO V2 — TASK 16
## SEO, Accessibility & Performance — Complete Enhanced Codex Edition (Digital Atlas)

**Portfolio:** Yuvarajah Divejikan / Portfolio V2  
**Task:** 16 of 17 — technical quality and release-readiness audit  
**Implementation branch:** `task/16-seo-accessibility-performance` (unless a pre-existing branch with this name contains unrelated work; then use a unique, descriptive name)  
**Required foundation:** Approved Task 14B Digital Atlas + Task 15 Digital Atlas responsive implementation  
**Architecture:** Static HTML, CSS, browser ES modules, generated four case-study HTML routes, optional Three.js and GSAP/ScrollTrigger  
**Design language:** Porcelain Arctic / Digital Atlas: editorial, asymmetrical, precise, readable and accessible.  
**Scope:** Task 16 ONLY. Do not complete Task 17, deploy, publish, register Search Console, invent a domain, or merge automatically.

---

## 01 — Role and mission

Act as a senior technical SEO engineer, accessibility specialist, web performance engineer and careful QA reviewer. Make the existing creative portfolio **discoverable, perceivable, operable, understandable, robust and efficient** without flattening the Digital Atlas design or deleting purposeful motion.

This is an **implementation task**, not merely an audit report. Identify and fix problems actually found, verify them using available tools, document what is tested versus untested, and keep every change focused on SEO, accessibility, robustness or measurable performance. Preserve the current content, project statuses, externally verified links, section order, four case-study routes, project filter, contact mailto handoff, navigation and reduced-motion experience.

**Quality north star:** the site remains distinctive in its first frame, clear for search engines and screen readers, keyboard-friendly, responsive from 320px, usable on slow or constrained connections, and pleasant when all decorative JavaScript is absent.

---

## 02 — Confirm the actual repository and choose the correct base

The relevant repository is `https://github.com/divejikan-yuvarajah/Portfolio-V2`. Do not work in the original `Mister_PersonalPortfolio` repository.

**Important branch history:** The older `task/15-mobile-tablet-optimisation` exists but is based on the pre-Digital-Atlas layout. The newer `task/15-mobile-tablet-optimisation-digital-atlas` contains `docs/RESPONSIVE_ATLAS.md` and Task 15 responsiveness improvements. A `feature/mobile` ref may also contain the newer work. Branch status may have changed by execution time; inspect live refs rather than trusting this note indefinitely.

1. Run `git status`, inspect the local/remote branches, and `git fetch origin --prune` when safe.
2. Read `docs/RESPONSIVE_ATLAS.md`, `docs/CREATIVE_DIRECTION.md`, `docs/MOTION_SYSTEM.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/CONTACT_AND_SOCIAL.md`, `docs/PROJECT_CASE_STUDIES.md` and relevant QA evidence **if present**.
3. Identify which approved integration branch contains Task 14B **and** Task 15 Digital Atlas, by comparing history/tree/diffs and any relevant PR. If not merged, branch from the approved latest Task 15 Digital Atlas tip; do not silently use older `main` or old Task 15.
4. Do not overwrite existing untracked owner files, npm files, working-tree edits, QA screenshots or other branches. If there is an existing Task 16 branch, inspect it before choosing whether to reuse or branch under a unique suffix.
5. Record the base ref and SHA in the documentation and final report.
6. If Task 15 is not truly completed/integrated, identify the blocker accurately and avoid pretending the dependency passed.

Do not undertake an unapproved framework migration. The source of truth is the current static site, not a hypothetical Next.js app.

---

## 03 — Files and current implementation to inspect

Inspect actual paths before editing. Likely relevant:

- `index.html` — homepage, semantic content, head metadata, project/filter/nav/contact structure.
- `404.html` — static not-found page; currently uses `noindex`.
- `projects/flowpilot-ai/index.html`
- `projects/cortex/index.html`
- `projects/mediguardian-ai/index.html`
- `projects/infraos/index.html`
- `scripts/generate_case_studies.py` — **source generator for the four case-study pages**.
- `data/case-studies.json` — case-study facts; preserve evidence boundaries.
- `css/tokens.css`, `css/style.css`, `css/case-studies.css`.
- `js/main.js`, `js/motion.js`, `js/animations.js`, `js/navigation.js`, `js/projects.js`, `js/contact.js`, `js/three-scene.js`, `js/case-study.js`.
- `images/profile_new.jpeg`, `images/My_CV.pdf`, original archived project images.
- `docs/qa/task14b/`, `docs/qa/task15/`, and newer relevant evidence.

The current generator already owns titles, descriptions, OG title/description, and `WebPage` JSON-LD for individual case studies. **Make SEO generator changes at the source and regenerate all four routes. Do not patch generated files alone.** Run its `--check` mode after generation.

The contact form is explicitly a **mailto email-app handoff**, not server delivery. Do not claim or simulate successful delivery, attach tracking without consent, or replace it with a backend during Task 16.

The npm manifest may contain a GSAP package that the static runtime does not actually import. Verify runtime dependency ownership; do not assume that installed `node_modules` means the app requires a build step.

---

## 04 — First create a measurable baseline

Before making substantive changes, establish an evidence table for the homepage, four case studies and `404.html`:

- document title, description, canonical status, robots status, OG/Twitter status, structured data and H1 count;
- asset totals and sizes by type; portrait dimensions/file size; images lacking dimensions or descriptive alt text;
- initial external requests (fonts, GSAP, ScrollTrigger and optional Three.js CDN), load failures and console warnings;
- real mobile/desktop performance when browser tooling is available;
- structural accessibility scanner findings and manual keyboard/zoom/reduced-motion observations;
- local asset href/src resolution and direct route loading;
- comparison of the original and modified layouts to catch accidental creative regressions.

Take baseline screenshots and Lighthouse/DevTools measurements **when executable tooling exists**. If no browser, state that limitation and run honest static checks. Do not make up Lighthouse scores or accessibility conformance.

Save findings to `docs/SEO_A11Y_PERFORMANCE.md`; put optional machine-readable/screenshot evidence under `docs/qa/task16/` or the existing QA structure. Do not commit browser profiles, gigantic trace files, or generated caches accidentally.

---

## 05 — Technical SEO: document fundamentals

### Homepage

1. Keep one unique, natural title identifying **Yuvarajah Divejikan** and the verified focus: AI/ML-focused software development and tech entrepreneurship. Avoid keyword stuffing or unverified titles/accolades.
2. Use a concise description aligned with actual visible Hero/About copy and projects. Do not promise services, client outcomes, qualifications, or awards unsupported by page content.
3. Maintain `<html lang="en">`, UTF-8, mobile viewport, exactly one logical H1 and heading hierarchy.
4. Verify a human-readable, descriptive OG title/description/type and `twitter:card`; use an actual, appropriately sized image only when present and publicly resolvable.
5. Add `theme-color` that aligns with Porcelain Arctic if missing.
6. Avoid two canonical links, two descriptions, or duplicate conflicting social metadata.

### Four case studies

1. Ensure each route has a unique project-specific title, description and OG metadata; avoid boilerplate copies.
2. Match project status and owner contribution statements in the approved data; CORTEX collaboration and MediGuardian prototype caveats must remain accurate.
3. Keep one H1 per route and a usable visible breadcrumb/back path.
4. Add a correct canonical/OG URL only after the production origin is verified (see next section).
5. If structured data is used, keep `WebPage`/`CreativeWork` descriptions truthful; no fictitious award, founder, customer, review, aggregate rating, launch date or publicly available demo.
6. Preserve generated-page content and routing. Verify `scripts/generate_case_studies.py --check`.

### 404

Keep `noindex`, valid navigation back to home/projects, and clear accessibility semantics. Do not list the 404 URL in a sitemap; do not give it a canonical to the homepage merely to hide an error.

---

## 06 — Production domain gate: canonical URLs, sitemap, robots

**Never fabricate a deployment host.** A GitHub repository URL is not automatically the site's public canonical URL. Check for a documented, owner-approved production URL in the current repository/deployment configuration. If absent:

- prepare metadata logic/templates or a documented `SITE_ORIGIN` configuration with an explicit release gate;
- leave canonical, OG absolute URLs and sitemap generation pending rather than shipping `example.com`, a guessed Vercel subdomain or conflicting absolute URLs;
- ensure meaningful local metadata still works without a domain;
- document exactly what Task 17 must set after the final site origin is approved.

If a verified origin is available:

- normalize HTTPS, host casing, trailing-slash and `/index.html` policy according to the actual host's real behaviour;
- emit a single self-referencing canonical per indexable page;
- use absolute OG page/image URLs;
- generate `sitemap.xml` containing only approved canonical public URLs for home and four case studies (do not include `404.html`, unresolved routes, preview deployments or private assets);
- create or update `robots.txt` only if appropriate to the deployment, and point to the real absolute sitemap if it exists;
- verify canonical/href/sitemap consistency with the static hosting route behaviour and no accidental `noindex` on public pages;
- do not assert redirects or server headers unless the hosting platform has implemented and tested them.

Do not add decorative dateModified, organization addresses, site-search actions or other invented data.

---

## 07 — Structured data that matches reality

Consider a modest JSON-LD graph for the homepage (`Person` and/or `WebSite`/`WebPage`) only if every property is verifiable from visible content. Name: Yuvarajah Divejikan. Public social `sameAs` may include the verified GitHub/LinkedIn URLs already linked on the website. `image` only if real public portrait URL resolves. Use accurate organization affiliation/roles when supportable, without fake founding dates or product associations.

**Do not blindly use Google's `ProfilePage` rich-result markup** just because this is a personal portfolio: determine applicability against Google's actual intended use and requirements; simple `Person`/`WebPage` is sufficient when relevant. JSON-LD is not a promise of a rich result.

For case studies, retain correctly serialized `WebPage` data and add other schema only when it precisely fits. Escape values safely in generator output; do not inject unsanitized HTML, duplicate JSON-LD graphs, or mark typographic illustrations as authentic screenshots.

Use official validation tools when available; otherwise validate JSON syntax and source/value agreement, reporting remote validation as unrun.

---

## 08 — Accessibility: audit against WCAG 2.2 AA

Target **WCAG 2.2 Level AA** as an engineering goal; do not claim certification or complete conformance based solely on axe/Lighthouse/static scans. Manually test relevant interactions.

### Semantics and navigation

- Landmarks: header, labelled primary navigation, main, footer and clear section labels.
- One H1 per page, logical section headings, no hierarchy jumps made only for styling.
- Skip link works and focus lands in meaningful main content; standalone case studies have an equivalent path.
- Navbar toggles with native button, accurate accessible name/`aria-expanded`/`aria-controls`, Escape, outside click, link selection and viewport reset.
- Native hash links and browser Back/Forward; sticky header must not obscure targeted headings or focused controls.
- No duplicate IDs, empty links or inaccessible pseudo-buttons.
- Breadcrumbs expose current page correctly; archive/filter controls are operable without a pointer.

### Visual and input accessibility

- Contrast: 4.5:1 normal text, 3:1 large text, and 3:1 meaningful UI component boundaries/graphics where applicable. Test actual combinations against alternating porcelain/navy surfaces; Arctic blue is not appropriate as tiny text on white.
- Readable, logical content at 200% text scaling; test 400% zoom/reflow where available (1280-to-320 equivalent is only a partial approximation).
- Verify custom letter spacing, outline typography and decorative clipping do not hide meaningful copy.
- Focus-visible rings remain visible, including under sticky header (WCAG 2.2 focus-not-obscured).
- WCAG 2.2 AA target-size minimum is 24x24 CSS px with specified exceptions; **prefer 44x44** on standalone buttons/touch interactions as the project's stronger ergonomic standard. Do not falsely describe 44x44 as the general WCAG 2.2 AA minimum.
- Touch interaction has no hover-only critical information; small links have spacing or accessible equivalents.
- Input labels, errors, `aria-invalid`, error relationships, status announcement and correct validation order for the contact form. Do not tell people a message was sent; a mail app only prepares it.
- Meaningful portrait alt; decorative poster, signal SVG, chapter ornaments and Three.js canvas hidden from the accessibility tree when appropriate; accurate alt on any real project screenshot.
- Do not write redundant alt describing nearby identical text.
- Check forced-colors, dark-mode preference if relevant to current visual design, and text-selection clarity.

### Motion accessibility

- System `prefers-reduced-motion` toggles must be honoured live, not only at load.
- No persistent text hidden behind a mask if GSAP/ScrollTrigger fails or loads late; initial HTML/CSS must be readable.
- Do not animate focusable controls out of keyboard reach or trap users in pinned content.
- Maintain native scrolling; no scroll-jacking or compulsory horizontal gesture.
- Decorative animations must not control access to content or delay essential functions.
- Review keyboard/screen-reader experience while filters update, direct case-study pages load, and contact error messages appear.

Use axe, Lighthouse accessibility, HTML validators or browser accessibility snapshots as diagnostics **plus** keyboard/manual testing. Report issues by severity and exact page/component.

---

## 09 — Performance: Core Web Vitals and budget

Use current web.dev Core Web Vitals guidance as an evaluation framework:

- **LCP good:** <= 2.5 seconds.
- **INP good:** <= 200 milliseconds.
- **CLS good:** <= 0.1.
- These are field-data thresholds evaluated at the **75th percentile**; a single Lighthouse or local test does not prove field performance or achieve a guaranteed score.

Record **lab** results separately by page/device/network and only quote measured values. If field data is unavailable, write `Field data unavailable` rather than simulating it. A reasonable *engineering target* is Lighthouse >=90 Performance/Accessibility/SEO, but it is not a hard completion criterion and no score should be fabricated or achieved through hiding real content.

### Prioritised opportunities

**Portrait / images**
- Audit the above-the-fold `images/profile_new.jpeg` (the source is large) and generate sensible responsive AVIF/WebP/JPEG derivatives if tooling is available; preserve original for rollback.
- Provide intrinsic dimensions or aspect-ratio, appropriate `srcset`/`sizes`, and correct loading/decoding hints. The LCP hero image should generally be eagerly loaded and possibly `fetchpriority="high"` if measurement confirms it is the LCP target.
- Below-fold real screenshots should be lazy-loaded; avoid lazy-loading critical Hero media.
- Do not replace authentic photos with generated photos, fake project screenshots or lower-quality placeholders.

**Fonts / CSS**
- Audit Google Fonts requests, preconnect, `display=swap`, font variants and duplicate CSS. Preserve Manrope, Inter and JetBrains Mono identity where actually used.
- Reduce render-blocking CSS safely without creating large inline style duplication. Check unused legacy selectors with real usage before deletion.
- Reserve card/media space and avoid typography shifts after font loading.

**JavaScript**
- Inspect runtime path: `js/main.js` initializes navigation, filtering and contact independently; animations are optional. Preserve separation and no-JS content.
- GSAP core and ScrollTrigger are dynamically loaded at a pinned 3.15.0 CDN version in the approved Task 14B branch. Do not add a second loader or double-initialize GSAP. Reuse official GSAP performance patterns and cleanup.
- Test late-load, blocked GSAP, cached GSAP, BFCache restoration, responsive matchMedia transitions and `portfolio:projects-filtered` refresh.
- Guard against animation-induced layout shifts and excessive long tasks; transforms/opacity for decorative motion rather than frequent layout property changes.
- Examine desktop ScrollTrigger counts, sticky poster geometry and excessive refresh/listener patterns. Make measured improvements; don't remove the creative motion by default.
- Audit the optional Three.js particle scene: avoid loading on constrained/coarse/reduced-motion paths established in Task 15; verify fallback when CDN/WebGL fails. Prefer minimal changes within Task 16 to avoid destabilizing the scene.
- Keep heavy video, frameworks, smooth-scroll libraries, new icon libraries, unneeded analytics and additional animation plugins out of scope.

**Network / caching**
- Record transfer sizes, external domains, cache hints and third-party failures when measurable. Do not claim to set HTTP caching/compression headers unless the actual hosting configuration is under control and verified.
- Prevent giant source maps, npm modules, test artifacts or screenshots from being shipped unintentionally.

---

## 10 — Static-site reliability and crawlability

The homepage and case studies must be meaningful **without JavaScript**; static HTML should contain essential identity, heading, project summaries, links, project facts, and contact address.

- Run a local static server rather than opening source files directly with `file://` for verification.
- Direct-load `/`, each `projects/<slug>/`, and `404.html`. Refresh them to verify static hosting behaviour.
- Validate generated routes after modifying the generator; no drift between `data/case-studies.json`, gallery source and generated pages.
- Confirm all local images/styles/scripts/PDF targets resolve; `images/My_CV.pdf` still downloads and has valid PDF bytes. Do not call it latest/current without verifying its contents.
- Check all internal anchors and external link markup. Test live external URLs where possible; when blocked, record the limitation rather than deleting user-supplied links arbitrarily.
- `target="_blank"` must use safe `rel="noopener noreferrer"` where relevant.
- Do not rewrite `mailto:` into a tracking form, claim receipt, or expose private contact data beyond already published information.
- Check content security concerns relevant to any generator serialization and `innerHTML` usage, but avoid adding a brittle CSP meta tag that breaks CDN/import-map behaviour without tested deploy headers.

---

## 11 — Prioritized implementation phases

### Phase A — Baseline and issue ledger

Inspect all six HTML pages, docs and Task 15 QA. Capture metrics/screenshots if available. Produce a table of *issue, severity, route, evidence, proposed fix, verification*.

### Phase B — Metadata and crawlability

Fix titles, descriptions, social previews, H1/heading ordering, document language and robots mistakes. Add domain-dependent canonical/sitemap only behind verified production-origin gate. Update `scripts/generate_case_studies.py` for generated outputs. Avoid unsupported structured data.

### Phase C — Accessibility fixes

Repair identified contrast, semantic, keyboard, form announcement, image alternative text, focus, touch/reflow and reduced-motion problems. Maintain editorial type and visual motifs where accessible. No global “all cards are buttons” shortcuts.

### Phase D — Measured performance improvements

Optimize LCP portrait and responsive imagery, external loading, CSS/JS bottlenecks, motion refresh, and layout stability as supported by baseline. Keep changes reversible and avoid unproven micro-optimization.

### Phase E — Cross-page and failure-path testing

Run static and browser tests at the documented matrix; include direct case study loads, filter changes, GSAP failure, Three.js failure, no-JS, slow network, mobile menu, keyboard focus, form handoff and back/forward.

### Phase F — Evidence and review

Update docs and test output, inspect `git diff`, confirm no unrelated content altered, commit on dedicated branch, push if authorized. **No merge or production deploy.**

---

## 12 — Concrete testing matrix

Test **all six documents**: homepage, four case studies and 404. For the homepage, additionally exercise project filters, nav, contact and animation state.

**Viewports** (where browser is available): width 320, 360, 375, 390, 414, 430, 600, 700, 768, 820, 912, 980, 1024, 1280 and 1440 px. Include short heights, orientation change, native zoom if possible and small desktop windows. The existing Task 15 QA already has a baseline; compare before/after instead of repeating unverifiable claims.

**Interaction modes:** keyboard only; coarse pointer/touch emulation; fine pointer; reduced motion; forced colors; data saver; disabled JS; blocked GSAP and Three.js CDN; browser Back/Forward; hash deep links; project filtering with focus retained; contact form invalid/valid and mailto handoff (no actual message send); fonts delayed.

**Automated checks** (run as actually available):

```bash
# Branch and whitespace
 git status --short
 git -c core.whitespace=cr-at-eol diff --check

# Browser ES modules
 for f in js/*.js; do node --check "$f" || exit 1; done

# Generated case-study parity
 python scripts/generate_case_studies.py --check
```

Add a small repeatable Python HTML/link/metadata/JSON-LD audit in `scripts/audit_site.py` **if useful**, but don't build a sprawling new toolchain. CSS syntax parse with an available parser; check duplicate IDs, H1 counts, links, absolute-URL gate, robots/sitemap consistency and 404 noindex. Run Lighthouse/axe only when tools are installed and runnable. Keep the results in committed human-readable docs; don't claim a command ran because it appears in this checklist.

---

## 13 — Preservation and change control

**Must preserve:**

- Digital Atlas cover, asymmetric editorial sections, original SVG atlas signals, all four alternating featured projects, and the Porcelain Arctic palette.
- Real portfolio facts, project order, case-study disclaimers, archive projects and their media.
- `#hero #about #skills #projects #achievements #experience #community #education #certifications #contact` existing IDs and navigation contract unless a clearly justified fix updates all references.
- `js/navigation.js` ownership of nav/menu; `js/projects.js` ownership of filtering/hidden and event; `js/contact.js` ownership of email-app handoff; `js/motion.js` ownership of GSAP; `js/three-scene.js` ownership of decorative canvas.
- Existing validated external links, the direct case-study URL structure and downloadable CV.
- Reduced-motion and no-JS reading experience, and Task 15 media gates.

**Do not** silently turn the site into Next.js/React/Tailwind, remove Three.js/GSAP for a better Lighthouse number, replace authentic content with generic SEO keywords, add ads/cookies/analytics, generate fake certification schema, change business achievements, overwrite owner branches or merge/deploy.

If a visual effect causes a genuine accessibility or performance problem, first adapt it (motion gate, simplified mobile variant, CSS fallback, smaller asset) and record the trade-off.

---

## 14 — Documentation deliverables

Create/update `docs/SEO_A11Y_PERFORMANCE.md` with:

1. Baseline/ref/SHA and inspected pages.
2. Issue ledger: severity, source evidence, fix, test result.
3. Exact page metadata inventory (titles/descriptions/robots/OG/canonical status).
4. Domain gate and outstanding production URL / social image requirements.
5. JSON-LD selection and validation; no unsupported claims.
6. WCAG 2.2 AA checklist, manual vs automated verification boundaries.
7. Core Web Vitals: measured field/lab values clearly separated; unavailable states labelled.
8. Network and asset optimization before/after byte sizes when actually measured.
9. GSAP/ScrollTrigger/Three.js degradation behaviour and layout-shift checks.
10. Test environment, browser/version/device mode, screen sizes, commands, failures and screenshots (where available).
11. Remaining release blockers for Task 17, ordered by impact.

Optionally store reproducible scripts/results/screenshots in `docs/qa/task16/`. Do not commit third-party assets without licensing permission.

---

## 15 — Completion acceptance criteria

### Search and metadata
- [ ] Homepage and four project pages have distinct useful titles and descriptions.
- [ ] One H1 per page, logical heading order, correct language and viewport.
- [ ] OG/Twitter data is honest; real assets only.
- [ ] `404.html` has `noindex` and is excluded from sitemap.
- [ ] Canonical/sitemap/robots either match a **verified** production origin or are explicitly deferred with a release gate.
- [ ] Generated page updates live in generator source, not just output pages.
- [ ] Structured data is valid, relevant and factually supported.

### Accessibility
- [ ] WCAG 2.2 AA target reviewed; identified high-priority issues fixed or clearly listed.
- [ ] Keyboard nav/menu/filter/contact/direct case study flow works.
- [ ] Focus remains visible under sticky nav, reduced motion works, and essential content is not animation dependent.
- [ ] Meaningful alt text, decorative treatment and readable contrast verified.
- [ ] Reflow/zoom and mobile target-size issues tested or explicitly outstanding.
- [ ] No false message-delivered claim or inaccessible error status.

### Performance and resilience
- [ ] A measured baseline exists, with improvements documented rather than invented.
- [ ] Hero portrait is appropriately sized and reserves layout space without hurting quality.
- [ ] Fonts, core JS, optional GSAP/Three.js and below-fold assets use suitable loading strategy.
- [ ] No unnecessary new framework or animation dependency.
- [ ] Direct static routes work, source references resolve, generator parity passes.
- [ ] No-JS/reduced-motion/CDN-failure paths preserve readable content and navigation.
- [ ] No visible creative redesign regression, no new horizontal overflow.

### Git and reporting
- [ ] Task 16 feature branch derives from approved Digital Atlas Task 15 baseline.
- [ ] Tests actually run and recorded, including failures/skips.
- [ ] Diff reviewed, docs updated and task changes committed/pushed when accessible.
- [ ] No automatic merge, production release or Task 17 changes.

---

## 16 — Required Codex completion report

Return a concise but complete report:

1. **Branch and baseline:** repository, approved Task 15 base ref/SHA, Task 16 branch and commit SHA.
2. **Files changed:** purpose and why each change was necessary.
3. **SEO:** actual home/case-study metadata, canonical domain decision, robots/sitemap status, schema used.
4. **Accessibility:** defects fixed, automated/manual tests, remaining WCAG 2.2 AA gaps.
5. **Performance:** actual measured bytes/metrics and test environment; label missing field data and any unavailable Lighthouse results.
6. **Resilience:** no-JS, blocked asset, reduced motion, mobile and direct-route results.
7. **Generator:** regeneration and `--check` results.
8. **Regression:** nav/filter/contact/CV/project/case-study/Three.js/GSAP content and visual checks.
9. **Unresolved deployment-dependent items** for Task 17, particularly production domain, OG asset, sitemap and live redirects.
10. Confirm no automated merge or deploy.
11. State: **Next: Task 17 — Final Testing, Production Readiness & Deployment. Do not implement it.**

---

## 17 — Reference standards and implementation guidance

Consult official references rather than random snippets, and evaluate current applicability:

- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WCAG 2.2 changes / target sizing / focus visibility: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Google Search Central technical SEO: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google canonical URL guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google structured data general guidelines: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google ProfilePage use cases: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Core Web Vitals: https://web.dev/articles/vitals
- CWV thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- Official GSAP performance and responsive practices: https://github.com/greensock/gsap-skills

These are references, not authorization to copy third-party creative code, claim rich-result eligibility, or change the portfolio's factual source of truth.

**FINAL DIRECTIVE:** Implement Task 16 only. Be rigorous and measured, maintain the distinctive Digital Atlas experience, use the Task 15 approved base, leave unsupported production-origin details gated, verify every result honestly, commit only focused improvements, and stop before Task 17.
