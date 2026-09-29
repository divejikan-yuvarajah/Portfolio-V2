# Leadership & Community (Task 11)

## Structure and maintenance

The semantic `#community` section in `index.html` is the single source of truth. It follows Experience & Ventures and precedes Education. The feature card highlights student technology leadership; the two organizational roles follow; membership and CV-listed volunteer affiliations sit in a separate lower-emphasis block. Scoped styles are in `css/style.css` under `.community-*`, using semantic Porcelain Arctic tokens from `css/tokens.css`. Static HTML is consistent with this site's existing content model; no JavaScript, asset or package dependency was added.

Maintain the visible copy and this source record together. Do not add organization URLs, logos, role duties, dates or current-status labels unless the owner provides a verifiable source. Keep competition awards in Achievements, credentials in Certifications, and Zatroz/Softora positions in Experience & Ventures.

## Visible content and source notes

| Order / group | Visible label | Source and wording boundary |
|---|---|---|
| Featured student tech leadership | **Technical Lead (Core Team)** — AWS Student Builder Group — SEUSL | Role and organization are explicitly included in the owner-approved Task 11 request. The supporting sentence follows the task's approved conservative description: a student community focused on cloud and modern development. This is not presented as AWS employment, an AWS certification or an award. The suggested `2026/2027` cohort reference was omitted: it is not shown in the current local CV or existing V2 content, and it is not a verified precise service period. The July 2026 badge mention is omitted because no approved badge asset/source is available and the role is not a credential. |
| Organizational leadership | **Co-Founder & Head of Finance** — Technologists Association of Trincomalee District (TATD) | The current local CV lists this organization and role under Leadership & Volunteering. No dates, registered status, finance outcomes or specific duties are published. |
| Organizational leadership | **Vice President** — TDUSA | The current local CV lists the acronym and role. The acronym is not expanded; no dates, program details or responsibilities are inferred. |
| Membership | **Member** — Generation ALPHA | Listed in the current local CV. The section does not state whether the membership is current or assign a leadership role. |
| Volunteer Involvement | **Sri Lanka Unites; Lyca Gnanam Foundation; Thalam Organization; EEGAI Sri Lanka; ChildFund Sri Lanka** | The current local CV groups these names under “Volunteer.” They are shown as CV-listed affiliations only; no date, specific event, task, output, partnership, current status or organizer endorsement is implied. The owner should confirm preferred organization spellings before adding links or details. |

The CV's organization names and role labels were reviewed from text recovered from `images/My_CV.pdf`. This confirms what the current CV says; it does not independently verify an organization's records or the present status of an affiliation. The AWS role comes from the owner's Task 11 request and has no corresponding current-CV entry.

## Navigation, anchors and assets

The section anchor is `id="community"`; native global section scroll offset applies. The main navbar remains unchanged because the existing responsive navigation already has seven destinations and the brief permits discoverability through page order when the nav is crowded. There are no prior `#community` references to migrate. No outbound links, images, badges or organization logos are used because approved destinations and assets were not supplied.

## Design and accessibility

The AWS role receives a single full-width featured card with a cobalt top rule and text label. TATD and TDUSA use balanced cards. Membership and volunteer names have distinct subheadings in a visually quieter porcelain-warm group; volunteer affiliations wrap as ordinary text chips rather than logo marks. Cards have content-driven height and collapse to one column at narrow widths. Semantic section/article/list elements and ordered headings provide a reading sequence matching the visual order. Meaning is conveyed in text, not color or hover. Existing focus tokens remain available and all content is present without JavaScript. There is no new motion or interactive control; global reduced-motion behavior continues to govern the site.

## Verification record and remaining facts

- Tasks 02–10 commits were checked as ancestors of the Task 10 integration branch, which is the approved base for this feature branch. The repository's `main` remains the earlier Task 01 integration and was not used as a base.
- Current CV text supports TATD, TDUSA, Generation ALPHA and the five volunteer names. Role and affiliation status beyond the CV wording remain unverified.
- The owner-approved Task 11 prompt supplies the AWS role. AWS cohort period, badge image/source and role-specific activities remain unconfirmed and are not displayed.
- Static HTML checks passed: `#community` is unique, IDs are unique, there is one page-level `h1`, section heading order is `h2` → role/group `h3`s → involvement `h4`s, the prior navbar targets were not changed, required role/affiliation labels are present, and the local CV file exists.
- `tinycss2` parsed `css/style.css` without errors; responsive breakpoint assertions found the single-column rules at 700px and 520px. WCAG contrast calculations for the new supporting text found 7.24:1 on porcelain, 6.89:1 on warm porcelain and 6.92:1 on the subtle surface; cobalt hover text on the arctic wash measured 5.49:1.
- A local HTTP smoke test returned 200 for the homepage with `#community`, stylesheet, CV PDF and the FlowPilot/MediGuardian case-study routes. A root-page reference scan found no missing local `href` or `src` targets (46 links, 11 sources).
- `node --check` passed for the existing navigation, case-study, project-filter and Three.js modules. `scripts/generate_case_studies.py --check` reported current generated pages. `git diff --check` passed. There is no package manifest or configured build/lint/test runner.
- The computer-use browser inventory returned no available browser surfaces. Rendered layout at 320, 375, 768, 1024 and 1440px, keyboard interaction, screen-reader behavior, and actual reduced-motion rendering could not be visually tested in this run; responsive CSS is structurally checked, not visually certified.
