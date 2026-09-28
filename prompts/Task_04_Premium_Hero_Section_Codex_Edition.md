# PORTFOLIO V2 — TASK 04
## Premium Hero Section — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task:** 04 of 17  
**Dedicated branch:** `task/04-premium-hero-section`  
**Design language:** Porcelain Arctic — Arctic Blue & Slate × Porcelain & Cobalt  
**Goal:** Build a memorable, sophisticated, responsive, conversion-oriented opening section that accurately introduces Yuvarajah Divejikan as an AI/ML-focused software developer and technology founder.

> **Execution boundary:** Complete **Task 04 only**. Do not implement Task 05 (About), Task 06 (Skills), new project cards, achievements section, global redesign, a framework migration, or Task 14's full animation system. Preserve the existing site and respect Tasks 01–03.

---

## 0. Your role and operating rules

Act as a senior product designer, frontend engineer, accessibility specialist, and UI QA engineer. The site should look like a custom-built, premium engineering portfolio, not a generic SaaS template or an exaggerated crypto-style landing page.

1. Inspect the **actual new Portfolio V2 repository**, not just the legacy repository. Review the current framework and files, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md` if present, and relevant earlier task commits. Treat missing docs as missing—do not invent their contents.
2. Verify that Tasks 02 (design system) and 03 (navbar/navigation) are in the approved integration base. If they are on separate, unmerged branches, do not silently implement on the wrong base. Report the dependency and obtain the approved base.
3. Inspect existing Hero markup, CSS, scripts, portrait asset, CV link, canvas/Three.js setup, current section anchors, loading behaviour, and any breakpoints before changing code. Use real project conventions; no assumed migration to React/Next.js.
4. Do not modify the legacy repository `divejikan-yuvarajah/Mister_PersonalPortfolio` or the currently deployed site outside the approved new V2 workflow.
5. Work on only the dedicated feature branch, preserve unrelated changes, keep the diff reviewable, and do not auto-merge into `main`.
6. Do not fabricate biography, employment, awards, numbers, startup URLs, endorsements, availability, or project features. Use verified supplied facts and mark uncertain items for confirmation.
7. Run available checks. If a test or browser check is unavailable, clearly state it was **not run**. Do not assert completion or deployment without evidence.

---

## 1. Legacy baseline — reference, not assumed current structure

The original portfolio had:

- `<section id="hero" class="hero-section">` with an oversized `Yuvarajah Divejikan` heading, typed roles, two CTA links, a portrait in `images/profile_new.jpeg`, layered visual effects and a decorative `#bg-canvas`.
- Inline HTML styles and inline typewriter code with roles such as `Aspiring AI Software Engineer`, `AI & ML Enthusiast`, and `Entrepreneur`.
- A PDF link at `images/My_CV.pdf`, which may be **older** than the user's revised CV.
- `js/main.js` initialising the Three.js background, existing animations and skills interactions.
- A navbar from Task 03 expected to link to the existing `#hero` anchor.

Re-inspect V2; these paths may have moved. Avoid duplicate timers, direct script injection, or breaking the integrated navigation. **Do not preserve obsolete copy merely because it is in the old HTML.**

---

## 2. Brand and design direction

The Hero should immediately convey: **engineering capability, AI product work, startup leadership, clarity and personality**. Use editorial typography, purposeful negative space, neat composition and restraint.

### 2.1 Porcelain Arctic colour roles

Use the **existing Task 02 CSS variables or theme tokens**, not hardcoded copies when a token is already available. Reference palette:

| Role | Reference hex | Intended use |
|---|---|---|
| Porcelain page | `#F8FAFC` | Main Hero canvas |
| Warm porcelain | `#F5F4F0` | Optional lower gradient/transition |
| White | `#FFFFFF` | Floating surfaces, if needed |
| Deep navy | `#0F172A` | Primary large headline |
| Slate | `#1E293B` | Strong secondary text |
| Muted slate | `#475569` | Supporting paragraph |
| Cobalt | `#2563EB` | Primary CTA / focal emphasis |
| Deep cobalt | `#1D4ED8` | CTA hover |
| Arctic blue | `#60A5FA` | Subtle atmospheric detail |
| Light blue | `#DBEAFE` | Badges / controlled highlight |
| Border | `#E2E8F0` | Crisp structural borders |

