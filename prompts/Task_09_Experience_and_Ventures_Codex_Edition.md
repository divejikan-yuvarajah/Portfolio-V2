# PORTFOLIO V2 — TASK 09
## Experience & Ventures — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task:** 09 of 17  
**Feature branch:** `task/09-experience-and-ventures`  
**Theme:** Porcelain Arctic  
**Scope:** Implement Task 09 ONLY. Do not implement Task 10 (Achievements) or Task 11 (Leadership & Community).

---

## 1. Role and objective

Act as a senior frontend engineer, UI/UX designer, accessibility reviewer and portfolio copy editor. Redesign the current Experience section into a sophisticated **Experience & Ventures** section showing Divejikan's startup roles separately from earlier employment. The content must be concise, factual, easy to scan and visually consistent with the approved Portfolio V2 implementation.

**Critical:** Do not invent founder start dates, company descriptions, customers, revenue, impact metrics, delivered client work, team sizes or responsibilities. Do not copy products between the two startups. Use current, user-approved portfolio/CV content wherever available and report unresolved facts.

## 2. Preflight and dependencies

1. Inspect the actual Portfolio V2 repository, its framework, files, section structure, design tokens, scripts and tests. Do not assume it still exactly matches the original vanilla HTML/CSS/JS portfolio.
2. Read existing documents if present: `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, and project/content documentation. Report missing documents; do not invent them.
3. Confirm Tasks 02–08 are merged into the approved integration branch. If Task 08 is still pending, report the dependency before creating the feature branch; do not silently use a stale or unrelated base.
4. Preserve working Task 03 navbar and `#experience` anchor, Task 04 Hero, Task 05 About, Task 06 Skills, Task 07 gallery, Task 08 case studies, CV link and existing Three.js/animation behaviours.
5. Keep the original `divejikan-yuvarajah/Mister_PersonalPortfolio` unchanged. Do not migrate frameworks, add heavy dependencies, modify unrelated copy, deploy or auto-merge.

## 3. Approved experience content

The following role titles are explicitly approved by the portfolio owner. Confirm dates against the latest approved CV where available.

### 3.1 Current ventures — prominent, in this order

**A. Zatroz**  
Role: **Founder & CEO**  
Status: Current / Present  
Tagline: **Building Digital Solutions That Power Business Growth.**  
Confirmed service areas: Website Development; AI Automation & Integration; Custom Software Solutions; Business Solutions & Branding.  
Known products in development: CORTEX (AI-powered enterprise business management operating system / ERP) and an AI Financial Operating System for SMEs.  
Start month/year: **Unconfirmed. Do not invent.**  
Official website: use only a confirmed URL; do not guess a domain.

Suggested restrained copy, edit only where confirmed information justifies it:
> Building Zatroz as a technology venture focused on practical websites, custom software and AI-enabled business solutions. Working on product direction, software architecture and tools that improve real business workflows.

Suggested bullets (maximum 2–3 and grounded in approved materials):
- Leading product direction and technical planning for business-focused software and AI solutions.
- Working across full-stack product development and AI integration.
- Developing CORTEX and an AI financial OS for SMEs as ongoing initiatives.

Do not imply commercial launch or paying customers without evidence. Do not turn a planned feature into a completed delivery.

**B. Softora**  
Role: **Co-Founder & Technical Lead**  
Status: Current / Present  
Official user-provided URL: **https://www.softora.lk/**  
Start month/year: **Unconfirmed. Do not invent.**  
Actual services, products, clients and detailed responsibilities: require verification from approved source materials or the official website if accessible.

Safe provisional copy:
> Co-founding Softora and contributing to technical direction, solution planning and software development.

Use only verified role-based bullets. Do **not** claim Softora built CORTEX, FlowPilot AI or other Zatroz projects. Do not copy Zatroz's service list or awards into Softora's entry. Verify the link response if network tools permit; otherwise document that the URL is user-provided but availability could not be checked.

### 3.2 Earlier professional experience — compact, in reverse chronology

**AARNA Eastern Lanka — Data Entry Clerk**  
Dates: **Aug 2024 – Sep 2024**, subject to confirmation from the latest approved CV. Use a concise verified description; no fictional accuracy percentages or workflow savings.

**Hatton National Bank (HNB) — Banking Trainee Intern**  
Dates: **Sep 2023 – Jul 2024**, subject to confirmation from the latest approved CV. Previously supplied CV supports assisting daily banking operations, customer inquiries, financial transactions, financial reporting, and service/process activities. Use up to two concise bullets; do not claim manager/compliance-officer authority.

### 3.3 Remove/avoid

