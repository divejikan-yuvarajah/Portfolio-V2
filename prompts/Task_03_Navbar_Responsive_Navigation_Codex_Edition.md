# PORTFOLIO V2 — TASK 03
## Premium Navbar & Responsive Navigation — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task ID:** 03 / 17  
**Feature branch:** `task/03-navbar-responsive-navigation`  
**Theme:** Porcelain Arctic  
**Objective:** Replace the legacy navigation with a polished, responsive, keyboard-accessible navigation system that uses the Task 02 design foundation and works with the site's actual sections.  
**Scope boundary:** Implement **Task 03 only**. Do not start Task 04 (Hero), rewrite other sections, or migrate frameworks.

---

## 0. Execution contract — read before writing code

Act as a **Senior Frontend Engineer, UI/UX Engineer, Accessibility Specialist and QA Engineer**. Inspect the **current Portfolio V2 repository** first. Prefer its real structure and Task 01/02 documentation over assumptions in this prompt.

1. Read `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, and `docs/DESIGN_SYSTEM.md` **if present**. Inspect the current branch, repository status, markup, styles, script entry point, existing navigation behaviour, section IDs, and available test/build commands. Report missing documents; do not invent them.
2. Task 02 must be integrated into the approved base before building Task 03. If the design tokens are only on an unmerged branch, **do not silently base on an unrelated commit**. Verify the approved integration branch with the user or report the dependency and stop safely.
3. Use the existing framework and file conventions. The original reference portfolio had `index.html`, `css/style.css`, and `js/main.js`, but the new repository may have changed. Do not assume paths without checking them.
4. Preserve the Hero, projects, animations, Three.js scene/canvas, skills filters, typewriter, contact section, images, project links and downloadable CV. Touch shared code only as necessary for navigation.
5. Do not alter the original `divejikan-yuvarajah/Mister_PersonalPortfolio` repository.
6. Do not install a new UI framework, icon library, router, animation library, or other dependencies solely for this task. Use the native platform where possible.
7. Never claim a test, deployment, accessibility audit, or visual inspection was completed unless it actually ran.
8. Keep the work easy to review: **one dedicated feature branch; focused changes; no automatic merge to `main`**.

---

## 1. Verified legacy reference — recheck the live V2 code

The earlier `Mister_PersonalPortfolio` code used the following patterns. These are **reference context, not a guarantee about the V2 repository**:

- A `<nav class="navbar">` with an `<a class="logo">MISTER.</a>`.
- A `div.menu-toggle#mobile-menu` composed of three `.bar` spans (not a native button).
- A `.nav-links` list with anchors for `#about`, `#skills`, `#projects`, `#experience`, `#education`, `#certifications`, and `#contact`.
- A listener in `js/main.js` toggling `.active` on the menu and closing it after link clicks.
- A `#hero` section and a decorative `#bg-canvas` Three.js canvas.

Inspect the **actual current V2 IDs** before constructing the final navigation. Keep valid working anchors. Do not invent an Achievements or Community anchor if the corresponding section does not yet exist. Make the navigation easy to update as those sections are added in later tasks.

---

## 2. Desired end result

Create a **premium, understated, recruiter-friendly navigation** matching Porcelain Arctic:

- Spacious yet compact sticky header, balanced grid/alignment, subtle border and optional restrained translucent porcelain background.
- Clear personal wordmark such as **`Divejikan.`** or **`Divejikan /`**; no obsolete `MISTER.` branding.
- Desktop navigation with high-clarity links, discernible active state and a prominent **Contact** action.
- An accessible mobile menu with a real toggle button and properly controlled expanded/collapsed state.
- Reliable same-page navigation that lands with the target heading visible below the sticky header.
- Works without relying on heavy animation. Does not obscure content or compete with Three.js decoration.
- Stable at 320, 375, 768, 1024 and 1440px widths; keyboard and touch friendly.

### Design language and tokens

Reuse **Task 02's implemented semantic tokens**. The following are reference roles only:

| Role | Reference colour | Use |
|---|---|---|
| Page background | `#F8FAFC` | Porcelain base |
| Alternate surface | `#F5F4F0` | Optional warmer surface |
| Nav elevated surface | `#FFFFFF` | Header / dropdown surface |
| Heading | `#0F172A` | Wordmark / prominent text |
| Main nav labels | `#1E293B` | Standard nav links |
| Muted text | `#475569` | Secondary labels only |
| Primary action | `#2563EB` | Contact CTA / active treatment |
| Action hover | `#1D4ED8` | Interactive feedback |
| Soft active highlight | `#DBEAFE` | Active pill / hover surface |
| Border | `#E2E8F0` | Thin header and panel divider |
| Decorative accent | `#60A5FA` | Subtle accents only |

