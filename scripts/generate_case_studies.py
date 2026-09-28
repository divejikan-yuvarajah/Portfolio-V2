"""Generate static, refresh-safe case-study pages from gallery HTML + long-form JSON."""

from __future__ import annotations

import argparse
import html
import json
from html.parser import HTMLParser
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "case-studies.json"
INDEX_PATH = ROOT / "index.html"
PAGE_ORDER = ["flowpilot-ai", "cortex", "mediguardian-ai", "infraos"]
CATEGORY_LABELS = {
    "ai": "AI & ML",
    "finance": "FinTech",
    "fullstack": "Full-stack",
    "web": "Web",
    "civic": "CivicTech",
}
VOID_ELEMENTS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Node:
    def __init__(self, tag: str, attrs: dict[str, str | None]):
        self.tag = tag
        self.attrs = attrs
        self.children: list[Node | str] = []


class DocumentTree(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Node("#document", {})
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Node(tag, dict(attrs))
        self.stack[-1].children.append(node)
        if tag not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.stack[-1].children.append(Node(tag, dict(attrs)))

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        if data.strip():
            self.stack[-1].children.append(data)


def descendants(node: Node, *, tag: str | None = None) -> list[Node]:
    result: list[Node] = []
    for child in node.children:
        if not isinstance(child, Node):
            continue
        if tag is None or child.tag == tag:
            result.append(child)
        result.extend(descendants(child, tag=tag))
    return result


def classes(node: Node) -> set[str]:
    return set((node.attrs.get("class") or "").split())


def text_content(node: Node) -> str:
    pieces: list[str] = []
    for child in node.children:
        pieces.append(text_content(child) if isinstance(child, Node) else child)
    return " ".join(" ".join(pieces).split())


def read_gallery() -> dict[str, dict[str, Any]]:
    tree = DocumentTree()
    tree.feed(INDEX_PATH.read_text(encoding="utf-8"))
    sections = [node for node in descendants(tree.root, tag="section") if node.attrs.get("id") == "projects"]
    if len(sections) != 1:
        raise ValueError("Expected exactly one #projects section in index.html")

    projects: dict[str, dict[str, Any]] = {}
    for article in descendants(sections[0], tag="article"):
        slug = article.attrs.get("data-case-study-slug")
        if not slug:
            continue
        content_nodes = [node for node in descendants(article, tag="div") if "project-content" in classes(node)]
        if len(content_nodes) != 1:
            raise ValueError(f"Expected one .project-content node for {slug}")
        content = content_nodes[0]
        headings = descendants(content, tag="h4")
        status_nodes = [node for node in descendants(content, tag="p") if "project-status" in classes(node)]
        tag_lists = [node for node in descendants(content, tag="ul") if "project-tags" in classes(node)]
        descriptions = [
            node for node in descendants(content, tag="p")
            if not classes(node).intersection({"project-status", "project-source-note", "project-disclaimer"})
        ]
        if len(headings) != 1 or len(status_nodes) != 1 or not descriptions:
            raise ValueError(f"Gallery card {slug} is missing title, status, or summary")

        tags = [text_content(item) for item in descendants(tag_lists[0], tag="li")] if tag_lists else []
        links = []
        for anchor in descendants(article, tag="a"):
            href = anchor.attrs.get("href") or ""
            if href.startswith("https://"):
                links.append({
                    "href": href,
                    "label": text_content(anchor),
                    "ariaLabel": anchor.attrs.get("aria-label") or text_content(anchor),
                    "target": anchor.attrs.get("target"),
                    "rel": anchor.attrs.get("rel"),
                })

        projects[slug] = {
            "slug": slug,
            "title": text_content(headings[0]),
            "status": text_content(status_nodes[0]),
            "summary": text_content(descriptions[0]),
            "categories": (article.attrs.get("data-categories") or "").split(),
            "tags": tags,
            "links": links,
        }

    if list(projects) != PAGE_ORDER:
        raise ValueError(f"Featured gallery case-study order must be {PAGE_ORDER}; found {list(projects)}")
    return projects


def e(value: Any) -> str:
    return html.escape(str(value), quote=True)


def render_list(items: list[str], class_name: str = "case-study-list") -> str:
    if not items:
        return ""
    return f'<ul class="{class_name}">' + "".join(f"<li>{e(item)}</li>" for item in items) + "</ul>"


def render_actions(project: dict[str, Any]) -> str:
    actions = [
        '<a class="case-action" href="#case-study-content">Read the case study <span aria-hidden="true">↓</span></a>'
    ]
    for link in project["links"]:
        is_repo = "github.com/" in link["href"]
        label = "Source repository" if is_repo else "Public project preview"
        safe = link.get("target") == "_blank" and "noopener" in (link.get("rel") or "") and "noreferrer" in (link.get("rel") or "")
        attrs = ' target="_blank" rel="noopener noreferrer"' if safe else ""
        actions.append(f'<a class="case-action case-action--secondary" href="{e(link["href"])}"{attrs} aria-label="{e(label)} for {e(project["title"])} (opens in a new tab)">{e(label)} <span aria-hidden="true">↗</span></a>')
    return '<div class="case-actions">' + "".join(actions) + "</div>"


def render_features(items: list[dict[str, str]]) -> str:
    if not items:
        return ""
    cards = "".join(
        f'<article class="case-feature"><p class="case-feature-index">{index:02}</p><h3>{e(item["title"])}</h3><p>{e(item["text"])}</p></article>'
        for index, item in enumerate(items, start=1)
    )
    return f'<section class="case-section" id="case-features" aria-labelledby="case-features-title"><p class="case-section-kicker">02 · PROJECT SCOPE</p><h2 id="case-features-title">What the project describes</h2><p class="case-section-intro">These points are attributed to the project material noted on this page. Their presence in a README is not a substitute for an independent product test.</p><div class="case-feature-grid">{cards}</div></section>'


def render_architecture(project: dict[str, Any], data: dict[str, Any]) -> str:
    architecture = data["architecture"]
    steps = architecture.get("steps", [])
    stack = architecture.get("stack", [])
    step_markup = render_list(steps, "case-flow")
    stack_markup = "<ul class=\"case-tags\">" + "".join(f"<li>{e(item)}</li>" for item in stack) + "</ul>" if stack else ""
    return f'''<section class="case-section case-section--alternate" id="case-architecture" aria-labelledby="case-architecture-title">
        <p class="case-section-kicker">03 · TECHNICAL VIEW</p><h2 id="case-architecture-title">Architecture &amp; implementation</h2>
        <p>{e(architecture["intro"])}</p>{step_markup}{stack_markup}<p class="case-source-note">{e(architecture["note"])}</p>
    </section>'''


def render_related(project: dict[str, Any], all_projects: dict[str, dict[str, Any]], related: list[str]) -> str:
    cards = []
    for slug in related:
        item = all_projects[slug]
        cards.append(f'''<a class="related-case" href="../{e(slug)}/">
            <span>{e(item['status'])}</span><strong>{e(item['title'])}</strong><span class="related-arrow" aria-hidden="true">↗</span>
        </a>''')
    return f'''<section class="case-section" aria-labelledby="related-case-title"><p class="case-section-kicker">KEEP EXPLORING</p>
        <h2 id="related-case-title">More featured work</h2><div class="related-case-grid">{"".join(cards)}</div>
        <a class="case-back-link case-back-link--bottom" href="../../index.html#projects">← Back to all projects</a>
    </section>'''


def render_page(slug: str, project: dict[str, Any], data: dict[str, Any], all_projects: dict[str, dict[str, Any]]) -> str:
    title = project["title"]
    description = data["metaDescription"]
    category = " · ".join(CATEGORY_LABELS.get(key, key.title()) for key in project["categories"])
    tags = "".join(f"<li>{e(tag)}</li>" for tag in project["tags"])
    goals = render_list(data.get("goals", []))
    features = render_features(data.get("features", []))
    planned = render_list(data.get("planned", []), "case-study-list case-study-list--planned")
    contribution = data["role"]
    architecture = render_architecture(project, data)
    decisions = ""
    if data.get("decisions"):
        entries = "".join(f"<li><h3>{e(item['title'])}</h3><p>{e(item['text'])}</p></li>" for item in data["decisions"])
        decisions = f'<section class="case-section" id="case-decisions" aria-labelledby="case-decisions-title"><p class="case-section-kicker">ENGINEERING NOTES</p><h2 id="case-decisions-title">Decisions &amp; trade-offs</h2><ul class="case-decision-list">{entries}</ul></section>'

    outcome = render_list(data.get("outcomes", []))
    limitations = render_list(data.get("limitations", []))
    related = render_related(project, all_projects, data["relatedSlugs"])
    schema = json.dumps({"@context": "https://schema.org", "@type": "WebPage", "name": f"{title} — Project case study", "description": description}, ensure_ascii=False).replace("<", "\\u003c")
    source_link_notice = "" if any("github.com/" in link["href"] for link in project["links"]) else '<p class="case-source-note">A public repository link is not included because a destination could not be verified for this project.</p>'
    feature_index = "FEATURED PROJECT · " + slug.upper().replace("-", " ")

    return f'''<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#F8FAFC">
    <title>{e(title)} — Project case study | Yuvarajah Divejikan</title>
    <meta name="description" content="{e(description)}">
    <meta property="og:title" content="{e(title)} — Project case study">
    <meta property="og:description" content="{e(description)}">
    <meta property="og:type" content="article">
    <script type="application/ld+json">{schema}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/tokens.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/case-studies.css">
</head>
<body class="case-study-document">
    <a class="skip-link" href="#case-study-main">Skip to case study</a>
    <header class="site-header">
        <nav class="navbar" aria-label="Primary navigation">
            <div class="container">
                <a href="../../index.html#hero" class="logo" aria-label="Divejikan, home">Divejikan<span class="accent" aria-hidden="true">.</span></a>
                <button class="menu-toggle" id="mobile-menu" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="nav-links"><span class="bar" aria-hidden="true"></span><span class="bar" aria-hidden="true"></span><span class="bar" aria-hidden="true"></span></button>
                <ul class="nav-links" id="nav-links">
                    <li><a href="../../index.html#about">About</a></li><li><a href="../../index.html#skills">Skills</a></li><li><a href="../../index.html#projects">Projects</a></li><li><a href="../../index.html#experience">Experience</a></li><li><a href="../../index.html#education">Education</a></li><li><a href="../../index.html#certifications">Certifications</a></li><li><a href="../../index.html#contact" class="btn-nav">Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <main id="case-study-main" class="case-study-page">
        <div class="container">
            <nav class="case-breadcrumb" aria-label="Breadcrumb">
                <ol><li><a href="../../index.html#hero">Home</a></li><li><a href="../../index.html#projects">Projects</a></li><li aria-current="page">{e(title)}</li></ol>
            </nav>
            <a class="case-back-link" href="../../index.html#projects">← Back to Projects</a>
            <section class="case-hero" aria-labelledby="case-title">
                <div class="case-hero-copy">
                    <p class="case-eyebrow">{e(category)} <span aria-hidden="true">/</span> {e(data['projectType'])}</p>
                    <p class="case-status">{e(project['status'])}</p>
                    <h1 id="case-title">{e(title)}</h1>
                    <p class="case-summary">{e(project['summary'])}</p>
                    <ul class="case-tags" aria-label="Project categories">{tags}</ul>
                    {render_actions(project)}
                </div>
                <figure class="case-illustration case-illustration--{e(slug)}">
                    <p class="case-illustration-label">{e(feature_index)}</p>
                    <strong aria-hidden="true">{e(title)}</strong>
                    <figcaption>Typographic illustration · no verified product screenshot is available in this repository.</figcaption>
                </figure>
            </section>
            <dl class="case-facts" aria-label="Project facts">
                <div><dt>Project type</dt><dd>{e(data['projectType'])}</dd></div>
                <div><dt>Stage</dt><dd>{e(project['status'])}</dd></div>
                <div><dt>Focus</dt><dd>{e(category)}</dd></div>
            </dl>

            <div class="case-content" id="case-study-content">
                <section class="case-section" id="case-problem" aria-labelledby="case-problem-title">
                    <p class="case-section-kicker">01 · CONTEXT</p><h2 id="case-problem-title">The problem</h2><p class="case-lead">{e(data['problem'])}</p>
                    <h3>Project goals</h3>{goals}
                </section>
                <section class="case-section case-section--alternate" id="case-contribution" aria-labelledby="case-contribution-title">
                    <p class="case-section-kicker">MY ROLE</p><h2 id="case-contribution-title">{e(contribution['label'])}</h2><p class="case-lead">{e(contribution['text'])}</p>
                </section>
                {features}
                {architecture}
                {decisions}
                <section class="case-section" id="case-outcome" aria-labelledby="case-outcome-title">
                    <p class="case-section-kicker">04 · RESULT &amp; REFLECTION</p><h2 id="case-outcome-title">What can be confirmed</h2>{outcome}
                    {f'<h3>Planned direction · not shipped features</h3>{planned}' if planned else ''}
                </section>
                <section class="case-section case-section--limitations" aria-labelledby="case-limitations-title">
                    <p class="case-section-kicker">SCOPE &amp; LIMITS</p><h2 id="case-limitations-title">What this page does not claim</h2>{limitations}{source_link_notice}
                </section>
                <section class="case-media-note" aria-labelledby="case-media-title">
                    <div><p class="case-section-kicker">MEDIA NOTE</p><h2 id="case-media-title">Project imagery</h2><p>No approved interface captures were present in the portfolio repository when these pages were prepared. This illustration is intentionally typographic; it does not depict product UI.</p></div>
                    <a class="case-back-link" href="../../index.html#projects">Return to the project gallery →</a>
                </section>
                {related}
            </div>
        </div>
    </main>
    <footer class="case-footer"><div class="container"><p>© 2026 Yuvarajah Divejikan</p><a href="../../index.html#contact">Get in touch</a></div></footer>
    <script type="module" src="../../js/case-study.js"></script>
</body>
</html>
'''


def render_404() -> str:
    return '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#F8FAFC"><title>Page not found | Yuvarajah Divejikan</title><meta name="description" content="This portfolio page could not be found. Return to the project gallery to browse available work."><meta name="robots" content="noindex"><link rel="stylesheet" href="css/tokens.css"><link rel="stylesheet" href="css/style.css"><link rel="stylesheet" href="css/case-studies.css"></head>
<body><a class="skip-link" href="#not-found-main">Skip to main content</a><main id="not-found-main" class="case-not-found"><div class="container"><p class="case-eyebrow">404 · PAGE NOT FOUND</p><h1>This project page isn't here.</h1><p>The address may have changed, or this case study has not been published.</p><a class="case-action" href="index.html#projects">Return to Projects <span aria-hidden="true">→</span></a></div></main></body></html>\n'''


def outputs() -> dict[Path, str]:
    gallery = read_gallery()
    case_data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if list(case_data) != PAGE_ORDER:
        raise ValueError(f"Case-study JSON order must be {PAGE_ORDER}; found {list(case_data)}")
    for slug, data in case_data.items():
        for related in data.get("relatedSlugs", []):
            if related not in case_data or related == slug:
                raise ValueError(f"Invalid related project {related!r} on {slug}")
    result: dict[Path, str] = {}
    for slug, data in case_data.items():
        page = render_page(slug, gallery[slug], data, gallery)
        page_dir = ROOT / "projects" / slug
        result[page_dir / "index.html"] = page
    result[ROOT / "404.html"] = render_404()
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if generated pages are stale")
    args = parser.parse_args()

    generated = outputs()
    stale: list[str] = []
    for path, content in generated.items():
        if args.check:
            if not path.is_file() or path.read_text(encoding="utf-8") != content:
                stale.append(path.relative_to(ROOT).as_posix())
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8", newline="\n")
            print(f"Generated {path.relative_to(ROOT).as_posix()}")
    if stale:
        print("Generated case-study output is stale: " + ", ".join(stale))
        return 1
    if args.check:
        print(f"Case-study output is current ({len(generated)} static pages including 404).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
