# PORTFOLIO V2 — TASK 15
## Mobile & Tablet Optimisation · Digital Atlas Edition
### Complete Enhanced Codex Implementation Brief

**Portfolio owner:** Yuvarajah Divejikan  
**Repository:** https://github.com/divejikan-yuvarajah/Portfolio-V2  
**Task:** 15 of 17  
**Feature branch (preferred if safely available):** `task/15-mobile-tablet-optimisation`  
**Approved visual direction:** Porcelain Arctic → Digital Atlas (Task 14B)  
**Objective:** Make the distinctive editorial UI and GSAP experience exceptional on phones, tablets, touch devices, landscape screens and zoomed desktop views—not merely squeeze desktop cards into one column.  
**Hard stop:** Do not implement Task 16 (SEO/accessibility/performance release pass) or Task 17 (production deployment), auto-merge, or deploy.

---

## 00 — Your role and definition of success

Act as a senior responsive frontend engineer, creative UI designer, mobile interaction architect, GSAP integration specialist, accessibility engineer and careful regression tester. First preserve the original design's **ideas → systems → impact** identity. Then deliver a coherent mobile/tablet interpretation of its cover, editorial atlas chapters, work-story panels, typography, signal-line motifs and closing invitation. The mobile site should feel intentionally art-directed, not like a truncated desktop page.

**Prioritisation:** real content and links → navigation/useability → static visual design → motion suited to device → performance → thorough validation. A still screenshot with motion disabled must look distinctive and deliberate.

### Acceptance in one sentence

From 320px-wide phones through desktop and at 200% zoom, users must be able to read every verified section, explore every featured and archived project, operate filters and menu, reach case studies and contact methods, and navigate with touch or keyboard without clipped content, horizontal scroll, awkward pinned regions or animation-imposed barriers.

---

## 01 — Baseline and branch-safety gate (CRITICAL)

Read the actual working repository before editing. Do not assume the sequence of branch names means everything is merged. Inspect at least:

- `git status`, remotes, branch graph, approved integration branch, recent commits and pending PRs.
- `index.html`, `css/tokens.css`, `css/style.css`, `css/case-studies.css`.
- `js/main.js`, `js/navigation.js`, `js/projects.js`, `js/contact.js`, `js/animations.js`, `js/motion.js`, `js/three-scene.js`, `js/case-study.js`.
- `docs/CREATIVE_DIRECTION.md`, `docs/MOTION_SYSTEM.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/PROJECTS_GALLERY.md`, `docs/PROJECT_CASE_STUDIES.md`, `docs/CONTACT_AND_SOCIAL.md`, and actual Task 14B QA outputs if available.
- `data/case-studies.json`, `scripts/generate_case_studies.py`, `projects/*/index.html`, `404.html`, current local images and `images/My_CV.pdf`.

**Known repository state at prompt-authoring time — must be reverified by Codex:** Task 14B's creative changes exist on `task/14b-digital-atlas-redesign`, while `main` showed the earlier Task 14 motion system. A `task/15-mobile-tablet-optimisation` branch already existed and, from one file comparison, appeared to contain that earlier system rather than Task 14B. Therefore **do not blindly checkout main and create/reset a branch with an existing name, do not overwrite an existing Task 15 branch, and do not build mobile optimisations on an older non-Atlas base**.

1. Determine whether Task 14B has now been integrated into the approved base. If yes, use that approved integration base.
2. If not integrated and owner has approved using the Task 14B work as Task 15's base, branch from its verified commit; preserve its changes. Never silently merge old `main` over it.
3. Compare the existing Task 15 branch against the chosen base. If it contains legitimate work, inspect/reconcile it without destructive reset or silent discard. If clean and already has the right approved baseline, continue there. Otherwise use a unique review branch such as `task/15-mobile-tablet-optimisation-digital-atlas` and explain why.
4. If source decisions conflict or there are uncommitted owner changes, preserve them. Document the blocking dependency rather than guessing; continue safe audit/documentation tasks where possible.
5. Record actual base SHA, feature branch SHA and relationship before implementing.