**Fonts:** Manrope for the display heading; Inter for body/UI; JetBrains Mono only for tiny technical metadata or labels. Consistent with Task 02. Avoid all-caps body text, excessive letter spacing, neon effects, dark-dominant surfaces or a purple palette.

### 2.2 High-level layout

**Desktop:** A carefully balanced two-column Hero: left = copy, headline and actions; right = a real portrait or a refined framed image composition. The photo should feel personal, sharp and professional. The section should have generous but controlled space; the first meaningful content should be visible without unnecessary blank space. A compact context/credential ribbon may sit below the main grid.

**Mobile:** Reflow naturally to one column. Keep headline, key description and primary CTA visible early; scale down image and decorations without overlapping content or creating horizontal scrolling. Decide copy/image order by usability, not just visual symmetry.

**Styling cues:** subtle cobalt underline or highlight on a short phrase; small mono eyebrow; premium portrait frame with pale blue halo or grid/accent geometry; deliberate separation between badge, heading, paragraph, CTAs and contextual proof.

---

## 3. Content specification — accurate, concise and human

The goal is a specific professional identity, not multiple conflicting labels. Use the user's approved positioning as source material; refine grammar, do not inflate seniority or credentials.

### 3.1 Preferred Hero copy

**Eyebrow / introductory label:** `HELLO, I'M DIVEJIKAN` or `SOFTWARE × AI × ENTREPRENEURSHIP` (pick one clean treatment).

**Single H1:** `Yuvarajah Divejikan` or a comparable clear presentation of the user's name. Keep the name readable, not a decorative image. A small adjacent or subordinate accent may be used for expression.

**Role / supporting heading:** `AI/ML-Focused Software Developer & Tech Founder` (recommended neutral copy). If existing user-approved copy calls him `Software Engineer (AI/ML)`, it may be used as self-description, but do not imply employment or credentials beyond supported context.

**Short summary (edit only for fit/clarity):**  
`I build intelligent software, AI-powered products, and practical digital solutions—from financial tools for SMEs to workflow automation and enterprise platforms.`

**Context line:** `Founder & CEO at Zatroz · Co-Founder & Technical Lead at Softora · BICT (Hons) Undergraduate, SEUSL.`

Check the V2 source for approved final wording. Do not add start dates, unconfirmed company domains or generic claims such as 'world-class', 'industry-leading', 'used by thousands' or 'award-winning founder'.

### 3.2 Credibility accents — optional and factual only

Possible small, elegantly presented proof points (verify current wording before including):
- `1st Place — FinTech Track, Cursor Colombo Buildathon 2026`
- `Top 10 Finalist — Cursor Colombo Buildathon 2026`
- `Founder — Zatroz`

One compact highlight strip is enough. **Do not fabricate visitor metrics, users served, GitHub stars, years of experience, 100+ projects, customer logos or unverified competition statistics.** Keep these as optional if layout becomes crowded; a dedicated Achievements section comes later.

### 3.3 Professional CTAs

Prioritise **two actions**:
1. Primary: `Explore My Projects` → actual existing `#projects` anchor.
2. Secondary: `Let's Connect` → actual existing `#contact` anchor.

A tertiary `Download CV` action may appear if and only if the **latest approved resume file is available and the target resolves**. The old `images/My_CV.pdf` may be outdated. Do not silently publish outdated personal details or replace the link with a nonexistent path. If the latest file is missing, preserve a functioning existing link or clearly document it as an item requiring the user-approved update; do not present a broken button. If using an icon, maintain a visible text label.

