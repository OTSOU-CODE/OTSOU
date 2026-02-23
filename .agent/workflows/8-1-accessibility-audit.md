---
description: Accessibility - Accessibility Audit
---

# Semantic & A11Y Auditing Workflow (Sherif-Auto)

START → Keyboard Navigation Check → Contrast Analysis → ARIA Role Verification → Fix → END

## Scope & Context

Custom Vanilla JS modules (like the GSAP Staggered Menu and Modals) must be audited intensely to ensure keyboard usability is fully emulated.

## Steps:

1. **MANUAL KEYBOARD TESTING:**
   - Disable the mouse. Tab entirely through `Index.html`.
   - Check if the Staggered Menu opens with `ENTER`/`SPACE`.
   - Verify focus doesn't get "trapped" invisibly behind a GSAP-closed element (use `visibility: hidden` or `display: none` after GSAP unmounts, not just `opacity: 0`).

2. **CONTRAST ANALYSIS (Dark Theme Check):**
   - Ensure Gold (`#D4AF37`) overlays on Dark (`#1a1a1a`) meet WCAG AA limits (4.5:1 ratio).
   - Verify placeholder text in inputs isn't too light against dark inputs.

3. **SEMANTIC ELEMENT VALIDATION:**
   - Look for specific bad habits: Clicking `<div class="btn">`. Change these strictly to `<button class="btn">`.
   - Validate heading structures (`h1` -> `h2` -> `h3`) directly in the raw HTML maps. Never skip hierarchy levels purely for visual sizing. Find the appropriate heading, then style its size with CSS.

4. **CUSTOM ARIA FOR DYNAMIC UI:**
   - Ensure the Search overlay sets `aria-expanded="true/false"` dynamically via JS.
   - Screen reader announcements (e.g., dynamically announcing "Filtered 12 Results" in the Gallery view).

5. **REPORT & FIX:**
   - Target and remediate non-accessible focus rings (`outline: none` should only exist if explicitly replaced by a visible `box-shadow`).
