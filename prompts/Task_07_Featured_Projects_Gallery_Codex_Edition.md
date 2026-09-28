# PORTFOLIO V2 — TASK 07
## Featured Projects Gallery — Complete Enhanced Codex Edition Prompt

**Project:** Divejikan Portfolio V2  
**Task:** 07 of 17  
**Recommended feature branch:** `task/07-featured-projects-gallery`  
**Design system:** Porcelain Arctic  
**Scope:** Implement only the featured projects gallery and its immediately supporting data, assets, styles, filtering, accessibility and documentation. **Detailed standalone case-study pages are reserved for Task 08.**

---

## 0. Role and implementation contract

Act as a **Senior Frontend Engineer, Product Designer, UX Engineer, Content Architect and QA Engineer**. Build a carefully curated portfolio gallery that communicates real engineering work rather than a generic grid of colourful cards.

Before editing anything:

1. Inspect the **actual current Portfolio V2 repository**, its framework, directory conventions, branch, scripts and existing project section. The older reference repository contained `index.html`, `css/style.css`, and `js/main.js`, but the V2 structure may have changed. Never assume paths or framework.
2. Read any present `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, navigation documentation, and the outputs of Tasks 04–06. If something is missing, report it rather than invent it.
3. Confirm Tasks 02–06 are included in the approved base/integration branch. If not, report the missing prerequisite and do not build on an unrelated commit.
4. Review project information, existing image assets, URLs, the latest CV, and any project data already in the repo. Use reliable existing content. Do not invent metrics, completed features, screenshots, testimonials, awards, deployed URLs or GitHub links.
5. Preserve the Navbar, Hero, About, Skills, existing animations/Three.js integrations, footer/contact, CV download, current working routes, mobile layouts and accessibility fixes.
6. Maintain the Porcelain Arctic design system; reuse existing tokens, components, spacing, typography, buttons and motion conventions.
7. Only Task 07: do not build the full case-study pages of Task 08, rewrite Experience in Task 09, or redesign unrelated sections.
8. Do not auto-merge, force-push, deploy, or change the original `Mister_PersonalPortfolio` repository.

**Success criterion:** An attractive, accurate, accessible, data-driven Featured Projects gallery with prominent flagship work, smaller supplementary projects, meaningful filtering, verified links, and polished desktop/mobile layouts.

---

## 1. Product direction and content hierarchy

The current portfolio needs to show that Divejikan builds **AI/ML systems, full-stack applications, workflow automation, and practical products**. Give substance and his specific contributions more emphasis than visual gimmicks.

### Desired order and presentation

| Order | Project | Position | Suggested category | Publication state |
|---|---|---|---|---|
| 1 | **FlowPilot AI** — AI-Powered Financial OS for SMEs | Large flagship card | AI / FinTech / Full-stack | Built / competition project |
| 2 | **CORTEX** — AI-Powered Enterprise Business Management OS | Large flagship card | AI / Enterprise / Full-stack | In development; verify current state |
| 3 | **MediGuardian AI** — AI Health Memory & Safety Guardian | Large flagship card | AI / HealthTech / RAG | Built / competition project; verify current deployment |
| 4 | **INFRAOS** — National Infrastructure Intelligence & Coordination Platform | Large flagship card | Full-stack / CivicTech / AI | In development |
| 5 | **InvoiceX AI** — AI Invoice Processing & Automation | Compact project card | AI / Automation | Built prototype; verify status |
| 6 | **JevFlow** — Confidence-Aware GitHub Issue Triage | Compact project card | AI / Developer Tools | Verify implementation and availability |
| 7 | **Thinky** — Smart AI Study Assistant Chrome Extension | Compact project card | AI / Browser Extension | Built |
| 8 | **HireQueue** — Candidate Scoring and Ranking | Compact project card | Full-stack / Productivity | Built |
| 9 | **PowerGuard IoT** — Smart Electricity Monitoring and Overload Protection | Compact/academic card **only if approved content/assets exist** | IoT / Academic | Clearly mark prototype/in development if appropriate |

**Important distinctions:**
- Show the **first four** as the visually prominent featured case studies **inside the gallery**. Task 08 will later add individual full case-study views. For Task 07, card CTAs can lead to existing, verified demo/repository links or a real gallery detail anchor if already implemented. Never point to future routes that 404.
- The supplementary set should use smaller, consistently designed cards; make the collection filterable without displacing the main flagship hierarchy.
- Do **not** claim all proposed INFRAOS modules are deployed. Label it as in development. Do not present a planned capability as a shipped feature.
- A project may have more than one category: represent that in data and in filter behaviour, but keep visible card labels restrained.
- Older StockFlow, JARVEX, FocusFlow, NextGPA and other works may be kept in an unobtrusive archive/secondary grouping **if current content exists**; do not delete assets/data unnecessarily. Scope the presentation to the approved primary order.
- Avoid the marketing claims “world-first,” “industry-leading,” “guaranteed,” or “enterprise-grade” unless well substantiated.

### Project facts available for editorial guidance (verify and refine against source)

**FlowPilot AI:** Financial health/cash-flow intelligence for Sri Lankan SMEs, financial stress testing and payment recovery. Cursor Colombo Buildathon 2026: 1st place FinTech track and Top 10 finalist. User participated as team lead. Relevant integrations reported: Seylan banking/payment APIs. Do not invent live availability or new measured business outcomes.

**CORTEX:** AI-powered enterprise/business management operating system; product under Zatroz. A code repository previously shared: `https://github.com/abdullllbasith/Cortex`. The project's competition recognition was described as IDEALIZE semifinalist; verify before displaying, and do not imply the repository is owned by Divejikan.

