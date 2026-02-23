# Sherif-Auto Brand & Design Guidelines

## Visual Identity

The Sherif-Auto aesthetic is defined by **Luxury, Precision, and Craftsmanship**.

### Color Palette (CSS Variables)

- **Primary Dark Backgrounds:** `#1A1A1A`, `#2C2C2C` (Provides depth without harsh pure black).
- **Primary Text:** `#FFFFFF`, `#E0E0E0` (Off-white for readability over dark backgrounds).
- **Accents (Gold/Premium):** `#D4AF37` (Primary Gold), `#8B6914` (Darker Gold for borders/stitching).

### Typography

- **Headlines (`h1`, `h2`, `h3`):** `Montserrat` - Modern, structural, reflects automotive strength. Font weights: 500, 600, 700.
- **Accents & Body (`span`, `p`):** `Playfair Display` - Elegant, traditional, reflects upholstery craftsmanship.

### UI & Motion Patterns

- **Shapes:** Rounded corners should mirror actual car seat stitching (e.g., slight `2px` for aggressive sporty UI, `border-radius: 8px` for soft cards).
- **Depth (Glassmorphism):** Utilize `backdrop-filter: blur(10px)` with semi-transparent dark backgrounds `rgba(26, 26, 26, 0.8)` for floating elements (like Navbars and Menus).
- **Animations:** Strictly powered by `GSAP` or native CSS `transform/opacity` transitions (`0.3s ease`). Interactions should feel smooth, heavy (like a luxury car door closing), and perfectly eased (`power3.out`).

## Media Quality standards (8K Rule)

The gallery defines the brand.

- Automotive renders _must_ adhere to the strict 8K Studio Lighting Guidelines found in `/docs.md`.
- No images should appear flat, noisy, or distorted.
- All source images must be downsampled to highly optimized `.webp` before touching the `<img src>` tags to prevent UI stuttering.
