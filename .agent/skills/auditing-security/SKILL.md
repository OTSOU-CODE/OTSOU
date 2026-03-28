---
name: auditing-security
description: "CyberCore — elite cybersecurity skill for file/code auditing, dependency CVE scanning, authentication review, and access-control assessment. Use when asked to audit security, scan for vulnerabilities, review secrets, check hardcoded credentials, assess Firestore rules, evaluate CSP headers, or perform any penetration-testing analysis on Sherif-Auto files or configurations."
---

# CyberCore — Security Audit Skill

Adopt the mindset of a senior penetration tester, network engineer, and security architect simultaneously. Be direct, technical, and solution-oriented. Never water down findings.

## When to Use

- User asks for a "security audit", "vulnerability scan", or "pen-test review"
- Reviewing files for hardcoded secrets, API keys, or credentials
- Assessing Firestore security rules and Firebase configurations
- Evaluating HTML/JS for XSS, IDOR, or injection vectors
- Checking dependency files for known CVEs
- Reviewing HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
- Assessing authentication flows, session handling, or access control
- Auditing configuration files (`.env`, `firebase.json`, `nginx.conf`, etc.)

## Workflow

- [ ] **SCAN** — Identify every security issue present in the target
- [ ] **CLASSIFY** — Assign severity (Critical / High / Medium / Low / Info)
- [ ] **EXPLAIN** — Describe the vulnerability and why it is dangerous
- [ ] **EXPLOIT PATH** — Describe how an attacker could abuse it
- [ ] **FIX** — Provide a concrete, copy-paste-ready solution
- [ ] **VERIFY** — Tell the user how to confirm the fix worked
- [ ] **SUMMARIZE** — Produce the structured report defined below

## Core Logic

### Audit Targets for Sherif-Auto

| Target Category         | Key Files / Locations                              |
| ----------------------- | -------------------------------------------------- |
| **HTML / Templates**    | `Index.html`, `gallery.html`, `category.html`, `*.html` |
| **JavaScript Modules**  | `JS/*.js`, inline `<script>` blocks               |
| **CSS**                 | `CSS/*.css` — check for data-URI abuse            |
| **Firebase Config**     | Any `firebaseConfig` object in JS files            |
| **Data Files**          | `DATA/*.js`, `DATA/*.json`                         |
| **Dependencies**        | Any CDN `<script src>` tags; no `package.json` exists |
| **Configuration**       | `firebase.json`, `.firebaserc`, `.env` files       |
| **Agent / AI Context**  | `.ai/*.md`, `.agent/**` — watch for secret leakage |

### Severity Classifications

See `resources/severity-matrix.md` for full CVSS mapping.

| Severity | Label | Examples |
| -------- | ----- | -------- |
| 🔴 Critical | Immediate exploitation possible | Hardcoded API keys with write access, open Firestore rules, RCE |
| 🟠 High | Significant impact, exploitable | XSS, IDOR, exposed Firebase project ID with guessable paths |
| 🟡 Medium | Moderate impact, requires conditions | Missing CSP, insecure CDN integrity hashes, missing `X-Frame-Options`, overly broad CORS |
| 🟢 Low | Minor impact or defense-in-depth | Missing HSTS header, suboptimal cookie flags, verbose comments |
| ℹ️ Info | Best-practice gap, no direct impact | Missing `meta` description, verbose error messages in comments |

### Common Sherif-Auto Vulnerability Patterns

#### 1. Hardcoded Firebase Credentials (🔴 Critical)

Firebase `apiKey`, `projectId`, `messagingSenderId`, and `appId` are commonly inlined in `Index.html` or JS files. While the `apiKey` is technically a public identifier, an exposed `appId` combined with permissive Firestore rules creates a full data exfiltration vector.

**Attack path:** Attacker reads DOM → extracts `firebaseConfig` → queries Firestore collections directly via REST API.

**Fix pattern:**
```javascript
// BAD — exposed in source
const firebaseConfig = {
  apiKey: "AIzaSy...",
  projectId: "sherif-auto-prod"
};

// GOOD — restrict access via Firestore Security Rules, not by hiding the key
// firebaseConfig stays public but Firestore rules enforce authentication
```

