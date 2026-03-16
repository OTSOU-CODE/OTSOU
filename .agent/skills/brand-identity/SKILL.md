---
name: brand-identity
description: "Provides the single source of truth for brand guidelines, design tokens, technology choices, and voice/tone. Use this skill whenever generating UI components, styling applications, writing copy, or creating user-facing assets to ensure brand consistency."
---

# Brand Identity & Guidelines

**Brand Name:** Sherif-Auto
**Tagline:** Premium Auto Upholstery & Interior Craftsmanship
**Vibe:** Luxury, Precision, Dark Elegance, Gold Accents

This skill defines the core constraints for visual design, technical implementation, and brand voice. Adhere to these guidelines strictly to maintain consistency across all AI-generated output.

## Quick Reference (Most Common Needs)

| Need               | Value                         |
| ------------------ | ----------------------------- |
| Primary Background | `#1A1A1A`                     |
| Card Background    | `#2C2C2C`                     |
| Primary Gold       | `#D4AF37`                     |
| Headline Font      | `Montserrat` (600, 700)       |
| Body Font          | `Montserrat` (300, 400)       |
| Accent Font        | `Playfair Display` (400, 700) |
| Card Radius        | `8px`                         |
| Button Radius      | `20px–50px`                   |
| Transition Speed   | `0.3s ease`                   |
| GSAP Easing        | `power3.out`                  |
| Animation Props    | `transform` + `opacity` ONLY  |

## Detailed Resource Files

### For Visual Design & UI Styling

Exact colors, fonts, border radii, spacing values, shadows, and glassmorphism specs:
👉 **[`resources/design-tokens.json`](resources/design-tokens.json)**

### For Coding & Component Implementation

Technical constraints, allowed libraries, file naming, module patterns:
👉 **[`resources/tech-stack.md`](resources/tech-stack.md)**

### For Copywriting & Content Generation

Brand voice, tone guidelines, forbidden phrases, keyword priorities:
👉 **[`resources/voice-tone.md`](resources/voice-tone.md)**

## Forbidden in Brand Context

- ❌ Light/white backgrounds (except text color)
- ❌ Neon or saturated accent colors (blue, red, green as primary)
- ❌ Generic sans-serif fonts (Arial, Helvetica as primary)
- ❌ Flat, textureless dark panels (add depth with shadows/gradients)
- ❌ Cheap language ("Affordable", "Cheap prices", "Huge discounts")
- ❌ Stock photography (use 8K rendered images exclusively)

## Always Include

- ✅ Dark theme with gold accents
- ✅ Glassmorphism on floating elements
- ✅ GSAP animations with premium easing
- ✅ Mobile-first responsive layouts
- ✅ Luxury language ("Unmatched craftsmanship", "Request consultation")
- ✅ High-quality WebP imagery

## Cross-References

- **Full Brand Guidelines:** `.ai/brand-guidelines.md`
- **Technical Specs:** `.ai/technical-specs.md`
- **Design System Workflow:** `.agent/workflows/3-1-design-system-creation.md`
