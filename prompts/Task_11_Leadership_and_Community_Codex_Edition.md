# PORTFOLIO V2 — TASK 11
## Leadership & Community Section — Complete Enhanced Codex Edition

**Project:** Divejikan Portfolio V2  
**Task ID:** 11 of 17  
**Feature branch:** `task/11-leadership-community`  
**Visual language:** Porcelain Arctic  
**Primary goal:** Present verified student technology leadership, organizational service, and volunteering in a credible, visually distinctive and accessible portfolio section.  
**Scope:** Implement **Task 11 only**. Do not begin Task 12 (Education & Certifications) or later tasks.

---

## 01 — Operating instructions for Codex

Act as a senior frontend engineer, UX designer, accessibility reviewer, content editor, and QA engineer. Work inside the **actual current Portfolio V2 repository** rather than recreating an imagined repository from this prompt.

1. Check `git status`, default/integration branch, current architecture, section IDs, data sources, routing, UI primitives, design tokens, and scripts.
2. Read `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/ACHIEVEMENTS.md`, and other relevant task documents **only if they exist**. Report absent files; do not invent their contents.
3. Confirm Tasks 02–10 are integrated in the **approved base branch**. If a required prior task is only on an unmerged branch, identify the dependency and pause implementation instead of silently branching from the wrong state.
4. Detect the actual stack. Previous conversation discussed **Next.js + React + TypeScript + Tailwind CSS**, but that was a **recommendation**, not proof that a migration occurred. If V2 uses that stack, use its established conventions. If V2 remains HTML/CSS/vanilla JS, stay consistent with that stack. **Do not migrate frameworks in Task 11.**
5. Preserve navigation, Hero, About, Skills, Featured Projects, Case Studies, Experience & Ventures, Achievements, CV download, and any Three.js/GSAP functionality already implemented.
6. Make only task-relevant edits. Avoid broad global style changes, new animation frameworks, package upgrades, unrelated data changes, and duplicate sections.
7. Use real, verified public facts. Do not invent organization dates, responsibilities, event reach, students mentored, audiences, financial outcomes, certificates, logos, endorsements, or external links.
8. Do not auto-merge, auto-deploy, force-push, or discard unrelated changes.

---

## 02 — Editorial purpose and distinction from previous sections

This section answers: **How does Divejikan contribute beyond his own products and professional roles?** It should show student technical leadership, organization-building, and service to communities, without sounding like another employment history or trophy wall.

Keep boundaries clear:

| Section | Content belongs there |
| --- | --- |
| Task 09 — Experience & Ventures | Founder & CEO at Zatroz; Co-Founder & Technical Lead at Softora; past employment |
| Task 10 — Achievements & Hackathons | Verified competition awards and selection milestones |
| **Task 11 — Leadership & Community** | Student/community leadership, verified organizational roles, volunteer associations |
| Task 12 — Education & Certifications | Formal study and completed credentials |

Do **not** duplicate Zatroz and Softora cards here. Do not show the AWS SBG role as a commercial employer or the SBG badge as a professional certification. If the same entity is mentioned briefly elsewhere, provide distinct contextual framing rather than repeating the same block.

---

## 03 — Verified source content to consider

The following facts came from the user's earlier CV/project context. **Before publishing, compare with the current approved CV and existing V2 data**, because later updates may supersede them. Wording, dates, and links not listed as verified below must not be fabricated.

### Priority 1 — AWS Student Builder Group, SEUSL

- Organization: **AWS Student Builder Group — South Eastern University of Sri Lanka (SEUSL)**.
- Role: **Technical Lead (Core Team)**.
- Cohort/period reference: **2026/2027**. This is a cohort label, **not** a verified exact employment/start date.
- Verified fact: the user reported earning an AWS SBG badge on **24 July 2026**. Use only if it serves the story and the current approved materials confirm it; it is not automatically an award or certification.
- Suitable safe, concise description, subject to approved content: “Serving on the technical leadership team of the AWS Student Builder Group at SEUSL, contributing to a student community focused on cloud and modern development.”
- Do not invent attendance counts, event host credits, AWS employee status, AWS certification, cloud spending, mentorship numbers, or sponsorship.
- If there are user-supplied official SBG event photographs or verified badges, they may be displayed with accurate descriptions. Otherwise prefer a tasteful text-only card.

### Priority 2 — TATD

