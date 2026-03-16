---
description: Content - Asset Management
---

# Asset Management & Media Architecture (Sherif-Auto)

START → Verify 8K Source → Downsample to WebP → Semantic Naming → Organize Directories → Implement Lazy Loading → END

## Scope & Context

Given the vast number of high-quality car images required (across brands like Dacia, Bentley, Audi), strict asset management prevents repository bloat and ensures fast visual loading.

## Steps:

1. **SOURCE VERIFICATION:**
   - Ensure the raw generated source images adhere to the `docs.md` 8K studio photography standards. They must look physically real.

2. **OPTIMIZATION (CRUCIAL):**
   - DO NOT serve raw 8K uncompressed images directly to the DOM for listing pages.
   - Use WebP formatting for transparency + compression.
   - Maintain high-res assets for `image-preview.html` (e.g., max 1920px width at 85% quality).
   - Generate thumbnails (`_thumb.webp`) with max widths of 600px for use in grid layouts.

3. **SEMANTIC NAMING (Kebab-Case):**
   - Naming must reflect the vehicle and view.
   - Format: `[brand]-[model]-[view-angle]-[color].webp`
   - Example: `dacia-duster-3-4-front-navy.webp`

4. **DIRECTORY ORGANIZATION:**
   - Root: `/images/`
   - Subdirectories: Group by brand `/images/dacia/` or usage `/images/ui/`.
   - Never place images in the root folder unless they are critical icons (like `favicon.ico`).

5. **IMPLEMENTATION (Lazy Loading):**
   - Every `<img>` tag must include `loading="lazy"`.
   - Every `<img>` tag MUST include exact `alt` text mapping the explicit vehicle or service model.

6. **ACCESSIBILITY:**
   - Provide fallback `background-color: var(--color-dark-surface)` on image wrappers so layouts don't violently shift while the image loads over the network.
