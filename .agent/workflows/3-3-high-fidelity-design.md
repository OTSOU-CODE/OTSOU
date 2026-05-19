---
description: "Design - High-Fidelity UI Polish & Animation"
---

# High-Fidelity Polish & GSAP Integration (Sherif-Auto)

START → Apply Theming → Add Micro-interactions → Implement GSAP ScrollTriggers → Responsive Animation Logic → Quality Check → END

## Scope & Context

This is where Sherif-Auto transforms from a structural wireframe into a premium luxury experience. Every interaction must feel deliberate, smooth, and expensive — like closing a luxury car door.

## Prerequisites

- Read `.ai/brand-guidelines.md` for exact design tokens
- Wireframe complete (via `/3-2-wireframing` workflow)
- GSAP CDN scripts already loaded in the HTML

## Steps

### 1. APPLY THEMING & ASSETS

- [ ] Map all CSS custom properties to elements (backgrounds, text, borders)
- [ ] Inject high-quality 8K-downsampled WebP images — no low-res placeholders
- [ ] Add background depth elements:
  ```css
  /* Gradient orbs to break flat dark spaces */
  .section::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(212, 175, 55, 0.05) 0%,
      transparent 70%
    );
    border-radius: 50%;
    top: -100px;
    right: -100px;
    pointer-events: none;
  }
  ```
- [ ] Apply subtle noise texture overlay for depth (optional):
  ```css
  .section {
    background-image: url("data:image/svg+xml,...");
  }
  ```

### 2. VANILLA CSS MICRO-INTERACTIONS

- [ ] **Hover States** (wrap in `@media (hover: hover)` for touch devices):
  ```css
  @media (hover: hover) {
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
  }
  ```
- [ ] **Focus States** (for accessibility):
  ```css
  :focus-visible {
    outline: 2px solid var(--color-accent-gold, #d4af37);
    outline-offset: 2px;
  }
  ```
- [ ] **Loading/Empty States:**
  ```css
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  .skeleton {
    background: linear-gradient(90deg, #2c2c2c 25%, #3a3a3a 50%, #2c2c2c 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  ```
- [ ] **Transition Defaults:** `transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;`

### 3. GSAP ANIMATION IMPLEMENTATION

- [ ] Initialize `ScrollTrigger` registration:
  ```javascript
  gsap.registerPlugin(ScrollTrigger);
  ```
- [ ] Apply section reveal animations:
  ```javascript
  // Staggered section reveal
  gsap.from(".section-content > *", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".section-content",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });
  ```
- [ ] **Strict Animation Rules:**
  - Only animate `opacity` and `transform` (y, x, scale, rotation)
  - Use premium easing: `power3.out` (smooth), `expo.out` (dramatic)
  - Stagger: `0.08–0.15s` between sequential elements
  - Never animate everything at once — build narrative sequences

### 4. RESPONSIVE ANIMATION LOGIC

- [ ] Use `gsap.matchMedia()` for device-appropriate animations:
  ```javascript
  gsap.matchMedia().add(
    {
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, isMobile, reducedMotion } = context.conditions;

      if (reducedMotion) return; // Skip all animations

      if (isDesktop) {
        // Full parallax, complex reveals
        gsap.from(".hero-title", {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      if (isMobile) {
        // Simpler, faster animations
        gsap.from(".hero-title", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    },
  );
  ```
- [ ] Disable heavy parallax effects on touch devices (causes scroll lag)

### 5. RESPONSIVE TESTING

- [ ] Animations don't cause horizontal scrolling on mobile
  - Apply `overflow-x: hidden` on section containers (not `<body>`)
- [ ] Touch devices: hover-dependent content is accessible via tap
- [ ] Gold accents visible at all breakpoints
- [ ] Text over images readable at all sizes

### 6. FINAL BROWSER AUDIT

- [ ] **Chrome:** Baseline — should look perfect
- [ ] **Safari:** Check `backdrop-filter` (needs `-webkit-`), `mix-blend-mode`
- [ ] **Firefox:** Check CSS Grid rendering, custom properties
- [ ] **FPS Check:** Enable FPS meter — maintain 60fps during all animations

## Verification Checklist

- [ ] All sections have scroll-triggered animations
- [ ] Hero sequence plays in correct order
- [ ] Hover states work on desktop, don't stick on touch
- [ ] Focus rings visible on keyboard navigation
- [ ] Skeleton loaders show during data loading
- [ ] `prefers-reduced-motion` respected
- [ ] 60fps maintained throughout page scroll
- [ ] No horizontal overflow on mobile

## Related Workflows

- **Design System:** `/3-1-design-system-creation` — Token definitions
- **Component Development:** `/4-2-component-development` — Building UI modules
- **Performance Audit:** `/7-1-performance-audit` — 60fps validation
- **Accessibility Audit:** `/8-1-accessibility-audit` — Keyboard + focus testing
