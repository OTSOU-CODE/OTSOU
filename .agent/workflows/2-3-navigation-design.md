---
description: Information Architecture - Navigation Design
---

# Navigation Design Workflow (Sherif-Auto)

START → Analyze User Flow → Design Tubelight/Staggered Structure → Implement GSAP → Test Usability → END

## Scope & Context

Sherif-Auto relies on a highly sophisticated dual-navigation system: a desktop "Tubelight" navbar and a mobile GSAP "Staggered Menu".

## Steps:

1. **Analyze Content & Conversion Goals:**
   - Primary goal: Send users to the Gallery and Contact sections (Revenue generation).

2. **Design Primary Desktop Navigation (Tubelight):**
   - Limit to 6 items exactly to fit the horizontal pill shape.
   - Active state MUST have a glowing bottom border (tubelight effect) using the Gold accent `#D4AF37`.
   - Ensure it dynamically hides on scroll-down and reveals on scroll-up for maximum screen real estate.

3. **Design Mobile Navigation (GSAP Staggered Menu):**
   - Rely strictly on the hamburger icon.
   - The menu must consume the full screen with a dark overlay (`#1A1A1A`).
   - Links must stagger in seamlessly using GSAP `stagger: 0.1` and translate fades.
   - Ensure touch targets are massive (min 60px height per item).

4. **Create breadcrumb strategy (If applicable):**
   - For deep pages (e.g., `image-preview.html`), implement a subtle top-left "← Back to Gallery" button rather than full breadcrumbs to keep the luxury aesthetic clean.

5. **Design Footer Navigation:**
   - Simple, columnar layout. Clean `Montserrat` headers, `Playfair Display` links. Hover states must use gold text with slight `transform: translateX(5px)`.

6. **Test Usability:**
   - Specifically test the transition between the mobile staggered menu closing and scrolling to the anchor link smoothly.
