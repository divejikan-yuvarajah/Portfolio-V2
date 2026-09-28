# Portfolio Hero

Task 04 redesigns only the `#hero` section. It retains the Task 03 anchor contract, Task 02 semantic tokens, current portrait, and existing CV download path. The rest of the portfolio content and the shared Three.js/navigation modules are outside this section's changes.

## Copy and source decisions

- **Eyebrow:** “Hello, I'm Divejikan” — a short introduction, not a credential.
- **H1:** “Yuvarajah Divejikan” — the existing page identity, kept as visible text.
- **Role:** “AI/ML-Focused Software Developer & Tech Founder” — the neutral positioning recommended in the Task 04 brief.
- **Summary:** “I build intelligent software and practical AI-powered products, turning real-world problems into clear digital solutions.” This is a concise fit-focused edit of the brief's proposed copy; no usage figures, awards, employment or customer claims were added.
- **Context:** “Founder & CEO at Zatroz · Co-Founder & Technical Lead at Softora · BICT (Hons) undergraduate, SEUSL.” These role labels are supplied directly by the Task 04 brief; the education program is also present in the existing Education section. No company URLs or unprovided dates were added.
- Competition placements and other optional proof statements were omitted because no supporting detail was supplied.

## Layout and image

On wide screens the Hero uses a two-column composition: identity and actions on the left, the existing portrait on the right. At 992px and below it becomes one column with copy first, so the title and actions appear before the portrait. At 600px and below the two primary actions stack at full width. Fluid spacing/type and the existing container keep the layout bounded at narrow and wide widths; `#hero` remains the navbar's wordmark target.

The local `images/profile_new.jpeg` is retained, displayed in a softly framed portrait crop with a muted Arctic accent. Its source dimensions (3081×3072) are declared to reserve layout space; the meaningful alternative text is “Portrait of Yuvarajah Divejikan.” The image is eager and prioritized because it is the above-the-fold portrait. No remote image fallback or replacement asset is used.

## Actions and document status

- `Explore My Projects` links to the existing `#projects` section.
- `Let's Connect` links to the existing `#contact` section.
- The existing `images/My_CV.pdf` download remains as a tertiary text link. The file exists in the repository and its relative path resolves, but its freshness/content could not be verified: `pdftotext`, `pypdf`, and `pdfplumber` are unavailable in this environment. Confirm or replace the CV before treating it as the latest approved resume.
- No social URLs, company websites, availability claims, or optional achievements were added to the Hero.

## Motion and accessibility

The typewriter and its inline script/style were removed in favor of a stable visible role heading. This avoids an empty role during loading, duplicate timers, and motion-dependent identity. Hero text is no longer hidden behind the global reveal observer, so it remains readable with JavaScript disabled. Decorative shapes are CSS-only and do not enter the accessibility tree. The portrait has stable intrinsic dimensions; actions are semantic links with existing focus styling and at least 44px targets.

The portrait has only a restrained hover scale; no entrance, floating, pulsing, orbiting, or parallax loop remains. The design system's reduced-motion rules suppress its transition. The existing decorative Three.js canvas, shared navigation, and non-Hero reveal behavior were left in place.

## Verification record

Static checks confirmed all eight sections remain, non-Hero section copy is unchanged, the page has one H1, both CTA targets exist, and the portrait/CV files resolve. JavaScript syntax and CSS parsing passed; local HTTP requests for the page, styles, scripts, portrait, and PDF returned 200. Token-based contrast calculations are 4.94:1 for cobalt on porcelain, 5.17:1 for white text on cobalt, 6.70:1 for white on deep cobalt, and 7.24:1 for body slate on porcelain. These are static color-pair calculations, not a rendered contrast audit.

No browser surface or browser executable was available. Browser screenshots and interactive checks at 320, 375, 390, 768, 1024, 1280 and 1440px, plus a short-height desktop viewport, were not run. CV freshness and PDF rendering also remain unverified because PDF readers/extractors are unavailable; confirm or replace the document with the owner before treating it as the latest approved CV.
