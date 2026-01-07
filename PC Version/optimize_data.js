const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'DATA');
const outputFile = path.join(dataDir, 'vehicles.json');

// Helper to parse CSV line handling quotes
function parseCSVLine(text) {
    const result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
            inQuote = !inQuote;
        } else if (c === ',' && !inQuote) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += c;
        }
    }
    result.push(cur.trim());
    return result;
}

// Helper to escape CSV field
function escapeCSV(field) {
    if (!field) return '';
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
}

// Infer vehicle type
function inferType(model, gen) {
    const s = (model + ' ' + gen).toLowerCase();
    
    if (s.includes('motorcycle') || s.includes('moto ') || s.includes('bike')) return 'Motorcycle';
    if (s.includes('truck') || s.includes('pickup') || s.includes('silverado') || s.includes('ram 1500') || s.includes('f-150')) return 'Truck';
    if (s.includes('van') || s.includes('minivan') || s.includes('promaster') || s.includes('transit') || s.includes('sprinter')) return 'Van';
    
    // Check for SUV specific keywords
    if (s.includes('suv') || s.includes('crossover') || s.includes('jeep')) return 'SUV';
    // Common SUV model codes
    if (/\b(x3|x5|x7|q3|q5|q7|q8|gls|gle|glc|cayenne|macan|tiguan|touareg)\b/.test(s)) return 'SUV';

    return 'Car';
}

// Simplify Fuel
function simplifyFuel(fuelRaw) {
    if (!fuelRaw) return '';
    const f = fuelRaw.toLowerCase();
    const parts = [];
    
    if (f.includes('electric') || f.includes('ev ')) parts.push('Electric');
    else if (f.includes('hybrid') || f.includes('phev') || f.includes('mhev')) parts.push('Hybrid'); // usually hybrid implies gas+electric, so we group them or treat as distinct category. User asked "electric or diesel or hybrid".
    else if (f.includes('diesel') || f.includes('common rail') || f.includes('tdi') || f.includes('crdi')) parts.push('Diesel');
    else if (f.includes('hydrogen')) parts.push('Hydrogen');
    else parts.push('Gasoline'); // Default to Gasoline for standard engines

    // specific check: if hybrid, it's Hybrid. 
    // If it mentions both diesel and hybrid, it's Hybrid (Diesel) effectively, but let's stick to "Hybrid" or "Diesel Hybrid"?
    // User wants "Electric OR Diesel OR Hybrid".
    // I'll return the simpler single category if possible. Prioritize Electric > Hybrid > Diesel > Gasoline.
    
    if (f.includes('electric') && !f.includes('hybrid')) return 'Electric';
    if (f.includes('hybrid') || f.includes('phev') || f.includes('mhev')) return 'Hybrid';
    if (f.includes('diesel') || f.includes('common rail')) return 'Diesel';
    if (f.includes('hydrogen')) return 'Hydrogen';
    return 'Gasoline';
}

