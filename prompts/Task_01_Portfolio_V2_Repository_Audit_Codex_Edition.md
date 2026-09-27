# Task 01 — Repository Audit & Migration Foundation
## Divejikan Portfolio V2 | Enhanced Codex Edition

**Task ID:** `TASK-01`  
**Task type:** Read-first audit, baseline verification, migration planning and documentation  
**Working repository:** `divejikan-yuvarajah/Divejikan-Portfolio-V2` (the **new** repository containing a copy of the existing files)  
**Reference repository, READ-ONLY:** `https://github.com/divejikan-yuvarajah/Mister_PersonalPortfolio`  
**Branch:** `task/01-repository-audit`  
**Target theme for future tasks:** **Porcelain Arctic**  
**Do not implement the redesign in this task.**

---

## 1. Your Role and Mission

Act as a senior frontend engineer, repository auditor, UI architecture consultant, accessibility reviewer, and careful technical documentation author.

The owner is Yuvarajah Divejikan, a software and AI/ML developer and tech entrepreneur. The existing website is a personal developer portfolio; Portfolio V2 will modernize its brand, content, architecture, responsiveness, and presentation in later tasks.

Your mission in **Task 01 only** is to establish an evidence-based understanding of the copied codebase, assess risks, capture a reproducible baseline, and create a scoped migration plan so future Codex tasks can modify it safely. Preserve existing behavior and user assets. Do not substitute a generic starter portfolio.

### Source-of-truth rules

- The **new working repository** is the only repository you may edit.
- The original `Mister_PersonalPortfolio` repository and its live site are **read-only references**. Never push to, alter, or redeploy them.
- Inspect the working tree rather than assuming that its contents precisely match the reference repository. If the working repository does not exist or contains no copied portfolio files, stop without inventing files or initializing a new UI; report the prerequisite.
- Distinguish **observed facts** from **recommendations** and **unverified assumptions** in all documentation.
- Do not invent personal details, project outcomes, links, screenshots, certifications, dates, technologies, or metrics. Where content must be confirmed by the owner, record `Needs owner confirmation`.
- If you encounter unrelated in-progress changes, preserve them; do not reset, force-push, or overwrite them.

---

## 2. Verified Starting Clues — Re-check Them in the New Repo

The prior reference-repository inspection found the following; treat this as an audit checklist, **not** as a substitute for inspecting the actual workspace:

```text
README.md
index.html
css/
  style.css
js/
  main.js
  animations.js
  skills.js
  three-scene.js
images/
  project screenshots, profile photo and My_CV.pdf
```

The reference `index.html` is relatively large (about 56 KB) with substantial content markup and inline style attributes; `css/style.css` is about 29 KB. The main script imports the animation, skills, and Three.js modules. The page uses an import map and `type="module"` for JavaScript. The Three.js module imports `three` through that setup. Examine whether the copied repository preserves all these dependencies and whether a static development server is sufficient for the actual source.

Observed older content includes JARVEX, StockFlow, FocusFlow and other archived projects, plus a freelance Software Developer experience entry. The later content-update tasks should replace or reposition outdated content, **but Task 01 must only inventory and flag it**.

Also inspect every item in `images/`, especially actual usage of `profile_new.jpeg`, project screenshots, and `My_CV.pdf`. **Never delete or silently replace assets during this task.**

---

## 3. Hard Scope Boundaries

### Required in Task 01

1. Verify environment, Git status and branch safety.
2. Audit the full folder/file structure and dependency loading.
3. Inventory current sections, features, interactive elements, images, and external links.
4. Review baseline behavior at useful desktop, tablet and mobile widths, if browser preview is available.
5. Examine code quality, semantic HTML, accessibility, responsive CSS, performance risks and maintainability.
6. Examine SEO/meta tags, form behavior, external integrations and stale content.
7. Compare sensible architecture options for a V2 migration.
8. Create the documentation deliverables in Section 8.
9. Run and record non-destructive verification.
10. Commit the documentation on the designated feature branch.

### Explicitly out of scope

