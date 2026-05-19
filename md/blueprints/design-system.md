# Blueprint: Design System

## 1. Module Description

This blueprint documents the core visual language of Sherif-Auto. It is driven by mobile-first CSS variables primarily located in `style.css`. It establishes the typography, spacing, styling principles, and the luxury aesthetic parameters that guide all UI components.

## 2. File Map

- **Core Styles:** `CSS/style.css` (Contains CSS variables and global resets)
- **Theme Module:** `CSS/theme-transition.css` (Handles light/dark mode transitions)

## 3. Styling Specs & CSS Variables

### Color Palette (Hex)

The platform uses a dark/luxury theme approach based on Gold/Champagne accents against a dark/light contrast.

- **Primary (Gold):** `--primary: #d4af37;`, `--primary-dark: #b8941f;`
- **Secondary (Charcoal):** `--secondary: #2c2c2c;`
- **Accent:** `--accent: #8b6914;`
- **Background (Light Mode):** `--background: #ffffff;`, `--surface: #f8f9fa;`
- **Text (Light Mode):** `--text-primary: #2c2c2c;`, `--text-secondary: #666666;`
- **Champagne:** `--color-champagne: #f4e4bc;`

#### Dark Theme (`[data-theme="dark"]`)

- **Background:** `--background: #1a1a1a;` (Deep Obsidian)
- **Surface:** `--surface: #2c2c2c;`
- **Text:** `--text-primary: #ffffff;`

### Typography

- **Headings:** `--font-secondary: "Playfair Display", serif;` (Luxury, elegant)
- **Body:** `--font-primary: "Montserrat", sans-serif;` (Clean, modern)

### Spacing & Layout

- Spacing variables: `--spacing-xs: 0.5rem;` to `--spacing-xxl: 4rem;`
- Border radius: `--radius-md: 1.5rem;` is the standard for cards and soft-edged elements.

## 4. Interactions and Animations

- **Scroll Reveal:** Classes like `.animate-on-scroll` apply a hardware-accelerated translateY fade-in based on GSAP or Intersection Observer triggers.
- **Smooth Theme Transitions:** The app leverages modern `::view-transition` or global 300ms transitions on structural elements to gracefully shift between themes without harsh flashes.

## 5. Maintenance Guide

- **Adding Colors:** Add them to the `:root` pseudo-class in `style.css`. Always provide a corresponding dark-mode override in `[data-theme="dark"]` if the color applies to structural elements.
- **Transitions:** Ensure the `prefers-reduced-motion: reduce` block is respected for accessibility. Never animate layout-busting properties (`width`, `height`, etc.) globally.
