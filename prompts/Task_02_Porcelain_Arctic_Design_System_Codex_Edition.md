# PORTFOLIO V2 — TASK 02
## Porcelain Arctic Design System — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task ID:** 02 / 17  
**Branch:** `task/02-porcelain-arctic-design-system`  
**Objective:** Establish a polished, reusable, accessible design foundation for all later portfolio work, without rebuilding individual sections yet.  
**Source of truth:** Inspect the current repository and the Task 01 audit documents before modifying code.

---

## 0. Execution contract (read first)

You are acting as a **Senior Frontend Engineer, Design Systems Architect, and Accessibility-Focused UI Engineer** working in Codex.

**Execute Task 02 ONLY.** Do not start Task 03 (navigation), Task 04 (hero), or any other future task. This is a foundation/design-token task, not a site-wide content rewrite or a migration to a new framework.

1. Read `docs/ARCHITECTURE.md` and `docs/IMPLEMENTATION_PLAN.md` if created in Task 01. Inspect the real repository structure, active styling approach, scripts and build commands. If those documents are absent, briefly document that fact and inspect the source; do not invent their conclusions.
2. Preserve the functioning original layout, portfolio content, images, project links, Three.js effects, and downloadable CV. Do not introduce regressions for the sake of visual consistency.
3. Adapt implementation to the actual codebase. The earlier repository used `index.html`, `css/style.css`, and `js/` modules; verify whether the new repository retained that stack before selecting paths or commands.
4. Use the palette and typography below consistently, with semantic tokens rather than scattered hardcoded colour values.
5. Implement robust desktop/tablet/mobile defaults and accessibility as part of the design foundation.
6. Do not claim tests or build checks passed unless executed successfully. If a tool is unavailable, report the limitation and perform available alternatives.
7. Do not delete, overwrite, force-push, or modify the original `Mister_PersonalPortfolio` repository.

---

## 1. Design direction

**Theme name:** `Porcelain Arctic`  
**Visual identity:** The cleanliness of Arctic Blue & Slate combined with the editorial feel of Porcelain & Cobalt. The result should be restrained, spacious, premium, technical, and recognisably personal—**not** a generic neon AI dashboard.

**Personality:** software engineer + AI/ML builder + tech founder.  
**Default mode:** light. Do not create a dark-mode toggle or a full second theme in this task. Structure tokens so another mode can be added later if desired.

### 1.1 Canonical palette

| Role | Value | Intended use |
|---|---|---|
| Porcelain page | `#F8FAFC` | Main page canvas |
| Warm porcelain | `#F5F4F0` | Alternate editorial section |
| Pure white | `#FFFFFF` | Cards, popovers, raised surfaces |
| Deep navy | `#0F172A` | Primary headings and high-emphasis text |
| Slate | `#1E293B` | Secondary headings and prominent labels |
| Muted slate | `#475569` | Body copy and metadata |
| Cobalt | `#2563EB` | Primary interactive colour and accent |
| Deep cobalt | `#1D4ED8` | Interactive hover/active state |
| Arctic blue | `#60A5FA` | Supporting decoration, badges, soft gradients—**not** small text on white |
| Mist blue | `#DBEAFE` | Highlight/pill/soft hover surfaces |
| Neutral border | `#E2E8F0` | Dividers, form and card borders |
| Subtle foreground | `#64748B` | Secondary labels, only where contrast is adequate |
| Success | `#15803D` | Positive status |
| Warning | `#92400E` | Caution status |
| Danger | `#B91C1C` | Error status |

**Required distinction:** Cobalt is the primary action colour; Arctic blue is a supporting visual colour. Avoid low-contrast light-blue body text or white text on Arctic blue without verifying WCAG contrast. Use strong semantic text colour for all small labels.

### 1.2 Suggested gradients (use sparingly)

- Hero ambient wash: `linear-gradient(135deg, #F8FAFC 0%, #DBEAFE 100%)`
- Accent treatment: `linear-gradient(135deg, #2563EB 0%, #60A5FA 100%)`
- Raised section wash: `linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)`

Gradients should remain background/decoration, not impede reading or become the default for every card.

---

## 2. Technical implementation

### 2.1 Audit before editing

Determine:
- Whether the project is still vanilla HTML/CSS/JS or has already migrated.
- Which stylesheets are loaded and their cascade order.
- Existing global selectors, inline CSS and hardcoded palette values.
- Which sections or Three.js canvas depend on specific legacy CSS selectors.
- Existing responsive breakpoints, root font sizes, spacing conventions, and focus styles.

Provide a short audit summary in the completion report. Avoid wholesale replacement of `style.css` unless the repository architecture requires it and behaviour can be preserved.

### 2.2 Create a single source of truth for visual tokens

If vanilla CSS, prefer a dedicated, correctly ordered stylesheet such as `css/tokens.css`, imported/linked before component or existing styles. If Task 01 established another styling architecture, implement the equivalent in that architecture. If Tailwind is already installed, map the same values into Tailwind theme tokens; **do not install Tailwind solely for this task**.

