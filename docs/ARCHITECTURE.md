# Portfolio V2 Architecture Audit

## Scope and baseline

This audit covers the repository as found for Task 01. The site is a single-page static portfolio. It uses native HTML, CSS, and browser ES modules; there is no package manifest, build system, test runner, or framework. The audit does not redesign the working site or change its runtime code.

## Current repository

```text
Portfolio_V2/
├── index.html                 # Entire page, content, import map, and inline typewriter code
├── css/
│   └── style.css              # Global theme, components, effects, and responsive rules
├── js/
│   ├── main.js                # Startup and mobile navigation toggle
│   ├── animations.js          # Custom pointer and IntersectionObserver reveals
│   ├── skills.js              # Skill category filtering
│   └── three-scene.js         # Three.js particle field and resize/mouse interaction
├── images/
│   ├── My_CV.pdf              # Downloadable CV
│   ├── profile_new.jpeg       # Hero portrait
│   └── [9 project images]     # Project card thumbnails
└── docs/                      # Audit and migration documents (added in this task)
```

No other application pages were found. `index.html` contains eight top-level sections: Hero, About, Skills, Projects, Experience, Education, Certifications, and Contact. The Projects section has nine cards. Skills, experience, education, certifications, navigation, contact links, and footer are all authored directly in HTML.

## Existing behavior and dependencies

- Hero: animated role/typewriter text, portrait, in-page contact link, and a download link to `images/My_CV.pdf`.
- Navigation: anchor links and a CSS-driven mobile menu toggled by `main.js`.
- About: biography and four profile/interest badges.
- Skills: manually authored skill cards and category filters driven by `skills.js`.
- Projects: nine manually authored project cards with local thumbnails and GitHub, demo, or Figma links.
- Experience and Education: manually authored timeline entries.
- Certifications: five cards with verification links.
- Contact: email, LinkedIn, and GitHub links plus a form with required fields.
- Visual behavior: CSS reveal effects, custom pointer, hero image effects, and a canvas-backed Three.js particle network.
- JavaScript dependencies: Three.js 0.160.0 is loaded as an ES module from `unpkg.com` through an inline import map. The page also requests Google Fonts remotely. There are no installed project dependencies.

## Findings

### Content, styles, and maintainability

- `index.html` is about 1,010 lines and combines content, presentation, and behavior. Typewriter logic and CSS are embedded in the document; project and certification styles are embedded in their sections.
- There are 64 inline `style` attributes in addition to the two inline style blocks. Project card actions repeat the same inline spacing and font settings. Extract these to named component classes during redesign.
- `style.css` contains global tokens, general components, legacy-looking unused styles, multiple generations of section styling, and responsive rules in one file. `.skill-icon` is declared twice, and mobile breakpoints are split across 992, 900, 768, and 480 pixels (plus a certification-specific 600-pixel rule).
- Several selectors appear to be leftovers or overlap current structures, including `.skill-card`, `.skill-list`, `.services-grid`, `.project-image`, and `.project-overlay`; verify actual usage before removal.
- Content is hardcoded in markup. This is acceptable for the current static scale, but makes repeated project, skill, and certification entries harder to maintain consistently.
- Some markup is inconsistently indented or compressed into single lines, especially project cards.
- Design tokens currently describe a dark navy/cyan/violet theme. The requested Porcelain Arctic tokens should be introduced centrally rather than applied as scattered color overrides. The design direction specifies Manrope, Inter, and JetBrains Mono; currently the site loads Inter and JetBrains Mono as well as Montserrat and Poppins.

### Functionality and reference checks

- The CV target exists in the repository and its anchor uses the `download` attribute. This static audit did not open the PDF in a browser.
- The image sources in the page correspond to local files in `images/`. Each image has a remote `via.placeholder.com` inline fallback; this introduces an external dependency when an image fails and embeds fallback behavior in content markup.
- There is a leading space in the ReNova Figma `href`, and the portfolio project points to the literal `YOUR_GITHUB_LINK` placeholder.
- All five certification “Verify” links use `href="#"`, so they do not identify verification destinations.
- The project links are hardcoded external GitHub/Figma/demo URLs. Their live availability and ownership were not verified over the network.
- The contact form has no `action`, `method`, `name` attributes, or JavaScript submit listener in this repository. Required fields provide browser validation, but no message delivery behavior is implemented here; the Send Message control must not be represented as a working submission flow until a destination is provided.
- External profile links use `target="_blank"` without an explicit `rel="noopener noreferrer"`.
- The import map pins Three.js to version 0.160.0, but depends on CDN availability and network access. `three-scene.js` creates a WebGL renderer without handling unsupported WebGL or reduced-motion settings. `targetX`, `targetY`, and a `THREE.Clock` are unused. A dense all-pairs particle distance check runs every animation frame.
- The mobile navigation is implemented with a `div`, without button semantics, accessible name, expanded state, or keyboard behavior. It does not manage focus or Escape dismissal.
- The custom cursor is always present in markup and has no touch-device or reduced-motion adaptation. The reveal observer has no fallback if `IntersectionObserver` is unavailable and leaves elements hidden unless the observer runs.