Task 15 must be a refinement of **Digital Atlas**, not a reversal to the old generic-card layout.

---

## 02 — Non-negotiable existing contracts

1. Preserve Porcelain Arctic's semantic tokens: porcelain `#F8FAFC`, warm `#F5F4F0`, navy `#0F172A`, cobalt `#2563EB`, Arctic `#60A5FA`, and existing accessible text/border colours. Reuse CSS variables; avoid hardcoding theme values into new mobile rules.
2. Retain Manrope / Inter / JetBrains Mono roles and the user's portrait `images/profile_new.jpeg`.
3. Retain the Digital Atlas editorial chapter rails, custom angular signal motif, original cover identity, four individual typographic project illustrations, distinct layouts and closing contact treatment.
4. Existing IDs and deep links: `hero`, `about`, `skills`, `projects`, `achievements`, `experience`, `community`, `education`, `certifications`, `contact`.
5. Preserve project order and truthful claims: FlowPilot AI, CORTEX, MediGuardian AI, INFRAOS as flagship cases; additional and archived projects remain browsable; case-study URLs load directly.
6. Do not change certifications, competition results, start dates, product statuses or linked source ownership. Never fabricate screenshots or success metrics.
7. Preserve Task 13 contact behavior: a **mailto/email-app handoff** with honest disclosure, not server-side delivery. Maintain no-JS direct email and social alternatives.
8. Preserve `#bg-canvas` as a decorative, optional Three.js background with failure and reduced-motion fallback.
9. Preserve the one GSAP coordinator, pinned-version loading, ScrollTrigger ownership, `gsap.matchMedia()` contexts, BFCache and clean teardown. Never add a second observer/controller competing over transforms.
10. Keep the static HTML/CSS/browser ES-module runtime unless an explicit separate architecture decision exists. Do not introduce Next.js, React, Tailwind, Lenis, another router, a new CSS framework or unapproved runtime dependencies as part of Task 15.

---

## 03 — Responsive design strategy: art direction, not shrink-to-fit

Establish a **mobile-first responsive interpretation** with a bounded content measure, fluid spacing, meaningful chapter numbering, strong typography and controlled negative space. Preserve recognizable Atlas identity at every size, but change composition where needed.

- **Wide desktop:** editorial twelve-column feel and comfortable asymmetric composition; preserve the large cover and alternating featured-work layouts.
- **Small laptop / wide tablet:** reduce unnecessary ornament width before shrinking meaningful copy; rebalance split layouts so text stays readable.
- **Tablet portrait:** use intentional one-column or 60/40 editorial combinations when meaningful; avoid overly narrow text with a decorative block consuming half the screen.
- **Phone:** use one clear reading axis, oversize but responsive title scale, purposeful off-center decorations and compact metadata rails; never stack every section into identical white cards.
- **Landscape phones and short-height devices:** avoid sticky/pinned effects, oversized fixed visual blocks and offscreen action areas; let pages scroll natively.
- **Touch devices:** don't assume hover capability or precise cursor; make important information/action labels always visible.

Avoid arbitrary per-device model targeting. Use content-driven breakpoints and feature queries (`pointer`, `hover`, height, reduced motion), ideally aligning CSS media rules with corresponding `gsap.matchMedia()` conditions. Document each breakpoint's reason. No viewport-width calculations that inadvertently cause horizontal scrolling (e.g. `100vw` inside padded containers) or layout locks.

### Target viewport/condition matrix

**Required widths:** `320`, `360`, `375`, `390`, `414`, `430`, `600`, `768`, `820`, `912`, `980`, `1024`, `1280`, `1440` px.  
**Required height cases:** `568`, `667`, `740`, `760`, `900` px where relevant; short desktop, split-screen tablet, mobile landscape.  
**Special conditions:** 200% zoom and where practical 400% reflow, large text, touch/coarse pointer, keyboard-only input, reduced motion, save-data, narrow/slow network, no JavaScript, blocked GSAP CDN and failed WebGL.  
**Dynamic conditions:** orientation change, resizing across 980/1024px, address bar collapse on mobile, open/closed menu, deep-linked case-study load, browser Back/Forward and BFCache.

