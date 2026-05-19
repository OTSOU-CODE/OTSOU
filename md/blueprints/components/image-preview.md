# Blueprint: Image Preview (PDP)

## 1. Module Description

The Image Preview module functions as the Product Display Page (PDP) for Sherif-Auto's pre-configured upholstery variants. It manages dynamic gallery rendering, variant selection (color swatches), pricing calculations, and intercepts "Add to Cart" logic.

## 2. File Map

- **Logic:** `JS/image-preview.js`
- **Styles:** `CSS/image-preview.css` (Handles layout for the main viewing area, thumb grids, pricing configurators, and sticky mobile bars)

## 3. DOM Architecture

- `#mainImage`: The primary high-resolution focus image.
- `#thumbnailsGrid`: The flex-grid of alternative viewing angles.
- `#colorOptions`: Container for dynamically injected `.color-btn` swatches.
- `.config-btn` / `#qtyInput`: Elements tracking the user's specific tailoring choices.
- `.sticky-bar`: A mobile-optimized bottom bar that tracks the product name, visual thumbnail, and the final dynamically calculated price.

## 4. Logic & State

- **Data Source:** State is currently derived from a hardcoded `galleryData` array, representing luxury designs (e.g., "Premium Black & Orange").
- **Routing (URL Params):** `initPDP()` reads `window.location.search` (`?index=X`) to determine which product variant to render on load. When a new color swatch is clicked (`switchProduct()`), it updates the browser url parameter instantly without triggering a strict page reload via `window.history.pushState`.
- **Dynamic Pricing:** Functions like `updateDisplayedPrice()` calculate the base price + extra features (parsed via Regex from the `.config-price` string) and update all DOM price nodes synchronously.
- **Cart Integrations:** `addToCart()` pulls the active configuration title, compiles a JS custom payload, stringifies it to the `localStorage` `'cart_items'` array, and fires a `'cartUpdated'` CustomEvent to refresh global components.

## 5. Maintenance Guide

- **Adding New PDP Data:** Append objects to the `galleryData` array at the top of `JS/image-preview.js`. Ensure they follow the strict schema (`id`, `src`, `title`, `price`, `colorCode`, `variants[]`).
