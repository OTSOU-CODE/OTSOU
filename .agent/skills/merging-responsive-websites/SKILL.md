---
name: merging-responsive-websites
description: "Merges desktop and mobile website versions into a unified, modern responsive design that adapts seamlessly across all devices. Use this skill when the user wants to combine separate desktop and mobile sites, integrate responsive design principles, or modernize a legacy site for cross-device compatibility."
---

# Responsive Website Merger (Vanilla Architecture)

## Skill Overview

Intelligently merge desktop and mobile website versions into a unified, responsive design using **vanilla CSS3** (no Tailwind, Bootstrap, or CSS frameworks). The merged design adapts seamlessly across all devices while maintaining the Sherif-Auto luxury aesthetic.

## Standard Breakpoints

```css
/* Sherif-Auto Responsive Breakpoints (Mobile-First) */
320px   — Small Mobile (iPhone SE, older devices)
375px   — Standard Mobile (iPhone 12/13/14)
480px   — Large Mobile / Phablets
768px   — Tablets Portrait (iPad)
1024px  — Tablets Landscape / Small Laptops
1280px  — Desktop / Laptops
1440px  — Large Desktop
1920px  — Full HD Displays
```

## Workflow

### Phase 1: Analysis

**Desktop Version:**

- Layout structure: multi-column grids, sidebars, horizontal navigation
- Interaction model: hover states, mouse-driven, keyboard navigation
- Media strategy: high-res images, parallax, complex GSAP animations

**Mobile Version:**

- Layout structure: single-column, hamburger menus, stacked content
- Interaction model: touch-friendly, 44px+ tap targets
- Media strategy: optimized images, simplified animations

**Content Inventory:**

```
Shared:     logo, navigation, hero, content cards, footer
Desktop:    hover tooltips, mega-menu, sidebar widgets
Mobile:     swipe gestures, bottom nav, pull-to-refresh
Adaptable:  data tables, complex forms, image galleries
```

### Phase 2: Strategy Selection

#### A. Mobile-First Progressive Enhancement ⭐ RECOMMENDED

```css
/* Start with mobile base */
.container {
  width: 100%;
  padding: 1rem;
}

/* Enhance for tablets */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Full desktop experience */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }
}
```

#### B. Container Query Approach (Modern)

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}
```

#### C. Fluid Hybrid System

```css
/* Fluid typography */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

/* Fluid spacing */
.section {
  padding: clamp(2rem, 5vw, 5rem) clamp(1rem, 3vw, 3rem);
}

/* Fluid grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: clamp(1rem, 2vw, 2rem);
}
```

### Phase 3: Component Merge Patterns

#### Navigation (Desktop + Mobile)

```css
/* Mobile-first: hidden off-screen */
.nav-toggle {
  display: block;
}
.nav-list {
  position: fixed;
  left: -100%;
  transition: left 0.3s ease;
}
.nav-list.active {
  left: 0;
}

/* Desktop: inline horizontal */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }
  .nav-list {
    position: static;
    display: flex;
    gap: 2rem;
  }
}
```

#### Content Cards (Hover vs Touch)

```css
.card-grid {
  display: grid;
  gap: clamp(1rem, 2vw, 2rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
  min-height: 120px;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

/* Desktop hover only */
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
}
```

#### Data Tables (Responsive)

```css
/* Mobile: card layout */
@media (max-width: 767px) {
  .data-table thead {
    display: none;
  }
  .data-table tr {
    display: block;
    margin-bottom: 1rem;
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 8px;
    padding: 1rem;
    background: var(--color-bg-secondary);
  }
  .data-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  .data-table td::before {
    content: attr(data-label);
    font-weight: bold;
    color: var(--color-accent-gold);
  }
}

/* Desktop: traditional table */
@media (min-width: 768px) {
  .data-table {
    width: 100%;
    border-collapse: collapse;
  }
}
```

#### Images (Responsive Art Direction)

```html
<picture class="responsive-image">
  <source media="(min-width: 1280px)" srcset="hero-desktop.webp" />
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" />
  <img src="hero-mobile.webp" alt="Description" loading="lazy" />
</picture>
```

### Phase 4: Fluid Design System

```css
:root {
  /* Fluid type scale */
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem);
  --font-size-xl: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
  --font-size-2xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);

  /* Fluid spacing */
  --space-xs: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-sm: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-md: clamp(1.5rem, 1.2rem + 1.5vw, 2.5rem);
  --space-lg: clamp(2rem, 1.5rem + 2.5vw, 4rem);
  --space-xl: clamp(3rem, 2rem + 5vw, 6rem);
}
```

### Phase 5: GSAP Responsive Animations

```javascript
// Different animations for different screen sizes
gsap.matchMedia().add(
  {
    isDesktop: "(min-width: 1024px)",
    isMobile: "(max-width: 1023px)",
    reducedMotion: "(prefers-reduced-motion: reduce)",
  },
  (context) => {
    const { isDesktop, isMobile, reducedMotion } = context.conditions;

    if (reducedMotion) return; // Respect user preference

    if (isDesktop) {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }

    if (isMobile) {
      gsap.from(".hero-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  },
);
```

### Phase 6: Accessibility

```css
/* Touch targets: WCAG 2.1 minimum */
button,
a,
input[type="checkbox"],
input[type="radio"] {
  min-width: 44px;
  min-height: 44px;
}

/* Visible focus indicators */
:focus-visible {
  outline: 2px solid var(--color-accent-gold);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Checklist

- [ ] Content inventory completed (shared, desktop-only, mobile-only)
- [ ] Mobile-first base styles written
- [ ] Tablet breakpoint enhanced (768px)
- [ ] Desktop breakpoint enhanced (1024px+)
- [ ] Fluid typography with `clamp()` values
- [ ] Navigation pattern works on all sizes
- [ ] Touch targets ≥ 44px on mobile
- [ ] Hover effects only with `@media (hover: hover)`
- [ ] GSAP animations responsive via `matchMedia()`
- [ ] `prefers-reduced-motion` respected
- [ ] Images responsive with `<picture>` or `srcset`
- [ ] Tested at: 320px, 768px, 1024px, 1440px
- [ ] Tested in landscape orientation on mobile/tablet
- [ ] Core Web Vitals passing (Lighthouse > 90)

## Testing Matrix

```
✓ iPhone SE (375×667)
✓ iPhone 14 (393×852)
✓ Samsung Galaxy (360×800)
✓ iPad Mini (744×1133)
✓ iPad Pro (1024×1366)
✓ Laptop (1440×900)
✓ Desktop 1080p (1920×1080)
```

## Reference Materials

- **Brand Guidelines:** `.ai/brand-guidelines.md`
- **Technical Specs:** `.ai/technical-specs.md`
- **Wireframing Workflow:** `.agent/workflows/3-2-wireframing.md`
- **Performance Audit:** `.agent/workflows/7-1-performance-audit.md`
