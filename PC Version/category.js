document.addEventListener("DOMContentLoaded", () => {
    const viewBtns = document.querySelectorAll(".view-btn");
    const grid = document.querySelector(".vehicles-grid");
    const list = document.querySelector(".vehicles-list");
    const resultsCountEl = document.querySelector(".results-count strong");
    const searchInput = document.querySelector(".filter-sidebar .search-box input");
    const clearFiltersLink = document.querySelector(".clear-filters");
    
    // Filter Elements
    const brandContainer = document.getElementById("brand-filters");
    const typeContainer = document.getElementById("type-filters");
    
    // Elements for Year/Fuel Filter are removed
    
    const compareToggle = document.getElementById("compareMode");
    const compareBtn = document.querySelector(".compare-btn");
  
    let allVehicles = [];
    let filteredVehicles = [];
    let renderIndex = 0;
    const batchSize = 20;
    let loadingBatch = false;
    const favoritesKey = "sherif_auto_favorites";
    const favorites = new Set(JSON.parse(localStorage.getItem(favoritesKey) || "[]"));
    
    // State for filters
    let activeBrandFilters = new Set();
    let activeTypeFilters = new Set();
    // Fuel filter removed
  
    // Helper: Brand Logos (Expand as needed)
    function getBrandLogo(brand) {
      // Normalize brand name for partial matching if needed
      const b = brand.toLowerCase();
      if (typeof CONFIG !== 'undefined' && CONFIG.images && CONFIG.images.carBrands) {
          if (b.includes("toyota")) return CONFIG.images.carBrands[0];
          if (b.includes("honda")) return CONFIG.images.carBrands[1];
          if (b.includes("bmw")) return CONFIG.images.carBrands[2];
          if (b.includes("mercedes")) return CONFIG.images.carBrands[3];
          if (b.includes("audi")) return CONFIG.images.carBrands[4];
      }
      return null; 
    }
  
    function vehicleCardHTML(v) {
      const favActive = favorites.has(v.id) ? "active" : "";
      
      // Determine badge based on year (e.g. newer than 2024 is "New") or if recent add
      const isNew = v.yearStart >= 2024; 
      const badge = isNew ? `<span class="badge-new">New Model</span>` : "";
      
      const brandLogo = getBrandLogo(v.brand);
      const logoHtml = brandLogo ? `<img class="brand-logo" src="${brandLogo}" alt="${v.brand}">` : `<span class="brand-text-icon">${v.brand[0]}</span>`;
      
      return `
        <div class="vehicle-card" data-id="${v.id}">
          <input type="checkbox" class="compare-checkbox" style="display: none;">
          <div class="vehicle-icon"><i class="fas fa-car"></i></div>
          ${badge}
          <h3>${v.model}</h3>
          <div class="vehicle-brand">
            ${logoHtml} ${v.brand}
          </div>
          <div class="vehicle-year">${v.yearStart}</div>
          <div class="vehicle-type-tag">${v.type}</div>
          <div class="vehicle-actions">
            <button class="btn-view">View Details</button>
            <button class="favorite-btn ${favActive}" aria-label="Add to favorites"><i class="fas fa-heart"></i></button>
          </div>
        </div>
      `;
    }
  
    function vehicleListItemHTML(v) {
      const isNew = v.yearStart >= 2024;
      const badge = isNew ? `<span class="badge-new">New</span>` : "";
      return `
        <div class="vehicle-list-item" data-id="${v.id}">
          <div class="list-icon"><i class="fas fa-car"></i></div>
          <div class="list-info">
            <h3>${v.brand} ${v.model} ${badge}</h3>
            <div class="list-meta">
              <span><i class="fas fa-calendar"></i> ${v.yearStart}</span>
              <span><i class="fas fa-tag"></i> ${v.type}</span>
            </div>
          </div>
          <button class="btn-view">View Details</button>
        </div>
      `;
    }
  
    function showSkeleton(count) {
      grid.innerHTML = "";
      const items = [];
      for (let i = 0; i < count; i++) {
        items.push(`
          <div class="vehicle-card skeleton">
            <div class="vehicle-icon"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
            <div class="skeleton-line"></div>
          </div>
        `);
      }
      grid.innerHTML = items.join("");
    }
  
    function renderBatch(reset) {
      if (reset) {
        renderIndex = 0;
        grid.innerHTML = "";
        list.innerHTML = "";
      }
      // If no results
      if (filteredVehicles.length === 0 && reset) {
         showEmptyState();
         return;
      }

      const next = filteredVehicles.slice(renderIndex, renderIndex + batchSize);
      const gridHTML = next.map(vehicleCardHTML).join("");
      const listHTML = next.map(vehicleListItemHTML).join("");
      grid.insertAdjacentHTML("beforeend", gridHTML);
      list.insertAdjacentHTML("beforeend", listHTML);
      renderIndex += next.length;
      attachCardEvents();
    }
  
    function attachCardEvents() {
      const cards = grid.querySelectorAll(".vehicle-card");
      cards.forEach((card) => {
        const favBtn = card.querySelector(".favorite-btn");
        if (favBtn) {
          favBtn.addEventListener("click", () => {
            const id = card.getAttribute("data-id");
            if (favorites.has(id)) {
              favorites.delete(id);
              favBtn.classList.remove("active");
            } else {
              favorites.add(id);
              favBtn.classList.add("active");
            }
            localStorage.setItem(favoritesKey, JSON.stringify(Array.from(favorites)));
          });
        }
      });
    }
  
    function updateResultsCount() {
      if (resultsCountEl) resultsCountEl.textContent = String(filteredVehicles.length);
    }
  
    function showEmptyState() {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon"><i class="fas fa-search"></i></div>
          <p>No vehicles match your filters</p>
          <button class="btn-clear-all">Clear All Filters</button>
        </div>
      `;
      const btn = grid.querySelector(".btn-clear-all");
      if (btn) {
        btn.addEventListener("click", () => {
          clearAllFilters();
        });
      }
    }
  
    // --- Dynamic Filter Generation ---
  
    function generateBrandFilters() {
        if (!brandContainer) return;
        brandContainer.innerHTML = "";
        
        // Count brands
        const counts = {};
        allVehicles.forEach(v => {
            counts[v.brand] = (counts[v.brand] || 0) + 1;
        });
        
        // Sort by count desc
        const sortedBrands = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
        
        // Show top 20 by default (scrolling is handled by CSS usually, but here we just list them)
        // If sidebar has fixed height, it will scroll. 
        // We'll output all of them but maybe hide some if too many? 
        // For now, let's just output all, assuming CSS handles overflow if needed. 
        // To be safe, let's output top 50, otherwise DOM gets too heavy.
        
        sortedBrands.slice(0, 50).forEach(brand => {
           const count = counts[brand];
           const div = document.createElement("div");
           div.className = "checkbox-item";
           
           const input = document.createElement("input");
           input.type = "checkbox";
           input.id = `brand-${brand.replace(/\s+/g, '-')}`;
           input.value = brand;
           input.addEventListener("change", (e) => {
               if(e.target.checked) activeBrandFilters.add(brand);
               else activeBrandFilters.delete(brand);
               applyFilters();
           });
           
           const label = document.createElement("label");
           label.htmlFor = input.id;
           label.textContent = brand;
           
           const badge = document.createElement("span");
           badge.className = "count-badge";
           badge.textContent = count;
           
           div.appendChild(input);
           div.appendChild(label);
           div.appendChild(badge);
           brandContainer.appendChild(div);
        });
    }
    
    function generateTypeFilters() {
        if (!typeContainer) return;
        typeContainer.innerHTML = "";
        
        const counts = {};
        allVehicles.forEach(v => {
            counts[v.type] = (counts[v.type] || 0) + 1;
        });
        
        const sortedTypes = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
        
        sortedTypes.forEach(type => {
           const count = counts[type];
           const div = document.createElement("div");
           div.className = "checkbox-item";
           
           const input = document.createElement("input");
           input.type = "checkbox";
           input.id = `type-${type.replace(/\s+/g, '-')}`;
           input.value = type;
           input.addEventListener("change", (e) => {
               if(e.target.checked) activeTypeFilters.add(type);
               else activeTypeFilters.delete(type);
               applyFilters();
           });
           
           const label = document.createElement("label");
           label.htmlFor = input.id;
           label.textContent = type;
           
           const badge = document.createElement("span");
           badge.className = "count-badge";
           badge.textContent = count;
           
           div.appendChild(input);
           div.appendChild(label);
           div.appendChild(badge);
           typeContainer.appendChild(div);
        });
    }

    // Fuel filter generation removed
  
    // --- Filtering Logic ---
  
    function applyFilters() {
      // 1. Search Query
      const q = (searchInput?.value || "").trim().toLowerCase();
      
      // Year Range removed

      filteredVehicles = allVehicles.filter((v) => {
        // Search
        let inText = true;
        if (q) {
            inText = v.model.toLowerCase().includes(q) || 
                     v.brand.toLowerCase().includes(q) || 
                     (v.generation && v.generation.toLowerCase().includes(q));
        }
        
        // Brand
        const inBrand = activeBrandFilters.size === 0 || activeBrandFilters.has(v.brand);
        
        // Type
        const inType = activeTypeFilters.size === 0 || activeTypeFilters.has(v.type);

        return inText && inBrand && inType;
      });
      
      updateResultsCount();
      renderBatch(true);
    }
  
    function clearAllFilters() {
      if (searchInput) searchInput.value = "";
      
      // Clear Sets
      activeBrandFilters.clear();
      activeTypeFilters.clear();
      // Fuel removed
      
      // Uncheck boxes
      if (brandContainer) {
          brandContainer.querySelectorAll("input").forEach(el => el.checked = false);
      }
      if (typeContainer) {
          typeContainer.querySelectorAll("input").forEach(el => el.checked = false);
      }
      
      // Fuel reset removed
      
      // Reset sliders (Removed)
      
      applyFilters();
    }
  
    function onScrollLoadMore() {
      if (loadingBatch) return;
      const scrollPos = window.scrollY + window.innerHeight;
      const threshold = document.body.offsetHeight - 500; // Increased threshold
      if (scrollPos >= threshold && renderIndex < filteredVehicles.length) {
        loadingBatch = true;
        // Small delay to prevent thrashing
        requestAnimationFrame(() => {
            renderBatch(false);
            loadingBatch = false;
        });
      }
    }
  
    function setupViewToggle() {
      if (viewBtns.length && grid && list) {
        viewBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            viewBtns.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            const view = this.dataset.view;
            if (view === "list") {
              grid.style.display = "none";
              list.classList.add("active");
            } else {
              grid.style.display = "grid";
              list.classList.remove("active");
              grid.className = "vehicles-grid";
              if (view === "grid-3") grid.classList.add("cols-3");
            }
          });
        });
      }
    }
  
    function setupCompareMode() {
      const checkboxes = document.querySelectorAll(".compare-checkbox");
      if (compareToggle) {
        compareToggle.addEventListener("change", function () {
          // We need to target specific checkboxes in DOM, but since they are dynamic, 
          // we should toggle a class on the grid request dynamic update?
          // For now, toggle visibility on existing ones
          const currentBoxes = document.querySelectorAll(".vehicle-card .compare-checkbox");
          currentBoxes.forEach((cb) => {
            cb.style.display = this.checked ? "block" : "none";
          });
          
          if (this.checked) {
            if (compareBtn) compareBtn.classList.add("active");
          } else {
            if (compareBtn) compareBtn.classList.remove("active");
            currentBoxes.forEach((cb) => (cb.checked = false));
            updateCompareCount();
          }
        });
      }
      function updateCompareCount() {
        const checkedCount = document.querySelectorAll(".compare-checkbox:checked").length;
        if (compareBtn) {
          compareBtn.textContent = `Compare Selected (${checkedCount})`;
        }
      }
      // Delegate event listener for dynamic content
      if (grid) {
          grid.addEventListener("change", (e) => {
              if (e.target.classList.contains("compare-checkbox")) {
                  updateCompareCount();
              }
          });
      }
    }
  
    function setupFilters() {
      if (searchInput) {
        searchInput.addEventListener("input", () => applyFilters());
      }
      
      // Year range listeners removed

      if (clearFiltersLink) {
        clearFiltersLink.addEventListener("click", (e) => {
          e.preventDefault();
          clearAllFilters();
        });
      }
    }
  
    async function loadVehicles() {
      showSkeleton(12);
      try {
        // 1. Fetch list of CSV files
        const listRes = await fetch("DATA/csv_list.json");
        if (!listRes.ok) throw new Error("Failed to load csv_list.json");
        const csvFiles = await listRes.json();

        // 2. Fetch and Parse all CSVs
        const promises = csvFiles.map(filename => 
            new Promise((resolve, reject) => {
                Papa.parse(`DATA/${filename}`, {
                    download: true,
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        resolve(results.data);
                    },
                    error: (err) => {
                        console.error(`Error parsing ${filename}:`, err);
                        resolve([]); // Continue even if one fails
                    }
                });
            })
        );

        const results = await Promise.all(promises);
        
        // 3. Flatten and Map Data
        // Structure: Brand, Model, Generation, Type
        let combinedData = results.flat();

        allVehicles = combinedData.map((row, index) => {
            // Extract Year from Generation string (e.g., "2025 BMW...")
            // Fallback to 2024 if not found for now, or 0? 
            // Regex to find first 4-digit number
            let year = 0;
            const yearMatch = row.Generation ? row.Generation.match(/\b(19|20)\d{2}\b/) : null;
            if (yearMatch) {
                year = parseInt(yearMatch[0], 10);
            }

            // Generate ID
            const safeId = `${row.Brand}-${row.Model}-${index}`.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();

            return {
                id: safeId,
                brand: row.Brand || "Unknown",
                model: row.Model || "Unknown",
                generation: row.Generation || "",
                type: row.Type || "Car", // Default to Car if missing
                yearStart: year, // Use yearStart to match existing logic
                // Provide other fields if needed by existing code?
                // The existing code uses: id, brand, model, yearStart, type
            };
        });

        // Simple validation to remove empty rows/bad data
        allVehicles = allVehicles.filter(v => v.brand && v.brand !== "Unknown" && v.model);

        // Sort by Year desc
        allVehicles.sort((a,b) => b.yearStart - a.yearStart);
        
        filteredVehicles = allVehicles.slice();
        
        generateBrandFilters();
        generateTypeFilters();
        updateResultsCount();
        
        renderBatch(true);
      } catch (e) {
        console.error(e);
        grid.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <p>Failed to load vehicles data. Please try again later.</p>
          </div>
        `;
      }
    }
  
    setupViewToggle();
    setupCompareMode();
    setupFilters();
    window.addEventListener("scroll", onScrollLoadMore);
    
    // Start Loading
    loadVehicles();
  });
