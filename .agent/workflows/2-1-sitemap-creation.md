---
description: Information Architecture - Sitemap Creation
---

# Sitemap Creation Workflow (Sherif-Auto)

START → List All Pages → Organize Hierarchy → Define Relationships → Validate → END

## Scope & Context

Sherif-Auto is a premium auto upholstery platform. The sitemap must be extremely lean, focusing on conversion (getting a price quote) and showcasing craftsmanship (gallery/portfolio).

## Steps:

1. **List all required core pages:**
   - Homepage (`Index.html`)
   - Services Categories (`category.html`)
   - Portfolio/Our Work (`gallery.html`, `image-preview.html`)
   - Legal/Structural (`privacy-policy.html`, `terms-of-service.html`)

2. **Organize into a flat, accessible hierarchy:**
   - Keep navigation entirely flat where possible; users should never be more than 1 click away from the Gallery or Contact section.
   - Primary navigation (Tubelight/Staggered Menu): Home, About, Services, Category, Our Work, Contact.
   - Utility pages isolated to Footer.

3. **Map interaction points (Vanilla JS routing):**
   - Note which "pages" are actually sections on the single-page scroll (`#services`, `#contact`, `#why-choose-us`) vs. independent HTML files (`gallery.html`).

4. **Create visual sitemap diagram:**
   - Map out how the GSAP Staggered Menu items flow into specific `index.html` anchors vs. separate HTML documents.

5. **Validate with Stakeholders:**
   - Ensure the path to "Get Price" is unobstructed from every terminal node.

6. **Export `sitemap.xml`:**
   - Output clean, absolute URLs for Google High-Value Indexing.