### Responsiveness and accessibility risks

- Existing media queries cover tablet and narrow viewports, but no browser/device layout audit was run. The hero, project grid, contact columns, and mobile navigation need visual checks at narrow and wide widths during redesign.
- No skip link or explicit main navigation landmark label is present. The canvas is not marked decorative for assistive technology.
- The skills filters are buttons but do not expose selected state (such as `aria-pressed`), and filtering updates inline styles without announcing result changes.
- Inline SVG icons and emoji are used; their accessible names/decorative status should be reviewed. Image alternative text is present, though some descriptions are generic (e.g. “StockFlow”, “Data Analysis”).
- The contact fields have associated visible labels and `required`, which is a useful base, but no `name` fields or form destination exist. Keyboard focus styles, contrast, zoom, and screen-reader behavior were not measured.
- Animations and smooth scrolling do not honor `prefers-reduced-motion`; the cursor and Three.js scene also add motion and processing cost.
- CSS references `var(--text-secondary)` in the education and certification markup, but this custom property is not defined in the current stylesheet.

## Reuse inventory

- Preserve the content and intent of all eight sections, all nine project entries, timeline records, credentials, contact destinations, and downloadable CV.
- Reuse the existing portrait, project images, CV, project copy, and existing URLs after validating and correcting incomplete destinations with the owner.
- Reuse the skills filter interaction, mobile navigation intent, scroll reveal, and optional Three.js particle visual as enhancements with accessible and non-WebGL fallbacks.
- Keep the static, no-build approach unless the redesign demonstrates a concrete need for a bundler or framework. No additional dependency is required for the proposed information architecture.

## Proposed maintainable structure

For the first redesign iteration, retain a static site and native modules. Make content and page responsibilities easier to find without changing the deployment model:

```text
Portfolio_V2/
├── index.html                 # Semantic landmarks and section mount/content structure
├── css/
│   ├── style.css              # Entry stylesheet with ordered imports (or consolidated file)
│   ├── tokens.css             # Porcelain Arctic color, type, spacing, and motion tokens
│   ├── base.css               # Reset, typography, focus, and accessibility defaults
│   ├── layout.css             # Containers, grids, section spacing, breakpoints
│   └── components.css         # Navigation, buttons, cards, timeline, forms, effects
├── js/
│   ├── main.js                # Small initialization boundary and shared behaviors
│   ├── navigation.js          # Accessible menu behavior
│   ├── skills.js              # Filter behavior and state announcements
│   ├── animations.js          # Progressive reveal and reduced-motion handling
│   └── three-scene.js         # Optional, isolated decorative enhancement
├── images/                    # Existing optimized/reviewed image assets and CV
└── docs/
    ├── ARCHITECTURE.md
    └── IMPLEMENTATION_PLAN.md
```

Keep the existing HTML-authored content as the source of truth initially. If repeated data needs separation after the visual hierarchy settles, move only repeatable collections (projects, skills, credentials) into small local ES modules and render semantic markup. Avoid adopting a component framework, router, CMS, or package dependency without a specific requirement. Keep the Three.js import optional and isolated so the core page remains useful if the CDN or WebGL is unavailable.

## Porcelain Arctic token direction

Planning-only token proposal for a later task (no token/theme/font changes were made in Task 01):

| Token | Proposed value | Intended use |
|---|---|---|
| Main background | `#F8FAFC` | Main canvas |
| Porcelain surface | `#F5F4F0` | Alternating sections |
| Card | `#FFFFFF` | Elevated content surfaces |
| Heading | `#0F172A` | Headlines/emphasis |
| Body | `#475569` | Supporting prose |
| Primary cobalt | `#2563EB` | Main CTA, links, selection |
| Arctic blue | `#60A5FA` | Secondary accents |
| Light highlight | `#DBEAFE` | Chips/hover backgrounds |
| Border | `#E2E8F0` | Dividers/outlines |
| Primary hover | `#1D4ED8` | CTA hover |

Typography proposal: Manrope headings, Inter body, JetBrains Mono technical labels, each with sensible system fallback. Do not add or replace font dependencies in Task 01. Future design principles: editorial hierarchy and readable content widths; distinctive engineering/founder character; restrained, purposeful motion; evidence-led project storytelling; avoid generic dashboard styling, excessive cards, unbounded 3D, and neon effects. Recheck contrast for text, controls, focus indicators, and muted text against actual surfaces when implementing.

## Audit limits

The audit was based on repository files and local static inspection. It did not verify external URLs, open the site in a browser, validate behavior on real devices, inspect PDF content, or run assistive-technology checks. Those checks belong in implementation and release review after the redesign is built.

## Current dependency and loading map (observed)

