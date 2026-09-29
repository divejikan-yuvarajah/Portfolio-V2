# PORTFOLIO V2 — TASK 12
## Education & Certifications — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task:** 12 of 17  
**Feature branch:** `task/12-education-certifications`  
**Theme:** Porcelain Arctic  
**Objective:** A professional, accurate and maintainable Education & Credentials section that distinguishes academic study, earned certifications, completed training and optional verified badges.  
**Scope:** TASK 12 ONLY. Do not start Task 13 (Contact), Task 14 (advanced animations), or later tasks.

---

## 01 — Agent role and non-negotiable operating contract

Act as a senior frontend engineer, accessibility specialist, product designer and evidence-conscious technical portfolio editor. Inspect the **actual Portfolio V2 repository**, rather than assuming that it still uses the legacy HTML/CSS/JS implementation or that it has migrated to Next.js. Reuse the architecture, data sources, components, styles, navigation and conventions implemented in prior approved tasks.

Before editing:

1. Inspect Git status, current and default/integration branches, existing files, actual package scripts and relevant architecture documents (if present).
2. Confirm Tasks 02–11 are integrated into the approved base before beginning Task 12. If they are only on separate unmerged branches, do not silently start from an outdated branch. Report the dependency and stop safely or use an expressly approved integration branch.
3. Read `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md` and existing content data/documentation when available. Report genuinely missing files; never pretend to have read them.
4. Inspect the existing `#education` and `#certifications` sections and all inbound links. Preserve stable anchors and make redirects/anchor changes only when justified and tested.
5. Preserve Navbar, Hero, About, Skills, Projects, case studies, Experience & Ventures, Achievements, Leadership & Community, Three.js and all working UI/links. Do not redo previous sections.
6. Do not invent qualifications, completion dates, credential numbers, expiration dates, grades, institution logos, issuer links, certificate URLs, academic honours, ranking, verified badges or claim official certification based on a practice exam.
7. This is **not** a request to enrol in courses, book certification exams or obtain credentials. Implement only the portfolio section.
8. No framework migration, new CMS, unnecessary icon/animation libraries or backend for this section.
9. Do not automatically merge to `main`, deploy, or implement future tasks.

---

## 02 — Content policy: accuracy first

Clearly distinguish:

- **Formal education:** degree/diploma/school qualifications.
- **Earned certifications:** only professional certifications that were actually passed and verifiably awarded.
- **Completed courses and training:** course completion certificates or learning-program completions; these are **not** interchangeable with an official professional certification.
- **Badges and recognitions:** only if awarded and relevant; do not imply a badge equals a professional certification.
- **In progress / planned:** include only when intentionally useful and specifically confirmed as current; otherwise omit from the published Credentials section.

Avoid representing a course as a certificate issued after a proctored exam, and avoid giving official badges, logos, dates or verification links where there is no evidence. Do not add numeric skill-proficiency bars or invented institution descriptions.

The user's earlier CV is a source of candidate content, but the **current approved CV and repository content should be checked before publishing**. Resolve contradictions in favour of the latest user-confirmed information. If still ambiguous, publish a narrower verified statement or omit the disputed detail and flag it in the final report.

---

## 03 — Education content to include

Present the following in reverse chronological order, using the latest confirmed wording/dates from the approved CV.

### 1. South Eastern University of Sri Lanka (SEUSL)

- **Qualification:** Bachelor of Information and Communication Technology (Honours) — `BICT (Hons)`.
- **Field:** Information & Communication Technology.
- **Faculty/department:** Faculty of Technology, Department of ICT — include only if supported by current approved CV/project content.
- **Timeframe:** `Oct 2024 – Present` in the prior CV. Update only if a newer approved source gives a verified start date.
- **Status:** Undergraduate / in progress; **not graduated**.
- Optional academic focus line: software engineering, artificial intelligence and machine learning — describe as interests/focus, not as a newly awarded degree specialization without evidence.
- **Do not show a completed degree, conferred honours classification, GPA or graduation date** unless confirmed.

### 2. London School of Business and Social Sciences

- **Qualification:** Diploma in Cyber Security.
- **Timeframe:** `Aug 2023 – Jan 2024` in the prior CV.
- Present as a diploma under Education. Do not convert it into a vendor cybersecurity certification.

### 3. T/T/Vipulananda College

- **Qualification:** G.C.E. Advanced Level — Engineering Technology stream.
- **Timeframe:** `2022/2023` as the prior CV displays.
- Prior CV also lists `ABC` results and `Z-Score: 1.6678`. Consider these optional: for a polished technical portfolio, default to a compact qualification/date entry and include grades only if explicitly approved or already intentionally visible in V2.
- Check institution spelling against current approved CV rather than silently normalizing a potentially different official English spelling.

