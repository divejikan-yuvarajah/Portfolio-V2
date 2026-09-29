# Portfolio V2 — Task 14B: Digital Atlas Creative Redesign & Advanced GSAP
## Complete Enhanced Codex Edition · Art Direction + UX + Engineering + Motion

**Owner:** Yuvarajah Divejikan  
**Repository:** `https://github.com/divejikan-yuvarajah/Portfolio-V2`  
**Feature branch:** `task/14b-digital-atlas-redesign`  
**Project theme:** Porcelain Arctic, elevated into a distinctive *Digital Atlas* identity  
**Task type:** A deliberate creative enhancement of Tasks 02–14, **not a new framework migration**  
**Goal:** Deliver a genuinely distinctive, polished and interactive software engineer / AI engineer / tech founder portfolio; not a series of generic rectangular cards with fade-ups.

> **Execution priority:** Art direction → composition → truthful content hierarchy → readable static experience → purposeful motion → performance/accessibility polish. Do not substitute more animation for better design.

---

## 00 · Read these sources before editing

### The user's references (inspiration, techniques and agent guidance)

1. Portfolio-tagged GSAP showcase: https://gsap.com/showcase/?tags=Portfolio
2. Official GSAP repository and installation/docs: https://github.com/greensock/GSAP and https://gsap.com/docs/
3. Official agent skill collection: https://github.com/greensock/gsap-skills
4. GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
5. GSAP SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
6. GSAP Flip: https://gsap.com/docs/v3/Plugins/Flip/
7. GSAP responsive media contexts: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
8. GSAP context cleanup: https://gsap.com/docs/v3/GSAP/gsap.context()/
9. GSAP performance and reduced-motion guidance from `greensock/gsap-skills/skills/gsap-performance/SKILL.md` and other relevant skill files.

**Reference policy:** Study interactions, pacing, typography, art direction and storytelling principles. Do **not** copy any showcase site's composition, brand, logo, images, proprietary code or exact animations. The showcase page may be dynamically rendered: if individual entries cannot be examined, say so in the implementation report; do not invent a list of sites inspected. The GSAP GitHub repo is a library/reference, not a website template. The `gsap-skills` repo guides implementation, not visual imitation.

**Use the skills properly:** Read the official `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, and `gsap-performance` skill instructions relevant to implementation. If the coding environment supports skill installation and the owner authorizes adding a tool/skill, the official README documents `npx skills add https://github.com/greensock/gsap-skills` and the Codex skill directory `~/.codex/skills/`. Otherwise read the official skill files in place. **Do not install or execute unreviewed remote scripts without approval.** Do not alter repository runtime dependencies merely to add agent skills.

### Source-of-truth repository review

Inspect `main` or the approved integration branch and read at least:

- `index.html`, `css/tokens.css`, `css/style.css`;
- `js/main.js`, `js/animations.js`, `js/motion.js`, `js/navigation.js`, `js/projects.js`, `js/contact.js`, `js/three-scene.js`;
- `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/MOTION_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/PROJECTS_GALLERY.md`, `docs/PROJECT_CASE_STUDIES.md`, `docs/CONTACT_AND_SOCIAL.md` where present;
- the four routes in `projects/`, `data/case-studies.json`, and `scripts/generate_case_studies.py`;
- any current work on other branches, current Git status, assets, fonts and site navigation.

### Important facts established in the current public V2 repository (reverify)

- It is a **static HTML/CSS/browser ES-module** project, not currently a Next.js/React app. There is no package-based build pipeline in the current documented architecture.
- Task 02 tokens live in `css/tokens.css`; Task 14 uses optional **GSAP 3.15.0 + ScrollTrigger** loaded via pinned cdnjs assets from `js/motion.js`.
- The existing `MOTION_GROUPS` create modest, one-shot fade/y reveals. Hero motion is intentionally tiny. `js/animations.js` lazy-imports motion independently; core UI survives CDN failure. The old custom cursor was removed for performance/usability.
- `#bg-canvas` / `js/three-scene.js` is **optional decorative Three.js** and must never block content. Its reduced-motion path renders a static frame.
- Current section IDs: `hero`, `about`, `skills`, `projects`, `achievements`, `experience`, `community`, `education`, `certifications`, `contact`. Task 03 navigation and direct hash links depend on stable anchors.
- Four flagship case-study routes exist: FlowPilot AI, CORTEX, MediGuardian AI and INFRAOS. Their factual copy and project-status caveats must survive unchanged unless separately verified.
- The contact form currently creates a **mailto email-app handoff**, not backend delivery. Never replace its disclosure with a fictitious “message sent” toast.
- `images/My_CV.pdf` is linked locally, but the current docs flag freshness as requiring owner review. Do not state it is a newly verified CV without opening/checking it.

