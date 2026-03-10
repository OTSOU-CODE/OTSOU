const fs = require('fs');
const path = require('path');

const vehicleDataFile = path.join(__dirname, '../JS/vehicles_data.js');
const fileContent = fs.readFileSync(vehicleDataFile, 'utf8');

const match = fileContent.match(/export const VEHICLES_DATA = ({[\s\S]*});/);
if (!match) {
    console.error('Could not parse VEHICLES_DATA');
    process.exit(1);
}

let VEHICLES_DATA;
eval(`VEHICLES_DATA = ${match[1]}`);

let vehicleData = [];
for (const brand in VEHICLES_DATA) {
    for (const model in VEHICLES_DATA[brand]) {
        vehicleData.push({
            brand,
            model,
            // Pre-calculate lowercased values for optimization
            searchString: `${brand.toLowerCase()} ${model.toLowerCase()}`
        });
    }
}

// Modify the baseline vehicleData to not have searchString for fair comparison to original code
let baseVehicleData = vehicleData.map(v => ({brand: v.brand, model: v.model}));

const servicesData = [
    { name: "Leather Restoration", type: "service", url: 'category.html?q=leather' },
    { name: "Seat Repair", type: "service", url: 'category.html?q=seat' },
    { name: "Dashboard Restoration", type: "service", url: 'category.html?q=dashboard' },
    { name: "Custom Stitching", type: "service", url: 'category.html?q=custom' },
    { name: "Headliner Replacement", type: "service", url: 'category.html?q=roof' },
    { name: 'Contact Us', type: 'page', url: '#contact' },
    { name: 'About Us', type: 'page', url: '#why-choose-us' },
    { name: 'Our Work', type: 'page', url: 'gallery.html' }
];

// Unoptimized search (Original)
function unoptimizedSearch(query) {
    const q = query.toLowerCase(); // simulate how query is handled
    const vehicleMatches = baseVehicleData.filter((v) =>
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q)
    ).slice(0, 3);

    const serviceMatches = servicesData.filter((s) =>
        s.name.toLowerCase().includes(q)
    ).slice(0, 3);

    return { vehicleMatches, serviceMatches };
}

// Optimization strategy 3: same as 2, but combine brand and model to avoid checking two fields
function preCalcData2() {
    for (let i = 0; i < baseVehicleData.length; i++) {
        baseVehicleData[i]._searchString = `${baseVehicleData[i].brand.toLowerCase()} ${baseVehicleData[i].model.toLowerCase()}`;
    }
    for (let i = 0; i < servicesData.length; i++) {
         servicesData[i]._searchString = servicesData[i].name.toLowerCase();
    }
}
preCalcData2();

function optimizedSearch3(query) {
    const q = query.toLowerCase();

    const vehicleMatches = [];
    for (let i = 0; i < baseVehicleData.length; i++) {
        const v = baseVehicleData[i];
        if (v._searchString.includes(q)) {
            vehicleMatches.push(v);
            if (vehicleMatches.length === 3) break;
        }
    }

    const serviceMatches = [];
    for (let i = 0; i < servicesData.length; i++) {
        const s = servicesData[i];
        if (s._searchString.includes(q)) {
            serviceMatches.push(s);
            if (serviceMatches.length === 3) break;
        }
    }

    return { vehicleMatches, serviceMatches };
}


// Benchmark
const queries = ['hon', 'mercedes', 'a', 'x', 'leather', 'custom', 'notfoundquery'];
const iterations = 10000;

console.log('\n--- Unoptimized ---');
console.time('Unoptimized');
for (let i = 0; i < iterations; i++) {
    for (const q of queries) {
        unoptimizedSearch(q);
    }
}
console.timeEnd('Unoptimized');

console.log('\n--- Optimized 3 (Early Exit + Combined Pre-calc search string) ---');
console.time('Optimized 3');
for (let i = 0; i < iterations; i++) {
    for (const q of queries) {
        optimizedSearch3(q);
    }
}
console.timeEnd('Optimized 3');
