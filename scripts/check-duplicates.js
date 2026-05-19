const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../JS/vehicles_data.js');
let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
const data = JSON.parse(jsonStr);

const modelMap = new Map();
const duplicates = [];

for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        const key = `${brand}|${vehicle.model}`.toLowerCase();
        if (modelMap.has(key)) {
            duplicates.push({ brand, model: vehicle.model, id: vehicle.id });
        } else {
            modelMap.set(key, vehicle.id);
        }
    });
}

console.log(`Found ${duplicates.length} duplicate model entries (same brand+model).`);
duplicates.sort((a, b) => a.brand.localeCompare(b.brand)).forEach(d => {
    console.log(`- ${d.brand}: ${d.model} (ID: ${d.id})`);
});