If newer approved commits have changed any of these facts, adapt to the real current code and state the differences. **Do not silently introduce Next.js, React, Tailwind, shadcn/ui, Lenis or another router.** A migration requires a separate explicit architectural decision.

---

## 01 · Creative brief: make it memorable, not noisy

### New visual identity: **DIGITAL ATLAS**

The theme is an editorial field guide to a builder's work: **Ideas → Systems → Impact**. A slender cobalt “signal path” connects a few chapters; fine coordinate/grid annotations, modular frames and a restrained index system create a personal visual signature. Imagine a premium independent technology publication meeting an engineered product showcase—not a dashboard, neon sci-fi HUD, startup landing-page template, or Dribbble card dump.

Design keywords: `editorial engineering`, `asymmetric but balanced`, `quiet precision`, `kinetic type`, `architectural spacing`, `designed tension`, `technical annotations`, `purposeful interaction`.

The site should have at least **three distinctive signature moments** that distinguish it from its current generic light card layout:

1. A kinetic, typographic *Hero statement* and constructed portrait/graphic composition;
2. An intentional *Featured Work* scrolling narrative with distinct project treatments, rather than a uniform card grid alone;
3. A recognisable *atlas signal motif* connecting selected chapters, with a satisfying closing/contact moment.

The difference must remain obvious from screenshots **with animation disabled**. Motion enhances the art direction; it does not create it.

### Non-negotiable palette — Porcelain Arctic

Use existing semantic variables from Task 02 wherever possible:

| Role | Colour |
| --- | --- |
| Base porcelain | `#F8FAFC` |
| Warm alternate | `#F5F4F0` |
| Elevated white | `#FFFFFF` |
| Navy heading | `#0F172A` |
| Slate copy | `#475569` |
| Cobalt focus/action | `#2563EB` |
| Deep cobalt hover | `#1D4ED8` |
| Arctic blue decoration | `#60A5FA` |
| Soft blue highlight | `#DBEAFE` |
| Borders | `#E2E8F0` |

**Accent ratio:** porcelain/neutral 75–80%; navy/slate 15–20%; cobalt/Arctic 5–10%. This is a design intention, not a computed pixel test. Use cobalt strategically for action and story beats, not on every card. Arctic blue is decoration, not small body text. Consider a **single navy inverse panel** for a carefully justified narrative transition; do not turn the entire site dark or add purple/neon.

Type: `Manrope` for dominant expressive display; `Inter` for body/UI; `JetBrains Mono` for meaningful metadata and chapter indices only. Experiment with extreme headline scale, tight controlled tracking, multiple weights and a small number of oversized outline/filled words. Keep content readable at all sizes.

### Visual system refinements

- Build a consistent **12-column desktop layout** or equivalent fluid grid with intentional asymmetry; collapse elegantly on tablet/mobile.
- Sections should not all repeat “centered heading → paragraph → three identical white cards.” Alternate editorial splits, typographic statements, index rails, project canvases, mini diagrams, thoughtful negative space and compact data lines.
- Use an understated atlas/grid layer via CSS/SVG (not an entire screen of visible graph paper). A short cobalt signal line may appear between *selected* chapters, but should not look like a progress chart or a fabricated business diagram.
- Create reusable CSS components for index markers, label rails, feature frames, rule separators, status pills, editorial metadata, image masks and the inset navy panel.
- Real project screenshots are ideal; when a verified screenshot is missing, keep the truthful, explicitly labelled typographic illustration. Never create fake product dashboards or fabricated award imagery.
- Use the actual user portrait `images/profile_new.jpeg`, avoid swapping the face or introducing stock model photos.
- No persistent loading overlay, unsupported giant award stats, generic animated globe or arbitrary 3D tilt on everything.

