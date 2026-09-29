"""Dependency-free static HTML, metadata, JSON-LD, and local-link audit."""

from __future__ import annotations

import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    Path("index.html"),
    Path("projects/flowpilot-ai/index.html"),
    Path("projects/cortex/index.html"),
    Path("projects/mediguardian-ai/index.html"),
    Path("projects/infraos/index.html"),
    Path("404.html"),
]
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class AuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.tags: list[tuple[str, dict[str, str | None]]] = []
        self.data_by_tag: dict[str, list[str]] = {}
        self._open: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.append((tag, dict(attrs)))
        if tag not in VOID:
            self._open.append(tag)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.append((tag, dict(attrs)))

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self._open) - 1, -1, -1):
            if self._open[index] == tag:
                del self._open[index:]
                return

    def handle_data(self, data: str) -> None:
        for tag in self._open:
            self.data_by_tag.setdefault(tag, []).append(data)


def page_file(base: Path, path: str) -> Path:
    target = (base.parent / unquote(path)).resolve() if path else base.resolve()
    if target.is_dir():
        target /= "index.html"
    return target


def audit(path: Path) -> dict[str, object]:
    source = (ROOT / path).read_text(encoding="utf-8")
    parser = AuditParser()
    parser.feed(source)
    records = parser.tags
    tags = [name for name, _ in records]
    attrs = [values for _, values in records]
    meta = [values for name, values in records if name == "meta"]
    links = [values for name, values in records if name == "link"]
    title_values = parser.data_by_tag.get("title", [])
    titles = [" ".join("".join(title_values).split())] if title_values else []
    headings = [int(name[1]) for name in tags if re.fullmatch(r"h[1-6]", name)]
    ids = [str(item["id"]) for item in attrs if item.get("id")]
    duplicate_ids = sorted(key for key, count in Counter(ids).items() if count > 1)
    id_set = set(ids)
    errors: list[str] = []
    warnings: list[str] = []
    refs_checked = 0

    if source[:200].lower().find("<!doctype html>") < 0:
        errors.append("HTML doctype is missing")
    if not re.search(r"<html\b[^>]*\blang\s*=\s*(['\"])en\1", source, re.I):
        errors.append("html lang=en is missing")
    if len(titles) != 1 or not titles[0]:
        errors.append("Expected exactly one non-empty document title")
    if len([h for h in headings if h == 1]) != 1:
        errors.append("Expected exactly one H1")
    if duplicate_ids:
        errors.append("Duplicate IDs: " + ", ".join(duplicate_ids))
    for item in attrs:
        references = [str(item.get("for") or "")]
        references.extend(str(item.get(name) or "") for name in ("aria-labelledby", "aria-describedby", "aria-controls", "aria-errormessage"))
        for reference in " ".join(references).split():
            if reference and reference not in id_set:
                errors.append(f"ID reference has no target: {reference}")
    for previous, current in zip(headings, headings[1:]):
        if current > previous + 1:
            warnings.append(f"Heading level skips from H{previous} to H{current}")

    def meta_values(key: str, attribute: str = "name") -> list[str]:
        return [str(item.get("content") or "") for item in meta if item.get(attribute, "").lower() == key.lower()]

    descriptions = meta_values("description")
    if len(descriptions) != 1 or not descriptions[0]:
        errors.append("Expected one non-empty meta description")
    viewports = meta_values("viewport")
    if len(viewports) != 1:
        errors.append("Expected one viewport meta")
    if path != Path("404.html"):
        for key, attribute in [("og:title", "property"), ("og:description", "property"), ("og:type", "property"), ("twitter:card", "name")]:
            values = meta_values(key, attribute)
            if len(values) != 1 or not values[0]:
                errors.append(f"Expected one non-empty {key} metadata value")
    robots = meta_values("robots")
    if path == Path("404.html") and (len(robots) != 1 or "noindex" not in robots[0].lower()):
        errors.append("404 must be noindex")
    if len([item for item in links if item.get("rel", "").lower() == "canonical"]) > 1:
        errors.append("More than one canonical link")

    for name, item in records:
        if name == "img":
            if "alt" not in item:
                errors.append("Image missing alt attribute: " + str(item.get("src", "(no src)")))
            if not item.get("width") or not item.get("height"):
                warnings.append("Image lacks intrinsic dimensions: " + str(item.get("src", "(no src)")))
        if name == "a" and item.get("target", "").lower() == "_blank":
            rel = set((item.get("rel") or "").lower().split())
            if not {"noopener", "noreferrer"}.issubset(rel):
                errors.append("target=_blank lacks rel=noopener noreferrer: " + str(item.get("href", "(no href)")))
        candidates: list[str] = []
        if name in {"a", "link"}:
            candidates.append(str(item.get("href") or ""))
        elif name in {"img", "script", "source", "iframe", "video", "audio"}:
            candidates.append(str(item.get("src") or ""))
        if name == "source" or name == "img":
            candidates.extend(candidate.strip().split()[0] for candidate in str(item.get("srcset") or "").split(",") if candidate.strip())
        for candidate in candidates:
            if not candidate or candidate.startswith("#"):
                if name == "a" and candidate == "#":
                    warnings.append("Placeholder hash link found")
                continue
            parsed = urlsplit(candidate)
            if parsed.scheme or parsed.netloc:
                continue
            target = page_file(ROOT / path, parsed.path)
            if not target.is_relative_to(ROOT):
                errors.append(f"Local reference escapes repository: {candidate}")
                continue
            refs_checked += 1
            if not target.is_file():
                errors.append(f"Missing local target: {candidate}")
            elif parsed.fragment and target.suffix.lower() in {".html", ".htm"}:
                target_source = target.read_text(encoding="utf-8")
                if not re.search(r"\bid\s*=\s*(['\"])" + re.escape(unquote(parsed.fragment)) + r"\1", target_source):
                    errors.append(f"Missing local fragment: {candidate}")

    schema_values: list[dict[str, object]] = []
    schema_nodes = [i for i, (name, item) in enumerate(records) if name == "script" and item.get("type", "").lower() == "application/ld+json"]
    for index in schema_nodes:
        scripts = re.findall(r"<script\b[^>]*type=['\"]application/ld\+json['\"][^>]*>(.*?)</script\s*>", source, re.I | re.S)
        for payload in scripts:
            try:
                schema_values.append(json.loads(payload))
            except json.JSONDecodeError as error:
                errors.append(f"Invalid JSON-LD: {error}")
    if path == Path("index.html") and len(schema_values) != 1:
        errors.append("Homepage should contain one JSON-LD object")

    return {
        "path": path.as_posix(),
        "title": titles[0] if titles else "",
        "description": descriptions[0] if descriptions else "",
        "robots": robots[0] if robots else "indexable (default)",
        "canonical": [item.get("href") for item in links if item.get("rel", "").lower() == "canonical"],
        "og": {key: (meta_values(key, "property") or [""])[0] for key in ("og:title", "og:description", "og:type")},
        "twitter_card": (meta_values("twitter:card") or [""])[0],
        "h1_count": headings.count(1),
        "image_count": tags.count("img"),
        "local_references_checked": refs_checked,
        "jsonld": schema_values,
        "errors": errors,
        "warnings": warnings,
    }


