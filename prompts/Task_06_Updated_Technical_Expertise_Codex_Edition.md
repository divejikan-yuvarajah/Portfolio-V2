# Portfolio V2 — Task 06: Updated Technical Expertise
## Complete Enhanced Codex Edition Prompt

**Project:** Divejikan Portfolio V2  
**Task:** 06 of 17 — Updated Technical Expertise Section  
**Feature branch:** `task/06-technical-expertise`  
**Visual system:** Porcelain Arctic  
**Scope:** Implement Task 06 ONLY. Do not redesign the Projects section (Task 07) or any later section.

---

## 1. Your role and mission

Act as a senior frontend engineer, UI/UX architect, accessibility specialist, and technical portfolio editor. Redesign the existing **Technical Expertise / Skills** section into a polished, responsive, truthful, scannable representation of Divejikan's current engineering toolkit and areas of growth.

The result must feel like an engineering portfolio—not a generic template with dozens of badges, made-up skill percentages, or unsupported claims. Use the approved Task 02 Porcelain Arctic design foundation, integrate with the previously completed navigation/Hero/About sections, and preserve all other working features.

**Do not automatically merge, deploy, or proceed to Task 07.**

## 2. Inspect before implementing (mandatory)

1. Inspect the CURRENT Portfolio V2 working tree and repository structure. The original `Mister_PersonalPortfolio` had `index.html`, `css/style.css`, `js/main.js`, and `js/skills.js`; these are only legacy reference paths. Follow actual V2 paths, framework, component conventions, and build system.
2. Read the actual Task 01 architecture/implementation plan and Task 02 design-system documentation if present. Inspect completed Tasks 03–05 and the existing skills section, any skill filters, associated CSS/JS, icons, data files, and in-page anchor `#skills` (or its approved equivalent).
3. Verify that Tasks 02–05 are present on the approved integration base. If dependencies are unmerged or the working tree has unrelated changes, report the problem and stop rather than silently overwriting or basing on unapproved work.
4. Find actual evidence in existing portfolio data, user-provided CV/content, project repositories, and agreed task content for each technology. **Do not invent courses, certificates, years of experience, proficiency levels, production deployments, or company-specific responsibilities.** Use the content guidance below as a *candidate taxonomy*, not proof of mastery.
5. Before coding, briefly document current problems, proposed design, files to edit, and any content that needs confirmation. Avoid turning an uncertain technology into an established expert skill.

## 3. Portfolio positioning and content strategy

The section should support this identity: **Software Engineer (AI/ML) · Full-Stack Builder · Tech Entrepreneur**. Show a practical mix of software engineering, AI integration, automation, databases, cloud/deployment and developer tooling. Prefer concise category labels and short descriptors over a wall of buzzwords.

### Proposed skill categories (verify against real work)

| Category | Candidate items / evidence to check |
|---|---|
| Programming & Fundamentals | Java, JavaScript, TypeScript, Python, SQL, HTML, CSS, OOP, REST APIs |
| Frontend Engineering | React, Next.js, Tailwind CSS, responsive UI, component-based design; shadcn/ui only if used |
| Backend & API Integration | Node.js, Express.js, FastAPI, REST integration, authentication; Spring Boot ONLY as learning/current exploration if not built with it |
| AI Engineering & Automation | LLM/API integration, RAG, prompt engineering, AI agents/agentic workflows, n8n, OCR/document automation, MCP where there is demonstrated use |
| Databases & Data | PostgreSQL, Supabase, MySQL, MongoDB where supported by project work; pgvector if used in CORTEX/MediGuardian or another verified project |
| Cloud, DevOps & Developer Tools | Git, GitHub, GitHub Actions, Vercel, Docker, Postman, VS Code, Cursor; AWS as fundamentals if appropriate |
| Design & Product | Figma, FigJam, UI/UX prototyping, v0 where genuinely used |

