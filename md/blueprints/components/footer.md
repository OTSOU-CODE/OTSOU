# Blueprint: Footer

## 1. Module Description

The main site footer providing newsletter subscription, quick links, contact information, social links, and a mirrored theme functionality switch. It uses a JavaScript factory pattern for dynamic injection, ensuring the footer is identical across all pages.

## 2. File Map

- **Logic:** `JS/footer.js` (Exports `createFooter`)
- **Styles:** `CSS/footer.css` (Grid layouts, input styles, tooltip logic)

## 3. DOM Architecture

- `.footer-section`: The main wrapper.
- `.footer-grid`: CSS Grid defining 1 to 4 columns depending on viewport width.
- **Columns:** 1) Newsletter, 2) Links, 3) Maps/Contact, 4) Social & Theme.
- `.switch-root` & `.switch-thumb`: Custom, accessible toggle DOM elements for the theme switcher.

## 4. Styling Specs

- **Grid:** Responsive from 1 column (mobile) -> 2 columns (768px) -> 4 columns (1024px).
- **Inputs:** Clean inputs with a gold `--primary` focus ring (`box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2)`).
- **Tooltips:** Uses pure CSS (`.tooltip-container:hover .tooltip-text`) to reveal social labels without JS overhead.
- **Decor:** Features a `.footer-blur-blob` for subtle asymmetric ambiance.

## 5. Logic & State

- **Rendering:** Uses string-literal HTML parsing to create DOM nodes.
- **Theme Switch Synchronization:**
  - Maintains local state via `.switch-root[data-state="checked"]`.
  - Dispatches local storage updates to `'theme'`.
  - **Observer Pattern:** Implements a `MutationObserver` watching `document.documentElement`'s `data-theme` attribute. If the theme is toggled elsewhere (e.g., main header), the footer switch perfectly syncs its visual state to match.

## 6. Maintenance Guide

- **Updating Links:** Modify the template literal inside `JS/footer.js`.
- **Map Marker:** The Google Maps iframe `src` is hardcoded in the JS file. Update the coordinates there if the physical location changes.
