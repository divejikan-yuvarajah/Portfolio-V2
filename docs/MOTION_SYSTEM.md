# Motion System — Task 14

## Runtime and dependency

The home page uses GSAP core **3.15.0** and its ScrollTrigger plugin at the same pinned version. `js/animations.js` is a small, failure-safe lazy entry that imports `js/motion.js`; the motion module loads the exact files sequentially from cdnjs:

- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js`
- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js`

Both scripts must load and expose their browser APIs before `gsap.registerPlugin(ScrollTrigger)` runs. Registration occurs once per page module. No package, build step, import-map alias or premium plugin is used. The GSAP repository identifies 3.15.0 as its current CDN version; cdnjs lists the same release under its Standard “No Charge” GreenSock License. The owner should review the [GSAP license](https://gsap.com/standard-license/) if project usage changes. If either asset fails or times out after eight seconds, the catch path stops setup; content and core modules stay usable.

## Inventory and property ownership

`js/motion.js` owns a small set of one-time entrances. ScrollTrigger starts below-fold groups near `top 85%`; movement is limited to `y` and opacity/visibility. Staggers are short and capped to small, named groups.

| Area | Targets | Motion |
|---|---|---|
| Hero | Eyebrow, title, role, summary, actions, CV link and visual wrapper | Brief 8px vertical settle only when assets load within 1.2 seconds of setup and the page remains at the top. The Hero never starts hidden. |
| About | Eyebrow, title, copy, project link and focus items | One section-triggered reveal group. |
| Technical Expertise | Header and six category cards | Short stagger. |
| Projects | Gallery heading, featured-grid container and recent-grid container | Three small one-shot groups. Cards keep their own filter/hidden state and never receive individual ScrollTriggers; the nine-card archive stays static. Filter changes dispatch `portfolio:projects-filtered`; the motion module coalesces a ScrollTrigger refresh to one animation frame. Filter state stays in `projects.js`. |
| Achievements | Intro, featured Cursor result and supporting result cards | One modest stagger; labels and results are never changed or counted. |
| Experience | Intro, group headings, venture cards and previous-employment items | One reading-order stagger. |
| Leadership & Community | Intro, featured role, role cards and involvement cards | One reading-order stagger. |
| Education and Credentials | Intro and cards | Short card groups. Dates and labels remain ordinary visible text. |
| Contact | Heading, contact details and initialized handoff form | Small one-shot reveal; form state and email handoff are not animated or modified. |
| Header, footer and case studies | None | Stay static to protect anchor offsets, mobile-menu state and direct case-study loading. |

Animations clear their temporary inline `opacity`, `visibility` and `transform` after completion, allowing existing CSS focus and hover treatments to own those states. Hover feedback stays in CSS. No GSAP animation writes navigation attributes, project filter state, form state, layout dimensions or Three.js canvas properties.

## Legacy motion and cursor

The former `IntersectionObserver` reveal watched `.fade-in`, but the current page had no `.fade-in` elements. Its CSS also hid targets only after adding a root class. Task 14 removes that observer and its hidden-state CSS rather than letting two systems control opacity/transform. Static markup is now the no-animation state.

The custom cursor was also removed. It started a new 500ms Web Animations API effect on every mousemove and duplicated the native pointer without adding useful information. The system cursor remains available on every pointer type; no pointer listener or GSAP mouse tween replaces it.

## Reduced motion, performance and lifecycle

- `prefers-reduced-motion` is checked before loading GSAP. A live preference change reverts the owned GSAP context, kills its ScrollTriggers, clears temporary styles and leaves affected content visible. Turning motion back on does not replay targets already prepared/revealed during that session.
- If `navigator.connection.saveData` is true, or a supported `hardwareConcurrency` reports two or fewer logical processors, motion setup is skipped. A supported connection change is observed.
- Initial content has no opacity/visibility hiding in CSS. JS disabled, a blocked module, missing ScrollTrigger, CDN errors/timeouts, and reduced motion all leave content readable. Core navigation, project filtering, contact handoff and the independent optional Three.js import continue initializing.
- The coordinator registers one `pagehide` teardown and handles BFCache `pageshow`. Its `gsap.context()` owns the local timelines/triggers; project-filter, font/load and preference listeners are removed when motion stops. Repeated `initMotion()` calls do not duplicate setup.
- ScrollTrigger refreshes after fonts/page load and once per animation frame after gallery filtering. ScrollTrigger handles resize refresh. No pins, scrub, scroll hijack, parallax, repeating timeline, extra `will-change`, counter or continuous GSAP loop is present.
- The case-study pages continue using only their existing CSS/navigation assets; the home page does not change the CV, contact disclosure, project content or direct links.

## Verification record

Automated checks run for Task 14:

- `node --check` on every `js/*.js` file — passed.
- `python scripts/generate_case_studies.py --check` — passed; generated case-study output is current.
- `git -c core.whitespace=cr-at-eol diff --check` — passed.
- `tinycss2` stylesheet parse of `css/style.css` and `css/tokens.css` — passed with no parse errors.
- HTMLParser audit of the home page and four project/404 routes — scanned five pages; no missing local link or script targets. Each page has one `<h1>`.
- Node runtime simulation — passed for successful pinned-asset loading, one-time plugin registration, coalesced project-filter refresh, reduced-motion context revert, and GSAP core load failure fallback.
- Static reference audit — no legacy `.fade-in`, custom-cursor or `motion-effects-enabled` references remain in HTML, CSS or JS.

The GSAP and ScrollTrigger 3.15.0 cdnjs URLs returned HTTP 200 during setup verification. This checks asset reachability only, not animation rendering. An interactive browser was unavailable, so viewport checks at 320/375/768/1024/1440px, short-height desktop, keyboard-only walkthrough, screen-reader review, live OS reduced-motion toggling, filtered-gallery visual review, contact handoff, and rendered Three.js comparison remain unrun. No Lighthouse or performance metric is claimed. Direct routes/local references and existing CV path were statically checked; interactive browser behavior still needs owner QA.