- Default mode: **light**.
- Fonts: **Manrope** for brand/headings, **Inter** for nav/UI text, optional **JetBrains Mono** for a small technical label if appropriate.
- Do **not** add dark-mode functionality in Task 03.
- Use CSS variables and existing typography/spacing primitives, not a new pile of hex codes or `!important` declarations.
- Prefer measured transitions on opacity/transform and colour; avoid flashy gradients, giant shadows, or complicated micro-interactions.

---

## 3. Functional requirements

### 3.1 Header structure and semantics

- Implement a semantic site header (for example `<header class="site-header">`) containing one `<nav aria-label="Primary navigation">`.
- Provide a proper top-of-page/hero wordmark link. Prefer the existing `#hero` section if it exists. Do not introduce broken `/` navigation on a static site or alter a configured base path unintentionally.
- Keep navigation items in an accessible list. Use native `<a>` elements for navigation; **do not use clickable divs**.
- Keep the header markup and scripts readable and maintainable. Where appropriate, extract menu behaviour into the existing JavaScript module conventions.
- Add/retain a **skip to main content** link near the beginning of `<body>`, targeting a real `<main id="main-content">` (or current equivalent). Ensure it is visibly usable when focused.
- Preserve a single meaningful page `<h1>` in the Hero; the brand must not create a competing H1.
- Use meaningful text labels; decorative icons/spans should be hidden from assistive technology where appropriate.

### 3.2 Desktop navigation

- At comfortable desktop width, display a compact single-row layout with left-aligned brand, readable nav links, and a Contact action aligned toward the right.
- Avoid too many links that squeeze awkwardly. Include only sections currently implemented and valid, using the current section IDs. The anticipated sections are About, Skills, Projects, Experience, Education, Certifications and Contact; adjust based on actual V2 markup.
- Set a clear active-link treatment, distinct hover/focus states, and a consistently visible selected state that is not communicated **only** by colour.
- Keep the navbar from wrapping or colliding with logo/CTA. Choose a mobile breakpoint based on content fit, not on an arbitrary device name.

### 3.3 Sticky and scroll behaviour

- Use a sticky or fixed header only after evaluating the current layout. If fixed, account for the header's occupied space safely.
- Header may transition from transparent/soft porcelain to an elevated surface after scrolling, but the effect must be **subtle and not cause layout shifts**.
- Prefer CSS `scroll-margin-top` on anchor target sections (or an equally robust equivalent), using the actual header height and spacing. Do not apply offsets that clip section headings.
- If smooth scrolling is implemented, let standard anchor links remain functional and respect `prefers-reduced-motion: reduce`.
- Preserve location hashes, browser Back/Forward behaviour, keyboard navigation and direct navigation to `/#projects` or equivalent. Do not replace native anchors with JavaScript-only scrolling.
- Test keyboard focus after anchor navigation and ensure sticky content does not conceal important headings or focused controls.

### 3.4 Mobile/tablet menu — critical

- Use a native `<button type="button">` for the menu toggle with a descriptive accessible name (for example **Open navigation menu**).
- Keep `aria-expanded` synchronised with the actual menu visibility, and use `aria-controls` to reference a stable ID on the controlled menu.
- Reflect state in a single source of truth. If state changes due to a link click, Escape, breakpoint change, or outside click, attributes/classes/visibility must remain consistent.
- Menu opens below the header or in an intentional overlay/panel without clipping, overflow or unexpected page shifts.
- Ensure hidden links are **not keyboard-focusable** while the menu is closed (choose a reliable CSS/HTML strategy compatible with your stack).
- Menu links have comfortable touch targets (aim for at least 44×44px), readable text, and a well-defined focus ring.
- When the menu opens via keyboard, focus should be handled predictably. When closed by Escape, return focus to the toggle if focus was inside the menu. Avoid indiscriminately stealing focus on pointer interactions.
- Close the mobile menu when: a navigation link is activated; Escape is pressed; the user clicks/taps outside the nav; and the viewport transitions into the desktop layout.
- Do not close it when clicking inside empty menu space unless that interaction is intentionally designed.
- If it is a simple dropdown, **do not trap focus as though it were a modal**. If a true modal drawer is intentionally selected, provide complete dialog semantics, focus containment/restoration, overlay dismissal and background interaction handling; prefer the simpler dropdown for this portfolio.
- Prevent menu button, Contact CTA and links from overlapping at 320px.
- Ensure `touch` and mouse interactions do not double-fire.