Do not claim all of these were tested if tooling was unavailable. If a browser can capture screenshots, create meaningful portrait/tablet/desktop/landscape evidence with before/after comparisons and report exact dimensions.

---

## 04 — Responsive UI work by section

### 4.1 Header and navigation

- Preserve Task 03's native button, labeled primary navigation, `aria-expanded`, `aria-controls`, `inert` closed links, Escape/outside click/link selection and desktop breakpoint reset.
- Adapt the Digital Atlas brand annotation: fit it, abbreviate a redundant secondary line, or hide only decorative duplicate wording at very narrow widths; the `Divejikan.` wordmark must remain.
- Mobile menu should fit available **visual viewport** height without masking page content or making last links unreachable. Use bounded scroll area and reliable stacking above Atlas SVG/canvas.
- Preserve section active marker and real hash targets; avoid sticky header covering headings or focus destinations; keyboard focus must be visible after opening/closing the menu.
- At ~980px and nearby, test both sides of breakpoint, no overlap/flicker or JS/CSS mismatch.
- Do not add scroll hijacking or a new sticky bottom toolbar without a demonstrated need.

### 4.2 Hero — signature mobile cover

- Recompose the three-line statement `I build / intelligent / systems.` for phone widths without broken word wrapping or clipping. Test long text and browser font fallback; use `clamp`, responsive tracking/line height, and semantic authored line wrappers.
- Preserve full accessible name, role, actual summary, Zatroz/Softora/education context, working Projects, Contact and CV actions.
- Intentionally position the portrait relative to text. On phones, choose a balanced portrait crop/frame and readable text hierarchy; don't leave a giant empty half-screen or squeeze the face.
- Retain design's edition line and atlas registration/corner marks, but simplify redundant ornaments on small screens; keep source image identity unchanged.
- Ensure the Hero fits short viewports without a forced `height: 100vh` crop; prefer `min-height`/content flow and modern viewport units only when supported with safe fallback.
- No first-paint hidden heading; initial or delayed GSAP must not move hero CTA beyond reach. Respect `#hero` deep link.

### 4.3 About / editorial chapters

- Collapse the asymmetric body/focus columns intentionally, maintaining logical DOM reading order and comfortable `ch` measure.
- Keep chapter index and signal motif visible in a reduced shape rather than hiding the entire visual identity.
- Avoid chapter-title rules extending offscreen; decorative SVG should live in a clipped, pointer-free wrapper without hiding focus outlines.

### 4.4 Technical Expertise

- Maintain six distinct actual skill groups with readable dense labels, not numeric rating bars.
- Recompose technical index rows/cards with balanced spacing; wrap very long technology names naturally.
- Avoid using CSS `order` that changes logical reading order or makes screen reader vs visual order diverge.

### 4.5 Featured Work — most important mobile story

- Retain four art-directed features in verified order, with project text, status caveats, action links and labeled illustration still visually distinct on mobile.
- Desktop Task 14B uses an **ordinary-flow sticky vertical alternative**, not a horizontally pinned deck. Keep that choice. On phone, short tablet and touch/short-height screens, disable decorative sticky columns and desktop scrub; show projects as deliberate stacked editorial spreads.
- Every feature must reveal its link/actions immediately in normal reading order; never hide them behind a swipe-only carousel.
- Each poster's typography/diagram has a responsive version; long project names fit, SVG is bounded, poster disclaimer remains legible (`typographic illustration, not a screenshot`).
- Preserve category filtering state and `hidden` semantics from `js/projects.js`; a filter must not leave blank sticky spacers, stale ScrollTrigger measurements, hidden focusable links or a faux empty category.
- Keep the recent and nine archived projects. Gallery grids may change column count, but no archive items or metadata disappear to simplify mobile.
- Any contributions details or expanded panels must reflow without overlaying sticky decorations; queue a single relevant ScrollTrigger refresh after layout changes.

