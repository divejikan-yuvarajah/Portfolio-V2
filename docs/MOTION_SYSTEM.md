# Motion System — Digital Atlas (Task 14B)

## Task 16B additive motion layer

`js/atlas-interactions.js` owns only decorative UI feedback: rAF-coalesced scroll progress, an `IntersectionObserver` highlight on the chapter's decorative number, and a fine-pointer light position on the hero/poster backgrounds. It changes no navigation ARIA, project filter state, contact state, focus order, or content visibility. It checks reduced motion live, removes observers/listeners on pagehide and restores them on pageshow.

`js/atlas-gsap-extensions.js` exports `buildAtlasPolishMotion(gsap, canEnter)`. `js/motion.js` calls it from its existing `gsap.matchMedia()` callback after the existing chapter and signal choreography. Its bounded one-shot transforms target only chapter index tiles, decorative project display lettering, and venture wordmarks. The existing chapter rules/titles, Hero line masks, poster SVG scrub, closing sequence, GSAP/ScrollTrigger loader, preference checks, BFCache teardown and refresh owner are unchanged. MatchMedia context reversion handles breakpoint and reduced-motion teardown; no second loader, registration, observer or persistent animation loop was added.

The progress indicator is CSS transformed by the interaction owner; it is not an additional ScrollTrigger. Pointer lights are CSS custom properties on decorative artwork only, and are detached for coarse pointers/reduced motion. The extension adds a bounded number of one-shot triggers only for targets allowed by `canEnter`; browser trigger-count and lifecycle measurements were NOT RUN in this environment.

## Runtime and dependencies

`js/animations.js` remains the failure-safe lazy entry to **one** coordinator, `js/motion.js`. The coordinator loads GSAP **3.15.0** and ScrollTrigger **3.15.0** sequentially from:

- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js`
- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/ScrollTrigger.min.js`

Each browser API must report the pinned version before setup. Each asset has an eight-second failure timeout. Plugins register once; asset promises are reused across preference changes and BFCache restoration. Core navigation, category filtering, contact and optional Three.js initialize independently. No framework, smoother, package installation or build step was added. The owner's untracked npm files are not used by the page.

SplitText and Flip were reviewed but are **not loaded**. The Hero has three authored semantic line wrappers, so responsive DOM splitting is unnecessary. The ordinary inline text remains a coherent heading for assistive technology. Category filters continue using instant native `hidden` states; Flip would add complexity without improving access. Original SVG path strokes use core GSAP, without DrawSVG or another plugin.

## Motion inventory

| Moment / trigger | Target and properties | Timing | Fallback | Owner |
| --- | --- | --- | --- | --- |
| First visit at page top, no hash, assets ready within 1.2s, spacious fine-pointer desktop | Hero line `yPercent`, portrait `clipPath`, frame labels and supporting copy `x`, modest supporting opacity; small navbar-inner `y` | One labelled timeline: identity / builder / invitation; ~1s total, power3.out | Phone, touch, short-height, late-loading and deep-link visits show the complete static cover from first paint | motion.js matchMedia context |
| Chapter rail enters at top 85% | Chapter rule `scaleX`, title inner span horizontal clip / 12px x | .7s; label index | Visible static heading/rule | motion.js media context |
| Expertise / previous employment row enters | Only its decorative line `scaleX` | .65s power2.out | Full rule; all text stays visible | motion.js media context |
| Short atlas signal enters | SVG strokeDashoffset and terminal point scale | 1s path, .25s terminal; label route | Complete static SVG path | motion.js media context |
| Featured project passes viewport, desktop >=1024px, height >=760px, fine pointer and hover | Decorative inner SVG yPercent -5 to 5 and number x 0 to 12 | scrub .45; label passage; no pin | Static art on touch/coarse pointer, short viewports, narrow layouts and reduced motion; ordinary vertical document flow | motion.js media context |
| Featured Cursor result enters at top 80% | Title clip and placement label 22px x | .75s; label result | Entire poster readable | motion.js media context |
| Contact heading enters at top 85% | Two semantic line wrappers yPercent | .75s, .09 stagger; label invitation | Static closing question | motion.js media context |
| Link hover / keyboard focus | Arrow translates 2px; borders/colors | Existing 150–220ms tokens | Focus ring and labels remain | CSS |
| Case studies / archive cards / contact inputs | No GSAP animation | None | Always static | Their existing modules |

All text targets clear temporary transform/clip/opacity after their one-time entrances. The new chapter, rule and poster system **replaces** Task 14's MOTION_GROUPS. It does not layer another observer over them. The custom cursor stays removed.