**MediGuardian AI:** Uploaded-medical-document extraction, safety checks spanning patient record history, RAG-based questions with source references and Guardian Connect doctor/referral support. Previously supplied live URL: `https://medguardian-ai-v2.vercel.app/`; verify it works before enabling. Frame as a project/prototype, **not a clinical diagnostic service or guaranteed medical safeguard**. Team lead / primary AI architecture role was reported.

**INFRAOS:** National Infrastructure Intelligence & Coordination Platform, designed around project visibility, interagency coordination, road works, GIS, risk and document intelligence. Previously supplied repository: `https://github.com/divejikan-yuvarajah/InfraOS.git`. Clearly mark under development and do not show all planned modules as implemented.

**InvoiceX AI:** n8n + OCR/AI invoice extraction, validation, duplicate/overdue checks, Supabase storage and Telegram alerts. Avoid fabricating customer deployment statistics.

**JevFlow:** Confidence-aware GitHub issue triage. Previously supplied repository: `https://github.com/divejikan-yuvarajah/JevFlow.git`. Verify repository details before copy or CTA claims.

**Thinky:** AI Chrome extension for webpage explanation, studying, quiz/flashcard generation and local browser storage. Verify public store/demo URL if any.

**HireQueue:** Weighted rules-based applicant scoring/ranking, not necessarily an AI API-driven classifier. Preserve this distinction.

**PowerGuard IoT:** Academic microcontroller team project using ESP32 and energy measurements; may be a planned/prototype project. Do not claim it is fully built without verification.

Suggested **short visible project descriptions** should be approximately 20–35 words, with one clear value proposition and one concrete implementation highlight. Card details should align with the actually implemented stack. Do not bulk-fill missing data with placeholders that render publicly.

---

## 2. Layout and visual specification

### 2.1 Section introduction

- Retain or introduce the real section ID expected by navigation, typically `id="projects"` (inspect first).
- Add a concise eyebrow such as `SELECTED WORK`, a heading such as **Projects I've Built**, and a humanised one- or two-line introduction.
- Optional small caption such as “Product engineering, applied AI and practical problem-solving.” Do not overcrowd the opening.
- Provide an accessible section label/heading hierarchy. Avoid duplicate H1 elements.

### 2.2 Four flagship cards

- Use a refined bento/editorial-inspired grid, not a random asymmetric composition. Suggested: first project hero-wide / feature emphasis; remaining featured entries organised in predictable two-column layout at wide screens. Adapt based on actual media quality and amount of copy.
- Use actual project imagery if available and authorised; no false application mockups purporting to be screenshots. If screenshot is missing, create a tasteful **typographic/project-icon fallback**, labelled as illustration, without fake UI metrics.
- Each card: name, short tag/category, verified development status, concise problem/solution line, 3–5 verified stack chips, role or contribution where accurate, optional genuine recognition, and available CTA(s).
- Recommended CTAs: **View Project** (only when a real destination exists), **GitHub** (only to the correct repository), and **Live Demo** (only when functional). If no destination exists, omit that CTA rather than using `#`.
- Card image is decorative if accompanying visible text already names the project; otherwise give concise meaningful alt text.
- Put keyboard focus on native card links/buttons; avoid clickable div wrappers nested around other links.

### 2.3 Supplementary cards

- Lower visual density with consistent card height where practical; don't truncate vital project meaning.
- Cards may show small preview/media, title, one-line purpose, restrained stack chips, and accurate CTA/status.
- The main featured grid stays identifiable even when users filter across categories. Define/document whether filters operate over all cards or only the supplementary collection. Prefer **filtering the entire visible project dataset**, with the featured subset maintaining relative order among matches, if implementation complexity is reasonable.

### 2.4 Porcelain Arctic theme

Reuse Task 02 semantic tokens; reference palette (do not duplicate literals everywhere):