Do not add invented coursework, university awards, research publications, thesis topics, faculty ranking, modules, or club positions. Community leadership belongs in Task 11.

---

## 04 — Credentials and completed learning content

Audit available CV/repo/user-provided certificates and implement the **verified subset**, with exact issuer and title.

Potential course/completion entries from the prior CV, subject to checking exact credential titles:

| Candidate group | Prior source wording | Safe treatment |
|---|---|---|
| Anthropic | AI Fluency; Basic and Advanced MCP courses | Completed Courses / Training, individually named if confirmed |
| Google | Google Analytics Certification; Google AI Essentials | Separate entries, retain issuer-specific exact titles only when verified |
| DataCamp | Data Science, Machine Learning and SQL courses | Completed Courses / Training; do not invent course titles or an accredited professional qualification |
| Microsoft Learn | Azure and Web Development courses | Completed learning modules/courses; not AZ-900, AI-102, etc. unless actually awarded |

Important distinction for AWS:

- AWS Certified AI Practitioner **practice exam** score or passing result is **not** an earned AWS certification. Do not place it in Formal Certifications.
- AWS Builder Center student verification is **not** an AWS certification.
- AWS Student Builder Group leadership/badge belongs primarily in Task 11 if already covered there; do not duplicate it as a formal credential.

Other certification names discussed/planned in prior user work (for example AZ-900, AI-900, AI-102, AWS Cloud Practitioner, GitHub GH-600, Postman Student Expert or Oracle Java credentials) must **not** appear under earned credentials without verified attainment.

If only course completion is verified, prefer section/tab labels like **Courses & Learning**, not **Professional Certifications**. If genuine official certifications are documented, show a separate **Certifications** group above courses. If no official certifications are verified, a polished heading such as **Credentials & Continuous Learning** is preferable to an empty formal-certifications panel.

Any certificate image/document contains personal data; do not expose credential IDs, verification numbers, email address or private links unless clearly public and approved.

---

## 05 — Suggested information architecture

One coherent visual section with preserved deep-link targets:

```text
EDUCATION & LEARNING
Building a strong technical foundation

[Education] [Credentials & Learning]  (optional local category controls)

Education:
  BICT (Hons) — SEUSL               In Progress
  Diploma in Cyber Security          Completed
  G.C.E. Advanced Level              Completed

Credentials & Learning:
  [Official earned certifications, ONLY IF VERIFIED]
  [Completed courses & programmes]
  [Optional verified badges, if not duplicated in Task 11]
```

Use **both** `#education` and `#certifications` if existing navbar links require them. A visually unified section may contain two separately anchored subsections, with appropriate `scroll-margin-top`. Do not break deep links or active navbar tracking from Task 03.

Recommended copy:

**Eyebrow:** `EDUCATION & LEARNING`  
**Main heading:** `Learning, Building & Growing` (or a clearer accessible equivalent)  
**Intro:** `Formal education and continued learning that support my work in software engineering and AI.`

Avoid generic hype like “mastered every technology” or “industry-certified AI engineer” unless true.

---

## 06 — Porcelain Arctic styling

Use the existing semantic token system from Task 02, with these reference values only if actual tokens need review:

- Background: `#F8FAFC`
- Warm alternate surface: `#F5F4F0`
- Card: `#FFFFFF`
- Heading: `#0F172A`
- Body: `#475569`
- Primary cobalt: `#2563EB`
- Cobalt hover: `#1D4ED8`
- Arctic blue: `#60A5FA`
- Soft accent surface: `#DBEAFE`
- Border: `#E2E8F0`

Typography: **Manrope** for headings, **Inter** for body/UI, optional **JetBrains Mono** for small dates/metadata. Reuse installed font stack; do not add multiple redundant font providers.

Design goals:

1. Clean, credible academic timeline or vertically aligned education cards.
2. Clear qualification, institution and timeframe hierarchy.
3. A restrained status indicator for `In Progress` without claiming graduation.
4. Course/certification cards or compact responsive list with institution/issuer, accurate title and optional verified year.
5. Subtle accent marker and thin borders; no over-the-top gold gradients, trophy styling or excessive glowing badges.
6. Avoid repeated whitespace, misaligned dates, awkward heights and oversized logos.
7. Never invent institutional/issuer logos. Use official local assets if available and appropriate; otherwise text initials or simple neutral icon.
8. Keep course collections concise. Group a large set by issuer or topic rather than rendering an overwhelming wall of badges.

---

## 07 — Responsive layout

Use actual content-fit breakpoints and established layout primitives:

