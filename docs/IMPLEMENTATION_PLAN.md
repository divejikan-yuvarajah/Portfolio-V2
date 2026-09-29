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

1. **Foundation completed in Task 02:** define semantic color, type, spacing, radius, elevation, and motion tokens in `css/tokens.css`; load before `style.css`; document usage in `docs/DESIGN_SYSTEM.md`. Section-level design implementation remains future work.
2. Establish a responsive page grid, readable text widths, consistent section spacing, and a clear type scale.
3. Improve semantic structure: skip link, labeled navigation, one page `h1`, logical heading order, section landmarks, and decorative canvas semantics.
4. Replace embedded and inline styles with named CSS classes. Remove old styles only after confirming their selectors are unused.
5. Retain all eight sections and project/certification records while reorganizing visual hierarchy and card layouts.

## Phase 3 — Progressive enhancement and accessibility

1. **Navigation foundation completed in Task 03:** convert the mobile menu toggle into a keyboard-operable button with an accessible name, `aria-expanded`, and `aria-controls`; support Escape, focus visibility, outside dismissal, breakpoint reset, and closing after navigation. See [NAVIGATION.md](NAVIGATION.md). Further assistive-technology/browser validation remains in Phase 5.
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
- Skills remain readable without JavaScript in grouped categories; any future filter controls must provide keyboard and screen-reader state. Mobile navigation remains interactive.
- Contact channels remain available; any form submission behavior has a confirmed destination and clear success/error feedback.
- The Porcelain Arctic palette and requested type families are applied through shared tokens.
- Layout adapts without horizontal overflow at narrow viewports, and primary actions remain usable with keyboard and touch.
- Motion respects reduced-motion preferences; Three.js failure does not prevent access to portfolio content.
- No placeholder links or unverified replacement content remain without an explicit owner decision.
- The final change set contains no unrequested framework or runtime dependency.

## Completed task decisions

### Task 06 — Technical Expertise

- The legacy filter bar and numeric proficiency displays were removed. Six semantic categories are visible by default, so the content remains available without JavaScript and needs no filter-state interaction.
- Technology labels are curated from the existing skill inventory, project metadata, and the portfolio's own Three.js/WebGL implementation. Unsupported ratings and unverified candidate technologies are omitted. See [TECHNICAL_EXPERTISE.md](TECHNICAL_EXPERTISE.md) for the evidence map and update guidance.

### Task 12 — Education & Credentials

- `#education` presents three CV-listed formal education entries in reverse chronology; the undergraduate degree is marked In progress. The school name follows the local CV spelling `T/T/Vipulanada College` pending confirmation of its preferred English spelling.
- `#certifications` remains the anchor, while the navigation label is now Credentials. It presents CV-listed completed courses and learning programmes, not an empty professional-certification panel.
- The former placeholder verification links, unverified credential IDs, Diploma duplicate, unsupported learning dates and the unverifiable Google Analytics certification claim were removed. No professional certification is published without an award record or a real verification URL.
- See [EDUCATION_AND_CREDENTIALS.md](EDUCATION_AND_CREDENTIALS.md) for source notes and maintenance rules.

### Task 13 — Contact & Social Integration

- The contact area now uses a collaboration-focused layout and the existing Porcelain Arctic tokens. Direct email, LinkedIn and GitHub links work without JavaScript; the optional form becomes visible only when its mailto handoff handler initializes.
- The form prepares an email for the visitor to review and send in their mail application. It does not deliver, store or track messages. A long encoded handoff is rejected with a direct-email fallback instead of silently truncating the message.
- The footer provides the portfolio identity and compact Home, Projects, Contact and Back to top anchors. Detailed behaviour and verification limits are in [CONTACT_AND_SOCIAL.md](CONTACT_AND_SOCIAL.md).

## Known decisions and blockers to resolve before relevant implementation

- Contact form delivery: no backend or form service is configured. The current form is an explicitly labelled email-app handoff, not site-mediated delivery.
- Portfolio repository link: one project has a literal `YOUR_GITHUB_LINK` placeholder.
- Credential verification: Task 12 removed the prior `href="#"` placeholders. No personal credential verification URLs were supplied; add only owner-approved real verification destinations.
- External destination validity: the Task 13 GitHub personal profile opened successfully and links to the current LinkedIn slug; automated retrieval of LinkedIn itself was blocked. Remaining project GitHub, Figma and demo destinations, and email delivery, have not been live-checked.
- Three.js loading strategy: the current import map uses a CDN. Keep the dependency optional or select a locally hosted strategy only if deployment constraints require it.
