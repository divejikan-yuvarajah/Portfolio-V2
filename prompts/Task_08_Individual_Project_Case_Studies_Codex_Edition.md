# PORTFOLIO V2 — TASK 08
## Individual Project Case-Study Pages — Complete Enhanced Codex Edition Prompt

**Project:** Divejikan Portfolio V2  
**Task:** 08 of 17  
**Recommended branch:** `task/08-project-case-studies`  
**Design system:** Porcelain Arctic  
**Scope:** Build high-quality, independently accessible case-study pages for the four featured projects, connect them to Task 07's gallery, and document their content/routing architecture. **Implement Task 08 ONLY.**

---

## 0. Codex role, operating rules, and prerequisites

Act as a **Senior Full-Stack/Frontend Engineer, Technical Content Architect, Product Designer, Accessibility Specialist, SEO Engineer, and QA Engineer**. Treat a case study as a credible engineering narrative: the problem, specific contribution, approach, implementation, challenges, and actual result. Do not fabricate impressive-sounding claims.

**Before making code changes:**

1. Inspect the **real current Portfolio V2 repository**. Identify the actual framework, rendering strategy, routes, components, asset conventions, scripts, approved integration branch, and deployment setup. The legacy source was static HTML/CSS/JS; Task 01–07 may have restructured it. Do not impose a framework migration.
2. Read `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, and `docs/PROJECTS_GALLERY.md` **if available**. Read the present Task 07 project data and actual gallery implementation. If missing, report gaps; do not pretend to have read nonexistent files.
3. Confirm Tasks 02–07 are integrated into the approved base branch. If Task 07 has not been approved/merged, do not silently branch from an unrelated base. Stop safely and report the dependency or proceed only on an explicitly approved integration base.
4. Check `git status` before changing anything. Protect uncommitted work. Do not stash, discard, reset, or overwrite unrelated changes without authorization.
5. Verify content against existing project descriptions, actual repository code/README files, confirmed working demos, authorised screenshots, and the owner's approved CV. Source-derived facts override assumptions. Mark uncertain information as `Needs verification` **in internal documentation**, not as a fictional publicly rendered fact.
6. Preserve all completed Navbar, Hero, About, Skills, Featured Projects, filters, contact, education, animations, custom cursor/Three.js, CV download, and existing site links.
7. Reuse Task 02's tokens and existing reusable components. Do not introduce an unnecessary framework, router, design system, animation library, icon package, CMS or remote API.
8. Keep work scoped to project case-study pages and their necessary gallery links/data. **Do not begin Task 09 (Experience & Ventures), redesign the Hero, or perform an unrelated overhaul.**
9. Never auto-merge into `main`, force-push, alter the original `Mister_PersonalPortfolio` repository, or deploy without explicit approval.

**Success criterion:** Each featured project has a polished, accurate, responsive, accessible, directly linkable case study that explains Divejikan's work, reuses shared data, and loads reliably when accessed or refreshed independently.

---

## 1. Project order and exact initial page scope

Create **four** production-quality case studies, in the same order as Task 07:

| # | Project | Stable proposed slug | Status/content guidance |
|---|---|---|---|
| 1 | **FlowPilot AI** — AI-Powered Financial OS for SMEs | `flowpilot-ai` | Buildathon competition project; verify demo and integrations |
| 2 | **CORTEX** — AI-Powered Enterprise Business Management OS | `cortex` | Active product/development status must be accurate |
| 3 | **MediGuardian AI** — AI Health Memory & Safety Guardian | `mediguardian-ai` | Competition prototype; no diagnostic or clinical-safety guarantees |
| 4 | **INFRAOS** — National Infrastructure Intelligence & Coordination Platform | `infraos` | University project in development; separate planned vs implemented modules |

The proposed URL pattern is `/projects/<slug>/`, **only if appropriate to the current stack and hosting configuration**. If the existing app uses an approved different routing convention, use it consistently and document the final links. Do not create a route that only works through client-side navigation and fails on refresh.

**Secondary projects:** InvoiceX AI, JevFlow, Thinky, HireQueue and optional PowerGuard IoT remain in the gallery. Do **not** fabricate full detailed case studies for them in Task 08. Keep their existing verified demo/repository CTAs and provide a maintainable future extension path.

---

## 2. Content integrity: approved editorial starting points

The notes below are **starting context**, not permission to claim unverified features, dates, performance, public deployment, customer adoption, awards, or ownership. Verify wording against existing repository evidence and user-approved content. Be especially clear about **team contribution versus individual contribution**.

### 2.1 FlowPilot AI
- Problem: Sri Lankan SMEs need more accessible visibility into cash flow, business health, payment collection, and short-term financial risk.
- Possible documented functionality: financial dashboard, cash-flow timeline/runway projections, overdue-payment radar, recovery messaging, stress-test simulation, and bank/payment API integrations.
- Divejikan's reported role: team lead; product/architecture and frontend/AI CFO dashboard contributions. Confirm scope and phrasing.
- Recognition previously reported: **1st Place, FinTech Track (Seylan Bank API)** and **Top 10 at Cursor Colombo Buildathon 2026**. Verify exact competition wording and counts from approved sources before publishing.
- Previously reported stack: Next.js, TypeScript, Supabase/PostgreSQL, Tailwind, LLM API integrations, Seylan Bank APIs and payment gateway integration. Verify implemented stack; do not imply all external systems are presently live or publicly accessible.
- Explain the flow using a meaningful architecture/data diagram only if the implemented design is known; distinguish demo/test integrations from production banking functionality.
- No fabricated cash saved, forecast accuracy, revenue gains or enterprise deployment statistics.

### 2.2 CORTEX
- Problem: business workflows/data are fragmented across tools, reducing business visibility and coordination.
- Concept: AI-powered Enterprise Business Management Operating System / ERP.
- Previously shared code reference: `https://github.com/abdullllbasith/Cortex`. **This is a shared/team repository; do not present it as solely Divejikan's repository.** Check access and current features.
- Previously discussed stack includes Next.js/TypeScript, Node.js, PostgreSQL/pgvector, Supabase, background jobs, LLM integration and Docker; **include only dependencies that actually appear in the present implementation or an approved architecture**, and distinguish planned components from shipped code.
- If including IDEALIZE competition recognition, verify the exact result/round before publishing.
- Make stage/status clear: built MVP, in development, prototype, or other verified description; never call unfinished modules deployed.
- Emphasise personal responsibilities only where supported by source materials.

