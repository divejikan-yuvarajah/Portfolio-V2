# Portfolio V2 Migration and Redesign Plan

## Guiding constraints

- Preserve all existing portfolio content and user-facing capabilities unless an owner-reviewed correction is needed (especially the contact form, which currently has no delivery endpoint).
- Redesign the current static site in place as a staged migration. Avoid replacing it with a generic template.
- Use the Porcelain Arctic palette: `#F8FAFC`, `#F5F4F0`, `#0F172A`, `#2563EB`, `#60A5FA`, and `#E2E8F0`.
- Use Manrope, Inter, and JetBrains Mono with local system fallbacks. Do not add a framework or dependency without a demonstrated need.
- Keep Three.js an optional visual enhancement with a graceful fallback and a reduced-motion path.
- Treat project, contact, and certificate URLs as content requiring verification; do not silently invent destinations.

## Phase 0 — Baseline and inventory (completed in Task 01)

- Record the current structure, eight sections, nine project cards, current interactions, external dependencies, asset inventory, and known defects in `ARCHITECTURE.md`.
- Establish branch `task/01-repository-audit` and commit the audit documents.
- No application code or existing behavior was changed in this phase.

## Phase 1 — Content and behavior validation

1. Review the existing biography, skills, experience, education, certifications, and all nine projects with the portfolio owner.
2. Confirm each GitHub, demo, Figma, and certificate verification URL. Replace `YOUR_GITHUB_LINK` and `href="#"` only with confirmed destinations; fix the leading space in the ReNova URL.
3. Confirm whether contact should remain direct email/social links or submit through a named service/backend. Do not imply form delivery until an endpoint exists.
4. Confirm CV freshness and portrait/project image choices. Preserve the current PDF download path unless the CV is intentionally replaced.
5. Make a content checklist so no project or timeline item disappears during layout changes.

## Phase 2 — Design foundation and page structure

1. Define semantic color, type, spacing, radius, elevation, and motion tokens in CSS. Apply the Porcelain Arctic palette centrally.
2. Establish a responsive page grid, readable text widths, consistent section spacing, and a clear type scale.
3. Improve semantic structure: skip link, labeled navigation, one page `h1`, logical heading order, section landmarks, and decorative canvas semantics.
4. Replace embedded and inline styles with named CSS classes. Remove old styles only after confirming their selectors are unused.
5. Retain all eight sections and project/certification records while reorganizing visual hierarchy and card layouts.

## Phase 3 — Progressive enhancement and accessibility

1. Convert the mobile menu toggle into a keyboard-operable button with an accessible name, `aria-expanded`, and `aria-controls`; support Escape, focus visibility, and closing after navigation.
2. Keep the core content and navigation usable without JavaScript. Add safe behavior for reveal animations when `IntersectionObserver` is unavailable.
3. Add keyboard-visible focus states and honor `prefers-reduced-motion` for scrolling, transitions, typewriter animation, pointer effects, and Three.js.
4. Make skill filter state perceivable and announce filter results where appropriate.
5. Review image alt text, SVG accessibility, touch targets, contrast, text resizing, and keyboard navigation.
6. Isolate Three.js setup; avoid starting it when WebGL is unavailable or motion is reduced, and ensure resize behavior and resource cleanup are safe.

## Phase 4 — Content organization and asset performance

1. Keep content in HTML until page layout stabilizes. If authoring becomes repetitive, extract only repeated collections into a small local data module, preserving semantic rendered HTML and searchability.
2. Review image dimensions, formats, and file sizes. Create optimized derivatives only when their visual quality is acceptable; preserve source assets until review.
3. Add explicit image dimensions/aspect ratios and appropriate loading behavior to reduce layout shifts and offscreen work.
4. Remove remote placeholder fallbacks in favor of local visual fallbacks or clear image failure styling.
5. Reassess externally hosted fonts and Three.js: document their network behavior and keep useful font and page fallbacks.

## Phase 5 — Verification and release review

