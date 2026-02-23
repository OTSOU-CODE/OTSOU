# Role: Frontend Developer

## Overview

The Frontend Developer is responsible for bringing the Sherif-Bach automotive gallery to life. This role focuses on architecting and developing a highly performant, visually stunning, and responsive user interface purely using HTML5, advanced Vanilla CSS3, and modern Vanilla JavaScript (ES6+), without relying on heavy frameworks.

## Core Responsibilities

- **UI Architecture & Implementation**: Translate high-fidelity designs into pixel-perfect, interactive web pages (`Index.html`, `gallery.html`, `category.html`, `login.html`, `image-preview.html`, etc.).
- **Responsive Engineering**: Develop fluid layouts utilizing CSS Grid and Flexbox that adapt seamlessly across all viewports (desktop, tablet, mobile), ensuring a consistent premium experience.
- **Component Development**: Build and maintain complex interactive components:
  - **Dynamic Filter Bar**: Implement client-side filtering logic for sorting and categorizing vehicles by brand, year, and type. Must handle varied screen sizes (e.g., hidden mobile toggle).
  - **Thumbnail Gallery**: Create interactive image grids featuring advanced hover states, such as the neon/sporty glow effects on active selection for PC users.
  - **Split Cockpit Login**: Implement the dual-panel modern login aesthetic with smooth transitions and form handling.
- **Performance Optimization**: Given the density of ultra-high-resolution (8K) AI-generated images, implement critical performance optimizations including:
  - Native lazy loading (`loading="lazy"`).
  - Intelligent resource preloading.
  - Optimized DOM manipulation to prevent jank during rapid filtering or scrolling.
- **Integration**: Integrate third-party scripts securely, specifically initializing and tracking events via Firebase Analytics across all HTML endpoints.

## Key Deliverables

- Clean, semantic HTML structures ensuring accessibility (WAI-ARIA compliance where applicable).
- A robust CSS architecture leveraging Custom Properties (variables) for theming and scalable styling.
- Highly optimized, modular Vanilla JavaScript logic for UI interactions and state management.
- Comprehensive cross-browser and cross-device functionality testing.
