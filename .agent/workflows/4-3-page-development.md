---
description: Frontend Development - Page Development
---

# Page Development Workflow (Sherif-Auto)

START → Root Scaffold → Header/Footer Injection → DOM Content Setup → Responsive Validation → END

## Scope & Context

Each page is a physical `.html` file. We rely on clean architectural imports to keep code DRY without a framework.

## Steps:

1. **Scaffold Root HTML:**
   - Build `kebab-case.html`. Use semantic tags (`<html>`, `<head>`, `<body>`).
   - Import core fonts, `style.css`, and global configurations from Firebase.
   - Define SEO Meta tags (Description, Title).

2. **Establish the Header & Footer Injection:**
   - Import the `navbar.js` and `footer.js` modules using `<script type="module">`.
   - Call their initialization functions passing `document.body` or the `<nav>` root element. Ensure GSAP scripts load before component scripts.

3. **Layout the Internal `<main>` Grid:**
   - Use Vanilla CSS Grid/Flexbox for the primary content.
   - Ensure the content area respects the Fixed/Absolute Navbar height by applying padding-top or utilizing a spacer (`margin-top: 100px`).

4. **Add GSAP Hooks:**
   - Apply standard `.animate-on-scroll` triggers to `section` wrappers.

5. **Load Heavy Assets Asynchronously:**
   - Use `loading="lazy"` on all images inherently.
   - Script tags requiring DOM availability should be marked `defer`.

6. **Validate Constraints:**
   - Ensure mobile screens don't overflow horizontally (`overflow-x: hidden`).
   - Test dark theme integrity across the full viewport height.
