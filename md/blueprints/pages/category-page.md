# Blueprint: Category Page (`category.html`)

## 1. Page Description

The Category Page operates as the platform's primary data browsing interface. It empowers users to comb through the extensive `vehicles_data.js` catalog, filtering by specific makes, models, and years to view associated upholstery configurations.

## 2. Structural Flow

1.  **Hero (`.hero-category`):** A simplified, thinner header block to establish context without consuming critical vertical viewport space.
2.  **Filter Structure (`#filterBar`):** A complex sticky navigation block containing layered dropdowns (`.filter-dropdown`) for Make, Model, Year, and Sorting preferences.
3.  **Query Meta (`.active-filters-container`):** Dynamically displays the current resulting data count and actionable subtext.
4.  **Data Grid (`#vehicleGrid`):** A flex/grid container where `category.js` dynamically injects the standardized `Vehicle Cards`.
5.  **Pagination (`#pagination`):** Bottom-anchored controls for navigating vast datasets chunks.

## 3. Key Interactions

- **Sticky Filter Mechanics:** The `.filter-sticky-bar` uses CSS `position: sticky` (with top offsets) to remain strictly accessible as users scroll down the heavy `.vehicles-grid`.
- **Client-Side Array Filtering:** All filtering (such as chaining Make > Model logic) happens instantly on the frontend using Vanilla JS array manipulation (`filter()`, `reduce()`) acting purely on the native `vehicles_data` object array.
- **Mobile Optimizations:** A Floating Action Button (`#mobileFilterFab`) allows mobile users to easily invoke the complex filter menu overlay without endlessly scrolling back to the top of the DOM.

## 4. Dependencies

- `JS/vehicles_data.js` (The massive static JSON/JS data source)
- `JS/category.js` (The specific modular logic orchestrating the complex filter cascades and grid DOM rendering)
- `CSS/vehicle-card.css` (Required for properly styling the nodes injected by `category.js`)