- **Remove the former `Software Developer | Freelance (Upwork)` role from the displayed Experience section**, as requested by the user. Do not remove unrelated portfolio projects or Git history.
- Do not include AWS Student Builder Group in employment. Its community leadership story is reserved for **Task 11**.
- Do not list unverifiable numbers, client names, financial figures, titles or dates.
- Do not show `TBD`, lorem ipsum, mock metrics, dead company buttons or invented logos publicly.
- Do not use project dates as a proxy for founder employment start dates.
- If two sources conflict, document the mismatch and use only the most recently user-verified version.

## 4. Structure and content hierarchy

**Eyebrow:** PROFESSIONAL JOURNEY  
**Heading:** Experience & Ventures  
**Short introduction:** Building technology ventures and applying software engineering to practical business challenges, alongside previous professional operations experience.

Create **two clearly distinguished subgroups**:

1. **Current Ventures:** large, carefully balanced feature cards for Zatroz and Softora, with company, exact role, short factual paragraph, up to 2–3 concise responsibilities, Current badge, and verified external site link if available.
2. **Previous Experience:** cleaner, more compact timeline or stacked rows, showing AARNA Eastern Lanka followed by HNB with exact role labels and verified dates.

Make the section genuinely useful at a glance. Avoid repeating whole Task 08 project case studies. A restrained footer CTA may link to the existing `#projects` or `#contact` anchor, only if those IDs actually exist and the CTA improves layout.

## 5. Porcelain Arctic visual specification

Use semantic variables introduced in Task 02; the reference palette below is **not** permission to hardcode duplicate colors throughout the implementation.

| Role | Reference |
|---|---|
| Porcelain background | `#F8FAFC` |
| Warm secondary background | `#F5F4F0` |
| White card surface | `#FFFFFF` |
| Deep navy heading | `#0F172A` |
| Slate body | `#475569` |
| Cobalt accent | `#2563EB` |
| Cobalt hover | `#1D4ED8` |
| Arctic accent | `#60A5FA` |
| Soft active tint | `#DBEAFE` |
| Thin border | `#E2E8F0` |

- Manrope for headings, Inter for body; JetBrains Mono only for short category labels if consistent with Task 02.
- Use quiet executive/engineering aesthetics: restrained rounded corners, thin borders, measured whitespace and subtle surface separation.
- Use an unobtrusive accent or status indicator for active ventures; previous experience should have muted timeline markers.
- Do not turn company cards into loud marketing banners; avoid random gradients, excessive glow and oversized logos.
- Only use authentic, approved brand assets. If a logo is missing, show a tasteful wordmark or initials; do not fabricate logos.
- On hover: a subtle border/shadow/translate is sufficient. Respect `prefers-reduced-motion` and render all content legibly without JavaScript.
- Scope CSS to this section. Do not change global anchor, heading, card or button rules in ways that break the rest of the site.

## 6. Responsive requirements

- **Desktop (1024px+):** venture cards may sit side by side with balanced width; previous experience below, clearly delineated.
- **Tablet (~768px):** adapt card count to actual content; no tight headings or squeezed CTAs.
- **Mobile (320–430px):** one-column reading order, comfortable card padding, no horizontal scroll, links and long company/role names wrap correctly.
- Test 320, 375, 768, 1024 and 1440px, including an intermediate width where layout changes.
- Aim for ~44px touch targets and avoid massive dead vertical space. Keep card heights content-driven rather than setting an arbitrary tall minimum.

## 7. Accessibility and navigation

1. Preserve a stable `id="experience"` or update every incoming reference consistently if the current site intentionally uses a different anchor.
2. Use semantic `<section>` and appropriate heading order: section `h2`, company/role `h3` or framework equivalent. Do not introduce a second page `h1`.
3. Ensure the sticky header does not cover the section heading when using in-page navigation or direct hashes.
4. Website and CTA links must have descriptive names; if external new-tab links are used, set `rel="noopener noreferrer"`.
5. Do not create a `<time datetime>` value if an exact date is not verified. Plain `Present` is acceptable for startup role status.
6. Meaningful alt text for informative logos; decorative icons hidden from assistive tech.
7. Visible focus styles, logical tab order, WCAG AA-level contrast, usable touch targets.
8. Do not make a non-clickable card look like a link. Respect reduced-motion users and ensure progressive enhancement.

## 8. Technical implementation options

Follow the **current** architecture rather than the legacy repository assumptions.

For vanilla HTML/CSS/JS: update the real Experience markup in `index.html` (or its extracted partial); use scoped styles within the current design-system convention; optionally use a central `js/data/experience.js` if the rest of the portfolio is already data-driven.

For React/Next.js (only if actually introduced in earlier tasks): use idiomatic components, content data module and existing link conventions. Do not mix new ad-hoc DOM mutation with the framework's lifecycle.

