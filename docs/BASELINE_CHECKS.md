# Task 01 Baseline Checks

**Environment:** Windows PowerShell; Node.js v24.10.0; Python static server; working directory is the existing portfolio repository.
**Preview URL:** `http://127.0.0.1:8000/`
**Important limit:** No browser app/tab was exposed by the available computer-use inventory (`apps: []`, `browsers: []`). Consequently, this is not a visual or interactive browser test report.

## Commands and results

| Check | Procedure | Result | Notes |
|---|---|---|---|
| Repository and branch | `git remote -v`, `git status --short --branch`, `git branch --show-current`, `git log -1 --oneline` | Pass | User-provided `Portfolio-V2.git` matches local origin; branch is `task/01-repository-audit`; existing audit commit tracks `origin/task/01-repository-audit`. `prompts/` is untracked user input and preserved. |
| Source tree | `Get-ChildItem -Recurse -File`; `rg --files` | Pass | Enumerated source/docs/prompt/assets; README and conventional package/build/test/CI/deployment files absent. |
| Local HTML path references | PowerShell regex scan of `src`/`href` under `images/` with `Test-Path` | Pass | All local images and CV paths resolve. |
| Internal anchors | Compared literal `href="#id"` targets with document `id` attributes | Pass | All named section anchors resolve. `href="#"` controls are placeholders, not counted as meaningful section targets. |
| JavaScript syntax | `node --check js/main.js`; repeated for `animations.js`, `skills.js`, `three-scene.js` | Pass | Syntax only; does not resolve browser import map or execute modules. |
| Local HTTP serving | `python -m http.server 8000 --bind 127.0.0.1` | Pass | Server started from repository root; use HTTP because native ES modules are not reliably validated with `file://`. |
| HTTP smoke requests | `Invoke-WebRequest` for `/`, CSS, all four JS modules and sampled CV/images | Pass | Returned HTTP 200; full page 56,227 bytes, stylesheet 29,026 bytes, local files served. Sampled only; external CDN not exercised by browser. |
| Asset dimensions | PowerShell `System.Drawing.Image` read of local raster assets | Pass | All nine project images and portrait decoded; dimensions and sizes recorded in content inventory. PDF byte count recorded; PDF content not opened. |
| Patch whitespace | `git diff --check` before commit and staged diff check | Pass | No whitespace errors in staged documentation. |
| HTML validation | No validator installed/configured | Not run | No build/test toolchain exists; no online validator was used. |
| Browser rendering/console | Browser inventory returned no available apps or browsers | Not run | No screenshot, DOM runtime, console, WebGL, or network panel available. |
| Responsive widths | 375px, 768px, 1440px | Not run | Layout rules inspected statically only. |
| Keyboard and assistive tech | Manual browser input/screen reader | Not run | No browser/AT surface available. |
| External URL health | HTTP checks for GitHub, Vercel, Figma, LinkedIn, certificate destinations | Not run | Avoids mistaking link syntax for destination availability; URLs require future owner-confirmed verification. |
| Contact delivery | Form submission | Not run | No action, method, names, endpoint, or submit handler in inspected source; do not submit live user data. |
| Performance metrics | LCP, CLS, CPU/GPU profiling | Not run | No browser profiler available; image size and animation risks are static estimates, not measured metrics. |

## Interaction baseline from source inspection (not browser-executed)

- **Navigation:** anchors are present. Mobile toggle uses `div.menu-toggle` and JS class toggles; not keyboard/focus/Escape tested.
- **Skills filter:** four buttons filter 14 cards by `data-category`; `skills.js` modifies `display`, `opacity`, `transform` with timers. Rapid switching was not executed; overlapping timers could cause transient visibility inconsistencies (inference from source, not observed runtime).
- **Reveal/cursor:** `IntersectionObserver` adds `.visible`; custom cursor listeners move dot/outline. No fallback/reduced-motion branch was found. Not executed.
- **Typewriter:** inline loop cycles three role strings on DOM ready. Not executed.
- **Three.js:** module import uses import map from unpkg, particle loop schedules perpetual animation, adjusts renderer on resize; no browser console/WebGL fallback tested.
- **Form:** native required-field constraints are marked in HTML. There is no configured form action or listener in local scripts; no evidence messages send.
- **CV:** local path exists, `download` attribute present, and HTTP request returned 200. Actual browser download/PDF open not tested.

## Manual reproduction steps for pending visual/runtime checks

When a browser becomes available:

1. From repository root, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/` (do not use `file://`).
2. At 1440px, inspect the hero, sections, fixed navigation, cards, footer, image loading, and page overflow. Record console/network failures including Google Fonts, unpkg, and placeholder requests.
3. Repeat at 768px and 375px. Test menu opening/closing, anchor navigation, touch target access, project card wrapping, contact columns, and horizontal overflow.
4. Using keyboard only, tab through navigation, filters, project links, contact links, form fields and submit control; note visible focus, reading order and whether menu state is understandable. Test Escape/focus return if menu is open.
5. Switch each skill filter quickly in succession and confirm hidden cards cannot be focused and visible state matches selected filter.
6. Enable reduced motion and disable WebGL where possible. Confirm content and navigation still work, no hidden content remains, and no uncaught errors occur.
7. Do not submit contact data unless an endpoint and test-safe procedure are first confirmed. Verify the CV download locally.

## Cleanup

The Python HTTP server was stopped after the smoke checks. No application source or media was changed for verification.