---

## 02 · Section-by-section art direction and choreography

Implement coherent new **UI composition as well as animation**. Preserve factual content and internal anchors. For each section, establish the static composition first, then author its animation timeline.

### 2.1 Navbar — editorial index header

- Preserve Task 03 semantic links, mobile toggle, `aria-expanded`, Escape/outside dismiss, focus handling and direct hash navigation.
- Make the brand a crisp typographic monogram/wordmark: `Divejikan.` with a small secondary “Software / AI / Founder” annotation if it fits.
- Desktop: refined floating/contained or full-width editorial bar with a hairline and intentionally sized Contact CTA; visible current-section marker and compact chapter index. If a reading-progress rule is added, it must stay separate from links and not obscure focus.
- Motion: entrance once on page top; optional colour/elevation change after scroll. Never animate nav height or interfere with sticky offset.
- Mobile: familiar, immediate, accessible navigation, not a full-screen overproduced animation. Avoid mouse-only UI.

### 2.2 Hero — the signature above-the-fold moment

Aim for a magazine-cover-meets-engineering-studio layout. Create a strong editorial hook using truthful role language, e.g.:

`I BUILD` / `INTELLIGENT` / `DIGITAL SYSTEMS.`

Preserve visible full name **Yuvarajah Divejikan**, positioning **AI/ML-Focused Software Developer & Tech Founder**, current startup role labels, projects/contact CTAs and working CV link. Treat the sample headline as a design direction, not a mandatory factual rewrite. Keep one meaningful `<h1>`.

Composition:
- Asymmetrical split with oversized headline occupying the dominant left area and a strong framed portrait or editorial “identity card” on the right;
- precise label, issue number (“Portfolio / 2026”), slim vector path, small engineering annotation and a restrained cobalt quadrant/swatch;
- perhaps a small floating project-index tile that remains static and factual, not a fake achievement counter;
- strong visual anchor and visual contrast even when still.

**GSAP choreography:** If SplitText is available from a verified compatible official build, use line/word-based masked reveal (not 80 independently stuttering characters), coordinated with eyebrow, portrait frame, summary and CTAs via one labelled timeline. The original text must remain accessible and revert correctly. If SplitText isn't available/loaded, fall back to ordinary span/line animation or static content. Animate transform/opacity/clip-path sparingly, avoid expensive full-screen blur. Above-fold paint should not wait on 8-second CDN timeout; a late-loading GSAP bundle must not replay a disruptive intro.

Optional subtle image parallax only on fine-pointer desktop. No autoplay hero loop. Avoid making first content invisible before JS.

### 2.3 About — “The person behind the systems”

Build a large editorial statement, a narrow readable body column, and a **small asymmetric index of focus areas**, not six repeating feature cards. Think annotated print layout, brief personal philosophy, and compact areas of focus. Use typography and border rules as design material. Preserve approved copy and founder identity.

Motion: one chapter title mask and sequential annotation/line draw; no repetitive fade-up on every word. Maintain reading-order accessibility.

### 2.4 Technical expertise — architecture of capability

Retain all six currently documented skill categories and verified tools, but arrange them as an *engineering index* with distinctive numeric rails / dense but readable typographic modules. A broad category can expand visually on desktop by hover/focus without hiding the whole skill inventory. Do not reintroduce dubious percentage bars or proficiency scores.

Motion: modest per-row sequence and precise rule/SVG drawing; avoid continuously moving icon clouds, spinning rings or chaotic marquees. Skills must be available with JS disabled.

### 2.5 Featured Projects — the flagship narrative centerpiece

Prioritise **FlowPilot AI, CORTEX, MediGuardian AI and INFRAOS** in their approved order. Create distinct visual treatments (typographic poster / genuine screenshot / colour-balanced motif per project) within a coherent system. Each needs short verifiable summary, owner contribution where approved, status/prototype caveat, tags, case-study link and verified demo/source link when actually available.

Choose one of these art-direction mechanisms and implement it well:

**Preferred desktop concept: a short pinned feature-deck / horizontal translation** using ScrollTrigger *only if it passes content-length and usability testing*. Limit pinning to the **four featured panels**; build a clear 01–04 progress indicator. Do not pin the entire project section. Use a deliberate, reasonably short scroll distance, appropriate `end` based on actual measured track overflow, and refresh after fonts/images load. Never lock the wheel or invent fake scrollbars. Make each panel addressable/focusable through real links and ensure tabbing cannot focus entirely off-screen actions. Native vertical flow below the featured deck must remain intact.

**Safer alternative:** sticky alternating vertical feature panels with scroll-linked image/text transitions; choose this when pinning risks accessibility, height overflow, keyboard navigation, or mobile performance. The objective is quality, not forcing horizontal scroll.

**Mobile/reduced-motion/no-JS:** always display the four projects as a readable vertical stack with no forced horizontal traversal or hidden content.

Retain existing recent/archive project collection and Task 07 category filters, including `portfolio:projects-filtered` event handling. Do not have GSAP override `[hidden]`. For actual filter-layout movement, consider GSAP Flip only after checking compatibility with native `hidden`, focus and filtered visibility; plain transitions are an acceptable safer choice. `ScrollTrigger.refresh()` after layout changes, coalesced to one scheduled frame.

Hover interactions: small image parallax, project number shift, arrow glide or accent outline—no hover-only access to required content. Link to the existing Task 08 static case studies rather than changing route structure.

### 2.6 Achievements — editorial result poster

Make the Cursor Colombo 24H Buildathon result a strong editorial poster with restrained typography, result label, project, year and team. The other verified achievements become compact contrasting entries. Do **not** animate award rankings as fake counting numbers, make unverified claims, or turn the area into fake certificates. Use a simple mask/typographic sweep and a cobalt rule draw rather than making trophy icons bounce.

### 2.7 Experience & ventures — “building the work”

Present Zatroz and Softora as two distinct editorial venture panels; previous HNB and AARNA experience as a minimal professional timeline. Do not invent start dates, revenue, staff or customer results. Prefer an asymmetric path/index and short copy. Motion: timeline rule progresses as entries enter; no over-pinned timeline that buries text. Preserve `#experience` and linked navigation.

### 2.8 Leadership / education / credentials — curated index, not visual repetition

Use a clean magazine-like leadership feature and smaller community markers. Education/credentials can use horizontal dividers and strong date/role alignment, not multiple identical soft-shadow cards. Reuse accent markers selectively. Animated line/row reveals are enough. Keep course/completion distinctions and original verified content; do not fabricate credentials.

### 2.9 Contact — memorable closing composition

Create a large, beautifully typeset closing phrase such as `HAVE SOMETHING / WORTH BUILDING?` with cobalt accent punctuation, readable email CTA, GitHub and LinkedIn links, clear contact method and compact footer. Make it visually satisfy the story begun in the hero. Preserve actual email-app handoff disclosure; no false submission success, no hidden form delivery.

Motion: restrained line reveal / “signal path complete” on entering, **no obstructive full-page overlay**. Footer must remain accessible with animation disabled.

### 2.10 Project case studies — shared language, not a new content invention

Ensure the four Task 08 routes visually inherit the refined typography, framing, metadata and navigation. Preserve generated-page sources. If the generator owns output, change generator/template sources first, regenerate and run `--check`; never manually edit generated HTML only. Do not change the factual status and medical-safety caveats or break direct URL loading. A full unique animation system on each case study is optional; readability and route stability outrank novelty.

---

## 03 · Motion specification — meaningful GSAP, not blanket fade-ups

### 3.1 Define a motion hierarchy

| Layer | Intent | Guideline |
| --- | --- | --- |
| Hero entrance | Brand-defining editorial reveal | ~0.7–1.1s major sequence, staggered but readable |
| Chapter entrance | Reveal content hierarchy | ~0.55–0.8s, limited to meaningful text/visual groups |
| Featured work scroll | Distinctive narrative | scrub only where movement directly expresses progress |
| Micro-interaction | Confirm affordance | ~0.15–0.3s, subtle distance |
| Decorative atlas path | Unite story beats | low-contrast short SVG drawing, no infinite loop |