### 2.3 MediGuardian AI
- Problem: medical documents and longitudinal patient information are scattered, making review difficult.
- Project demonstration: extraction of structured information from uploaded documents; medication/allergy/interaction review, record-based retrieval chat, source references; Guardian Connect doctor/referral discovery if verified implemented.
- Previously supplied demo: `https://medguardian-ai-v2.vercel.app/`. Check its accessibility before linking.
- Previously reported stack: Next.js 14, TypeScript, Supabase/Postgres/pgvector/Auth/Storage, Qwen via OpenRouter, Tailwind, GSAP; verify with the available repository and approved write-up.
- Reported role: team lead / primary AI architecture; avoid saying every part was solely implemented by one person.
- **Sensitive framing:** This is a student/competition software project, not a clinical diagnostic product, certified medical device, verified medical recommendation system or replacement for a clinician. Do not claim medication-safety guarantees or zero fabrication, and do not publish personal medical records/test data.
- Add a brief, appropriate prototype disclaimer where health functionality is described.

### 2.4 INFRAOS
- Problem: infrastructure agencies and contractors managing road/water/telecom/drainage works separately may produce repeated excavation, schedule conflicts and limited public visibility.
- Concept: National Infrastructure Intelligence & Coordination Platform with project tracking, coordination, GIS mapping, citizen reporting, AI risk/document intelligence.
- Previously shared repository: `https://github.com/divejikan-yuvarajah/InfraOS.git`; verify availability and actual state.
- Proposed technologies include React/Next.js, Node.js/Express, MongoDB, Python/FastAPI, ML/LLM/RAG, Mapbox/Leaflet and Socket.IO; list only implemented technologies under **Built With**, and put unimplemented technology in an expressly labelled **Planned Architecture** subsection if appropriate.
- Status: **In Development**; project is not an operating government service or official national platform. Do not imply public-sector affiliation or adoption.
- Anonymise or generalise any sensitive unpublished stakeholder information.

### Source-of-truth rule