Add small GitHub and LinkedIn external links only if their actual target URLs are confirmed in existing data. External links should have meaningful accessible names and `rel="noopener noreferrer"` when using `target="_blank"`.

### 3.4 Availability/status language

Do not claim `Available for Hire`, `Open to Work`, live-response status, or a real-time online indicator without approval. A static `Open to collaborations` badge is acceptable only if already user-approved in V2 content; otherwise use a neutral `Building AI-powered software` label. Avoid a pulsating green status dot that implies an unverified real-time state.

---

## 4. Hero UI components and hierarchy

Build or refine these elements in the Hero only. Reuse the Task 02 component patterns where already implemented.

1. **Eyebrow** — fine mono/caps or lightweight text, with a restrained line or small cobalt mark.
2. **Primary identity** — one semantic H1 with name and comfortable desktop/mobile line lengths.
3. **Role line** — solid, informative subheading. If a typewriter is retained, it must not be the only way the identity is conveyed.
4. **Supporting paragraph** — 2–3 concise lines on desktop and natural flow on smaller screens.
5. **CTA row** — visual priority and robust focus/hover/pressed states; no overflow on 320px.
6. **Founder/education metadata** — compact, legible and not buried in a tooltip or animation.
7. **Portrait composition** — existing authentic `profile_new.jpeg` asset where present; use tasteful frame/pale cobalt glow and avoid artificial stock-photo replacements. Preserve aspect ratio and meaningful `alt` text.
8. **Optional proof strip** — 1–2 verified short achievement statements; compact layout, not distracting from CTAs.
9. **Optional scroll cue** — only if nonessential, accessible and subtle. Avoid an inert 'scroll down' control.

Avoid complex carousels, fake terminal windows, floating meaningless code blocks, artificial analytics dashboards, huge glowing orbs and duplicated badges. Make the final composition polished rather than busy.

---

## 5. Motion and interactive behaviour

Task 14 will cover the global GSAP animation system. For **Task 04**, implement only light Hero-scoped enhancements where the existing stack already supports them.

- Entrances may include simple staggered opacity/translate with gentle timing **only after content is readable without JavaScript**.
- Avoid `opacity: 0` permanently hiding content when JS fails or reduced motion is active.
- Respect `prefers-reduced-motion: reduce`: disable typewriter loops, continuous halos, parallax and unnecessary entrance transforms. Render complete static role text.
- If keeping the legacy typewriter, move inline code into the existing JS architecture, ensure only one loop/init runs, do not cause heading width or layout shift, and provide static accessible text. For a calmer design, replace typewriter with one stable role line—preferred unless its UX is demonstrably strong.
- Do not load GSAP solely for this task if not already integrated. If already available, scoped animation is acceptable with cleanup on re-init/unmount.
- Existing Three.js background must remain optional/decorative, legible on a **light** canvas, pointer-events safe, and performance-aware. Scope modifications to Hero integration and preserve existing dependencies. Do not rebuild the 3D system here.
- If the background is dark or obscures text after Task 02, adjust its visible contrast, opacity or decorative presentation carefully; provide graceful fallback for WebGL-unavailable devices.
- Hover effects should be meaningful but restrained. Never let motion interfere with navigation, reading or clicking.

---

## 6. Implementation quality and architecture

- Stay with the **actual** V2 stack. If vanilla HTML/CSS/JS remains, use semantic markup and modular CSS/JS. If a framework was legitimately introduced by the prior tasks, use its native component/lifecycle patterns.
- Remove Hero-specific inline `<style>` and `<script>` where feasible **without changing other sections**. Avoid selector bleed from global heading, paragraph, `.btn` or image rules.
- Consolidate relevant copy/links into existing content configuration if Task 01 made one; avoid inventing a sprawling data system for just one section.
- Retain `id="hero"` or approved equivalent for Task 03 wordmark/back-to-top navigation. Do not break current nav ID or CSS scroll offsets.
- Respect existing semantic `<main>` and skip-link infrastructure. Exactly one primary `<h1>` on the page.
- Prevent CLS: set image dimensions/aspect ratio and stable decorative containers. Load above-the-fold portrait appropriately (do not lazily load an immediately visible LCP portrait; use `fetchpriority="high"` only when justified by the actual build/runtime).
- Avoid new large font weights, background videos or remote imagery. Use responsive images when actual source sizes justify them.
- Use a mobile-safe layout without hardcoded massive fixed heights; `min-height` may be used thoughtfully. Handle small laptops and mobile browser chrome.
- Avoid inaccessible low-contrast muted text, tiny metadata, text clipped by overflow, overscrolling under the sticky header, unnecessary animation loops or 3D blocking interaction.
- Do not silently change company websites, social handles, emails, external links, legal name, dates, job titles or achievements beyond the approved copy.

