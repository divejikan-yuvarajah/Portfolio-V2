# Portfolio V2 Architecture Audit

## Scope and baseline

This audit covers the repository as found for Task 01. The site is a single-page static portfolio. It uses native HTML, CSS, and browser ES modules; there is no package manifest, build system, test runner, or framework. The audit does not redesign the working site or change its runtime code.

## Current repository

```text
Portfolio_V2/
├── index.html                 # Entire page, content, import map, and inline typewriter code
├── css/
│   ├── tokens.css              # Porcelain Arctic primitives, semantic tokens, base and a11y defaults
│   └── style.css               # Legacy section styling, token-based primitives, effects and breakpoints
├── js/
│   ├── main.js                # Startup boundary for current modules
│   ├── navigation.js          # Accessible menu behavior and active section state (Task 03)
│   ├── animations.js          # Custom pointer and IntersectionObserver reveals
│   ├── projects.js            # Progressive category filtering for HTML project cards (Task 07)
│   ├── case-study.js          # Reuses shared navigation on standalone project pages (Task 08)
│   └── three-scene.js         # Three.js particle field and resize/mouse interaction
├── data/
│   └── case-studies.json      # Unique long-form case-study details and evidence notes
├── scripts/
│   └── generate_case_studies.py # Static page generator; gallery remains shared-content source
├── projects/                  # Four directly loadable static case-study routes
│   ├── flowpilot-ai/index.html
│   ├── cortex/index.html
│   ├── mediguardian-ai/index.html
│   └── infraos/index.html
├── 404.html                   # Static fallback for unknown paths
├── images/
│   ├── My_CV.pdf              # Downloadable CV
│   ├── profile_new.jpeg       # Hero portrait
│   └── [9 project images]     # Project card thumbnails
└── docs/                      # Audit and migration documents (added in this task)
```

No other application pages were found. `index.html` contains ten top-level sections: Hero, About, Skills, Projects, Achievements, Experience, Leadership & Community, Education, Certifications, and Contact. The Projects section now has a four-card featured collection, four recent compact cards, and nine retained archive cards. Project copy, links, categories, status, and order are authored once in HTML; the small `projects.js` module adds category filtering without rendering duplicate data. Skills, achievements, experience, leadership and community, education, certifications, navigation, contact links, and footer are also authored directly in HTML.

## Existing behavior and dependencies

- Hero: stable role copy, local portrait, project/contact links, and a tertiary download link to `images/My_CV.pdf` (Hero details in [HERO.md](HERO.md)).
- Navigation: semantic anchor links and a responsive accessible mobile menu managed by `navigation.js`.
- About: biography and four profile/interest badges.
- Skills: six manually authored, always-visible technology groups in `index.html`; Task 06 removed the unsupported rating bars and the obsolete filter module.
- Projects: 17 manually authored cards in featured, recent, and archive groups, with category filters, four typographic illustrations, retained local archive previews, and selectively verified external destinations. The filtering enhancement is documented in [PROJECTS_GALLERY.md](PROJECTS_GALLERY.md).
- Experience & Ventures: manually authored Zatroz/Softora current-venture cards and AARNA/HNB previous-employment entries in `index.html`; the existing `#experience` link remains stable. Facts and verification boundaries are documented in [EXPERIENCE_AND_VENTURES.md](EXPERIENCE_AND_VENTURES.md). Education remains a manually authored timeline.
- Achievements: one featured Cursor Buildathon result and three compact competition results in static HTML, with scoped responsive styles and an evidence ledger in [ACHIEVEMENTS.md](ACHIEVEMENTS.md). The `#achievements` anchor is available without adding a potentially crowded main-navigation link.
- Leadership & Community: manually authored AWS Student Builder Group, TATD and TDUSA roles plus distinct membership and CV-listed volunteer affiliation groups in `index.html`; scoped styles use Porcelain Arctic tokens. The `#community` anchor is not added to the main navbar. Source and wording boundaries are recorded in [LEADERSHIP_AND_COMMUNITY.md](LEADERSHIP_AND_COMMUNITY.md).
- Certifications: five cards with verification links.
- Contact: email, LinkedIn, and GitHub links plus a form with required fields.
- Visual behavior: CSS reveal effects in the content sections, custom pointer, static Hero portrait treatment, and a canvas-backed Three.js particle network.
- JavaScript dependencies: Three.js 0.160.0 is loaded as an ES module from `unpkg.com` through an inline import map. The page also requests Google Fonts remotely. There are no installed project dependencies.

