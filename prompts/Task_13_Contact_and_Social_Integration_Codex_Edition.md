# PORTFOLIO V2 — TASK 13
## Premium Contact & Social Integration — Complete Enhanced Codex Edition

**Project:** Yuvarajah Divejikan — Portfolio V2  
**Task:** 13 of 17  
**Feature branch:** `task/13-contact-social-integration`  
**Design system:** Porcelain Arctic  
**Deliverable:** An accessible, professional, genuinely usable contact experience, verified social links and coherent footer.  
**Scope boundary:** Implement **Task 13 only**. Do not begin Task 14 (GSAP animations), Task 15 (site-wide mobile optimisation), Task 16 (site-wide SEO/performance), or Task 17 (final deployment).

---

## 1. Role and mission

Act as a senior frontend engineer, UI/UX designer, accessibility specialist, privacy-aware web developer and QA engineer. Rebuild the current contact and social section into a premium, credible, low-friction way for recruiters, collaborators, founders and clients to reach Divejikan.

The most important functional objective: **never make a contact form appear to send messages when no delivery mechanism exists.** Build useful, truthful behaviour using the services actually configured in this repository; do not invent a backend, API key, recipient inbox, success response or working integration.

Keep the design aligned with Tasks 02–12 and the existing approved V2 architecture. The initial reference repository was vanilla HTML, CSS and browser ES modules. Inspect the current V2 repository first; do not blindly assume it remains unchanged or has migrated to Next.js.

## 2. Verified repository context at prompt creation — recheck before editing

The actual user-owned V2 repository was inspected at:
`https://github.com/divejikan-yuvarajah/Portfolio-V2`

At the time of inspection:
- `index.html` includes `<section id="contact" class="contact-section">`.
- The current section shows Email, LinkedIn and GitHub cards followed by a form containing Name, Email and Message, each marked required.
- That form has **no `action`, `method`, input `name` attributes, or JavaScript submit handler**, so its current **Send Message** button does not send an email or persist data.
- `js/main.js` initialises animations, navigation and projects; a decorative Three.js module loads independently.
- `css/tokens.css` contains the implemented Porcelain Arctic semantic design tokens, and `css/style.css` owns most section styling.
- The site is a static, no-build deployment in the documented architecture, with four standalone project case-study routes.
- `docs/ARCHITECTURE.md` explicitly identifies the contact form as a pending functional problem.

**Verified existing public contact destinations in the V2 markup:**
- Email: `divejuthe@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/divejikan-yuvarajah/`
- GitHub: `https://github.com/divejikan-yuvarajah`

Treat the currently checked-out repo and latest approved content as the final source of truth. If a verified contact address has changed since this prompt, preserve the newer approved value instead of reverting it.

**Do not publish a phone number, WhatsApp number, physical address or additional personal accounts without explicit approval.** Do not guess Instagram, X/Twitter, Calendly, startup site or other URLs.

## 3. Dependencies and version safety

1. Inspect `git status`, branch, upstream and recent commits before changing files. Preserve unrelated uncommitted work.
2. Confirm Tasks 02–12 have been integrated into the **approved base branch**. Do not use a stale main or silently cherry-pick unrelated changes. If Task 12 is still a separate feature branch, report the integration dependency and stop safely or use a clearly documented user-approved integration base.
3. Read actual existing documentation where present: `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/NAVIGATION.md`, `docs/HERO.md`, `docs/IMPLEMENTATION_PLAN.md` and any Task 12 documents. Missing docs should be reported, not invented.
4. Inspect the real `#contact` markup, relevant CSS, JS modules, header/footer and links that navigate to Contact (including Hero and standalone case studies).
5. Preserve `id="contact"` and working deep link `/#contact`; do not regress Task 03 sticky offsets or active-section tracking.
6. Do not edit the original `Mister_PersonalPortfolio` repo.
7. Do not perform a framework migration or add dependencies unless the *current* approved project already needs them for this focused task.
8. Never insert secrets or API keys into browser JavaScript, markup, Vercel public env vars, committed config or Git history.
9. Do not automatically merge, deploy, purchase a service or open an account.

## 4. Desired information architecture

Design the section with a clear hierarchy:

**Eyebrow:** `LET'S CONNECT`  
**Heading:** `Have something in mind? Let's talk.`  
**Short intro:** `I'm open to software engineering opportunities, AI collaborations, meaningful projects and conversations about building useful technology.`

Avoid falsely implying 24/7 availability, guaranteed reply times, active hiring status or services not confirmed.

