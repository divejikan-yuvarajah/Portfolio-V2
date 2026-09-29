# Digital Atlas — Task 14B

## Approved base and change map

Baseline: `origin/main` at `83c2ce5`, including Task 14 (`9c9ddef`). Work branch: `task/14b-digital-atlas-redesign`. The untracked package manifest, lockfile, installed modules and supplied brief are owner files and are not part of this change. The site remains static HTML, CSS and browser ES modules.

Before implementation, the page repeated centered titles, rounded cards and gentle y/opacity reveals. The new direction is an editorial field guide to **Ideas → Systems → Impact**. Strong type, asymmetry, rules and meaningful numbering carry the identity even without motion.

Planned file boundaries:

- `index.html`: cover composition, chapter rails, original decorative SVG signals, featured project metadata and closing statement; preserve existing facts, anchors, filter markers and destinations.
- `css/tokens.css`, `css/style.css`: shared atlas type/spacing tokens and a scoped composition layer in the existing stylesheet; preserve menu and validation states.
- `js/motion.js`: replace the Task 14 blanket reveal groups with one coordinated timeline/media system. Keep the existing failure-safe `animations.js` entry.
- `css/case-studies.css`, `scripts/generate_case_studies.py`, generated `projects/*/index.html`: shared editorial framing and route index; no factual data changes.
- Motion, architecture, design and gallery documentation: record property ownership, fallback and actual checks.

## Three signature moments

1. **The cover.** A large three-line builder statement, visible full name and role, and the owner's framed portrait form an asymmetric twelve-column cover. A small edition line and structural corner marks give it the precision of a field guide. A labelled entrance timeline coordinates the type, frame and supporting copy on a timely, spacious fine-pointer desktop load; phone, touch and short-height views show the authored cover immediately.
2. **The work atlas.** Four numbered, alternating features pair text with distinct typographic posters. FlowPilot uses a stepped flow motif, CORTEX a modular matrix, MediGuardian nested record lines, and INFRAOS an infrastructure grid. All are explicitly illustrations, never invented screenshots. A bounded sticky visual column on tall desktop layouts accompanies ordinary vertical reading. Fine-pointer desktop scroll gently translates only the decorative inner motif; project actions never move offscreen.
3. **The signal and the closing question.** Short angular cobalt SVG paths introduce selected chapters and resolve into a terminal point above the contact composition. Path drawing and rule growth give each chapter a deliberate entrance, with a large closing statement completing the visual language of the cover.

## Layout map

| Section | Static composition | Motion emphasis |
| --- | --- | --- |
| Header | Wordmark, compact index annotation, hairline, existing links | Small top-only entrance; menu stays immediate |
| Hero | Dominant type / portrait identity frame / edition footer | Labelled line-mask, frame and supporting-copy sequence |
| About | Large statement, readable body column, offset focus index | Title sweep and signal draw |
| Expertise | Six numbered engineering rows; all tools exposed | Rules grow in a short sequence |
| Projects | Four alternating vertical features, then complete recent/archive collections | Decorative poster progress; text stays visible |
| Achievements | One navy result poster; smaller ruled results below | Poster typography settles and result rule draws |
| Ventures | Asymmetric Zatroz and Softora panels; minimal previous-work timeline | Rule progression |
| Community | Editorial role feature and compact affiliation entries | Chapter line reveal |
| Education / credentials | Aligned dates/roles, horizontal dividers | Short rule sequence |
| Contact | Oversized closing question, direct email and honest mailto form | Closing path and line choreography |
| Case studies | Shared sharp frames, large type and numbered metadata | Static; no extra motion assets |

## Palette and type

Retain Porcelain Arctic semantic variables: predominantly porcelain and warm neutral, navy for type, cobalt for actions and a few signal beats. Only the primary achievement poster is inverse navy. Manrope supplies display tension; Inter remains the readable body; JetBrains Mono is restricted to meaningful index/edition/status metadata. Wide layouts use a twelve-column grid with a 7/5 cover and 5/7 feature balance; tablet/mobile return to one reading column.

## Interaction decisions and ownership

Choose the **sticky vertical alternative**, not a horizontal pinned deck: long factual caveats, project filtering, short viewports and keyboard tab order all benefit from ordinary document flow. Only decorative poster columns may stick on a sufficiently tall desktop; links and all project text stay in flow. No ScrollTrigger pinning, synthetic scrollbars or scroll replacement.

`motion.js` owns timeline transforms, title clipping and SVG/rule drawing. Its intro and decorative project scrub share the spacious fine-pointer desktop gate; `navigation.js` owns menu and active-link attributes; `projects.js` owns `hidden`/filters; `contact.js` owns validation and email handoff; `three-scene.js` owns the optional canvas. CSS hover affects arrows and borders, not GSAP-owned poster/type transforms. Native cursor throughout. The main entry skips and removes the decorative WebGL canvas on coarse-pointer, small/short, reduced-motion, save-data and low-core environments; CDN/WebGL failure still removes only that optional canvas.

GSAP matchMedia contexts own responsive effects and are reverted on preference changes and teardown. No text is split or hidden before assets load. Fixed semantic line wrappers provide the Hero mask without another plugin; SplitText is unnecessary for these authored lines. Flip is omitted because instant native filtering avoids ambiguous focus and `[hidden]` transitions. No extra runtime dependency is added.

## References actually consulted

- [Official GSAP showcase](https://gsap.com/showcase/?tags=Portfolio): the web reader could not access the filtered page; no individual showcase site was inspected or copied.
- [GSAP repository](https://github.com/greensock/GSAP), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [SplitText](https://gsap.com/docs/v3/Plugins/SplitText/), [Flip](https://gsap.com/docs/v3/Plugins/Flip/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/), [context](https://gsap.com/docs/v3/GSAP/gsap.context()/).
- Official [gsap-skills](https://github.com/greensock/gsap-skills): `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-performance` read in place. Applied labelled position parameters, media-context reversion, bounded ScrollTriggers and transform-first animation. No skill installer or remote script executed.

## Verification

Implementation and visual QA results are recorded in `MOTION_SYSTEM.md` and `qa/task14b/README.md` after checks. CV freshness, authentic project screenshots and independent validation of external project claims remain owner review items.
