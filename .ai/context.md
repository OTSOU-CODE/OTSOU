# Sherif-Auto: AI Project Context

## Project Overview

**Sherif-Auto** is a premium digital platform for a high-end auto upholstery & interior craftsmanship business. The website showcases world-class leather work, dashboard restoration, and custom seat design through ultra-realistic 8K studio imagery, premium dark-theme aesthetics, and silky GSAP animations. The primary business goal is converting visitors into leads via contact forms and phone calls.

## Target Audience

- Owners of luxury, sport, and everyday vehicles (Porsche, BMW, Audi, Mercedes, Dacia, etc.) seeking flawless interior restorations
- Motorcycle owners looking for custom leather seats and weather protection
- Car dealerships and fleet managers needing bulk upholstery services
- Enthusiasts seeking bespoke automotive interior customization

## Architecture Summary

| Layer         | Technology        | Notes                                |
| ------------- | ----------------- | ------------------------------------ |
| **Structure** | Semantic HTML5    | One `.html` file per page route      |
| **Styling**   | Vanilla CSS3      | Modular files, CSS Custom Properties |
| **Logic**     | ES6+ JavaScript   | Native Modules, Scoped Closures      |
| **Animation** | GSAP (GreenSock)  | ScrollTrigger, Timelines, Stagger    |
| **Backend**   | Firebase          | Firestore, Analytics, Hosting        |
| **Images**    | 8K Studio Renders | Downsampled to optimized WebP        |

## Active Pages

| File                    | Purpose                                            |
| ----------------------- | -------------------------------------------------- |
| `Index.html`            | Homepage — Hero, Services, About, Contact sections |
| `category.html`         | Vehicle category browser with filter/sort grid     |
| `gallery.html`          | Portfolio showcase of completed work               |
| `image-preview.html`    | Full-resolution image viewer with thumbnails       |
| `privacy-policy.html`   | Legal — Privacy Policy                             |
| `terms-of-service.html` | Legal — Terms of Service                           |

## Directory Structure

```
Sherif-Bach/
├── .agent/               # AI agent skills & workflows
│   ├── skills/           # Reusable capability definitions
│   └── workflows/        # Step-by-step operational procedures
├── .ai/                  # AI context files (this directory)
├── CSS/                  # Modular CSS files (navbar, footer, gallery, etc.)
├── JS/                   # Modular JS modules (ES6)
├── DATA/                 # Vehicle data JSON/JS files (vehicles_data.js)
├── Global/               # AI Agent instruction files
├── images/               # All visual assets (organized by brand)
│   └── CAR Models/       # 8K rendered car model images by brand
├── docs.md               # 8K image generation guidelines
├── firebase.json         # Firebase Hosting configuration
└── *.html                # Page routes (flat structure)
```

## Core Directives for AI Agents

1. **Preserve Visual Fidelity** — The brand relies on stunning visuals. Image quality, GSAP animations, and aspect ratios must never be degraded
2. **Uphold Vanilla Architecture** — No React, Vue, Tailwind, Bootstrap, or heavy frameworks. All code is raw CSS + ES6 Modules
3. **Impeccable Code Quality** — Clean indentation, semantic HTML, zero bloated DOM nodes, proper JSDoc documentation
4. **Mobile-First Responsive** — All layouts start mobile, scale to desktop via `min-width` media queries
5. **Performance is Premium** — Animate only `transform` and `opacity`. Lazy-load images. Keep bundles lean

## Cross-Reference Map

Before any task, AI agents should consult:

| Need                            | File                                     |
| ------------------------------- | ---------------------------------------- |
| Color/Typography/Visual rules   | `.ai/brand-guidelines.md`                |
| Architecture & tech constraints | `.ai/technical-specs.md`                 |
| Known bugs & limitations        | `.ai/known-issues.md`                    |
| Current priorities              | `.ai/current-tasks.md`                   |
| Operational procedures          | `.ai/workflows.md` → `.agent/workflows/` |
| 8K image generation rules       | `docs.md`                                |