### 3.5 Active section navigation

- Highlight the current section while reading/scrolling, and handle direct hashes on page load.
- Prefer `IntersectionObserver` where suitable, with correct root margin relative to header height and section visibility. Use a simple fallback when unsupported.
- Do not mark non-existent anchors as active; ignore or gracefully handle unknown hash fragments.
- Avoid unnecessary scroll listeners, layout thrashing or frequent DOM writes. If scroll-based logic is required, use a passive listener and a throttled or animation-frame strategy.
- Do **not** rewrite browser history on every scroll. Use `aria-current="location"` or an equally meaningful active-link indication and update it only when state changes.
- If the Hero is in view, provide a sensible default active state or no selected section (document your choice).

### 3.6 Visual polish

- Header height should feel compact, with consistent padding and no aggressive resizing on scroll.
- Subtle bottom border/elevation; high readability against underlying sections.
- Wordmark uses navy with restrained cobalt punctuation/accent. The identity should feel personal and polished.
- Contact CTA uses cobalt; hover uses deeper cobalt; keyboard focus is prominent.
- Active links can use an underline, soft highlight and/or indicator, but avoid unnecessary repeated visuals.
- Hamburger-to-close state change should be restrained and optional; accessible labels must update correctly.
- Maintain compatibility with the site's existing cursor effect and decorative canvas. Navigation must retain pointer access and correct z-index.

---

## 4. Component and implementation guidance

These are suggestions, **not forced paths**. Choose what matches the actual codebase.

For a vanilla site:
- `index.html`: semantic header/nav, skip link, relevant `id` and `aria-*` attributes.
- Existing Task 02 CSS files (e.g. `css/tokens.css` and `css/style.css`), or a dedicated `css/navigation.css` loaded in the correct order.
- Existing entry point `js/main.js` or a dedicated `js/navigation.js` exported and initialised only once.
- `docs/NAVIGATION.md`: usage, structure, tokens, available anchors, mobile behaviour and extensibility notes.

For a React/Next.js codebase that was genuinely introduced in Task 01/02, use idiomatic components/hooks and route-aware primitives where appropriate. Do not reintroduce vanilla DOM handling that conflicts with framework lifecycle.

**Avoid:**
- duplicate event listeners on repeated initialization;
- uncancelled observers/listeners if component unmounts;
- IDs shared by multiple elements;
- anchoring to nonexistent sections;
- styling `nav a` globally and breaking footer/project links;
- dependency additions without justification;
- direct inline styles for hover/state;
- changing Hero copy, section content, project order or unrelated styling.

---

## 5. Work plan — execute in order

1. Run `git status` and inspect recent commits and the approved integration branch.
2. Confirm Task 02's token/typography foundation is available on the approved base. If not, report the dependency; do not manufacture or discard its changes.
3. Inspect actual navigation HTML and JavaScript, currently implemented sections and IDs, media queries, design tokens and z-index conventions.
4. Note existing issues: semantic toggle, hidden mobile links, active state, sticky offsets, visual density and potential overlay conflicts.
5. Create the feature branch `task/03-navbar-responsive-navigation` from the up-to-date approved base.
6. Implement accessible semantic navbar, wordmark and skip link.
7. Apply the Porcelain Arctic desktop appearance and fit-based breakpoint.
8. Implement mobile menu state/ARIA, dismissal, focus handling and resize cleanup.
9. Implement reliable anchor offsets and active-section indication.
10. Check the existing Three.js/cursor/other scripts for regressions.
11. Write `docs/NAVIGATION.md` with behaviour, anchor mapping, accessibility decisions, maintenance notes and future section additions.
12. Run all available validation; inspect the final diff; commit and push the feature branch. Do not automatically merge.

### Suggested Git commands

Adjust the base branch only if the repository's documented integration workflow specifies another branch.

```bash
git status
git switch main
git pull --ff-only origin main

# Confirm Task 02 changes are present, then:
git switch -c task/03-navbar-responsive-navigation

# Implement + verify only Task 03

git diff --check
git status
git diff --stat
git add <only Task 03 files>
git commit -m "feat: build accessible responsive portfolio navigation"
git push -u origin task/03-navbar-responsive-navigation
```

