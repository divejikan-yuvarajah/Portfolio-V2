# Portfolio V2 Content and Asset Inventory

**Source:** working tree `index.html`, `css/style.css`, `js/`, and `images/`. This records page content as found; it does not verify that claims are current or destinations work online.

## HTML sections and page regions

| Region / selector | Source lines | Current content/features | V2 disposition proposal |
|---|---:|---|---|
| Navigation `.navbar` | 26-45 | Logo and anchors to About, Skills, Projects, Experience, Education, Certifications, Contact; mobile toggle | Rebuild responsively; preserve navigation targets; logo destination owner decision |
| Hero `#hero` | 51-151 | Name, rotating role text, portrait, CV download, contact CTA | Rebuild visual hierarchy; preserve media/CTA and confirm positioning |
| About `#about` | 153-178 | Two biography paragraphs and four badges | Rewrite after owner confirms current story/focus |
| Skills `#skills` | 180-511 | Four filters; 14 technical skill cards, progress/level labels | Rebuild groups; verify technologies/levels; avoid unsupported ratings |
| Projects `#projects` | 513-720 | Nine cards with screenshots, role/tech summaries, external links | Preserve/archive; verify each current status, URL, copy, and image |
| Experience `#experience` | 722-777 | Four timeline records | Preserve confirmed records; validate titles and dates |
| Education `#education` | 779-814 | Two education timeline records, one detail list | Preserve confirmed records; validate dates/details |
| Certifications `#certifications` | 816-925 | Five compact cards with five `#` verification controls | Retain confirmed credentials; add only confirmed verification URLs |
| Contact `#contact` | 927-993 | Email/social channels and required fields contact form | Preserve confirmed links; form requires endpoint decision/testing |
| Footer | 996-1000 | Copyright line | Retain/update year and branding based on implementation date |
| Background canvas `#bg-canvas` | 47; initialized by `js/three-scene.js` | Three.js particle background | Optional enhancement; preserve only with fallback/accessibility/performance review |

## Image and PDF assets

Dimensions/file sizes below are observed from the local files. “Used” means an exact local path appears in the current HTML. Size and dimension readings are not quality judgments.

| File | Dimensions / size | Current HTML reference | Estimated use and status |
|---|---:|---|---|
| `images/profile_new.jpeg` | 3081×3072; 1,589,703 bytes | `index.html:146` | Hero portrait; used; high-resolution source; preserve pending owner review |
| `images/Jarvex.png` | 1517×887; 56,721 bytes | `index.html:545` | JARVEX project thumbnail; used |
| `images/StockFlow.png` | 1765×981; 267,702 bytes | `index.html:566` | StockFlow thumbnail; used |
| `images/FocusFlow.png` | 1920×1536; 259,310 bytes | `index.html:585` | FocusFlow thumbnail; used |
| `images/ReNova.png` | 1241×537; 265,850 bytes | `index.html:614` | ReNova thumbnail; used |
| `images/NextGPA.png` | 1894×872; 422,432 bytes | `index.html:631` | NextGPA+ thumbnail; used |
| `images/data_analysis.png` | 800×600; 29,776 bytes | `index.html:635` | Accident analysis thumbnail; used |
| `images/JackSparrow.png` | 1910×874; 1,986,373 bytes | `index.html:654` | Barbershop thumbnail; used; largest raster by bytes |
| `images/porfolio.png` | 1900×906; 470,615 bytes | `index.html:674` | Existing portfolio thumbnail; used; filename spelling as stored |
| `images/ResQNet.png` | 591×561; 257,251 bytes | `index.html:694` | ResQNet thumbnail; used |
| `images/My_CV.pdf` | 173,440 bytes | `index.html:127`, `download` attribute | CV download; used; PDF content/freshness not inspected |

All ten raster files and the CV are referenced. No orphan image/PDF file was identified by comparing the current `images/` directory with local HTML references. Each image tag also has an external placeholder-image fallback; those fallbacks were not fetched.

## Project cards and outbound links

Link status categories: **placeholder** means the source explicitly contains a placeholder or `#`; **not tested** means a concrete URL is present but its external response/ownership was not verified; **missing** means no destination is provided. No external destination is claimed functional based on this audit.

