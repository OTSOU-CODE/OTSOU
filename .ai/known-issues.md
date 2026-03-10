# Sherif-Auto: Known Issues & Limitations

_Log bugs, technical debt, framework constraints, and intended behaviors here to prevent AI Agents from debugging architectural choices._

## System Constraints (Not Bugs)

### 1. No Framework Runtime

Do not attempt `npm install react`, implement Webpack, or convert to a SPA framework. The site runs as a flat HTML directory served by Firebase Hosting or a local dev server (Live Server, `python -m http.server`).

### 2. Image Load Delays on Large Grids

We use native `loading="lazy"` exclusively. Do **not** install third-party lazy-loading libraries (lozad, lazysizes, etc.). Performance comes from proper WebP compression, thumbnails, and defined `width`/`height` attributes on `<img>` tags.

### 3. ES Module Import Errors

If seeing `import` errors locally, verify:

- The `<script>` tag has `type="module"` set
- The server supports CORS for local module loading (Live Server handles this)
- Do **not** convert ES Modules to CommonJS `require()` syntax

### 4. Firebase Config is Public

The `apiKey` and `projectId` in HTML files are designed to be client-visible. This is normal Firebase Web SDK behavior. Security is enforced via **Firestore Security Rules**, not hidden config.

### 5. Safari `backdrop-filter` Quirks

Always include `-webkit-backdrop-filter` alongside `backdrop-filter`. Safari may also clip `blur()` effects on elements without explicit `border-radius` or `overflow: hidden`.

## Active Technical Debt

### Form State Duplication

The "Get Quote" form logic has regex validation duplicated across files. **Fix:** Create a centralized `validation.js` module exporting reusable validators (email, phone, required fields).

### Monolithic Data File

`vehicles_data.js` is large and growing. Current mitigations:

- Browser parses it in a single pass (acceptable for now)
- Future option: Split by brand into separate modules or migrate to Firestore

### CSS File Splitting

`style.css` must remain under 1,000 lines. As it grows, extract component-specific styles into `/CSS/[component].css` and import via `<link>` in the relevant HTML files.

### Missing Centralized Error Handling

External integrations (Firebase Analytics, EmailJS) should degrade gracefully if blocked by adblockers. Use optional chaining: `window.analytics?.logEvent(...)`.

## Pending Bugs

| ID      | Severity | Description                                                              | Status |
| ------- | -------- | ------------------------------------------------------------------------ | ------ |
| BUG-001 | Low      | Mobile filter toggle visibility edge case at exactly 768px breakpoint    | Open   |
| BUG-002 | Medium   | Gallery grid may show empty cells if `thumbnail_path` is missing in data | Open   |

## Common Gotchas for AI Agents

1. **Don't remove existing GSAP imports** — Multiple components depend on the shared GSAP CDN include
2. **Don't convert `Index.html` to `index.html`** — Firebase Hosting is configured for the current casing
3. **Don't add `overflow: hidden` to `<body>`** — It breaks GSAP ScrollTrigger calculations
4. **Don't use `position: fixed` without testing** — It conflicts with GSAP pinning behavior
5. **Always test at 320px, 768px, and 1440px** — These are the critical responsive breakpoints
