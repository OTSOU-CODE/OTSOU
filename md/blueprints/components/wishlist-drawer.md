# Blueprint: Wishlist Drawer

## 1. Module Description

The Wishlist Drawer provides a slide-out UI for users to save and review their favorite components and vehicles. Similar to the Cart Drawer, it manages state via `localStorage` and relies on Vanilla JS DOM manipulation to avoid heavy frameworks.

## 2. File Map

- **Logic:** `JS/wishlist-drawer.js` (Exports `initWishlistDrawer`, `openWishlist`, `closeWishlist`)
- **Styles:** Structure usually matches the cart drawer pattern but utilizes specific `.wishlist-overlay` and `.wishlist-drawer` classes.

## 3. DOM Architecture

Dynamically injected on initialization:

- `.wishlist-overlay`: The blurred backdrop.
- `.wishlist-drawer`: The off-canvas container.
- `.wishlist-items-container`: The list area.
- `.wishlist-footer`: Contains the "Clear Wishlist" bulk action.

## 4. Logic & State

- **State Persistence:** Data is stored in `localStorage` under `'wishlist_items'`.
- **Event Delegation:** Opens when clicking items matching `.open-wishlist-trigger` or `.header-icon-btn[title="Wishlist"]`.
- **Interactions:**
  - `removeWishlistItem(index)`: Deletes an item and re-renders the DOM.
  - `Clear Wishlist`: Prompts for confirmation before wiping the local storage array.
  - **Add to Cart flow:** Redirects users to the specific Product Display Page (`image-preview.html?index=...`) rather than handling complex product configurations directly within the drawer, keeping the wishlist scope deliberately lean.
- **Event Hooks:** Listens to and dispatches the `'wishlistUpdated'` Custom Event on the `window` object to synchronize active "heart" icons across all currently rendered vehicle cards.

## 5. Maintenance Guide

- **Data Structure:** The wishlist expects a simpler data object than the cart: `{id, title, image}`. Keep it lightweight to ensure fast JSON parsing.
