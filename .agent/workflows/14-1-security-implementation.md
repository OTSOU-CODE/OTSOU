---
description: Security - Security Implementation
---

# Security Architecture Workflow (Sherif-Auto)

START → Review Firebase Web Implementation → Harden Firestore Rules → Prevent DOM XSS → CDN Integrity Check → END

## Scope & Context

With Vanilla HTML/JS and Firebase Web SDK, security operates uniquely. We assume all front-end code (including `firebaseConfig`) is public. Security is strictly enforced at the backend gateway and via DOM sanitization.

## Steps:

1. **FIREBASE WEB SDK CONFIGURATION:**
   - Understand that `apiKey` and `projectId` in `Index.html` are inherently public to let the client connect to Firebase. This is safe.
   - Real security relies on Firebase Security Rules, _not_ hiding the config.

2. **FIRESTORE SECURITY RULES (BACKEND):**
   - Lock down read/writes for any sensitive collection.
   - Use rules to restrict payload schemas natively. Do not trust Vanilla JS validation on the client alone.
   - Example rule for Contact forms: `allow create: if request.time < timestamp.date(2027, 1, 1) && request.resource.data.size() == 4;`

3. **PREVENT XSS (Cross-Site Scripting):**
   - Never use `.innerHTML` to inject URL query parameters directly into the DOM (e.g. `document.body.innerHTML = "Category: " + params.get('q')`).
   - Use `.textContent` or `document.createTextNode` if echoing user input or URL states.

4. **ASSET INTEGRITY & HEADERS:**
   - If importing CDNs (like FontAwesome or GSAP), configure them to utilize Subresource Integrity (SRI) hashes (`integrity="sha384-..."`) to block maliciously injected third-party scripts.
   - In `firebase.json` (Hosting configuration), declare mandatory headers:
     - `X-Content-Type-Options: nosniff`
     - `X-Frame-Options: SAMEORIGIN`
     - `Strict-Transport-Security: max-age=31536000`

5. **DEPENDENCY CHECK:**
   - Although the stack is Vanilla, if utilizing `Firebase CLI` or `Node` build scripts to compile SCSS locally, run `npm audit` on those local tools periodically.
