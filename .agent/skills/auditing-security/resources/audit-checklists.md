# Security Audit Checklists

Targeted, copy-paste-ready checklists for every audit type in the Sherif-Auto stack.

---

## Checklist 1 — HTML File Audit

Run this for every `.html` file before deployment.

### Secrets & Credential Leakage
- [ ] No hardcoded Firebase `apiKey`, `appId`, `measurementId`, or `projectId` without corresponding Firestore Security Rules
- [ ] No `<!-- TODO: add real password here -->` or similar credential hints in comments
- [ ] No internal IP addresses, admin panel URLs, or staging URLs in source

### Content Security Policy
- [ ] `<meta http-equiv="Content-Security-Policy" ...>` present in `<head>`
- [ ] CSP `default-src` is `'self'` (not `*`)
- [ ] CSP `script-src` explicitly lists only required CDN origins
- [ ] CSP `frame-ancestors` is `'none'` or specific trusted domains

### Script Integrity
- [ ] Every `<script src="...">` from a CDN has `integrity="sha384-..."` and `crossorigin="anonymous"`
- [ ] All CDN library versions are pinned (no `@latest` or unversioned URLs)

### XSS Prevention
- [ ] No `innerHTML` usage with unescaped user-controlled or Firestore-sourced data
- [ ] Form `action` attributes do not point to HTTP URLs
- [ ] `javascript:` protocol is absent from all `href` and `src` attributes

### Clickjacking
- [ ] `X-Frame-Options: DENY` is set via `firebase.json` hosting headers (not just meta tag)

### Sensitive Data Exposure
- [ ] Page does not render personally identifiable information (PII) without authorization check
- [ ] Error messages shown to users do not reveal stack traces or internal paths

---

## Checklist 2 — JavaScript Module Audit

Run this for every `.js` file in `JS/` and inline scripts.

### Injection Prevention
- [ ] `innerHTML` is never used with external or Firestore-sourced data without sanitization
- [ ] `eval()`, `Function()`, `setTimeout(string)`, `setInterval(string)` are absent
- [ ] Template literals that inject data into HTML use a `sanitize()` helper
- [ ] Firestore queries use parameterized paths — no dynamic collection names from user input

### Secrets & Configuration
- [ ] No credentials, tokens, or secrets stored in JS variables or `localStorage`
- [ ] `localStorage`/`sessionStorage` are not used to store authentication state or tokens
- [ ] Firebase config object uses only public-safe values (no service account keys)

### Authentication & Authorization
- [ ] Firebase Auth state is checked before rendering protected content
- [ ] Admin-only functions are gated by `currentUser.getIdTokenResult()` custom claims — not just client-side role variables
- [ ] No `isAdmin = true` flag set purely on the client

### Dependency Safety
- [ ] No `fetch()` calls to `http://` URLs (only HTTPS)
- [ ] `fetch()` responses are validated before being parsed or rendered
- [ ] CORS `mode` and `credentials` settings match the minimum required

### Code Quality Security
- [ ] `console.log()` statements are removed from production code (they may leak PII or internal state)
- [ ] Error catch blocks do not expose error objects directly to users

---

## Checklist 3 — Firebase & Firestore Configuration Audit

### Firestore Security Rules
- [ ] Default-deny rule exists: `allow read, write: if false;`
- [ ] Every collection explicitly defines allowed read/write conditions
- [ ] Write rules validate required fields and data types
- [ ] No collection has `allow write: if true;` (even temporarily)
- [ ] Contact form collection only allows `create` (not `read`, `update`, `delete`)
- [ ] Vehicles/catalogue collection allows `read` but denies all writes from unauthenticated users
- [ ] Rules have been tested in the Firebase Console Rules Simulator

### Firebase Storage Rules
- [ ] Storage default rule is `allow read, write: if false;`
- [ ] Public asset paths (images) allow `read` only, no `write`
- [ ] File upload paths require authentication

### Firebase Hosting Configuration (`firebase.json`)
- [ ] Security headers configured (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy)
- [ ] `Cache-Control` headers set appropriately for static assets vs. dynamic responses
- [ ] No sensitive files are included in the `public` deploy path

### Firebase Project Settings
- [ ] Authorized domains list contains only production domains (no `localhost` in production project)
- [ ] API key restrictions are configured in Google Cloud Console to limit to specific APIs and referrers
- [ ] Firebase Analytics is configured with IP anonymization enabled

---

## Checklist 4 — Dependency & CDN Audit

### CDN Library Versions
- [ ] GSAP version is current stable release
- [ ] Firebase SDK version is current stable release (check [firebase.google.com/support/release-notes](https://firebase.google.com/support/release-notes))
- [ ] No CDN library is loaded from an unversioned URL

### Known CVE Check
Run these commands against any downloaded dependency files:

```bash
# Retire.js — checks known-vulnerable JS libraries
retire --path . --outputformat json

# Trivy — filesystem scan for CVEs
trivy fs . --severity HIGH,CRITICAL
```

### SRI Hash Verification
```bash
# Generate SHA-384 hash for a CDN resource
curl -s "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" \
  | openssl dgst -sha384 -binary \
  | openssl base64 -A \
  | xargs -I{} echo "sha384-{}"
```

---

## Checklist 5 — HTTP Security Headers Audit

Verify headers on the live deployment:

```bash
curl -I https://your-domain.com
```

Required headers:

| Header | Expected Value |
| ------ | -------------- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | Explicit allowlist (no `unsafe-eval`) |

Use [Mozilla Observatory](https://observatory.mozilla.org/) for automated header scoring. Target score: **A or higher**.

---

## Checklist 6 — Pre-Launch Security Sign-Off

Complete before any production Firebase deployment:

- [ ] All 🔴 Critical and 🟠 High findings are resolved
- [ ] Firestore Security Rules deployed and simulator-tested
- [ ] Firebase Storage Rules deployed
- [ ] All CDN scripts carry SRI `integrity` attributes
- [ ] CSP `<meta>` tag present on all HTML pages
- [ ] Security headers configured in `firebase.json`
- [ ] No `console.log()` PII leakage in JS files
- [ ] No hardcoded secrets in any committed file
- [ ] Mozilla Observatory score ≥ A
- [ ] Trivy / Retire.js scan shows no Critical or High CVEs
- [ ] Firebase API key restricted to specific HTTP referrers and APIs in Google Cloud Console
