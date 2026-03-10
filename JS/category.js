import dataManager from "./DataManager.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const grid = document.getElementById("vehicleGrid");
  const paginationEl = document.getElementById("pagination");
  const resultsCountEl = document.getElementById("resultsCount");

  // Filter Inputs
  const brandGrid = document.getElementById("brandGrid");
  const modelGrid = document.getElementById("modelGrid");
  const typeOptions = document.getElementById("typeOptions");

  // New Toggles
  const btnPersonal = document.getElementById("btnPersonal");
  const btnBusiness = document.getElementById("btnBusiness");
  const resetFiltersLink = document.getElementById("resetFiltersLink");

  // --- State ---
  let allVehicles = [];
  let filteredVehicles = [];
  let activeFilters = {
    make: new Set(),
    model: new Set(),
    year: new Set(),
    // type: new Set(), // Removed
    // minPrice: 0, // Removed
    // maxPrice: 10000, // Removed
    // fuel: new Set(), // Removed
    // gearbox: new Set(), // Removed
    // leasingType: "Personal", // Removed
  };
  let renderIndex = 0;
  const batchSize = 12;
  let currentView = "grid";

  // --- Initialization ---
  async function init() {
    setupEventListeners();
    await loadVehicles();
    injectBrands();
    injectYears();
    // setupParallaxHero(); // Simplified for now
    setupStickyFilterBar();
  }

  // --- Data Loading ---
  async function loadVehicles() {
    grid.innerHTML = getSkeletonHTML(4);
    try {
      // Use DataManager to fetch vehicles
      const vehicles = await dataManager.init();

      // Transform/Map if necessary, ensuring compatibility with category.js expectations
      // DataManager should already return objects with { id, brand, model, year, image, price, type }

      allVehicles = vehicles.map((v) => ({
        ...v,
        priceMonthly:
          v.price === "Inquire for Price"
            ? 0
            : parseFloat(v.price.replace(/[^0-9.]/g, "")) || 0,
        engineSize: "2.0", // Default
        fuel: "Petrol", // Default
        transmission: "Automatic", // Default
        seats: 5, // Default
        doors: 4, // Default
        realImagePath: v.image,
        images: [],
        // Ensure ID is unique if not already
      }));

      // Shuffle
      allVehicles.sort(() => Math.random() - 0.5);

      applyFilters();
    } catch (e) {
      console.error("Failed to load data", e);
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--error); margin-bottom: 1rem;"></i>
            <h3>Unable to load vehicles</h3>
            <p>Please try refreshing the page.</p>
            <p style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">Error: ${e.message}</p>
        </div>`;
    }
  }

  // --- Rendering ---
  // --- Rendering ---
  let currentPage = 1;

  function renderBatch(reset = false) {
    if (reset) {
      currentPage = 1;
    }

    const totalPages = Math.ceil(filteredVehicles.length / batchSize);
    const start = (currentPage - 1) * batchSize;
    const end = start + batchSize;

    const currentVehicles = filteredVehicles.slice(start, end);

    const updateGrid = () => {
      if (currentVehicles.length === 0 && reset) {
        grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                <h3>No results found</h3>
                <p>Try adjusting your filters.</p>
                </div>
            `;
        if (paginationEl) paginationEl.style.display = "none";
      } else {
        // Render Grid
        grid.innerHTML = currentVehicles.map(createGridCard).join("");

        // Render Pagination
        renderPagination(totalPages);

        // GSAP Enter Animation
        if (typeof gsap !== "undefined") {
          gsap.fromTo(
            grid.querySelectorAll(".vehicle-card"),
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all",
            },
          );
        }
      }
    };

    // Fade out old cards before replacing
    const oldCards = grid.querySelectorAll(".vehicle-card");
    if (oldCards.length > 0 && typeof gsap !== "undefined") {
      gsap.to(oldCards, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: updateGrid,
      });
    } else {
      updateGrid();
    }
  }

  function renderPagination(totalPages) {
    if (!paginationEl) return;

    if (totalPages <= 1) {
      paginationEl.style.display = "none";
      return;
    }

    paginationEl.style.display = "flex";
    let html = "";

    // Prev Button
    html += `<button class="page-btn ${currentPage === 1 ? "disabled" : ""}" onclick="window.changePage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;

    // Page Numbers
    // Simple logic: Show all if <= 7, else show complex range?
    // For now, let's keep it simple or show valid range around current.
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="window.changePage(${i})">${i}</button>`;
      } else if (
        (i === currentPage - 2 && i > 1) ||
        (i === currentPage + 2 && i < totalPages)
      ) {
        html += `<span class="page-dots">...</span>`;
      }
    }

    // Next Button
    html += `<button class="page-btn ${currentPage === totalPages ? "disabled" : ""}" onclick="window.changePage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;

    paginationEl.innerHTML = html;
  }

  window.changePage = (page) => {
    const totalPages = Math.ceil(filteredVehicles.length / batchSize);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderBatch();

    // Scroll to top of grid
    const gridTop =
      document.getElementById("filterBar").getBoundingClientRect().top +
      window.scrollY -
      100;
    window.scrollTo({ top: gridTop, behavior: "smooth" });
  };

  function createGridCard(v) {
    // Robust Fallback Image
    const fallbackUrl = `https://placehold.co/600x450/2c2c2c/D4AF37?text=${encodeURIComponent(v.brand + "\\n" + v.model)}`;
    let imgUrl = v.realImagePath || fallbackUrl;

    // Ensure placeholder is used if imgUrl is somehow empty or strictly "images/placeholder.jpg" which effectively doesn't exist
    if (imgUrl === "images/placeholder.jpg" || !imgUrl) {
      imgUrl = fallbackUrl;
    }

    // Determine typography classes based on length if needed, or just standard

    // Escape standard values for HTML
    const idSafeUrl = escapeHTML(encodeURIComponent(v.id).replace(/'/g, "%27"));
    const brandSafe = escapeHTML(v.brand);
    const modelSafe = escapeHTML(v.model);
    const yearSafe = escapeHTML(v.year);
    const typeSafe = escapeHTML(v.type || "Sedan");
    const seatsSafe = escapeHTML(v.seats || 5);
    const priceSafe = escapeHTML(v.price === "Inquire for Price" ? "Contact Us" : v.price);
    const imgUrlSafe = escapeHTML(imgUrl); // Encode potentially unsafe image URL path for src attribute
    const fallbackUrlSafe = escapeHTML(fallbackUrl);

    return `
        <div class="vehicle-card" onclick="window.location.href='image-preview.html?id=${idSafeUrl}'" style="cursor: pointer;">
            <div class="vehicle-image-container">
                <img src="${imgUrlSafe}" alt="${brandSafe} ${modelSafe}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackUrlSafe}';">
            </div>
            <div class="vehicle-info">
                <div class="vehicle-brand">${brandSafe}</div>
                <div class="vehicle-model">${modelSafe}</div>
                <div class="vehicle-type">${yearSafe} • ${typeSafe}</div>
                
                <div class="vehicle-specs">
                    <div class="spec-row">
                        <i class="fas fa-chair"></i> ${seatsSafe} seats
                    </div>
                </div>
            </div>
                
                <div class="vehicle-divider"></div>
                
                <div class="vehicle-price">
                    New from <span class="price-amount">${priceSafe}</span>
                </div>
        </div>
    `;
  }

  function getSkeletonHTML(count) {
    return Array(count)
      .fill(0)
      .map(
        () => `
      <div class="vehicle-card skeleton-card">
        <div class="vehicle-image-container skeleton-image"></div>
        <div class="vehicle-info">
          <div class="skeleton-text" style="width: 30%; height: 12px; margin-bottom: 8px;"></div>
          <div class="skeleton-text" style="width: 70%; height: 24px; margin-bottom: 8px;"></div>
          <div class="skeleton-text" style="width: 40%; height: 16px; margin-bottom: 16px;"></div>
          
          <div class="vehicle-specs">
            <div class="skeleton-text" style="width: 50%; height: 14px;"></div>
          </div>
          
          <div class="vehicle-divider"></div>
          
          <div class="skeleton-text" style="width: 40%; height: 14px;"></div>
        </div>
      </div>
    `,
      )
      .join("");
  }

  function applyFilters() {
    filteredVehicles = allVehicles.filter((v) => {
      // Brand filter
      if (activeFilters.make.size > 0 && !activeFilters.make.has(v.brand))
        return false;
      // Model filter
      if (activeFilters.model.size > 0 && !activeFilters.model.has(v.model))
        return false;
      // Year filter
      if (activeFilters.year.size > 0) {
        // Normalize year checks
        // v.year might be "2015 – 2020" or "2018".
        // If filter is specific year, check inclusion.
        // Simplification: check if string contains the year
        let match = false;
        for (let yr of activeFilters.year) {
          if (v.year.includes(yr)) match = true;
        }
        if (!match) return false;
      }
      return true;
    });

    // Prioritize vehicles with actual images if only the make is selected
    if (activeFilters.make.size > 0 && activeFilters.model.size === 0 && activeFilters.year.size === 0) {
      filteredVehicles.sort((a, b) => {
        const aHasImg = a.realImagePath && !a.realImagePath.includes("placeholder.jpg");
        const bHasImg = b.realImagePath && !b.realImagePath.includes("placeholder.jpg");
        if (aHasImg && !bHasImg) return -1;
        if (!aHasImg && bHasImg) return 1;
        return 0; // maintain relative order
      });
    }

    resultsCountEl.textContent = `${filteredVehicles.length} Vehicles Found`;
    renderBatch(true);
  }

  function setupEventListeners() {
    if (resetFiltersLink) {
      resetFiltersLink.addEventListener("click", (e) => {
        e.preventDefault();
        activeFilters.make.clear();
        activeFilters.model.clear();
        activeFilters.year.clear();

        // Uncheck all inputs
        document
          .querySelectorAll("input[type='checkbox']")
          .forEach((cb) => (cb.checked = false));

        // Re-inject to reset states
        injectModels();
        applyFilters();
      });
    }

    setupDropdowns();
    setupMobileFilters();
    setupSort();
  }

  function setupMobileFilters() {
    const filterBar = document.getElementById("filterBar");
    if (!filterBar) return;

    const toggleBtn = document.getElementById("mobileFilterToggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const group = filterBar.querySelector(".bar-filters-group");
      if (group) {
        group.classList.toggle("show-mobile");
        toggleBtn.innerHTML = group.classList.contains("show-mobile")
          ? '<i class="fas fa-times"></i> Close Filters'
          : '<i class="fas fa-filter"></i> Show Filters';
      }
    });
  }

  function setupSort() {
    const sortDropdown = document.querySelector(".sort-dropdown");
    const currentSortLabel = document.getElementById("currentSort");

    if (!sortDropdown || !currentSortLabel) return;

    const sortMenu = sortDropdown.querySelector(".filter-menu");
    if (!sortMenu) return; // Expecting static HTML now

    // Handle sort selection
    sortMenu.querySelectorAll('input[type="radio"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const sortType = e.target.value;
        const label = e.target.closest("label").textContent.trim();
        currentSortLabel.textContent = label;
        sortVehicles(sortType);
        sortDropdown.classList.remove("is-open"); // Close on select
      });
    });
  }

  function sortVehicles(sortType) {
    if (sortType === "price_asc") {
      filteredVehicles.sort((a, b) => a.priceMonthly - b.priceMonthly);
    } else if (sortType === "price_desc") {
      filteredVehicles.sort((a, b) => b.priceMonthly - a.priceMonthly);
    } else if (sortType === "year_asc") {
      filteredVehicles.sort((a, b) => parseInt(a.year) - parseInt(b.year));
    } else if (sortType === "year_desc") {
      filteredVehicles.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    } else {
      // Relevance (Random or Original ID?) - let's shuffle or reset
      filteredVehicles.sort((a, b) => a.id - b.id);
    }
    renderBatch(true);
  }

  function setupDropdowns() {
    const dropdowns = document.querySelectorAll(".filter-dropdown");

    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".filter-trigger");
      const menu = dropdown.querySelector(".filter-menu");

      if (trigger && menu) {
        // Disable CSS internal transition for GSAP ownership
        menu.style.transition = "none";

        trigger.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = dropdown.classList.contains("is-open");

          // Close others
          dropdowns.forEach((d) => {
            if (d !== dropdown && d.classList.contains("is-open")) {
              const otherMenu = d.querySelector(".filter-menu");
              if (typeof gsap !== "undefined" && otherMenu) {
                gsap.to(otherMenu, {
                  autoAlpha: 0,
                  y: -10,
                  duration: 0.2,
                  ease: "power2.in",
                  onComplete: () => {
                    d.classList.remove("is-open");
                    gsap.set(otherMenu, { clearProps: "all" });
                  },
                });
              } else {
                d.classList.remove("is-open");
              }
            }
          });

          if (!isOpen) {
            dropdown.classList.add("is-open");
            if (typeof gsap !== "undefined") {
              gsap.fromTo(
                menu,
                { autoAlpha: 0, y: -10 },
                { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
              );
            }
          } else {
            if (typeof gsap !== "undefined") {
              gsap.to(menu, {
                autoAlpha: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                  dropdown.classList.remove("is-open");
                  gsap.set(menu, { clearProps: "all" });
                },
              });
            } else {
              dropdown.classList.remove("is-open");
            }
          }
        });
      }
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
      dropdowns.forEach((d) => {
        if (d.classList.contains("is-open")) {
          const menu = d.querySelector(".filter-menu");
          if (typeof gsap !== "undefined" && menu) {
            gsap.to(menu, {
              autoAlpha: 0,
              y: -10,
              duration: 0.2,
              ease: "power2.in",
              onComplete: () => {
                d.classList.remove("is-open");
                gsap.set(menu, { clearProps: "all" });
              },
            });
          } else {
            d.classList.remove("is-open");
          }
        }
      });
    });

    // Prevent closing when clicking inside menu
    document.querySelectorAll(".filter-menu").forEach((menu) => {
      menu.addEventListener("click", (e) => e.stopPropagation());
    });
  }

  function injectBrands() {
    // Only inject if empty (user might have static HTML)
    if (brandGrid.children.length > 5) return;

    const brands = [...new Set(allVehicles.map((v) => v.brand))].sort();
    brandGrid.innerHTML = brands
      .map((brand) => {
        const count = allVehicles.filter((v) => v.brand === brand).length;
        const brandSafe = escapeHTML(brand);
        const brandJSSafe = escapeHTML(escapeJS(brand));
        return `
        <label class="brand-option">
            <input type="checkbox" value="${brandSafe}" onchange="toggleFilter('make', '${brandJSSafe}')">
            ${brandSafe}
            <span style="opacity: 0.5; font-size: 0.85em; margin-left: 4px;">(${count})</span>
        </label>`;
      })
      .join("");
  }

  function injectModels() {
    let availableModels = [];

    if (activeFilters.make.size === 0) {
      // If no make selected, show message or all models?
      // Showing all models might be too much, usually "Select a Make" is better
      modelGrid.innerHTML =
        '<div class="empty-filter-state" style="padding: 1rem; color: var(--text-secondary);">Please select a Make first</div>';
      return;
    } else {
      // Filter vehicles by selected brands first
      const vehiclesByBrand = allVehicles.filter((v) =>
        activeFilters.make.has(v.brand),
      );
      availableModels = [
        ...new Set(vehiclesByBrand.map((v) => v.model)),
      ].sort();
    }

    modelGrid.innerHTML = availableModels
      .map(
        (m) => {
          const mSafe = escapeHTML(m);
          const mJSSafe = escapeHTML(escapeJS(m));
          return `
          <label class="list-option">
              <input type="checkbox" value="${mSafe}" onchange="toggleFilter('model', '${mJSSafe}')"
              ${activeFilters.model.has(m) ? "checked" : ""}>
              ${mSafe}
          </label>
      `;
        }
      )
      .join("");
  }

  function injectYears() {
    // Extract all unique years strings from data
    // Some years are ranges "2010 - 2020", some are single "2024"
    // We can simplisticly offer them as string options
    const rawYears = [...new Set(allVehicles.map((v) => v.year))]
      .sort()
      .reverse();

    // OR better: extract 4-digit years from strings and offer those?
    // User likely wants "2020" to match "2019-2021".
    // Let's stick to simple string matching for now to avoid complex logic issues,
    // or just list top distinct values.
    const yearOptionsEl = document.getElementById("yearOptions");
    if (yearOptionsEl) {
      yearOptionsEl.innerHTML = rawYears
        .slice(0, 20)
        .map(
          (y) => {
            const ySafe = escapeHTML(y);
            const yJSSafe = escapeHTML(escapeJS(y));
            return `
            <label class="list-option">
                <input type="checkbox" value="${ySafe}" onchange="toggleFilter('year', '${yJSSafe}')"
                ${activeFilters.year.has(y) ? "checked" : ""}>
                ${ySafe}
            </label>
         `;
          }
        )
        .join("");
    }
  }

  function setupStickyFilterBar() {
    // Intentionally empty as sticky behavior was disabled via CSS
  }

  // Globals for inline event handlers (toggleFilter)
  window.toggleFilter = (type, value) => {
    if (activeFilters[type].has(value)) {
      activeFilters[type].delete(value);
    } else {
      activeFilters[type].add(value);
    }

    // If we changed Brand, we must update Models and clear invalid model selections
    if (type === "make") {
      // Remove models that are no longer valid?
      // For simplicity, just reset model filters if they don't belong to selected brands?
      // Or keep them but they won't match anything.
      // Let's re-inject models to show valid options.
      injectModels();
    }

    applyFilters();
  };

  function getBrandLogo(brand) {
    // Use CONFIG.images.brands
    if (window.CONFIG && window.CONFIG.images && window.CONFIG.images.brands) {
      return (
        window.CONFIG.images.brands[brand] ||
        window.CONFIG.images.brands["Volkswagen"]
      ); // Fallback
    }
    return "images/brands/Sans-titre-1.webp"; // Hard Fallback
  }
  // --- Security ---
  function escapeHTML(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag],
    );
  }

  function escapeJS(str) {
    if (str === null || str === undefined) return "";
    return String(str).replace(
      /[\\'"]/g,
      (tag) =>
        ({
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
        })[tag],
    );
  }

  init();
});