Recommended two-part layout:

**Left / primary content:**
- Concise invitation and contact purpose.
- Primary email CTA.
- Visually distinct but lightweight LinkedIn and GitHub actions.
- Optional truthful note such as `Email is the most reliable way to reach me.`

**Right / secondary content:**
- Contact form **only if it performs a real, honestly labelled action**, either with a configured delivery provider or with a mail-app handoff as defined in Section 6.
- Maintain ample space without huge blank cards or forced matching heights.

Below or integrated with the section:
- A restrained social-links strip if it improves clarity, but do not duplicate the same links three times.
- A neat footer with consistent name/identity, copyright and relevant links.

Preserve existing navigation/hero contact CTA destinations and provide a clear path back to the top if the design benefits from it.

## 5. Porcelain Arctic styling requirements

Reuse actual Task 02 semantic CSS variables and shared primitives, rather than hardcoding new palettes throughout the component.

Reference roles:

| Role | Reference colour |
|---|---|
| Page canvas | `#F8FAFC` |
| Warm alternate surface | `#F5F4F0` |
| Elevated card | `#FFFFFF` |
| Heading | `#0F172A` |
| Body | `#475569` |
| Cobalt action | `#2563EB` |
| Cobalt hover | `#1D4ED8` |
| Arctic decorative accent | `#60A5FA` |
| Soft highlight | `#DBEAFE` |
| Border | `#E2E8F0` |
| Success | existing `--color-success` token |
| Error | existing `--color-danger` token |

Typography:
- **Manrope:** heading and key identity.
- **Inter:** body, labels, buttons and fields.
- **JetBrains Mono:** optional small metadata only.

Visual direction:
- Spacious, professional and human-centred rather than a generic SaaS dashboard.
- Elegant section introduction, white/porcelain surfaces, subtle border and reasonable radius.
- Strong cobalt primary CTA; secondary social links are restrained outline/text actions.
- Consistent 44px-minimum interactive targets where practical.
- Distinct hover, focus, disabled and validation states.
- Avoid giant glowing blobs, neon colours, heavy glass effects or fake online/availability indicators.
- Remove legacy inline styles in **this section only**, replacing them with scoped reusable styles.
- Do not override globally shared `.skill-card`, `.btn`, `.glass-card` or `form` rules in a way that damages other sections.

## 6. Contact form decision — functional honesty is critical

**First, inspect whether a real delivery mechanism is already configured.** Determine whether there is a valid endpoint, authorized email provider, serverless function, existing deployment environment or other user-approved service. Document the actual evidence.

### Path A — real delivery already configured and permitted

If a legitimate contact endpoint/service is present:
1. Use its existing documented integration correctly.
2. Ensure message delivery is verified with an actual success response; frontend validation alone is insufficient.
3. Include field validation, send-in-progress state, response errors, retries, and an accessible `aria-live` status region.
4. Show a success message **only after** the service confirms success.
5. Keep all secrets server-side. Never expose private credentials in client code.
6. Add appropriate server-side validation and anti-spam protection (e.g. honeypot/rate limiting) where the existing backend architecture permits.
7. Do not deploy/send a real test message to the owner's inbox without care; use a permitted test mode or report the limits of live delivery verification.

### Path B — no provider exists (the expected initial state)

Implement a **truthful email-first contact experience** without introducing a fake backend. Default recommendation:
- Make `mailto:divejuthe@gmail.com` the reliable, prominent action labelled **Email Me** or **Open Email App**.
- Either (i) retain a form that prepares a compose-email `mailto:` link with sanitized, length-limited, URL-encoded subject/body, **or** (ii) simplify the design to direct email plus social links if a form would be confusing or unreliable.
- If retaining the form, label submit explicitly **Prepare Email** or **Open Email App**, **not Send Message**. Explain that it opens the visitor's email client and the visitor must send the email manually.
- Do not show **Message sent**, **Delivered**, **Sent successfully**, or similar delivery claims for a mailto handoff. A mailto link cannot confirm delivery.
- The fallback if a mail client is unavailable must remain obvious: display a selectable, copyable email address and a direct `mailto:` link.
- Avoid silently collecting or storing visitor messages locally or sending them to analytics.
- Ensure long message text cannot create unbounded mailto URLs. If the message exceeds a reasonable compose-link limit, instruct the user to copy the text and email directly rather than truncating silently.
- Only user-initiated submission should launch the email handler; never auto-launch it on page load.

