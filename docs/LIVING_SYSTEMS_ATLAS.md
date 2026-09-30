# Living Systems Atlas — Task 16C

## Intent

Extend the Porcelain Arctic / Digital Atlas portfolio into a technical field guide, systems map and product lab. The visual language uses exact editorial alignment, twelve-column desktop composition, oversized Manrope headings, Inter reading copy, JetBrains Mono for indices, and original route diagrams. The existing pale porcelain and warm neutral surfaces, navy text and cobalt accents remain the palette. No framework, dependency, page router, custom cursor or scroll replacement was introduced.

## Source structure and section changes

| Chapter | Task 16C treatment | Content and interaction contract |
|---|---|---|
| Hero | Registration grid, portrait frame, route glyph and coordinate label; layered editorial scale | Existing identity, copy, links and CV action stay visible in HTML; desktop-only 1.2–1.8s choreography is progressive enhancement |
| About | Founder narrative connected to a four-node direction line | Existing biography and focus copy remain authoritative; no new claims |
| Technical Expertise | Numbered capability matrix and aligned skill tags | Existing skills preserved; rules may draw in as decoration |
| Projects | Project Observatory stage, index and four original project scenes aligned with four story rows | Order remains FlowPilot AI, CORTEX, MediGuardian AI, INFRAOS. Stories/actions/disclosures stay in normal flow. Scenes are labelled illustrative, never as screenshots. Existing archive and category filters remain unchanged. |
| Achievements | High-contrast Cursor result poster with route diagram | Only the already published, qualified result copy is retained |
| Experience | Founder and venture narratives with route transition to earlier experience | Existing Zatroz, Softora, Hatton National Bank and AARNA Eastern Lanka content is preserved |
| Leadership / Community | Role feature, affiliation list and shared route diagram | Existing verified roles and memberships retained; no dates or responsibilities invented |
| Education / Certifications | Ruled archive with numbered credentials and responsive learning list | Existing categories and entries remain distinct and unchanged |
| Contact / footer | Closing route, oversized invitation and aligned form/contact channels | `contact.js` still owns validation and the honest email-app handoff; social links and CV remain direct links |
| Four case studies | Shared editorial chapter line and diagram frame refinements | Four static direct routes, metadata, project facts, actions and related-project navigation remain intact |

### System rail

`index.html` contains a secondary chapter rail with links to existing section IDs. CSS only displays it at `min-width: 1440px`; it is otherwise absent from layout. `atlas-interactions.js` updates its `aria-current="location"` from an IntersectionObserver when supported. It does not replace the primary navigation or alter active navigation ownership. If IntersectionObserver is unavailable, all links remain usable and no chapter is falsely selected.

### Observatory

The Observatory is a descriptive `<figure aria-hidden="true">` because its scene is a redundant visual index; project story headings and links remain the accessible source. The static default is FlowPilot AI. Existing project filters continue to set card/group `hidden` and button `aria-pressed`. The Observatory module only updates `data-active-project`, active scene/index classes and decorative caption text, and it declines to select a filtered-out card. At desktop and tablet, GSAP creates one bounded ScrollTrigger for each featured story and swaps the visual as a story enters. The desktop visual stage is sticky CSS only; tablet removes stickiness, and phones stack the static stage before the stories. There is no pinning, translated deck or scroll interception.

## Original artwork and media

`images/living-systems-routes.svg` defines reusable Hero, About, result, venture, community and Contact route symbols. SVG is decorative (`aria-hidden` or `focusable="false"`) and uses current color. Existing `images/atlas-motifs.svg` project motifs are reused in the Observatory; the project records themselves are not converted to visual assets. Project media is explicitly described in copy as illustrative. No supplied project screenshots were available in this task.

## Responsive layout

| Viewport/input | Layout and behavior |
|---|---|
| >=1440px | Optional right-side chapter rail, twelve-column composition, sticky Observatory stage |
| 1024–1439px | Editorial grid and sticky Observatory stage; no fixed side rail |
| 701–1023px | Rebalanced grid, non-sticky side-by-side Observatory, no desktop-only pointer actions |
| <=700px | Single reading axis; static Observatory stage; two-column route nodes; education and contact reflow |
| <=380px | Tightened Hero type, labels and Observatory caption |
| reduced motion | GSAP media context is skipped/reverted; scene CSS transitions stop; all authored content stays available |
| no JavaScript / failed GSAP or ScrollTrigger | Authored HTML and default static scene remain. Filters are only revealed after their handlers attach; navigation/form retain their independent native modules. |
| forced colors | Decorative diagrams yield to system colors; active index uses system highlight; the active project remains identified by caption and story heading |

The source viewport matrix remains 320, 360, 375, 390, 414, 430, 600, 701, 768, 820, 912, 980, 1024, 1280, 1440 and 1920 CSS px, plus landscape and short-height cases. See the verification section for which viewport results were actually run during Task 16C.

## Ownership and maintenance

- `index.html` owns authored content, semantic labels, IDs, the static default and project story order.
- `css/living-systems-atlas.css` owns the Task 16C visual layer; `css/case-studies.css` owns shared case-study refinements.
- `js/atlas-interactions.js` owns scroll progress, decorative rail selection, pointer-light variables and Observatory display state.
- `js/projects.js` remains the sole owner of project visibility/filter state.
- `js/motion.js` remains the sole GSAP/ScrollTrigger loader/coordinator and owns scoped animation lifecycles.
- `js/navigation.js`, `js/contact.js`, and `js/three-scene.js` retain their original responsibilities.

Update this guide and [MOTION_SYSTEM.md](MOTION_SYSTEM.md) whenever changing the chapter/Observatory model. Keep project facts in the source records and case-study generator; don't use diagram labels to introduce claims that are absent from those records.

## Verification status

Actual Task 16C results: diff whitespace check PASS; syntax check PASS for all 10 JavaScript modules; generated case-study check PASS; static site audit PASS with zero errors and warnings. A local server returned HTTP 200, but browser rendering and interaction checks were **NOT RUN** because no CDP browser endpoint was available. This means the required desktop, tablet, mobile, landscape, reduced-motion, keyboard, mobile-nav, project-filter, direct-route/hash, Back/Forward, form handoff, no-JS, GSAP/ScrollTrigger failure, plugin failure and Three.js fallback checks have not been visually/runtime-verified for this task. Performance timing and Lighthouse were also not measured. Task 15 browser captures are inherited evidence only and do not establish Task 16C results.

The hero portrait referenced by the current local `index.html` is a 3712 × 3292 RGBA PNG measuring 14,115,325 bytes. It is owner-provided local work, not a Task 16C visual asset. The extra size is a known performance issue for release review; do not mistake the passing static-reference audit for an image-transfer/performance result.
