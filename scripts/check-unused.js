const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images/CAR Models');
const dataFile = path.join(__dirname, '../JS/vehicles_data.js');

const imagesArr = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') || f.endsWith('.jpeg') || f.endsWith('.jpg'));
const images = new Set(imagesArr);

let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
let data = JSON.parse(jsonStr);

let usedImages = new Set();
for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        if (vehicle.image.startsWith('images/CAR Models/')) {
            usedImages.add(path.basename(vehicle.image));
        }
    });
}

const unusedImages = [...images].filter(img => !usedImages.has(img));
console.log(`Unused images (${unusedImages.length}):`);
unusedImages.forEach(img => console.log(img));