- Full name from earlier CV: **Technologists Association of Trincomalee District (TATD)**.
- Role: **Co-Founder & Head of Finance**.
- Start/end dates: **not independently confirmed**; omit rather than manufacturing dates.
- Suggested conservative copy: “Co-founded TATD and contribute to its finance-related organizational responsibilities.”
- Do not claim legal incorporation, registration, fundraising totals, financial audits, grants, membership counts, or events unless verified.

### Priority 3 — TDUSA

- Organization label: **TDUSA**.
- Role: **Vice President**.
- Do not expand the acronym without a verified official full name.
- Dates and detailed responsibilities: unconfirmed; use only the role title and, if desired, a restrained generic line that does not allege specific programmes or measurable outcomes.

### Optional — Generation ALPHA

- Verified earlier CV relationship: **Member**.
- This is a membership, not a leadership appointment; only include in a secondary community involvement area if it adds value and current approved content still confirms it.

### Optional — Volunteer associations

Earlier CV listed volunteering with:
- Sri Lanka Unites;
- Lyca Gnanam Foundation;
- Thalam Organization;
- EEGAI Sri Lanka;
- ChildFund Sri Lanka.

These are **prior CV-listed affiliations**, not independently verified descriptions of specific projects or periods. Validate current spelling and user-approved inclusion. Present them as **Volunteer Involvement**, not as employment, formal partnerships, or organizer endorsements. Do not imply all are current. Do not imply participation in a specific event, role, output, duration, or leadership status without evidence. If you cannot validate the affiliation, omit it from public display and flag it in your report.

### Things to exclude until independently confirmed

- Qwen/Claude ambassador **applications or interest**;
- TRACE, MLSA or other programme applications;
- informal event attendance;
- hackathon participation without a community leadership/volunteer role;
- specific AWS workshops led or certifications held;
- university club positions without approved evidence.

Do not transform a past application or attendance into an active role.

---

## 04 — Final section information architecture

**Eyebrow:** `BEYOND THE CODE` or `LEADERSHIP & COMMUNITY`  
**Heading:** `Leadership & Community`  
**Intro:** 1–2 humanized sentences about learning, building and contributing with others. Example, editable to match verified facts:

> “I value the communities behind great technology. Alongside building software, I contribute to student tech initiatives and organizations that bring people together to learn and create.”

### Block A — Featured student tech leadership

A prominent **AWS Student Builder Group — SEUSL** card with the precise role label `Technical Lead · Core Team` and period label `2026/2027` if confirmed in current content. Consider a small cloud/learning visual or a verified organization asset. The content should describe community contribution, **not** an AWS employment relationship.

### Block B — Organizational leadership

Two equal or intentionally balanced compact cards:
1. **TATD — Co-Founder & Head of Finance**
2. **TDUSA — Vice President**

Preserve exact name and role spelling from the approved CV/source. Show only verified dates; omit uncertain dates entirely. Optional modest links only if URLs are verified and genuinely relevant.

### Block C — Community & volunteering (optional)

A lighter, compact row/collection of approved volunteer-affiliation names, with a neutral label such as `Volunteer Involvement`. Include Generation ALPHA separately as `Membership` if retained. **Avoid a dense wall of logos or a fabricated activity timeline.**

### Optional CTA

A small link to the real `#contact` anchor, e.g. `Collaborate with me`, but only if it improves the section and does not duplicate a dominant CTA nearby. Don't invent social URLs.

The hierarchy should lead with actual responsibilities and keep lower-certainty/low-detail associations in a restrained secondary presentation.

---

## 05 — Content-writing rules

1. Use first-person, straightforward English when it fits the site's voice; avoid repetitive generic claims such as “passionate about making an impact.”
2. Focus on what can truthfully be said about each **role**. Do not inflate it with aspirational plans or unverified results.
3. Use 1 short summary and at most 2–3 fact-based bullets for the featured AWS card, if source material supports them. For TATD and TDUSA, 1–2 short statements are sufficient.
4. Labels must distinguish `Technical Lead`, `Co-Founder & Head of Finance`, `Vice President`, `Member`, and `Volunteer Involvement`.
5. Do not present membership as a leadership position.
6. Do not show unconfirmed dates as `Present` unless the affiliation is verified current in approved material. The `2026/2027` AWS label is a cohort/year reference, not a precise start–end timestamp.
7. Only show metrics when source-backed. No invented “20+ events,” “500+ participants,” mentoring totals, funding, or badges.
8. No generic stock testimonials, false sponsor references, or made-up badges.
9. If the current approved CV contradicts the earlier notes, flag the discrepancy and preserve the current approved version unless the user's direct instructions resolve it.
10. Do not solicit or publish sensitive details about third parties.

