# Technical Expertise

The six category groups in the `#skills` section of `index.html` are the source of truth. They are authored as semantic HTML rather than generated from a data module; the collection is small, static, and should remain indexable if JavaScript is unavailable.

## Categories and content provenance

| Category | Displayed items | Evidence in this repository |
|---|---|---|
| Programming & scripting | Java, JavaScript, Python | Java roles and JavaFX projects; JavaScript/HTML/CSS in the academic planner and barber site; Python and Pandas in the accident analysis project. |
| Web products & visualization | HTML, CSS, React, Recharts | Existing project metadata for the planner, barbershop, and FocusFlow productivity tracker. |
| Desktop & AI integration | JavaFX, Perplexity AI | JARVEX is listed as a JavaFX chatbot using Perplexity AI. |
| Interactive 3D | Three.js, WebGL | The portfolio's `js/three-scene.js` initializes a Three.js WebGL renderer. |
| Data & databases | MySQL, Pandas | StockFlow lists MySQL; the accident analysis project lists Pandas. |
| Product design & collaboration | Figma, FigJam, Git, GitHub | ReNova and ResQNet list design-tool use; the portfolio's project repositories are hosted on GitHub and maintained in Git. |

The list intentionally avoids self-rated levels, percentages, project counts, and unsupported claims about production use. PHP and Power BI from the old skills list, as well as unverified cloud, framework, AI-agent, and RAG claims from the candidate taxonomy, are not included. Git/GitHub describe the existing repository workflow, not a proficiency rating.

## Layout and behavior

All six groups are visible in the page source and at first render. On wide screens they form a three-column grid, switch to two columns below 900px, and stack below 600px. Labels wrap within their cards. The layout uses the existing Porcelain Arctic tokens for surfaces, text, borders, spacing, and motion. There are no icons, external assets, filters, hidden entries, or section-specific animation.

The old filter buttons and `js/skills.js` initializer were removed because category content is concise enough to scan as a whole. The section has no JavaScript dependency; navigation retains its `#skills` anchor. Card headings use `h3` beneath the section `h2`, and each group is a semantic article containing a labeled list.

## Updating the section

Edit the matching article in `index.html` when adding or removing technologies. Keep categories focused, avoid duplicates and ratings, and add an item only when an existing project, implementation, or approved portfolio source supports it. Update the evidence table here at the same time. If the collection later needs filtering, add progressive enhancement that leaves every item visible before initialization and exposes the selected state accessibly.

## Verification

Task 06 static checks verify the category headings and labels, retained `#skills` navigation target, absence of legacy filter/rating markup, and valid CSS/JavaScript syntax. Browser rendering at the specified widths, keyboard/screen-reader review, and interactive browser checks require manual browser QA when a browser is available.
