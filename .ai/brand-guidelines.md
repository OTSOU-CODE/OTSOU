# Sherif-Auto: Brand & Design Guidelines

## Visual Identity

The Sherif-Auto aesthetic is defined by **Luxury, Precision, and Craftsmanship** — every pixel must feel as deliberate as hand-stitched leather.

## Color Palette (CSS Variables)

### Primary Surfaces

| Token                  | Value                   | Usage                                     |
| ---------------------- | ----------------------- | ----------------------------------------- |
| `--color-bg-primary`   | `#1A1A1A`               | Main page backgrounds                     |
| `--color-bg-secondary` | `#2C2C2C`               | Cards, elevated surfaces                  |
| `--color-bg-elevated`  | `#121212`               | Deepest backgrounds, overlays             |
| `--color-bg-glass`     | `rgba(26, 26, 26, 0.8)` | Glassmorphic panels (+ `backdrop-filter`) |

### Accent Colors (Gold / Premium)

| Token                       | Value                     | Usage                                |
| --------------------------- | ------------------------- | ------------------------------------ |
| `--color-accent-gold`       | `#D4AF37`                 | Primary CTAs, active states, borders |
| `--color-accent-gold-dark`  | `#8B6914`                 | Stitching details, subtle borders    |
| `--color-accent-gold-light` | `#FFF3E0`                 | Hover glows, highlights              |
| `--color-accent-gold-glow`  | `rgba(212, 175, 55, 0.3)` | Box-shadow glows on hover            |

### Text Colors

| Token                    | Value     | Usage                         |
| ------------------------ | --------- | ----------------------------- |
| `--color-text-primary`   | `#FFFFFF` | Headlines, high-emphasis text |
| `--color-text-secondary` | `#E0E0E0` | Body text, descriptions       |
| `--color-text-muted`     | `#9E9E9E` | Captions, placeholder text    |

### State Colors

| Token             | Value     | Usage                   |
| ----------------- | --------- | ----------------------- |
| `--color-success` | `#4CAF50` | Form success states     |
| `--color-error`   | `#F44336` | Form errors, validation |
| `--color-warning` | `#FF9800` | Warnings, cautions      |

## Typography

| Role                                   | Font Family        | Weights        | Usage                                   |
| -------------------------------------- | ------------------ | -------------- | --------------------------------------- |
| **Headlines** (`h1`–`h3`)              | `Montserrat`       | 500, 600, 700  | Structural, modern, automotive strength |
| **Elegance** (`accents`, `blockquote`) | `Playfair Display` | 400, 400i, 700 | Luxury accents, craftsmanship feel      |
| **Body** (`p`, `label`, `span`)        | `Montserrat`       | 300, 400       | Clean readability                       |

### Fluid Type Scale

```css
--font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--font-size-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--font-size-lg: clamp(1.25rem, 1.1rem + 0.7vw, 1.5rem);
--font-size-xl: clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem);
--font-size-2xl: clamp(2.5rem, 2rem + 2.5vw, 4rem);
--font-size-hero: clamp(3rem, 2.5rem + 3vw, 5rem);
```

## UI & Motion Patterns

### Shapes & Radii

- **Aggressive/Sporty:** `border-radius: 2px` — For data-dense cards, tags
- **Standard Cards:** `border-radius: 8px` — For content cards, containers
- **Pill Buttons:** `border-radius: 20px–50px` — For CTAs and pill-shaped buttons
- **Circular:** `border-radius: 50%` — For icons, avatars

### Depth & Glassmorphism

```css
/* Floating panels (Navbar, Menus, Modals) */
backdrop-filter: blur(10px);
background: rgba(26, 26, 26, 0.8);
border: 1px solid rgba(212, 175, 55, 0.15);

/* Card elevation */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

/* Hover glow (Gold) */
box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25);
```

### Animation Standards

| Property      | Rule                                                                 |
| ------------- | -------------------------------------------------------------------- |
| **Engine**    | GSAP or CSS `transform`/`opacity` transitions only                   |
| **Duration**  | Micro-interactions: `0.3s`. Reveals: `0.6s–1s`. Hero: `1–1.5s`       |
| **Easing**    | `power3.out` (premium), `expo.out` (dramatic), `ease` (CSS fallback) |
| **Stagger**   | `0.08s–0.15s` between sequential elements                            |
| **Forbidden** | Never animate `width`, `height`, `top`, `left`, `margin`, `padding`  |

### Hover Standards

- **Buttons:** `transform: translateY(-2px)` + gold `box-shadow` glow
- **Cards:** `transform: translateY(-4px)` + enhanced shadow
- **Links:** Gold color transition + `translateX(3px)` for arrow indicators
- **Inputs:** Gold `border-color` transition on `:focus`

## Media Quality Standards (8K Rule)

The gallery defines the brand.

- Automotive renders **must** adhere to the 8K Studio Lighting Guidelines in `/docs.md`
- No images should appear flat, noisy, or distorted
- All source images must be downsampled to optimized `.webp` before use
- Thumbnails: 600px max-width. Preview: 1920px max-width at 85% quality
- File naming: `[brand]-[model]-[view]-[color].webp` (kebab-case)