- No visual redesign, theme switch or font replacement yet.
- No React, Next.js, Vite, Tailwind, TypeScript, GSAP, or other framework migration yet.
- No new portfolio pages or new UI components.
- No content rewrite to claim new achievements, roles or technologies.
- No deletion of old projects, media, CV, 3D scene or existing sections.
- No dependency installation or broad dependency updates without a demonstrated need for audit verification.
- No editing `.env`, tokens or production deployment settings, except reporting safe observations without exposing secrets.
- No modifying or pushing to the original repository.
- No automatic merge into `main`, no force-push, no changing remote URLs or deployment settings.

Keep implementation confined to audit documentation and, only if useful, non-functional repository housekeeping such as a **new** `.gitignore` that is justified and has no collateral effects. Prefer documentation-only changes.

---

## 4. Git Workflow — Follow Exactly

Run commands in the new repository, not the old one. Inspect outputs before every state-changing command.

```bash
pwd
git remote -v
git status --short
git branch --show-current
git log -1 --oneline
```

Check that `origin` points to **Divejikan-Portfolio-V2** and **not** `Mister_PersonalPortfolio`. If not, **stop and report the mismatch**. Do not change a remote automatically.

If there are unrelated uncommitted changes, do not discard or overwrite them. Ask for human intervention through your final report if they block clean branch creation.

If the working tree is clean:

```bash
git switch main
git pull --ff-only origin main
git switch -c task/01-repository-audit
```

If this branch already exists, inspect it and resume carefully instead of recreating or resetting it. If `main` is not the default branch, report the discrepancy rather than guessing. No blind checkout that could lose work.

Before any commit:

```bash
git status --short
git diff --check
git diff --stat
git diff
```

Commit only Task 01's intended files using a descriptive message, e.g.:

```bash
git add docs/ARCHITECTURE.md docs/AUDIT_REPORT.md docs/IMPLEMENTATION_PLAN.md docs/CONTENT_ASSET_INVENTORY.md docs/BASELINE_CHECKS.md
git commit -m "docs: audit portfolio v1 and plan v2 migration"
```

If Git author identity, permissions or upstream configuration block a commit, report the blocker honestly; do not fake completion. Push the branch **only if remote push is available and consistent with the workspace's normal permissions**:

```bash
git push -u origin task/01-repository-audit
```

Do not create or merge a PR without an explicit subsequent instruction. Provide the branch and commit SHA if available.

---

## 5. Full Technical Audit Checklist

### A. Repository and runtime

- List all tracked files, root directories, extensions, sizes and likely roles. Distinguish used assets from uncertain/unused assets.
- Verify whether a `package.json`, build script, lockfile, tests, CI, deployment configuration and environment files exist. Do not pretend they exist if absent.
- Inspect `README.md` for outdated file-tree instructions and compare it with actual directory layout.
- Inspect the HTML import map and external CDNs/fonts/scripts. Verify that `js/main.js` and its module imports resolve when served over HTTP.
- Identify the existing hosting/build assumptions for Vercel. Do not edit live deployment.
- Flag third-party package/CDN version pinning and external availability as risks where applicable.

### B. Page structure and UX

Inventory all actual sections and anchors from the code, including the hero, About, skills/technical expertise, projects, experience, education, certifications, contact and any extra sections. For each: record selector/anchor, content source, interactions, observed or likely layout issues, and the eventual V2 disposition (`retain`, `rewrite`, `archive`, `rebuild`, or `owner decision`).

Inspect:

- Navigation and mobile-menu toggle, close behavior and keyboard usability.
- Anchor/link destinations, CV path, external social/project/demo links.
- Project cards and screenshots; missing or duplicated media.
- Skills filtering and behavior of cards when filters are switched rapidly.
- Cursor effects and intersection-based reveal animations.
- Three.js particle background, import-map loading, viewport resize, frame scheduling and small-device behavior.
- Contact form behavior: whether it is functional, validation-only, placeholder, or relies on a third party. **Do not claim messages send without testing.**
- Static content that is stale or contradictory to the owner's forthcoming updated CV and portfolio brief.

### C. Code maintainability