## Layout, filters and native navigation

Four alternating vertical featured panels retain FlowPilot AI → CORTEX → MediGuardian AI → INFRAOS. Only the decorative visual column may be CSS-sticky on tall desktop layouts. There is no horizontally translated link deck, pin spacer, wheel interception or artificial scroll distance. Mobile, short viewports and reduced motion use static visual columns. The project text/actions always stay in normal flow, including when contribution details expand.

`projects.js` alone sets card/group `hidden` and button state. Its existing `portfolio:projects-filtered` event disables hidden cards' decorative triggers, enables visible ones and queues one geometry refresh per animation frame. The motion module never writes display, `hidden`, tabindex or ARIA state. Fonts, image loads and contribution `toggle` events also request coalesced refresh. ScrollTrigger handles viewport resize.

`navigation.js` alone owns menu/active links; `contact.js` owns validation and the explicit email-app handoff; `three-scene.js` alone owns its optional particle rendering. GSAP has no continuous focal-area loop and does not manipulate the canvas. Existing section IDs, native anchors and direct case-study routes are retained.

## Responsive lifecycle and accessibility

- Check `prefers-reduced-motion`, save-data and supported <=2 logical-core hints before fetching assets.
- `gsap.matchMedia()` owns its scoped context for the intro, chapters and desktop effects; no nested contexts or deprecated ScrollTrigger.matchMedia. CSS sticky art and the GSAP scrub share the same min-width, min-height, fine-pointer, hover and reduced-motion gates.
- Live reduced-motion changes revert all locally owned contexts, restore prepared styles, remove active triggers and keep core interactions available. No global killAll operation is used.
- A WeakSet records prepared one-time entrances. A responsive rebuild or preference restoration leaves those elements static instead of replaying them. Desktop-only decorative scrub effects may be recreated, without duplication.
- Pagehide removes owned DOM refresh/preference listeners and reverts the responsive media Context, including the Hero intro. One GSAP media matcher is retained for the page instance; its two query listeners are allocated once, including across BFCache restores. `gsap.matchMediaRefresh()` reuses it on restoration or connection changes. This avoids the listener accumulation observed when repeatedly constructing matchers in GSAP 3.15. The callback refuses setup while the page is inactive. Font readiness callbacks are harmless when motion is inactive.
- Meaningful content is never hidden in baseline CSS. Motion adds no aria-hidden to text, changes no focus, and never hides an interactive card. The line masks enclose only display text; actions do not wait for a reveal.
- Constrained/touch layouts have no pointer-following effect. Native system cursor remains. Forced-colors restores a solid Hero heading and removes decorative SVG.
- No performance/FPS/Lighthouse claim is made. The observed initial desktop trigger count is bounded; final measurements and actual test results are recorded in the QA report.

## Adding a future motion target

Use an inner decorative/text wrapper with one property owner, keeping its semantic parent and actions static. Choose a one-shot labelled timeline or a bounded decorative scrub only when it clarifies the composition. Add it within the coordinator's scoped media context, use `canEnter` for one-time entrances, and clear temporary styles. Do not add a second loader, observer or per-scroll refresh loop. Update this inventory and run the existing static plus browser QA.

## Verification

See [Task 14B QA](qa/task14b/README.md) and its screenshot/result artifacts for the actual browser and static checks. Sources and art-direction decisions are documented in [CREATIVE_DIRECTION.md](CREATIVE_DIRECTION.md). This implementation does not verify CV freshness, fabricate missing project screenshots, or independently validate external product claims.

## Task 16C — Living Systems Atlas motion

This section supersedes the prior Task 14B/16B visual inventory where the same target changed. Task 16C retains **one** CDN loader, one GSAP coordinator, native scrolling and the existing failure fallback. Only GSAP core and ScrollTrigger are loaded. Plugins are intentionally not used: the Hero has authored line wrappers (SplitText adds no value), native `hidden` filtering needs no Flip state transition, and separate SVG route motifs are not safe/meaningful MorphSVG targets. Core path-dash animation and CSS route art meet the other moments without MotionPath or DrawSVG. Existing easing families (`power2`/`power3`) are used instead of an additional CustomEase plugin.

