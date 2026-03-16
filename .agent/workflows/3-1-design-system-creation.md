---
description: Design - Design System Creation
---

# Design System Creation & Maintenance (Sherif-Auto)

START → Review Existing CSS Variables → Audit Brand Colors → Component Audit → END

## Scope & Context

Sherif-Auto is a luxury brand. The design system is strictly maintained via Native CSS Variables in `style.css` (or `theme-transition.css`). No design tokens JSON or Tailwind Configs are used.

## Steps:

1. **Establish Core Brand Principles:**
   - Luxury, Craftsmanship, Elegance, Depth.
   - Never use flat or generic UI elements.

2. **Maintain Visual Identity (CSS Variables):**
   - **Colors:**
     - Backgrounds: Dark (`#1a1a1a`, `#121212`, `#2c2c2c`).
     - Accents: Gold/Premium (`#D4AF37`, `#8B6914`, `#FFF3E0`).
     - Text: Pure white or slightly off-white (`#e0e0e0`) to reduce eye strain.
   - **Typography Scale:**
     - Headings: `Montserrat` (Bold, structural).
     - Body/Accents: `Playfair Display` (Elegant, italicized highlights).
   - **Spacing & Radii:**
     - Use `rem` for fluid spacing. Border radii are either sharp (2px) for aggressive sporty components or slightly pill-shaped (20px) for buttons.
   - **Shadows & Glassmorphism:**
     - Standardize deep, soft shadows (`0 10px 30px rgba(0,0,0,0.5)`) and `backdrop-filter: blur(10px)` for floating elements.

3. **Component Standardization:**
   - Buttons: Must have a hover state with a slight negative translate Y (`transform: translateY(-2px)`) and a glowing box shadow.
   - Inputs: Dark background, 1px solid border (faded), turning gold `#D4AF37` on `:focus`.

4. **Implementation:**
   - Add all new tokens to the `:root` pseudo-class in `style.css`.