For each case study, maintain a small internal fact-check table in `docs/PROJECT_CASE_STUDIES.md`: `Claim / Evidence source / Verified? / Published wording`. Never include a metric, photo, testimonial, screenshot, role, recognition or external URL that cannot be supported. If evidence is missing, write accurate neutral copy, omit the detail, or add a clearly qualified *planned* subsection where relevant.

---

## 3. Page information architecture — consistent but not templated-looking

Each page should feel editorial and premium while remaining easy for hiring managers and technical reviewers to scan. Build a reusable template/layout with project-specific content and visual variation driven by real media and facts.

### 3.1 Page-level layout

1. **Global header/navigation** — reuse Task 03 as-is; links should work correctly from nested routes.
2. **Breadcrumb / back link** — `Home / Projects / Project Name` where valid, plus a conspicuous `← Back to Projects` link returning to the real gallery section.
3. **Case-study Hero** — category/discipline, project title, concise one-line value proposition, honest status tag, year if verified, and strong real screenshot or tasteful labelled illustrative media.
4. **Quick facts / metadata strip** — Role, project type (team / academic / competition / personal, when verified), duration/year if known, and 4–7 key tech tags. Avoid presenting unsupported stats as KPIs.
5. **Problem and context** — who was affected and what needed solving, in plain English.
6. **Objectives and approach** — 2–4 focused intended outcomes, product decisions and major constraints.
7. **My contribution** — a precise breakdown of Divejikan's responsibilities, clearly differentiated from team achievements.
8. **Solution / key features** — 3–6 genuinely implemented features, each described with the user value and technical detail; any planned features explicitly marked and kept separate.
9. **Technical architecture** — compact flow diagram or clearly formatted explanation; describe actual data movement, APIs, storage and AI usage where confirmed. Do not expose secrets or private URLs.
10. **Engineering decisions / challenges** — two or three real implementation tradeoffs or problems and how they were handled, provided facts are available; otherwise omit rather than invent a debugging story.
11. **Result and lessons** — actual demo/prototype/buildathon outcome, delivered artifact, observed result and learning. Clearly distinguish results from expectations and future roadmap.
12. **Media gallery** — genuine screenshots and useful captions, or one hero image plus a restrained placeholder that does not pretend to show a shipped feature.
13. **Project links** — only verified GitHub/live demo/case-study source links, with clear labels. Missing URLs should mean **no button**, not `href="#"` or a made-up URL.
14. **Related work / next project** — links to other implemented project case studies; no empty controls.
15. **Existing footer/contact** — reuse existing components/markup and keep navigation working.

Suggested editorial order can adapt to content length. Avoid giant paragraphs; use 1–3 short paragraphs per section, purposeful subheadings, honest captions and good whitespace. **Do not force identical page lengths by filling gaps with generic marketing copy.**

### 3.2 Optional content modules — evidence required

- A real product walkthrough image or annotated screenshot (do not fabricate screenshots).
- Real feature flow, architecture diagram, API/data flow or sequence diagram where supported.
- Real public competition photo/badge only if rights are clear.
- Key engineering decisions or constraints based on documentation/code.
- A short retrospective: what worked, what changed, what's next.

Do not introduce a public comment system, testimonials, customer counters, fake dashboards, LLM chatbot, or content management system in this task.

---

## 4. Component and data architecture

- **Extend Task 07's canonical project data**; do not independently hardcode conflicting names/statuses/stacks/URLs in each gallery card and detail page.
- Introduce a case-study-specific data structure only where necessary, for example `caseStudy`: `overview`, `problem`, `goals[]`, `roleSummary`, `contributions[]`, `features[]`, `architecture`, `decisions[]`, `outcomes[]`, `limitations`, `gallery[]`, and `relatedSlugs[]`.
- Separate **shared gallery summary fields** from **long-form project content** to avoid loading giant case-study bodies on every gallery render if architecture makes that a concern.
- Use stable `slug` values and a controlled route lookup; unknown slug returns a real 404/not-found experience or the stack's standard 404, not a silently blank page or fallback to the wrong project.
- Optional data must be guarded: absent screenshot, repo, demo, year, feature, award, or architecture means the UI omits that module gracefully.
- Do not duplicate all page layout markup four times where a reusable template is possible in the current stack. For static HTML, create a reasonable shared-generation or progressive enhancement approach **without introducing a large toolchain solely to satisfy reusability**. If separate static pages are simplest and appropriate, document how consistency is maintained.
- Keep content in accessible source-controlled files. No mandatory headless CMS and no runtime scraping of GitHub/APIs for case-study text.
- If existing data uses TypeScript, keep strong project/case-study types and validation. If vanilla JS, use JSDoc/schema-like validation or small well-defined objects as practical.
- Every case study must work when opened directly, refreshed, opened in a new tab, and accessed from the gallery.

