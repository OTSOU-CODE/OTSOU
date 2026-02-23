# Sherif-Auto: Known Issues & Limitations

_Log bugs, technical debt constraints, and framework limitations here to prevent AI Agents from debugging intended architectural choices._

## System Constraints (Not Bugs)

1. **"Missing Framework Errors"**: Do not attempt to run `npm install react` or implement Webpack. The site is intended to run as a flat directory structure over native localhost testing servers (e.g., Live Server extension or `python -m http.server`).
2. **Image Load Delays on Large Grids**: We are prioritizing WebP loading natively over `<canvas>` or heavy lazy-load frameworks. Do not implement third-party lazy-loading libraries; use native `loading="lazy"` attributes.
3. **`import` Errors**: If seeing ES6 import errors locally, ensure the server is interpreting files correctly and the `<script>` tag is explicitly set to `type="module"`. Do not attempt to compile JS down to CommonJS `require()`.

## Current Technical Debt

- **Form State Duplication**: The "Get Quote" form logic requires a centralized validation script (`validation.js`) rather than re-writing the Regex per HTML file route.
- **Hard-coded Data Loading**: `vehicles_data.js` is currently massive. Future updates may necessitate splitting this localized data file or officially shifting the source of truth to Firestore to reduce initial parsing times.

## Pending Bugs

- None accurately mapped yet for the new Vanilla/GSAP workflow overhaul. Wait for integration testing.
