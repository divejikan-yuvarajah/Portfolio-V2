# Digital Atlas Responsive Plan and QA (Task 15)

## Baseline and branch choice

The initial cached refs showed `origin/main` at `83c2ce5` without Task 14B. After fetching, `origin/main` advanced to `eb71267`, merge PR #20 for Task 14B; its second parent is `ba559f5`, the Atlas branch head used for this work. `git diff --stat ba559f5 origin/main` was empty, so the working tree's starting content matches the integrated main tree. GitHub's repository API returned zero open PRs on 2026-09-29. The existing local and remote `task/15-mobile-tablet-optimisation` branch points to `afbd2d7`, an ancestor of the older mainline, and lacks Task 14B. Its earlier Task 15 work remains untouched. Work is on `task/15-mobile-tablet-optimisation-digital-atlas`, a unique review branch created from the now-integrated Atlas commit. The supplied Task 15 prompt is owner-provided and remains untracked.

The Atlas base had an editorial twelve-column cover at desktop, seven/five column Hero and About splits below 1024px, a one-axis phone composition below 701px, four alternating project spreads, and a single tall fine-pointer sticky-art/scrub gate. Browser measurements found no root horizontal overflow at the audited widths. A 375px screenshot captured while the initial GSAP timeline was active showed the lower Hero headline line partly masked. The mobile menu already used `100dvh` and a bounded scroll area, but did not reserve the bottom safe area. CSS sticky art also lacked the hover-capable half of the JavaScript fine-pointer gate.

## Composition and breakpoints

| Condition | Layout and interaction decision | Motion / effects |
| --- | --- | --- |
| `min-width: 1024px`, `min-height: 760px`, fine pointer + hover | Twelve-column Atlas cover; asymmetric chapter and alternating project layouts; bounded sticky decorative poster only | Hero intro and four decorative project scrubs; Three.js may load unless reduced-motion/data/core constraints apply |
| `max-width: 1023px` | Reduce ornament width; keep readable split Hero/chapters through tablet landscape, projects remain ordinary flow | No sticky or project scrub; desktop Hero intro only if the full desktop media gate matches |
| `max-width: 980px` | Task 03 native menu; viewport-bounded, internally scrollable dropdown with safe-area allowance | Navigation behavior remains owned by `navigation.js` |
| `max-width: 700px` | One reading axis; portrait follows identity and actions; projects stack as distinct editorial spreads; timeline/education columns reflow | Complete static Hero cover; no sticky/scrub; chapter and signal entrances remain short one-shot decoration |
| `max-width: 360px` | Keep wordmark, remove only its secondary annotation, tighten Hero actions and metadata spacing | Static |
| `max-height: 540px` on layouts through 980px | Native page scroll; no sticky poster in landscape phone/short window | No desktop gate; Three.js omitted |
| coarse pointer, reduced motion, save-data, or <=2 logical cores | Keep all authored content and links; omit the full-viewport canvas on the home page | No WebGL particle loop; reduced-motion policy remains owned by the existing motion coordinator |

These are content/layout breakpoints and input/performance features, not device model rules. The CSS sticky and JavaScript scrub/intro desktop gate both require width >=1024px, height >=760px, `pointer:fine` and `hover:hover`; reduced motion removes CSS sticky and reverts GSAP contexts. The existing 980px menu breakpoint and `navigation.js` media query remain aligned.

## Change inventory

- Hero cover entrance now runs only inside the spacious fine-pointer desktop media context. Phone, tablet touch, and short-height views retain the full headline, summary and actions in normal flow from first paint.
- The mobile menu reserves `env(safe-area-inset-bottom)`, contains overscroll and keeps the existing scrollable list / Escape / outside-click / link-close behavior.
- Posters have more readable phone-size captions and tool/project tags. At 320px, only the redundant brand annotation hides; the wordmark and edition/idea identity remain.
- Sticky artwork and scrub now share pointer, hover, width, height and reduced-motion boundaries. Short screens keep the ordinary editorial spread.
- `main.js` avoids importing/starting the decorative Three.js module for coarse pointers, widths <=760px, heights <=540px, reduced motion, save-data and low-core devices. On desktop the existing optional import and failure cleanup remain.
- No content facts, project order, archive records, URLs, generated case-study facts or portfolio dependencies changed.