---

## 06 — Visual direction: Porcelain Arctic

Use Task 02's actual semantic token names. These are reference roles, **not instructions to introduce conflicting hardcoded palettes**:

| Visual role | Reference value |
| --- | --- |
| Main porcelain background | `#F8FAFC` |
| Warm alternate surface | `#F5F4F0` |
| Card surface | `#FFFFFF` |
| Deep navy heading | `#0F172A` |
| Slate body text | `#475569` |
| Primary cobalt | `#2563EB` |
| Hover cobalt | `#1D4ED8` |
| Arctic accent | `#60A5FA` |
| Soft highlight | `#DBEAFE` |
| Fine border | `#E2E8F0` |

- Heading: **Manrope**; body: **Inter**; compact metadata may use **JetBrains Mono** if consistent with existing typography.
- Feature card should be premium, calm and readable: a small accent marker, balanced content, fine border, restrained shadow or surface contrast.
- Do not introduce gold trophy styling (Task 10 covers achievements), neon, excessive gradients, large glass panels, or generic corporate-team stock art.
- Use precise alignment, balanced card padding, consistent title/date placement, and sensible negative space.
- Prefer typographic company identifiers or authentic approved assets. **Never manufacture official AWS or other organization logos.**
- If the layout includes decorative connection lines/nodes to suggest community, keep them subtle and do not let them create visual noise or accessibility problems.
- All additions must work against both porcelain and white sections; avoid identical adjacent surfaces with no clear separation.

### Suggested conceptual desktop composition

```text
-----------------------------------------------------------
BEYOND THE CODE
Leadership & Community
Concise intro
-----------------------------------------------------------
| AWS Student Builder Group — SEUSL (featured wide card)   |
| Technical Lead · Core Team                2026/2027      |
-----------------------------------------------------------
| TATD                         | TDUSA                     |
| Co-Founder & Head of Finance | Vice President            |
-----------------------------------------------------------
Volunteer Involvement / Membership [subtle approved labels]
-----------------------------------------------------------
```

Avoid imposing equal heights on cards with unequal content if this creates conspicuous blank space.

---

## 07 — Responsive behaviour

Test actual content-fit breakpoints rather than relying only on device labels.

- **1440/1024px:** full-width featured leadership card; two balanced organization cards; compact lower strip.
- **768px:** two cards if readable or stack them; no squeezed role labels or clipped metadata.
- **375/320px:** single-column, headings and labels wrap naturally, 16–24px effective inner padding as appropriate, no horizontal scroll, all links/touch controls comfortably tappable.
- Avoid fixed heights for cards and avoid overflowing horizontal logo chips.
- Images, badges and icons must not distort or overlap text.
- Content should remain easy to scan without requiring hover.

---

## 08 — Interactivity and motion

- No new heavy interaction is required: it is primarily an editorial credibility section.
- If existing motion primitives are available, use a subtle entrance or stagger and light card hover treatment only.
- Respect `prefers-reduced-motion: reduce`; do not hide content until JS runs.
- Do not start Task 14's broader GSAP animation overhaul here.
- If a verified external profile or organization link exists, make the link obviously interactive with a descriptive accessible name and appropriate target/rel handling.
- Do not make an entire card clickable unless it really navigates somewhere.

---

## 09 — Accessibility

1. Use a semantic `<section>` with stable `id="community"` **or** keep an existing established section ID. If changing an ID, update all actual references consistently.
2. Use an appropriate heading hierarchy (`h2` for section; `h3` for role/organization card titles). No extra page-level `h1`.
3. If added to the navbar, ensure the Task 03 menu, active-section logic and anchor offsets continue to work. If nav becomes crowded, keep the section discoverable via page scroll or another existing pathway instead.
4. A year/cohort label should not be marked up as a fabricated precise date. Use `<time>` only when valid factual date data is available.
5. Decorative icons `aria-hidden="true"`; meaningful images have accurate alt text.
6. Visible focus states and WCAG AA contrast on text, controls and badges.
7. Links have descriptive labels, not just “Click here”; safe `rel="noopener noreferrer"` if using `target="_blank"`.
8. Content and meaning cannot rely on colour, hover or motion alone.
9. Screen-reader reading order must match the visual organization.
10. No dead buttons, fake links or inaccessible carousels.

