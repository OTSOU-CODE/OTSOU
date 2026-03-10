# Sherif-Auto: Technical Specifications

## Architecture Ecosystem

Sherif-Auto eschews heavy framework bloat in favor of native, lightning-fast rendering and robust Firebase integrations. The entire frontend runs without a build step — files are served directly.

### 1. Structure (HTML5)

- Standard semantic layout (`<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`)
- One physical `.html` file per major page route (flat root structure)
- Single `<h1>` per page with proper `h1` → `h2` → `h3` hierarchy
- All `<script>` tags use `type="module"` for ES6 module support
- Images use `loading="lazy"` and explicit `width`/`height` attributes

### 2. Styling (CSS3)

- **Vanilla CSS3** utilizing Custom Properties (`:root` variables) defined in `style.css`
- **Complete ban** on utility-first frameworks (Tailwind, Bootstrap, Foundation)
- BEM-inspired class naming (`.nav-container--active`, `.gallery__item`)
- Modular file structure: one `.css` file per component (e.g., `navbar.css`, `footer.css`, `gallery-page.css`)
- Mobile-first media queries using `min-width` breakpoints
- Fluid typography via `clamp()` functions
- Glassmorphism via `backdrop-filter: blur()` with vendor prefixes (`-webkit-`)

**Standard Breakpoints:**

```css
@media (min-width: 480px) {
  /* Large mobile */
}
@media (min-width: 768px) {
  /* Tablet */
}
@media (min-width: 1024px) {
  /* Desktop */
}
@media (min-width: 1440px) {
  /* Large desktop */
}
```

### 3. Logic (JavaScript ES6+)

- **ES6 Modules:** `import`/`export` patterns loaded via `<script type="module">`
- **Event Delegation:** Attach to parent containers, not individual elements
- **DOM Queries:** Cache locally within initialization functions — never globally
- **State Management:** Custom PubSub, closures, or class singletons (`DataManager.js`). No Redux, Zustand, Context API
- **Error Handling:** All async operations wrapped in `try...catch`. DOM elements checked before use (`if (!element) return;`)
- **Data Layer:** `vehicles_data.js` exports structured arrays/objects for grid rendering

**Module Pattern:**

```javascript
// component.js
const initComponent = () => {
  const container = document.querySelector(".component");
  if (!container) return;

  // Cache DOM references locally
  const items = container.querySelectorAll(".item");

  // Event delegation on parent
  container.addEventListener("click", (e) => {
    const target = e.target.closest(".item");
    if (!target) return;
    // Handle click
  });
};

export { initComponent };
```

### 4. Animation (GSAP)

- **Only external library** permitted for complex view management
- Import via CDN ESM: `https://cdn.jsdelivr.net/npm/gsap@3/+esm`
- **Restricted Properties:** Animate only `opacity` and `transform` (`scale`, `x`, `y`, `rotation`)
- **Primary Uses:**
  - `ScrollTrigger` — Section reveal animations, parallax
  - `gsap.timeline()` — Choreographed sequences (Hero, navigation)
  - `stagger` — Wave effects on grids and lists
  - `gsap.matchMedia()` — Responsive animation logic (desktop vs mobile)
- **Performance:** Use `force3D: true`, `will-change` sparingly
- **Accessibility:** Respect `prefers-reduced-motion` — disable heavy timelines

### 5. Backend (Firebase)

- **Hosting:** Firebase Hosting with `cleanUrls: true` and custom headers
- **Firestore:** NoSQL document storage for contact form submissions, analytics events
- **Analytics:** Firebase Analytics for UX telemetry
- **Web SDK:** Injected natively via `<script type="module">` — no npm install required
- **Security:** Firestore Security Rules enforce schema validation server-side
- **Config:** `apiKey`/`projectId` are inherently public (client SDK). Real security = Firestore Rules

### 6. Local Development

- No bundlers (Webpack, Vite) or package managers required
- Serve via VS Code **Live Server** extension or `python -m http.server`
- Files load via native ES6 module resolution
- Deploy via `firebase deploy --only hosting`

## Hard Constraints (Never Violate)

| ❌ Forbidden                    | ✅ Required Instead                          |
| ------------------------------- | -------------------------------------------- |
| React, Vue, Svelte, Angular     | Vanilla ES6 Modules                          |
| Tailwind, Bootstrap, Foundation | Vanilla CSS3 + Custom Properties             |
| Webpack, Vite, Rollup, Parcel   | Native browser ES6 module loading            |
| npm install for frontend deps   | CDN ESM imports or inline scripts            |
| jQuery                          | Native DOM APIs                              |
| Inline styles (`style="..."`)   | CSS classes (exception: GSAP dynamic values) |
| `console.log()` in production   | Clean, commented code                        |
| Animating layout properties     | `transform` and `opacity` only               |
