# Education & Credentials (Task 12)

## Structure and maintenance

The static HTML in `index.html` is the source of truth. `#education` presents formal education in reverse chronological order. `#certifications` remains a stable anchor but contains the `Credentials & Continuous Learning` course collection. The navigation label is “Credentials” so it does not imply that the course cards are professional certifications. Both sections use scoped rules in `css/style.css` and shared Porcelain Arctic tokens from `css/tokens.css`. No framework, data module, JavaScript, image, or dependency was added.

When updating an entry, check the latest owner-approved CV and the credential artifact or issuer verification URL where one exists. Keep dates at the source's precision. Keep formal qualifications, course completions and professional certifications in separate groups. Do not restore placeholder `href="#"` verification actions or publish credential IDs, private links, grades, or exam-practice scores.

## Published formal education

| Order | Visible qualification | Institution | Period / status | Source and notes |
|---|---|---|---|---|
| 1 | **Bachelor of Information and Communication Technology (Hons)** | South Eastern University of Sri Lanka (SEUSL) | **Oct 2024 – Present** · In progress | Current local CV (`images/My_CV.pdf`) lists BICT (Hons), SEUSL and Oct 2024–Current. The existing V2 page already expands BICT (Hons) as the degree name. No graduation date, class, GPA or completion claim is shown. The older page's software engineering “specialization” statement was removed because the CV does not substantiate it. |
| 2 | **Diploma in Cyber Security** | London School of Business and Social Sciences (LSBSS) | **Aug 2023 – Jan 2024** · Completed | Current local CV. It is displayed once as formal education, not duplicated as a vendor certification. The former credentials card's conflicting Feb 2024 date and verification placeholder were removed. |
| 3 | **G.C.E. Advanced Level — Engineering Technology** | T/T/Vipulanada College | **2022/2023** · Completed | Current CV spells the institution “T/T/Vipulanada College.” The Task 12 brief's candidate content spells it “T/T/Vipulananda College”; the CV spelling is retained pending confirmation of the institution's preferred official English spelling. CV grades and Z-score are omitted, as the task recommends. The year is shown as a source label, not encoded as fabricated exact dates. |

The CV dates are preserved at month/year precision for the degree and diploma. `<time datetime>` is used only for those month-level values; the Advanced Level academic-year label is plain text.

## Credentials & Continuous Learning

No verified professional certification is currently published. The local CV supports completed learning in the entries below, but no personal certificate artifact or verification URL was supplied. They are deliberately labeled as courses/programmes, not professional certifications.

| Provider | Visible entry | Classification and evidence |
|---|---|---|
| Google | **Google AI Essentials** | Completed course, based on the CV wording “Google AI Essentials Courses.” Google's [official AI Essentials page](https://grow.google/ai-essentials/) describes a course and says a course certificate is available after completion; this page does not verify that the owner earned that certificate. The portfolio therefore claims course completion only, with no completion date or credential link. |
| Anthropic | **AI Fluency** | Completed course, based on the CV. Anthropic's [AI Fluency course page](https://www.anthropic.com/ai-fluency) describes a course and an optional completion certificate after assessment. No certificate is claimed. |
| Anthropic | **MCP courses — Basic and Advanced** | Completed courses, following the CV's “Basic and Advanced MCP courses” wording. Specific course titles, dates and completion records were not supplied; no formal credential is inferred. |
| DataCamp | **Data Science, Machine Learning & SQL** | Completed courses, based on the CV's provider/topic summary. The CV does not give individual course names, IDs or dates, so the entry remains at topic level. |
| Microsoft Learn | **Azure & Web Development** | Completed learning, based on the CV. Exact module/path names, completion dates and personal records were not supplied. This is not presented as an AZ-900, AI-900, AI-102 or other Microsoft certification. |

### Omitted or unresolved credential claims

- The CV says “Google Analytics Certification,” and the previous page also showed a year and an ID. The prior “Verify” link was `#`, and no certificate or personal verification URL is available in the repository. The claim, date and exposed ID are omitted until the owner supplies a verifiable awarded credential. Google's [Skillshop](https://skillshop.withgoogle.com/) confirms Google Analytics training exists, but an issuer's programme page does not verify an individual's completion.
- The Diploma in Cyber Security was moved to Formal Education only; it is not a separate vendor certification.
- No AWS certification, practice exam, student-verification badge or AWS Student Builder Group recognition is included. Task 11 covers the SBG role; an exam practice result is not a certification.
- No unsupported certificate dates, IDs, expiration dates, course-specific modules, logos, or third-party verification links are shown. Dates attached to earlier cards were not in the latest CV and were removed.
- No standalone professional certification group is rendered because none meets the available verification bar. If an awarded professional certification is later documented, add a distinct group above course learning with its exact title, issuer and approved real verification URL.

## Navigation, accessibility and responsive behavior

Both `#education` and `#certifications` remain unchanged, preserving the existing navbar destinations, direct hashes, active-section tracking and global sticky-header offset. The navbar item formerly labeled “Certifications” is now “Credentials,” while its target is still `#certifications`.

Education uses a chronological ordered list, with the newest entry first in DOM order. Each card identifies the qualification, institution, period and a text status. Learning cards identify the provider and call out course completion. Cards use token-based surfaces/borders, content-driven heights and collapse to a single column at 700px. There are no controls, hidden content, animations or images in these sections; content remains available without JavaScript and global reduced-motion behavior is preserved. The existing focus style applies to navigation links.

## Verification record and remaining facts

- Task 02–11 implementation commits were verified as ancestors of the Task 11 integration commit used as this branch's base. `main` still points to the earlier Task 01 integration; it was not used.
- Text extracted from the current local CV confirms education dates, study/qualification descriptions, and the listed course-provider/topic wording. This confirms the supplied CV wording, not the issuer's records or completion status independently.
- The institution's official English spelling (`Vipulanada` vs the Task 12 prompt's `Vipulananda`) needs owner confirmation. No vendor credentials currently have personal public verification URLs or proof files.
- Static HTML checks passed for unique IDs, one page-level `h1`, the two preserved anchor targets, unchanged navigation hrefs, required visible entries, and absence of the prior Google Analytics claim, exposed IDs and `href="#"` placeholders. A scan of 36 local links and 10 local asset references found no missing root-page targets.
- `tinycss2` parsed `css/style.css` without errors; structural assertions found the mobile single-column rules at 700px. Contrast calculations for new text pairings measured at least 4.5:1, including body text on warm porcelain (6.89:1), secondary text on subtle surface (13.35:1), and cobalt status on arctic wash (5.49:1).
- `node --check` passed for every existing `js/*.js` file. `scripts/generate_case_studies.py --check` reported the generated case-study output current. Local HTTP smoke requests returned 200 for both anchor URLs, stylesheets, existing navigation/animation/project/Three.js modules, CV PDF, and all four case-study routes. `git diff --check` passed. The repository has no package manifest or configured build/lint/test runner.
- No browser surface was available for rendered layout, direct hash scrolling, keyboard operation, assistive-technology or reduced-motion visual checks. Responsive CSS and native-anchor structure were checked statically; 320, 375, 768, 1024 and 1440px rendering is not visually certified.