### 4.6 Four individual case-study pages

- Test `projects/flowpilot-ai/`, `projects/cortex/`, `projects/mediguardian-ai/` and `projects/infraos/` as direct routes, including phone and tablet widths and nav/back links.
- If case study markup is generated, edit `scripts/generate_case_studies.py` and/or shared `css/case-studies.css`, then regenerate and check outputs rather than hand-edit generated HTML only.
- Preserve truthful source notes and project statuses; no fake device mockups or screenshots. Make wide diagrams, metadata, tables and code blocks scroll within their own bounds only when unavoidable, never widen the page.
- Check all relative links/assets from nested routes and `404.html`.

### 4.7 Achievements

- Preserve the premium inverse navy Cursor result poster, its accurate placement and other achievements. Reflow result typography and rule motifs without text/image collision.
- Make secondary results scannable, not tiny badge-only items. Never animate fake numbers.

### 4.8 Experience & Ventures / Community

- Present Zatroz/Softora narrative and AARNA/HNB records in clear semantic order with role and verified chronology legible.
- On phone, reduce decorative timeline depth before reducing text or hiding dates; no tiny multi-column rails.
- Distinguish community leadership/involvement without stuffing every entry into a shallow scrollable card.

### 4.9 Education & Credentials

- Make long award and institution names wrap naturally and preserve `#education` / `#certifications` anchors. Dates and credential notes must not collide with decorative numbers.
- Show real verification links only if present; unverified credentials do not acquire placeholder actions.

### 4.10 Contact & footer

- Keep the Digital Atlas closing question memorable and legible on narrow screens; signal endpoint and footer should align to the same grid.
- Email/GitHub/LinkedIn actions stay reachable; never truncate email address into unusable hidden text.
- Form labels, field widths, validation, errors, focus and mailto handoff disclosure remain accessible. `textarea` can grow; no body scroll lock during email handoff.
- Footer links and back-to-top retain enough spacing/touch targets; don't duplicate overcrowded desktop navigation on phones.

---

## 05 — GSAP and Three.js responsive motion policy

This task is **mobile adaptation of approved motion**, not an invitation to add motion everywhere.

- Read actual Task 14B `js/motion.js` and `docs/MOTION_SYSTEM.md` before changing animation timing. Identify the current **one coordinator**, `gsap.context()`/`gsap.matchMedia()` ownership, plugin version and listener lifecycle.
- Desktop-only decorative project scrub may run only on a sufficiently wide **and tall**, fine-pointer viewport (the approved Task 14B design used approximately `min-width: 1024px`, `min-height: 760px`, fine pointer). Verify CSS and JS gates match. Rebuild/revert cleanly on orientation/breakpoint transitions.
- On mobile, landscape/short viewport, coarse pointer, reduced motion or save-data: use **complete static visual composition or minimal one-shot transitions**. Don't load optional animation assets if the existing startup policy intentionally skips them.
- Keep headings and links visible from first paint. Never animate `hidden`, accessibility attributes, layout height or interaction state.
- Use transform/opacity/clip on **decorative inner wrappers**, not parent containers that hold focusable CTAs or sticky navigation. Avoid forced reflow via animating top/left/height/width on scroll.
- If GSAP late-loads, fails, or is blocked, content remains readable. If only a plugin is unavailable, avoid half-built timelines and remove temporary styles.
- Only refresh ScrollTrigger when real geometry changes; use debounce/coalescing and clean up resize/listener subscriptions. Keep filter refresh event ownership in `projects.js`/motion coordinator; no new global scroll loops.
- On live reduced-motion change, revert locally owned timelines/ScrollTriggers without killing unrelated systems; restore all content and avoid replay loops or opacity artifacts.
- Keep Three.js an optional decorative layer: preserve static reduced-motion render, failure cleanup and pointer passthrough. On constrained devices, skip or reduce heavy effects with a measured rationale, and do not leave an empty overlay.
- Keep the **native cursor**; don't reintroduce a follower cursor on touch/mobile.
- Test phone scroll against sticky elements and WebGL repaint, especially on mobile browser address-bar changes.