1. Run available static checks and inspect the page in current desktop and mobile browsers at representative widths.
2. Verify every internal anchor, local image reference, CV download, external link destination, and form behavior.
3. Review keyboard-only navigation, screen-reader landmarks/forms, reduced motion, zoom/reflow, focus visibility, and contrast.
4. Check the page with JavaScript disabled and with WebGL unavailable; core content and contact links should remain accessible.
5. Compare against the Phase 1 content checklist and confirm all prior working features remain represented.
6. Review changed files and commit each coherent implementation stage. Do not merge or publish without the required approval.

## Acceptance criteria

- All eight existing content areas and the nine project records are retained unless the owner explicitly approves a content change.
- The CV remains downloadable from a working local path.
- Skills filtering and mobile navigation remain functional and become keyboard/screen-reader accessible.
- Contact channels remain available; any form submission behavior has a confirmed destination and clear success/error feedback.
- The Porcelain Arctic palette and requested type families are applied through shared tokens.
- Layout adapts without horizontal overflow at narrow viewports, and primary actions remain usable with keyboard and touch.
- Motion respects reduced-motion preferences; Three.js failure does not prevent access to portfolio content.
- No placeholder links or unverified replacement content remain without an explicit owner decision.
- The final change set contains no unrequested framework or runtime dependency.

## Known decisions and blockers to resolve before relevant implementation

- Contact form delivery: no backend or form service is configured in the current repository.
- Portfolio repository link: one project has a literal `YOUR_GITHUB_LINK` placeholder.
- Certificate verification links: all five currently point to `#`.
- External destination validity: GitHub, Figma, demo, LinkedIn, and email destinations have not been live-checked.
- Three.js loading strategy: the current import map uses a CDN. Keep the dependency optional or select a locally hosted strategy only if deployment constraints require it.

## Future workstreams and gates (planning only; do not execute in Task 01)

Sequence dependencies intentionally: Task 01 evidence and owner inputs gate content claims; Task 02 establishes shared design primitives; section tasks then consume approved content and foundations. Tasks 14–17 should happen after core page structure exists. Accessibility and responsive review are cross-cutting and should also inform each earlier task, not wait until the end.