### Routing requirements by stack

**If the V2 site is static vanilla HTML/CSS/JS:** use reliable deployable static detail pages (e.g. `/projects/flowpilot-ai/index.html`) or an equally robust existing static build approach. Check Vercel path handling, root-relative versus relative assets, canonical link URLs, and internal anchors from nested pages. Do not assume client-side `history.pushState` creates deep-link support.

**If the V2 site is React/Next.js with an existing router:** use its idiomatic file-based/dynamic routing or approved router, with prerendering/metadata where applicable and safe not-found handling. Do not add a second router.

**If URLs rely on rewrites:** document and verify the deployment configuration. A local working link alone does not prove refreshing `/projects/cortex/` will work after deploy.

---

## 5. Porcelain Arctic case-study art direction

Use the Task 02 semantic CSS variables and established spacing/typography, not independent per-page themes.

| Visual role | Reference value |
|---|---|
| Porcelain page | `#F8FAFC` |
| Warm alternate area | `#F5F4F0` |
| Content/card surface | `#FFFFFF` |
| Main heading | `#0F172A` |
| Body copy | `#475569` |
| Primary cobalt | `#2563EB` |
| Cobalt hover | `#1D4ED8` |
| Arctic accent | `#60A5FA` |
| Soft highlight | `#DBEAFE` |
| Borders | `#E2E8F0` |

- Heading font **Manrope**; body **Inter**; optional technical labels **JetBrains Mono**. Reuse actual installed/design-system font assets and CSS declarations.
- Use a restrained max-width reading column for long text and a slightly wider content frame for images/diagrams. Avoid full-width paragraphs that are difficult to read.
- Prefer clear numbered editorial sections, subtle dividers, compact tags, labelled figures, and elegant CTAs. The content should communicate real systems engineering rather than look like a product landing page.
- Cards/media have deliberate border radius and thin borders; no neon glow, fake dark dashboard screenshot, flashy 3D elements, or excessive gradients.
- Add subtle reveal/hover transitions using **existing** motion conventions only; all content should be accessible without motion or JavaScript-dependent reveal effects where feasible.
- A long project page may benefit from a modest `On this page` mini-navigation on desktop. Implement only if it improves real content and does not obscure the main navigation or introduce complexity on mobile.
- Ensure media is correctly cropped, not stretched or cut off at important details. Do not re-create original screenshots as fictional new UI.

---

## 6. Accessibility, SEO, performance, security

### Accessibility
- One meaningful H1 per case study and sequential H2/H3 hierarchy; landmark regions and descriptive link text.
- Visible keyboard focus, working skip link, adequate contrast (target WCAG AA), and readable mobile typography.
- Meaningful image `alt` text for informative screenshots; decorative images have `alt=""`; images in `<figure>` get concise captions if informative.
- Do not use clickable `div` cards; native anchors for navigation and buttons for actual actions.
- A user can navigate each page, related links, the footer and the global nav without a mouse.
- Avoid hover-only content, inaccessible carousels and mandatory sideways swiping for core information.
- If diagrams carry important facts, include an adjacent text description.
- Respect `prefers-reduced-motion: reduce`; remove nonessential movement and ensure all content remains visible.

### SEO / social sharing
- Unique human-readable `<title>` and meta description for **each** case study.
- Page-specific Open Graph title, description, type and image only when a suitable permitted and deployable asset exists. A default verified portfolio image is preferable to a broken URL.
- Canonical URLs only after validating the real production domain and route; never hardcode an unconfirmed V2 domain.
- Use descriptive page headings and sensible internal linking. If supported by current architecture, add `Article`/`CreativeWork` structured data **only with factually correct fields**, not fabricated ratings/awards.
- Preserve site-level favicon, viewport metadata and crawler-related setup. Avoid duplicate/conflicting meta tags.

