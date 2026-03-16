---
description: "Frontend Development - Component Development"
---

# Component Development Workflow (Sherif-Auto)

START → Plan Component → Scaffold HTML → Write CSS Module → Build ES6 Module → Implement GSAP → Test → END

## Scope & Context

In Sherif-Auto's vanilla architecture, "Components" are self-contained pairs of `.css` and `.js` files injected via template literals or DOM manipulation. No React, Vue, or framework components.

## Prerequisites

- Read `.ai/brand-guidelines.md` for design tokens
- Read `.ai/technical-specs.md` for code patterns
- Review existing components in `/CSS/` and `/JS/` to maintain consistency

## Steps

### 1. PLAN

- Define the DOM target for injection (e.g., `<div id="gallery-root">`)
- Identify required parameters (links, titles, images, data from `vehicles_data.js`)
- Confirm it matches the luxury dark/gold design language
- Determine responsive behavior at 320px, 768px, and 1440px
- Identify GSAP animation triggers (scroll, load, click)

### 2. BUILD HTML STRUCTURE (in JS Module)

- Create a clean ES6 function or class containing the template literal for the UI
- Use strict BEM-inspired class names (`.gallery__item`, `.gallery__thumbnail`)
- Use `document.createElement` when complex event delegation is needed before mounting
- Ensure proper semantic elements (`<button>` for actions, `<a>` for links, `<figure>` for images)
- Add ARIA attributes for custom interactive elements

```javascript
// Example: component template
const createCard = (data) => {
  const card = document.createElement("article");
  card.className = "vehicle-card";
  card.innerHTML = `
    <figure class="vehicle-card__image-wrapper">
      <img src="${data.thumbnail_path}" alt="${data.brand} ${data.name}" loading="lazy" width="400" height="300">
    </figure>
    <div class="vehicle-card__content">
      <h3 class="vehicle-card__title">${data.name}</h3>
      <span class="vehicle-card__brand">${data.brand}</span>
    </div>
  `;
  return card;
};
```

### 3. WRITE MODULAR CSS

- Create `CSS/[component].css`
- Start with CSS Variables from `:root` in `style.css`
- Never use `!important` unless strictly dealing with edge-case utility overrides
- Separate state classes (`.is-active`, `.is-loading`, `.is-hidden`)
- Mobile-first responsive design with `min-width` media queries
- Include hover states using `@media (hover: hover)` to avoid sticky hover on touch

```css
/* CSS/vehicle-card.css */
.vehicle-card {
  background: var(--color-bg-secondary, #2c2c2c);
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

@media (hover: hover) {
  .vehicle-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(212, 175, 55, 0.15);
  }
}

@media (min-width: 768px) {
  .vehicle-card__content {
    padding: 1.5rem;
  }
}
```

### 4. ADD JS LOGIC (ES6 Module)

- Create `JS/[component].js`
- Attach event listeners using **Event Delegation** on wrapper: `e.target.closest('.selector')`
- Manage local state inside the module scope (`let currentSlide = 0;`)
- Guard all DOM queries: `if (!element) return;`
- Export an init function

```javascript
// JS/vehicle-card.js
const initVehicleCards = () => {
  const container = document.querySelector(".vehicle-grid");
  if (!container) return;

  container.addEventListener("click", (e) => {
    const card = e.target.closest(".vehicle-card");
    if (!card) return;
    // Handle card click
  });
};

export { initVehicleCards };
```

### 5. IMPLEMENT GSAP ANIMATION

- Use GSAP for entry/exit animations (`gsap.from`, `gsap.fromTo`)
- **Only** animate `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`
- Use `ScrollTrigger` for scroll-based reveals
- Use `stagger` for grid/list animations
- Respect `prefers-reduced-motion`

```javascript
// GSAP reveal animation for cards
gsap.from(".vehicle-card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".vehicle-grid",
    start: "top 80%",
  },
});
```

### 6. INTEGRATE INTO PAGE

- Add `<link rel="stylesheet" href="CSS/[component].css">` to the HTML `<head>`
- Add `<script type="module">` import at the bottom of `<body>`
- Ensure GSAP CDN scripts load **before** component scripts

### 7. TEST & VERIFY

**Verification Checklist:**

- [ ] Layout correct at 320px (mobile)
- [ ] Layout correct at 768px (tablet)
- [ ] Layout correct at 1440px (desktop)
- [ ] Dark theme integrity maintained (no white flashes, correct backgrounds)
- [ ] Gold accent colors match brand guidelines (`#D4AF37`)
- [ ] Hover states work on desktop, don't stick on mobile
- [ ] GSAP animation renders at 60fps (check Chrome DevTools FPS meter)
- [ ] No `console.log()` statements left
- [ ] No inline styles (except GSAP dynamic values)
- [ ] Keyboard navigation works (Tab focuses, Enter activates)
- [ ] `aria-*` attributes set correctly on interactive elements
- [ ] No JavaScript errors in Console
- [ ] Images have `loading="lazy"` and descriptive `alt` text

## Related Workflows

- **Design System:** `/3-1-design-system-creation` — Adding new tokens
- **High-Fidelity Polish:** `/3-3-high-fidelity-design` — Animation refinement
- **Page Development:** `/4-3-page-development` — Integrating component into a page
- **Performance Audit:** `/7-1-performance-audit` — Validating 60fps