| Chapter / trigger | Targets and properties | Timing / lifecycle | Fallback |
|---|---|---|---|
| Hero, initial top visit only, no hash; wide, tall fine-pointer desktop; GSAP available before the 1.2s startup cutoff | One labelled `BOOT → HEADLINE → FRAME → IDENTITY → INVITATION` timeline: editorial line `yPercent`, portrait `clipPath`, registration text/identity/copy `x` and supporting opacity, route `scaleX`, CTA group `y` | Authored positions; total approximately 1.2–1.5s. One run per page instance; prepared styles clear at completion. | Entire Hero is visible on first paint and on touch/narrow/short/deep-link/late-load/reduced-motion/CDN failure |
| Chapter enters, including About through Contact | Chapter rule `scaleX`; inner title clip and small `x` offset | One labelled one-shot timeline at `top 85%`, `.7s`, `power3.out` | HTML heading and rule remain visible |
| Expertise / employment row enters | Decorative row rule `scaleX` | `.65s`, `power2.out`, one-shot | Static rule and content |
| Signal / original route enters | SVG path `strokeDashoffset`; terminal circle `scale` | Signal path `1s` and point `.25s`; other route clip `.72s`; one-shot | Complete inline/external SVG remains static |
| Achievement poster enters | Result heading clip; featured-result placement `x` | `.75s`, result label at `top 80%` | Full static poster text |
| Observatory route and stories | Observatory route path dash; one `ScrollTrigger.create` per flagship story selects scene/index/caption; a paused `.28s` state timeline gives stage a slight `y` reset | Path `.8s`; project trigger range `top 58%` to `bottom 42%`; state update on enter/enterBack. No pin and no scrub. | Default FlowPilot scene and all stories remain readable. Tablet has non-sticky stage; phones do not create these triggers. Filtering disables hidden-card triggers and selects the first visible featured project. |
| Contact closing title enters | Authored closing line wrappers `yPercent` | `.75s` with `.09s` stagger, one-shot at `top 85%` | Static title |
| Fine pointer enters primary Hero/contact action | `gsap.quickTo()` drives capped `x` and `y` transforms (maximum 5px and 4px) | `.3s` `power3.out`; listeners only in spacious desktop media context; removed and transforms cleared on reversion | Native pointer/touch, unchanged focus/hover affordance |
| Chapter side rail current location | No GSAP; IntersectionObserver toggles `aria-current` | Current section nearest viewport center | Links still work without observer; no false state |

No animation is needed to operate project filters, navigation, contact validation, email handoff, CV download, disclosure details, direct hashes or case-study links. The Observatory `figure` and scene list are `aria-hidden`; it duplicates visible story names, so the changes are decorative. GSAP never sets `hidden`, display, focus order or interactive ARIA state.

`gsap.matchMedia()` contexts own the Hero, chapter, path, result, Observatory and pointer interactions. Reduced motion skips the media callback, while CSS disables scene/rail transitions. Existing blocked-CDN and ScrollTrigger paths leave the authored default state visible. An optional Three.js error remains isolated to its own module. `ScrollSmoother`, pinning, a custom cursor, SplitText, Flip, MorphSVG, MotionPath, CustomEase and any new dependency were not introduced.

### Task 16C validation record

- `git -c core.whitespace=cr-at-eol diff --check`: PASS.
- `node --check` for all 10 `js/*.js` files: PASS.
- `tinycss2` syntax parse for `css/living-systems-atlas.css` and `css/case-studies.css`: PASS; zero parse errors.
- XML parse of `images/living-systems-routes.svg`: PASS; all six referenced route symbols are present.
- `python scripts/generate_case_studies.py --check`: PASS; all five generated/static page outputs are current.
- `python scripts/audit_site.py`: PASS; six inspected HTML pages, 0 local reference/import/metadata errors and 0 warnings. The audit also found the local CV has a valid PDF signature.
- Browser rendering and interaction matrix: **NOT RUN**. A localhost site responds on port 8765, but this environment had no browser CDP surface on port 9222; a hidden Edge launch did not expose its debugging endpoint. Therefore no Task16C screenshot, actual viewport overflow/alignment, keyboard interaction, live reduced-motion, filters, history, contact-app launch, failed-CDN or Three.js-failure result is claimed. Existing Task15/14B browser evidence is historical and is not reused as Task16C evidence.
- Performance/FPS/Lighthouse/Core Web Vitals: **NOT MEASURED**. Static architecture preserves native scroll and loads only existing GSAP core/ScrollTrigger enhancement; the full-resolution local hero PNG is 14,115,325 bytes in the current worktree and remains a release-time optimization concern.

The Observatory trigger count and transitions have source-level coverage only, not browser runtime verification. See [LIVING_SYSTEMS_ATLAS.md](LIVING_SYSTEMS_ATLAS.md) for responsive chapter design and ownership.