Timings are art-direction ranges, not compulsory tests. Ensure total above-the-fold motion does not prevent visitors reaching projects quickly. Do not animate every object just because it exists. Different sections need distinct composition/pacing, while sharing one coherent ease vocabulary.

### 3.2 Prefer official APIs/patterns

- Use GSAP timeline labels and position parameters for intentional choreography instead of chains of arbitrary `delay` calls.
- Use `gsap.context()` with scoped selectors and `revert()` lifecycle cleanup. Use `gsap.matchMedia()` for desktop/tablet/mobile/reduced-motion variants. Avoid deprecated `ScrollTrigger.matchMedia()`.
- Register plugins exactly once, matching the currently pinned GSAP version. Verify official distribution paths before adding SplitText/Flip; do not assume a plugin is present merely because GitHub README mentions it.
- `ScrollTrigger` for few meaningful triggers; use `scrub`/`pin` only when justified, with correct end/refresh/pin spacing and sensible scrolling distance. Avoid `ScrollTrigger.killAll()` when local context cleanup can remove only this feature's triggers.
- `gsap.quickTo` / `quickSetter` for any approved pointer-following transform; no `window.mousemove` loop that spawns tweens. Do not resurrect the old full-site fake cursor unless there is a compelling, tested UI reason; native cursor is the default.
- SplitText should preserve a screen-reader-accessible sentence, handle responsive re-splitting (`autoSplit` / `onSplit` where supported), and clean up on revert. Use line/word reveals; no layout-breaking char explosion.
- Flip must capture layout before changing DOM, then animate only a stable, limited target set; verify filtering and focus states. If complex, omit.
- Scope ownership: don't let CSS hover and GSAP timelines compete for `transform` on the same element; use inner wrappers or clear temporary properties.
- Native scrolling and anchor navigation must continue working. Do not require Lenis or ScrollSmoother. If any smoother is proposed, justify/document and ask approval rather than silently changing scroll physics.

### 3.3 Progressive enhancement and failure tolerance

- **Static-first**: content, navigation, projects, form links, CV, case studies are readable before GSAP loads and if scripts never load.
- Enhance in place only after GSAP core + each actually used plugin loads. Use the existing failure-safe loading coordinator; do not create a second competing GSAP initializer.
- Detect `prefers-reduced-motion`, data saver and constrained devices. Provide reduced/static alternatives and allow live preference changes to remove running timelines and reveal content.
- On CDN failures/timeouts: core interactions continue; cleanup any prepared hidden states. No blank Hero, stuck `opacity: 0`, broken nav, or frozen project deck.
- Avoid unnecessarily loading SplitText, Flip or extra plugins on the initial critical path. Prefer only what a section uses and respect same-version compatibility.
- Resolve `pagehide`/BFCache `pageshow` behavior and avoid duplicated event listeners/triggers after navigation or repeated setup.
- Use document font readiness / image load / filtered layout events to schedule measured `ScrollTrigger.refresh()` rather than calling refresh repeatedly on every scroll/resize tick.

### 3.4 Motion ownership map (document explicitly)

Define exactly one animation owner per interactive target: `js/motion.js` (or small modules it coordinates) owns GSAP properties; `js/navigation.js` owns menu and active-state attrs; `js/projects.js` owns filters/hidden states; `js/contact.js` owns the mailto handoff; `js/three-scene.js` owns canvas rendering. No module should manipulate the other's state. Decorative GSAP and Three.js loops must not both continuously animate the same visible focal area.

---

## 04 · Precise implementation plan and delivery gates

### Gate A: Audit + creative system (before large code rewrite)

1. Inspect `git status` and the approved base. Confirm Task 14 merged; if not, stop and report dependency instead of silently changing base or overwriting ongoing work.
2. Audit rendered architecture, style selectors, existing motion ownership, assets, real photo and real project data. Identify dominant visual repetition and navigation constraints.
3. In `docs/CREATIVE_DIRECTION.md`, draft a design rationale, section layout map, palette/font hierarchy, three signature interactions, source/reference notes, motion ownership and fallback strategy. Record whether the preferred four-panel pinned deck is practical or select sticky vertical alternative.
4. Produce a change map before editing: which HTML/CSS/JS/doc/generator files will change and why. Preserve all anchor targets and factual content.
5. Do not treat a design write-up alone as completion; after the plan, implement the redesign in this same feature branch unless a major architecture/dependency decision genuinely needs user approval.

