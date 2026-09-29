# Portfolio V2 — Task 14
## GSAP Animations & Interactions — Complete Enhanced Codex Edition

**Owner:** Yuvarajah Divejikan  
**Repository:** `divejikan-yuvarajah/Portfolio-V2`  
**Task:** 14 of 17  
**Feature branch:** `task/14-gsap-animations-interactions`  
**Design system:** Porcelain Arctic  
**Primary objective:** Add polished, restrained, performant GSAP/ScrollTrigger interactions while keeping the static portfolio functional, accessible, and readable without animation.  
**Scope:** Task 14 ONLY. Do not begin Task 15 (Mobile & Tablet Optimisation), Task 16 (SEO, Accessibility & Performance), or Task 17 (Release Testing & Deployment).

---

## 01 — Role and execution contract

Act as a senior creative frontend engineer, JavaScript animation specialist, accessibility engineer, and pragmatic reviewer. Implement a premium editorial motion system rather than a flashy demo reel.

1. Inspect the *actual current* repository, main/integration branch, documentation, and changed files before writing code. The repository is the source of truth, not previous example paths or assumptions.
2. Confirm Tasks 02–13 are integrated into the approved base. If Task 13 remains unmerged, report the dependency and use only an explicitly approved integration base; never silently cherry-pick or overwrite work.
3. Preserve the content and functionality of every completed section and the four directly loadable case-study pages.
4. Do not make content visibility, navigation, contact information, or form behaviour depend on GSAP, a CDN, WebGL, intersection observers, or a user hovering.
5. Do not rewrite section copy, project facts, achievement labels, venture roles, education, credentials, contact destination, or CV link as part of this animation task.
6. Use one coherent animation subsystem with documented selectors, component boundaries and cleanup. Avoid a mix of conflicting CSS and GSAP animations targeting the same properties.
7. Do not add a framework, bundler, smooth-scroll hijacker, premium GSAP plugin, or arbitrary external animation dependency.
8. Run and honestly report all available checks. Do not claim visual, keyboard, screen-reader, Lighthouse or device testing occurred if tooling was unavailable.
9. Do not automatically merge or deploy.

---

## 02 — Verified V2 reference at prompt preparation time (reinspect before coding)

The `Portfolio-V2` repository was observed as a **static HTML/CSS/browser ES-module site**, not Next.js or React:

- `index.html`: semantic one-page portfolio, Porcelain Arctic layout, section anchors and a Three.js import map.
- `css/tokens.css`: central semantic palette, typography, motion durations, z-index, reduced-motion defaults.
- `css/style.css`: shared and section styling and current reveal rules.
- `js/main.js`: initializes `initAnimations()`, `initNavigation()`, `initProjects()`, and `initContact()`; lazily imports the optional Three.js scene and removes the canvas on setup failure.
- `js/animations.js`: currently handles custom cursor and an `IntersectionObserver` that marks `.fade-in` items as `.visible`, with reduced-motion / unsupported-browser fallback.
- `js/three-scene.js`: optional decorative particle/network scene, respects a reduced-motion preference, uses a CDN-backed import map and a frame loop during normal motion.
- `js/navigation.js`: mobile menu, active-section indication and native anchor behaviour.
- `js/projects.js`: progressive enhancement for project filtering.
- `projects/{flowpilot-ai,cortex,mediguardian-ai,infraos}/index.html`: standalone static case-study pages, with `js/case-study.js` for shared navigation.
- `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/HERO.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md` document established constraints.
- Task 13 intentionally uses a **mailto handoff** rather than a message-delivery backend. Animation must not alter this disclosure or simulate successful submission.

Reinspect the current version of these files and its actual section/element classes. If the architecture changed, adapt without duplicating app bootstrapping.

**Important existing interaction risk:** The legacy custom cursor updates `left/top` and starts a new Web Animations API animation on each pointer move. Investigate and improve or retire that behavior as part of motion orchestration only if it helps performance, accessibility, and visual quality. Do not add GSAP mousemove tweens on top of it.

