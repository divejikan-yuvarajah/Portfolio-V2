# Digital Atlas — Task 16B UI Alignment & Motion Refinement

## Scope and baseline

This additive pass is based on approved `origin/main` commit `84ad1029666b522ee430adb42c586e45292592c7`, which includes Task 15 responsive work and Task 16 SEO/accessibility/performance changes. Work is on `feature/digital-atlas-ui-motion-polish`.

The prompt describes four supplied starter files (`atlas-polish.css`, `atlas-interactions.js`, `atlas-gsap-extensions.js`, and `case-study-polish.css`). They were absent from the repository and Downloads. The only similar files in Downloads were an unrelated dark-theme CSS template and an empty JS file; neither was safe to copy. Equivalent implementation was authored from the current DOM and the prompt's owner/lifecycle contracts.

## Visual refinements

- Standardised the Atlas reading width and chapter rail grid with a consistent numbered index, metadata and rule.
- Added cover-only coordinate grid and portrait registration treatment, preserving the original portrait, responsive image sources and CTA copy.
- Refined skills row columns, flagship project spread ratios and poster framing/ambient spotlight; project art remains explicitly decorative and existing notes stay intact.
- Tightened recurring section rhythm and content-fit typography while preserving intentional asymmetry.
- Added a decorative document progress line and current-chapter emphasis that do not replace or mutate native navigation state.
- Aligned the four generated case-study layouts to the same reading width, editorial facts rhythm, focus ring and responsive illustration sizing through the shared stylesheet. Generated page content and generator were not modified.
- All additions are token-backed/scoped; no external runtime dependency was added.

## Motion and ownership

| Concern | Owner | Task 16B behavior |
|---|---|---|
| Menu, active navigation, link state | `js/navigation.js` | Unchanged |
| Project filters, `[hidden]`, result announcements | `js/projects.js` | Unchanged |
| Contact validation and email-app handoff | `js/contact.js` | Unchanged |
| GSAP/ScrollTrigger loading, media contexts, refresh and page lifecycle | `js/motion.js` | Existing coordinator calls the new scoped extension |
| Micro-choreography | `js/atlas-gsap-extensions.js` | One-shot transform entrances for decorative chapter indices, project display lettering and venture wordmarks |
| Scroll indicator/current chapter/pointer light | `js/atlas-interactions.js` | Passive/rAF progress, decorative observer highlight and fine-pointer-only background custom properties |
| Optional particles | `js/three-scene.js` and `js/main.js` | Unchanged; existing constraints/fallback remain |

The extension reuses the coordinator's existing GSAP instance and `canEnter` guard. It does not register plugins, load GSAP, add a second matchMedia context, affect semantic visibility, move links, pin sections or alter scroll behavior. Reduced motion disables pointer lighting; all GSAP work is inside the existing media context. Interaction listeners and the observer are removed at pagehide.

## Responsive rules

- Wide layouts use the shared bounded 12-column Atlas width; home and case pages share the same outer measure.
- Tablet rules reduce project spread ratios and move skill tags to their own full-width row rather than squeezing them into a narrow column.
- At 700px and below the composition uses one reading axis, project artwork precedes its copy, and project filters wrap naturally.
- At 380px and below, skill descriptions/tags align under their label and page gutters reduce without altering text.
- Pointer illumination requires a fine pointer, hover capability and no reduced-motion preference. Forced-colors replaces custom highlights with system colors; reduced motion removes transitions and pointer effects.
- Existing CSS provides additional breakpoints, safe-area behavior, navigation behavior and short-landscape handling.

## Verification record

The implementation environment has no attached browser/CDP surface, so current Task 16B visual capture, computed-style inspection and interactive desktop/tablet/mobile runs are **NOT RUN**. Prior Task 15 screenshot evidence remains at `docs/qa/task15/after` but does not count as Task 16B verification. The local authoring browser tests must still cover widths 320, 360, 375, 390, 414, 430, 600, 700, 768, 820, 912, 980, 1024, 1280 and 1440px, short landscape, zoom/text scaling, reduced motion, forced colors, keyboard/focus and all preserved behaviors.

| Check | Result |
|---|---|
| `node --check` for all 10 files in `js/` | PASS |
| `tinycss2` parse of `tokens.css`, `style.css`, `atlas-polish.css`, `case-studies.css` | PASS — zero parse errors |
| `python scripts/generate_case_studies.py --check` | PASS — generated output current (5 static pages including 404) |
| `python scripts/audit_site.py` | PASS — six pages, 108 local references, 2 local imports, zero errors and warnings |
| Focused HTML audit | PASS — homepage plus four case studies; one H1 each, no duplicate IDs, ten homepage section IDs and local `href`/`src` paths resolve |
| Local HTTP smoke check | PASS — homepage, all four case-study routes and three new assets returned HTTP 200 |
| `git -c core.whitespace=cr-at-eol diff --check` | PASS |
| `python scripts/verify_digital_atlas.py`, `python scripts/verify_responsive_atlas.py` | NOT RUN — both require CDP at `127.0.0.1:9222`, unavailable in this environment |
| Responsive visual captures / desktop, tablet and mobile interaction checks | NOT RUN — no browser surface/CDP endpoint was available |
| No-JS, blocked CDN, filters, disclosures, keyboard menu, mailto flows, reduced motion / forced colors in browser, trigger-count and lifecycle measurements | NOT RUN |

The prompt's no-JS, blocked-CDN, filter, disclosure, mobile menu and mailto interaction scenarios still need browser verification. No performance score or trigger-count improvement is claimed.

## Remaining review

- Confirm visual balance and pointer-light intensity in a real browser before approval.
- Inspect keyboard focus outlines at every responsive breakpoint and verify the mailto form's invalid/valid paths.
- Verify direct browser back/forward on all case-study URLs.
- The absent starter files mean no upstream-specific visual tokens or code were available to compare; this branch follows the written contracts and current site architecture.
