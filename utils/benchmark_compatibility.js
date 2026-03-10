const fs = require('fs');
const path = require('path');

// Simulate the CSV data
const csvPath = path.join(__dirname, '../DATA/vehicles.csv');
let text = '';
try {
  text = fs.readFileSync(csvPath, 'utf8');
} catch (e) {
  // If no CSV, create a dummy one
  for (let i = 0; i < 50000; i++) {
    text += `Brand${i % 100},Model${i}\n`;
  }
}

const lines = text.split('\n').filter(l => l.trim());
const startIndex = lines[0].toLowerCase().includes('brand') ? 1 : 0;

const vehicleData = lines.slice(startIndex).map(line => {
    const cols = line.split(',');
    if (cols.length < 2) return null;
    return {
        brand: cols[0].trim(),
        model: cols[1].trim(),
    };
}).filter(item => item !== null);

const brands = [...new Set(vehicleData.map(v => v.brand))].sort();

// Optimized Implementation Map Setup
console.time('Optimized Map Build');
const brandToModelsMap = new Map();
const tempMap = new Map();
vehicleData.forEach(v => {
    if (!tempMap.has(v.brand)) {
        tempMap.set(v.brand, new Set());
    }
    tempMap.get(v.brand).add(v.model);
});
for (const [brand, modelsSet] of tempMap.entries()) {
    brandToModelsMap.set(brand, [...modelsSet].sort());
}
console.timeEnd('Optimized Map Build');

console.time('Optimized (1000 iterations)');
for (let i = 0; i < 1000; i++) {
    const selectedBrand = brands[i % brands.length];
    const models = brandToModelsMap.get(selectedBrand) || [];
}
console.timeEnd('Optimized (1000 iterations)');