---

## 03 — Motion art direction

The portfolio's aesthetic is **Porcelain Arctic**: calm, precision-oriented, editorial, technical, and professional. Animation should improve orientation and hierarchy, not distract recruiters.

**Target feel:** polished product-site motion; soft entrances; controlled stagger; deliberate hover feedback; quiet visual storytelling. It must be appropriate for a Software Engineer (AI/ML) and Tech Founder portfolio.

**Reference tokens (consume existing semantic CSS vars):**

| Role | Reference |
|---|---|
| Porcelain canvas | `#F8FAFC` |
| Warm secondary surface | `#F5F4F0` |
| White surface | `#FFFFFF` |
| Heading navy | `#0F172A` |
| Body slate | `#475569` |
| Cobalt action | `#2563EB` |
| Arctic supporting accent | `#60A5FA` |
| Soft cobalt wash | `#DBEAFE` |
| Border | `#E2E8F0` |

Use Manrope, Inter and optional JetBrains Mono from Task 02. Motion is not an excuse to add neon effects, massive blur, full-screen colour flashes, heavy glow, confetti, or overactive parallax.

**Default motion design:** primarily `opacity` and `transform` with carefully controlled durations/easing; use CSS for simple focus/hover treatment and GSAP for coordinated sequences and scroll-driven reveal. Avoid animating layout properties (`top`, `left`, `width`, `height`) on every frame.

---

## 04 — GSAP dependency and architecture strategy

The repository has no existing package/build tool. Prefer a minimal **GSAP core + ScrollTrigger** integration compatible with its static deployment. Choose a verified stable version of GSAP 3 and pin the exact version; document its source and license suitability for used features. Do not use an unpinned `latest` URL.

The implementation may use:

- a carefully ordered pair of pinned browser scripts that expose `gsap`/`ScrollTrigger`, followed by an `async`-safe startup module; OR
- a verified, version-pinned ESM import strategy supported in the target browsers and Vercel static hosting.

Select **one** approach. Validate loading locally and as direct static routes. Avoid import-map conflicts with the separate Three.js mapping. If a third-party asset cannot load, the page and its content must still work: provide a safe no-animation fallback without console-breaking initialization. Do not write a custom unlicensed/pirated animation bundle or require paid GSAP plugins.

**Suggested file responsibilities (adjust to approved structure):**

```text
js/
  animations.js       # Small, single-entry motion coordinator / legacy cleanup
  motion.js           # GSAP registration, section timelines and reduced-motion gates (optional)
  main.js             # Initialize core functionality independently of decorative motion
css/
  tokens.css          # Existing shared motion duration/easing roles, only if needed
  style.css           # Scoped initial/reveal/hover states; never hide core content by default
docs/
  MOTION_SYSTEM.md    # Motion inventory, dependency/loading choice, a11y, fallback and testing
```

**Invariants:**

- Register ScrollTrigger exactly once, only after confirming both modules loaded.
- Initialize at most once per page instance; avoid duplicate ScrollTriggers/listeners after hot/repeated initialization.
- Do not let a failed GSAP import stop `initNavigation`, `initProjects`, `initContact`, or the optional Three.js setup.
- Prefer reusable helper functions for entrances, staggering, trigger setup and teardown; avoid giant imperative timelines mixed into `index.html`.
- Ensure standalone project pages do not import broken root-relative files. Use their existing shared-script strategy and test direct URL loading.
- If there is no need for a global animation on case-study pages, keep them static rather than importing motion unnecessarily.

---

## 05 — Animation inventory and exact scope

Implement a **small, cohesive animation set**. These are targets, not permission to modify wording, project data, section architecture or navigation semantics. Match selectors to the actual markup.

### 05.1 Navigation/header

