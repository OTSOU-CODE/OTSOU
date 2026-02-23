---
description: Performance Optimization - Code Optimization
---

# Vanilla Code Optimization & Minification (Sherif-Auto)

START → Component Splitting Analysis → Debounce Listeners → Minify Assets → END

## Scope & Context

In a No-Bundler (Vanilla) architecture, you are manually responsible for preventing code bloat. Every line of CSS and JS shipped hits the browser directly.

## Steps:

1. **FILE SPLITTING & MODULE IMPORTS:**
   - Ensure `style.css` doesn't balloon past 1,000 lines. Abstract styles logic to isolated files (`navbar.css`, `footer.css`, `gallery-page.css`).
   - Use `<script type="module">` for imports rather than concatenating 5 massive script tags. Allow the browser to handle dependency charting securely.

2. **DEBOUNCE/THROTTLE EVENT LISTENERS:**
   - If utilizing `window.addEventListener('resize')` or native `scroll` (outside GSAP), wrap the callback in a Debounce function preventing 1,000s of executions per second.

3. **PREVENT MEMORY LEAKS:**
   - If developing single-page application (SPA)-like behavior or dynamically replacing DOM nodes (like Gallery filtering), explicitly ensure you aren't leaving 'ghost' event listeners mapped to deleted DOM elements. Rely intensely on Event Delegation applied to the wrapper `body` or `#root-gallery`.

4. **ASSET MINIFICATION (Deploy Check):**
   - Ensure a minifier (if running a post-build step in Firebase Deploy hooks, or manually via online tools) converts `.css` to `.min.css` for production. Do the same for `.js` files if applicable, though Native ES modules generally perform excellently unminified when HTTP/2 is robust.
