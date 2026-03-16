# Skill: Frontend Development

## Overview

This skill defines the technical standards for developing the Sherif-Bach frontend. It emphasizes a return to fundamental web technologies (HTML, CSS, JS) leveraged at their highest level to produce a site that is as fast as it is visually breathtaking.

## 1. Advanced Structural HTML

- **Semantic Purity**: Writing HTML that describes its content rather than its appearance. Avoid "div soup."
- **Accessibility (A11y) First**: Integrating `aria-labels`, `role` attributes, and ensuring full keyboard navigability through interactive components like the gallery filter bar and thumbnail carousels.
- **Optimized Asset Loading**: Utilizing `<link rel="preload">` for LCP (Largest Contentful Paint) images and critical fonts to drastically reduce perceived load times.

## 2. Mastery of Modern CSS

- **The Design System Approach**: Every color, font size, and spacing unit must map back to a CSS Variable (`var(--color-primary-dark)`). Avoid hardcoded magic numbers.
- **Complex Layouts**:
  - **Grid**: Using `grid-template-areas` and `minmax()` functions to create robust, self-adjusting galleries that don't break on odd screen sizes.
  - **Flexbox**: For perfectly aligning form elements, navigation items, and internal component structures.
- **Premium Visual Execution**:
  - **Glassmorphism**: Perfecting the combination of `background: rgba()`, `backdrop-filter: blur()`, and subtle white/light-gray borders to create depth.
  - **Gradients & Glows**: Utilizing `radial-gradient` and layered `box-shadow` properties to create the aggressive "neon/sporty" aura around active elements without using static image assets.
  - **Fluid Typography**: Implementing `clamp()` functions to ensure typography scales smoothly between mobile and 4K desktop screens.

## 3. High-Performance Vanilla JavaScript

- **Event Delegation Architecture**: Attaching single event listeners to parent containers (like the main gallery `<ul>`) instead of thousands of listeners to individual car thumbnails.
- **Non-Blocking Execution**: Utilizing `async/await` and Promises for data fetching and heavy DOM updates to prevent main thread lockup.
- **Intersection Observers**: Implementing `IntersectionObserver` natively to trigger complex entrance animations or govern precise lazy-loading behavior only when elements enter the viewport.
- **Client-Side State**: Managing simple application states (e.g., `isFilterOpen = true`) cleanly within modular IIFEs (Immediately Invoked Function Expressions) or ES6 modules.
