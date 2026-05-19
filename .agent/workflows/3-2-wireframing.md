---
description: Design - Wireframing & Layout Architecture
---

# Wireframing Workflow (Sherif-Auto)

START → Define Section HTML Structure → Determine Flex/Grid Strategy → Mobile Layout First → END

## Scope & Context

Sherif-Auto uses semantic HTML5 and Vanilla CSS Flexbox/Grid. Rapid wireframing is done directly in the browser via HTML scaffolding, not Figma, ensuring immediate responsive testing.

## Steps:

1. **Define Semantic Structure:**
   - Scaffold the section using `<section>`, `<article>`, `<header>`, or `<footer>`.
   - Assign BEM-style or clean kebab-case class names immediately (e.g., `.gallery-grid`, `.gallery-card`).

2. **Establish the CSS Grid/Flexbox Layout (Mobile First):**
   - Start with a single-column layout for mobile: `flex-direction: column` or `grid-template-columns: 1fr`.
   - Ensure the padding limits content bleeding (`padding: 0 1rem`).

3. **Scale to Desktop Breakpoints:**
   - Add `@media (min-width: 768px)` for tablet adaptations (typically 2 columns).
   - Add `@media (min-width: 1024px)` for desktop adaptations. Use advanced CSS Grid (`repeat(auto-fit, minmax(300px, 1fr))`) for fluid galleries.

4. **Incorporate Interactive Placeholders:**
   - Add temporary `<button>` tags where GSAP triggers or modal opens will occur.
   - Mark areas that will be heavily animated with an `.animate-on-scroll` class.

5. **Review Flow:**
   - Scroll through the raw wireframe in DevTools. Ensure the visual hierarchy immediately draws the eye to the gold Call-to-Action buttons.
