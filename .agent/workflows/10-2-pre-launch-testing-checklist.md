---
description: Testing - Pre-Launch Testing Checklist
---

# Go-Live Sanity Checklist (Sherif-Auto)

START → Asset Validation → Navigation Audit → Layout Stress Testing → Mobile Audit → Form QA → END

## FUNCTIONALITY:

- [ ] Staggered Menu opens and closes flawlessly on mobile.
- [ ] Tubelight Navigation actively tracks scroll location.
- [ ] Theme switching correctly transitions all hardcoded variables globally.
- [ ] Links navigate exactly to designated HTML files or internal `#` IDs.

## PERFORMANCE & CSS:

- [ ] No `404` errors in Developer Console (missing photos, fonts, CSS imports).
- [ ] No layout shifting post-load. All image aspect-ratios are forced in CSS.
- [ ] GSAP ScrollTriggers accurately initiate animations as sections enter the viewport globally.
- [ ] Safari backdrop-filters execute properly.

## CONTENT & SEO:

- [ ] Title tags and Meta descriptions explicitly set per `.html` file.
- [ ] No placeholder text exists locally in HTML.
- [ ] Data arrays (`vehicles_data.js`) contain only final, rendered 8K outputs.

## SECURITY & DATA:

- [ ] Contact forms block empty submissions natively (`required`).
- [ ] Contact form payload connects smoothly to Firebase/Email logic.
- [ ] Firebase Config maps exclusively to Web Client, utilizing Security Rules backend-side.

## FINAL:

- [ ] Verify `Firebase Deploy` configuration maps to the current structure correctly.
- [ ] Perform a full Lighthouse test against `localhost`.
