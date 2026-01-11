document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const grid = document.getElementById("vehicleGrid");
  const paginationEl = document.getElementById("pagination");
  const resultsCountEl = document.getElementById("resultsCount");
  const activeTagsEl = document.getElementById("activeTags");

  // Filter Inputs
  const searchInput = document.getElementById("globalSearch");
  const brandGrid = document.getElementById("brandGrid");
  const typeOptions = document.getElementById("typeOptions");
  const yearMinInput = document.getElementById("filterYearMin");
  const minYearLabel = document.getElementById("minYearLabel");
  const maxYearLabel = document.getElementById("maxYearLabel"); // Not used in simple slider but kept for ref

  // View Toggles
  const viewBtns = document.querySelectorAll(".view-btn");

  // Mobile
  const mobileFab = document.getElementById("mobileFilterFab");
  const filterBar = document.getElementById("filterBar");

  // --- State ---
  let allVehicles = [];
  let filteredVehicles = [];
  let activeFilters = {
    search: "",
    brands: new Set(),
    types: new Set(),
    minYear: 2010,
  };
  let renderIndex = 0;
  const batchSize = 12; // Lower batch size for bigger cards
  let currentView = "grid"; // 'grid' or 'list'

  // --- Initialization ---
  async function init() {
    setupEventListeners();
    await loadVehicles();
    injectBrands();
    setupParallaxHero();
    setupStickyFilterBar();
  }

  // --- Data Loading ---
  async function loadVehicles() {
    grid.innerHTML = getSkeletonHTML(4);
    try {
      // Logic from original file to parse CSV
      const url = CONFIG?.paths?.vehiclesCsv || "../DATA/vehicles.csv";
      const res = await fetch(url);
      const text = await res.text();
      const rows = parseCSV(text);
      allVehicles = rows
        .map(normalizeVehicle)
        .filter((v) => v.brand && v.model);

      // Apply initial filters
      applyFilters();
    } catch (e) {
      console.error("Failed to load data", e);
      grid.innerHTML = `<div class="empty-state">Failed to load vehicle data.</div>`;
    }
  }

  // --- Rendering ---
  function renderBatch(reset = false) {
    if (reset) {
      grid.innerHTML = "";
      renderIndex = 0;
    }

    const nextBatch = filteredVehicles.slice(
      renderIndex,
      renderIndex + batchSize
    );

    if (nextBatch.length === 0 && reset) {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 4rem;">
          <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
          <h3>No vehicles found</h3>
          <p>Try adjusting your search or filters.</p>
          <button id="resetFiltersBtn" class="card-action-btn" style="max-width: 200px; margin: 1rem auto; opacity: 1; transform: none;">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("resetFiltersBtn");
      if (resetBtn) resetBtn.addEventListener("click", clearAllFilters);
      return;
    }

    const html = nextBatch
      .map((v) => {
        if (currentView === "list") return createListCard(v);
        return createGridCard(v);
      })
      .join("");

    grid.insertAdjacentHTML("beforeend", html);
    renderIndex += nextBatch.length;

    // Animate new cards
    animateNewCards();

    // Update Load More / Pagination visibility
    if (paginationEl) {
      if (renderIndex >= filteredVehicles.length) {
        paginationEl.style.display = "none";
      } else {
        paginationEl.style.display = "flex";
      }
    }
  }

  function animateNewCards() {
    const cards = grid.querySelectorAll(".product-card:not(.animated)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-in-up", "animated");
            }, index * 50); // Stagger by 50ms
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );
    cards.forEach((card) => observer.observe(card));
  }

  function createGridCard(v) {
    // Determine image (placeholder logic)
    // We would need real images, for now using a generic placeholder or CAR brand logic
    const imgUrl = `https://placehold.co/600x450/2c2c2c/D4AF37?text=${v.brand}+${v.model}`;
    const brandLogo = getBrandLogo(v.brand);

    return `
      <div class="product-card fade-in-up">
        <div class="card-badges">
           <img src="${brandLogo}" class="badge-brand-logo" alt="${v.brand}">
           ${
             isNew(v.created)
               ? '<span class="filter-tag" style="background:var(--success, #28a745); color:white; border:none; padding: 4px 12px;">New</span>'
               : ""
           }
        </div>
        <div class="card-image-wrapper">
          <img src="${imgUrl}" class="card-image" alt="${
      v.model
    }" loading="lazy">
          <div class="card-info-overlay">
             <span>${v.type.toUpperCase()}</span>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${v.brand} ${v.model}</h3>
          <p class="card-subtitle">${
            v.id
          }</p> <!-- ID used as subtitle or trim -->
          
          <div class="card-meta-row">
            <div class="card-stat">
              <span class="stat-val">${v.yearStart}-${v.yearEnd}</span>
              <span class="stat-label">Years</span>
            </div>
            <div class="card-stat">
              <span class="stat-val">Custom</span>
              <span class="stat-label">Interior</span>
            </div>
          </div>
          
          <button class="card-action-btn">View Options</button>
        </div>
      </div>
    `;
  }

  function createListCard(v) {
    const brandLogo = getBrandLogo(v.brand);
    const imgUrl = `https://placehold.co/600x450/2c2c2c/D4AF37?text=${v.brand}`;

    return `
      <div class="product-card list-view-card fade-in-up">
        <div class="card-image-wrapper">
           <img src="${imgUrl}" class="card-image" alt="${v.brand}">
        </div>
        <div class="card-content">
            <div class="list-card-header">
                <div>
                    <h3 class="card-title">${v.brand} ${v.model}</h3>
                    <p class="card-subtitle">${v.yearStart}-${v.yearEnd} • ${v.type}</p>
                </div>
                <img src="${brandLogo}" class="list-brand-logo" alt="${v.brand}">
            </div>
            <div class="list-action-wrapper">
                <button class="card-action-btn">View Details</button>
            </div>
        </div>
      </div>
      `;
  }

  function getSkeletonHTML(count) {
    return Array(count)
      .fill(0)
      .map(
        () => `
      <div class="product-card" style="height: 400px; background: var(--surface);">
         <div style="height: 200px; background: var(--surface-dark); animation: pulse 1s infinite;"></div>
         <div style="padding: 1rem;">
            <div style="height: 20px; width: 60%; background: var(--border); margin-bottom: 10px; border-radius: 4px;"></div>
            <div style="height: 14px; width: 40%; background: var(--border); margin-bottom: 20px; border-radius: 4px;"></div>
             <div style="height: 40px; width: 100%; background: var(--border); border-radius: 8px;"></div>
         </div>
      </div>
    `
      )
      .join("");
  }

  // --- Filters & Logic ---

  function applyFilters() {
    filteredVehicles = allVehicles.filter((v) => {
      // Search
      if (activeFilters.search && !matchSearch(v, activeFilters.search))
        return false;
      // Brand
      if (activeFilters.brands.size > 0 && !activeFilters.brands.has(v.brand))
        return false;
      // Type
      if (activeFilters.types.size > 0 && !activeFilters.types.has(v.type))
        return false;
      // Year
      if (v.yearEnd < activeFilters.minYear) return false;

      return true;
    });

    resultsCountEl.innerText = `${filteredVehicles.length} vehicles found`;
    updateActiveTags();
    renderBatch(true);
  }

  function matchSearch(v, query) {
    const q = query.toLowerCase();
    return (
      v.brand.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.type.toLowerCase().includes(q)
    );
  }

  function toggleBrand(brand) {
    if (activeFilters.brands.has(brand)) {
      activeFilters.brands.delete(brand);
    } else {
      activeFilters.brands.add(brand);
    }
    applyFilters();
    updateBrandUI();
  }

  function toggleType(type) {
    if (activeFilters.types.has(type)) {
      activeFilters.types.delete(type);
    } else {
      activeFilters.types.add(type);
    }
    applyFilters();
    updateTypeUI();
  }

  function clearAllFilters() {
    activeFilters.search = "";
    activeFilters.brands.clear();
    activeFilters.types.clear();
    activeFilters.minYear = 2010;

    // UI Resets
    searchInput.value = "";
    document
      .querySelectorAll(".brand-option")
      .forEach((el) => el.classList.remove("selected"));
    document
      .querySelectorAll(".type-option-btn")
      .forEach((el) => el.classList.remove("selected"));
    yearMinInput.value = 2010;
    minYearLabel.innerText = "2010";

    applyFilters();
  }

  // --- UI Updates ---

  function updateActiveTags() {
    activeTagsEl.innerHTML = "";

    // Brand Tags
    activeFilters.brands.forEach((brand) => {
      activeTagsEl.appendChild(createTag(brand, () => toggleBrand(brand)));
    });

    // Type Tags
    activeFilters.types.forEach((type) => {
      activeTagsEl.appendChild(createTag(type, () => toggleType(type)));
    });

    // Year Tag
    if (activeFilters.minYear > 2010) {
      activeTagsEl.appendChild(
        createTag(`From ${activeFilters.minYear}`, () => {
          activeFilters.minYear = 2010;
          yearMinInput.value = 2010;
          minYearLabel.innerText = "2010";
          applyFilters();
        })
      );
    }

    // Search Tag
    if (activeFilters.search) {
      activeTagsEl.appendChild(
        createTag(`"${activeFilters.search}"`, () => {
          activeFilters.search = "";
          searchInput.value = "";
          applyFilters();
        })
      );
    }
  }

  function createTag(text, onRemove) {
    const tag = document.createElement("span");
    tag.className = "filter-tag";
    tag.innerHTML = `${text} <i class="fas fa-times"></i>`;
    tag.querySelector("i").addEventListener("click", onRemove);
    return tag;
  }

  function updateBrandUI() {
    // Highlight selected brands in dropdown
    document.querySelectorAll(".brand-option").forEach((el) => {
      const brand = el.dataset.brand;
      if (activeFilters.brands.has(brand))
        el.style.background = "var(--primary-light)"; // rough helper
      else el.style.background = "";
    });
  }

  function updateTypeUI() {
    document.querySelectorAll(".type-option-btn").forEach((btn) => {
      const type = btn.dataset.type;
      if (activeFilters.types.has(type)) btn.classList.add("selected");
      else btn.classList.remove("selected");
    });
  }

  function injectBrands() {
    // Unique brands from data
    const brands = [...new Set(allVehicles.map((v) => v.brand))].sort();
    if (brandGrid) {
      brandGrid.innerHTML = brands
        .map((b) => {
          const logo = getBrandLogo(b);
          return `
               <div class="brand-option" data-brand="${b}" onclick="this.parentElement.dispatchEvent(new CustomEvent('brand-select', {detail: '${b}', bubbles: true}))">
                  <img src="${logo}" alt="${b}">
                  <span>${b}</span>
               </div>
             `;
        })
        .join("");

      // Add delegation
      brandGrid.addEventListener("brand-select", (e) => {
        toggleBrand(e.detail);
      });
    }
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Search
    searchInput.addEventListener("input", (e) => {
      activeFilters.search = e.target.value.trim();
      applyFilters();
    });

    // Type Buttons
    typeOptions.addEventListener("click", (e) => {
      const btn = e.target.closest(".type-option-btn");
      if (btn) {
        toggleType(btn.dataset.type);
      }
    });

    // Year Slider
    yearMinInput.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      minYearLabel.innerText = val;
      activeFilters.minYear = val;
      applyFilters(); // Might want to debounce this in production
    });

    // View Toggle
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        viewBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentView = btn.dataset.view;
        const gridContainer = document.querySelector(".results-grid-container");
        if (currentView === "list") {
          grid.style.display = "flex";
          grid.style.flexDirection = "column";
          grid.style.gap = "1rem";
          gridContainer.style.maxWidth = "1000px";
          gridContainer.style.margin = "0 auto";
        } else {
          grid.style.display = "grid";
          grid.style.gridTemplateColumns =
            "repeat(auto-fill, minmax(280px, 1fr))";
          grid.style.gap = "2rem";
          gridContainer.style.maxWidth = "1400px";
        }
        renderBatch(true);
      });
    });

    // Dropdown Interactions (Simple open/close)
    document.querySelectorAll(".filter-dropdown").forEach((dropdown) => {
      const trigger = dropdown.querySelector(".filter-trigger");
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        // Close others
        document.querySelectorAll(".filter-dropdown").forEach((d) => {
          if (d !== dropdown) d.classList.remove("is-open");
        });
        dropdown.classList.toggle("is-open");
      });
    });

    // Close dropdowns on outside click
    document.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-dropdown")
        .forEach((d) => d.classList.remove("is-open"));
    });

    // Infinite Scroll / Pagination (simplified to just load more for now)
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        // Load more logic
        if (renderIndex < filteredVehicles.length) {
          renderBatch(false);
        }
      }
    });

    // Mobile FAB
    if (mobileFab) {
      mobileFab.addEventListener("click", () => {
        // Scroll to filter bar for now
        filterBar.scrollIntoView({ behavior: "smooth" });
        // Ideally open a modal, but for MVP sticking to bar
      });
    }
  }

  // --- Phase 2: Parallax & Sticky ---
  function setupParallaxHero() {
    const heroBg = document.querySelector(".hero-category-bg");
    if (!heroBg) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const parallaxSpeed = 0.5;
          heroBg.style.transform = `translate3d(0, ${scrolled * parallaxSpeed}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  function setupStickyFilterBar() {
    const filterBar = document.getElementById("filterBar");
    if (!filterBar) return;

    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 200) {
        filterBar.classList.add("scrolled");
      } else {
        filterBar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    });
  }

  // --- Helpers ---
  function parseCSV(text) {
    // Reusing existing robust CSV parser from before for brevity in rewriting
    // (Assuming standard CSV format with headers)
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
    if (!lines.length) return [];
    const headers = lines[0]
      .split(",")
      .map((h) => h.trim().replace(/^"|"$/g, ""));

    return lines.slice(1).map((line) => {
      const values = [];
      let current = "";
      let inQuotes = false;
      for (let char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          values.push(current);
          current = "";
        } else {
          current += char;
        }
      }
      values.push(current);

      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ? values[i].replace(/^"|"$/g, "").trim() : "";
      });
      return obj;
    });
  }

  function normalizeVehicle(v) {
    // Reuse normalization
    return {
      id: v.ID || v.id,
      brand: v.brand || v.Brand,
      model: v.model || v.Model,
      type: v.type || v.Type || "Sedan",
      yearStart: parseInt(v.year_start || v.YearStart || 2010),
      yearEnd: parseInt(v.year_end || v.YearEnd || 2024),
      created: v.created,
    };
  }

  function getBrandLogo(brand) {
    const map = {
      Toyota: CONFIG.images.carBrands[0],
      Honda: CONFIG.images.carBrands[1],
      BMW: CONFIG.images.carBrands[2],
      Mercedes: CONFIG.images.carBrands[3],
      Audi: CONFIG.images.carBrands[4],
    };
    return map[brand] || CONFIG.images.carBrands[0];
  }

  function isNew(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return Date.now() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
  }

  // Run
  init();
});
