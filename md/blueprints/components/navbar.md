# Blueprint: Tubelight Navbar

## 1. Module Description

The central navigation component featuring a "Tubelight" aesthetic on desktop (a floating, glassmorphism pill with an active sliding lamp indicator) and a standard responsive layout on mobile.

## 2. File Map

- **Logic:** `JS/navbar.js` (Exports `createTubelightNavbar` factory function)
- **Styles:** `CSS/navbar.css` (Contains the layout, positioning, and glow effects)

## 3. DOM Architecture

Created dynamically via JavaScript:

- `.tubelight-navbar`: Fixed bottom (mobile) or top (desktop) wrapper.
- `.tubelight-navbar-container`: The glassmorphism "pill" containing the links.
- `.tubelight-lamp`: The absolute positioned sliding background indicator.
- `.tubelight-lamp-glow` & `.tubelight-lamp-spot`: Child elements simulating the neon light emission via CSS blur filters.
- `.tubelight-nav-item`: Anchor tags representing each route.

## 4. Styling Specs

- **Glassmorphism:** The pill uses `backdrop-filter: blur(16px)` and a highly transparent background.
- **Active Indicator (Lamp):** Utilizes `--primary` (Gold/Champagne) with a `filter: blur(12px)` to simulate a glowing tube light.
- **Responsive:** On mobile (<768px), it docks to the bottom. On desktop, it aligns top-center in a grid.

## 5. Logic & State

- **Initialization:** Instantiated by passing an options object (`{ items, target, logo }`) to `createTubelightNavbar()`.
- **Active State Tracking:** Automatically detects active tabs via URL hash or path matching.
- **Animation Engine:** `moveLampTo(element)` calculates the relative X position and width of the clicked/active item and applies a CSS `transform: translateX()` to the lamp indicator.
- **Smart Scrolling:** Hide-on-scroll logic (`navbar-hidden` class) triggered if the user scrolls down, reappears when scrolling up.

## 6. Maintenance Guide

- **Icons:** The module expects standard Lucide JS icon names (e.g., "home"). Ensure `window.lucide.createIcons()` is available in the environment to render the SVGs.
- **Modifying Glow:** To adjust the neon intensity, tweak the `filter: blur()` values on `.tubelight-lamp-glow::before` in `navbar.css`.
