---
description: Performance Optimization - Performance Audit
---

# Performance Auditing Workflow (Sherif-Auto)

START → Review GSAP Timelines → Network Waterfall Check → CSS/JS Triggers → Measure Vitals → END

## Scope & Context

Given the reliance on Vanilla files and GSAP animations, performance auditing isn't fighting a massive virtual DOM (like React), but instead fighting heavy uncompressed images and main-thread blocking animations.

## Steps:

1. **GSAP ANIMATION AUDIT:**
   - Are animations rendering smoothly at 60fps? Enable the 'FPS meter' in Chrome DevTools.
   - Look for "Layout Thrashing" (animating `top`, `left`, `width`, `height`). Ensure GSAP is exclusively animating `transform` and `opacity`.

2. **NETWORK WATERFALL REVIEW:**
   - Are there render-blocking scripts in `<head>`? Move them to bottom of `<body>` or use `defer`.
   - Ensure the massive `vehicles_data.js` object is loaded effectively or split if it causes a long parsing time.

3. **MEASURE CORE WEB VITALS:**
   - Use Google Lighthouse (Incognito Mode). Target: Performance > 90.
   - **LCP (Largest Contentful Paint):** Is the Hero Image/Video delayed? Ensure it's not lazy-loaded and preloaded in the `<head>`.
   - **CLS (Cumulative Layout Shift):** Do image wrappers have defined aspect ratios or minimum heights? Fix shifts caused by late-loading images.

4. **MINIMIZING MAIN THREAD WORK:**
   - Instead of massive `querySelectorAll` loops attached to the scroll event natively, ensure `ScrollTrigger.js` handles scroll observation efficiently.

5. **VERIFY CACHE/CDN:**
   - Ensure Firebase Hosting or the web host is applying aggressive caching (`Cache-Control: public, max-age=...`) to `/images/` and static CSS.
