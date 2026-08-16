# Sherif-Auto Design Specification

This document details the visual identity, UI/UX architecture, typography, color system, and layout guidelines for the **Sherif-Auto** platform. It serves as the single source of truth for maintainers to ensure brand cohesion, premium aesthetics, and responsive performance.

---

## 1. Design Vibe & Identity
**Sherif-Auto** specializes in premium auto upholstery, custom seating, and dashboard restoration. The design system must reflect physical craftsmanship, luxury, precision, and high-end materials (leather, stitching, carbon textures).

To evoke a modern, high-end automotive feel, the site uses a **split-theme design system**:
* **Homepage Hero Section:** A bold, immersive dark space (strictly solid `#121212`) to highlight premium automotive seat products with high-impact gold accents.
* **General Site & Subpages:** A clean, high-contrast Light Theme background to provide a clinical, spacious showroom feel that makes product images pop and ensures absolute legibility.

---

## 2. Color System
The color system relies strictly on CSS Custom Properties declared in the root stylesheet, ensuring quick maintenance and centralized branding variables.

### A. Default Theme Variables (Light Mode)
These tokens apply to all pages and default sections:
```css
:root {
  /* Brand Accent Hierarchy */
  --primary: #d4af37;           /* Premium Metallic Gold */
  --primary-dark: #b8941f;      /* Muted Gold for Hover states */
  --accent: #8b6914;            /* Dark Gold/Bronze for accents */
  --color-champagne: #f4e4bc;    /* Light Champagne for secondary overlays */

  /* Surface & Background Grays */
  --background: #ffffff;        /* Pure White showroom backing */
  --background-rgb: 255, 255, 255; /* RGB form for transparent glass backings */
  --surface: #f8f9fa;           /* Off-white for section cards */
  --surface-dark: #f1f3f4;      /* Slightly darker gray for input blocks */

  /* Typography Colors */
  --text-primary: #2c2c2c;      /* Dark Charcoal for headers & body */
  --text-secondary: #666666;    /* Medium Gray for descriptions & metadata */
  --text-light: #999999;        /* Light Gray for placeholders & disabled items */

  /* Borders & Dividers */
  --border: #e0e0e0;            /* Light gray for structural borders */
  --border-light: #f0f0f0;      /* Extra light gray for subtle card highlights */

  /* Utility Alerts */
  --success: #4caf50;           /* Green for valid fields & confirmations */
  --error: #f44336;             /* Red for validation errors */
  --warning: #ff9800;           /* Amber for alert cues */
}
```

### B. Dark Hero Custom Overrides
Since the homepage hero is dark, elements inside it override the global light tokens using specific local selectors to maintain contrast:
* **Background:** Strictly solid `#121212`.
* **Title Typography:** `#ffffff` (white) for high-contrast reading.
* **Title Accent:** `var(--primary)` (`#d4af37` bright gold) to draw focus.
* **Hero Description:** `rgba(255, 255, 255, 0.75)` (translucent soft white).
* **Secondary Buttons:** Transparent backgrounds with `#ffffff` text, shifting to `#1a1a1a` text on gold background on hover.
* **Carousel Dots:** `#555555` backgrounds with `#444444` borders.

---

## 3. Typography System
Fonts are loaded from Google Fonts and styled to combine geometric modernism with editorial luxury:
* **Primary (Headings, Buttons, Badges):** `Montserrat` (Sans-serif)
  * Geometric, clean, wide, and highly readable.
  * Used for modern headers, labels, buttons, navigation pills, and numbers.
* **Secondary (Accents, Titles):** `Playfair Display` (Serif)
  * Elegant, high-contrast, classic luxury serif.
  * Used for section subtitles, italic highlights (e.g., `.title-accent`), and editorial blocks.