### Candidate file locations (inspect current repo first)

- Hero markup/component: actual page or component that contains `#hero`.
- Hero styles: existing theme/layout styles or a focused stylesheet/module, following Task 02 conventions.
- Hero-specific JS: entry point or focused module, avoiding duplicate typewriter/event listeners.
- Portrait asset: current authentic image, previously `images/profile_new.jpeg`.
- Documentation: `docs/HERO.md` with layout rationale, content sources/verification, CTA targets, image/animation decisions, and future update instructions.

---

## 7. Responsive layout and accessibility requirements

Test at a minimum 320, 375, 390, 768, 1024, 1280 and 1440px, plus one short-height desktop window.

### Responsiveness

- At 320px: no horizontal scroll, no clipped letters, legible headline, buttons accessible, portrait doesn't crush copy, no overlapping sticky navigation.
- At 375–390px: mobile priority and legible spacing; CTA buttons can stack or wrap elegantly.
- At 768px: deliberate one-column or balanced transitional design; avoid awkward half-image widths.
- At 1024px+: two-column layout if available width supports it, with controlled line length and balanced visual weight.
- At large widths: content remains in the design-system max-width container, not spread edge to edge.
- Ensure minimum comfortable button/touch target dimensions ~44px and visible tap feedback.

### Accessibility

- Meaningful portrait alt text such as `Portrait of Yuvarajah Divejikan`; purely decorative rings/shapes should be hidden from assistive technology.
- One visible H1; supporting headings follow correct hierarchy without skipping for visual convenience.
- CTA anchor text clearly communicates destination; no fake `<button>` for in-page navigation.
- Keyboard focus visible and non-obscured by nav/overlays.
- WCAG AA text contrast targets; verify rather than assuming blue-on-light combinations pass.
- Readability when zoomed to 200% and text-only/reduced-motion modes.
- Content must be understandable without hover, audio, animation or Three.js.
- If role cycling remains, do not set an aggressive live region that endlessly announces changing text. Prefer static accessible label.

---

## 8. Work plan — execute sequentially

1. Check `git status`, approved integration branch and latest Task 02/03 state. Resolve dependency issues safely before edits.
2. Inspect the current Hero and navbar anchor contract; record existing image and PDF references.
3. Create branch `task/04-premium-hero-section` from the up-to-date approved integration base.
4. Record the layout choices and verify identity/achievement/link copy against approved repo/user data.
5. Implement semantic Hero content hierarchy and two main CTA destinations.
6. Build desktop portrait composition and balanced visual hierarchy using existing design tokens.
7. Add mobile/tablet layout rules, stable image dimensions and alignment.
8. Decide whether to simplify or preserve the typewriter; implement reduced-motion/static fallback and scoped initialization.
9. Check interplay with Task 03 sticky navbar, anchor navigation, `#bg-canvas`, current scroll/reveal system and adjacent About section.
10. Document structure, content decisions, link checks and any unresolved CV/branding asset in `docs/HERO.md`.
11. Run available repository checks and manual browser/viewport validation as tooling permits.
12. Inspect focused diff, commit and push only Task 04 files; do not merge without review.

### Suggested Git workflow

