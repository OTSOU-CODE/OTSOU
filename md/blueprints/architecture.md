# Blueprint: System Architecture

## Overview

The Sherif-Bach website architecture is consciously designed to prioritize client-side performance, visual fidelity, and immediate interactivity. It eschews heavy modern frontend frameworks (like React or Vue) in favor of a highly optimized static-first approach, leveraging Vanilla web technologies.

## 1. Frontend Presentation Layer (HTML)

- **Static Generation Strategy**: Pages are statically structured (`Index.html`, `gallery.html`, etc.) to ensure instant Time-To-First-Byte (TTFB) and robust SEO indexing.
- **Semantic Structure**: Deep utilization of HTML5 semantic tags (`<header>`, `<footer>`, `<main>`, `<article>`, `<section>`) to establish a clear DOM tree, aiding both screen readers and browser rendering engines.
- **Asset Linking**: Explicit pre-loading and pre-connecting to critical assets (fonts, Firebase CDN) within the `<head>`.

## 2. Global Styling Engine (CSS)

- **Strategy**: Modular Vanilla CSS implementation.
- **Variable-Driven Design**: Heavy reliance on CSS Custom Properties (`:root`) to define the global design system (colors, typography scales, spacing, standard blur values for glassmorphism).
- **Responsive Architecture**: Built primarily around CSS Grid for complex, two-dimensional component layouts (like the main gallery) and Flexbox for linear alignments (nav bars, filter bars). Employs mobile-first media queries.
- **Advanced Compositing**: Uses hardware-accelerated CSS properties (`transform`, `opacity`) for smooth animations, and `backdrop-filter` for the site's signature frosted glass aesthetics.

## 3. Behavioral Logic Layer (Vanilla JS)

- **Module Structure**: JavaScript files are separated by logical domain (e.g., `filter.js`, `gallery-interaction.js`, `analytics.js`).
- **DOM Interaction**: Direct, optimized DOM querying and manipulation. Uses event delegation extensively to minimize memory leaks on pages with dense image grids.
- **State Management**: Application state (e.g., active filters, current pagination page) is managed intrinsically within the JavaScript execution context and reflected immediately in the DOM, avoiding virtual DOM overhead.

## 4. Data Consumption Layer (JSON)

- **Static Data Fetching**: Vehicle information and metadata are stored statically in JSON formats inside the `DATA` structure. The frontend utilizes the native `fetch()` API to asynchronously retrieve, parse, and render this data dynamically onto the page without requiring a live backend database.

## 5. Infrastructure & Telemetry

- **Hosting**: Served globally via optimized static hosting platforms (Wispbyte/GitHub Pages).
- **Analytics**: Firebase SDK integrated directly into the client to trigger custom events (page views, filter interactions, image zoom).
