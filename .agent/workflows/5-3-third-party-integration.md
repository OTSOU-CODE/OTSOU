---
description: Backend Development - Third-Party Integration
---

# Third-Party Integration Workflow (Sherif-Auto)

START → Scope API → Implement ESM → Secure Config → Handle Async Layout → Test → END

## Scope & Context

Sherif-Auto avoids heavy NPM abstraction libraries. Third-party integrations (Firebase Analytics, EmailJS, WhatsApp APIs) must be injected cleanly via CDN ESM modules `<script type="module">` or standard Fetch mechanisms.

## Steps:

1. **RESEARCH & SCOPE:**
   - Confirm the API does not deeply conflict with global CSS or require heavy jQuery/React dependencies.
   - Prefer REST APIs using Vanilla `fetch()`.

2. **SETUP FIREBASE / INTEGRATIONS:**
   - Use ES Modules directly from the CDN (`https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js`).
   - Maintain configuration strings inside a dedicated `config.js` or directly inside the `<script type="module">` inside `Index.html` head/body.

3. **IMPLEMENTATION (Vanilla Async/Await):**
   - Wrap all third-party network requests in async functions.
   - Add GSAP loading indications before triggering `await fetch(url)`.

4. **ERROR HANDLING:**
   - Always `try...catch` external integrations.
   - If an integration fails (e.g., Firebase Analytics blocked by Adblocker), ensure the core UI doesn't crash. Use optional chaining (`window.analytics?.logEvent(...)`).

5. **UI SHIELDING (Async Layouts):**
   - Do not let a slow 3rd party API block the rendering of the `[data-hero]` or `gsap.timeline()` interactions. Loading external telemetry should happen asynchronously post-DOM load via `defer`.

6. **MONITORING:**
   - Periodically check the Firebase Console for execution limits, quota warnings, or rejected Security Rule requests.