```bash
git status
git switch main
git pull --ff-only origin main
# Verify Tasks 02 and 03 are present on main, or use the approved integration base.
git switch -c task/04-premium-hero-section

# Implement + test Task 04 only.

git diff --check
git status
git diff --stat
git add <only-files-owned-by-task-04>
git commit -m "feat: redesign premium responsive portfolio hero"
git push -u origin task/04-premium-hero-section
```

If the current base differs from `main`, adapt these commands to the documented integration branch. Do not force-push, delete user work, commit secrets, or auto-merge. Preserve any unrelated dirty changes and report the issue before proceeding.

---

## 9. Acceptance criteria and verification matrix

### Visual/design

- [ ] Porcelain Arctic palette and Task 02 typography applied consistently.
- [ ] Visual style is premium, restrained and personalised—not generic template/UI clutter.
- [ ] Heading, role, summary, founder context, CTAs and portrait have clear hierarchy.
- [ ] No accidental giant whitespace, disproportionate image, clipping or collision with navbar.
- [ ] Light background and Three.js/canvas do not reduce readability.

### Functionality

- [ ] `#hero` (or approved current anchor) remains valid for navbar brand link.
- [ ] `Explore My Projects` reaches a real projects section.
- [ ] `Let's Connect` reaches a real contact section.
- [ ] CV link resolves to an approved, existing document if displayed; any stale PDF is identified.
- [ ] Verified GitHub/LinkedIn links work if included.
- [ ] No Hero JS errors, duplicate typewriter loops, stuck invisible text or asset failures.
- [ ] Other section IDs and features remain unchanged.

### Responsive/accessibility

- [ ] Manual/browser viewport checks at 320, 375, 390, 768, 1024, 1280 and 1440px where possible.
- [ ] No horizontal overflow, clipped copy or obscured CTA at any supported width.
- [ ] Portrait has meaningful alt text and stable dimensions.
- [ ] Single H1, logical structure, visible keyboard focus and usable skip link.
- [ ] Reduced-motion mode shows complete content without looping text or distracting effects.
- [ ] Text/buttons meet contrast and touch target expectations.
- [ ] Sticky navbar does not obscure anchor target or content.

### Regression/quality

- [ ] Existing nav opens and closes correctly on mobile.
- [ ] Projects, skills filtering, contact, Three.js and other sections still function.
- [ ] Run actual build/lint/test commands **if the scripts exist**; record output and failures honestly.
- [ ] `git diff --check` passes.
- [ ] No unrelated dependencies or global CSS regressions.
- [ ] No false credentials, made-up stats or invented endpoints.
- [ ] Hero copy/asset rationale captured in `docs/HERO.md`.

**Definition of Done:** The Hero professionally communicates the user's accurate identity, presents a strong first impression, works on phones and desktops, follows Task 02 and Task 03 foundations, offers functioning CTAs, supports keyboard/reduced-motion usage, and exists as a reviewable focused commit on the dedicated branch.

---

## 10. Required final report from Codex

Conclude with:

1. **Task completed:** 04 — Premium Hero Section.
2. **Repository / approved base / feature branch / commit SHA** (and PR link if created).
3. **Files created and modified**, with a purpose for each.
4. **Final displayed Hero copy** and any unverified items intentionally omitted.
5. **CTA targets** and whether the CV link is confirmed current.
6. **Design choices:** layout, typography, portrait, mobile composition and animations.
7. **Checks actually run**, concrete results, viewport coverage, and checks that were unavailable.
8. **Regression confirmation**, including navbar, 3D canvas and other sections.
9. **Any blockers or follow-up requests** (e.g., latest PDF CV, approved website URLs or photo).
10. **Next task:** Task 05 — Professional About Section. **Do not start Task 05.**

### Mandatory final instruction

**Execute ONLY Task 04. Inspect the real current V2 code before editing. Reuse the approved Porcelain Arctic theme and Task 03 navigation. Do not auto-merge or deploy. Stop after verification, documentation, focused commit/push, and a truthful completion summary.**