Define two layers:
1. Primitive palette and scales (actual colour, size, shadow values).
2. Semantic tokens (e.g. `--color-bg-page`, `--color-text-primary`, `--color-action-primary`) that component styles consume.

At minimum support semantic variables for:
- canvas, alternate canvas, surface, elevated surface;
- primary/secondary/muted text;
- primary/hover/pressed action, action foreground;
- border, strong border, focus ring;
- soft accent/highlight;
- success/warning/error states;
- spacing scale, radii, shadows, typography, layout widths, transitions and layering.

A suggested CSS naming convention follows. You may adjust names consistently for the actual project:

```css
:root {
  /* Primitives */
  --porcelain-50: #F8FAFC;
  --porcelain-warm: #F5F4F0;
  --white: #FFFFFF;
  --navy-950: #0F172A;
  --slate-800: #1E293B;
  --slate-600: #475569;
  --slate-500: #64748B;
  --cobalt-600: #2563EB;
  --cobalt-700: #1D4ED8;
  --arctic-400: #60A5FA;
  --arctic-100: #DBEAFE;
  --slate-200: #E2E8F0;

  /* Semantic tokens */
  --color-bg-page: var(--porcelain-50);
  --color-bg-alt: var(--porcelain-warm);
  --color-surface: var(--white);
  --color-text-primary: var(--navy-950);
  --color-text-secondary: var(--slate-800);
  --color-text-body: var(--slate-600);
  --color-action-primary: var(--cobalt-600);
  --color-action-hover: var(--cobalt-700);
  --color-action-text: var(--white);
  --color-accent-soft: var(--arctic-100);
  --color-border: var(--slate-200);
  --color-focus-ring: var(--cobalt-600);
}
```

Do not leave raw hex values scattered across newly introduced styles. Replace legacy hardcoded values cautiously, selector by selector, avoiding disruption of the existing Three.js/canvas layers.

### 2.3 Typography

- Headings: **Manrope** (fallback: `Inter, Arial, sans-serif`).
- Body/UI: **Inter** (fallback: `Aptos, Arial, sans-serif`).
- Technical labels/code: **JetBrains Mono** (fallback: system monospace).
- Use a loading strategy appropriate to the repository. If loading web fonts remotely, use proper preconnect and `font-display: swap`; provide readable system fallbacks. Do not include proprietary or unlicensed local font binaries.
- Body default should be approximately `16px`, line-height around `1.55–1.7`.
- Heading hierarchy: visually distinct h1–h6 with responsive `clamp()` scales and no arbitrary giant text on narrow screens.
- Preserve semantic heading order in HTML; don't use heading tags purely for styling.
- Define a readable measure for text (`65–75ch` for long paragraphs where appropriate).
- Use consistent typography tokens for overline/eyebrow, display, headings, body, small labels, metadata and monospace tags.

### 2.4 Spacing and geometry

Implement a consistent 4px-based spacing scale, for example `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96px` or equivalent `rem` values.

Establish:
- Centralised content max-width around `1200px` (adapt if the actual design needs a slightly different value).
- Fluid horizontal page gutters, with generous desktop whitespace but no cramped mobile sections.
- Responsive section vertical padding.
- Radius scale (small, medium, large, pill).
- Subtle multi-layer shadows; avoid heavy default drop shadows.
- Clear but restrained dividers and surface layering.
- A documented z-index scale so sticky nav, overlays and Three.js/canvas do not overlap unpredictably.

### 2.5 Reusable foundations (not the future sections)

Add/refine common classes or primitives **only as compatible with the current architecture**:
- page container;
- section shell and section heading utility;
- card surface;
- primary/secondary button styles;
- eyebrow/eyeline and pill/tag;
- focus-visible style;
- visually-hidden accessibility utility;
- responsive text/spacing utilities if actually needed.

Ensure buttons, anchors, cards and links have coherent default/hover/focus/disabled states; do not redesign or rebuild entire navbar, hero, projects, achievements or contact forms in this task.

### 2.6 Interactive and accessibility rules

- Visible keyboard focus using `:focus-visible`; don't remove outlines without an equivalent.
- Target at least WCAG AA contrast for text (normally 4.5:1; 3:1 for sufficiently large text), and 3:1 for key UI boundaries or icons where applicable.
- Minimum 44×44px target for primary touch controls where practical.
- Support `prefers-reduced-motion: reduce`; avoid forcing smooth scrolling or large continuous transitions.
- Transitions should be modest, mainly opacity/transform/colour, and should not harm performance.
- No horizontal scrolling at small viewport widths due to typography, containers or decorative effects.
- Keep Three.js decorative content behind the content and not intercepting pointer/keyboard input if currently intended as decoration.

---

## 3. Scope: what to change and what NOT to change

