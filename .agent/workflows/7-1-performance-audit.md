---
description: "Performance Optimization - Performance Audit"
---

# Performance Auditing Workflow (Sherif-Auto)

START → GSAP Animation Audit → Network Waterfall → Core Web Vitals → Main Thread Analysis → Cache/CDN Verification → END

## Scope & Context

Given the reliance on vanilla files and GSAP animations, performance auditing focuses on: heavy uncompressed images blocking LCP, main-thread-blocking animations causing jank, and missing cache headers slowing repeat visits.

## Prerequisites

- Chrome DevTools available
- All pages accessible via local dev server (Live Server or `python -m http.server`)

## Steps

### 1. GSAP ANIMATION AUDIT

- [ ] Enable the **FPS Meter** in Chrome DevTools (Rendering panel → Frame Rendering Stats)
- [ ] Scroll through all animated sections — target 60fps consistently
- [ ] Check for **Layout Thrashing**: Search codebase for GSAP animations targeting `width`, `height`, `top`, `left`, `margin`, `padding`
  ```bash
  # Search for forbidden property animations
  grep -rn "width\|height\|top:\|left:\|margin\|padding" JS/ --include="*.js" | grep -i "gsap\|tween\|timeline"
  ```
- [ ] Verify all animations use only `transform` (x, y, scale, rotation) and `opacity`
- [ ] Check for excessive `will-change` usage (causes memory bloat if overused)
- [ ] Test `prefers-reduced-motion` behavior: animations should degrade gracefully

### 2. NETWORK WATERFALL REVIEW

- [ ] Open DevTools Network tab, disable cache, reload page
- [ ] Check for **render-blocking scripts** in `<head>` — move to bottom of `<body>` or add `defer`
- [ ] Verify `vehicles_data.js` load time — if > 500ms, consider splitting by brand
- [ ] Check for **unused CSS** — each page should only load the CSS it needs
- [ ] Verify all `<script type="module">` imports resolve without 404s
- [ ] Confirm GSAP CDN loads quickly — consider adding `<link rel="preconnect" href="https://cdn.jsdelivr.net">`

### 3. MEASURE CORE WEB VITALS

- [ ] Run **Google Lighthouse** in Incognito Mode (Performance tab)
- [ ] Target scores:
      | Metric | Target | How to Fix |
      |--------|--------|-----------|
      | **LCP** (Largest Contentful Paint) | < 2.5s | Preload hero image, use WebP, add `fetchpriority="high"` |
      | **CLS** (Cumulative Layout Shift) | < 0.1 | Set explicit `width`/`height` on all images, define `aspect-ratio` |
      | **FID/INP** (Interaction delay) | < 200ms | Reduce main thread JS work, debounce handlers |
      | **Overall Performance** | > 90 | All of the above combined |

- [ ] Check **LCP Element** — is it the hero image? Ensure it's:
  - NOT lazy-loaded (above-the-fold images should load eagerly)
  - Preloaded: `<link rel="preload" as="image" href="hero.webp">`
  - In WebP format at appropriate resolution

- [ ] Check **CLS Sources** — Common Sherif-Auto culprits:
  - Images without explicit dimensions
  - GSAP animations that shift content (use `transform` only)
  - Late-loading CSS that changes layout
  - Dynamic content injection without reserved space

### 4. MINIMIZING MAIN THREAD WORK

- [ ] Check for heavy `querySelectorAll` loops attached to scroll events
  - GSAP ScrollTrigger should handle all scroll observation — don't add raw `scroll` listeners
- [ ] Verify event handlers are **debounced** for `resize` events
- [ ] Check for memory leaks:
  - Event listeners on dynamically removed DOM elements
  - GSAP timelines not killed on page transitions
- [ ] Ensure no `setInterval` loops running unnecessarily

### 5. IMAGE DELIVERY AUDIT

- [ ] Verify all gallery images are `.webp` format
- [ ] Thumbnails (grid cards) should be ≤ 600px width at 80% quality
- [ ] Full-resolution (image-preview) should be ≤ 1920px width at 85% quality
- [ ] All `<img>` tags have:
  - `loading="lazy"` (except hero/above-fold images)
  - Explicit `width` and `height` attributes
  - Descriptive `alt` text
- [ ] Hero images use `<link rel="preload" as="image">` in `<head>`

### 6. VERIFY CACHE/CDN

- [ ] Check Firebase Hosting `firebase.json` for cache headers:
  ```json
  {
    "hosting": {
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
        }
      ]
    }
  }
  ```
- [ ] Verify `cleanUrls: true` for SEO-friendly URLs
- [ ] Test with `?nocache` query param to confirm caching is working

## Final Verification

- [ ] Lighthouse Performance score > 90
- [ ] No layout shifts visible during scroll
- [ ] GSAP animations smooth at 60fps
- [ ] No 404 errors in Network tab
- [ ] No console errors related to missing assets

## Related Workflows

- **Image Optimization:** `/7-2-image-optimization` — WebP conversion, thumbnails
- **Code Optimization:** `/7-3-code-optimization` — File splitting, debouncing
- **Pre-Launch Checklist:** `/10-2-pre-launch-testing-checklist` — Final go-live checks
