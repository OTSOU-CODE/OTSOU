# Blueprint: Page Structure & Routing

This blueprint dictates the structure, purpose, and key functional components of every major interface within the Sherif-Bach gallery.

## 1. Landing Experience (`Index.html`)

- **Core Purpose**: The point of entry. It must immediately communicate luxury, scale, and high visual quality.
- **Essential Components**:
  - **Dynamic Hero Section**: A full-viewport high-impact visual featuring the most stunning 8K render, often with a smooth parallax or subtle scale animation.
  - **Brand Showcase Grid**: A visually distinct, highly interactive grid displaying supported automotive brands.
  - **Global Search**: An omnipresent search functionality allowing users to jump straight to models.
  - **Footer**: Standardized legal (Terms of Service, Privacy Policy) and navigation links.

## 2. The Core Gallery (`gallery.html` & `category.html`)

- **Core Purpose**: The primary browsing interface designed to handle hundreds of high-resolution image entries effortlessly.
- **Essential Components**:
  - **The Filter Toolbelt**: A sticky or easily accessible bar offering comprehensive sorting (A-Z, Year) and filtering (Brand, Body Type). Essential functionality includes a full "Reset" action.
  - **Mobile Constraints**: The filter bar must collapse elegantly on smaller viewports, accessible via a dedicated toggle button.
  - **Responsive Vehicle Grid**: The main content area using CSS Grid. Thumbnails must maintain aspect ratios, feature native lazy loading, and include micro-interactions on hover (scale up, shadow diffusion).
  - **Pagination Interface**: Clean, navigable logic to handle large volumes of data without overwhelming the browser.

## 3. High-Definition Detail View (`image-preview.html`)

- **Core Purpose**: To showcase the 8K AI-generated studio photography in all its detailed glory without UI distraction.
- **Essential Components**:
  - **Immersive Viewport**: The image takes center stage with minimal chrome.
  - **Deep Zoom Capability**: Integration of zooming functions (magnifier lens effect or click-to-fill) to inspect realistic details like badging and tire tread.
  - **Interactive Thumbnail Track**: A horizontal or vertical list of alternate angles (front, rear, 3/4).
  - **Active State Indicators**: Implementing the designated "Neon/Sporty" glow effect specifically on the actively selected thumbnail (primarily targeted at PC interaction).

## 4. Secure Authentication (`login.html`)

- **Core Purpose**: A gated entry point retaining the site's premium feel.
- **Essential Components**:
  - **"Split Cockpit" Layout**: A dual-panel design commonly featuring a stunning, rotating carousel of imagery on one half, and the secure login form (using glassmorphism) on the other.
  - **Form Validation**: Immediate, visually clear client-side validation indicating success or error states.
