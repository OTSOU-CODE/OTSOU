# Blueprint: Homepage (`index.html`)

## 1. Page Description

The Homepage functions as the primary landing funnel for Sherif-Auto. It is designed to establish the brand's luxury aesthetic immediately via a dynamic hero section and strictly direct users toward specific services (Contact/Pricing) and the portfolio gallery.

## 2. Structural Flow

1.  **Nav/Header:** Injected dynamically via `navbar.js`.
2.  **Hero (`#home`):** Features a particle-enhanced background (`.hero-background`), interactive gradient sweeps, and a unique floating seat showcase interface (`.seat-showcase`).
3.  **Why Choose Us (`#why-choose-us`):** Statistics grid with DOM-animated counting numbers (`.stat-number`) and trust indicators.
4.  **Services (`#services`):** Highlight cards for Car Seat and Bike Seat restoration, prioritizing direct CTA buttons to the contact funnel.
5.  **Contact (`#contact`):** Comprehensive lead generation form requiring Name, Email, Project Details, and offering Image Uploads. Paired with immediate contact methods (WhatsApp, Phone) and interactive map triggers.
6.  **Footer:** Injected dynamically via `footer.js`.

## 3. Key Interactions

- **Intersection Animations:** Extensive use of the `.animate-on-scroll` class, observed by the global `IntersectionObserver` in `script.js` to trigger CSS fade-in-up transforms.
- **WhatsApp Integration:** A dedicated `.whatsapp-card` deeply links to the business's WhatsApp API to maximize mobile conversion rates.
- **Fluid Form:** The `#contact-form` relies on native HTML5 validation combined with custom styling to feel premium without requiring heavy react-hook-form equivalents.

## 4. Dependencies

- `JS/script.js` (Core animations, observers, and interactions)
- Lucide Icons & FontAwesome (via CDN)
- GSAP (via CDN for StaggeredMenu initialization at the absolute bottom of the DOM)
