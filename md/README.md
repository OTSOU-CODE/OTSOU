# Sherif-Auto Documentation (Blueprints)

Welcome to the Sherif-Auto documentation system. This repository of Markdown files serves as the ultimate professional blueprint for the Sherif-Auto website.

## Purpose

These blueprints allow any developer or AI assistant to understand, maintain, and edit the website with minimal re-analysis. They are meticulously structured to cover every layer of the Vanilla web architecture (HTML5, CSS3, ES6, GSAP, Firebase) to guarantee a high-end, premium aesthetic and flawless performance.

## Directory Structure

The blueprints are organized logically:

- **Infrastructure**
  - `design-system.md`: Details root CSS variables, color palettes, typography, spacing, and global layout classes.
  - `data-management.md`: Explains data fetching strategy, `DataManager.js`, and the structure of `vehicles_data.js`.
  - `backend-integration.md`: Covers Firebase initialization, database structure (Realtime DB), and security.
  - `app-logic.md`: Documents the core application engine orchestrating layout initialization and state (`script.js`, `config.js`).

- **UI Components (`components/`)**
  - Component-level blueprints (e.g., `navbar.md`, `cart-drawer.md`, `vehicle-card.md`), each explaining its specific DOM, styles, state, and animation.

- **Pages (`pages/`)**
  - Page-level layout and feature maps (`homepage.md`, `category-page.md`, `gallery-page.md`).

- **Advanced Systems (`systems/`)**
  - `animation-architecture.md`: Details GSAP usage, core transitions, and scroll effects.
  - `seo-strategy.md`: Outlines metadata and semantic HTML standards.
  - `asset-guide.md`: Naming conventions and optimization for high-res imagery.
  - `maintenance-scripts.md`: Details utility node scripts used for batch processing or data cleanup.

## Core Architectural Principles

Sherif-Auto is built using a strict **Vanilla ES6+ and Vanilla CSS3** architecture with **GSAP** for premium animations.

1.  **Zero-Dependency UI:** Frameworks like React, Vue, or Tailwind CSS are prohibited unless explicitly required.
2.  **Modularity:** Each functional component has its own `.css` and `.js` file, cleanly imported to avoid monolithic files.
3.  **High-End UX:** Animations must feel smooth, hardware-accelerated, and luxurious.

_Always read the related blueprint before making modifications to ensure consistency with the Sherif-Auto standard._
