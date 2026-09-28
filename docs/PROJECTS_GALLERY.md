# Featured Projects Gallery

Task 07 replaces the former nine-card Projects grid with a 17-project editorial gallery. The gallery preserves `#projects` for navigation and leaves the rest of the single-page portfolio, including the existing Three.js scene, untouched.

## Content source and ordering

`index.html` is the gallery's single source of truth. Project cards are semantic HTML articles with stable `data-project-card` markers and space-separated `data-categories` keys. `js/projects.js` reads those attributes to filter; it does not repeat project copy, links, or category assignments. Keep each project's order in the markup so filtering never reorders results.

1. **FlowPilot AI** — Built · Buildathon project
2. **CORTEX** — Availability unverified; collaborator source is identified explicitly
3. **MediGuardian AI** — Prototype · availability unverified
4. **INFRAOS** — In development
5. **InvoiceX AI** — Prototype
6. **JevFlow** — Local MVP · no hosted service
7. **Thinky** — Built
8. **HireQueue** — Built · rules-based scoring
9. **JARVEX: AI Chat Assistant**
10. **StockFlow: Inventory System**
11. **FocusFlow**
12. **ReNova: Sustainability App**
13. **NextGPA+ Academic Planner**
14. **Sri Lanka Accident Analysis**
15. **Jack Sparrow: The Barber**
16. **Interactive 3D Portfolio**
17. **ResQNet: Disaster Response Platform**

PowerGuard IoT is not included because this repository contains no approved PowerGuard project content or media. Task 08 adds detail routes for the four featured projects; the gallery remains the canonical source for their title, status, summary, categories, tags and external destinations.

## Categories and filtering

Current keys and controls are `ai` (AI & ML), `fullstack` (Full-stack), `automation` (Automation), `finance` (FinTech), `civic` (CivicTech), `data` (Data), `design` (Design), `desktop` (Desktop), and `web` (Web), in addition to `all`. A card can have multiple keys. All controls filter the entire 17-card collection, including the four featured cards. Cards remain in document order; empty group headings are hidden along with their cards.

The filter group is `hidden` in the HTML. `initProjects()` binds native button click handlers before revealing the group, then updates `aria-pressed`, the polite result message, and the native `hidden` state of unmatched cards and empty groups. With JavaScript disabled or initialization unavailable, all project copy and links remain visible and the filter controls remain unavailable. Native buttons provide Enter and Space behavior without a custom keyboard model.

## Media and presentation

The original nine local preview assets remain assigned to their original projects. Image elements declare their intrinsic pixel dimensions, use empty alt text because the adjacent card heading provides the identity, and load lazily with asynchronous decoding. The four new featured projects use clearly labelled typographic illustrations, not fabricated screenshots. No remote placeholder images or image error fallback requests remain in this section.

Cards use existing Porcelain Arctic tokens from `css/tokens.css`; gallery selectors are scoped in `css/style.css`. The featured grid emphasizes FlowPilot and INFRAOS with wide layouts and places CORTEX and MediGuardian in paired cards on wide screens. The layout becomes one column at 760px. Supplemental and archive cards also collapse from four/three columns to two and then one. Filter controls wrap naturally, links have 44px minimum height, and focus styling inherits the site's shared visible focus treatment.

## Link verification and editorial limits

URLs were checked against the public project sources/demos accessible on 2026-09-28. A link is rendered only where the destination was checked or supplied as the current repository origin. External links open in a new tab with `rel="noopener noreferrer"` and a descriptive accessible name.

