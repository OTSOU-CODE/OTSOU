---
description: "Deployment - Firebase Hosting Deployment"
---

# Firebase Hosting Deployment Workflow (Sherif-Auto)

// turbo-all

START → Pre-Deploy Checks → Build Optimization → Firebase Configuration → Deploy → Post-Deploy Verification → END

## Scope & Context

Sherif-Auto deploys as a static site to Firebase Hosting. No build step is required — files are served directly. This workflow ensures a clean, optimized deploy.

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Authenticated: `firebase login`
- Project configured: `firebase use <project-id>`

## Steps

### 1. PRE-DEPLOY CHECKLIST

Run the `/10-2-pre-launch-testing-checklist` workflow first, then:

- [ ] No `console.log()` statements in production JS files
- [ ] All images converted to WebP and properly sized
- [ ] No broken links or 404 references
- [ ] All CSS/JS imports resolve correctly
- [ ] `firebase.json` exists at project root

### 2. FIREBASE CONFIGURATION

Ensure `firebase.json` is properly configured:

```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/node_modules/**",
      "**/.agent/**",
      "**/.ai/**",
      "**/Global/**",
      "**/DATA/**",
      "**/*.md",
      "**/.git/**"
    ],
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "/images/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.css",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=2592000" }
        ]
      },
      {
        "source": "**/*.js",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=2592000" }
        ]
      },
      {
        "source": "**",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
          { "key": "X-XSS-Protection", "value": "1; mode=block" },
          {
            "key": "Strict-Transport-Security",
            "value": "max-age=31536000; includeSubDomains"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

### 3. DEPLOY

```bash
firebase deploy --only hosting
```

### 4. POST-DEPLOY VERIFICATION

- [ ] Visit live URL in browser
- [ ] Test on actual mobile device (not just DevTools)
- [ ] Verify Firebase Analytics receives page view events
- [ ] Run Lighthouse on live URL
- [ ] Check that `/DATA/` and `/Global/` are NOT publicly accessible
- [ ] Verify cache headers with DevTools Network tab (check Response Headers)

## Related Workflows

- **Pre-Launch Checklist:** `/10-2-pre-launch-testing-checklist`
- **Security:** `/14-1-security-implementation`
- **Performance Audit:** `/7-1-performance-audit`