## Evidence and test outcomes

Browser: Microsoft Edge 154.0.4258.37, isolated headless profile, local static server. Screenshots and machine-readable results live in [`qa/task15`](qa/task15/). Before captures at 375, 768 and 1024px are from the Task 14B head; the 375px image records the in-progress Hero reveal that prompted the fix. After captures include the Hero at 320, 375, 768, 1024 and 1440px, the flagship work spread, Experience, Community, Education, Contact/form, and CORTEX case study. The full results are in [`results.json`](qa/task15/results.json).

| Viewport / behavior | Result | Evidence / limit |
| --- | --- | --- |
| Required width matrix: 320, 360, 375, 390, 414, 430, 600, 768, 820, 912, 980, 1024, 1280, 1440 | PASS | All 14 browser checks had `scrollWidth == clientWidth`; one `h1`, all 17 project records, and no Hero CTA beyond the viewport. At desktop widths, the 15px difference from `innerWidth` was the browser scrollbar, not overflow. |
| Heights 568, 667, 740, 760, 900 at 375px; plus 844x390, 1280x600, 720x500, 1024x568 | PASS | No root overflow; poster remains non-sticky on each short layout. 720 CSS px was checked as a narrow 200%-zoom-equivalent layout, not native browser zoom. |
| Header/menu at 320x568 | PASS | Seven links fit in a visible 384px bounded menu; Escape restores button focus, outside pointer closes it, and a menu link closes and navigates. |
| Featured filters, home links and four direct case-study routes | PASS | Finance shows one record, All restores 17; all four case pages pass at 375 and 768px (eight direct loads), one `h1`, illustration and shared stylesheet each. |
| Contact, CV, links and all ten section hashes | PASS | Empty form reports the accessible invalid state; mailto, LinkedIn, GitHub and CV paths are present. Hash targets land below the header. The test does not launch an email app or send a message. |
| Keyboard-only page traversal and touch targets | PASS | 48 Tab stops reached all four flagship links and the contact message field; each focused control stayed visible. All 22 measured Hero/project/contact actions had at least 44x44 CSS-pixel targets. |
| Touch/coarse pointer, desktop motion and breakpoint changes | PASS | At 1024px coarse pointer, CSS sticky is off and canvas is absent. Fine-pointer desktop loads GSAP/ScrollTrigger 3.15.0 with four scrubs; resize to phone removes them and resize back restores four. Filtering leaves one active scrub for the one visible case, then restores four. |
| Reduced motion, save-data, low-core, no-JS, blocked GSAP and blocked Three.js | PASS | Reduced-motion/save-data/2-core startup loads no motion assets and omits the canvas. No-JS retains all 17 records. Blocking either CDN preserves Hero, gallery filters and contact form; a blocked Three import removes only the optional canvas. |
| Back/Forward | PASS | Back returns to the home document with motion-enhanced state and four desktop triggers (`navigation.type=back_forward`). Edge performed a history navigation; BFCache persistence itself was not reported by this run. |
| Forced-colors emulation | PASS | At 375px, one visible heading, no root overflow, decorative SVG hidden. |
| Native 200%/400% zoom, large-text OS setting, screen reader, physical iOS/Android, Safari/Firefox | NOT RUN | This environment provided emulated Chromium viewports and keyboard events, not those native browser/device/AT modes. |

Static checks also passed: all six HTML pages have unique IDs and one `h1`, 139 local href/src references resolve, the CV begins with a PDF signature, all JavaScript files pass `node --check`, the case-study generator is current, all three CSS files parse with `tinycss2`, and `git -c core.whitespace=cr-at-eol diff --check` is clean. No portfolio facts, case-study JSON, order, links, or dependency manifests changed.

`100dvh`, `visualViewport` address-bar collapse and iOS safe-area rendering were covered only by implementation review and emulated short heights; physical browser behavior needs device confirmation. Headless Edge ran with GPU acceleration disabled, so this run made no real-device WebGL frame-rate claim. CV freshness and external service availability were not independently checked.