---

## 10 — Code architecture and content data

Inspect the current V2 structure and reuse its existing conventions.

### If Next.js/React + TypeScript is ACTUALLY present

Use idiomatic components and typed content. Possible shapes (adapt names/paths to real architecture):

```text
components/
  leadership/
    LeadershipCommunitySection.tsx
    FeaturedLeadershipCard.tsx
    OrganizationRoleCard.tsx
    CommunityAffiliations.tsx
content/ or data/
  leadership.ts
```

Type-safe optional fields might include:

```ts
type CommunityRole = {
  id: string;
  organization: string;
  role: string;
  category: 'student-leadership' | 'organizational-leadership' | 'membership' | 'volunteering';
  periodLabel?: string; // Only verified public wording
  summary?: string;
  contributions?: string[]; // Only verified claims
  url?: string;            // Only confirmed URLs
  logo?: string;           // Only authentic, approved assets
  order: number;
};
```

Do not install new packages for static cards. Use the already-approved Tailwind/shadcn patterns if present, but do not force shadcn or introduce a dependency just for this section. Do not use client components unnecessarily for static content.

### If V2 remains vanilla HTML/CSS/JS

Update the established section markup/CSS architecture, use scoped selectors and semantic HTML. A dedicated data JS file is optional **only if the project already centralizes content this way**. Avoid unnecessary DOM injection for static content. Keep preexisting module loading and navigation initialization intact.

### Shared rules

- One authoritative content source; no duplicate facts that drift between files.
- Do not hardcode invented periods or silently convert an affiliation into a current role.
- Avoid modifying global `a`, `h2`, `.card`, `.badge` or `section` styles in ways that break other tasks.
- Reuse existing spacing, max-width, typography, responsive and focus primitives.

---

## 11 — Images, links and source verification

- Prefer already-provided official logos, event/group photographs or approved screenshot assets. Verify path and ownership/appropriateness.
- Never use generic downloaded stock pictures of a group of students to imply the user's actual participation.
- Verify any official group website or social profile before creating an outbound link. Do not fabricate LinkedIn, Instagram, AWS or university URLs.
- Organization names can be plain text when a verified link is not available.
- For optional photos, add dimensions, responsive styles and lazy loading when below the fold; protect image layout from cumulative shift.
- Keep a short internal `content verification` note in the documentation; do not expose false claims on the live page.

---

## 12 — Implementation sequence

1. **Preflight:** inspect working tree, branches, dependencies, current sections, actual source files and design system.
2. **Validate approved baseline:** confirm Tasks 02–10; if not integrated, stop safely and report what is missing.
3. **Content inventory:** identify existing leadership/community/volunteer mentions and prevent duplicate versions.
4. **Create feature branch:** `task/11-leadership-community` from the documented integration branch.
5. **Prepare verified content:** prioritise AWS SBG, TATD, TDUSA; retain optional affiliations only if supported by approved material.
6. **Implement semantic section:** featured AWS card, two organizational cards and a restrained optional involvement area.
7. **Apply Porcelain Arctic:** use Task 02 semantic tokens and scope CSS/components appropriately.
8. **Navigation integration:** preserve stable anchors and only add top-level nav if the existing layout comfortably accommodates it.
9. **Responsive and accessibility:** test actual content fit, focus, contrast, small screens and reduced motion.
10. **Regression:** check prior sections, case-study links, filters, nav, CV download and 3D/animation effects.
11. **Document:** add or update `docs/LEADERSHIP_AND_COMMUNITY.md` describing sources, role distinction, asset/link choices, unconfirmed dates and content maintenance.
12. **Review diff:** check for unsupported claims, unrelated edits and accidental deleted files.
13. **Run checks:** available build/lint/tests, relevant browser smoke tests, and `git diff --check`.
14. **Commit and push:** focused Task 11 changes only. Do not merge or deploy.

---

## 13 — Git instructions

Adapt the approved base branch if your V2 workflow uses a non-main integration branch. Do not unilaterally choose an unmerged feature branch.

```bash
git status
git switch main
git pull --ff-only origin main

# Confirm Tasks 02–10 are integrated before continuing.
git switch -c task/11-leadership-community

# Implement Task 11 only.
git diff --check
git status
git diff --stat

# Stage only Task 11 changes; replace placeholder with real paths.
git add <task-11-files>
git commit -m "feat: add leadership and community showcase"
git push -u origin task/11-leadership-community
```

