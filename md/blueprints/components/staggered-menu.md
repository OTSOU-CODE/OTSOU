# Blueprint: Staggered Menu

## 1. Module Description

The `StaggeredMenu` is a highly complex, GSAP-powered mobile navigation overlay. It was adapted from a React component into a pure Vanilla JS ES6 class, bringing a "Flutter-style" elastic and performant animation experience to the Sherif-Auto architecture.

## 2. File Map

- **Logic:** `JS/staggered-menu.js` (Exports the `StaggeredMenu` class)
- **Styles:** `CSS/staggered-menu.css` (Handles the static layout and pre-layer colors prior to GSAP manipulation)

## 3. DOM Architecture

The menu injects a massive structural block into the `target` option element (usually `document.body`):

- `.staggered-menu-wrapper`: The root container.
- `.sm-prelayers`: Background color blocks that slide in sequentially for visual depth.
- `.staggered-menu-header`: Contains the logo and the `.sm-toggle` button.
- `.staggered-menu-panel`: The full-screen off-canvas overlay containing the navigation links (`.sm-panel-list`) and social links (`.sm-socials`).

## 4. Animation Engine (GSAP)

This component strictly relies on GSAP (`gsap.timeline`) for hardware-accelerated animations, avoiding CSS transitions where complex sequences are required.

- **Entrance (`playOpen()`):** Builds a dynamic timeline (`buildOpenTimeline()`) that sequentially slides in `.sm-prelayer` blocks (`ease: 'power4.out'`), followed by the main panel.
- **Staggered Links:** Navigation items slide in and fade (`opacity: 1`, `x: 0`) using a `<0.1s` stagger delay (`ease: 'power2.out'`).
- **Social Pops:** Social links utilize an elastic bounce effect (`ease: 'elastic.out(1, 0.5)'`) for a premium tactical feel.
- **Toggle Icon:** The burger menu icon morphs into a close icon using exact rotational Tweens (`rotate: 225`).
- **Text Cycler:** The "Menu/Close" label visually cycles through a virtual slot-machine animation string created dynamically in JS.

## 5. Maintenance Guide

- **GSAP Dependency:** This component will fail fatally if `window.gsap` is not loaded before instantiation.
- **Colors/Pre-layers:** Defined via the `colors: ['#hex', ...]` array in the constructor options. The class automatically strips the middle color if >2 are provided to enforce the layered design language.