| Project card | Current media | Current link(s) | Link status / note |
|---|---|---|---|
| JARVEX: AI Chat Assistant | `Jarvex.png` | GitHub repo | Present, not tested; `.git` URL |
| StockFlow: Inventory System | `StockFlow.png` | GitHub repo | Present, not tested; `.git` URL |
| FocusFlow – Personal Productivity Tracker | `FocusFlow.png` | GitHub repo; Vercel demo | Present, not tested |
| ReNova: Sustainability App | `ReNova.png` | Figma design | Present, not tested; leading whitespace before `https` in `href` |
| NextGPA+ Academic Planner | `NextGPA.png` | GitHub repo | Present, not tested; card is compressed onto one HTML line |
| Sri Lanka Accident Analysis | `data_analysis.png` | GitHub repo | Present, not tested |
| Jack Sparrow: The Barber | `JackSparrow.png` | GitHub Pages demo | Present, not tested |
| Interactive 3D Portfolio | `porfolio.png` | `YOUR_GITHUB_LINK` | Placeholder; destination missing/needs owner confirmation |
| ResQNet: Disaster Response Platform | `ResQNet.png` | Figma design | Present, not tested |

Other links: CV download is a local path that resolves; in-page links use IDs that resolve; social profile links and mailto target are concrete but externally untested; five certification Verify links use `#` placeholders. Project names, roles, technology summaries, links, and current statuses should be confirmed before rewriting or moving into an archive.

## Current experience and education entries

| Type | Current title / institution | Current date text | Evidence/status |
|---|---|---|---|
| Experience | Software Developer — Freelance (Fiverr, UpWork) | Jan 2026–Present | `index.html:731-739`; current claim requires owner/CV confirmation |
| Experience | Founder Member & Head of Finance — Technologists Association of Trincomalee District (TATD) | April 2023–Present | `index.html:743-751`; confirm title/date/current status |
| Experience | Internship Banking Trainee — Hatton National Bank PLC | Sep 2023–July 2024 | `index.html:755-763`; confirm exact title/dates |
| Experience | Data Entry Clerk — AARNA EASTERN LANKA (PVT) LTD | Aug 2024–Sep 2024 | `index.html:767-775`; confirm exact title/dates |
| Education | Bachelor of Information and Communication Technology (Hons) — South Eastern University of Sri Lanka (SEUSL) | Oct 2024–Present | `index.html:788-795`; confirm status and wording |
| Education | Diploma in Cyber Security — London School of Business and Social Sciences (LSBSS) | Aug 2023–Jan 2024 | `index.html:799-810`; confirm wording and supporting details |

## Other repeated content

- Skills: Java, Python, JavaScript, PHP, HTML5, CSS3, Three.js, MySQL, Power BI, Figma, VS Code, IntelliJ IDEA, Git, GitHub; 14 cards with level/progress claims. All need owner validation before reuse.
- Certifications: Google Analytics Certification, Google AI Essentials, Azure & Web Development, Diploma in Cyber Security, DataScience, ML & SQL. Five verification links are placeholders.
- Role labels and biography include “Aspiring AI Software Engineer”, “Aspiring Data Engineer”, “AI & ML Enthusiast”, “Software Developer”, and “Entrepreneur”; confirm the desired positioning.

## Needs owner confirmation

- Updated CV, preferred portrait, public contact channels, professional profile URLs, and whether email should remain displayed.
- Current status, role, contribution, technical stack, screenshots, live demo, and verified repository for each existing project.
- Whether planned projects should appear, and proof/status before claims: FlowPilot AI; CORTEX; MediGuardian AI; INFRAOS (mark in development only if current); InvoiceX AI; JevFlow (verify status/links); Thinky; HireQueue; PowerGuard IoT (verify academic project stage). Older JARVEX, StockFlow, FocusFlow should be considered for an archive rather than removed without decision.
- Current company names and dates: Founder & CEO at Zatroz; Co-Founder & Technical Lead at Softora; startup start dates and role descriptions need owner confirmation before publication.
- Competition/achievement wording, results, evidence, leadership/community roles, and whether achievements merit a separate section.
- Experience titles and dates, education status, certification names/dates/IDs, and valid credential verification links.
- Skill groups/technologies to display and whether any proficiency labels are supportable.
- Contact form destination, privacy expectations, success/error behavior, or whether direct contact links are sufficient.
- Confirmed canonical domain, social preview image, favicon, and final public title/description.
- Whether CDN-hosted Three.js and Google Fonts remain acceptable for the actual host/network/privacy requirements.
