---
description: SEO - Technical SEO Setup
---

# Static Technical SEO Setup (Sherif-Auto)

START → Meta Tags HTML Verification → Canonical Linking → Schema Injection → Firebase Hosting Check → END

## Scope & Context

Since we operate without a framework-based router, Technical SEO setup involves manually injecting critical SEO tags directly into every single `.html` file head.

## Steps:

1. **TITLE & META REVIEW:**
   - `<title>`: "Sherif-Auto | [Page Specific Focus] | Premium Upholstery" (Keep under 60 chars).
   - `<meta name="description">`: Pitch the exact luxury car service offered on that page to increase click-throughs (150 chars).

2. **CANONICAL LINKS:**
   - Set `<link rel="canonical" href="https://sherif-auto.com/page.html"/>` on pages to avoid duplicate indexing if URL query params (like `?category=leather`) exist.

3. **SCHEMA MARKUP INJECTION (JSON-LD):**
   - Place a `<script type="application/ld+json">` block defining standard `LocalBusiness` setup directly in `Index.html` or `footer.js`.
   - Incorporate `Product` schema arrays mapped logically out of `vehicles_data.js` via a generation script.

4. **SITEMAP & ROBOTS GENERATION:**
   - For static sites, explicitly draft `sitemap.xml` mapping base HTML files and explicit sub-gallery parameter links.
   - `robots.txt`: Disallow `/DATA/` raw files if they expose non-indexable configurations.

5. **FIREBASE HOSTING SETUP:**
   - Configure `firebase.json` headers to return explicit `Cache-Control` flags for images heavily reducing crawl budget waste on 8K WebPs.
   - Ensure clean URLs (`"cleanUrls": true`) so `.html` extensions are naturally hidden.