**Do not add Formspree, EmailJS, Resend, Web3Forms or similar providers unless a real user-approved account/configuration already exists or the user separately approves an integration.** If a new service is needed, document the optional setup rather than claiming it works.

A non-working contact form is worse than a clearly labelled email-first CTA. Choose the simplest honest solution for the existing static stack.

## 7. Form content and validation (if form retained)

Fields:
- `Name` — required; trim outer whitespace; reasonable min/max length; safe text handling.
- `Email` — required and `type="email"`; apply appropriate native validation.
- `Message` — required; reasonable min/max length; preserve meaningful line breaks in mail body.
- Optional `Subject` can improve usability if kept simple; avoid unnecessary dropdowns.
- If a live provider is configured, optionally include an inaccessible-to-bots honeypot with suitable accessible treatment and server-side checks; **a client-side honeypot alone is not robust security**.

Requirements:
- Use `<label for>` and unique `id` values. Provide `name` attributes if the form is submitted or serialized.
- Use `autocomplete="name"` and `autocomplete="email"` where appropriate.
- Show clear instructions and human-readable error messages near the relevant field.
- Respect native validation and do not fight browser autofill/paste.
- Form status is announced accessibly (`role="status"` / `aria-live`) without noisy repeated announcements.
- No console-only error reporting for end users.
- A disabled/loading state is required only for genuine async delivery, not as fake visual feedback.
- No CAPTCHA, tracking pixels, third-party embeds or additional personal information fields unless a configured implementation specifically requires them.
- Add a short, accurate privacy note only if it describes actual behaviour; do not invent a privacy policy or claim legal compliance that has not been verified.

## 8. Social integrations and link quality

Use the existing verified links in the current V2 code unless a newer user-approved link is present:

| Label | URL / destination | Behaviour |
|---|---|---|
| Email | `mailto:divejuthe@gmail.com` | Opens visitor's mail application; no claim of delivery |
| LinkedIn | `https://www.linkedin.com/in/divejikan-yuvarajah/` | External professional profile |
| GitHub | `https://github.com/divejikan-yuvarajah` | External code profile |

- Check destination syntax and, where tooling permits, HTTP reachability. Do not confuse a bot-protected response with proof a profile does not exist; disclose limits.
- Links opening a new tab use `target="_blank" rel="noopener noreferrer"` and descriptive accessible names.
- Use accessible icons with text labels; do not rely on icons alone.
- Do not hardcode social follower counts, activity status or badges fetched from unverified third-party services.
- Prefer a single central source for contact link data only if consistent with the current repository architecture. No need to introduce JSON or JS purely for three static anchor links.
- Do not add Zatroz or Softora as personal social profiles. Their sites may be presented as separate ventures only if already verified and intentionally appropriate to this section.

## 9. Footer redesign — within Task 13 only

Update the existing footer as the natural end of the contact area:
- Display **Yuvarajah Divejikan** or the site's established personal wordmark consistently.
- Optional compact descriptor: `Software Engineering · AI/ML · Building useful products` (adjust to verified branding).
- Copyright year can be current year dynamically if safe in the static architecture, or use an accurate plain year. Do not imply a company owns the personal portfolio.
- Include only a small relevant link set (e.g., Home/Projects/Contact, GitHub, LinkedIn); do not repeat every main-nav link or crowd mobile.
- Ensure local anchors work from the homepage; if the same footer is shared on standalone case-study pages, use correct relative/root-safe paths for those routes.
- Provide a simple and accessible Back to Top link if included, avoiding JS-only controls.
- Do not insert broken legal/privacy links, company logos or an invented location/address.
- Ensure the new footer visually matches the approved header and section system.

## 10. Animation and reduced motion

Task 14 is the dedicated advanced-animation task. For Task 13, use only existing reveal infrastructure and subtle transitions:
- modest card/link hover;
- small optional section reveal;
- no parallax, full-page transitions, auto-playing animations, or new GSAP dependency;
- no essential content hidden when JavaScript fails;
- respect `prefers-reduced-motion: reduce`.

Preserve any optional Three.js scene and avoid layering interactive content behind it. Do not let the custom cursor obscure focus or form interaction.

## 11. Accessibility and interaction acceptance