## Findings

### Content, styles, and maintainability

- At the Task 01 baseline, `index.html` was about 1,010 lines and combined content, presentation, and behavior; the Hero typewriter code and CSS were inline. Task 04 replaced that Hero behavior with static accessible copy and moved its presentation into shared styles. Project and certification styles remain embedded in their sections.
- The document still has many inline style attributes (Task 01 counted 64) and project card actions repeat spacing/font declarations. Continue extracting these only as their sections are implemented.
- Task 01 observed `style.css` owning theme values and shared/section rules. Task 02 introduced `tokens.css` as the palette/scale source of truth and left section styling in `style.css`; legacy names remain as compatibility aliases. `.skill-icon` is still declared twice, and breakpoints remain distributed across 992, 900, 768, 600, and 480 pixels.
- Several selectors appear to be leftovers or overlap current structures, including `.skill-card`, `.skill-list`, `.services-grid`, `.project-image`, and `.project-overlay`; verify actual usage before removal.
- Content is hardcoded in markup. This is acceptable for the current static scale, but makes repeated project, skill, and certification entries harder to maintain consistently.
- Some markup is inconsistently indented or compressed into single lines, especially project cards.
- At the Task 01 baseline, design variables described a dark navy/cyan/violet theme and Google Fonts requested Inter, JetBrains Mono, Montserrat and Poppins. Task 02 now centralizes Porcelain Arctic colors, type/spacing scales and semantic states in `css/tokens.css`; Google Fonts requests Manrope, Inter and JetBrains Mono with swap behavior and system fallbacks.

### Functionality and reference checks

- The CV target exists in the repository and its anchor uses the `download` attribute. This static audit did not open the PDF in a browser.
- Task 01 found that project image failures requested remote `via.placeholder.com` fallbacks. Task 07 removed those requests and retained the nine local gallery previews; new flagship projects use labelled typographic illustrations.
- Task 01 found a leading space in the ReNova Figma `href` and a `YOUR_GITHUB_LINK` placeholder. Task 07 omits unavailable ReNova destinations and replaces the portfolio placeholder with the current repository origin.
- All five certification “Verify” links use `href="#"`, so they do not identify verification destinations.
- The project links are hardcoded external GitHub/Figma/demo URLs. Their live availability and ownership were not verified over the network.
- The contact form has no `action`, `method`, `name` attributes, or JavaScript submit listener in this repository. Required fields provide browser validation, but no message delivery behavior is implemented here; the Send Message control must not be represented as a working submission flow until a destination is provided.
- External profile links use `target="_blank"` without an explicit `rel="noopener noreferrer"`.
- The import map pins Three.js to version 0.160.0 and depends on CDN availability/network access. Task 02 added a reduced-motion static-render path; unsupported WebGL is still not handled. `targetX`, `targetY`, and a `THREE.Clock` are unused. A dense all-pairs particle distance check runs every animation frame.
- Task 01 baseline finding (resolved in Task 03): the mobile toggle was a clickable `div` without button semantics or keyboard behavior. Current navigation details and verification limits are in [NAVIGATION.md](NAVIGATION.md).
- Task 02 added visible `:focus-visible` styles and CSS/Three.js reduced-motion behavior; no browser/assistive-technology run has confirmed the result. The reveal observer still has no fallback if `IntersectionObserver` is unavailable and can leave elements hidden unless the observer runs.

### Responsiveness and accessibility risks