### Gate B: Visual architecture (make still screenshots excellent)

1. Refine token and component styles using current CSS architecture (`css/tokens.css`, `css/style.css` or focused additional CSS only when justified); avoid another inconsistent theme file.
2. Implement the Hero, selected-work centerpiece, chapter visual rhythm, achievements and closing section with refined semantic markup. Apply complementary styles to remaining sections and case-study pages as described.
3. Create SVG/CSS atlas path/annotations as original artwork, with accessible decorative semantics. Prefer reusable local SVG over a new image library.
4. Keep all real content/links, project order, intro claims, achievement wording, role/date caveats and contact disclosure. Do not delete recent/archive projects to simplify layout.
5. Verify still state in desktop/mobile before adding motion. **If screenshots look generic, adjust typography/composition rather than adding more animation.**

### Gate C: Advanced motion choreography

1. Replace or adapt Task 14's `MOTION_GROUPS`—do not stack a new motion system over the old one.
2. Build labelled Hero timeline; scoped chapter transitions; selected-work desktop story; restrained data-line/path draws; micro-interactions only where useful.
3. Use `gsap.matchMedia()` and context cleanup; refresh after layout changes.
4. Mobile/reduced-motion/no-JS variants remain standard vertical reading experiences.
5. Optional plugin loading must be pinned/tested; if unavailable, degrade gracefully rather than leaving unfinished effects.

### Gate D: Polish and verification

1. Check visual composition at `320`, `375`, `390`, `768`, `1024`, `1280`, `1440` widths and a short-height desktop viewport; also test 200% zoom, landscape mobile and long content.
2. Keyboard-only journey: skip link → nav → CTAs → project filters → all featured projects → case studies → contact; ensure no off-screen keyboard focus in pinned elements.
3. Verify deep links to all section IDs and case-study routes, Back/Forward, project filters, form handoff, CV path and navbar sticky offsets.
4. Test reduced motion live, JavaScript disabled, blocked GSAP CDN, failed Three.js/WebGL, refresh during middle of a pinned section, resize at breakpoint, BFCache return.
5. Inspect layout shift, image sizing, timeline counts, event listener leaks and CPU use. Aim for smooth interaction on typical laptop and mid-range mobile. **Do not claim specific FPS/Lighthouse scores without measuring them.**
6. Run existing project checks (`node --check js/*.js` individually or equivalent, `python scripts/generate_case_studies.py --check` if applicable, HTML anchor/local asset checks, CSS parser if available, Git whitespace diff). Respect tracked CRLF and use `git -c core.whitespace=cr-at-eol diff --check` when appropriate.
7. Capture before/after screenshots if browser tooling exists; if not, explicitly mark visual testing incomplete and supply a manual visual QA checklist. Do not claim a screenshot was produced without tooling.
8. Update `docs/MOTION_SYSTEM.md`, create `docs/CREATIVE_DIRECTION.md`, optionally `docs/INTERACTION_INVENTORY.md`, and note remaining manual review needs.

---

## 05 · Hard constraints: quality, security and personal content

- Do not copy a showcase portfolio. Do not use unlicensed artwork, logo assets, fake website screenshots or fabricated achievements.
- The site remains **Divejikan's portfolio**—not the Zatroz or Softora corporate website. Founder identity is clear but balanced with software/AI engineering work.
- Preserve source-of-truth copy for FlowPilot AI, CORTEX, MediGuardian AI and INFRAOS. Maintain current disclaimers/status and verified GitHub/demo availability; don't change a team repo into the user's personal work claim.
- Do not change substantive academic/credential information unless backed by provided evidence.
- Keep semantic landmarks, one `<h1>` per page, alt text, logical heading order, contrast, 44px touch targets, focus visibility, and optional motion.
- Avoid font files from untrusted sources, remote tracking, unnecessary external image dependencies, excessive JavaScript payload, forced waits, broken touch scroll or simulated performance metrics.
- No arbitrary framework migration. No package installation without an explicit reason and owner approval where material. A bounded use of official GSAP plugins within the existing static architecture is permitted after verifying version/source.
- Preserve the user’s unchanged original `Mister_PersonalPortfolio` repository.