- Optional very subtle first-load reveal (small opacity/vertical motion only).
- Preserve native anchor links, sticky header layout, mobile-menu open/close logic, `aria-expanded`, focus handling and `aria-current`.
- The menu should remain operable before GSAP loads or if it never loads. Do **not** make GSAP own the mobile menu state.
- Do not animate nav size, position or height in ways that cause layout shifts or anchor offset mismatch.

### 05.2 Hero

- Optional one-shot sequence: eyebrow/identity, supporting role/summary, CTA grouping, portrait — short, gentle, readable immediately in fallback mode.
- Respect Task 04's deliberate removal of the old typewriter and aggressive hero animation. **Do not recreate a typewriter, cursor blink, floating/pulsing portrait, permanent orbit or intrusive parallax.**
- Keep Hero `<h1>`, text and links present in the DOM from first render; avoid an invisible Hero on slow networks.
- Profile image should retain fixed dimensions/aspect ratio and no unexpected layout shift.

### 05.3 About + Technical Expertise

- Reveal section heading once and stagger content cards lightly when near viewport.
- Prevent 30+ sequential elements from making visitors wait; cap stagger or animate only a few group containers.
- Skill labels should remain accessible and static after the entrance.

### 05.4 Featured Projects and Project Gallery

- Featured project cards reveal in logical reading order with restrained stagger.
- Preserve filtering in `js/projects.js`. Hidden filtered cards must not be animated into visibility or leave orphaned ScrollTrigger states.
- When filters change, refresh the measurements of only affected triggers in a safe, debounced way if necessary. Do not mutate project filter state or turn cards into animation-controlled data.
- Hover treatment: gentle lift/border/shadow (prefer CSS unless complex coordination is genuinely needed); touch and keyboard states must be useful, no hover-only essential information.
- Case-study action links and project status remain usable without animation.

### 05.5 Achievements and Hackathon Showcase

- One calm reveal for the Cursor Buildathon feature, followed by modest supporting-card stagger.
- Never animate result numbers as if they are counters, change award text, or visually misrepresent placements.

### 05.6 Experience, Leadership, Education & Credentials

- Prefer timeline/card entrance groups and minimal accent-line motion if it improves reading order.
- No sprawling horizontal motion, fake progress bar, scrolling percentage or status animation implying dates/levels.
- Dates, organization names and credentials must not depend on animation to become readable.

### 05.7 Contact and Footer

- Gentle section intro/contact card reveal, only if it adds value.
- Preserve the Task 13 email-client handoff and its honest disclosure that it **does not send or store messages**.
- Never animate false submission success, mutate form validation state or steal focus during validation.
- Footer links remain functional with JavaScript disabled.

### 05.8 Standalone case-study pages

- Optionally add a subtle heading/cover reveal using safe route-specific initialization, but keep the experience consistent and simple.
- Do not enable motion by default on a route if it would require fragile path changes, duplicate assets or complex cleanup.

### 05.9 Optional pointer treatment

Assess the current custom cursor critically. It should be disabled on coarse/touch pointers, reduced-motion preferences, forced-colors/high-contrast modes where appropriate, or if it obscures controls. Prefer a normal system cursor rather than an expensive novelty. If retained, use one bounded, frame-coordinated transform update; never start unlimited overlapping tweens per pointer event. It must never intercept pointer events, cover focus rings or interfere with nav/form use.

---

## 06 — Triggers, sequencing and lifecycle