| Project | Included destination | Verification / editorial note |
|---|---|---|
| FlowPilot AI | [Live demo](https://flowpilotai-opal.vercel.app/), [GitHub repository](https://github.com/divejikan-yuvarajah/FlowPilotAI) | Both opened as public destinations. Public project materials describe the financial workflow and integrations; no performance metrics are repeated. |
| CORTEX | [Team preview](https://cortex-gamma-teal.vercel.app/), [collaborator repository](https://github.com/abdullllbasith/Cortex) | Both public pages opened on 2026-09-29. Repository is owned by collaborator `abdullllbasith`, not the portfolio owner. Promotional metrics and claims are not independently verified; card labels this as a collaborator project and preview. |
| MediGuardian AI | None | The supplied Vercel URL could not be confirmed accessible. Card is explicitly a prototype and states it is not a diagnostic service. |
| INFRAOS | None | The repository URL supplied in the brief was not retrievable for verification. In-development state comes from the supplied project brief; planned capabilities are not represented as shipped. |
| InvoiceX AI | None | Description reflects the supplied project notes; no public repository or demo was verified. |
| JevFlow | [GitHub repository](https://github.com/divejikan-yuvarajah/JevFlow) | Public README confirms a local MVP, confidence-aware triage and human-review behavior. It does not claim a hosted service or live GitHub mutation. |
| Thinky | None | Project summary comes from the owner's public project information; no repository or demo URL was verified. |
| HireQueue | [Live demo](https://v0-hirequeue-job-platform.vercel.app/) | Demo opened. Owner's project description specifies weighted/rules-based scoring. The supplied repository URL could not be verified and is omitted. |
| JARVEX | [GitHub repository](https://github.com/divejikan-yuvarajah/Jarvex-JavaFXBased-ChatBot) | Public repository opened. |
| StockFlow | [GitHub repository](https://github.com/divejikan-yuvarajah/StockFlow-InventoryManagementSystem) | Public repository opened. |
| FocusFlow | None | Existing repository/demo URLs could not be confirmed accessible; old local image and project content are preserved. |
| ReNova | None | Existing Figma destination could not be confirmed; its local preview and design description are retained. |
| NextGPA+ | [GitHub repository](https://github.com/divejikan-yuvarajah/NextGPA-_Smart-GPA-tracking-Web-App) | Public repository opened. No demo CTA is shown. |
| Sri Lanka Accident Analysis | [GitHub repository](https://github.com/divejikan-yuvarajah/SriLanka_Road_Accident_Analysis_Project) | Public repository opened. |
| Jack Sparrow: The Barber | [Live demo](https://divejikan-yuvarajah.github.io/Barbershop-Website/) | Demo opened. |
| Interactive 3D Portfolio | [Portfolio repository](https://github.com/divejikan-yuvarajah/Portfolio-V2) | URL matches the current repository's configured origin; direct web preview could not be confirmed. |
| ResQNet | None | Existing Figma destination could not be confirmed; local preview and design description are retained. |

"Opened" denotes a direct public page response during the audit, not a guarantee of future availability. No unavailable link is replaced with `#`, a placeholder, or a future case-study URL. The CORTEX, MediGuardian, INFRAOS, InvoiceX and Thinky descriptions need owner/source refresh when stronger first-party project material becomes available.

## Task 08 case-study routes

The four featured cards link to `projects/flowpilot-ai/`, `projects/cortex/`, `projects/mediguardian-ai/`, and `projects/infraos/`. Static HTML pages are generated by `scripts/generate_case_studies.py`. `index.html` remains authoritative for shared summary fields and destinations; `data/case-studies.json` stores only unique case-study details, evidence notes and qualified owner contribution statements. See [PROJECT_CASE_STUDIES.md](PROJECT_CASE_STUDIES.md) for generation, evidence and limitations. These links resolve directly to folder `index.html` pages on static hosts that support directory indexes.

Each card retains the stable project title and `data-project-card` marker; adding case studies for further projects should follow the same single-source rule and only happen when evidence supports the detail page.

## Verification record

- Confirmed Task 02–06 commits in the ancestry of `task/07-featured-projects-gallery`; selected `task/06-technical-expertise` as the approved base represented by the current Task 07 branch.
- Confirmed nine existing local project images and retained all nine project entries.
- Checked repository/demo pages noted above on 2026-09-28; unavailable destinations are omitted.
- The current CV PDF is present, but no local PDF text extraction utility or library was available; it was not used to substantiate project claims.
- Browser/device visual inspection and assistive-technology testing were unavailable in this execution; see the Task 07 completion report and command results for static checks.