1. Keep stable `id="contact"`; the contact heading remains visible when navigated to via sticky header.
2. Use a semantic `section` with an appropriate `h2`, not a duplicate page `<h1>`.
3. Links and form fields have accessible names and visible focus indicators.
4. Icons are labelled or decorative as appropriate (`aria-hidden="true"` for decorative icons).
5. Field labels are always readable; floating labels must work for focus, filled values, autofill and invalid states. Simpler persistent labels are preferred.
6. AA contrast for body, placeholders where meaningful, focus and validation cues.
7. Error/success/hand-off instructions do not rely only on colour.
8. Keyboard Tab/Shift+Tab and Enter/Space activation are predictable.
9. Status announcements are clear and not misleading.
10. Correct tab order and no focus traps or accidentally hidden controls.
11. Touch targets are approximately 44px high where practicable.
12. With JS disabled, users can still find the email address and use basic email/social links.

## 12. Responsive design

Verify at **320, 375, 768, 1024 and 1440px**, plus an intermediate breakpoint if the layout switches there.

- Desktop: balanced 2-column contact composition where content supports it.
- Tablet: adapt columns at a content-fit breakpoint; do not squeeze cards or form labels.
- Mobile: single-column layout, generous target sizes, readable email/URLs and no horizontal overflow.
- Long URLs/email addresses wrap without overflowing.
- Form controls occupy usable width with consistent alignment and space for validation text.
- Footer wraps into a readable, not cramped, layout.
- No awkward empty space due to fixed heights or forced equal-height panels.
- At 200% zoom, the content and focus indicators remain usable.

## 13. Suggested implementation structure

Use current repository conventions. Examples below are illustrative, not mandatory.

**If still static HTML/CSS/ES modules:**
- `index.html`: replace only `#contact` markup and footer.
- `css/style.css` or approved dedicated scoped file: `.contact-*` / `.site-footer-*` rules using Task 02 tokens.
- `js/contact.js`: only if the retained form needs interaction or a configured real endpoint exists; export `initContact()` and initialise once in `js/main.js` after DOM ready.
- `docs/CONTACT_AND_SOCIAL.md`: behaviour, verified destinations, provider status, privacy and maintenance.

**If earlier approved work actually introduced React/Next.js:** use idiomatic components and a secure existing server route; do not duplicate native DOM event handling. Follow the real project, not an assumed stack.

Avoid duplicate submit listeners, inline scripts, `innerHTML` insertion of untrusted form values, unnecessary localStorage, unhandled promise rejections and irrelevant dependencies. Use `textContent` for dynamic user-facing messages.

## 14. Execution sequence

1. Inspect current repository and Git state; record active branch and recent task integrations.
2. Read relevant docs and inspect `#contact`, footer, CTA links and scripts.
3. Identify actual message delivery mechanism (likely absent); choose and document Path A or Path B from Section 6.
4. Confirm Tasks 02–12 are integrated; if not, report safely rather than making unrelated merges.
5. Create branch `task/13-contact-social-integration` from the approved up-to-date base.
6. Replace contact copy and layout using real current personal identity and verified links.
7. Implement functional email action; implement form only with truthful behaviour and clear labels.
8. Scope CSS to contact/footer while using existing tokens, typography and primitives.
9. Update footer and verify homepage/case-study anchor paths where relevant.
10. Add appropriate field validation, user-visible feedback and accessibility treatment.
11. Verify keyboard, mobile, direct link, JavaScript-disabled fallback and reduced motion.
12. Confirm link URL syntax and provider status; do not claim delivered-message tests that were not possible.
13. Run all available checks, inspect diff and verify prior sections.
14. Create/update `docs/CONTACT_AND_SOCIAL.md` explaining exactly how contact works.
15. Commit and push Task 13 on the feature branch if permitted. Do not merge or deploy.

## 15. Git workflow

Use the **approved integration base** documented by the repository; the commands below assume `main` contains Tasks 02–12:

```bash
git status
git switch main
git pull --ff-only origin main

# Confirm Tasks 02–12 are integrated.
git switch -c task/13-contact-social-integration

# Implement and validate Task 13 only.
git -c core.whitespace=cr-at-eol diff --check
git diff --stat
git status

git add <only-task-13-files>
git commit -m "feat: redesign contact and social integration"
git push -u origin task/13-contact-social-integration
```

Note: The original repository documents CRLF content, so `git -c core.whitespace=cr-at-eol diff --check` is a documented compatibility check; also check formatting where appropriate.

Rules: no force push, destructive reset, unrelated cleanup, automatic merge, deployment or PR approval on the user's behalf. If Git commands fail, report the error rather than claiming success. Optionally prepare a PR only if the workflow requests one; do not merge it.

## 16. Detailed testing checklist