- Use `ScrollTrigger` only where it materially helps. One-shot entrances should run once; do not constantly rewind while people read.
- Start when content is near viewport, not after it is almost entirely gone. Typical approach: a trigger near `top 85%` with clear documentation; tune to actual card sizes.
- Avoid pinned sections, scroll-scrubbing, horizontal scroll hijacks and compulsory motion. Do not register long scrolling loops.
- Avoid hiding content by default in CSS. Only prepare a target for an animation **after GSAP is confirmed available**, motion is allowed and the element will be animated immediately or observed reliably. If setup fails mid-way, clear GSAP inline styles so elements become readable.
- Coexist with the legacy `.fade-in` observer: **choose a single owner per target**. Prefer migrate the old observer in `js/animations.js` or explicitly exclude GSAP targets from legacy reveal. Do not let both write `opacity`/`transform` to the same element.
- Consider the class `.motion-enhanced` only after successful setup, with scoped selectors. Use a fail-safe to remove hidden states on import/plugin/trigger errors.
- Refresh triggers after fonts/images settle or content/filter dimensions change, without excessive refresh calls. Images should continue using reserved dimensions and lazy loading where already defined.
- On teardown/navigation/reinitialization, kill owned timelines/ScrollTriggers and remove owned event listeners, matchMedia handlers and inline styles as appropriate. Do not kill triggers owned by an unrelated subsystem.

---

## 07 — Accessibility and reduced-motion contract (critical)

Use `window.matchMedia('(prefers-reduced-motion: reduce)')` and, when supported, GSAP's own media/context helpers. Reduced-motion behavior must be correct **on initial load and after the OS preference changes while the page is open**.

When motion is reduced:

1. Skip decorative entrances/staggers/parallax and any animated custom pointer.
2. Immediately reveal any element previously prepared for GSAP (clear `opacity`, `visibility`, `transform` or equivalent inline styles).
3. Disable/kill active ScrollTriggers and animation timelines owned by this module.
4. Keep navigation and form interactions intact; use instant states, not invisible content.
5. Leave the existing Three.js static reduced-motion path working; do not start a second render loop.

When motion is restored, carefully create the enhancement once without replaying elements in a disruptive way. Prefer leaving already seen content visible.

Also ensure:

- no scroll-triggered content remains hidden with JavaScript disabled, when GSAP is blocked, when ScrollTrigger fails, or when IntersectionObserver is unavailable;
- no `aria-hidden` is applied to meaningful content merely for animation;
- focus indicators, native anchors, skip link, keyboard menu and form labels are unaffected;
- WCAG AA text/interactive contrast and 200%/400% zoom readability remain intact;
- no rapid flashing, intense shake, large vestibular parallax or animated visual noise;
- keyboard users do not have to wait for an entrance to click/activate a link;
- no automatic focus movement from decorative animation.

---

## 08 — Performance budget and graceful degradation

Prioritize smoothness on average mobile devices and long project lists.

- Animate compositor-friendly `transform` and `opacity`; avoid per-frame layout reads or repeated DOM queries inside callbacks.
- Use `will-change` sparingly and remove it after entrance animations; do not apply to all cards permanently.
- Limit simultaneous timelines and long stagger chains. Avoid animating a dense grid all at once on low-power devices.
- Don't use GSAP to animate the Three.js canvas properties every frame; preserve Three.js as independent optional decoration.
- Do not introduce ScrollSmoother, full-page scrolling libraries, continuous decorative loops or extra large CDN assets.
- Preserve a usable page with GSAP blocked and WebGL blocked independently; neither may block core JS startup.
- Check `Save-Data` / low-power scenarios if support exists and choose restrained or disabled extra motion; do not make this a brittle requirement.
- Observe cumulative layout shift: reserve media dimensions, avoid animated height/width for structural regions, do not insert late banners.
- Do not present performance metrics unless actually measured. Task 16 is the broader performance audit; Task 14 must avoid obvious regressions.

---

## 09 — Practical step-by-step implementation

### Phase A: Audit and plan

1. Run `git status`; identify branch and approved base. Preserve any unrelated uncommitted work.
2. Read current `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/HERO.md`, and any Task 13 contact docs that exist.
3. Inspect actual section IDs/classes, media queries, `.fade-in` selectors, `js/animations.js`, `js/main.js`, `js/three-scene.js`, `js/projects.js`, `js/contact.js` and all direct case-study routes.
4. Record an inventory of current CSS transitions, observer reveals, custom cursor behaviour, and potential conflicts with GSAP.
5. Confirm Tasks 02–13 were merged into the approved base; report blockers if not.