### Typography Hierarchy (Fluid Scale)
To support all screens smoothly, headings use CSS `clamp()` or modular viewport units:
* **Hero Heading:** `font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; line-height: 1.2;`
* **Section Title:** `font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.3;`
* **Card Heading:** `font-size: 1.25rem; font-weight: 600; line-height: 1.4;`
* **Body text:** `font-size: 1rem; line-height: 1.6; font-weight: 400;`
* **Metadata/Label:** `font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em;`

---

## 4. Layout & Spacing
The layout follows a strict mobile-first design grid that adapts fluidly across viewports.

### Spacing Tokens
Spacing values use variables to maintain consistent alignment and grid padding:
* `--spacing-xs: 0.5rem;`
* `--spacing-sm: 1rem;`
* `--spacing-md: 1.5rem;`
* `--spacing-lg: 2rem;`
* `--spacing-xl: 3rem;`
* `--spacing-xxl: 4rem;`

### Structure Constraints
* **Grid Containers:** Max-width is limited to `1200px` (or `1280px` for media galleries) with a minimum lateral margin padding of `1.5rem` (`--spacing-md`) on mobile screens to prevent text bleeding.
* **Why Choose Us Grid:** Uses CSS Grid with auto-fit layout properties to automatically arrange cards based on viewport constraints:
  ```css
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  ```

---

## 5. UI Elements & Components Design

### A. Tubelight Navbar (Desktop)
A modern, floating header bar designed to sit overlaying the layout:
* **Background:** A floating capsule styled with `rgba(var(--background-rgb), 0.85)` backing, `backdrop-filter: blur(16px)` glassmorphism, and a subtle border.
* **Active Indicator:** An absolute positioned capsule slider (`.tubelight-lamp`) with an upper gold glow line (`.tubelight-lamp-glow`) that glides smoothly beneath the active item using GSAP / CSS cubic-bezier transitions.
* **Brand SVG Logo:** High-contrast logo graphic with gold accent borders, responsive to theme changes.

### B. Staggered Overlay Menu (Mobile)
When screens shrink below `768px`, the Tubelight Navbar hides and navigation is delegated to the mobile staggered overlay:
* **Overlay Layer:** An absolute overlay menu container (`.staggered-menu-panel`) sliding in from the right viewport limit.
* **Prelayers:** Dual sliding background prelayers animating in stagger sequence using GSAP timelines to form an elegant page-wipe transition.
* **Links:** Extra-large typography (`3.5rem`), bold weight, with counter numbering (`01`, `02`, etc.) and brand gold highlights on hover.

### C. Advantage Cards
A structured presentation grid inside the "Why Choose Us" section:
* **Styling:** White surface background with very subtle borders (`var(--border-light)`), rounded corners, and a light shadow.
* **Interactivity:** Gentle hover lift-up translation (`translateY(-5px)`) and transition expansion of the card shadows.
* **Counters:** Numbers inside the card headings animate dynamically from `0` to the target metric when scrolled into view using high-performance `requestAnimationFrame` JavaScript loops.

### D. File Upload Containers
Custom file upload wrapper supporting dynamic image attachments:
* **Dashed Border:** A clean, flexible dashed container with central upload cloud icons.
* **Dynamic Preview:** Detects when an image is loaded via a FileReader in JavaScript, scales the container, sets the image as background, and renders a semi-transparent black overlay blur with the file name at the bottom boundary.

---

## 6. Animation & Motion Guidelines
Animations are designed to make the website feel responsive, responsive to interaction, and premium without introducing lags or distracting from content.

### Performance Directives
* **Hardware Acceleration:** Only animate `transform` (scale, translate, rotate) and `opacity` properties to prevent layout thrashing and paint pipeline redraws.
* Avoid animating properties like `width`, `height`, `margin`, `top`, or `left` during active page transitions.

### Motion Parameters
* **Normal Transition:** `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);` (ideal for buttons, cards, and state changes).
* **Smooth Glide:** `transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);` (used for sliding active indicators and menu buttons).
* **GSAP Timelines:** Menu openings use GSAP timelines staggered by `0.05s` with `power4.out` easing to deliver responsive, crisp visual motion.
