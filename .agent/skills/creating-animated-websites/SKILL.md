---
name: creating-animated-websites
description: "Specialized in building high-performance, visually stunning animated websites using GSAP and native CSS techniques within a vanilla (no-framework) architecture. Use when the user wants to create, build, or develop modern animated or 'wow' web experiences."
---

# Creating Modern Animated Websites (Vanilla Architecture)

## Capabilities

This skill encapsulates the expertise to build "Awwwards-winning" style websites using **only** vanilla HTML5, CSS3, ES6 JavaScript, and GSAP — no React, Vue, Tailwind, or build tools required.

## Workflow

### Phase 1: Foundation & Layout (The "Expensive" Look)

Before animating, ensure the static structure is perfect.

- **CSS Grid:** Use for magazine-style "Bento Box" layouts
  - `grid-template-areas` for complex, asymmetric designs
  - `repeat(auto-fit, minmax(280px, 1fr))` for fluid galleries
  - Consistent 8px-based spacing
- **Flexbox:** Use for component-level alignment (navbars, cards, button internals)
- **Typography:** Set up fluid type scales using `clamp()`
  - Headings: `Montserrat` (structural, modern)
  - Accents: `Playfair Display` (elegant, luxury)
- **Glassmorphism:** `backdrop-filter: blur(10px)` + semi-transparent dark backgrounds
- **Depth:** Layered shadows, subtle gradient orbs, border accents

### Phase 2: Motion Strategy (The "Life")

Animation must be meaningful, not just decorative.

- **GSAP (GreenSock):** Import via CDN ESM — the gold standard for web animation

  ```html
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
  ```

- **Sequencing:** Use `gsap.timeline()` to choreograph elements
  - _Rule:_ Never animate everything at once. Stagger elements (`stagger: 0.08–0.15`) for a "wave" effect
  - Create narrative sequences: "Title fades in → THEN subtitle → THEN CTA button"

- **Scroll-Driven Motion:** Use `ScrollTrigger` to:
  - Trigger animations when sections enter viewport
  - Pin sections during animation sequences
  - Scrub animations tied to scroll position (parallax)
  - Snap to sections for smooth scrolling

- **Responsive Animations:** Use `gsap.matchMedia()` to:
  - Full parallax on desktop → simple fade on mobile
  - Disable heavy animations on small screens automatically

- **Micro-interactions (CSS + GSAP):**
  - Hover states: `transform: translateY(-2px)` + gold box-shadow
  - Magnetic buttons on desktop
  - Loading skeletons with `@keyframes shimmer`
  - Focus rings with gold accent outlines

### Phase 3: Performance (The "Feel")

A slow site is not premium.

- **60fps Rule:** Animate **only** `transform` and `opacity`
  - ❌ Never animate: `width`, `height`, `top`, `left`, `margin`, `padding`
- **Asset Optimization:** WebP images, thumbnails for grids, lazy loading
- **Compositing:** Use `will-change` sparingly to promote GPU layers
- **Hardware Acceleration:** `transform: translateZ(0)` when needed
- **Event Efficiency:** Debounce scroll/resize handlers outside GSAP

### Phase 4: Accessibility (The "Right Thing")

Premium means inclusive.

- **Reduced Motion:** Respect `prefers-reduced-motion`
  ```javascript
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable complex timelines, use instant transitions
    gsap.globalTimeline.timeScale(100); // Skip animations
  }
  ```
- **Focus Management:** Logical tab order through all interactive elements
- **ARIA States:** Update `aria-expanded`, `aria-hidden` dynamically with JS
- **Keyboard Support:** All custom UI navigable via Tab, Enter, Escape

## Technical Stack (Sherif-Auto Compliant)

| Layer         | Technology      | Notes                                       |
| ------------- | --------------- | ------------------------------------------- |
| **Structure** | Semantic HTML5  | Native `<section>`, `<nav>`, `<article>`    |
| **Styling**   | Vanilla CSS3    | Custom Properties, `clamp()`, Grid, Flexbox |
| **Animation** | GSAP 3+ via CDN | ScrollTrigger, Timeline, MatchMedia         |
| **Logic**     | ES6 Modules     | `<script type="module">`, event delegation  |

> ⚠️ **No** React, Vue, Next.js, Tailwind, Three.js, or npm build tools unless explicitly requested by the user.

## Implementation Checklist

- [ ] **Layout:** Responsive Grid/Flexbox structure (mobile-first)
- [ ] **Typography:** Fluid `clamp()` scale with brand fonts loaded
- [ ] **Assets:** Images optimized to WebP with `loading="lazy"`
- [ ] **Hero Animation:** Entry sequence defined with `gsap.timeline()`
- [ ] **Scroll Animations:** `ScrollTrigger` bound to sections
- [ ] **Hover/Focus States:** All interactive elements respond
- [ ] **Stagger Effects:** Grid items animate in waves
- [ ] **Responsive Animations:** `gsap.matchMedia()` configured
- [ ] **Reduced Motion:** `prefers-reduced-motion` respected
- [ ] **Mobile Touch:** No hover-dependent functionality on touch devices
- [ ] **Performance:** 60fps confirmed in Chrome DevTools FPS meter
- [ ] **Cross-Browser:** Tested in Chrome, Firefox, Safari

## Reference Materials

- **Brand Guidelines:** `.ai/brand-guidelines.md`
- **Technical Specs:** `.ai/technical-specs.md`
- **High-Fidelity Polish Workflow:** `.agent/workflows/3-3-high-fidelity-design.md`
- **Performance Audit Workflow:** `.agent/workflows/7-1-performance-audit.md`