// Main processing
function processFiles() {
    try {
        if (!fs.existsSync(dataDir)) {
            console.error('Data directory not found!');
            return;
        }

        const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.csv'));
        const allVehicles = [];

        console.log(`Processing ${files.length} files...`);

        for (const file of files) {
            const filePath = path.join(dataDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const lines = content.split(/\r?\n/).filter(l => l.trim().length > 0);
            
            if (lines.length < 2) continue;

            const headerRaw = parseCSVLine(lines[0]);
            const header = headerRaw.map(h => h.toLowerCase().trim());
            
            // Identify columns (flexible)
            const idxBrand = header.findIndex(h => h === 'brand');
            const idxModel = header.findIndex(h => h === 'model');
            const idxGen = header.findIndex(h => h === 'generation');
            const idxEngine = header.findIndex(h => h === 'engine');
            const idxFuel = header.findIndex(h => h === 'fuel' || h === 'fuel type');
            const idxDrive = header.findIndex(h => h.includes('drive'));
            const idxGearbox = header.findIndex(h => h.includes('gear'));
            const idxType = header.findIndex(h => h === 'type'); // in case we run it again

            if (idxBrand === -1 || idxModel === -1) {
                console.warn(`Skipping ${file}: Missing essential columns.`);
                continue;
            }

            // Map: ID string -> Object
            // ID = Brand + Model + CleanedGeneration
            const vehicleMap = new Map();

            for (let i = 1; i < lines.length; i++) {
                const row = parseCSVLine(lines[i]);
                if (row.length < 2) continue;

                const brand = row[idxBrand] || file.replace('.csv', '');
                const model = row[idxModel];
                let gen = idxGen !== -1 ? row[idxGen] : '';

                // Clean Generation string
                if (gen) {
                    gen = gen.replace(/photos,?|engines,?|full specs|&/gi, '').trim(); // Remove "Photos", "engines", "full specs"
                    gen = gen.replace(/\s+/g, ' ').trim();
                }

                // ID key
                const key = `${brand}|${model}|${gen}`.toLowerCase();
                
                if (!vehicleMap.has(key)) {
                    vehicleMap.set(key, {
                        brand,
                        model,
                        generation: gen,
                        type: idxType !== -1 ? row[idxType] : inferType(model, gen),
                        engines: new Set(),
                        fuels: new Set(),
                        drives: new Set(),
                        gearboxes: new Set()
                    });
                }
                
                const entry = vehicleMap.get(key);
                
                // Aggregate info
                if (idxEngine !== -1 && row[idxEngine]) entry.engines.add(row[idxEngine]);
                // Only keep simplified fuel for clean filtering as requested
                if (idxFuel !== -1 && row[idxFuel]) {
                     let simp = simplifyFuel(row[idxFuel]);
                     if (simp === 'Gasoline') simp = 'Gas'; // User preference
                     if (simp) entry.fuels.add(simp);
                }
            }

            // Convert map to list and overwrite CSV
            const newRows = [];
            // STRICT User Request: Brand, Model, Generation, Type
            // Fuel removed by user request
            const newHeader = ['Brand', 'Model', 'Generation', 'Type'];
            newRows.push(newHeader.join(','));

            for (const v of vehicleMap.values()) {
                const fuelStr = Array.from(v.fuels).join(', '); // Still calculated but not used in CSV? Or just remove column?
                // User said "remove the fuel", I will remove it from output.

                newRows.push([
                    escapeCSV(v.brand),
                    escapeCSV(v.model),
                    escapeCSV(v.generation),
                    escapeCSV(v.type)
                ].join(','));

                // Add to JSON list
                // Extract Year for internal sorting/logic even if not in CSV?
                // User said "make those changes to the data all of it". 
                // I will keep YearInferred in JSON for "New/Old" sorting but CSV is clean.
                let yearStart = null;
                let yearEnd = null;
                const m = v.generation.match(/(\d{4})(?:\s*-\s*(\d{4})|(?:\s*-\s*)?(?![0-9]))/);
                if (m) {
                    yearStart = parseInt(m[1], 10);
                    if (m[2]) yearEnd = parseInt(m[2], 10);
                }

                // ID Generation: Brand + Model + Generation -> Slugify -> Deduplicate tokens
                // e.g. "Acura Acura MDX 2025 Acura MDX" -> "acura-mdx-2025"
                const rawId = `${v.brand} ${v.model} ${v.generation}`.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
                const uniqueTokens = [...new Set(rawId.split(/\s+/))];
                const cleanId = uniqueTokens.join('-');

                allVehicles.push({
                    id: cleanId,
                    brand: v.brand,
                    model: v.model,
                    generation: v.generation,
                    type: v.type, 
                    // fuel: fuelStr, // Removed by user request
                    yearStart: yearStart || 0,
                    // yearEnd removed by user request
                    image: '' 
                });
            }

            // Write Cleaned CSV
            fs.writeFileSync(filePath, newRows.join('\n'));
            console.log(`Updated ${file}: ${vehicleMap.size} consolidated entries.`);
        }

        // Write vehicles.json
        console.log(`Attempting to write to: ${outputFile}`);
        fs.writeFileSync(outputFile, JSON.stringify(allVehicles, null, 2));
        if (fs.existsSync(outputFile)) {
             console.log(`Success: File exists at ${outputFile}`);
             console.log(`Size: ${fs.statSync(outputFile).size} bytes`);
        } else {
             console.error(`FAILURE: File does not exist after write at ${outputFile}`);
        }
        console.log(`Generated vehicles.json with ${allVehicles.length} total vehicles.`);

    } catch (err) {
        console.error('Error:', err);
    }
}

processFiles();