- **1440/1024px:** comfortable content width, chronological educational cards/timeline; credentials in balanced cards/grid without squeezing titles.
- **768px:** two columns only if readability is preserved; otherwise stack cleanly.
- **375/320px:** single column, wrapped institution names, date/status positioned intentionally, no horizontal overflow and no clipped verification links.
- Maintain touch targets approximately 44px for interactive links or controls.
- Do not introduce a horizontal carousel that hides qualifications on mobile.
- Preserve section spacing, sticky-header offsets and focus states from prior tasks.

If tabs/filters are used, ensure their labels and categories reflect real data and keyboard/ARIA behaviour is complete. A static two-subsection design is acceptable and may be preferable to needless interaction.

---

## 08 — Accessibility and semantic requirements

- Semantic section/subsection landmarks with appropriate `aria-labelledby` if useful.
- Preserve **one page-level `h1`**; use `h2` for section title and `h3` for individual qualifications/groups as appropriate.
- A list or timeline should preserve chronological reading order in DOM, not rely solely on CSS visual reordering.
- `<time datetime>` only where a legitimate accurate machine-readable date exists; do not invent a day for month-only credentials.
- “Present”/“In progress” is text, not a fabricated future graduation date.
- Verification links must be descriptive (“Verify Google credential”), not repeated “View” with no context.
- If an external link opens in a new tab, use `rel="noopener noreferrer"`.
- Use suitable `alt` for informative logos; mark decorative artwork `aria-hidden="true"`.
- Provide keyboard-visible focus and WCAG AA contrast.
- Status is communicated through words, not only colours/icons.
- Respect `prefers-reduced-motion: reduce`; content remains available without JS or animation.
- Do not gate education content behind a control that breaks keyboard/screen-reader access.

---

## 09 — Component and data architecture

Follow the **actual repository stack**. Do not migrate a vanilla site merely because Next.js was recommended conversationally.

### If existing site uses HTML/CSS/JavaScript

Update current education/certification markup, reuse scoped section stylesheet and existing token variables. If prior tasks centralised profile content, store credentials in that established source; otherwise maintain straightforward semantic markup. Avoid unnecessary JavaScript.

### If V2 already uses React/Next.js/TypeScript

Reuse current components, data modules, types, CSS/Tailwind/shadcn patterns and routing. Possible conceptual units:

```text
EducationSection
EducationEntry
CredentialsSection
CredentialCard
```

Suggested data shape; change it to fit current conventions:

```ts
type EducationEntry = {
  id: string;
  institution: string;
  qualification: string;
  field?: string;
  timeframe: string;
  status: 'completed' | 'in-progress';
  note?: string;
  order: number;
};

type Credential = {
  id: string;
  title: string;
  issuer: string;
  kind: 'professional-certification' | 'course-completion' | 'badge';
  completionDate?: string;
  verificationUrl?: string;
  image?: string;
  order: number;
};
```

Keep optional values absent rather than fabricating them. Avoid duplicate content data sources that can drift out of sync.

---

## 10 — Functional features

1. Education and credentials must be readable and navigable without JavaScript when practical.
2. Existing `#education` and `#certifications` links work even if the visual section is unified.
3. Where verified credential URLs exist, provide real working external links. Where absent, simply omit the link; **never use `href="#"`** or fake verification URLs.
4. Credential cards must indicate actual type (certification, course or badge); an issuer alone is insufficient.
5. An optional show-more control for a long course list must use native button semantics, accessible expanded state and show a useful default subset. Do not hide the user's most relevant credentials arbitrarily.
6. Do not add speculative “certification progress percentages” or countdowns to planned exams.
7. Preserve old in-page links/active section navigation on direct hash load, browser Back/Forward and mobile nav.

---

## 11 — Implementation sequence

1. Confirm clean worktree and approved integrated base containing Tasks 02–11.
2. Audit current education/certification content, source CV, old labels, dates, links and logo assets.
3. Record a fact checklist: confirmed, conflicting and missing items. Distinguish degrees, completed courses and professional certifications.
4. Identify actual component/data/stylesheets and navigation anchors.
5. Create branch `task/12-education-certifications` from approved base.
6. Implement the Education layout with all three verified entries in reverse chronology.
7. Implement Credentials & Learning, separating formal certifications from course completions. Omit empty/unverified groups.
8. Replace outdated/incorrect credential claims rather than silently retaining them.
9. Reuse Porcelain Arctic semantic tokens, typography and current UI primitives.
10. Preserve `#education` and `#certifications` deep links and navigation behaviour.
11. Verify real credential hyperlinks where available; omit dead links.
12. Test desktop/tablet/mobile, keyboard, reduced motion and screen-reader-friendly content order where tooling permits.
13. Inspect regressions across prior sections and all link/asset references.
14. Create/update `docs/EDUCATION_AND_CREDENTIALS.md` with content provenance, data shape, displayed entries, intentionally excluded unverified claims, and future maintenance instructions.
15. Run actual available build/lint/tests, inspect diff, commit and push the feature branch. No auto-merge/deploy.