- If `main` does not yet contain Task 02, **do not blindly continue**. Report the required merge/review or explicitly approved integration base.
- If the working tree has unrelated changes, preserve them and report the blocker rather than stashing/dropping without permission.
- No `git reset --hard`, no `git push --force`, no unrelated deletions, no automatic PR merge.
- Prepare a PR into the approved integration branch after checks, if supported and requested.

---

## 6. Verification checklist and acceptance criteria

### A. Device and layout checks

Test the following viewports, or the nearest tooling-supported equivalents:

| Width | Expected behaviour |
|---|---|
| 320px | No horizontal scroll; brand/toggle visible; menu fits |
| 375px | Mobile menu opens and closes; links legible |
| 768px | Comfortable menu or desktop nav based on measured fit |
| 1024px | Desktop nav aligned without wrap/clipping |
| 1440px | Balanced navbar with correct content max-width |

Also inspect at least one intermediate width where the desktop/mobile breakpoint switches.

### B. Functional navigation

- [ ] Brand leads to the real Hero/top location.
- [ ] Every visible nav link points to an existing valid section.
- [ ] Contact CTA reaches the contact section.
- [ ] Section headings remain visible beneath sticky nav.
- [ ] Native hash/direct link loads navigate correctly.
- [ ] Browser Back/Forward works for user-triggered anchor navigation.
- [ ] Active item updates on click, direct load and subsequent scrolling.
- [ ] No console errors or duplicate event effects.
- [ ] Existing animations, Three.js canvas, skills filter and CV download still work.

### C. Mobile and accessibility

- [ ] Toggle is a native button with accessible name, `aria-controls` and accurate `aria-expanded`.
- [ ] Closed menu links cannot receive keyboard focus.
- [ ] Escape closes the menu and restores focus where appropriate.
- [ ] Clicking outside closes the menu.
- [ ] Selecting any section closes the menu.
- [ ] Resizing to desktop resets temporary mobile-open state.
- [ ] Tab/Shift+Tab order makes sense; skip link works.
- [ ] Navigation, active state and focus are visually understandable.
- [ ] Text/controls satisfy WCAG AA contrast targets using actual theme colours.
- [ ] Primary touch targets are approximately 44px or better.
- [ ] Reduced-motion preference disables nonessential nav movement.

### D. Quality checks

- [ ] Run repository build/lint/test commands **only if those scripts exist**.
- [ ] Run `git diff --check`.
- [ ] Confirm no accidental rewrite of Hero/project/Experience content or future tasks.
- [ ] Confirm no credentials, cache, build artifacts or debug logs were committed.
- [ ] Verify no `MISTER.` wordmark remains in the updated navbar.
- [ ] Check mobile with touch/pointer and desktop with mouse and keyboard, using the available tools.
- [ ] If browser screenshot tooling is available, capture desktop and mobile states. If not, explicitly label visual checks as unrun rather than pretending they passed.

**Definition of Done:** A semantic, stable, accessible and visually cohesive navigation system that works at all supported viewports, uses the Task 02 foundation, preserves original features, has documented behaviour and is committed on its own branch.

---

## 7. Deliverables

1. Responsive, themed header/navbar and valid navigation link set.
2. Robust mobile menu and active-section functionality.
3. Accessible skip link and correct focus/ARIA behaviour.
4. Anchor offset handling compatible with the sticky header.
5. `docs/NAVIGATION.md` explaining implementation and maintenance.
6. Verification record with executed tests and known limitations.
7. Feature branch commit, and push if permissions/network allow.

### Required completion response

Provide:

- **Task:** 03 — Premium Navbar & Responsive Navigation.
- **Repository, base branch, feature branch and commit SHA.**
- **Files created/modified** with one-line purpose each.
- **Navigation links implemented** and their verified target IDs.
- **Summary of desktop/mobile functionality** and focus/ARIA decisions.
- **Checks actually executed**, their results, and checks that could not run.
- **Preserved features** explicitly checked.
- **Known limitations or follow-ups**, if any.
- **Next:** Task 04 — Premium Hero Section. **Do not execute Task 04.**

---

## 8. Final instruction

**Implement Task 03 ONLY. Use the actual V2 repository as source of truth, make the navigation polished and accessible under the Porcelain Arctic system, verify behaviour, commit the focused result on `task/03-navbar-responsive-navigation`, and stop. Do not auto-merge or begin subsequent tasks.**