---

## 06 — CSS / DOM engineering guardrails

1. Use `minmax(0, 1fr)`, sensible `min-width: 0`, fluid `clamp()` values, `max-width: 100%`, `object-fit`, `aspect-ratio` as appropriate; explicitly inspect longest content and focusable elements.
2. Do not “fix” overflow by broadly applying `overflow-x: hidden` to the body or main and masking broken elements; retain only justified decorative clipping wrappers and confirm sticky/focus continue working.
3. Prefer logical properties and container-aware design over deep nested viewport patches and repeated `!important`.
4. Audit `position: sticky`, transforms on ancestors, `overflow` containers, stacking contexts, scroll-margin and `100vh` usage. A transformed/sticky ancestor can break intended motion or anchor offsets.
5. Use fluid image sizes with correct intrinsic dimensions and `object-position` for the real portrait; archive assets remain in place. Avoid making low-resolution images fuzzy through extreme upscaling.
6. CSS should show no-JS content correctly by default. No CSS that hides site content waiting for a delayed CDN.
7. Avoid CSS `display: contents` on semantically meaningful interactive containers where accessibility risk exists.
8. Keep SVGs within declared viewboxes/containers and ensure masks/clips never cut accessible text under zoom/font fallback.
9. `hover: none`/`pointer: coarse` should remove misleading hover-only affordances; preserve visible focus feedback on touch keyboard configurations.
10. If adding CSS files, ensure correct load order and generator parity; avoid a large overlapping mobile override file if scoped component rules can solve the issue.

---

## 07 — Detailed execution workflow

### Phase A — Audit and mobile visual baseline

1. Verify selected base and existing Task 15 branch divergence safely (Section 01).
2. Inspect every current section and case-study route. Identify current CSS breakpoints and GSAP media gates.
3. Use actual browser screenshots if tooling exists. Capture key current states at 375, 768, 1024, 1440 and short-height desktop; capture long-scroll snapshots as practical.
4. Make a concrete issue inventory: exact viewport, selector/location, observed bug, severity, fix strategy, screenshots if possible. Do not claim issues without observing them.
5. Write a short plan in `docs/RESPONSIVE_ATLAS.md` documenting layout hierarchy, breakpoint strategy, motion matrix and branch decision.

### Phase B — Static composition first

6. Solve global containment, type scale, header, Hero, atlas rails and section spacing while keeping the distinctive still-state.
7. Recompose four featured work spreads and all additional project collections; align touch action targets and truthful visual labels.
8. Fix case-study pages via shared stylesheet/generator; preserve direct-route links.
9. Reflow other chapters, forms and footer. Avoid hiding content or rewriting claims.
10. Confirm no-JS/reduced-motion still screenshots look intentional before extending motion.

### Phase C — Responsive interaction and motion

11. Reconcile `css` breakpoints and `gsap.matchMedia()` gates. Remove desktop-only scrub/sticky motion from phones/touch/short viewport and handle dynamic orientation/resize.
12. Preserve native menu, filter, mailto and deep-link behaviour. Coordinate only geometry refreshes necessary after filter/expansion/font/image changes.
13. Check Three.js and GSAP independent fallbacks, no duplicate triggers, no body scroll lock, no motion-induced focus displacement.
14. Make only purposeful changes to current motion architecture; do not build a second coordinator or install unnecessary plugins.

### Phase D — Accessibility, QA and documentation