---

## 12 — Git workflow

Adjust the base branch only when the current project explicitly documents another integration branch.

```bash
git status
git switch main
git pull --ff-only origin main

# Verify Tasks 02–11 are integrated first.
git switch -c task/12-education-certifications

# Implement Task 12 only.

git diff --check
git status
git diff --stat

git add <specific-task-12-files>
git commit -m "feat: redesign education and verified credentials"
git push -u origin task/12-education-certifications
```

Do not run `git reset --hard`, force-push, silently stash/delete unrelated changes, merge without approval, or deploy automatically. If branch creation/push is blocked, report accurately.

---

## 13 — Verification and acceptance checklist

### Content integrity

- [ ] BICT (Hons) at SEUSL clearly shown as **in progress**.
- [ ] Diploma in Cyber Security displayed as a diploma, not a vendor exam certification.
- [ ] Advanced Level correctly labeled without fabricated results.
- [ ] Date ranges match current approved CV; any discrepancies documented.
- [ ] Official certifications appear only if actually verified as earned.
- [ ] Google/Anthropic/DataCamp/Microsoft items accurately classified according to their credential type.
- [ ] AWS practice exam score is **not** presented as AWS certification.
- [ ] Planned certification targets and student verification are **not** presented as earned credentials.
- [ ] No unverified credential IDs, expiration dates, links or issuer logos.
- [ ] No duplicated AWS SBG leadership (Task 11) or award cards (Task 10).

### Function and navigation

- [ ] `#education` and `#certifications` remain valid for existing links.
- [ ] Navbar active state and sticky offset behave appropriately.
- [ ] External links, when present, use correct destinations and descriptive labels.
- [ ] No `href="#"` placeholders or fake validation buttons.
- [ ] Any optional expand/filter controls work with keyboard and screen readers.

### Visual and accessibility

- [ ] Uses Task 02 Porcelain Arctic tokens and established typography.
- [ ] No awkward card heights, misaligned dates, excessive blank spaces or clipped labels.
- [ ] 320px, 375px, 768px, 1024px and 1440px layouts checked where browser tooling allows.
- [ ] No horizontal overflow; mobile touch targets comfortable.
- [ ] Semantic heading hierarchy and logical DOM order.
- [ ] WCAG AA contrast, visible focus and reduced motion considered.
- [ ] All images and decorative icons have appropriate accessibility treatment.

### Regression and delivery

- [ ] Existing Navbar, Hero, About, Skills, Projects, case studies, Ventures, Achievements and Community sections preserved.
- [ ] Three.js/animations, CV download, gallery filters and project navigation remain working.
- [ ] `git diff --check` passes.
- [ ] Actual build/lint/test commands run when available and their outcomes reported honestly.
- [ ] Only Task 12 files are changed, documented, committed on dedicated branch and pushed if possible.
- [ ] No Task 13+ implementation, automatic merge or deployment.

**Definition of Done:** A recruiter-friendly academic and credential presentation, all public claims verified/classified, deep links preserved, responsive and accessible design, documentation updated, tests truthfully reported and a focused Task 12 branch ready for review.

---

## 14 — Required Codex completion report

At completion, report:

1. **Task:** 12 — Education & Certifications.
2. Repository, approved base, feature branch and commit SHA; PR URL only if actually created.
3. Files created/modified and their purposes.
4. Exact published education entries in visible order and date wording.
5. Exact published credential groups and entries; identify professional certifications vs completed learning.
6. Items omitted or needing proof, particularly official certification status and missing verification links/dates.
7. How `#education` and `#certifications` navigation was preserved.
8. Desktop/mobile/accessibility implementation summary.
9. Actual build, lint, test, diff and visual checks — distinguish pass/fail/not run.
10. Regression check findings and known issues.
11. Confirm **not merged or deployed**.
12. State **Next: Task 13 — Contact & Social Integration**, but do not implement it.

---

## FINAL DIRECTIVE

**Implement Task 12 ONLY.** Inspect the real Portfolio V2 code and the latest approved credential evidence, build a polished Porcelain Arctic Education & Credentials section, protect the difference between degrees/courses/official certifications, keep existing anchors and features working, commit only the Task 12 changes on `task/12-education-certifications`, document verification gaps, and stop before Task 13.
