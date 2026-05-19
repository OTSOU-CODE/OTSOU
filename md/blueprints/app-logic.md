# Blueprint: Application Logic

## 1. Module Description

This blueprint documents the core application engine of Sherif-Auto. The logic is primarily housed in `script.js`, which serves as the central orchestrator for DOM manipulation, global event listeners (scroll, resize, touch), theme toggling, and component initialization.

## 2. File Map

- **Core Engine:** `JS/script.js` (Orchestrates all global interactions)
- **Configuration Map:** `JS/config.js` (Stores global constants like brand image paths)

## 3. DOM Architecture

`script.js` operates by waiting for the `DOMContentLoaded` event and sequentially firing initialization functions:

- `initializeElements()`: Caches critical global DOM nodes (`navbar`, `navToggle`, `navMenu`, `backToTopBtn`, `themeToggleBtn`).
- `setupEventListeners()`: Binds click, scroll, resize, and custom touch interactions.

## 4. Logic & State (script.js)

### Global State Management

Instead of a global object, `script.js` relies on DOM data attributes (e.g., `data-theme="dark"`) and CSS classes (`.active`, `.scrolled`) to manage application state visually.

### Detailed Function Registry

- **Navigation Logic:**
  - `toggleMobileMenu()`, `openMobileMenu()`, `closeMobileMenu()`: Manages the burger menu, adding/removing `.active` classes and toggling `body.overflow` to prevent background scrolling.
  - `handleScroll()`: Fires on user scroll. Triggers the `.scrolled` state on the navbar for the pill-shape shrink effect, shows/hides the "Back to Top" button, and updates active nav links based on scroll position (`updateActiveNavLink()`).
- **Theme Engine:**
  - `toggleTheme(event)`: The core light/dark mode orchestrator. It uses the modern View Transitions API (`document.startViewTransition`) to create a circular reveal animation radiating from the click coordinates.
  - `loadTheme()`: Checks `localStorage` on load and applies the saved theme.
- **Touch & Mobile Optimization:**
  - `setupTouchEvents()` / `setupSwipeGestures()`: Adds active touch scaling to buttons and implements a robust Javascript-based swipe and drag logic for the car seat carousel (`.car-seat-wrapper`), calculating `startX/Y` and determining horizontal movement intents.
- **Forms & Validation:**
  - `setupContactForm()`: Hijacks the default form submission, uses HTML5 Validity API, includes a Regex check for email, and provides a custom Javascript file drag-and-drop interface (`.file-upload-wrapper`).
- **Header Search (`initHeaderSearch`):**
  - Manages live search input. It loads recent searches from `localStorage` and queries against loaded `vehicles.csv` data and hardcoded services.

## 5. Maintenance Guide

- **View Transitions:** If adding new global theme changes, ensure the `::view-transition-old/new` pseudo-elements in `style.css` are not overridden, as `script.js` relies on them for the circular theme toggle effect.
- **Event Listeners:** Note the use of `debounce(handleResize, 150)` when listening to window resizes to prevent layout thrashing. Replicate this pattern for future scroll/resize listeners.
