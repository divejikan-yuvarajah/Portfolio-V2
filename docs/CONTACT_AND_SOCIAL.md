# Contact & Social Integration (Task 13)

## Contact behavior and provider status

The site has no server endpoint, form provider, deployment function, or configured delivery service. The contact form is an email-app handoff only; it does not send, store, or track messages. The visible action is **Prepare Email** because it opens a visitor-controlled compose window and the visitor must review and press Send in their own email application.

The direct email link and address remain visible independently of JavaScript. The form is progressively enhanced: `js/contact.js` attaches one submit listener and reveals it after initialization. If scripts are disabled or fail, the form stays hidden and the direct email and social profile links remain available.

The handler trims outer whitespace, validates required Name, Email and Message fields, rejects whitespace-only input, applies length limits, and presents field-specific feedback through associated error text and browser validity. A prepared URL is limited to 1,800 characters. If the encoded content would exceed that limit, nothing is truncated or launched; the status message directs the visitor to copy their message and use the displayed email address. On a handoff, the live status explains that the user must send from their email application. The browser cannot confirm whether mail was sent or delivered.

No visitor content is inserted into HTML, persisted, sent to analytics, or transmitted to a service. A future provider must be selected and configured with owner approval; implement delivery and validation on a server-side endpoint, keep secrets server-side, add appropriate abuse controls, and show success only after a real provider success response. Never add provider credentials to static HTML, browser JavaScript, or public environment variables.

## Public destinations and maintenance

| Label | Destination | Verification |
|---|---|---|
| Email | `mailto:divejuthe@gmail.com` | Preserved from the approved current portfolio content; the browser cannot verify the visitor's mail application or delivery. |
| LinkedIn | `https://www.linkedin.com/in/divejikan-yuvarajah-401526279/` | The current public GitHub profile links to this LinkedIn slug. Automated retrieval of LinkedIn itself was blocked, so the profile page response was not independently checked. |
| GitHub | `https://github.com/divejikan-yuvarajah` | Opened successfully; the public profile identifies Yuvarajah Divejikan and links back to the LinkedIn profile above. |

The three public destinations are authored in `index.html`; the handoff reads its recipient from the direct email anchor so that the displayed address and prepared email stay aligned. Update them only when a newer owner-approved destination is confirmed. No other accounts, address, phone or availability claims are published.

## Layout and accessibility

The section preserves `id="contact"`, has a labelled section heading, direct email CTA, text-labelled external links and a responsive two-column layout that stacks below 760px. It reuses semantic Porcelain Arctic tokens, persistent field labels, 44px-class interactive targets, visible focus styles, safe new-tab attributes and a polite status region. Errors have text and are not conveyed by color alone. The form does not depend on animation; shared reduced-motion rules remain in force.

The footer uses the established personal name, a concise descriptor, copyright year 2026 and a compact set of native Home, Projects, Contact and Back to top anchors. Case-study pages retain their existing relative path to `index.html#contact`.

## Verification limits

Static tests can check markup, links, selector structure, field constraints and URL construction rules. A mailto handoff cannot be considered a delivery test. Direct viewport rendering, keyboard/screen-reader operation and mail-application behavior must be checked in a browser/device environment; automated LinkedIn page access was blocked during this task.

## Task 13 verification record

- `node --check` passed for every `js/*.js` module; `tinycss2` parsed `tokens.css`, `style.css` and `case-studies.css` without syntax errors.
- A static HTML/reference audit passed: 37 unique root-page IDs, one `h1`, resolvable local references and fragment links, safe `target="_blank"` rel attributes, labelled contact fields/status, and unchanged markup before `#contact`.
- A contact-handler simulation passed for valid mailto URL construction, whitespace-only name rejection, and an oversized URL fallback with the full message retained.
- Local HTTP smoke requests returned 200 for the homepage, contact styles/scripts, CV and all four case-study routes. `scripts/generate_case_studies.py --check` reported current output, and `git -c core.whitespace=cr-at-eol diff --check` passed.
- No package manifest or configured build/test runner exists. No browser was available, so rendered checks at 320, 375, 768, 1024, 1440px, 200% zoom, keyboard/screen reader behavior, and an actual email-app launch were not run. No delivery or mail-sent claim is made.