### Phase B: Branch and dependency

6. Create `task/14-gsap-animations-interactions` from the approved base.
7. Choose one version-pinned GSAP 3 core + ScrollTrigger integration compatible with the static site. Verify that it loads. Document the source/version and failure strategy.
8. Ensure initialization of core features happens independently of the decorative animation dependency.

### Phase C: Implement the foundation

9. Create/refactor a small motion coordinator and register ScrollTrigger once.
10. Centralize reduced-motion gating, initialization, teardown/cleanup and fallback visibility.
11. Resolve `.fade-in`/GSAP ownership conflicts. If replacing the observer, keep a non-GSAP static fallback.
12. Keep custom cursor if genuinely useful and performant; otherwise simplify or remove it with a documented rationale.

### Phase D: Scope-specific motion

13. Implement light Hero/section heading entrances.
14. Add measured About/Skills/Projects/Achievements/Experience/Leadership/Education/Contact group reveals.
15. Coordinate with project filtering, navigation and direct/hash link loads.
16. Consider static case-study pages; apply only minimal, path-safe motion where appropriate.
17. Tune duration/ease/stagger by visual review. Avoid repeated effects across every tiny card.

### Phase E: Validate and document

18. Confirm the page is fully readable and navigable with JS off and with GSAP blocked.
19. Test reduced motion on load and after toggling, including cleanup of previously animated inline styles.
20. Test GSAP load failure, ScrollTrigger missing, WebGL/Three.js failure and standard page load independently.
21. Verify mobile/coarse-pointer and desktop/fine-pointer behaviour.
22. Test filter state changes, sticky-nav anchor scrolling, case-study direct URLs and contact form handoff.
23. Update `docs/MOTION_SYSTEM.md` and note changes in `docs/IMPLEMENTATION_PLAN.md` when appropriate.
24. Run available syntax/build/lint/tests; inspect diff, commit and push the dedicated branch only.

---

## 10 — Suggested sequencing and animation parameter guidance

These are starting points, **not global mandatory settings**. Tune with visual inspection and current token durations.

| Context | Recommended direction |
|---|---|
| Hero introduction | 8–18px vertical translation, 0.45–0.75s, short stagger |
| Section headings | 8–16px vertical translation, 0.35–0.6s, once |
| Featured project cards | 10–20px translation, 0.4–0.7s; small stagger |
| Supporting cards | Group entrance with short stagger; avoid per-card scroll triggers for huge lists |
| Hover | Small CSS transform or border tint, 150–220ms, no motion-only content |
| Active nav / forms | Functional state is controlled by existing modules; do not alter it |
| Reduced motion | Instant visible state; no decorative GSAP timeline |

Use appropriate easing without elastic bounce or overshoot. Do not add scroll-linked 3D parallax just because Three.js is present.

---

## 11 — Git workflow

Adjust only if the repository documents a different approved integration branch:

```bash
git status
git switch main
git pull --ff-only origin main

# Verify Tasks 02–13 are integrated and the working tree is safe.
git switch -c task/14-gsap-animations-interactions

# Implement Task 14 only.
node --check js/main.js
node --check js/animations.js
# Check any newly created JS modules using node --check as appropriate.

git -c core.whitespace=cr-at-eol diff --check
git status
git diff --stat

git add <only-task-14-files>
git commit -m "feat: add accessible GSAP motion system"
git push -u origin task/14-gsap-animations-interactions
```

Do not use destructive resets, `git push --force`, automatic merging, deployment or irrelevant formatting rewrites. If no Node environment is available, report the skipped syntax check and execute other available checks. The tracked static source has historically used CRLF, so the whitespace command above avoids false-positive CR-at-EOL warnings.

---

## 12 — Test matrix and acceptance criteria

### Core behaviour

