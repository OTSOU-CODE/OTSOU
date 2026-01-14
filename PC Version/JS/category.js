document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const grid = document.getElementById("vehicleGrid");
  const paginationEl = document.getElementById("pagination");
  const resultsCountEl = document.getElementById("resultsCount");

  // Filter Inputs
  const brandGrid = document.getElementById("brandGrid");
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
      // Load top luxury brands for the leasing aesthetic
      const files = [
        "../DATA/ACURA.csv", "../DATA/ALFA ROMEO.csv", "../DATA/ALPINE.csv", "../DATA/ASTON MARTIN.csv",
        "../DATA/AUDI.csv", "../DATA/BENTLEY.csv", "../DATA/BMW.csv", "../DATA/BUGATTI.csv",
        "../DATA/BUICK.csv", "../DATA/CADILLAC.csv", "../DATA/CHERY.csv", "../DATA/CHEVROLET.csv",
        "../DATA/CHRYSLER.csv", "../DATA/CITROEN.csv", "../DATA/CUPRA.csv", "../DATA/DACIA.csv",
        "../DATA/DODGE.csv", "../DATA/DS AUTOMOBILES.csv", "../DATA/FERRARI.csv", "../DATA/FIAT.csv",
        "../DATA/FISKER.csv", "../DATA/FORD.csv", "../DATA/GEELY.csv", "../DATA/GENESIS.csv",
        "../DATA/GMC.csv", "../DATA/HONDA.csv", "../DATA/HYUNDAI.csv", "../DATA/INFINITI.csv",
        "../DATA/ISUZU.csv", "../DATA/JAGUAR.csv", "../DATA/JEEP.csv", "../DATA/KIA.csv",
        "../DATA/KOENIGSEGG.csv", "../DATA/LAMBORGHINI.csv", "../DATA/LAND ROVER.csv", "../DATA/LEXUS.csv",
        "../DATA/LINCOLN.csv", "../DATA/LOTUS.csv", "../DATA/Lucid Motors.csv", "../DATA/MARUTI SUZUKI.csv",
        "../DATA/MASERATI.csv", "../DATA/MAZDA.csv", "../DATA/MCLAREN.csv", "../DATA/MERCEDES BENZ.csv",
        "../DATA/MG.csv", "../DATA/MINI.csv", "../DATA/MITSUBISHI.csv", "../DATA/Mahindra.csv",
        "../DATA/Mercedes-AMG.csv", "../DATA/NIO.csv", "../DATA/NISSAN.csv", "../DATA/OPEL.csv",
        "../DATA/PAGANI.csv", "../DATA/PEUGEOT.csv", "../DATA/PORSCHE.csv", "../DATA/PROTON.csv",
        "../DATA/Polestar.csv", "../DATA/RAM Trucks.csv", "../DATA/RENAULT.csv", "../DATA/RIMAC.csv",
        "../DATA/RIVIAN.csv", "../DATA/ROLLS-ROYCE.csv", "../DATA/SEAT.csv", "../DATA/SKODA.csv",
        "../DATA/SMART.csv", "../DATA/SSANGYONG.csv", "../DATA/SUBARU.csv", "../DATA/SUZUKI.csv",
        "../DATA/TATA MOTORS.csv", "../DATA/TESLA.csv", "../DATA/TOYOTA.csv", "../DATA/VOLKSWAGEN.csv",
        "../DATA/VOLVO.csv", "../DATA/VinFast.csv", "../DATA/Xiaomi.csv", "../DATA/Xpeng.csv"
      ];

      const promises = files.map((file) =>
        fetch(file).then((res) => (res.ok ? res.text() : ""))
      );
      const rawTexts = await Promise.all(promises);

      let combinedRows = [];
      rawTexts.forEach((text) => {
        if (text) combinedRows = [...combinedRows, ...parseComplexCSV(text)];
      });

      // Shuffle for variety
      combinedRows.sort(() => Math.random() - 0.5);

      // Normalize AND Enrich with Mock Data for Leasing
      allVehicles = combinedRows
        .map(normalizeVehicle)
        .filter((v) => v.brand && v.model)
        .map(enrichWithMockData);

      applyFilters();
    } catch (e) {
      console.error("Failed to load data", e);
      grid.innerHTML = `<div class="empty-state">Failed to load vehicle data. <br><small>${e.message}</small></div>`;
    }
  }

  // --- Mock Data Generation ---
  function enrichWithMockData(v) {
    // Generate consistent mock data based on ID or string hash
    const seed = v.id.split("").reduce((a, b) => a + b.charCodeAt(0), 0);

    const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric", "Plug-in"];
    const transmissions = ["Manual", "Automatic"];
    const bodyTypes = ["Hatchback", "SUV", "Saloon", "Coupe", "Estate"];

    // Deterministic pseudo-random
    const rand = (offset) => Math.abs(Math.sin(seed + offset));

    const price = Math.floor(rand(1) * 400) + 150; // 150 - 550
    const initialPayment = Math.floor(price * (Math.floor(rand(2) * 6) + 3)); // 3x - 9x monthly

    return {
      ...v,
      priceMonthly: price,
      initialPayment: initialPayment,
      contractLength: [24, 36, 48][Math.floor(rand(3) * 3)],
      mileage: [5000, 8000, 10000, 12000][Math.floor(rand(4) * 4)],
      fuel: fuelTypes[Math.floor(rand(5) * fuelTypes.length)],
      transmission: transmissions[Math.floor(rand(6) * transmissions.length)],
      seats: Math.floor(rand(7) * 4) + 2, // 2-5 (rough)
      doors: 5,
      engineSize: (1.0 + rand(8) * 2.0).toFixed(1),
    };
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
            <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
            <h3>No results found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        `;
      return;
    }

    const html = nextBatch.map(createGridCard).join("");
    grid.insertAdjacentHTML("beforeend", html);
    renderIndex += nextBatch.length;

    if (paginationEl) {
      paginationEl.style.display =
        renderIndex >= filteredVehicles.length ? "none" : "flex";
    }
  }

  function createGridCard(v) {
    const imgUrl = `https://placehold.co/600x450/f9f9f9/333?text=${v.brand}+${v.model}`;
    const brandLogo = getBrandLogo(v.brand);

    const isElectric = v.fuel === "Electric" || v.fuel === "Hybrid";

    return `
        <div class="product-card">
          <div class="card-image-wrapper">
             <span class="badge-count"><i class="fas fa-camera"></i> ${
               Math.floor(Math.random() * 10) + 2
             }</span>
             <img src="${imgUrl}" class="card-image" alt="${
      v.model
    }" loading="lazy">
          </div>

          <div class="card-content">
            <div class="card-pricing">
                <div class="price-row">
                    <div class="price-main">
                        <span class="price-label">From</span>
                        <span class="price-value">£${v.priceMonthly}</span>
                        <span class="price-label">Per month (inc. VAT)</span>
                    </div>
                    <div class="price-detail">
                        <strong>£${v.initialPayment.toLocaleString()} Initial payment</strong>
                        <span>${v.contractLength} month contract</span>
                        <span>${v.mileage.toLocaleString()} miles p/a</span>
                    </div>
                </div>
            </div>

            <span class="delivery-tag">February 2026 delivery</span>

            <h3 class="card-title">${v.year} ${v.brand} ${v.model}</h3>
            <p class="card-subtitle">${v.engineSize} ${v.fuel} ${v.type} 5dr</p>

            <div class="specs-grid">
                <div class="spec-item"><i class="fas fa-gas-pump"></i> ${
                  v.fuel
                }</div>
                <div class="spec-item"><i class="fas fa-door-open"></i> ${
                  v.doors
                } doors</div>
                <div class="spec-item"><i class="fas fa-cog"></i> ${
                  v.transmission
                }</div>
                <div class="spec-item"><i class="fas fa-chair"></i> ${
                  v.seats
                } Seats</div>
                <div class="spec-item"><i class="fas fa-car-side"></i> ${
                  v.type
                }</div>
                <div class="spec-item"><i class="fas fa-tachometer-alt"></i> ${
                  v.engineSize
                } litres</div>
            </div>

            <!-- Hidden action layer if needed, or just clickable card -->
          </div>
        </div>
      `;
  }

  function getSkeletonHTML(count) {
    return Array(count)
      .fill(0)
      .map(
        () => `
        <div class="product-card" style="height: 400px; padding:1rem;">
           <div style="height: 180px; background: #f0f0f0; margin-bottom:1rem; border-radius:8px;"></div>
           <div style="height: 20px; width: 60%; background: #f0f0f0; margin-bottom: 10px;"></div>
           <div style="height: 14px; width: 40%; background: #f0f0f0;"></div>
        </div>
      `
      )
      .join("");
  }

  // --- Filters & Logic ---
  function applyFilters() {
    filteredVehicles = allVehicles.filter((v) => {
      if (activeFilters.make.size > 0 && !activeFilters.make.has(v.brand))
        return false;

      if (activeFilters.year.size > 0 && !activeFilters.year.has(v.year))
        return false;

      // Other filters removed
      
      return true;
    });

    if (resultsCountEl)
      resultsCountEl.innerText = `${filteredVehicles.length} results`;
    renderBatch(true);
  }

  function setupEventListeners() {
    // Buttons
    // Buttons (Personal/Business) removed

    if (resetFiltersLink) {
        activeFilters.make.clear();
        activeFilters.year.clear();
        // activeFilters.fuel.clear();
        // activeFilters.gearbox.clear();
        // activeFilters.minPrice = 0;
        // activeFilters.maxPrice = 10000;
        applyFilters();
      });
    }

    // Infinite Scroll
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (renderIndex < filteredVehicles.length) {
          renderBatch(false);
        }
      }
    });

    // Dropdown logic for simple lists (Gearbox, Fuel, etc) REMOVED
    // document.querySelectorAll(".simple-list-options").forEach((list) => { ... });

    // Year Filter Listener
    const yearOptions = document.getElementById("yearOptions");
    if (yearOptions) {
      yearOptions.addEventListener("click", (e) => {
        const btn = e.target.closest(".list-option");
        if (!btn) return;

        const val = btn.dataset.val;
        if (activeFilters.year.has(val)) {
            activeFilters.year.delete(val);
            btn.classList.remove("selected");
        } else {
            activeFilters.year.add(val);
            btn.classList.add("selected");
        }
        applyFilters();
      });
    }

    // View Dropdown Toggling
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".filter-trigger");
      if (trigger) {
        e.stopPropagation();
        const dropdown = trigger.closest(".filter-dropdown");
        // Close others
        document.querySelectorAll(".filter-dropdown").forEach((d) => {
          if (d !== dropdown) d.classList.remove("is-open");
        });
        dropdown.classList.toggle("is-open");
      } else {
        // Close all
        document
          .querySelectorAll(".filter-dropdown")
          .forEach((d) => d.classList.remove("is-open"));
      }
    });
  }

  function injectBrands() {
    const brands = [...new Set(allVehicles.map((v) => v.brand))].sort();
    if (brandGrid) {
      brandGrid.innerHTML = brands
        .map(
          (b) => `
             <div class="brand-option" style="padding:0.5rem; cursor:pointer;" onclick="this.dispatchEvent(new CustomEvent('brand-select', {detail: '${b}', bubbles: true}))">
                ${b}
             </div>
          `
        )
        .join("");

      brandGrid.addEventListener("brand-select", (e) => {
        const b = e.detail;
        if (activeFilters.make.has(b)) activeFilters.make.delete(b);
        else activeFilters.make.add(b);
        applyFilters();
      });
    }
  }

  function injectYears() {
    const yearOptions = document.getElementById("yearOptions");
    if (!yearOptions) return;

    // Extract unique years
    const years = [...new Set(allVehicles.map(v => v.year))].sort().reverse();
    
    yearOptions.innerHTML = years.map(y => `
        <button class="list-option" data-val="${y}">${y}</button>
    `).join("");
  }

  function setupStickyFilterBar() {
    const filterBar = document.getElementById("filterBar");
    if (!filterBar) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) filterBar.classList.add("scrolled");
      else filterBar.classList.remove("scrolled");
    });
  }

  // --- Complex CSV Parser ---
  // The CSV format has one header row, but the data for a SINGLE car is spread across ~8 lines.
  // We need to group by a unique ID (the 'URL' column is good for this) and merge the properties.
  function parseComplexCSV(text) {
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
    if (!lines.length) return [];

    // Header is line 0
    const headers = splitCSVLine(lines[0]);

    // Temporary storage to merge rows
    const vehicleMap = new Map();

    // Start from line 1
    for (let i = 1; i < lines.length; i++) {
      const row = splitCSVLine(lines[i]);
      if (row.length < 5) continue; // Skip malformed

      // URL is usually index 4 based on the file inspection
      // Brand=0, Model=1, Gen=2, Engine=3, URL=4
      const url = row[4];

      if (!url) continue;

      if (!vehicleMap.has(url)) {
        vehicleMap.set(url, {});
      }

      const vehicleObj = vehicleMap.get(url);

      // Iterate columns and add non-empty values
      headers.forEach((header, index) => {
        const cleanHeader = header.replace(/:$/, "").trim(); // Remove trailing colon
        const val = row[index] ? row[index].trim() : "";

        if (val) {
          // If key exists, parsing strategies:
          // 1. If distinct, keep longest?
          // 2. Just overwrite? (Most rows seem to have specific disjoint data)
          // 3. Simple overwrite is likely fine as the rows carry different distinct columns
          if (
            !vehicleObj[cleanHeader] ||
            vehicleObj[cleanHeader].length < val.length
          ) {
            vehicleObj[cleanHeader] = val;
          }
        }
      });
    }

    return Array.from(vehicleMap.values());
  }

  function splitCSVLine(line) {
    const values = [];
    let current = "";
    let inQuotes = false;
    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === "," && !inQuotes) {
        values.push(current);
        current = "";
      } else current += char;
    }
    values.push(current);
    return values.map((v) => v.replace(/^"|"$/g, "").trim());
  }

  function normalizeVehicle(v) {
    // console.log(v); // Debug if needed

    // Extract Year from Generation text or Model
    let year = "2025"; // Default
    const generationText = v["Generation"] || v["Model"] || "";
    const yearMatch = generationText.match(/\b(20\d{2})\b/);
    if (yearMatch) {
      year = yearMatch[1];
    }

    // Engine Size logic...
    let engineSize = "2.0";
    if (v["Displacement"]) {
      const match = v["Displacement"].match(/(\d+)/);
      if (match) {
        engineSize = (parseInt(match[1]) / 1000).toFixed(1);
      }
    }

    // Clean Brand/Model
    const brand = v["Brand"] || "Unknown";
    let model = v["Model"] || "Vehicle";
    // Remove Brand from Model if present to avoid "BMW BMW X5"
    if (model.startsWith(brand)) {
      model = model.substring(brand.length).trim();
    }

    return {
      id: v["URL"] || Math.random().toString(36), // Unique ID from URL
      year: year,
      brand: brand,
      model: model,
      type: v["Drive Type"] || v["Body style"] || "Car", // CSV key might vary, check Body Type if available
      fuel: v["Fuel"] || "Petrol",
      transmission: v["Gearbox"]
        ? v["Gearbox"].toLowerCase().includes("auto")
          ? "Automatic"
          : "Manual"
        : "Automatic",
      seats: 5, // Default as rarely in CSV
      doors: 5, // Default
      engineSize: engineSize,

      // Keep raw for specs
      raw: v,
    };
  }

  function getBrandLogo(brand) {
    // Basic map or fallback
    const map = {
      Toyota: CONFIG.images.carBrands[0],
      Honda: CONFIG.images.carBrands[1],
      BMW: CONFIG.images.carBrands[2],
      Mercedes: CONFIG.images.carBrands[3],
      Audi: CONFIG.images.carBrands[4],
    };
    return map[brand] || CONFIG.images.carBrands[0];
  }
});