15. Test keyboard-only from skip link through nav, all featured cases, project filters, direct case-study routes, contact and footer; check visible focus doesn't disappear behind sticky surfaces.
16. Test touch/landscape/mobile at matrix widths and height cases; ensure input fields zoom/focus correctly (minimum usable mobile font size) and reachable CTA areas.
17. Test browser text resizing/200% zoom, ideally 400% reflow; forced-colors/high contrast if supported; reduced motion live; blocked GSAP; disabled JS; WebGL failure; hash navigation/Back/Forward/BFCache.
18. Run existing checks. The repository is static; do not invent npm test scripts. Use available `node --check` individually for JS, `python scripts/generate_case_studies.py --check`, local URL/anchor/image checks, optional CSS parser, and Git whitespace check for CRLF sources.
19. Capture after screenshots and compare composition against Task 14B, especially Hero, featured-work panel, contact. Where browser tools are absent, provide a manual QA matrix and clearly state what remains unverified.
20. Update `docs/RESPONSIVE_ATLAS.md`, `docs/MOTION_SYSTEM.md`, `docs/CREATIVE_DIRECTION.md` and case-study documentation **only where real implementation details changed**.
21. Stage only Task 15 files, commit and push reviewable work on a safe feature branch. No merge/deploy.

---

## 08 — Formal responsive QA grid

| Test | Mobile | Tablet | Desktop/short height | Expected outcome |
| --- | --- | --- | --- | --- |
| Hero type + portrait | 320/375/390/430 | 768/820/912 | 1024/1440, short 568–760h | No clipping; clear name/role/actions |
| Navigation | narrow + landscape | around 980 switch | 980/1024 | Functional toggle or full-row fit; focus visible |
| Featured work | touch / filters / direct links | rebalanced vertical flow | decorative sticky only if tall enough | All four projects/actions readable |
| Other collections | archive cards | two-column if appropriate | original layout | No lost or hidden project records |
| Case studies | all four direct routes | diagrams/metadata reflow | no broken shared header | Nested assets and links resolve |
| Contact | form labels/error + email handoff | content fit | full editorial closure | No fake delivery message |
| Motion | reduced/normal orientation change | resize across breakpoints | desktop scroll and short viewport | No duplicate triggers or hidden content |
| Browser fallback | no JS / blocked GSAP / WebGL fail | repeated | repeated | Site still readable and navigable |
| Accessibility | touch/keyboard/zoom | keyboard/zoom | keyboard/200% zoom | No focus traps or horizontal page scroll |

Add per-case status (`PASS`, `FAIL`, `NOT RUN`) and evidence reference to docs, not unsupported blanket claims.

---

## 09 — Automated and manual regression checks

**Core functionality:** navbar open/close/Escape/outside click/active link, section hashes and scroll offset, CV link path, category filters and visible counts, 4 case-study routes, project external URLs as authored, achievements text, education/credential disclosure, contact email-app handoff, GitHub/LinkedIn actions and footer links.

**Visual:** visible first paint; typography on system-font fallback; portrait crop; no masked heading at zoom; SVG motifs visually confined; alternating story layout still distinguishable; no horizontal page overflow; fixed canvas behind click targets; footer does not collide with content.

**Dynamic:** direct hash load, page refreshed mid-scroll, breakpoint crossing, orientation change, gallery filtering while scrolled, Back/Forward, BFCache restore, image/font late load, save-data and reduced motion toggles, GSAP CDN fail. Track and fix failures in the actual implementation.

**Static code:** inspect for unguarded selectors, duplicate IDs, dead relative asset links, JS parse errors, invalid CSS, accidental rewrite of generated pages, unapproved dependencies, staging unrelated files and malformed CRLF whitespace.

**Performance:** avoid layout thrashing, duplicate scroll listeners, enormous scroll distances, repeated ScrollTrigger refresh loops, unnecessary continuous animation on mobile, unbounded WebGL cost and nonessential network requests. Measure if tools exist; do not invent FPS or Lighthouse numbers. Preserve good image intrinsic sizing/decoding/lazy loading except above-fold portrait.

---

## 10 — Git procedure and existing-branch conflict

**Do not blindly run `git switch -c task/15-mobile-tablet-optimisation`** because this branch may already exist and may not contain Task 14B. Suggested inspection:

```bash
git status --short --branch
git branch -avv
git fetch origin --prune
git log --oneline --decorate --graph --all -n 35
# Inspect differences without modifying refs:
git log --left-right --oneline origin/main...origin/task/14b-digital-atlas-redesign
git log --left-right --oneline origin/task/14b-digital-atlas-redesign...origin/task/15-mobile-tablet-optimisation
```

