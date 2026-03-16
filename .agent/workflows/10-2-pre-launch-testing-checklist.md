---
description: "Testing - Pre-Launch Testing Checklist"
---

# Go-Live Sanity Checklist (Sherif-Auto)

START → Asset Validation → Navigation Audit → Layout Stress → Mobile Audit → Form QA → Security → Deploy → END

_Run through every item before `firebase deploy --only hosting`._

## FUNCTIONALITY

- [ ] Staggered Menu opens and closes flawlessly on mobile (test iPhone SE & Galaxy)
- [ ] Staggered Menu focus-traps correctly (Tab stays inside, Escape closes)
- [ ] Tubelight Navigation actively tracks scroll location on desktop
- [ ] Tubelight Navigation hides on scroll-down, reveals on scroll-up
- [ ] All anchor links (`#section-id`) scroll smoothly to targets
- [ ] All page links navigate to correct HTML files
- [ ] Gallery grid renders all items from `vehicles_data.js` without empty cells
- [ ] Image preview modal/page shows full-resolution images correctly
- [ ] Filter/sort controls work and update grid with GSAP transitions
- [ ] Contact form validates all fields before submission
- [ ] Contact form submits successfully to Firestore

## PERFORMANCE & CSS

- [ ] No `404` errors in Developer Console (images, fonts, CSS, JS)
- [ ] No layout shifting post-load — all images have explicit `width`/`height`
- [ ] GSAP ScrollTriggers accurately fire as sections enter viewport
- [ ] Safari `backdrop-filter` renders correctly (with `-webkit-` prefix)
- [ ] Firefox layout matches Chrome (Grid, Flexbox, custom properties)
- [ ] No horizontal overflow on mobile (check `overflow-x`)
- [ ] Fonts load without FOUT (Flash of Unstyled Text)
- [ ] Lighthouse Performance score > 90

## RESPONSIVE LAYOUT

- [ ] **320px** (iPhone SE) — Single column, readable text, no overflow
- [ ] **375px** (iPhone 14) — Standard mobile layout correct
- [ ] **768px** (iPad Portrait) — Tablet layout transitions properly
- [ ] **1024px** (iPad Landscape) — Desktop features begin to appear
- [ ] **1440px** (Desktop) — Full desktop experience, all columns visible
- [ ] **Landscape Mobile** — Content doesn't break or overlap

## CONTENT & SEO

- [ ] Title tags explicitly set per `.html` file (< 60 chars, includes "Sherif-Auto")
- [ ] Meta descriptions set per page (< 160 chars, include service keywords)
- [ ] `<link rel="canonical">` set on every page
- [ ] No placeholder text (Lorem ipsum) exists in any HTML file
- [ ] All images have descriptive `alt` text: "[Brand] [Model] [Detail]"
- [ ] Single `<h1>` per page with proper heading hierarchy
- [ ] JSON-LD structured data injected (LocalBusiness schema)
- [ ] `sitemap.xml` exists and maps all public pages
- [ ] `robots.txt` disallows `/DATA/` directory

## ACCESSIBILITY

- [ ] Full keyboard navigation (Tab through all interactive elements)
- [ ] Focus rings visible on all focusable elements (gold outline)
- [ ] ARIA attributes set on custom components (`aria-expanded`, `aria-hidden`)
- [ ] Color contrast passes WCAG AA (4.5:1 for text on dark backgrounds)
- [ ] `prefers-reduced-motion` disables heavy animations
- [ ] Screen reader announces navigation, buttons, and form labels correctly

## SECURITY & DATA

- [ ] Contact form blocks empty submissions (HTML `required` + JS validation)
- [ ] Form payloads connect to Firestore with `try...catch` error handling
- [ ] Firestore Security Rules deployed and tested
- [ ] Firebase config does NOT expose any secret keys (only public SDK config)
- [ ] CDN scripts have SRI (`integrity`) hashes where possible
- [ ] `firebase.json` includes security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Strict-Transport-Security: max-age=31536000`

## FINAL DEPLOYMENT

- [ ] Run `firebase deploy --only hosting` successfully
- [ ] Verify live URL loads correctly
- [ ] Test live site on actual mobile device (not just DevTools)
- [ ] Verify Firebase Analytics receives events
- [ ] Run final Lighthouse audit on live URL
- [ ] Confirm favicon and social meta images load correctly

## Related Workflows

- **Comprehensive Testing:** `/10-1-comprehensive-testing` — Full QA deep dive
- **Performance Audit:** `/7-1-performance-audit` — Lighthouse and CWV optimization
- **Security:** `/14-1-security-implementation` — Firebase rules and headers
- **SEO:** `/9-1-technical-seo-setup` — Meta tags, JSON-LD, sitemap
