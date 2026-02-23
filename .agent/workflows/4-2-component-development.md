---
description: Frontend Development - Component Development
---

# Component Development Workflow (Sherif-Auto)

START → Plan Component → Scaffold HTML → Write CSS Mod → Build ES6 Class/Function → Test GSAP → END

## Scope & Context

In a Vanilla JS environment, "Components" are self-contained pairs of `.css` and `.js` files (like `navbar.js` & `navbar.css`) injected via template literals or DOM manipulation without React/Vue.

## For EACH component:

1. **PLAN:**
   - Define the DOM target for injection (e.g., `<div id="navbar-root">`).
   - Identify required parameters (e.g., links, titles, images).
   - Ensure it matches the luxury dark/gold design language.

2. **BUILD HTML STRUCTURE (in JS):**
   - Create a clean pure ES6 function or class containing the template literal for the UI.
   - Use strict BEM-inspired class names (e.g., `.gallery__item`, `.gallery__thumbnail`).
   - Use `document.createElement` when complex event delegation is not possible before mounting.

3. **WRITE MODULAR CSS:**
   - Create `[component].css`.
   - Start with CSS Variables from `style.css`.
   - Never use `!important` unless strictly dealing with edge-case utility overrides.
   - Separate state classes (e.g., `.is-active`, `.is-loading`).

4. **ADD JS LOGIC:**
   - Attach Event Listeners using Event Delegation attached to the wrapper element `e.target.closest('.selector')` instead of looping through `querySelectorAll`.
   - Manage local states inside the module scope (`let currentSlide = 0;`).

5. **IMPLEMENT GSAP:**
   - Use GSAP for entry/exit animations (`gsap.fromTo`).
   - Avoid animating width/height or top/left; use GSAP transforms (`x`, `y`, `scale`) for 60fps performance.

6. **TEST & AUDIT:**
   - Verify layout resize events.
   - Test interaction flow.
   - Check performance using Chrome DevTools rendering FPS meter.