| Role | Reference |
|---|---|
| Background | `#F8FAFC` |
| Porcelain alternate | `#F5F4F0` |
| Surface/card | `#FFFFFF` |
| Headings | `#0F172A` |
| Body text | `#475569` |
| Cobalt action | `#2563EB` |
| Cobalt hover | `#1D4ED8` |
| Arctic highlight | `#60A5FA` |
| Soft highlight | `#DBEAFE` |
| Borders | `#E2E8F0` |

- Manrope heading + Inter body + optional JetBrains Mono eyebrow/technical metadata.
- Fine borders, refined radius, deliberate whitespace, minimal shadows. No neon, overuse of gradient glows, harsh glassmorphism or unrelated dark theme.
- Hover/focus elevation should be subtle, stable, and not cause layout shift. Reduced-motion path must show content without reveal dependencies.
- Use existing spacing, breakpoints, component styles and motion conventions.

---

## 3. Data and architecture

- Prefer one central, typed/validated **projects data source**, compatible with the current stack. For example a module/JSON array. Do not duplicate the same project details across HTML and JavaScript.
- Suggested fields: `id`, `slug`, `title`, `subtitle`, `description`, `categories[]`, `featured`, `sortOrder`, `status`, `role`, `year`, `stack[]`, `highlights[]`, `image`, `imageAlt`, `repositoryUrl`, `demoUrl`, `detailUrl` (only if implemented), `recognition` (only if confirmed). Actual structure should follow existing conventions.
- Use stable IDs/keys and an explicit ordering; never depend on unpredictable object enumeration or manual DOM order after filtering.
- Validate/guard optional data. Missing image/link should render a graceful fallback, not `undefined`, broken image or blank CTA.
- Keep user-facing strings humanised; technical chips should be consistent in capitalisation (e.g. Next.js, TypeScript, Supabase, PostgreSQL, n8n, OpenRouter).
- If the V2 app is currently vanilla HTML/CSS/JS, stay compatible; if React/TypeScript was already genuinely implemented, use idiomatic components and types. No unapproved framework migration.
- Use accessible, semantic image handling; dimensions/aspect-ratio to minimise CLS; `loading="lazy"` for below-the-fold images where suitable; no unneeded large runtime dependencies.
- Ensure direct project links open safely; `target="_blank"` links must use `rel="noopener noreferrer"` and have clear accessible names if they open a new tab.
- Do not scrape GitHub client-side on every page load just to populate the gallery. Use locally managed content and verified static links.

---

## 4. Filtering and interaction

Create simple category filters using the real data. Suggested controls: **All**, **AI & ML**, **Full-stack**, **Automation**, **Other/IoT**. Refine based on actual classifications; do not create meaningless empty filters.

- Filters must be native `<button type="button">` elements (or equivalent accessible framework primitives) with a visibly distinct selected state and `aria-pressed` where appropriate.
- Show the count of matching projects if helpful; avoid layout jitter. For no matches, show a clear friendly empty state if category/data allows.
- Switching categories must not change the canonical project ordering or create duplicate cards.
- Maintain predictable focus. When hiding filtered items, ensure hidden controls cannot be tabbed to.
- Keyboard users should activate filters with native button behaviour. Do not implement custom arrow-key semantics unless treating the control as an actual tabs widget with the complete expected semantics.
- Optional subtle card reveal animation; respect `prefers-reduced-motion`, avoid heavy scroll handlers and unnecessary replay on filter changes.
- Keep mobile scrolling natural; avoid mandatory sideways swiping through core project content.

---

## 5. Responsive design and accessibility

Test widths **320, 375, 768, 1024 and 1440px**, plus an intermediate breakpoint. The layout should adapt naturally:

- Desktop: clear visual hierarchy with featured emphasis and well-aligned smaller cards.
- Tablet: robust two-column or one-column transition without awkward crop or long empty panels.
- Mobile: single-column cards, readable screenshots/copy, accessible filters (wrap or intentional scrolling with visible affordance), and CTA controls that do not overlap.
- Use sufficient contrast; meaningful hover **and focus-visible** states; readable type, semantic headings and real anchor destinations.
- Touch targets should be roughly 44×44px where practical. Never require hover to reveal essential actions.
- Do not animate essential information from permanently invisible initial CSS. Ensure the section works with JavaScript disabled where practicable, or provide documented progressive enhancement.
- Images must have relevant alt text, or empty alt when decorative. Do not use logos or screenshots for which ownership/permission is uncertain.
- Respect `prefers-reduced-motion: reduce`. Avoid horizontal overflow and avoid layout shifts when images load/filter results change.

---

## 6. Task 07 implementation steps

