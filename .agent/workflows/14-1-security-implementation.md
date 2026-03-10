---
description: "Security - Security Implementation"
---

# Security Architecture Workflow (Sherif-Auto)

START → Firebase SDK Review → Firestore Rules → XSS Prevention → Asset Integrity → Security Headers → Dependency Audit → END

## Scope & Context

With vanilla HTML/JS and Firebase Web SDK, security operates uniquely. All front-end code (including `firebaseConfig`) is inherently public. Real security is enforced at the Firestore rules level and through DOM sanitization.

## Prerequisites

- Firebase CLI installed (`npm install -g firebase-tools`)
- Access to Firebase Console for the project

## Steps

### 1. FIREBASE WEB SDK CONFIGURATION

- [ ] Understand that `apiKey` and `projectId` in HTML are **intentionally public** — this lets the client SDK connect to Firebase
- [ ] Never store secret keys (service account keys, admin SDK credentials) in frontend code
- [ ] Verify Firebase config uses only public Web SDK fields:
  ```javascript
  // These are SAFE to expose in frontend code
  const firebaseConfig = {
    apiKey: "...", // Public: identifies your project
    authDomain: "...", // Public: auth redirect domain
    projectId: "...", // Public: project identifier
    storageBucket: "...", // Public: storage bucket URL
    messagingSenderId: "...", // Public: messaging sender
    appId: "...", // Public: app identifier
    measurementId: "...", // Public: analytics ID
  };
  ```

### 2. FIRESTORE SECURITY RULES (Backend Enforcement)

- [ ] Deploy strict Firestore Security Rules — this is your **real** security layer
- [ ] Lock down collections with schema validation:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Contact form submissions — public create, admin-only read
    match /contact_requests/{requestId} {
      allow create: if
        request.time < timestamp.date(2027, 1, 1) &&
        request.resource.data.keys().hasAll(['name', 'email', 'message']) &&
        request.resource.data.size() <= 5 &&
        request.resource.data.name is string &&
        request.resource.data.name.size() >= 2 &&
        request.resource.data.name.size() <= 100 &&
        request.resource.data.email is string &&
        request.resource.data.email.matches('.*@.*\\..*') &&
        request.resource.data.message is string &&
        request.resource.data.message.size() >= 10 &&
        request.resource.data.message.size() <= 2000;

      allow read, update, delete: if false; // Admin SDK only
    }

    // Default: deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] Deploy rules: `firebase deploy --only firestore:rules`
- [ ] Test rules in Firebase Console Rules Playground

### 3. PREVENT XSS (Cross-Site Scripting)

- [ ] **Never** use `.innerHTML` to inject URL query parameters:

  ```javascript
  // ❌ DANGEROUS — XSS vulnerability
  document.body.innerHTML = "Category: " + params.get("q");

  // ✅ SAFE — Uses textContent (auto-escapes HTML)
  element.textContent = params.get("q");

  // ✅ SAFE — Uses createTextNode
  const text = document.createTextNode(params.get("q"));
  element.appendChild(text);
  ```

- [ ] Search codebase for `.innerHTML` usage with dynamic data:
  ```bash
  grep -rn "\.innerHTML" JS/ --include="*.js"
  ```
- [ ] Verify any `.innerHTML` usage only contains static template literals (no user input)
- [ ] If displaying CMS or user-generated content, sanitize with DOMPurify

### 4. ASSET INTEGRITY (SRI)

- [ ] Add Subresource Integrity hashes to CDN `<script>` tags:
  ```html
  <script
    src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"
    integrity="sha384-[hash]"
    crossorigin="anonymous"
  ></script>
  ```
- [ ] Generate SRI hashes: `openssl dgst -sha384 -binary file.js | openssl base64 -A`
- [ ] Or use: https://www.srihash.org/

### 5. SECURITY HEADERS (firebase.json)

- [ ] Configure security headers in `firebase.json`:
  ```json
  {
    "hosting": {
      "headers": [
        {
          "source": "**",
          "headers": [
            { "key": "X-Content-Type-Options", "value": "nosniff" },
            { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
            { "key": "X-XSS-Protection", "value": "1; mode=block" },
            {
              "key": "Referrer-Policy",
              "value": "strict-origin-when-cross-origin"
            },
            {
              "key": "Strict-Transport-Security",
              "value": "max-age=31536000; includeSubDomains"
            },
            {
              "key": "Permissions-Policy",
              "value": "camera=(), microphone=(), geolocation=()"
            }
          ]
        }
      ]
    }
  }
  ```

### 6. DEPENDENCY AUDIT

- [ ] Although the stack is vanilla, check any local Node tools:
  - `npm audit` on Firebase CLI workspace
  - Keep `firebase-tools` updated: `npm install -g firebase-tools@latest`
- [ ] Review CDN versions: GSAP, Google Fonts — ensure using latest stable
- [ ] Check for known vulnerabilities in CDN dependencies

## Verification Checklist

- [ ] Firestore rules deployed and tested
- [ ] No `.innerHTML` injection of user/URL data
- [ ] SRI hashes on CDN scripts
- [ ] Security headers configured in firebase.json
- [ ] No secret keys in frontend code
- [ ] Firebase config contains only public SDK fields

## Related Workflows

- **Form Implementation:** `/4-4-form-implementation` — Form validation patterns
- **Third-Party Integration:** `/5-3-third-party-integration` — Firebase SDK setup
- **Pre-Launch Checklist:** `/10-2-pre-launch-testing-checklist` — Security gate checks