Suggested fields if using a data model: `id`, `company`, `role`, `type` (`venture` or `employment`), `status`, `startDate` (nullable), `endDate` (nullable), `displayDate`, `summary`, `bullets`, `website` (optional), `logo` (optional), `order`. If dates are unknown, keep them nullable and use explicit ordering. Never fabricate timestamps to make sorting work.

## 9. Detailed implementation sequence

1. Inspect `git status`, base branch, current site and Task 02–08 integration.
2. Inventory old Experience markup/data, repeated copy, nav anchor, company links and responsive CSS.
3. Confirm the source of verified employment dates, official URL(s), startup copy and any existing assets. Record unresolved details for handoff rather than inventing them.
4. Update the approved base and create `task/09-experience-and-ventures`.
5. Build accessible heading and two content groups: **Current Ventures** and **Previous Experience**.
6. Add Zatroz and Softora with exact role labels; use truthful, concise copy and avoid unverified dates.
7. Add AARNA and HNB. Remove the outdated freelance/Upwork entry.
8. Apply Porcelain Arctic scoped styles and responsive layouts using existing tokens/components.
9. Integrate correct internal anchors and validate provided/approved external links.
10. Verify semantics, keyboard navigation, focus, reduced motion, contrast and reading order.
11. Check impact on navbar active links, Hero, gallery, case studies, CV, Three.js and other prior functionality.
12. Add/update `docs/EXPERIENCE_AND_VENTURES.md`: structure, facts used, content maintenance, source/verification gaps and start dates needing confirmation.
13. Run existing lint/build/test commands if present, and `git diff --check`; inspect mobile/desktop visually if browser tooling exists.
14. Review the final diff for unrelated changes or fake content. Commit and push the focused branch; do not merge/deploy.

## 10. Git workflow

Assuming `main` is the approved integration branch and Tasks 02–08 are merged:

```bash
git status
git switch main
git pull --ff-only origin main

# Confirm Task 02–08 dependencies, then:
git switch -c task/09-experience-and-ventures

# Implement and verify only Task 09
git diff --check
git status
git diff --stat

# Stage only Task 09 files (replace this placeholder with real paths)
git add <specific-task-09-files>
git commit -m "feat: redesign experience and startup ventures section"
git push -u origin task/09-experience-and-ventures
```

Use another base only if explicitly documented and approved in the repository. If the working tree has unrelated modifications, preserve them and report the blocker. No `reset --hard`, force-push, automatic PR merge or deployment. A PR may be prepared for review if appropriate.

## 11. Acceptance criteria and QA checklist

### Content
- [ ] Heading is **Experience & Ventures**; two clearly distinct subsections.
- [ ] Exact roles: **Founder & CEO — Zatroz** and **Co-Founder & Technical Lead — Softora**.
- [ ] Founder start dates are not invented; Current/Present is accurately communicated.
- [ ] Previous roles include **Data Entry Clerk — AARNA Eastern Lanka** and **Banking Trainee Intern — HNB** with date verification.
- [ ] Freelance/Upwork Software Developer entry removed from Experience.
- [ ] No invented metrics, responsibilities, brand assets or Softora project claims.
- [ ] AWS SBG role left for Task 11.

### Function and design
- [ ] Task 02 theme tokens and typography used, without global regressions.
- [ ] `#experience` deep link/nav link works with sticky-header offset.
- [ ] Website/CTA links are correct and any unverified URLs documented.
- [ ] Layout is balanced at 320, 375, 768, 1024 and 1440px; no overflow/clipped content or excessive gaps.
- [ ] Hover, focus, touch and optional scroll effects remain subtle.

### Accessibility and regression
- [ ] Semantic headings, informative link text, meaningful image alternatives, no fabricated date metadata.
- [ ] Keyboard focus and contrast checked; mobile tap targets usable.
- [ ] Reduced-motion support; content readable without animation.
- [ ] Existing navbar, Hero, About, Skills, projects, case studies, CV and Three.js unaffected.
- [ ] Actual test/lint/build results reported; unrun checks identified honestly.
- [ ] `git diff --check` passes and only Task 09 files are committed.
- [ ] No automatic merge, deployment or Task 10 work.

## 12. Required Codex completion report

Provide:

1. Task and branch name, base branch, commit SHA and PR URL if created.
2. Modified/created files and their purpose.
3. Final displayed role order and exact position labels.
4. Verification status of the Zatroz and Softora website links separately.
5. Missing facts (especially founder start months/years) needing user confirmation.
6. Design/accessibility implementation summary.
7. Commands and tests actually run, results and skipped checks.
8. Regression check results and outstanding issues.
9. Confirmation that the feature is **not yet merged or deployed**.
10. State **Next: Task 10 — Achievements & Hackathon Showcase**, but do not execute it.

---

**Final directive:** Implement **ONLY Task 09** from the approved current repository, use verified information, preserve the previous eight tasks, document content gaps, commit on its own feature branch, and stop before Task 10.