- Find duplicate/conflicting selectors, deeply coupled sections, hardcoded content, global state, inline styles, magic values, unused code, dead links, and missing separation of responsibilities.
- Review naming conventions, semantic structure, reusable patterns, and where future project/experience content should live.
- Provide concrete file-and-selector-level evidence for significant findings instead of vague criticism.
- Do not run formatting tools over the whole codebase in Task 01.

### D. Quality and accessibility

- Heading hierarchy, landmarks, navigation labels and image `alt` text.
- Keyboard navigation, focus-visible states, interactive semantics and menu accessibility.
- Colour contrast and readability of the **existing** palette; recommendations for the future palette only.
- Reduced-motion support and fallback behavior if WebGL is disabled or unavailable.
- Layout overflow and target sizes on mobile.
- Meta title/description, canonical/OG tags, page language, favicon and likely SEO issues.
- Large images, compression opportunities, animation/CPU/GPU risks, CLS/LCP issues as assessable. Mark estimates as estimates.
- Privacy/security observations, including exposure of contact details (do not copy secrets into documentation).

### E. Suggested viewport baseline

When the available environment supports browser preview, document observations at approximately `375px`, `768px`, and `1440px`, plus keyboard navigation. If browsers/screenshots are unavailable, write `Not executable in this environment`, then provide precise manual reproduction steps; never assert that visual checks passed without running them.

Use a local static HTTP server as appropriate, e.g.:

```bash
python -m http.server 8000
```

Do not use `file://` to validate ES modules. Avoid modifying project files to make a test pass. Record any console exceptions, missing assets, network dependencies or limitations.

---

## 6. V2 Design Direction — Planning Only

**Theme name:** Porcelain Arctic (combines Arctic Blue & Slate with Porcelain & Cobalt).

| Design token | Proposed value | Intended usage |
|---|---|---|
| Background | `#F8FAFC` | Main canvas |
| Porcelain surface | `#F5F4F0` | Alternating sections |
| Card | `#FFFFFF` | Elevated content surfaces |
| Heading | `#0F172A` | Headlines and emphasis |
| Body | `#475569` | Supporting prose |
| Primary cobalt | `#2563EB` | Main CTA, links, selection |
| Arctic blue | `#60A5FA` | Gentle secondary accents |
| Light highlight | `#DBEAFE` | Chips and hover backgrounds |
| Border | `#E2E8F0` | Dividers and outlines |
| Primary hover | `#1D4ED8` | CTA hover |

**Typography direction:** Manrope for headings, Inter for body, JetBrains Mono for technical labels; use sensible local/fallback font stacks, and do not add font dependencies yet.

Plan a clean, editorial-feeling, distinctive engineer/founder portfolio with carefully restrained animation. Avoid generic dashboard UI, excessive cards, unbounded 3D effects or neon styling. Document design principles and anticipated implementation choices, but apply **zero** new theme styles in Task 01.

---

## 7. Proposed Content Architecture — Record for Future Tasks

Evaluate a section ordering suitable for the owner's V2 goals:

1. Hero — Software Engineer (AI/ML) and tech founder positioning.
2. About — concise biography and current technical focus.
3. Featured Projects — evidence-rich, role-specific case studies.
4. Experience & Ventures — Founder & CEO at Zatroz; Co-Founder & Technical Lead at Softora; relevant prior work.
5. Technical Expertise — grouped, verifiable technologies instead of fabricated numeric skill ratings.
6. Achievements — documented awards and competition milestones.
7. Leadership & Community — university/community roles.
8. Education & Certifications.
9. Contact and verified professional links.

Record **proposed** project content order for later owner review:

- FlowPilot AI
- CORTEX
- MediGuardian AI
- INFRAOS (clearly marked in development)
- InvoiceX AI
- JevFlow (verify status and links)
- Thinky
- HireQueue
- PowerGuard IoT (academic project; verify current stage)
- Older projects such as JARVEX, StockFlow and FocusFlow in an archive rather than being silently removed.

These are **planning inputs**, not permission to insert unverified claims. Audit the links/assets currently available and create an owner-confirmation checklist for missing screenshots, current CV, startup start dates, tech stack variations, live-demo URLs, role descriptions and competition result wording.

---

## 8. Mandatory Deliverables — Create Exactly These Documents

