---
description: "Testing - Comprehensive Testing"
---

# Quality Assurance & Testing Framework (Sherif-Auto)

START → JS Logic Validation → Visual Regression → GSAP Animation Testing → Mobile Touch Testing → Cross-Browser → END

## Scope & Context

In a vanilla architecture without Jest/Vitest automated testing, QA relies on logical JS module validation, manual visual/interactive testing, and Chrome DevTools performance profiling.

## Prerequisites

- Chrome DevTools (primary testing browser)
- Firefox and Safari (cross-browser validation)
- At least one real mobile device or accurate emulator

## Steps

### 1. JS LOGIC VALIDATION (Unit Testing)

- [ ] Data loops over `vehicles_data.js` handle edge cases:
  - Missing `thumbnail_path` → Show fallback image or skip card
  - Empty `images[]` array → Prevent gallery from crashing
  - Missing `brand` or `name` → Display "Unknown" gracefully
- [ ] Verify `DataManager.js` (if used) correctly registers and dispatches events
- [ ] Test filter logic: selecting "Dacia" shows only Dacia vehicles, "All" resets
- [ ] Test sort logic: price/name sorting produces correct order
- [ ] Verify form validation:
  - Empty fields → Error state
  - Invalid email format → Error message
  - Valid submission → Success state + Firestore write
- [ ] Check all `try...catch` blocks trigger gracefully on simulated failures

### 2. VISUAL REGRESSION & LAYOUT TESTING

- [ ] **Scroll stress test:** Scroll rapidly up and down. Do GSAP timelines:
  - Overlap each other?
  - Get stuck in invisible states?
  - Fire multiple times on the same element?
- [ ] Verify all `ScrollTrigger` instances are bound to correct triggers and start/end positions
- [ ] Check CSS Grid/Flexbox at critical widths:
      | Width | Expected |
      |-------|----------|
      | 320px | Single column, no overflow |
      | 768px | 2 columns for cards, tablet navigation |
      | 1440px | Full desktop layout, all sidebars visible |
- [ ] Gold accent overlays on dark backgrounds — legible, not washed out
- [ ] Text over images is readable (CSS gradient overlays applied)
- [ ] No orphaned elements (floating elements with no parent context)

### 3. GSAP ANIMATION TESTING

- [ ] Enable Chrome DevTools **FPS Meter** (Rendering → Frame Rendering Stats)
- [ ] Scroll through entire page — maintain 60fps throughout
- [ ] Test animation sequences:
  - Hero entrance: Elements animate in correct order
  - Section reveals: Trigger at correct scroll position
  - Card staggers: Wave effect feels natural (not too fast/slow)
- [ ] Test animation replay: Navigate away and back — do animations re-trigger correctly?
- [ ] Test `gsap.matchMedia()`: Resize from desktop to mobile — animations switch correctly
- [ ] Test `prefers-reduced-motion`: Toggle in OS settings — animations disable

### 4. MOBILE BEHAVIOR (Touch Devices)

- [ ] Hover states don't block initial tap clicks
  - CSS `:hover` should use `@media (hover: hover)` wrapper
  - Critical content must never be hidden behind hover-only reveals
- [ ] Staggered Navigation menu:
  - Opens instantly on hamburger tap
  - Closes on backdrop tap
  - Closes on anchor link tap + smooth scroll to target
  - Focus trap works (Tab stays inside menu)
- [ ] Touch targets are minimum 44x44px
- [ ] Gallery swipe behavior works (if implemented with touch events)
- [ ] No momentum scrolling conflicts with GSAP pinned sections
- [ ] No accidental zoom on double-tap (set `touch-action: manipulation`)

### 5. CROSS-BROWSER VALIDATION

| Browser              | Priority | Key Checks                                                   |
| -------------------- | -------- | ------------------------------------------------------------ |
| **Chrome**           | Primary  | Baseline — should work perfectly                             |
| **Firefox**          | High     | CSS Grid rendering, custom properties, `backdrop-filter`     |
| **Safari**           | High     | `-webkit-backdrop-filter`, `mix-blend-mode`, Grid stretching |
| **Samsung Internet** | Medium   | Touch behavior, font rendering                               |

#### Safari-Specific Checks:

- [ ] `backdrop-filter: blur()` has `-webkit-` prefix
- [ ] CSS Grid elements have explicit `aspect-ratio` (prevents violent stretching)
- [ ] `mix-blend-mode` renders correctly on text overlays
- [ ] GSAP scroll behavior is smooth (Safari has different scroll physics)

#### Firefox-Specific Checks:

- [ ] CSS custom properties (`var()`) fallbacks are set
- [ ] Grid `auto-fit`/`auto-fill` behaves as expected
- [ ] Glassmorphism effects render (Firefox had late `backdrop-filter` support)

## Final Report Template

After testing, document findings:

```markdown
## QA Report — [Date]

### Pass ✅

- [List items that passed]

### Issues Found ⚠️

| ID  | Severity | Description | Browser/Device | Fix |
| --- | -------- | ----------- | -------------- | --- |
| 1   | High     | ...         | Safari iOS     | ... |

### Performance

- Lighthouse Score: [XX]
- FPS During Scroll: [XX]fps
- LCP: [X.X]s
```

## Related Workflows

- **Pre-Launch Checklist:** `/10-2-pre-launch-testing-checklist` — Deployment gates
- **Performance Audit:** `/7-1-performance-audit` — Deep performance analysis
- **Accessibility Audit:** `/8-1-accessibility-audit` — Keyboard + screen reader testing