def main() -> int:
    argument_parser = argparse.ArgumentParser(description=__doc__)
    argument_parser.add_argument("--json-out", type=Path, help="optional path for a machine-readable result")
    args = argument_parser.parse_args()

    pages = [audit(path) for path in PAGES]
    for field in ("title", "description"):
        values = [str(page[field]) for page in pages if page["path"] != "404.html"]
        duplicates = sorted(value for value, count in Counter(values).items() if count > 1)
        if duplicates:
            pages[0]["errors"].append(f"Duplicate indexable page {field}: " + "; ".join(duplicates))
    module_imports_checked = 0
    import_pattern = re.compile(r"\bimport\s*\(\s*['\"](\.[^'\"]+)['\"]\s*\)")
    for module in (ROOT / "js").glob("*.js"):
        for reference in import_pattern.findall(module.read_text(encoding="utf-8")):
            module_imports_checked += 1
            target = (module.parent / reference).resolve()
            if not target.is_relative_to(ROOT) or not target.is_file():
                pages[0]["errors"].append(f"Missing local module import: {module.relative_to(ROOT)} -> {reference}")
    pdf = ROOT / "images/My_CV.pdf"
    pdf_ok = pdf.is_file() and pdf.read_bytes()[:5] == b"%PDF-"
    result = {
        "pages": pages,
        "pdf_signature_valid": pdf_ok,
        "page_count": len(pages),
        "local_module_imports_checked": module_imports_checked,
        "errors": sum(len(page["errors"]) for page in pages),
        "warnings": sum(len(page["warnings"]) for page in pages),
    }
    if args.json_out:
        output = args.json_out if args.json_out.is_absolute() else ROOT / args.json_out
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8", newline="\n")
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if not result["errors"] and pdf_ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
