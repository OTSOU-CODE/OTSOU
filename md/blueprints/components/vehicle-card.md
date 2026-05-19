# Blueprint: Vehicle Card

## 1. Module Description

The Vehicle Card is the standardized semantic block used to display cars in grids across the platform (e.g., category mapping pages). It enforces the Sherif-Auto gold/dark visual language for product density.

## 2. File Map

- **Styles:** `CSS/vehicle-card.css`
- **Logic:** Usually generated dynamically via template literals in parent container JS files (e.g., `category.js`), leveraging standard HTML structural nodes defined in the CSS file.

## 3. DOM Architecture

- `.vehicle-card`: The root container orchestrating hover transforms and gold border highlights.
- `.vehicle-image-container`: A strict 4:3 aspect ratio block with `object-fit: cover` to normalize disparate imported image sizes seamlessly.
- `.vehicle-info`: The text payload block.
- `.vehicle-brand`, `.vehicle-model`, `.vehicle-type`: Standardized typography tiers inheriting `--text-brand` (Gold).
- `.skeleton-card`: A loading state variant that utilizes a CSS `@keyframes pulse` to smoothly signal remote data fetching.

## 4. Styling Specs

- **Premium Hover:** On `hover`, the card utilizes a `.3s cubic-bezier` translation upwards (`translateY(-4px)`) and intensifies the lower drop shadow, while shifting the border color to `--primary` (Gold) for a luxury tactile response.
- **Image Zoom:** The internal `img` element physically scales to `1.05` on root card hover, expanding depth without altering the card's rigid DOM footprint.

## 5. Maintenance Guide

- **Image Sizing Requirements:** Always ensure images provided to the card generation logic are high quality and somewhat centrally framed, as the `4/3` aspect ratio will ruthlessly crop edges.
- **Class Consistency:** Do not deviate from the specific class structure when generating these cards dynamically in Javascript, as `vehicle-card.css` relies on strict child combinators and hierarchy definitions.
