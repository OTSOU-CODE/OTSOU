# Sherif-Auto: Auto Upholstery Excellence

Welcome to the **Sherif-Auto** web application! This project is a premium front-end interface for an automotive upholstery business. It features a modern, responsive design aimed at showcasing custom car and bike seat restorations, material configurations, and vehicle compatibility.

## 🗂️ Project Pages

The application is divided into several interconnected HTML pages, each serving a specific purpose:

- **`Index.html` (Home)**
  The main landing page. It includes a hero section with a dynamic particle background, a showcase of services (car/bike seat restoration), a "Why Choose Us" section with animated statistics, and a fully functional contact form with optional file uploads.

- **`category.html` (Vehicle Categories)**
  A comprehensive vehicle browsing page. Users can filter a vast database of vehicles to find specific upholstery packages. It features a sticky filter bar for Make, Model, and Year, sorting capabilities, and dynamic pagination.

- **`gallery.html` (Our Work)**
  A portfolio page that displays high-quality imagery of completed upholstery projects. It includes floating statistics and a responsive CSS grid layout to highlight craftsmanship.

- **`image-preview.html` (Product Details & Customization)**
  The product view page designed for a specific upholstery service or item. It includes an image gallery with thumbnails, a color variant selector, pricing configurations (e.g., Standard vs. Premium Leather), technical specifications accordions, and an "Add to Cart" sticky bottom bar.

- **Legal Pages**
  - **`privacy-policy.html`**: The privacy policy outlining data handling.
  - **`terms-of-service.html`**: The terms of service for the business.

## 🛠️ Core Functions & JavaScript Modules

The `JS/` directory contains modular JavaScript files that power the interactivity of the website.

### UI Components & Navigation
- **`navbar.js`**: Dynamically injects the "Tubelight" style navigation bar across different pages to keep the code DRY.
- **`staggered-menu.js`**: Powers the animated mobile menu utilizing GSAP for smooth staggering effects.
- **`footer.js`**: Injects the standard site footer consistently across all HTML pages.

### E-Commerce & Interactivity
- **`cart-drawer.js`**: Initializes and manages an off-canvas slide-out cart drawer, allowing users to review their selected items.
- **`wishlist-drawer.js`**: Similar to the cart drawer, this manages the user's saved wishlist items in an interactive side panel.
- **`image-preview.js`**: Handles the logic on the product details page (`image-preview.html`), including switching main images via thumbnails, updating color variants, adjusting quantities, and calculating configuration price add-ons.

### Data & Filtering
- **`vehicles_data.js`**: Contains a massive JSON object (`VEHICLES_DATA`) representing hundreds of car makes, models, and production years.
- **`category.js`**: Contains the logic for `category.html`. It reads the vehicle data, builds the interactive dropdown menus (Make, Model, Year), manages active filters, sorts the results (e.g., by price or year), and renders the vehicle cards using pagination.
- **`DataManager.js`**: Handles external data fetching or state management (e.g., interacting with `DATA/vehicles.csv` if used as a fallback).

### General Utilities
- **`script.js`**: The main utility script. It sets up Intersection Observers for scroll animations (`.animate-on-scroll`), configures the custom file upload UI in the contact form, manages simple visualizers, and handles the "Back to Top" button logic.
- **`gallery-page.js`**: Manages dynamic loading and interactions specific to the `gallery.html` page grid.
- **`config.js`**: Holds global configuration settings, such as image paths or fallback logic.

## 💻 Technology Stack
- **HTML5 & CSS3**: Utilizes custom CSS properties (variables), modern CSS Grid/Flexbox layouts, and specialized stylesheets for different components (e.g., `theme-transition.css`, `cart-drawer.css`).
- **JavaScript (ES6+)**: Heavily modularized codebase utilizing ES imports/exports.
- **GSAP**: Used for complex animations, particularly in the staggered mobile menu.
- **Firebase**: Initialized on pages for analytics and potential future backend integrations (Auth/Storage).
- **FontAwesome & Lucide**: For scalable vector icons.