**Editorial decisions:**
- Present TypeScript, Next.js, n8n, Supabase, API integration and Java/Python where supported by project evidence. Do not call every listed skill “advanced.”
- Some subjects are actively being learned (for example React/Node/Spring Boot/cloud topics). If a separate “Currently exploring” row is useful, use it to communicate learning honestly, and verify the current status before displaying it.
- Do NOT treat FastAPI as a programming language, Supabase as merely a database engine, or Cursor/v0 as programming languages.
- Do NOT automatically carry forward outdated CV technologies such as PHP or unverified platforms just because they appear in an older document.
- Do NOT show percentages like “React 95%,” arbitrary progress bars, ratings, seniority labels, or fake endorsements.
- Keep a meaningful, curated selection (roughly 20–30 visible items maximum, depending on verified breadth). Prefer relevance and legibility to volume. Move fringe tools out of primary view if necessary.
- If any logo or icon is used, keep its text label visible. Avoid broken remote logos and oversized brand colour clashes.

### Optional proof-of-work relationships

Use *real* project evidence when helpful, without recreating the full Projects section:
- FlowPilot AI — fintech integrations, full-stack application, APIs.
- CORTEX — enterprise software, AI-oriented product architecture; verify actual implementation vs planned capabilities.
- MediGuardian AI — document extraction, AI/record retrieval; avoid making medical efficacy claims.
- InvoiceX AI — n8n, OCR, automation and Supabase.
- Thinky — JavaScript/Chrome Extension, model API integration.
- INFRAOS — planned/in-development stack; do not imply completed production usage.

If adding short “used in” micro-labels, limit them to a few verifiable examples and link only to confirmed project anchors/routes. Do not silently invent demo or GitHub URLs.

## 4. Visual direction — Porcelain Arctic

Use existing semantic design tokens from Task 02, rather than duplicating raw values across components. Reference palette:

| Role | Reference value |
|---|---|
| Main background | `#F8FAFC` |
| Porcelain alternate | `#F5F4F0` |
| Card surface | `#FFFFFF` |
| Navy heading | `#0F172A` |
| Slate text | `#1E293B` |
| Muted copy | `#475569` |
| Cobalt primary | `#2563EB` |
| Arctic secondary | `#60A5FA` |
| Pale blue hover/background | `#DBEAFE` |
| Border | `#E2E8F0` |

Typography: Manrope heading, Inter body, optional JetBrains Mono for small labels. Follow existing responsive container, spacing, border radius, focus-ring and motion rules.

### Desired composition

1. Clearly anchored section: **Technical Expertise** with a one- or two-line human introduction such as “A practical toolkit shaped by building AI-powered products, full-stack applications, and automations.” Adapt to actual verified content.
2. Consider a featured row for the **core working toolkit** (3–6 highlighted items) if visually useful and substantiated, followed by clearly organised category cards or grouped skill lists.
3. Cards should have considered spacing, short headings, readable labels and a subtle cobalt/arctic interaction—not neon glows, heavy gradients, or dense dashboard decoration.
4. Keep enough white space, but avoid giant empty areas at desktop/tablet sizes. Make labels wrap naturally and avoid awkward one-card orphan rows.
5. The section must visually belong to the existing Hero/About design. Do not change the global palette, navbar or unrelated cards just to make this section work.
6. Add at most restrained, purposeful reveal motion. No continuous floating/marquee skill-logo effects; respect reduced-motion preferences.

## 5. Interaction specification

Choose the simplest interaction that fits the current implementation and content size. **Preferred:** grouped categories visible by default for recruiter scanning. If retaining/upgrading the previous filter bar, implement it accessibly and preserve its functionality:

- Use native filter `<button type="button">` elements with concise labels; include **All** as the default.
- `aria-pressed` accurately reflects which filter is active. A selected style cannot rely on colour alone.
- Selecting a category displays ONLY its associated items, or scrolls to a category when using a documented alternative; the control's behaviour must be unambiguous.
- No disappearing items from an uninitialised JS state: content remains legible if JavaScript fails or before scripts initialise (progressive enhancement).
- Hidden items should not remain in the keyboard tab order. Manage `hidden`/DOM semantics appropriately, not visual opacity alone.
- No mixed state between selected filter, visible cards and count; avoid duplicate click handlers.
- If a result/count message is used, make it discreet and announce updates with a suitable `aria-live` region without excessive chatter.
- Preserve natural keyboard behaviour (Tab, Enter, Space), visible focus outlines and pointer/touch usability. Do not implement unnecessary custom roving-tabindex controls.
- All skill content remains indexable/readable in the page source where practical; avoid remote fetching merely to populate static skills.

If the previous filter UI is removed in favour of clearly visible categories, remove or safely retire now-unused handlers/styles and document that decision. Do not leave broken dead controls.

## 6. Maintainability and implementation details

- Use the actual repo architecture. For a vanilla HTML/CSS/JS site, a dedicated data module such as `js/data/skills.js` and renderer/interaction module may be appropriate, but only introduce abstraction when it reduces duplication and is compatible with current scripts. For React/Next.js, use idiomatic typed data/components and follow existing architecture.
- Each skill item can have a stable ID, name, category, short descriptor (optional), verification/status (internal if needed), and optional local icon reference. Use consistent field names and avoid duplicated string content.
- Separate content/data from styling/behaviour where reasonable. Keep data easy to update after new certifications or projects.
- Keep real section IDs and navigation links stable, especially `#skills` unless the approved project architecture says otherwise.
- Use scoped class names or CSS modules according to the actual framework. No global `button`, `section`, `svg`, `span` selectors that unexpectedly restyle other sections.
- Avoid external icon CDNs, runtime API keys, intrusive tooltips and new large dependencies. Existing icon primitives or lightweight inline SVGs are fine when labelled and accessible.
- Ensure asset paths work in local development and production build, including Vercel base paths if applicable.
- If the project's existing `skills.js` is responsible for filters or animated counters, update it intentionally; avoid introducing a second competing initialiser.
- Do not alter project descriptions, resume files, company/experience content, the Navbar, Hero or About copy in this task.

## 7. Responsive and accessibility standards

Test representative widths **320, 375, 768, 1024 and 1440 px**, plus one in-between breakpoint. Acceptance:

- No horizontal scrolling, collisions, clipped badges or inconsistent card heights that damage readability.
- Mobile: comfortable one-column reading, labels wrap cleanly, filters scroll/wrap accessibly if used, no tiny touch controls.
- Tablet: balanced layout with deliberate column count, not cramped desktop cards.
- Desktop: aligned category cards, appropriate line lengths and no large dead zones.
- Heading hierarchy is semantic (`h2` for section heading, `h3` for category titles where appropriate).
- Meaningful contrast at least WCAG AA for normal text; focus ring is visible against all surfaces.
- Icons are decorative when a visible text label carries meaning; no icon-only unlabeled skills.
- Filter controls have accessible names, correct selection semantics and keyboard support.
- Animations honour `prefers-reduced-motion` and do not hide essential content.
- Screen-reader reading order follows the visual order.

## 8. Execution stages — follow sequentially

### Stage A — Baseline and branch

1. `git status`; inspect approved integration branch, last commits and Task 02–05 work.
2. Run current available lint/typecheck/build/test checks as a baseline; record any pre-existing failures without silently fixing unrelated code.
3. Confirm a clean tree. If dirty with unrelated changes, stop/report, never discard them.
4. Pull the approved base with `--ff-only`; verify prior tasks are present.
5. Create `task/06-technical-expertise`.

### Stage B — Content audit

1. Inventory the old skills and categorisation.
2. Identify outdated/duplicated skills, proficiency bars and vague claims.
3. Build a short, curated verified skills dataset using the taxonomy above and actual available evidence.
4. Distinguish demonstrated tools from ongoing learning when shown.
5. Decide whether visible category cards or functional filter buttons are the simplest recruiter-friendly presentation.

