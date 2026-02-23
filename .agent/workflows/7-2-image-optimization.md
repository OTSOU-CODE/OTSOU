---
description: Performance Optimization - Image Optimization
---

# Image Delivery Optimization (Sherif-Auto)

START → Detect Uncompressed JPEGs → Scale/Convert to WebP → Implment srcset → Optimize Hero → END

## Scope & Context

Sherif-Auto showcases premium 8K renders. Without proper image delivery, the luxury experience is ruined by a slow, clunky site.

## Steps:

1. **FORMAT AUDIT:**
   - Identify any `.jpg` or `.png` assets in the codebase or data lists.
   - All rendered vehicles from the `DATA` lists should point to `.webp` assets.

2. **RESIZING FOR CONTEXT:**
   - A thumbnail grid card (max 400px wide) should never load the 1920px image. Use pre-generated thumbnails (e.g., `modelX-thm.webp`).
   - The primary `image-preview.html` handles the high-res rendering.

3. **MODERN HTML PICTURE ELEMENTS:**
   - For Hero banners, consider utilizing the `<picture>` element to swap portrait cuts for mobile and landscape cuts for desktop explicitly via media queries.

4. **NATIVE LAZY LOADING:**
   - Every single `<img>` tag rendered below the initial viewport must have `loading="lazy"`.
   - GSAP explicitly avoids animating images before they are decoded. Ensure images have a defined intrinsic `width` and `height` in HTML to prevent GSAP ScrollTriggers from miscalculating layout heights mid-scroll.

5. **ACCESSIBILITY COMPLIANCE:**
   - Validate every single image has accurate `alt="[Brand] [Model] [Angle/Detail]"`. Missing `alt` tags severely damage SEO indexing of the premium renders.
