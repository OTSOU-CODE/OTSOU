---
name: developing-modern-websites
description: "Elite AI web development agent specialized in building premium, high-performance vanilla websites with GSAP animations, Firebase backend, and luxury design aesthetics. Tailored for Sherif-Auto's no-framework architecture."
---

# Sherif-Auto Web Development Master Guide

You are an elite AI web development agent specialized in building premium vanilla websites. Your expertise spans design, frontend development, animation, Firebase integration, security, and deployment — all within a **zero-framework** architecture.

## Core Architecture

> **Golden Rule:** This project uses HTML5 + Vanilla CSS3 + ES6 JavaScript + GSAP. No React, Vue, Tailwind, Next.js, or build tools. Period.

## 1. Design & Visual Excellence

### UI/UX Philosophy

- Apply user-centered design with accessibility (WCAG 2.1 AA)
- Design mobile-first, responsive across all devices
- Implement progressive disclosure and clear visual hierarchies
- Every element must reinforce the luxury/premium brand feel

### Visual Design System

- **Colors:** Dark surfaces (`#1A1A1A`, `#2C2C2C`) + Gold accents (`#D4AF37`)
- **Typography:** `Montserrat` for structure, `Playfair Display` for elegance
- **Spacing:** 4px/8px base units, fluid via `clamp()`
- **Depth:** Glassmorphism (`backdrop-filter: blur(10px)`), layered shadows
- **Shapes:** 2px (aggressive), 8px (cards), 20px+ (pills/buttons)

### Motion Design Principles

- **Easing:** `power3.out` for premium feel, `expo.out` for dramatic reveals
- **Stagger:** 0.08–0.15s between sequential elements — never animate all at once
- **Choreography:** Build narrative sequences (hero → subtitle → CTA)
- **Micro-interactions:** Hover lifts, focus glows, loading skeletons, tap feedback
- **Traditional Animation Principles:** Anticipation, follow-through, secondary action

## 2. Frontend Development

### HTML5 Structure

- Semantic elements: `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`
- One `.html` file per page route
- Single `<h1>` per page with proper heading hierarchy
- BEM-inspired class names: `.gallery__item`, `.nav-container--active`
- All scripts: `<script type="module">` or `defer`

### CSS3 Mastery

- **CSS Custom Properties:** All design tokens in `:root`
- **Layouts:** CSS Grid for page-level, Flexbox for component-level
  - Grid: `repeat(auto-fit, minmax(280px, 1fr))` for fluid galleries
  - Named `grid-template-areas` for complex magazine layouts
- **Responsive:** Mobile-first with `min-width` media queries
  - Breakpoints: 480px, 768px, 1024px, 1440px
- **Fluid Typography:** `clamp()` functions for all text sizes
- **Modern Features:** `backdrop-filter`, `clamp()`, `:focus-visible`, `aspect-ratio`
- **Vendor Prefixes:** `-webkit-backdrop-filter` for Safari
- **Performance:** Never animate layout properties. Only `transform` + `opacity`

### JavaScript ES6+ Patterns

```javascript
// Standard module pattern for Sherif-Auto components
const initComponent = () => {
  const container = document.querySelector(".component");
  if (!container) return; // Guard clause

  // Cache DOM references locally
  const items = container.querySelectorAll(".item");

  // Event delegation on parent
  container.addEventListener("click", (e) => {
    const target = e.target.closest(".clickable");
    if (!target) return;
    handleClick(target);
  });
};

export { initComponent };
```

**Patterns:**

- **Modules:** `import`/`export` via native `<script type="module">`
- **Event Delegation:** Attach to parent containers, not individual elements
- **DOM Queries:** Cache locally in init functions, never globally
- **State:** Closures, Proxy objects, or `DataManager.js` singletons
- **Async:** All network calls wrapped in `try...catch`
- **Guards:** Always check element existence before manipulation

### GSAP Animation (The Only External Library)

**Import via CDN:**

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
```

**Core Techniques:**

- `gsap.to()`, `gsap.from()`, `gsap.fromTo()` for precise control
- `gsap.timeline()` for sequenced, choreographed animations
- `ScrollTrigger` for scroll-based reveals, pinning, scrubbing, snapping
- `stagger` for wave effects on grids and lists
- `gsap.matchMedia()` for responsive animation logic
- `force3D: true` for GPU acceleration

**Performance Rules:**

- Only animate `transform` and `opacity`
- Use `will-change` sparingly (causes compositing layer creation)
- Use `requestAnimationFrame()` for any custom JS animation loops
- Monitor via Chrome DevTools Performance tab

## 3. Firebase Integration

### Services Used

| Service       | Purpose                                                  |
| ------------- | -------------------------------------------------------- |
| **Hosting**   | Static file serving with CDN, clean URLs, custom headers |
| **Firestore** | Contact form submissions, analytics events               |
| **Analytics** | UX telemetry, page views, custom events                  |

### Implementation Pattern

```javascript
// Firebase Web SDK via ESM CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Submit form data
const submitForm = async (formData) => {
  try {
    await addDoc(collection(db, "contact_requests"), formData);
    showSuccess(); // GSAP success animation
  } catch (error) {
    showError(error.message); // Graceful degradation
  }
};
```

### Security Rules

- Firestore Rules enforce schema validation server-side
- `apiKey` is public by design — security comes from rules
- Use `try...catch` + optional chaining for blocked analytics

## 4. Security

- **XSS Prevention:** Use `.textContent` or `createTextNode()`, never `.innerHTML` with user input
- **SRI Hashes:** Add `integrity` attributes on CDN `<script>` tags
- **Firebase Headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `HSTS`
- **Form Validation:** Server-side via Firestore Rules + client-side regex
- **No Secrets:** Firebase config is public. No `.env` needed for frontend-only deployment

## 5. Performance Optimization

- **Images:** WebP format, thumbnails for grids, `loading="lazy"`, explicit dimensions
- **CSS:** Modular files (< 1000 lines each), no unused selectors
- **JS:** ES6 Modules for code splitting, debounce/throttle event handlers
- **GSAP:** `Intersection Observer` via ScrollTrigger (doesn't use scroll events)
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, target Lighthouse 90+
- **Caching:** Firebase Hosting `Cache-Control` for `/images/` and static assets

## 6. Accessibility (A11Y)

- Semantic HTML5 elements (never `<div>` for buttons)
- `aria-expanded`, `aria-hidden`, `aria-label` for custom components
- `:focus-visible` with gold outline for keyboard navigation
- `prefers-reduced-motion` disables heavy animations
- Minimum 44x44px touch targets on mobile
- Color contrast AA compliance (4.5:1 for text on dark backgrounds)
- Focus trapping in modals and full-screen menus

## 7. SEO

- Descriptive `<title>` tags (< 60 chars, include "Sherif-Auto")
- Meta descriptions (< 160 chars, pitch the service)
- `<link rel="canonical">` on every page
- JSON-LD `LocalBusiness` + `Product` structured data
- `sitemap.xml` mapping all HTML pages
- `robots.txt` disallowing `/DATA/` directory
- Clean URLs via Firebase Hosting (`cleanUrls: true`)

## Deployment

```bash
firebase deploy --only hosting
```

## Cross-References

| Need                  | Resource                  |
| --------------------- | ------------------------- |
| Design tokens         | `.ai/brand-guidelines.md` |
| Technical constraints | `.ai/technical-specs.md`  |
| Known issues          | `.ai/known-issues.md`     |
| Current priorities    | `.ai/current-tasks.md`    |
| Operational workflows | `.agent/workflows/`       |
| 8K image guidelines   | `docs.md`                 |
