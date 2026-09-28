# Project Case Studies (Task 08)

## Routes and order

The four flagship cards link to directly loadable static pages:

1. FlowPilot AI — `projects/flowpilot-ai/`
2. CORTEX — `projects/cortex/`
3. MediGuardian AI — `projects/mediguardian-ai/`
4. INFRAOS — `projects/infraos/`

Each directory contains an `index.html`; static hosts with directory-index support serve it for the trailing-slash route, including direct navigation and refresh. Pages use relative paths to the site CSS, JavaScript, and root portfolio, which supports deployment below a repository subpath. There is no client-side router. `404.html` is provided for static hosts that honor that convention; fallback behavior otherwise depends on the host.

## Content ownership and generation

`index.html` remains canonical for the shared project card fields: display title, status, summary, categories, tags, and external links. The generator extracts these from the matching featured article (`data-case-study-slug`) rather than copying them into another data source. `data/case-studies.json` contains only long-form case-study content that is unique to the detail pages: qualified contribution, problem framing, goals, documented features, architecture notes, decisions, outcomes, limitations, related routes, evidence notes, and page descriptions.

Generate or refresh pages with:

```powershell
python scripts/generate_case_studies.py
```

Check generated output without modifying it:

```powershell
python scripts/generate_case_studies.py --check
```

The generator validates that exactly the expected four featured slugs are present, that their order is stable, and that related-project references resolve. Edit shared facts in the gallery and case-specific facts in the JSON, then regenerate. Do not hand-edit generated route HTML. The project cards retain their existing category-filter markers and order.

## Page structure and design

Each page uses the existing Porcelain Arctic tokens and shared navbar; `css/case-studies.css` owns responsive case-study layout and `js/case-study.js` invokes the existing navigation initializer. Content is available in HTML without JavaScript. Pages include one page heading, breadcrumb/back navigation, project status and category context, summary, the documented problem and goals, feature and architecture sections, contribution/outcome/limitation notes where applicable, verified external destinations when available, and related flagship links. Reduced-motion behavior, visible focus styling, semantic headings, labeled links, and small-screen layout follow the existing design system. The detail page does not mount or alter the home page's Three.js scene.

No production domain has been confirmed, so no canonical URL is emitted. No Open Graph image is declared because the repository does not contain an approved project screenshot for these pages. The visible title-card artwork is a typographic illustration explicitly labeled as such; it is not represented as a UI capture. When the owner uploads approved screenshots, replace the relevant illustrated media with optimized assets and descriptive alternative text/captions after confirming which project and screen each depicts.

## Evidence and editorial boundaries

Public project sources were checked on 2026-09-29. A reachable marketing/preview page is evidence that the URL responds, not proof of its advertised metrics, security, user count, or production behavior. README-listed features and stack are described as project documentation, not independent end-to-end verification. Individual contributions are labeled as owner-reported when source code or team documentation cannot attribute modules to the portfolio owner.

| Project | Evidence available | Published boundary / open issue |
|---|---|---|
| FlowPilot AI | [Public repository](https://github.com/divejikan-yuvarajah/FlowPilotAI), [project page](https://flowpilotai-opal.vercel.app/) | Repository describes the dashboard, workflows, stack and sandbox integration distinction. The public page and repository disagree on model providers, so model names are omitted. No unverified metrics, award placement, or buildathon year is stated. The supplied brief reports team lead/product/architecture and frontend AI CFO dashboard contribution; repository placeholders do not independently attribute those modules. No approved screenshot is present. |
| CORTEX | [Collaborator repository](https://github.com/abdullllbasith/Cortex), [team preview](https://cortex-gamma-teal.vercel.app/) | Repository ownership is attributed to collaborator Abdul Basith. The page describes the documented team system and does not claim individual feature ownership. The team preview loaded; marketing claims and metrics are not independently substantiated. |
| MediGuardian AI | Supplied Task 08 project brief only | Described as a prototype and reported team lead/primary AI architecture contribution, with attribution qualified. No accessible repository, independently confirmed deployment, approved screenshot, or independently exercised health workflow was available. No diagnostic claim or unverified model/stack is published. |
| INFRAOS | Supplied Task 08 project brief only | Described as a university project in development; completed features are not inferred from planned scope. No retrievable repository or approved screenshot was available, so no repository CTA, technology claim, or production capability is stated. |

The full field-by-field claim and source notes are maintained in `data/case-studies.json`. The site deliberately excludes unverified promotional metrics, testimonials, awards, customer names, production integrations, and inferred individual module ownership. Links are offered only for destinations checked during the audit; availability can change after review.

## Verification scope and future maintenance

`python scripts/generate_case_studies.py --check` verifies generated documents are synchronized. Static HTML/link validation and direct HTTP requests can verify output paths and resource responses, but do not prove browser rendering, screen-reader behavior, responsive appearance, external product functionality, or the claims in a project's promotional material. No visual screenshot testing or assistive-technology run is claimed where a browser is unavailable.

Task 09 and broader migration are out of scope. When adding a future case study, first verify the project source and attribution, add a stable gallery slug and only then extend generator order/data and related-page validation. Avoid adding a framework or router for these four static routes.
