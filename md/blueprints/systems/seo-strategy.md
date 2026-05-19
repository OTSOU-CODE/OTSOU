# Blueprint: Technical SEO & Accessibility (A11Y) Strategy

## 1. Core Philosophy

Beautiful architecture is meaningless if search engine spiders cannot crawl it and screen readers cannot parse it. The Sherif-Auto Vanilla stack allows for absolute control over the final DOM syntax.

## 2. Semantic HTML

Bypassing endless nested `<div>` "div-soup" common in modern frameworks:

- Global regions utilize `<nav>`, `<main>`, `<section>`, `<aside>`, and `<footer>` tags.
- The DOM rigorously enforces hierarchical logic: A single `<h1>` per page, scaling cleanly down to `<h2>` block titles and `<h3>` card variables.

## 3. Accessibility Attributes (ARIA)

Interactive dynamic components explicitly broadcast state changes to the accessibility tree.

- **Theme Toggle:** Triggers update via `aria-pressed`.
- **Staggered Menu:** Sets `aria-hidden="true"` on the `.staggered-menu-panel` when closed, and flips to `false` (while applying `aria-expanded="true"` to the toggle button) when open.

## 4. Meta Information

Each core `.html` file is required to load standard SEO descriptors within the `<head>`:

- A concise, targeted `<title>` element (e.g., `Sherif-Auto – Auto Upholstery Excellence`).
- A robust `<meta name="description" content="...">` containing high-value indexing keywords (Leather seats, dashboard restoration, custom upholstery).

## 5. Performance as SEO

Google heavily indexes Core Web Vitals (LCP, FID, CLS).

- By avoiding 8MB monolithic JSON framework bundles, the initial Time to Interactive (TTI) is virtually instantaneous.
- Assets are strategically requested utilizing `<link rel="preload" as="style">` for critical Google font families to circumvent FOUT (Flash of Unstyled Text) rendering blocks.