**Mitigation — Firestore Security Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public reads on vehicles (catalogue is public)
    match /vehicles/{docId} {
      allow read: if true;
      allow write: if false; // No unauthenticated writes
    }
    // Contact form: write-only, no reads
    match /contact_requests/{docId} {
      allow create: if request.resource.data.keys().hasAll(['name','email','message'])
                    && request.resource.data.name is string
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read, update, delete: if false;
    }
    // Default deny everything
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 2. Cross-Site Scripting — innerHTML Injection (🟠 High)

Vanilla JS that renders vehicle data using `innerHTML` with unsanitized values is an XSS vector.

**Attack path:** Malicious `vehicle.name` containing `<script>alert(1)</script>` from a poisoned data source executes in the victim's browser.

**Fix pattern:**
```javascript
// BAD
card.innerHTML = `<h3>${vehicle.name}</h3>`;

// GOOD — use textContent or sanitize before innerHTML
const heading = document.createElement('h3');
heading.textContent = vehicle.name; // Automatically escapes HTML
card.appendChild(heading);

// Or for complex templates, sanitize first:
const sanitize = (str) => str
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#x27;');
```

#### 3. Missing Content Security Policy (🟡 Medium)

Without a CSP header, injected scripts execute freely in any browser context.

**Fix — add to all HTML `<head>` sections:**
```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self';
           script-src 'self' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.gstatic.com https://www.googleapis.com 'nonce-{RANDOM}';
           style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
           font-src 'self' https://fonts.gstatic.com;
           img-src 'self' data: https:;
           connect-src 'self' https://*.firebaseio.com https://firestore.googleapis.com;
           frame-ancestors 'none';">
```

#### 4. CDN Resources Without Subresource Integrity (🟡 Medium)

Scripts loaded from CDNs without `integrity` attributes are vulnerable to supply-chain attacks.

**Fix pattern:**
```html
<!-- BAD -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

<!-- GOOD -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
        integrity="sha384-[HASH]"
        crossorigin="anonymous"></script>
```

**Verification:** Generate hash with:
```bash
curl -s https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```

#### 5. Missing Security Headers (🟢 Low)

**Fix — `firebase.json` hosting headers:**
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
          { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
        ]
      }
    ]
  }
}
```

#### 6. Verbose Comments Exposing Architecture (ℹ️ Info)

Comments in HTML/JS that reveal internal paths, collection names, or implementation details aid attacker reconnaissance.

**Fix:** Strip implementation comments from production builds. Keep `// TODO` items only in development branches.

### Audit Report Output Format

Produce a structured report for every audit:

```
### 🔒 SECURITY AUDIT REPORT
**Target:** [file/system/config name]
**Date:** [today]
**Overall Risk Level:** [Critical / High / Medium / Low / Clean]

---
#### FINDING #N — [Short Title]
- **Severity:** [emoji + label]
- **Location:** [file:line or section]
- **Issue:** [what is wrong]
- **Attack Scenario:** [how an attacker exploits it]
- **Fix:**
  [code block with exact fix]
- **Verification:** [how to confirm the fix worked]

---
### ✅ SUMMARY TABLE
| # | Finding | Severity | Status |
|---|---------|----------|--------|
| 1 | ...     | 🔴 Critical | ⚠️ Unpatched |

### 🛠️ RECOMMENDED NEXT STEPS
[Prioritized list: Critical → High → Medium → Low → Info]
```

## Verification

After completing an audit and fixes are applied, verify:

- [ ] No hardcoded credentials remain: `grep -r "apiKey\|secret\|password\|token" --include="*.js" --include="*.html" .`
- [ ] Firestore rules are deployed: `firebase deploy --only firestore:rules`
- [ ] CSP meta tag is present in all HTML files
- [ ] CDN `<script>` tags carry `integrity` attributes
- [ ] Security headers present: run `curl -I https://[your-domain]` and check response headers
- [ ] No XSS via `innerHTML`: search for `innerHTML` usage and confirm all inputs are sanitized
- [ ] Firebase console → Firestore → Rules → Simulator confirms rules block unauthorized access

## Reference Materials

- 👉 **[`resources/severity-matrix.md`](resources/severity-matrix.md)** — Full CVSS scoring guide and severity definitions
- 👉 **[`resources/audit-checklists.md`](resources/audit-checklists.md)** — Targeted checklists for HTML, JS, Firebase, and config file audits
- 👉 **[`.ai/technical-specs.md`](../../../.ai/technical-specs.md)** — Project architecture constraints
- 👉 **[`.ai/context.md`](../../../.ai/context.md)** — Deployment environment and data flow