---

## 06 · Acceptance criteria: not just “animations added”

### Visual originality
- [ ] Before/after desktop screenshots show clearly different editorial composition, spacing, typography and project storytelling even with motion disabled.
- [ ] A coherent Digital Atlas signal motif connects a few story beats without looking like a generic AI network dashboard.
- [ ] At least three signature compositions/interactions have an original rationale and no showcase copying.
- [ ] Hero has memorable, balanced identity and truthful readable copy.
- [ ] Featured work has individually art-directed treatments without fake screenshots.
- [ ] Sections do not repeat the same three-card/centered-title template; mobile retains clarity.

### Interaction
- [ ] GSAP and ScrollTrigger initialize once from a single coordinator; plugin loads are checked.
- [ ] No conflicting animation ownership or duplicate observers/tweens after refresh, filter, media query change, or BFCache.
- [ ] Featured work scroll, if pinned, remains finite and keyboard-accessible; otherwise a deliberate sticky vertical concept is implemented and documented.
- [ ] Project filters remain correct and refresh scroll geometry when needed; no hidden item animates back into view.
- [ ] No disrupted native anchor or Back/Forward behavior.
- [ ] All content remains visible and functional with JS disabled, reduced motion, CDN failure or low device capability.

### Engineering
- [ ] All four case-study URLs still load directly; generator checks remain current.
- [ ] Contact handoff still accurately asks visitor to review/send in an email app.
- [ ] CV path, verified external links, project data and image sources are preserved.
- [ ] UI works at named viewports and 200% zoom without overflow, overlap or focus traps.
- [ ] Appropriate tests really ran and a report distinguishes passed, failed and unrun checks.
- [ ] No broad UI framework migration or unrelated data rewrite.

---

## 07 · Git instructions

Use an approved integration base that actually includes Tasks 02–14. If Task 14 is not merged, do not silently branch from an outdated `main`.

```bash
git status
git switch main
git pull --ff-only origin main
# Verify Task 14 is included in the actual approved base.
git switch -c task/14b-digital-atlas-redesign

# Audit, redesign, test, inspect diff.
git -c core.whitespace=cr-at-eol diff --check
git status
git diff --stat
# Stage only this task's files.
git add <specific-redesign-files>
git commit -m "feat: introduce Digital Atlas visual and motion experience"
git push -u origin task/14b-digital-atlas-redesign
```

Do not reset user work, force-push, auto-merge, deploy, or rewrite default branch without approval. A draft PR into the approved base is appropriate only if requested/available. Preserve meaningful intermediate commits for review if the redesign is large.

---

## 08 · Required Codex completion report

Return:

1. Baseline commit/branch, created feature branch and commit SHA(s).
2. Visual design concept and three original signature moments; why each fits the personal portfolio.
3. List of every modified/created file and explanation.
4. Section-by-section before/after description, especially Hero/Projects/Contact.
5. Motion inventory table: trigger, property, duration/scrub, target, fallback, owner module.
6. GSAP/plugins actually loaded and their pinned versions; skill references actually read (or limitations).
7. Choice of pinned feature deck versus sticky vertical alternative, with keyboard/mobile rationale.
8. Real QA results: named viewport screenshots if captured, responsive/keyboard/scroll/filter/deep-link checks, reduced-motion/CDN-failure checks, static/build/generator checks; clearly mark unavailable checks.
9. Any unresolved CV freshness, missing screenshots or unverified external destinations.
10. Confirmation that original repo, verified factual content, mailto disclosure, routes and native anchors were preserved.
11. Confirm **no merge and no deployment**. Stop; do not proceed to Task 15 automatically.

---

## Final instruction to Codex

**Execute Task 14B ONLY.** This is a **creative UI redesign AND advanced GSAP choreography**, not just replacing fade-up values with bigger numbers. Maintain the existing static architecture and original personal identity, use the official GSAP showcase and agent guidance for techniques without copying reference sites, make the still-state beautiful, deliver three genuinely distinctive signature moments, preserve accessibility and functional fallbacks, and commit a reviewable feature branch. **Do not auto-merge, deploy, or start Task 15.**