- [ ] All sections, contact information, project cards and links are visible without JavaScript.
- [ ] If GSAP/ScrollTrigger fails to load, the site works and no meaningful content remains hidden.
- [ ] Navigation, mobile menu, active section handling, native hash anchors and skip link work.
- [ ] Direct case-study URLs load with their own scripts/styles and navigation.
- [ ] Projects filter correctly and no stale animation reveals filtered-out cards.
- [ ] Contact form remains the explicitly disclosed email-app handoff; no fake sent confirmation.
- [ ] CV download retains its existing path.
- [ ] Optional Three.js failure does not block normal site interactions.

### Motion and accessibility

- [ ] A small, coordinated set of useful entrance animations is present.
- [ ] Old IntersectionObserver reveal and GSAP never fight for the same `opacity`/`transform`.
- [ ] Reduced motion on initial load makes all content immediately visible.
- [ ] Changing reduced-motion preference during a session cleans up active animations/triggers.
- [ ] Keyboard focus styles, semantic markup and tab order are intact.
- [ ] No important interaction exists only on hover or animation completion.
- [ ] Pointer effect is disabled for touch/reduced motion and does not block hit targets.
- [ ] No flashing, excessive parallax or heavy perpetual loop added.

### Responsive / visual smoke test

Inspect at or near **320, 375, 768, 1024 and 1440px**, plus a short-height desktop window if a browser is available. Confirm no horizontal overflow, clipped heading, hidden anchor target, menu collision, or animated content trapped offscreen. Check one filtered gallery state and one standalone case-study route at both mobile and desktop widths.

### Performance / technical

- [ ] Pinned dependency and fallback path documented.
- [ ] No uncontrolled repeated tweens on mousemove or repeated initializations.
- [ ] ScrollTriggers/timelines and listener lifecycle are bounded and cleaned up.
- [ ] No new unnecessary library/bundler/framework.
- [ ] No unrelated section copy/links/data changed.
- [ ] Syntax checks and available tests pass; `git diff --check` passes.
- [ ] A failed test or unrun browser test is reported truthfully.

**Definition of Done:** An intentional, accessible GSAP motion layer enhances the existing static portfolio without owning core functionality, duplicating old reveal effects, requiring motion to read content, or regressing navigation/forms/case studies. Documentation and focused branch commit exist.

---

## 13 — Required documentation and completion report

Create/update `docs/MOTION_SYSTEM.md` explaining:

1. GSAP and ScrollTrigger pinned version, load strategy and fallback.
2. Current animated elements/selectors and who owns their `opacity`/`transform`.
3. Timing/easing/stagger principles and intentionally unanimated content.
4. Reduced-motion live toggle handling, failure modes, and JS-disabled display.
5. Project-filter/anchor/case-study integration decisions.
6. Custom cursor decision and performance considerations.
7. Lifecycle/cleanup contract and how future sections should opt in.
8. Tests actually run and checks requiring owner browser QA.

At task completion, provide a report with:

- task ID, actual repository, base branch, feature branch and commit SHA;
- files created/modified, one-line rationale each;
- exact GSAP version/source and plugin registration approach;
- animation inventory and old reveal-observer reconciliation;
- fallback/reduced-motion behaviour;
- actual syntax, static, browser, responsive, keyboard and performance checks performed, with pass/fail/skipped;
- regressions checked, known limitations and missing verification;
- confirmation that no merge or deployment occurred;
- **Next: Task 15 — Mobile & Tablet Optimisation** (do NOT execute it).

---

# FINAL CODEX INSTRUCTION

**Read this entire Markdown file and implement ONLY Task 14.** Inspect the actual Portfolio V2 code first, integrate only on the approved Tasks 02–13 base, use version-pinned GSAP + ScrollTrigger conservatively, maintain readable fallback states and reduced-motion support, preserve all content/links/forms/navigation/projects and optional Three.js, document and honestly test the motion system, commit on `task/14-gsap-animations-interactions`, and STOP before Task 15. Do not auto-merge or deploy.
