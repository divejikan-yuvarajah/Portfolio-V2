# Task 14B verification evidence

Baseline: `origin/main` at `83c2ce5`; implementation branch `task/14b-digital-atlas-redesign`.

## Environment and reproduction

Windows, headless Microsoft Edge **154.0.4258.37**, isolated temporary browser profile, local Python static server on port 8765. Edge was launched with `--headless=new --disable-gpu --remote-debugging-port=9222 --remote-allow-origins=http://localhost:9222`. This is browser emulation, not a physical phone or assistive-technology session. No project package was installed. `scripts/verify_digital_atlas.py` uses the already available Python `websocket-client` package only for optional QA.

Serve this repository locally, start an isolated headless Edge/Chromium instance on port 9222 at `http://127.0.0.1:8765/`, then run:

```powershell
python scripts/verify_digital_atlas.py
python scripts/generate_case_studies.py --check
Get-ChildItem js -Filter *.js | ForEach-Object { node --check $_.FullName }
git -c core.whitespace=cr-at-eol diff --check
```

`--baseline` captures the baseline cover only; do not run it again against the redesign if preserving the original before images. The script disables browser cache for the final run. Additional screenshots and the performance observation were captured with the same CDP helper.

## Passed checks

- Actual viewport geometry at **320, 375, 390, 768, 1024, 1280 and 1440px**: document scroll width equals client width (including allowance for the browser scrollbar), one H1, all 17 project cards retained. Screenshots were captured and reviewed with reduced motion enabled.
- Landscape **844×390**, short desktop **1280×600**, and **720×500 CSS pixels** representing the layout space available at 200% desktop zoom: no horizontal overflow, no sticky project visual. This last check is layout emulation, not a native browser zoom-control test.
- Four case-study URLs loaded directly at **375 and 1440px**, with one H1 and no horizontal overflow. CORTEX route screenshots are included as an example of shared framing.
- A real Tab sequence made **54 focus stops**, reached all four flagship case-study links and all contact inputs, and found no offscreen focused control. Mobile menu open/Escape behavior passed.
- Finance filter showed one result; All restored 17. Card/group hidden state remains owned by the original gallery module.
- Empty contact submit produced the expected accessible invalid-name state. No email app was launched and no email was sent. Original validation/handoff module and disclosure were preserved.
- All ten original section hashes landed below the sticky navbar. Real browser history return succeeded, including **BFCache with active motion**: restored page had four desktop decorative triggers and two motion assets, with no replay of prepared entrances.
- JavaScript-disabled rendering retained the heading and 17 projects. Individually blocking GSAP core, ScrollTrigger, or the Three.js import retained functional filter and contact initialization.
- GSAP and ScrollTrigger browser APIs both reported **3.15.0**. Initial desktop setup created **25 triggers**; repeated init did not add any. Responsive change removed the four desktop scrub effects on mobile and restored four on desktop.
- Live reduced motion removed all active triggers. Four restore/reduce cycles yielded **4 / 0 triggers** consistently and a garbage-collected browser listener count of **87 before / 87 after** in the final run.
- Simulated two-core and save-data signals skipped GSAP loading while the contact UI initialized normally.
- CV endpoint returned HTTP 200 and a PDF signature. This verifies the file response, not its freshness or qualifications.
- All `js/*.js` syntax checks, generator `--check`, CSS stylesheet parsing and Git whitespace checks passed.
- Static comparison against the approved base preserved **every original paragraph, existing link destination, original ID, featured order and case-study JSON byte**. Six HTML documents were checked for one H1, unique IDs, local resources and fragment targets.

Machine-readable browser results: [results.json](results.json).

## Visual evidence

- Original cover: [desktop](before-1440.png), [mobile](before-375.png).
- New cover: [320](after-320.png), [375](after-375.png), [390](after-390.png), [768](after-768.png), [1024](after-1024.png), [1280](after-1280.png), [1440](after-1440.png).
- Editorial sections: [About](after-about-1440.png), [Expertise](after-skills-1440.png), [Projects](after-projects-1440.png), [FlowPilot](after-work-flowpilot-ai-1440.png), [CORTEX](after-work-cortex-1440.png), [Achievements](after-achievements-1440.png), [Experience](after-experience-1440.png), [Community](after-community-1440.png), [Education](after-education-1440.png), [Contact](after-contact-1440.png).
- Mobile detail: [work](after-work-375.png), [skills](after-skills-375.png), [contact/form](after-contact-form-375.png), [case study](after-case-cortex-375.png). [Desktop case study](after-case-cortex-1440.png).

## Performance observation and limits

The bounded [headless observation](performance-observation.json) recorded no runtime errors/unhandled rejections and initial-load layout-shift totals around **0.035** in two local runs. These are observations from one environment, not a field Core Web Vitals result or Lighthouse score.

With GPU acceleration disabled, a two-second idle sample recorded roughly 1.55s renderer task time with the existing Three.js scene, compared with 0.03s when that decorative import was blocked. Script-time deltas were about 0.022s and 0.005s respectively. The comparison indicates that software-rendered WebGL dominates this headless environment; it does not establish real-device frame rates. The existing Three.js functionality was preserved. Hardware-accelerated laptop and mid-range phone testing is still needed.

## Issues found and corrected

- Legacy Hero flex layout conflicted with the new cover containers at mobile widths: explicitly restored block section layout.
- Decorative signal SVG resisted shrinking at 320px: allowed its flex item to shrink.
- Inherited 320px body minimum exceeded the browser's scrollbar-adjusted client width: scoped a zero minimum to the atlas documents.
- Missing `--space-5` invalidated existing contact-form gaps: supplied the consistent 20px spacing token.
- Recreating GSAP media matchers after each preference change accumulated two query listeners per cycle: retained one matcher and reverted/refreshed its scoped Context; final listener counts stay constant.

## Remaining manual review

- Physical iOS/Android touch behavior, Safari/Firefox, real screen-reader reading, native 200% browser zoom and hardware-accelerated scrolling.
- Opening a configured email client and sending a real message; this task did not send anything.
- Owner confirmation that the existing CV is current, approved project screenshots, and any independent external project/product verification. Existing source/demo URLs were preserved, not freshly audited as live products.
- The filtered GSAP showcase page was inaccessible to the web reader; no individual showcase site was inspected or copied. Official GSAP documentation and the five requested skills were read in place.

No merge, deployment or Task 15 implementation is part of this task.