- Task 01 baseline finding (resolved in Task 03): there was no skip link or explicit main navigation landmark label. The current skip link, responsive menu, section offsets, and unrun browser checks are documented in [NAVIGATION.md](NAVIGATION.md).
- No browser/device layout audit has yet confirmed the hero, project grid, contact columns, or the Task 03 mobile navigation at the target viewport widths. Task 02 marked the decorative canvas `aria-hidden` and retained pointer-event passthrough styling.
- Task 01 found that the legacy skills filters lacked selected-state semantics and hid entries with inline styles. Task 06 replaced them with static, semantic categories so all listed items are available without JavaScript.
- Inline SVG icons and emoji are used; their accessible names/decorative status should be reviewed. Image alternative text is present, though some descriptions are generic (e.g. “StockFlow”, “Data Analysis”).
- The contact fields have associated visible labels and `required`, which is a useful base, but no `name` fields or form destination exist. Keyboard focus styles, contrast, zoom, and screen-reader behavior were not measured.
- Task 02 honors `prefers-reduced-motion` in CSS and the Three.js initializer, and hides the custom cursor on coarse/touch pointers. The scene's normal-motion continuous loop and CPU/GPU cost remain; no performance profile was run.
- Task 01 found undefined `var(--text-secondary)` references. Task 02 now supplies this legacy compatibility alias through `tokens.css`.

## Reuse inventory

- Preserve the content and intent of all eight sections, the original nine archived project entries and their available local media, timeline records, credentials, contact destinations, and downloadable CV.
- Reuse the existing portrait, project images, CV, project copy, and existing URLs after validating and correcting incomplete destinations with the owner.
- Preserve the grouped skills content, mobile navigation, scroll reveal, and optional Three.js particle visual; the skills section uses no filter interaction.
- Keep the static, no-build approach unless the redesign demonstrates a concrete need for a bundler or framework. No additional dependency is required for the proposed information architecture.

## Proposed maintainable structure

For the first redesign iteration, retain a static site and native modules. Make content and page responsibilities easier to find without changing the deployment model:

```text
Portfolio_V2/
├── index.html                 # Semantic landmarks and section mount/content structure
├── css/
│   ├── tokens.css             # Porcelain Arctic token/base layer (implemented in Task 02)
│   ├── style.css              # Existing responsive sections and compatible shared primitives
│   ├── base.css               # Reset, typography, focus, and accessibility defaults
│   ├── layout.css             # Containers, grids, section spacing, breakpoints
│   └── components.css         # Navigation, buttons, cards, timeline, forms, effects
├── js/
│   ├── main.js                # Small initialization boundary and shared behaviors
│   ├── navigation.js          # Accessible menu behavior
│   ├── animations.js          # Progressive reveal and reduced-motion handling
│   └── three-scene.js         # Optional, isolated decorative enhancement
├── images/                    # Existing optimized/reviewed image assets and CV
└── docs/
    ├── ARCHITECTURE.md
    └── IMPLEMENTATION_PLAN.md
```

Keep the existing HTML-authored content as the source of truth initially. If repeated data needs separation after the visual hierarchy settles, move only repeatable collections (projects, skills, credentials) into small local ES modules and render semantic markup. Avoid adopting a component framework, router, CMS, or package dependency without a specific requirement. Keep the Three.js import optional and isolated so the core page remains useful if the CDN or WebGL is unavailable.

### Task 08 static detail pages

The repository now includes four static, refresh-safe case-study pages generated from the featured project articles in `index.html` plus the unique long-form content in `data/case-studies.json`. The generator is `scripts/generate_case_studies.py`; its `--check` mode verifies generated files are current without writing them. Each output is an ordinary `projects/<slug>/index.html` document with its own metadata and links back to the single-page portfolio. `css/case-studies.css` scopes the detail-page presentation, and `js/case-study.js` initializes the existing shared navigation module. `404.html` provides a static site fallback. There is no client-side router, framework, added runtime dependency, or change to the existing Three.js scene. See [PROJECT_CASE_STUDIES.md](PROJECT_CASE_STUDIES.md).

## Porcelain Arctic token direction

The Task 01 palette proposal is implemented as the foundation in Task 02. The current single source of truth, semantic tokens, typography, scales, component utilities, accessibility rules, examples, and contrast notes are documented in [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md). New styles should use semantic custom properties from `css/tokens.css`; old aliases remain temporarily for existing inline and legacy rules.

## Audit limits

The audit was based on repository files and local static inspection. It did not verify external URLs, open the site in a browser, validate behavior on real devices, inspect PDF content, or run assistive-technology checks. Those checks belong in implementation and release review after the redesign is built.
