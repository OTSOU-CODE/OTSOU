# Blueprint: Cart Drawer

## 1. Module Description

The Cart Drawer is a slide-out overlay component that manages the user's shopping session. It handles the display, total calculation, quantity adjustments, and removal of items, persisting state entirely in the browser's `localStorage`.

## 2. File Map

- **Logic:** `JS/cart-drawer.js` (Exports `initCartDrawer`, `openCart`, `closeCart`)
- **Styles:** `CSS/cart-drawer.css` (Handles the off-canvas slide animation and interior layout)

## 3. DOM Architecture

Dynamically injected on initialization if not present:

- `.cart-overlay`: Full-screen blurred backdrop intercepting outside clicks.
- `.cart-drawer`: The off-canvas container sliding from the right.
- `.cart-items-container`: Scrollable list where `renderCartItems()` injects `.cart-item` nodes.
- `.cart-footer`: Fixed bottom area containing the total (`#cartTotal`) and checkout button.

## 4. Styling Specs

- **Animation:** Uses a performant `transform: translateX(100%)` to `0` transition with a subtle cubic-bezier ease for a premium feel.
- **Structure:** Flexbox column layout ensuring the footer sticks to the bottom.
- **Theme Aware:** Uses the standard `[data-theme="dark"]` overrides to switch from white surface to deep charcoal.

## 5. Logic & State

- **State Persistence:** The cart's source of truth is purely the window's `localStorage` under the key `'cart_items'`.
- **Event Delegation:** Listens globally for clicks on elements matching `.open-cart-trigger` or `.header-icon-btn[title="Cart"]` to open.
- **Re-rendering:** When quantities change (`updateCartItemQty`) or items are removed (`removeCartItem`), the container is re-rendered via template literals, maintaining synchronization with `localStorage`.
- **Event Dispatch:** Emits a Custom Event `'cartUpdated'` natively to window so external components (like a header badge) can react and display the correct item count (`updateGlobalBadge()`).

## 6. Maintenance Guide

- **Adding to Cart Programmatically:** From anywhere in the app, retrieve `'cart_items'` from localStorage, push the specific object schema (`{title, image, price, config, quantity}`), stringify back to localStorage, and dispatch the `'cartUpdated'` event.