1. Inspect the current approved base and `git status`; read docs, components and existing projects section.
2. Verify Tasks 02–06 are integrated. Preserve uncommitted unrelated changes and report a blocker rather than discarding them.
3. Inventory existing project assets/content and verify intended repository/demo URLs where possible. Record unverified fields and leave public links omitted until verified.
4. Create `task/07-featured-projects-gallery` from the approved up-to-date integration branch.
5. Build/normalise central project data. Preserve verified fields, correct misleading statuses and sort according to agreed priority.
6. Implement section introduction and featured four-card presentation.
7. Implement compact supplementary gallery and accessible category filtering.
8. Apply Porcelain Arctic styling with existing tokens and reusable patterns.
9. Provide real media or graceful design fallbacks. Optimise image loading without compromising quality.
10. Verify mobile, keyboard, link destinations, empty/fallback states and current-site regressions.
11. Update/create `docs/PROJECTS_GALLERY.md` explaining card data schema, project order, status conventions, asset sourcing, link verification, filtering and Task 08 extension points.
12. Run available checks, inspect focused diff, commit and push feature branch. Stop; **do not merge automatically**.

### Git workflow

Use the repository's approved base branch (shown as `main` only as a default):

```bash
git status
git switch main
git pull --ff-only origin main
# Confirm Tasks 02–06 exist in this base before continuing.
git switch -c task/07-featured-projects-gallery

# Implement only Task 07 and run actual repository checks.

git diff --check
git diff --stat
git status
git add <only Task 07 files>
git commit -m "feat: create featured projects gallery"
git push -u origin task/07-featured-projects-gallery
```

Do not run destructive cleanup, `git reset --hard`, force pushes, or commit credentials/generated caches. If there is a documented `develop` or integration branch, adapt deliberately and report the chosen base. Prepare a PR only if appropriate; leave merging to review/approval.

---

## 7. Verification matrix / definition of done

### Project correctness

- [ ] Flagship order: FlowPilot AI, CORTEX, MediGuardian AI, INFRAOS.
- [ ] Supplementary project order is deliberate and includes the approved existing projects.
- [ ] INFRAOS and any unfinished work are visibly marked **In Development** or an accurate equivalent.
- [ ] No fake metrics, testimonials, launch claims or misleading screenshots.
- [ ] Role/contribution/recognition claims are supported by source content.
- [ ] No broken `#` CTAs, invalid URLs or accidental link to someone else's repository represented as solely mine.
- [ ] Gallery does not introduce unimplemented Task 08 case-study routes.

### Interaction / UI

- [ ] Category filters respond to click, Enter and Space.
- [ ] Correct active state and correct item count/results; ordering stable.
- [ ] Hidden cards do not leave focusable invisible links.
- [ ] Project image fallbacks and missing links behave gracefully.
- [ ] Cards align, do not overflow or trap interactions at all target viewport sizes.
- [ ] Every CTA has a discernible label and functional URL/anchor.
- [ ] No unexpected scroll jumps or interference with sticky navigation offsets.

### Accessibility / performance / regression

- [ ] Correct heading structure and `#projects` target for the navbar.
- [ ] AA-oriented contrast, focus visibility, semantic markup and meaningful alt text.
- [ ] Reduced-motion mode remains usable and shows all content.
- [ ] Image sizes/loading do not cause obvious layout shifts.
- [ ] No console errors, unnecessary dependencies or significant new scroll listeners.
- [ ] Nav, Hero, About, Skills, animations, contact and CV download remain operational.
- [ ] Run existing build/lint/test commands **if present** and report exact outcomes.
- [ ] Run `git diff --check` and inspect the final changed-file list.
- [ ] If screenshots/browser tooling is unavailable, explicitly state that visual testing was not run; don't claim a pass.

**Definition of Done:** A polished, accurate, fully responsive and accessible gallery representing Divejikan's actual engineering projects, with prominent flagship cards and a maintainable data structure ready for future Task 08 case-study pages. Documentation and a focused Task 07 commit must be present on the feature branch.

---

## 8. Required completion report

At the end, report:

1. Repository; chosen base branch; feature branch; commit SHA and push state.
2. Files created/modified and their purpose.
3. Final rendered project order, status labels, filtering categories and project data source.
4. Which project media and external links were checked, and what remains unverified.
5. Desktop/mobile implementation details and accessible interaction decisions.
6. **Tests actually run** and outcomes; tests/visual checks not run with reasons.
7. Any regressions fixed, open issues or follow-ups.
8. Confirm **Task 07 only** was implemented; Task 08 was not started.

## Final instruction

**Execute Task 07 only — Featured Projects Gallery.** Be faithful to the current codebase and approved project facts. Make the UI professionally distinctive, but favour real engineering substance, accessibility and reliable working links. Stop after creating a reviewable, verified feature-branch commit; do not auto-merge or deploy.
