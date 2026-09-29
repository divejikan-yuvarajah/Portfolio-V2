# Porcelain Arctic Design System

**Status:** Implemented as the shared visual foundation for Portfolio V2. This task does not rebuild individual sections, change portfolio copy, or introduce a framework.
**Source files:** `css/tokens.css` (palette, semantic roles, scales and global accessibility defaults), `css/style.css` (legacy compatibility and shared component primitives), `index.html` (font and stylesheet load order), `js/three-scene.js` (reads semantic action color and respects reduced motion).

## Design principles

- Light, spacious canvas with porcelain surfaces and editorial reading hierarchy.
- Cobalt is the primary interactive color; Arctic blue is supporting decoration, never small text on white.
- Use readable slate text and clear borders rather than translucent dark/glass surfaces.
- Motion is restrained and nonessential effects stop for reduced-motion preferences.
- Keep existing page content, section structure, project order, portrait, CV and module architecture intact.
- Avoid a generic dashboard look, neon styling, heavy shadows and unnecessary dependencies.

## Loading and ownership

`index.html` loads Google Fonts with `display=swap`, then `css/tokens.css`, followed by `css/style.css`. Tokens therefore exist before shared/section rules consume them. New color values belong in the primitive layer in `tokens.css`; components should consume semantic variables and avoid declaring palette literals directly.

The document currently uses old variable names in inline styles and existing rules. Compatibility aliases (such as `--bg-primary`, `--accent-cyan`, `--text-main`, and `--text-muted`) map those existing references onto the new semantic tokens. New code should use semantic names directly. Remove compatibility aliases only after all legacy references have been migrated in later tasks.

## Canonical palette

| Primitive | Value | Semantic role / guidance |
|---|---|---|
| Porcelain 50 | `#F8FAFC` | `--color-bg-page`, main canvas |
| Warm porcelain | `#F5F4F0` | `--color-bg-alt`, alternate sections |
| White | `#FFFFFF` | `--color-surface`, cards and raised surfaces |
| Navy 950 | `#0F172A` | `--color-text-primary`, headings and strongest copy |
| Slate 800 | `#1E293B` | `--color-text-secondary`, prominent labels |
| Slate 600 | `#475569` | `--color-text-body`, long copy and metadata |
| Slate 500 | `#64748B` | `--color-text-subtle` and strong control border; verify surface contrast |
| Cobalt 600 | `#2563EB` | `--color-action-primary`, links, CTA, focus ring |
| Cobalt 700 | `#1D4ED8` | `--color-action-hover` |
| Arctic 400 | `#60A5FA` | `--color-accent-arctic`, decorative/supporting use only |
| Arctic 100 | `#DBEAFE` | `--color-accent-soft`, pill/selection backgrounds |
| Slate 200 | `#E2E8F0` | `--color-border`, card/divider border |
| Green 700 | `#15803D` | `--color-success` status |
| Amber 800 | `#92400E` | `--color-warning` status |
| Red 700 | `#B91C1C` | `--color-danger` status |

Additional semantic values include pressed cobalt `#1E40AF`, subtle surface `#F1F5F9`, strong border via Slate 500, and translucent decorative surface/overlay colors. `--color-action-text` is white for cobalt-filled actions. Do not place Arctic 400 text on white or use white text on Arctic 400 for small type without a contrast check.

## Semantic tokens

Use these names in component and page styles:

```css
.example-card {
    color: var(--color-text-primary);
    background: var(--color-surface);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.example-link:hover {
    color: var(--color-action-hover);
}
```

Color roles cover page/alternate/surface/elevated backgrounds; primary, secondary, body, subtle and inverse text; primary/hover/pressed action and action foreground; accent, border/strong border/focus ring; and success/warning/danger status. RGB channel variables are reserved for translucent decoration and Three.js itself reads `--color-action-primary` from computed root styles.

## Typography

| Role | Stack | Use |
|---|---|---|
| Display/headings | `"Manrope", "Inter", Arial, sans-serif` | Headings and identity |
| Body/interface | `"Inter", "Aptos", Arial, sans-serif` | Paragraphs, navigation, forms |
| Technical/monospace | `"JetBrains Mono", "SFMono-Regular", Consolas, monospace` | Tags, technical labels, dates |

Fonts are requested from Google Fonts with local fallbacks and swap behavior. The base body is 16px with 1.6 line-height. Heading sizes use responsive `clamp()` defaults; the hero heading’s old fixed inline size was removed so the responsive scale can apply. Long-form utilities can use `--layout-reading-measure` (72ch, within the 65–75ch target).

## Spacing, layout and geometry

`--space-1/2/3/4/6/8/12/16/20/24` provide a 4px-based scale from 4px through 96px. `--layout-container` is 75rem; `--layout-gutter` is fluid from 1rem to 2rem. `--section-padding-block` uses a fluid clamp and reduces on narrower screens. Radius tokens range from `--radius-sm` through `--radius-xl` and `--radius-pill`. Use `--shadow-sm/md/lg` for light elevation and `--shadow-focus` for keyboard focus. Avoid introducing stronger shadows for routine cards.

Layer tokens are `--z-background`, `--z-base`, `--z-content`, `--z-sticky`, `--z-navigation`, `--z-overlay`, and `--z-cursor` (the last is retained as a compatibility token). The canvas remains fixed behind page content and ignores pointer input; navigation/menu layers stay above it. Task 14 removed the custom cursor.