### Stage C — UI and behaviour

1. Implement the section hierarchy, content and responsive design.
2. Reuse Task 02 tokens and section primitives.
3. Update/refactor relevant skill filter logic without regressions.
4. Make controls, focus states and dynamic state accessible.
5. Add only restrained motion, if needed.

### Stage D — Documentation and verification

1. Create/update `docs/TECHNICAL_EXPERTISE.md` covering categories, content provenance and update instructions, component/data location, optional filters and accessible behaviour.
2. Validate anchors, console output, responsive layouts, keyboard interaction and reduced-motion.
3. Test adjacent About/Projects boundaries and existing navbar active-section state.
4. Run available repo scripts and `git diff --check`; inspect full diff and status.
5. Commit only Task 06 changes and push the dedicated branch if network/permissions allow. **Do not automatically merge or deploy.**

Suggested commands (adapt only to the repo's approved base/actual scripts):

```bash
git status
git switch main
git pull --ff-only origin main
# Verify Tasks 02–05 are integrated before continuing.
git switch -c task/06-technical-expertise

# Make scoped changes and run real project validation.
git diff --check
git diff --stat
git status

git add <only-task-06-files>
git commit -m "feat: redesign technical expertise section"
git push -u origin task/06-technical-expertise
```

Never run `git reset --hard`, force-push, overwrite unrelated modifications, or secretly merge an incomplete task. If working from a different documented integration branch, state exactly which one and why.

## 9. Quality gates and acceptance checklist

### Content
- [ ] Existing skill inventory reviewed; every displayed claim checked against supported context.
- [ ] Relevant AI/ML, software and backend skills are well represented without overclaiming.
- [ ] No arbitrary percentage bars, made-up years, unsupported “expert” labels or fabricated links.
- [ ] Tools/databases/frameworks are classified correctly.
- [ ] No duplicated entries or spelling/capitalisation inconsistencies.

### Design
- [ ] Uses Task 02 Porcelain Arctic tokens, fonts, shadows and spacing.
- [ ] Well-proportioned, premium layout with meaningful category hierarchy.
- [ ] No mobile overflow or dead desktop whitespace at tested widths.
- [ ] Clear hover/focus/selected states and readable contrast.

### Functionality
- [ ] Valid skills section ID and Navbar anchor.
- [ ] All skill data renders on first load; no empty section from JS failure.
- [ ] If filters exist: All/default state, filtering, `aria-pressed`, hidden-state semantics and keyboard operation verified.
- [ ] No duplicate event handling, broken icons, console errors or runtime fetch dependency.
- [ ] Existing Navbar, Hero, About, Three.js/decorative canvas, project cards and CV link still work.

### Validation
- [ ] Run available lint/typecheck/build/tests where present; record exactly what ran.
- [ ] Run `git diff --check` and inspect for unrelated changes/secrets.
- [ ] Inspect 320, 375, 768, 1024, 1440px (or explicitly disclose unavailable browser testing).
- [ ] Keyboard and reduced-motion accessibility checked or clearly noted as unrun.
- [ ] Documentation added/updated; changes committed on own branch.

## 10. Required final Codex report

Return a concise but complete summary including:

1. Task number, repository, verified base branch, feature branch and commit SHA (if created).
2. Files created/modified and purpose of each.
3. Final displayed skill categories and content decisions; flag any unverified entries omitted.
4. Whether the previous filters were retained/improved or replaced, and why.
5. Responsive/accessibility decisions.
6. Commands and tests actually run with pass/fail results; explicitly list anything not tested.
7. Preserved features checked and any known issues.
8. Merge/PR status (do not say merged if not merged).
9. State clearly: **Task 06 complete; Task 07 not started.**

---

### Hard stop

Implement **Task 06 only**. Do not launch the Featured Projects Gallery (Task 07), individual case-study pages, global redesigns, unrelated content updates, deployment, or automatic merge. Prioritise factual skills, clean engineering presentation, maintainability and accessibility over decoration.