### Performance / resilience
- Optimise/compress authorised screenshots; use modern image formats as appropriate, explicit dimensions/aspect-ratio, and lazy loading for below-the-fold media. Keep the primary hero media prioritised appropriately.
- No huge duplicated JavaScript bundles and no unnecessary dependency for a simple diagram.
- Handle broken/unavailable images and links gracefully; do not silently display inaccurate replacement UI.
- Keep nested routes free from missing CSS/JS/font/image assets.
- Confirm no console errors, runtime warnings, layout shifts, horizontal scroll or page flicker during route navigation.

### Security / privacy
- Never expose private keys, access tokens, bank credentials, real patient data, personal business records, unpublished team information or private configuration.
- No API calls to production finance/medical systems for decorative content.
- External links opening new tabs must use `rel="noopener noreferrer"` and give understandable labels.
- Any contact links/email present on detail pages should reuse verified, approved public details from existing site.

---

## 7. Gallery integration and navigation behaviour

1. Update Task 07's four featured **View Case Study** actions to point to their actual working detail routes after those routes are implemented. Do not alter project order, filters or card semantics.
2. Verify filtering continues to work. Navigating to a detail page must not accidentally break the originating gallery and returning to `#projects` should land correctly under the sticky navbar.
3. Use consistent case-study URL fields derived from the canonical project data, if practical. Do not add another conflicting set of hardcoded detail URLs.
4. Provide a back-to-projects link near top and bottom; ensure the correct absolute/home path from nested routes.
5. Related project links lead only to actually implemented Task 08 pages. Do not generate false secondary-project detail links.
6. On deep-linked detail pages, the global navbar's Home/About/Skills/Projects/Experience/Contact entries must navigate properly to the corresponding home sections instead of targeting missing IDs on the detail page.
7. Keep card GitHub/Demo buttons separate from detail navigation and avoid nested links.
8. If the gallery supports `aria-current`, ensure the detail page doesn't leave stale/current state on the wrong item.

---

## 8. Work sequence — do in order

### Phase A — Audit and verification
1. Inspect current repository, base branch and uncommitted changes; read the Task 07 project source and existing documentation.
2. Verify approved Task 07 integration and identify all four project records and existing CTAs.
3. Inventory screenshots, approved descriptions, code/readmes, technical facts, status, team roles and real demo/repo links. Record evidence/unknowns in a working checklist.
4. Identify routing and deployment model; decide final URLs and prove direct refresh strategy before implementing all pages.

### Phase B — Architecture and implementation
5. Create the dedicated feature branch.
6. Extend project data with long-form case-study content, keeping summary and full-body information synchronised.
7. Implement reusable page shell, breadcrumb/back links, hero/media, metadata, content sections, technical explanations, CTA layout and related-project links.
8. Add four individual case studies in the agreed order, using precise supported project-specific descriptions and clearly distinguished statuses.
9. Extend Task 07 featured gallery CTAs to valid detail URLs.
10. Ensure nested routes resolve all site assets and global nav links.

### Phase C — Polish and verification
11. Style with Porcelain Arctic and existing shared components; keep copy concise and content hierarchy strong.
12. Add per-page metadata and appropriate media alt/captions, with verification of external URLs.
13. Test desktop/mobile, navigation, direct load, refresh, unknown slug/404, browser Back/Forward, keyboard access, reduced motion, media fallbacks, and previous-site regressions.
14. Create `docs/PROJECT_CASE_STUDIES.md` explaining route map, content model, fact-check table, data maintenance, verified links, asset sources, deployment behaviour and how future project case studies can be added.
15. Run available automated checks and any local production preview/deep-link tests supported by the actual project; inspect the final diff and commit a scoped change.

---

## 9. Git workflow — separate Task 08 branch

Use the repository's **actual approved integration branch**; `main` is only the default example below.

```bash
git status
git switch main
git pull --ff-only origin main
# Inspect current commit and confirm Tasks 02–07 are integrated.
git switch -c task/08-project-case-studies

# Complete Task 08 only; run project-appropriate verification.
git diff --check
git diff --stat
git status
# Stage ONLY files belonging to Task 08, not unrelated work.
git add <specific Task 08 files>
git commit -m "feat: add detailed flagship project case studies"
git push -u origin task/08-project-case-studies
```