## Shared primitives in the current vanilla architecture

- `.container`: centered 75rem content width with fluid page gutters.
- `.section-shell` / `.section-heading` / `.section-title`: reusable section rhythm and heading scale.
- `.surface-card` and `.glass-card`: white raised surface with quiet border and shadow; the legacy class name remains only for selector compatibility.
- `.btn`, `.btn-primary`, `.btn-secondary`: consistent action colors, hover, focus and 44px minimum height.
- `.eyebrow`, `.badge`, `.pill`: small labels use readable semantic text colors; `--color-accent-arctic` is not used as small text.
- `.text-measure`: readable long-copy measure.
- `.visually-hidden`: nonvisual accessible text utility.
- `:focus-visible`: visible cobalt focus indicator; form controls receive a compatible focus ring despite their existing base outline reset.
- `.filter-btn`: 44px minimum height, wrapping label text and a selected/hover surface.

These primitives do not change the current section order or interaction model. New sections should consume the primitives rather than create their own palette, spacing, radii, and focus values.

## Responsive and accessibility rules

- Keep the page usable at widths from 320px. Existing project/skills/service grids collapse to a single `minmax(0, 1fr)` column below 600px; gutters and headings are fluid.
- Navigation links, `.btn` actions, and skill filter buttons have a 44px minimum target where the current markup supports it. Revisit remaining inline-styled controls when their section is implemented.
- `:focus-visible` receives a 3px cobalt outline and offset. Never remove a native outline without an equivalent keyboard indicator.
- Cobalt on white has been statically calculated at approximately 5.2:1; white text on cobalt uses the same ratio. Body slate and navy exceed 4.5:1 on white. Arctic blue on white is below body-text contrast and remains decorative. These are color-pair calculations, not a full rendered contrast audit.
- `prefers-reduced-motion: reduce` disables CSS transitions and smooth scrolling. Homepage GSAP motion also skips setup initially and reverts its owned inline styles if the preference changes while open. Content is visible by default. The decorative, `aria-hidden` Three.js canvas renders one static frame instead of starting its continuous loop and redraws after resize.
- `overflow-x: clip` prevents decorative orbit effects from widening the page; check focus visibility and actual rendered overflow at the required viewport widths when browser preview is available.

## Dos and don'ts

**Do** add a new primitive in the palette only when a concrete role needs it; expose it through a semantic token; pair actions with hover/pressed/focus states; test text and boundary contrast on the actual surface; retain system font and motion fallbacks.

**Don't** use raw palette literals throughout component rules, use Arctic blue for small text, add an unapproved second theme, create unnecessary framework dependencies, apply `!important` to override component specificity, or add decorative motion without a reduced-motion alternative.

## Extension guidance

For later section tasks, use these tokens to style the existing markup or a small compatible section. Do not use this foundation as approval to change portfolio copy, links, project order, route structure, navbar behavior, or forms. Task 14 adds pinned GSAP/ScrollTrigger only for optional homepage motion under the approved task prompt; future dependencies still require their documented owner-approval gate. Update this file when a new semantic role is added, preserving old aliases until the affected legacy selectors are migrated.

## Task 02 verification record

- JavaScript syntax: `node --check` passed for `animations.js`, `main.js`, `skills.js`, and `three-scene.js`.
- CSS syntax: both stylesheets parsed without errors using the installed `tinycss2` parser.
- Local serving: the page, token and legacy stylesheets, and principal JavaScript modules returned HTTP 200 from the local server.
- Static checks: relative asset references and named in-page anchors resolved; compared with the Task 02 base, page copy, sections, links, images, scripts, forms, controls, and ordering remain intact.
- Color contrast calculations: cobalt action against white is approximately 5.2:1; slate body text against white approximately 7.6:1; navy against white approximately 17.9:1; slate muted text against white approximately 4.8:1. Arctic blue on white is approximately 2.5:1 and is reserved for decorative use.
- `git diff --check` must be run with Git's `cr-at-eol` whitespace rule because the tracked HTML/CSS/JS files use CRLF line endings: `git -c core.whitespace=cr-at-eol diff --check` passed.
- Browser-based rendering, console inspection, keyboard navigation, and screenshots at 320, 375, 768, 1024, and 1440px were unavailable in this environment; no browser executable or browser surface was available. These remain a manual visual QA item.

## Task 14B — Digital Atlas extension

Digital Atlas preserves the Porcelain Arctic palette and type families while introducing `--atlas-container`, `--atlas-gap`, `--atlas-display`, `--atlas-heading` and `--atlas-radius`. These control the twelve-column editorial cover, large chapter type and precise frames. `--space-5` now supplies the previously referenced 20px spacing step, fixing missing contact-form gaps.

Chapter indices and labels use JetBrains Mono; display statements use Manrope; content and controls retain Inter. A single navy achievement poster supplies an intentional inverse moment. Original SVG motifs are decorative and typographic illustrations stay explicitly labelled. The native cursor and visible keyboard focus remain standard. See [CREATIVE_DIRECTION.md](CREATIVE_DIRECTION.md) for section composition and [MOTION_SYSTEM.md](MOTION_SYSTEM.md) for motion ownership and fallbacks.
