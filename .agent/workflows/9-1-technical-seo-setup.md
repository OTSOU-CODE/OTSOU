---
description: "SEO - Technical SEO Setup"
---

# Static Technical SEO Setup (Sherif-Auto)

START → Meta Tags → Canonical Links → JSON-LD Schema → Sitemap & Robots → Open Graph → Firebase Hosting → END

## Scope & Context

Without a framework-based router, Technical SEO setup involves manually injecting critical SEO tags directly into every `.html` file. Each page must be independently optimized.

## Prerequisites

- All HTML pages finalized and accessible
- Brand keywords identified (see `/6-1-content-strategy`)

## Steps

### 1. TITLE & META REVIEW

- [ ] Set unique `<title>` per page (< 60 chars):

  ```html
  <!-- Homepage -->
  <title>Sherif-Auto | Premium Auto Upholstery & Interior Craftsmanship</title>

  <!-- Category Page -->
  <title>Vehicle Categories | Sherif-Auto Premium Upholstery</title>

  <!-- Gallery -->
  <title>Our Work | Portfolio | Sherif-Auto</title>
  ```

- [ ] Set compelling `<meta name="description">` per page (< 160 chars):

  ```html
  <meta
    name="description"
    content="Transform your vehicle interior with Sherif-Auto's premium leather upholstery, dashboard restoration, and custom seat design. Request a free consultation."
  />
  ```

- [ ] Set viewport and charset:
  ```html
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ```

### 2. CANONICAL LINKS

- [ ] Set `<link rel="canonical">` on every page to prevent duplicate indexing:
  ```html
  <link rel="canonical" href="https://sherif-auto.com/category.html" />
  ```
- [ ] For pages with query params (like `?category=leather`), canonical should point to the base URL without query strings

### 3. JSON-LD STRUCTURED DATA

- [ ] Inject `LocalBusiness` schema in `Index.html`:

  ```html
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Sherif-Auto",
      "description": "Premium auto upholstery, custom leather seats, and dashboard restoration services",
      "url": "https://sherif-auto.com",
      "telephone": "+213-XXX-XXX-XXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "City",
        "addressCountry": "DZ"
      },
      "priceRange": "$$",
      "image": "https://sherif-auto.com/images/logo.webp",
      "sameAs": [],
      "openingHours": "Mo-Sa 08:00-18:00"
    }
  </script>
  ```

- [ ] Add `Product` schema for service pages (optional, enhances rich results)

### 4. OPEN GRAPH & SOCIAL META

- [ ] Add Open Graph tags for social sharing:

  ```html
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Sherif-Auto | Premium Auto Upholstery" />
  <meta
    property="og:description"
    content="Transform your vehicle interior..."
  />
  <meta
    property="og:image"
    content="https://sherif-auto.com/images/og-image.webp"
  />
  <meta property="og:url" content="https://sherif-auto.com/" />
  ```

- [ ] Add Twitter Card meta:
  ```html
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Sherif-Auto" />
  <meta name="twitter:description" content="Premium auto upholstery..." />
  <meta
    name="twitter:image"
    content="https://sherif-auto.com/images/og-image.webp"
  />
  ```

### 5. SITEMAP & ROBOTS

- [ ] Create `sitemap.xml` at root:

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://sherif-auto.com/</loc>
      <lastmod>2026-02-24</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://sherif-auto.com/category.html</loc>
      <priority>0.8</priority>
    </url>
    <url>
      <loc>https://sherif-auto.com/gallery.html</loc>
      <priority>0.8</priority>
    </url>
    <!-- Add all public pages -->
  </urlset>
  ```

- [ ] Create `robots.txt` at root:
  ```
  User-agent: *
  Allow: /
  Disallow: /DATA/
  Disallow: /Global/
  Sitemap: https://sherif-auto.com/sitemap.xml
  ```

### 6. FIREBASE HOSTING SEO CONFIG

- [ ] Enable clean URLs in `firebase.json`:
  ```json
  {
    "hosting": {
      "cleanUrls": true,
      "trailingSlash": false
    }
  }
  ```
- [ ] Set cache headers for images to reduce crawl budget waste
- [ ] Ensure HTTPS redirect is active (Firebase does this by default)

## Verification Checklist

- [ ] Every `.html` has unique `<title>` (< 60 chars)
- [ ] Every `.html` has unique `<meta name="description">` (< 160 chars)
- [ ] Every `.html` has `<link rel="canonical">`
- [ ] `Index.html` has JSON-LD LocalBusiness schema
- [ ] Open Graph tags set for social previews
- [ ] `sitemap.xml` maps all public pages
- [ ] `robots.txt` blocks `/DATA/` and `/Global/`
- [ ] Firebase `cleanUrls: true` configured
- [ ] Test with Google Rich Results Test tool

## Related Workflows

- **Content SEO:** `/9-2-content-seo-optimization` — Keyword integration, heading hierarchy
- **Content Strategy:** `/6-1-content-strategy` — Brand voice and copy guidelines
- **Pre-Launch Checklist:** `/10-2-pre-launch-testing-checklist` — SEO verification gate