```mermaid
flowchart TD
  HTML[index.html] --> CSS[css/style.css]
  HTML --> IMPORT[Inline import map: three → unpkg Three.js 0.160.0]
  HTML --> MAIN[js/main.js as type=module]
  HTML --> FONTS[Google Fonts request]
  MAIN --> SCENE[js/three-scene.js]
  MAIN --> ANIM[js/animations.js]
  MAIN --> SKILLS[js/skills.js]
  SCENE --> THREE[three module from unpkg]
  HTML --> ASSETS[images/* portrait, project art, CV]
```

`three/addons/` is also mapped by the import map but no addon import was observed. No npm-managed package dependency exists in the working tree. The small ES modules are loaded natively by a browser, so the source should be served over HTTP(S); the local Python server smoke check confirmed static requests but was not a browser runtime execution.

## Hosting and deployment assumptions

- **Observed:** there is no Vercel configuration, build script, workflow, or deployment file in the working tree. The site is plain static files and relative local asset paths.
- **Compatible in principle:** any static host that serves `index.html`, CSS, JS, and `images/` at their relative paths should serve the current page. Module MIME types and remote access to unpkg/Google Fonts must be available.
- **Unverified:** whether Vercel is actually used, whether a build/output directory is configured remotely, and whether production security headers/CSP exist outside this repository. No live deployment was inspected or changed.

## Separation-of-concerns assessment

The code has a reasonable small-module starting point: `main.js` coordinates startup; skills, animations, and Three.js each have separate module files. However, the page content, typewriter state/logic, import map, and section-specific CSS are coupled in `index.html`; `style.css` owns all global and section styles; HTML embeds substantial presentation as inline style attributes. Repeated entries are duplicated markup rather than shared component/data patterns. This remains manageable at current size but makes large cross-page change risky. The contact feature is only a form shell, not an integrated service.

## V2 architecture options (proposal pending owner approval)

| Option | Advantages | Costs/risks | Migration effort |
|---|---|---|---|
| **A. Improved vanilla HTML/CSS/JS** | No framework/toolchain; preserves static hosting and native modules; minimal deployment change; semantic HTML and progressive enhancement can serve all current sections | Repeated content still authored manually unless small data modules are added; route-based case studies require hand-authored pages or a small static generation approach | **Low–moderate**: organize existing page, move CSS/behavior, preserve all content and module URLs |
| **B. React + TypeScript + Vite** | Reusable typed components; data-driven project cards/case studies; mature local dev/build pipeline; easier UI/state growth if multiple routes or collaborators arise | Adds dependencies, build output/configuration, package/lockfile maintenance, migration risk and possible hosting changes; risks a wholesale rewrite if done too early | **Moderate–high**: establish build pipeline, convert semantic content and interactions incrementally, verify static hosting and preserve routes/assets |

**Recommendation:** Start with Option A. The current page is static, single-page, and has no demonstrated need for a framework; the existing project already uses native ES modules. Extract only repeated collections into local modules if that provides measurable authoring consistency. Revisit Option B at an explicit migration decision gate if owner-confirmed case-study routing, content scale, or team workflow makes framework overhead worthwhile. This is a proposal only; no framework choice has been approved or implemented.

## Proposed V2 data/content model and component boundaries

Keep semantic content visible and accessible. If repeating entries are moved to data modules, use local plain objects with owner-confirmed fields rather than adding a CMS:

```text
siteProfile: name, headline, summary, portrait, cvPath, contactLinks
projects[]: id, title, status, role, summary, contributions[], stack[], image, repositoryUrl?, demoUrl?, designUrl?
experience[]: id, role, organization, startDate, endDate?, summary, evidence/source
education[]: id, qualification, institution, startDate, endDate?, details[]
certifications[]: id, title, issuer, date?, verificationUrl?, status
skills[]: name, group, evidence/context (avoid unsupported numeric ratings)
```

Candidate boundaries after content approval: `SiteHeader/Navigation`, `Hero`, `SectionHeading`, `ProjectCard` and optional `ProjectCaseStudy`, `SkillGroup/SkillFilter`, `TimelineEntry`, `CredentialCard`, `ContactLinks/ContactForm`, `SiteFooter`, and optional `BackgroundCanvas`. In vanilla, these are CSS/markup conventions and focused modules rather than framework components. Build content fields only from supplied evidence; unknown values remain `Needs owner confirmation`.

## Proposed V2 information order (planning only)

1. Hero — owner-confirmed Software Engineer (AI/ML) and founder positioning.
2. About — concise bio and current technical focus.
3. Featured projects — evidence-rich role-specific case studies.
4. Experience & ventures — possible Zatroz and Softora roles plus verified prior work.
5. Technical expertise — grouped, supportable technologies.
6. Achievements — documented awards/competition milestones.
7. Leadership & community — verified university/community roles.
8. Education & certifications.
9. Contact and confirmed professional links.

This order and all proposed ventures, achievements, roles, and projects are planning inputs, not verified content. See the owner-confirmation section in `CONTENT_ASSET_INVENTORY.md`.