- If the approved base is `develop` or another feature-integration branch, adapt deliberately and identify it in the completion report.
- If the branch already exists, inspect rather than overwrite it; do not blindly recreate.
- Never use force-push, destructive reset, broad file cleanup or automatic merge.
- A PR for review is optional if the current workflow calls for it; **do not automatically merge or deploy**.

---

## 10. Required validation matrix

### Content and project identity
- [ ] Four pages: FlowPilot AI, CORTEX, MediGuardian AI, INFRAOS, in that order where ordered lists appear.
- [ ] No invented metrics, awards, clients, deployment claims, technical components or fabricated screenshots.
- [ ] Roles distinguish Divejikan's contribution from team work.
- [ ] CORTEX status and ownership/repository credit are accurate.
- [ ] INFRAOS is explicitly presented as **In Development** with implemented/planned distinction.
- [ ] MediGuardian avoids diagnostic/medical guarantee claims; no private patient data.
- [ ] Verified demos/repos only; absent URLs do not show dead CTAs.
- [ ] Media/copy genuinely differs by project; no filler duplicated just to lengthen pages.

### Navigation / routing
- [ ] Four featured cards open the intended individual pages.
- [ ] Each case-study route works by direct entry and refresh, including deployed-hosting strategy.
- [ ] All CSS/JS/fonts/images load correctly from nested pages.
- [ ] Home nav from detail pages returns to the right landing-page section.
- [ ] Back to Projects and related-project links work without `#` placeholders.
- [ ] Unknown slug has a real not-found experience, as applicable.
- [ ] Browser Back/Forward does not trap users or lose relevant hash navigation.

### Responsiveness / accessibility
- [ ] Inspect 320px, 375px, 768px, 1024px and 1440px widths, plus a transition width.
- [ ] No horizontal overflow, media cropping of important content or CTA overlaps.
- [ ] Long technical descriptions remain readable; lines and headings are well balanced.
- [ ] One H1/page, meaningful alt/captions, keyboard navigation and visible focus.
- [ ] Reduced motion keeps content visible and controls usable.
- [ ] Global navbar, sticky offsets, footer and skip link still work.

### Technical / regression
- [ ] Run available build, lint, typecheck and test commands **if configured**; report exact commands and outcomes.
- [ ] Run `git diff --check` and review changed files for unrelated modifications.
- [ ] Open each case-study URL locally; if preview/deployment testing is unavailable, disclose this rather than claiming it passed.
- [ ] Verify page-specific metadata and media URLs with the build output when feasible.
- [ ] Verify Task 07 filters, existing Home sections, custom cursor/Three.js, contact links and CV download remain operational.
- [ ] No secrets, large accidental generated files, debug output or unnecessary dependencies committed.

**Definition of Done:** The four flagship projects have accurate, beautifully presented, accessible, deep-link-safe case-study pages integrated with the existing gallery, backed by maintainable source data and documented verification. Task 08 is committed to its own feature branch and stopped before merge.

---

## 11. Required completion report

At the end, provide:

1. Repository, chosen base branch, feature branch, commit SHA and push/PR status.
2. Exact final four case-study URLs and routing/refresh implementation strategy.
3. Files created/modified, shared components and canonical content source.
4. Per-project published status and which details/URLs/assets were actually verified; list omitted/unverified facts separately.
5. Gallery CTA changes and related-project navigation.
6. Responsive, accessibility, SEO, metadata, image, and performance work completed.
7. Tests **actually run** with command/result, tests not run and reasons, and deployment checks if performed.
8. Regression checks, unresolved issues and steps required before production release.
9. Acknowledge **Task 09 — Experience & Ventures** as next. Do not implement it.

---

## 12. Final instruction

**Execute ONLY Task 08.** Inspect the actual Portfolio V2 repository; confirm Task 07 is integrated; build trustworthy case studies for FlowPilot AI, CORTEX, MediGuardian AI and INFRAOS; connect the existing Featured Projects gallery; preserve every previously completed feature; verify direct-route/deep-link behaviour, facts, responsiveness and accessibility; document the implementation; commit and push the focused `task/08-project-case-studies` branch; **do not merge, deploy or proceed to Task 09**.