**In scope**
- Design tokens and global base styles.
- Shared typography, spacing, borders, shadows, responsive defaults.
- A handful of compatible shared component primitives.
- Carefully applying the foundation to representative legacy elements, only enough to verify the palette and token wiring.
- A concise `docs/DESIGN_SYSTEM.md` explaining tokens, usage rules, examples and extension guidance.

**Out of scope**
- Rebuilding navbar or hero (Tasks 03–04).
- Rewriting professional bio, skill lists or project content.
- Reordering project cards or building project case-study pages.
- Introducing a CMS, backend, authentication or contact integrations.
- Framework migration or unrelated dependency updates.
- New image generation, large-scale animations, new 3D scenes, dark-mode feature.
- Changing live deployment settings or domain.

If current markup prevents a necessary design-token integration, perform the smallest safe edit and explain why.

---

## 4. Suggested execution sequence

1. Confirm the working branch and inspect Task 01 outputs and current Git status.
2. Pull the latest integration branch, create `task/02-porcelain-arctic-design-system`.
3. Record any pre-existing warnings, broken assets or layout problems before editing.
4. Create/design the token layer and typography setup.
5. Add base reset only where safe; preserve canvas, custom animations and existing JS selectors.
6. Introduce container, section, card, button and label primitives.
7. Integrate tokens into selected existing styles and remove duplicated values where safe.
8. Add keyboard focus, reduced-motion and responsive foundation.
9. Write `docs/DESIGN_SYSTEM.md` with palette table, typography, spacing, primitives and dos/don'ts.
10. Validate visually and technically; review diff; commit. Do not auto-merge.

### Branch and Git commands (adapt if the repository uses an integration branch)

```bash
git status
git switch main
git pull origin main
git switch -c task/02-porcelain-arctic-design-system

# After implementing and verifying Task 02:
git status
git diff --check
git add .
git commit -m "style: establish Porcelain Arctic design system"
git push -u origin task/02-porcelain-arctic-design-system
```

**Do not use** `git reset --hard`, `git push --force`, or destructive cleanup. If the working tree contains unrelated edits, preserve them and report them instead of overwriting them. Recommend a pull request to `main` and wait for review/approval before merging.

---

## 5. Verification and acceptance criteria

### Functional checks
- Site loads without new JavaScript errors.
- Existing navigation, internal anchors, downloadable CV, links, interactive elements and Three.js effects still function as before.
- No missing font or asset requests caused by Task 02.
- Existing layouts are not broken by global CSS or reset changes.
- No unnecessary new framework or runtime dependencies were introduced.

### Visual checks
Test at minimum at widths **320, 375, 768, 1024 and 1440px**:
- Porcelain page and white cards are visually distinct.
- Cobalt action hierarchy is consistent; Arctic blue remains secondary.
- Headings and body copy have clear hierarchy and readable line heights.
- Cards, links and buttons have consistent states.
- Text and controls don't overflow their containers.
- No accidental horizontal page scroll or clipping.
- Focus styles are visible and not obscured.

### Accessibility/performance checks
- Check contrast of representative body text, primary buttons, links, metadata, and focus rings; adjust if any fail.
- Keyboard Tab navigation is usable on representative page controls.
- Reduced-motion preference suppresses nonessential movement.
- Font loading is resilient: readable fallbacks before remote fonts arrive.
- Avoid significant layout shifts and costly transitions.

### Code quality checks
- Run actual build/lint/test scripts **if present**; do not invent commands for scripts not in the repository.
- `git diff --check` succeeds.
- No debug files, credentials, build outputs or unrelated edits included.
- New styling uses documented semantic tokens, avoiding unnecessary `!important` and selector specificity escalation.

**Definition of done:** The portfolio has a reusable, documented Porcelain Arctic design foundation that later tasks can consume while all existing important behaviours still work.

---

## 6. Required deliverables

1. Actual source changes implementing the theme foundation (paths chosen based on the audited repo).
2. `docs/DESIGN_SYSTEM.md` containing the definitive palette, token naming and examples, typography, spacing, UI-state/accessibility guidance and future-section usage instructions.
3. Updated font-loading references if necessary.
4. Verification report and successful Git commit on the Task 02 branch.
5. Clear mention of any conflicts with legacy styling, limitations or follow-up items for future tasks.

### Completion response format

Respond with:

- **Task:** 02 — Porcelain Arctic Design System
- **Branch / commit SHA:** exact values, or explain if push/commit did not occur.
- **Files added/changed:** paths and one-line purpose each.
- **Implementation summary:** tokens, fonts, primitives, responsive/accessibility support.
- **Verification results:** list only checks actually run and outcomes, plus unrun checks.
- **Preserved functionality:** specific items checked.
- **Outstanding issues:** specific and actionable.
- **Next step:** Task 03 — Navbar and responsive navigation; **do not execute it**.

---

## 7. Final instruction to Codex

**Implement and verify Task 02 only. Establish the Porcelain Arctic design system as a maintainable foundation, not as a rushed full portfolio redesign. Preserve the original content and working functionality, commit on the dedicated branch, and stop after reporting results.**