| Task | Inputs / dependencies | Key deliverables | Acceptance gate | Explicit non-goals |
|---|---|---|---|---|
| **01 — Repository audit and migration foundation** | Existing copied source; owner-confirmed working repository | Five audit docs, baseline, risks, migration proposal | Evidence-based docs; original files/assets untouched; checks recorded; commit on `task/01-repository-audit` | Redesign, framework migration, content changes |
| **02 — Porcelain Arctic design tokens and foundations** | Task 01 audit; approved type/color direction | Semantic tokens, base typography, reset/focus/motion foundations | Palette and fonts wired centrally; contrast reviewed; existing page still works | Rebuilding sections or changing content |
| **03 — Navbar and responsive navigation** | Task 02 tokens; confirmed section order | Accessible desktop/mobile nav and anchor behavior | Keyboard/Touch operation, expanded state, focus and Escape behavior work | Rewriting hero or adding routes |
| **04 — Premium hero** | Tasks 02–03; confirmed title, portrait, CV | Hero layout, primary CTA, optional restrained motion | Responsive, semantic, reduced-motion-safe hero; CV path verified | Inventing roles/claims; changing CV without approval |
| **05 — About section** | Task 02; approved bio | Concise biography and current focus | Owner-approved copy and readable responsive layout | Adding unverified achievements |
| **06 — Technical expertise** | Task 02; verified skill list | Skill groups and accessible filter or taxonomy | Names/categories verified; keyboard/screen-reader state works | Fabricated ratings or technologies |
| **07 — Featured project gallery** | Task 02; confirmed project content/assets/links | Featured cards and archive policy for older work | Every retained card has approved status, media, and real link labels/destinations | Deleting legacy work silently; inventing project metrics |
| **08 — Project detail/case-study pages** | Task 07; owner-approved contribution/evidence | Case study pages or equivalent detail views | Each case study has approved problem, role, process, result, media and navigation | Claims without owner-provided evidence; framework migration by default |
| **09 — Ventures and experience** | Task 01 confirmation list; verified CV/venture dates | Current venture and work timeline | Titles, dates, descriptions and active status confirmed | Asserting Zatroz/Softora scope or dates without confirmation |
| **10 — Achievements** | Documentary evidence and owner-approved wording | Awards, competition, milestone entries | Exact award/rank/result and evidence verified | Inflating outcomes or inventing metrics |
| **11 — Leadership/community** | Verified role and activity history | Leadership/community section | Organization, title, dates and description approved | Duplicating stale role claims as current |
| **12 — Education and certifications** | Verified institutions, dates, certificate names and URLs | Education/credential layout and working verification links | No placeholder `#`; all credential claims approved | Inventing credentials or publishing unconfirmed IDs |
| **13 — Contact/social integration** | Owner-selected links and form destination/privacy approach | Contact channels; optionally a tested submission integration | Each channel verified; form delivers to an approved endpoint with clear feedback or is omitted | Adding a backend/service without approval; claiming delivery before tests |
| **14 — Motion and GSAP interactions** | Completed sections; reduced-motion/accessibility requirements; dependency decision | Restrained transitions and optional enhanced motion | Reduced-motion path, fallback, CPU/GPU behavior checked; GSAP used only if justified/approved | Unbounded animation or adding GSAP solely for novelty |
| **15 — Responsive polish** | Core sections 03–13 implemented | Layout refinements at mobile/tablet/desktop widths | 375/768/1440 checks recorded; no unintended overflow; touch targets usable | New content or new component system |
| **16 — SEO, accessibility and performance** | Stable content, approved public domain and assets | Metadata, social preview, accessibility fixes, image/performance optimization | Keyboard/AT/contrast/reflow/metadata/local asset checks recorded; measured performance where tooling permits | Publishing unconfirmed public details or optimizing from estimates alone |
| **17 — End-to-end test, regression and deployment** | All feature tasks complete; deployment ownership/settings known | Regression record, release candidate, deployment review | Existing functionality/content verified; owner approves deployment; rollback path documented | Automatic merge, publish, or deployment without required approval |

## Migration decision gate before tools/framework changes

Before adding React, TypeScript, Vite, GSAP, a CMS, or another runtime/tool dependency, document the concrete requirement that existing static modules cannot satisfy, the hosting/deployment implications, dependency/security/maintenance costs, content migration plan, accessible fallback, and a reversible staged approach. Obtain owner approval before introducing the migration. Do not change the remote or live deployment as part of that decision.

## Branch, review, commit, and cleanup process for future tasks

For each future workstream, start from the approved current base and create a separate branch such as `task/02-design-foundations`, `task/03-responsive-navigation`, continuing with a task-specific slug. Confirm `git status`, branch, remote, and recent commit before switching; never discard unrelated work. Keep commits scoped and descriptive. Before commit, inspect `git diff --check`, status, stat, and full diff; run that task's available checks and document not-run checks honestly. Push only the feature branch when authorized/available, request review, and wait for approval before merge. After approved merge, update the local base with fast-forward only, delete local/remote feature branches only after confirming merge and preserving work, then begin the next task. Never force-push or deploy by default.

## Planned content order and confirmation reminder

Potential featured project sequence for later review: FlowPilot AI, CORTEX, MediGuardian AI, INFRAOS (mark in development only after confirmation), InvoiceX AI, JevFlow (verify status and URLs), Thinky, HireQueue, PowerGuard IoT (confirm academic project stage), followed by an archive for JARVEX, StockFlow, FocusFlow, and other retained older work. Do not add these project entries until screenshots, status, role, stack, repository/demo links, and accurate outcome language are confirmed by the owner. The plan also depends on updated CV, startup dates, current venture descriptions, competition result wording, verified links, and media supplied or approved by the owner.