Create a `docs/` directory if it does not exist. Write the following in clear Markdown with actual observations and source paths:

### `docs/AUDIT_REPORT.md`

Include: executive summary; current repository facts; inventory of sections and functionality; categorized issues by severity (`Critical`, `High`, `Medium`, `Low`); concrete evidence (file path and selector/line where possible); impact; recommended future task; uncertainties; and explicit `not tested` labels where appropriate.

### `docs/ARCHITECTURE.md`

Include: factual **current** architecture diagram (Mermaid or simple text); script/import dependencies; asset loading; deployment assumptions; separation-of-concerns assessment; options comparison between **(A) improved vanilla HTML/CSS/JS** and **(B) a componentized React + TypeScript/Vite frontend**; tradeoffs, migration effort and recommendation with rationale. Mark the framework choice as a **proposal pending owner approval**, not an implemented decision. Outline a proposed future data/content structure and reusable component boundaries.

### `docs/CONTENT_ASSET_INVENTORY.md`

Include one inventory table for actual HTML sections, one for image/PDF files with their current references and estimated use, one for project cards/external links, one for current experience/education entries, and a **Needs owner confirmation** section. Do not print sensitive data, secrets or full personal contact details unnecessarily. Differentiate missing link, placeholder link, functional link and not tested.

### `docs/BASELINE_CHECKS.md`

Provide commands or procedures actually run; results with pass/fail/not-run; preview environment; viewport coverage; navigation/skills/filter/animation/form/3D baseline; console or network errors; and exact reproduction steps for outstanding bugs. A `not run` outcome is acceptable; fabricated passing checks are not.

### `docs/IMPLEMENTATION_PLAN.md`

Write task dependencies and scope boundaries across the future workstreams:

| Task | Purpose |
|---|---|
| 01 | Repository audit and migration foundation |
| 02 | Porcelain Arctic design tokens and foundations |
| 03 | Navbar and responsive navigation |
| 04 | Premium hero |
| 05 | About section |
| 06 | Technical expertise |
| 07 | Featured project gallery |
| 08 | Project detail/case-study pages |
| 09 | Ventures and experience |
| 10 | Achievements |
| 11 | Leadership/community |
| 12 | Education and certifications |
| 13 | Contact/social integration |
| 14 | Motion and GSAP interactions |
| 15 | Responsive polish |
| 16 | SEO, accessibility and performance |
| 17 | End-to-end test, regression and deployment |

For each, describe input dependencies, key deliverables, acceptance gate, and explicit non-goals. Add a migration decision gate before introducing React/Vite or other tools. Designate separate feature branches and normal commit/review/test/merge cleanup process for future tasks. Do not begin Tasks 02–17.

---

## 9. Acceptance Criteria

Task 01 is complete only if:

- [ ] The repository/remote/branch were verified before edits.
- [ ] The old repo was not modified.
- [ ] The actual source files, assets, page sections and JS dependencies were examined.
- [ ] Outdated content and links are flagged rather than silently rewritten.
- [ ] The README-versus-real-tree difference is documented if present.
- [ ] All five required documents exist and include evidence, not generic placeholders.
- [ ] Any proposed framework migration is justified and **not executed**.
- [ ] Browser/console/responsive checks are recorded honestly as pass, fail or not run.
- [ ] Existing source files and media remain unchanged unless a tiny justified non-functional housekeeping edit was necessary.
- [ ] `git diff --check` passes, or a failure is reported with its details.
- [ ] The task branch is committed if permissions allow; no merge to `main` occurred.

---

## 10. Required Final Codex Report

At the end, provide this precise, compact structure:

```text
TASK 01 — REPOSITORY AUDIT COMPLETE / BLOCKED / PARTIAL

Repository and branch:
Commit SHA and push status:
Files created or changed:
Observed architecture and dependency summary:
Top 5 findings (each with evidence):
Baseline checks (pass/fail/not run):
Recommended migration approach and tradeoffs:
Owner confirmations needed:
Risks or blockers:
Task 02 readiness (yes/no and why):
```

**Stop after Task 01. Do not run Task 02, rewrite the portfolio, change its live deployment, or merge the branch.**
