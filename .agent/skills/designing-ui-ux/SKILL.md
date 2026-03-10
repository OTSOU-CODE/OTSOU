---
name: designing-ui-ux
description: "Comprehensive framework for designing, auditing, and improving Web Design and UI/UX. Use this skill when the user asks to 'design', 'audit', 'improve', or 'review' the visual or experiential aspects of an application."
---

# Modern Design & UX Excellence Framework

This skill provides a rigorous standard for creating world-class web experiences within Sherif-Auto's vanilla architecture. It covers visual polish, responsive layouts, interaction design, and quality assurance.

## When to Use

- Designing a new feature, section, or page
- Conducting a UI/UX audit of existing pages
- Making the site "look modern", "feel premium", or "more polished"
- Fixing responsiveness, accessibility, or visual inconsistencies
- Adding micro-interactions or animations

## Workflow & Resources

This framework is divided into 5 specialist areas. Consult the relevant resource for your task.

### 1. Visual Design & Aesthetics

For color harmony, typography, gradients, shadows, and component consistency:
👉 **[`resources/visual-design.md`](resources/visual-design.md)**

Key principles for Sherif-Auto:

- Dark surfaces (`#1A1A1A`, `#2C2C2C`) + Gold accents (`#D4AF37`)
- `Montserrat` for structure, `Playfair Display` for elegance
- Glassmorphism: `backdrop-filter: blur(10px)` + semi-transparent backgrounds
- Deep shadows: `0 10px 30px rgba(0,0,0,0.5)`
- Gradient orbs for breaking flat dark spaces

### 2. Responsiveness & Layout

For mobile-first strategies, fluid grids, breakpoints, and touch optimization:
👉 **[`resources/responsive-arch.md`](resources/responsive-arch.md)**

Sherif-Auto breakpoints: 480px → 768px → 1024px → 1440px

### 3. Interaction & Motion

For micro-interactions, GSAP animations, navigation patterns, and feedback:
👉 **[`resources/interaction-design.md`](resources/interaction-design.md)**

Core animation rules:

- Only animate `transform` + `opacity`
- Use `power3.out` easing for premium feel
- Stagger elements at 0.08–0.15s intervals
- Respect `prefers-reduced-motion`

### 4. Technical Implementation

For CSS architecture, asset optimization, WCAG accessibility, and Core Web Vitals:
👉 **[`resources/implementation.md`](resources/implementation.md)**

Must-follow constraints:

- Vanilla CSS3 only (no Tailwind, Bootstrap)
- ES6 Modules + GSAP (no React, Vue)
- BEM-inspired class naming
- Mobile-first `min-width` media queries

### 5. Quality Assurance & Audit

For heuristic evaluation, visual audits, and design debt management:
👉 **[`resources/qa-audit.md`](resources/qa-audit.md)**

## Quick Audit Checklist

When auditing any page or component:

- [ ] **Colors:** Match brand tokens? Gold accents consistent?
- [ ] **Typography:** Correct fonts? Fluid `clamp()` sizes? Proper hierarchy?
- [ ] **Spacing:** Consistent 4px/8px grid? Breathing room between elements?
- [ ] **Depth:** Shadows, glassmorphism, layered backgrounds present?
- [ ] **Hover States:** All interactive elements respond? Desktop-only with `@media (hover: hover)`?
- [ ] **Focus States:** Gold outline on keyboard focus? Visible to users?
- [ ] **Animations:** GSAP ScrollTrigger on sections? Smooth 60fps? Staggered reveals?
- [ ] **Loading States:** Skeleton loaders for dynamic content?
- [ ] **Responsive:** Correct at 320px, 768px, 1440px?
- [ ] **Accessibility:** Semantic HTML? ARIA attributes? Color contrast?

## Core Principles

1. **Aesthetics are Functional** — A beautiful interface builds trust and converts visitors
2. **Performance is UX** — A slow premium site is not premium
3. **Accessibility is Default** — Inclusive design is better design for everyone
4. **Mobile-First Always** — 60%+ of traffic is mobile; design for it first
5. **Every Detail Matters** — Like hand-stitched leather, every pixel must be deliberate

## Reference Materials

- **Brand Guidelines:** `.ai/brand-guidelines.md`
- **Technical Specs:** `.ai/technical-specs.md`
- **High-Fidelity Workflow:** `.agent/workflows/3-3-high-fidelity-design.md`
- **Accessibility Audit:** `.agent/workflows/8-1-accessibility-audit.md`
