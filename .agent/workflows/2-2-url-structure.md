---
description: Information Architecture - URL Structure Design
---

# URL Structure Design Workflow (Sherif-Auto)

START → Define Pattern → Map Native HTML Files → Validate SEO → END

## Scope & Context

Since Sherif-Auto runs on Vanilla HTML without a dynamic backend router (like Next.js), URL structure entirely depends on clean static file naming and organized directories.

## Steps:

1. **Define File Naming Rules (The "URL"):**
   - Use strict `kebab-case.html` for all front-facing pages (e.g., `image-preview.html`, `privacy-policy.html`).
   - Exceptions: `Index.html` (root entry point).
   - Keep URLs flat at the root level unless there's a massive sub-category scaling need.

2. **Map Static Assets vs Pages:**
   - `/CSS/` - Modular styling assets.
   - `/JS/` - Modular script assets.
   - `/DATA/` - JSON configurations.
   - `/images/` - Visual assets.
   - Root `/` - All `.html` files.

3. **Handle Dynamic Parameters:**
   - For filtering (e.g., category selection), utilize URL Query Parameters handled by JS (e.g., `category.html?type=leather`).
   - Ensure `DataManager.js` or `category.js` gracefully handles missing or malformed query strings.

4. **Validate SEO-friendliness:**
   - Verify URLs don't look like `page1.html` or `test.html`.
   - Ensure `rel="canonical"` tags in the `<head>` point to the exact clean URL without query parameters if the content is heavily duplicated.

5. **Document URL structure:**
   - Maintain the `AI_Agent_Instructions.md` map.