Select the **approved Digital Atlas-containing base**. If the existing Task 15 branch is unsuitable, use a fresh unique name, for example:

```bash
# Illustrative only; verify approved base and clean worktree first.
git switch -c task/15-mobile-tablet-optimisation-digital-atlas <approved-atlas-base>
# Implement, audit and test.
git -c core.whitespace=cr-at-eol diff --check
git status
git diff --stat
# Stage only the intended paths and commit.
git add <specific-task-15-files>
git commit -m "fix: refine Digital Atlas for mobile and tablet"
git push -u origin task/15-mobile-tablet-optimisation-digital-atlas
```

Do not reset, rebase, delete, force-push, merge, squash, move, deploy or overwrite existing branches without authorization. Do not stage untracked owner files (including a package/lockfile or installed tools) merely because they are present. Record when the chosen workflow differs.

---

## 11 — Deliverables and Definition of Done

- [ ] `docs/RESPONSIVE_ATLAS.md` with actual breakpoint rationale and test outcomes.
- [ ] Deliberate mobile/tablet composition preserving Task 14B Digital Atlas signature moments.
- [ ] No unwanted horizontal page scroll or clipped meaningful content in required viewport matrix.
- [ ] Header/menu works around breakpoint and on short-height mobile.
- [ ] Hero type, portrait and CTAs remain readable and tappable at 320px.
- [ ] Four featured project spreads + all recent/archive projects retain content, filters and links.
- [ ] All four case-study direct URLs and nested assets work on mobile/tablet.
- [ ] Contact disclosure, validation and direct email/social links remain truthful and functional.
- [ ] Desktop-only sticky/decorative scroll motion disabled cleanly where unsuitable.
- [ ] GSAP, reduced-motion, no-JS, CDN-failure and WebGL-failure paths preserve visible content.
- [ ] Keyboard/focus/zoom and touch testing performed where tooling supports it.
- [ ] Existing static/generator checks performed; test results accurately documented.
- [ ] No unapproved stack migration, no unverified factual rewrite, no disappearance of archive content.
- [ ] Reviewable feature branch with focused commit SHA; no auto-merge or deployment.

---

## 12 — Required Codex final report

Supply these in order:

1. **Baseline decision:** approved base branch/SHA, status of Task 14B, existing Task 15 branch relationship and chosen working branch (explain if using unique name).
2. **Before/after mobile art direction:** what changed in Hero, chapter rails, four featured projects, content sections, case studies and Contact; show actual screenshots if available.
3. **File change log:** each file and purpose, including generator outputs if touched.
4. **Breakpoint table:** actual CSS/JS breakpoint conditions and corresponding layout/motion behavior.
5. **Animation changes:** GSAP/Three.js media gates, cleanup and fallback results; identify coordinator ownership.
6. **Responsive QA:** viewport-by-viewport `PASS`/`FAIL`/`NOT RUN`, actual screenshots/paths or manual testing instructions.
7. **Accessibility and functional results:** keyboard, touch, focus, zoom, navigation, gallery filtering, routes, contact and fallback tests.
8. **Actual command output summary:** JS/CSS syntax, generator parity, relative link/asset check, Git diff check; distinguish unavailable/unrun tests.
9. **Known issues and user confirmations needed:** genuine unresolved items, not generic placeholders.
10. **Git:** branch, commit SHA, pushed status and confirmation of no automatic merge or deployment.
11. **Next task:** Task 16 — SEO, Accessibility & Performance Audit. Do **not** start it.

### FINAL INSTRUCTION

**Implement Task 15 ONLY.** Preserve the Digital Atlas creative redesign while making it exceptional on mobile/tablet. Start from the approved Task 14B-containing baseline, inspect the existing Task 15 branch without destroying any work, implement real responsive composition and adaptive motion, validate honestly across devices/routes/accessibility/failures, and stop with a reviewable focused commit. Never auto-merge or deploy.