### Contact destinations
- [ ] `mailto:` opens a compose action and visible email text matches the intended destination.
- [ ] LinkedIn and GitHub point to the correct verified URLs.
- [ ] External links are safe and keyboard accessible.
- [ ] No broken/unapproved additional profiles appear.
- [ ] Hero and navbar Contact links land correctly at `#contact`.

### Delivery honesty
- [ ] If no endpoint is configured, the website never claims a message was sent.
- [ ] Any `Prepare Email` action clearly explains the visitor must press Send in their email client.
- [ ] Fallback copyable email remains visible if a mail client is not configured.
- [ ] If a configured provider is used, display success only after an actual successful response.
- [ ] Network/server errors are displayed clearly and preserve form data for retry.
- [ ] No API keys are client-side or committed.
- [ ] Test the exact selected path; do not claim a real delivery test for mailto.

### Form if retained
- [ ] Name/email/message labels and autofill work.
- [ ] Required/invalid input produces helpful feedback.
- [ ] Whitespace-only submissions are rejected.
- [ ] Long text is handled safely without silent truncation.
- [ ] No double submission or duplicate listeners.
- [ ] Enter, pointer, and touch interactions behave predictably.
- [ ] No user input injected as executable markup.

### Design/accessibility/responsiveness
- [ ] Porcelain Arctic semantic tokens reused.
- [ ] Responsive at 320, 375, 768, 1024 and 1440px.
- [ ] No horizontal overflow/clipping or excessive empty space.
- [ ] Visible focus, keyboard operation, AA contrast and sensible reading order.
- [ ] Error/instruction messages are accessible and not colour-only.
- [ ] Reduced motion respected; content remains visible with JS disabled.
- [ ] Footer is legible and links resolve from appropriate routes.

### Regression
- [ ] Navbar/mobile menu/active section still work.
- [ ] Hero CTA and CV download still work.
- [ ] About, Skills, Projects, Achievements, Experience, Leadership, Education and Certifications remain intact.
- [ ] Case-study links/pages still resolve.
- [ ] Existing CSS/JS animations and optional Three.js still work.
- [ ] No console errors introduced.
- [ ] Build/lint/tests run when the repository has them; do not invent missing scripts.
- [ ] `git -c core.whitespace=cr-at-eol diff --check` passes.

If browser tooling is unavailable, clearly mark visual/manual tests as not run. Do not fabricate screenshots, delivery confirmation or production results.

## 17. Documentation deliverable

Create/update `docs/CONTACT_AND_SOCIAL.md`, describing:
- exact implemented contact flow and **whether a live provider exists**;
- why the chosen button label is truthful;
- source/maintenance of Email, LinkedIn and GitHub destinations;
- responsive layout and accessibility decisions;
- validation and any client/server handling;
- manual steps for adding a secure provider later, **without inserting placeholder secrets into public code**;
- any cases that could not be verified.

Keep the docs factual and concise. If the form is email-handoff-only, say it does **not** send mail on behalf of the visitor.

## 18. Definition of Done

Task 13 is done only when the section:
1. is professionally redesigned with Porcelain Arctic;
2. offers an obvious and usable primary email action;
3. uses verified LinkedIn/GitHub links;
4. has honest submission/handoff behaviour;
5. provides accessible validation and fallback where needed;
6. is responsive and does not overflow;
7. includes a coherent footer;
8. preserves the `#contact` anchor and prior tasks;
9. has documentation and executed test records;
10. is committed on the Task 13 branch without auto-merge or deployment.

## 19. Required final Codex report

Return these items in order:

1. **Task:** 13 — Contact & Social Integration.
2. **Repository, approved base, feature branch and commit SHA** (and PR URL if actually created).
3. **Files created/changed**, each with purpose.
4. **Final section design** and footer summary.
5. **Exact public destinations** used, and how they were verified.
6. **Delivery path selected:** provider-backed or email-app handoff. Describe actual behaviour and what was **not** tested.
7. **Form validation and accessibility behaviour**, including any fallbacks.
8. **Executed checks, pass/fail, skipped manual checks**, and regression notes.
9. **Unresolved dependencies/user-provided information**, if any.
10. Confirm **no automatic merge, deployment or future-task implementation**.
11. Finish with: **Next: Task 14 — GSAP Animations & Interactions. Do not implement it.**

---

## FINAL INSTRUCTION

**Implement Task 13 ONLY.** Rework the real V2 contact and footer experience in its approved architecture; reuse Porcelain Arctic; make every public destination accurate; provide real and honestly labelled contact behaviour; preserve all earlier work; validate and document actual results; commit to `task/13-contact-social-integration`; do not auto-merge, deploy or start Task 14.