**Do not:** `git reset --hard`, force-push, indiscriminately stage unrelated files, delete work to get a clean tree, create fictional test results, merge automatically, or deploy automatically. If the tree contains other changes, preserve them and report the issue.

---

## 14 — QA and acceptance criteria

### Factual integrity

- [ ] AWS SBG is shown as **Technical Lead (Core Team)**, not AWS employment or certification.
- [ ] `2026/2027` is treated as the approved cohort/period label, not an invented exact date.
- [ ] TATD role is **Co-Founder & Head of Finance**.
- [ ] TDUSA role is **Vice President**; no invented acronym expansion.
- [ ] Optional Generation ALPHA is **Member**, not leader.
- [ ] Volunteer affiliations are listed only when approved; no unverified current status, tasks or events.
- [ ] Founder roles at Zatroz/Softora remain in Experience & Ventures, not duplicated.
- [ ] Awards and certificates are left in their own sections.
- [ ] No invented metrics, organizational logos, external URLs, start dates or outputs.

### Visual and responsive quality

- [ ] Matches Task 02 Porcelain Arctic tokens and typography.
- [ ] Featured AWS role is visually prominent but not oversized.
- [ ] Organization cards are readable and aligned without awkward whitespace.
- [ ] Lower-affiliation area stays compact and clean.
- [ ] Checked at 320, 375, 768, 1024 and 1440px or closest supported equivalents.
- [ ] No horizontal scroll, clipped labels or mobile overlap.
- [ ] Cards don't require hover to reveal essential information.

### Accessibility and functionality

- [ ] Correct semantic heading hierarchy, reading order, link labels and keyboard focus.
- [ ] Contrast checked against actual backgrounds; reduced-motion honoured.
- [ ] No decorative icon treated as information without alternative text.
- [ ] Navigation/hash offsets work if new section anchor is used.
- [ ] Outbound links, if any, are verified and safe.
- [ ] Existing navbar, Hero, About, Skills filters, Projects, Case Studies, Experience, Achievements, CV and Three.js/GSAP features still work.

### Engineering quality

- [ ] Existing coding conventions followed; no framework migration or unnecessary package installs.
- [ ] Build, lint and tests run **when available**; unrun checks are explicitly reported, not claimed as passed.
- [ ] `git diff --check` passes.
- [ ] No unrelated modifications, secrets, generated build artifacts or dead links committed.
- [ ] Task 11 docs created/updated.
- [ ] Dedicated branch commit made; no auto-merge or deployment.

If browser/screenshots tooling is available, inspect mobile and desktop visually. If unavailable, state the limitation instead of reporting a visual pass.

---

## 15 — Definition of Done

Task 11 is complete when the page has an accurate, visually coherent **Leadership & Community** section; AWS SBG, TATD and TDUSA roles are presented correctly; optional membership/volunteer affiliations are handled with factual restraint; the section is responsive and accessible; previous tasks are not broken; relevant documentation exists; actual tests and diff checks have been reported; and changes are committed on the dedicated branch **without merging/deploying**.

---

## 16 — Mandatory completion report

After implementation, report:

1. **Task:** Task 11 — Leadership & Community.
2. Repository, approved base, feature branch and commit SHA (PR URL only if actually created).
3. Created/modified files and a one-line purpose for each.
4. Exact final visible role labels, order, period labels and optional affiliations.
5. Details left out due to insufficient verification (dates, links, duties, assets).
6. Navigation decision and final anchor ID.
7. Responsive, accessibility and motion choices.
8. Tests/checks actually run, pass/fail/skip and any screenshots genuinely inspected.
9. Regression findings for Tasks 02–10.
10. Confirm **no merge and no deployment**.
11. End with: **Next: Task 12 — Education & Certifications. Do not implement Task 12.**

---

# FINAL EXECUTION DIRECTIVE

**Implement Task 11 ONLY** in the real Portfolio V2 repository. Use verified, current content; highlight AWS SBG leadership and show TATD/TDUSA separately; place any optional volunteer affiliations in a carefully labelled secondary group; follow Porcelain Arctic; preserve all prior work; test and document faithfully; commit to `task/11-leadership-community`; and stop without auto-merging or deploying.
