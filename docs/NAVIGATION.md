# Portfolio Navigation

Task 03 replaces the legacy `MISTER.` bar with an accessible, responsive navigation for the existing one-page portfolio. It uses the Task 02 Porcelain Arctic tokens and native HTML/CSS/JavaScript; it adds no runtime dependency.

## Structure and anchors

`index.html` starts with a visible-on-focus skip link to `main#main-content`, followed by the sticky site header and one `<nav aria-label="Primary navigation">`. The wordmark points to the real `#hero` section. The page keeps a single content `<h1>` in the Hero.

| Label | Target |
|---|---|
| About | `#about` |
| Skills | `#skills` |
| Projects | `#projects` |
| Experience | `#experience` |
| Education | `#education` |
| Certifications | `#certifications` |
| Contact | `#contact` |

Each link has a matching section ID. The section list is intentionally derived from the current HTML rather than future roadmap items. When sections are added, update the markup and this table together; navigation targets without a matching element are ignored by active-state handling.

## Responsive and interaction behavior

- The header is sticky in normal document flow, with a compact translucent white surface and a quiet bottom border. It does not cover the initial Hero or resize when scrolling.
- Above 980px, the brand, six section links, and Contact action share one row. At 980px and below, a 44px native button opens a dropdown below the header; the dropdown can scroll within the viewport.
- The menu button's accessible label and `aria-expanded` reflect its state, and `aria-controls="nav-links"` identifies its list. Closed mobile links are both `inert` and hidden from the accessibility tree. The menu closes on link selection, Escape, outside pointer input, or transition to desktop width. Escape returns focus to the button when focus was in the menu. Opening the menu leaves focus on the button; the menu is a dropdown and does not trap focus.
- With JavaScript unavailable, the menu button stays hidden and all navigation links remain in the document flow and usable. Native anchors retain URL hashes, direct links, and browser Back/Forward behavior.
- Section IDs have a 6rem scroll offset so sticky navigation does not obscure their headings. The active section is indicated by `aria-current="location"` and a visible cobalt marker. The Hero/top state intentionally has no active section link. A direct known hash sets the active item on load; unknown hashes do not select a nonexistent item.
- `IntersectionObserver` updates the active section without a scroll loop. A passive, animation-frame-throttled scroll handler provides the fallback. Smooth anchor scrolling is inherited from the design system and turns off under reduced-motion preferences.

## Styling and maintenance

The implementation is in `css/style.css`; the two layout values are `--navigation-height` and `--navigation-scroll-offset` in `css/tokens.css`. Colors, surfaces, type, spacing, focus, and elevation come from existing semantic tokens. The switch point is 980px, chosen to give the full label set enough room in one row. Update the JS `MOBILE_NAV_QUERY` and matching CSS media query together if the content set changes enough to alter the fit.

Menu behavior and active-section behavior live in `js/navigation.js`, initialized once from `js/main.js`. The decorative canvas remains `aria-hidden`, and the header's navigation layer stays above it. The existing cursor animation, Three.js scene, skills filter, page copy, projects, CV, and other sections were not changed for this task.

## Task 03 verification record

- `node --check` passed for `navigation.js`, `main.js`, `animations.js`, `skills.js`, and `three-scene.js`.
- Installed `tinycss2` parsed both `tokens.css` and `style.css` without CSS syntax errors.
- Static HTML checks confirmed all eight existing sections and their text remain unchanged from the Task 02 base, all seven navigation targets resolve, IDs are unique, the `#hero` wordmark and skip-link target exist, and the obsolete `MISTER` brand is absent from the header.
- Local HTTP checks returned 200 for the page, both stylesheets, `main.js`, and the new `navigation.js` module.
- `git -c core.whitespace=cr-at-eol diff --check` passed for the repository's CRLF tracked sources.
- No browser surface or executable was available. Browser rendering and interactive keyboard/touch checks at 320, 375, 768, 1024, 1440px plus the 980px breakpoint were not run.
- External-link validity, CV download, Three.js rendering, skill filtering, rendered contrast, and real screen-reader behavior remain for browser/release QA. Their markup/modules were preserved but browser-level regression coverage is not claimed.
