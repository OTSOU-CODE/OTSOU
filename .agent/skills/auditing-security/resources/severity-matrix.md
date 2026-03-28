# Severity Matrix & CVSS Reference

Use this guide to classify findings consistently across all security audits.

## CVSS v3.1 Score Ranges → Severity Mapping

| CVSS Score | Severity | Agent Label | Response SLA |
| ---------- | -------- | ----------- | ------------ |
| 9.0 – 10.0 | Critical | 🔴 Critical | Fix immediately — block deployment |
| 7.0 – 8.9  | High     | 🟠 High     | Fix within current sprint           |
| 4.0 – 6.9  | Medium   | 🟡 Medium   | Fix within next 2 sprints           |
| 0.1 – 3.9  | Low      | 🟢 Low      | Fix opportunistically               |
| 0.0        | Info     | ℹ️ Info     | Document and review periodically    |

## CVSS v3.1 Vector Components (Quick Reference)

### Attack Vector (AV)
| Value | Meaning |
| ----- | ------- |
| N (Network) | Exploitable remotely with no physical access |
| A (Adjacent) | Exploitable only from the same network segment |
| L (Local) | Requires local system access |
| P (Physical) | Requires physical access to the device |

### Attack Complexity (AC)
| Value | Meaning |
| ----- | ------- |
| L (Low) | No special conditions required |
| H (High) | Specific conditions must exist |

### Privileges Required (PR)
| Value | Meaning |
| ----- | ------- |
| N (None) | No authentication needed |
| L (Low) | Standard user privileges |
| H (High) | Admin/root privileges required |

### User Interaction (UI)
| Value | Meaning |
| ----- | ------- |
| N (None) | No user interaction required |
| R (Required) | Victim must take an action |

### Scope (S)
| Value | Meaning |
| ----- | ------- |
| U (Unchanged) | Impact limited to vulnerable component |
| C (Changed) | Impact extends beyond vulnerable component |

### Impact Metrics (C/I/A)
| Value | Meaning |
| ----- | ------- |
| N (None) | No impact |
| L (Low) | Some degradation |
| H (High) | Total loss |

## Common Sherif-Auto Finding Classifications

| Vulnerability | Typical CVSS Vector | Score | Severity |
| ------------- | ------------------- | ----- | -------- |
| Open Firestore rules (world read/write) | AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H | 10.0 | 🔴 Critical |
| Hardcoded Firebase API key + open rules | AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H | 10.0 | 🔴 Critical |
| Reflected XSS via innerHTML | AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N | 6.1 | 🟡 Medium |
| Stored XSS via Firestore data | AV:N/AC:L/PR:L/UI:R/S:C/C:H/I:H/A:N | 8.7 | 🟠 High |
| Missing CSP header | AV:N/AC:H/PR:N/UI:R/S:C/C:L/I:L/A:N | 4.7 | 🟡 Medium |
| CDN script without SRI | AV:N/AC:H/PR:N/UI:R/S:C/C:L/I:L/A:N | 4.7 | 🟡 Medium |
| Missing X-Frame-Options | AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N | 6.1 | 🟡 Medium |
| Missing HSTS header | AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:N | 3.7 | 🟢 Low |
| Verbose architecture comments | AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N | 3.1 | 🟢 Low |
| Form input without server-side validation | AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N | 5.3 | 🟡 Medium |

## OWASP Top 10 (2021) Mapping

| OWASP Category | Relevant Sherif-Auto Risks |
| -------------- | -------------------------- |
| A01 — Broken Access Control | Open Firestore rules, missing auth on admin paths |
| A02 — Cryptographic Failures | Hardcoded credentials, HTTP instead of HTTPS |
| A03 — Injection | XSS via `innerHTML`, Firestore query injection |
| A04 — Insecure Design | No rate limiting on contact form, no CAPTCHA |
| A05 — Security Misconfiguration | Missing CSP, open Firebase Storage rules |
| A06 — Vulnerable Components | Outdated CDN library versions, missing SRI |
| A07 — Auth & Session Failures | No session timeout, missing MFA for admin |
| A08 — Software & Data Integrity | Missing SRI on CDN scripts |
| A09 — Logging & Monitoring Failures | No alerting on failed auth or suspicious Firestore queries |
| A10 — SSRF | Not applicable to static hosting context |

## CIS Benchmark Controls (Web Application Context)

| Control | Description | Sherif-Auto Relevance |
| ------- | ----------- | --------------------- |
| CIS-1 | Inventory of authorized software/CDNs | Pin CDN versions; use SRI |
| CIS-4 | Secure configuration | Firebase security rules; hosting headers |
| CIS-7 | Email/web browser protections | CSP; X-Frame-Options |
| CIS-13 | Network monitoring | Firebase alert policies |
| CIS-16 | Account monitoring | Firebase Auth audit logs |

## Recommended Tools

| Tool | Purpose | Usage |
| ---- | ------- | ----- |
| [Trivy](https://github.com/aquasecurity/trivy) | Dependency & config scanning | `trivy fs .` |
| [Nikto](https://github.com/sullo/nikto) | Web server vulnerability scan | `nikto -h https://your-domain.com` |
| [Retire.js](https://retirejs.github.io/) | Known vulnerable JS libraries | `retire --path .` |
| [Observatory by Mozilla](https://observatory.mozilla.org/) | HTTP header analysis | Enter domain in web UI |
| [CSP Evaluator](https://csp-evaluator.withgoogle.com/) | CSP policy analysis | Paste CSP string |
| [Snyk](https://snyk.io/) | Dependency CVE scanning | `snyk test` |
| Firebase Rules Simulator | Firestore rule testing | Firebase Console → Firestore → Rules |
