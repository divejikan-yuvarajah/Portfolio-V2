# Experience & Ventures (Task 09)

## Structure and maintenance

The `#experience` section in `index.html` is the single source of truth. It has two groups: **Current Ventures** (Zatroz, then Softora) and **Previous Experience** (AARNA Eastern Lanka, then Hatton National Bank). Startup start dates are omitted because they have not been confirmed. This content is intentionally static HTML, matching the rest of this portfolio; no data module or runtime dependency is needed.

Section-specific layout rules are in `css/style.css` under `.experience-ventures`, `.venture-*`, and `.employment-*`. The existing `id="experience"` remains the navigation target, with the established sticky-header scroll offset. Cards use text wordmarks rather than invented logos. Update the markup and this evidence record together when the owner confirms changes.

## Published roles and evidence

| Published content | Evidence source | Verification / wording boundary |
|---|---|---|
| **Founder & CEO — Zatroz**, Current | Task 09 owner-approved prompt | Current role title, status, service areas and ongoing initiatives come from the prompt. No start date or website was supplied. Role responsibilities remain concise and do not claim commercial customers, launch, revenue or impact. CORTEX is described as a team initiative, consistent with the Task 08 collaborator attribution; this does not claim sole authorship. |
| **Co-Founder & Technical Lead — Softora**, Current | Task 09 owner-approved prompt | Provisional copy reflects only the role and responsibilities authorized there. The user-provided [Softora website](https://www.softora.lk/) is linked, but the available web inspection tool could not access it on 2026-09-29; the destination and company details need a later availability/content check. No start date or product/client claim is made. |
| **Data Entry Clerk — AARNA Eastern Lanka** | Task 09 owner-approved prompt and the prior portfolio timeline | The role and a restrained record-support summary are shown. The older portfolio and prompt give Aug–Sep 2024, but the latest local CV (`images/My_CV.pdf`) does not contain this employer/role in its extractable text. The date is therefore omitted pending owner confirmation. Confirm the employer's preferred styling/legal name as well. |
| **Banking Trainee Intern — Hatton National Bank (HNB)**, Sep 2023–Jul 2024 | Latest local CV (`images/My_CV.pdf`), also consistent with the Task 09 prompt | The CV text confirms the monthly dates and supports daily banking operations, customer inquiries, financial transactions, financial reporting and process-improvement support. Public bullets are concise and do not claim officer authority. Month-level `<time>` values are used; no day-level dates are inferred. |

No certification, customer, performance, team-size, revenue or client-delivery claims are added. The section does not publish the former Upwork/Fiverr freelance role, as requested. The previous TATD finance/association item is community leadership rather than employment and is not represented as a job in this two-group section; retain its source wording for a future leadership/community treatment. AWS Student Builder Group remains outside this task.

## Design and accessibility

Current ventures use balanced cards with text wordmarks, role labels, Current status, and content-driven height. Confirmed Zatroz service areas appear as wrapping text tags. Previous roles use an ordered list in reverse chronology, with a muted timeline marker; dates appear only when supported. Heading hierarchy is the existing page `h1`, the section `h2`, group `h3`s, and company `h4`s. The Softora link has a descriptive name and `rel="noopener noreferrer"`. Core copy and links are HTML-visible without JavaScript; CSS transitions honor the shared reduced-motion rule. Scoped styles use Porcelain Arctic semantic tokens and collapse the venture grid for narrower layouts.

## Verification and remaining facts

- HNB dates and responsibilities were checked against text recovered from the local CV PDF. The PDF is dated 2026-03-12 in local file metadata; extraction does not validate the truth or currentness of the statements.
- AARNA employment date and preferred legal company name need owner confirmation; its date is intentionally not displayed.
- Confirm Zatroz and Softora start months/years before adding dates. No company start date is inferred from project dates.
- Zatroz has no confirmed public URL in the supplied materials. Softora's provided URL is displayed but was inaccessible to the available network inspection tool; check it in a browser before relying on the CTA.
- Browser viewport, keyboard, rendered-contrast, zoom/reflow, and screen-reader review remain release checks when browser tooling is available.
