---
description: Testing - Comprehensive Testing
---

# Quality Assurance & Testing Framework (Sherif-Auto)

START → Unit Array Checks → Visual Layout Regressions → Mobile Behavior Testing → Cross-Browser GSAP Tests → END

## Scope & Context

In a Vanilla architecture avoiding Jest/Vitest UI wrappers, testing heavily relies on logical JS module tests and deep manual Visual/Interactive QA.

## Steps:

1. **JS LOGIC VALIDATION (Unit Testing):**
   - Ensure data loops running over `vehicles_data.js` correctly trigger `console.error` warnings if a `thumbnail_path` is missing or corrupt instead of silently crashing the page layout.
   - Verify specific utility files (e.g. `DataManager.js`) correctly register and dispatch events.

2. **VISUAL REGRESSION & GSAP TESTING:**
   - Scroll up and down violently. Do the GSAP timelines overlap, jitter, or crash into an invisible state? Ensure all `ScrollTrigger` instances are bound to specific `scroller` limits.
   - Validate CSS Flexbox/Grid on highly responsive widths (specifically targeting `320px`, `768px`, and `1440px`). Do gold accents overlay poorly on edge cases?

3. **MOBILE BEHAVIOR (Touch Devices):**
   - Are hover states blocking initial tap clicks? Avoid using CSS `:hover` states to reveal critical actionable content. Utilize dedicated `touchstart` handlers or GSAP click listeners if necessary.
   - Ensure the GSAP Staggered Navigation closes instantaneously on anchor click to provide user confidence.

4. **CROSS-BROWSER CSS SUPPORT:**
   - Load locally in Firefox and Safari. Note Safari's handling of `backdrop-filter: blur()`; ensure `-webkit-` pre-fixes are included inside `style.css`.
   - Validate CSS Grid layout rendering, as Safari can sometimes violently stretch grid elements missing explicit aspect-ratios.
