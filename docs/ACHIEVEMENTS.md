# Achievements & Hackathon Showcase (Task 10)

## Section and maintenance

The static `#achievements` section in `index.html` is the source of truth. It appears after Projects and before Experience. It contains one featured result and three supporting competition milestones. Scoped presentation lives in `css/style.css` under `.achievements-*` and `.achievement-*`; shared colors, spacing, typography, borders and motion values come from `css/tokens.css`. No data module, image asset or JavaScript was added because four static entries do not need runtime behavior.

Update the result wording and this evidence record together. Keep participation and registrations out of the awards list. Do not add a team count, prize value, judge score, organizer logo or date without a reliable source. External links open in a new tab with `noopener noreferrer`; internal case-study links remain relative so they work on the existing static site.

## Visible order and evidence decisions

| Order | Exact visible result | Project / team | Evidence and boundary |
|---|---|---|---|
| 1 — featured | **1st Place — FinTech Track**; **Top 10 Overall** — Cursor Colombo 24H Buildathon, May 2026 | FlowPilot AI · Team ZeroDB | The [official results](https://buildathon.cursorsrilanka.com/winners) list FlowPilot AI / ZeroDB as the Seylan track winner and rank the team #2 overall. The owner-approved Task 10 brief identifies the award as 1st Place in FinTech and states Top 10 overall; the public Top 10 label remains accurate. The brief gives May 2026 and the event title. The competition-count variants (approved CV: 120+; earlier reference: 125+) are omitted because the current official standings page lists 111 teams and does not explain whether the figures count different pools. Description says “Seylan Bank API track”; it does not imply production access or “live” bank integrations. |
| 2 | **Finalist** — YGC Innovation Festival — CodeStorm AI Challenge 2026 | MediGuardian AI | The owner’s [public profile](https://lk.linkedin.com/in/divejikan-yuvarajah) describes MediGuardian AI as advancing to a final round in the YGC AI Competition 2026. The [official Yarl IT Hub competition page](https://app.yarlithub.org/competitions/codestorm-ai-2026-buildathon/) uses “YGC Innovation Festival AI Competition 2026.” Public label follows the Task 10 brief’s CodeStorm name. No placement or winner claim is made. Competition naming varies between these sources; confirm the organizer’s canonical event name before future copy changes. |
| 3 | **Top 25** — IEEE Innovation Nation Sri Lanka 2026 | Team Zatroz | The [IEEE Young Professionals Sri Lanka report](https://www.ieeeyp.lk/blogs/2026/ieee-insl-2026-zonal-competitions) confirms the Top 25 progression stage. That report does not name Zatroz; attribution is from the owner-approved Task 10 brief. The card uses only Top 25 and does not elevate the result to finalist or semifinalist. An official roster/certificate naming the team would strengthen the public attribution. |
| 4 | **1st Runner-Up** — Interfaculty Designathon — SEUSL | Team NeuraForm · 2025/26 | The local CV (`images/My_CV.pdf`) records “1st Runner-Up - Inter Faculty Designation Competition. (2025/2026).” The owner-approved Task 10 brief supplies the “Interfaculty Designathon — SEUSL” name and NeuraForm attribution. The naming differs between sources; no separate public organizer result was located during this task. Keep this visible result as owner-provided and request a certificate/organizer source before expanding its description. The year shown is exactly the CV’s 2025/2026 academic year. |

### Exclusions and unresolved wording

- Team count for Cursor is omitted: prior material says 120+ or 125+, while the current official result page displays 111 teams without explaining the counting scope.
- No awards are inferred from event registration, participation, workshops, certifications, or leadership roles.
- No optional recognition item was added because the Task 10 brief and reviewed local CV did not provide a stronger verified non-competition recognition suitable for this section.
- Interfaculty event name and team attribution need corroborating organizer material. The current card does not claim a calendar date beyond the CV’s academic-year wording.
- IEEE’s official page confirms the stage but not the team’s identity; retain owner attribution pending an official roster or certificate.
- No competition screenshots, certificates, or logos are present in this section. The existing FlowPilot and MediGuardian case studies use identified typographic illustrations rather than purported competition photography, and are linked for context.

## Navigation decision

The section uses the stable `id="achievements"` anchor, but **Achievements was not added to the main navbar**. The existing Task 03 navbar has seven destinations in its responsive layout; adding an eighth would need a measured width and responsive review, which is not necessary for a section reachable in normal page reading order. There are no existing internal links that needed migration. A direct `#achievements` URL works through native anchor navigation and the existing global scroll offset.

## Design and accessibility

The first result is a two-column feature with textual result labels and a restrained cobalt emphasis. Supporting results use an auto-readable card grid. The layout moves to two columns at tablet widths and stacks at narrow widths; content can wrap without fixed-height clipping. Result meaning is conveyed in words rather than color alone. The section has one `h2`, card `h3`s, semantic `article`s, descriptive links, and no decorative award imagery. Shared focus styling remains active. The only hover transition is removed under `prefers-reduced-motion: reduce`; all content is present in HTML without JavaScript.

## Verification and future checks

Completed for this change: Python HTML assertions found a single `#achievements` ID and no duplicate IDs, checked section heading order and local case-study targets; `tinycss2` parsed the stylesheet without errors; `node --check` passed for the existing navigation, case-study, project-filter and Three.js modules; `scripts/generate_case_studies.py --check` reported generated pages current; local HTTP smoke requests returned 200 for the homepage and both linked case-study routes; `git diff --check` passed. No package manifest exists, so there are no package scripts for build, lint or test.

Browser viewport, overflow, keyboard focus, reduced-motion rendering, and assistive-technology checks were not run. When browser tooling is available, check 320, 375, 768, 1024 and 1440 px widths, `#achievements` deep links and the two case-study links. Competition attribution should be revisited if the owner uploads official result certificates/screenshots.
