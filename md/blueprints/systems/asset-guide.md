# Blueprint: Asset Guide

## 1. High-Fidelity Image Processing

Referencing `docs.md`, Sherif-Auto relies on "Ultra-Realistic 8K" quality visual assets.

- **Aspect Ratios:** Standard grid visuals (like `Vehicle Cards`) strictly require a standardized `4:3` bounding box. Images are visually enforced using CSS `object-fit: cover`.
- **Formats:** Images should be served in modern `.webp` where possible, drastically reducing physical bit payloads without compressing visual fidelity.

## 2. Vector Graphics (SVG)

The core brand logo must ALWAYS be an inline `<svg>` injected directly into the DOM (as seen in `navbar.js` and `index.html`).

- **Why:** External referencing forces extra network requests, and `img` tag sourcing breaks CSS state manipulation. Inlining allows the paths and rect strokes (`#D4AF37`) to dynamically read CSS variable overrides if needed.
- **Iconography:** The site loads lightweight icon sets from standard CDNs (FontAwesome, Lucide), prioritizing simple `<i>` or `<svg>` declarations over heavy loaded image assets.

## 3. Directory Management

A strict classification schema keeps assets decoupled.

- `/images/CAR Models/`: Specifically for the dataset iterations loaded by `vehicles_data.js`.
- `/images/gallery/`: Reserved for high-value showcase images parsed by the portfolio interfaces.
- `/images/misc/`: Utility textures, background particles, or localized elements.
