const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '../JS/vehicles_data.js');
let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
const data = JSON.parse(jsonStr);

let entriesWith2 = 0;
for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        if (vehicle.model.includes('(2)') || vehicle.image.includes('(2)')) {
            console.log(`- ${brand}: ${vehicle.model} (Image: ${vehicle.image})`);
            entriesWith2++;
        }
    });
}
console.log(`Total entries with (2): ${entriesWith2}`);
