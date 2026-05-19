const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images/CAR Models');
const dataFile = path.join(__dirname, '../JS/vehicles_data.js');

if (!fs.existsSync(imgDir)) {
  console.error(`Image directory not found: ${imgDir}`);
  process.exit(1);
}

const images = fs.readdirSync(imgDir).filter(file => /\.(png|jpeg|jpg)$/i.test(file));
console.log(`Found ${images.length} images in ${imgDir}`);

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\d{12}/g, '')
        .replace(/\b(studio|8k|recharge|electric|type|gen|generation)\b/gi, '')
        .replace(/ \.jpeg$/i, '.jpeg')
        .replace(/[^a-z0-9]/g, '')
        .trim();
}

const imageMap = new Map();
images.forEach(img => {
    const nameWithoutExt = path.parse(img).name;
    const normalized = normalize(nameWithoutExt);
    if (!imageMap.has(normalized)) {
        imageMap.set(normalized, img);
    }
});

let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
let data = JSON.parse(jsonStr);

let updateCount = 0;
let totalCount = 0;

for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        totalCount++;
        if (vehicle.image && !vehicle.image.includes('placeholder.jpg')) return;

        let foundImage = null;
        const normalizedModel = normalize(vehicle.model);
        const normalizedBrandModel = normalize(`${brand} ${vehicle.model}`);
        const normalizedOrig = normalize(vehicle.originalData?.model_name);
        const normalizedBrandOrig = vehicle.originalData?.model_name ? normalize(`${brand} ${vehicle.originalData.model_name}`) : null;

        const candidates = [normalizedBrandModel, normalizedModel, normalizedBrandOrig, normalizedOrig].filter(Boolean);

        // 1. Exact normalized matches
        for (const c of candidates) {
            if (imageMap.has(c)) {
                foundImage = imageMap.get(c);
                break;
            }
        }

        // 2. Partial matches (more aggressive)
        if (!foundImage) {
            for (const [normImg, origImg] of imageMap.entries()) {
                if (normImg.length < 3) continue; // avoid tiny accidental matches
                for (const c of candidates) {
                    if (c.includes(normImg) || normImg.includes(c)) {
                        foundImage = origImg;
                        break;
                    }
                }
                if (foundImage) break;
            }
        }

        if (foundImage) {
            vehicle.image = `images/CAR Models/${foundImage}`;
            updateCount++;
        }
    });
}

const newContent = prefix + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(dataFile, newContent, 'utf8');

console.log(`Successfully updated ${updateCount} vehicles with new images.`);
console.log(`Total vehicles in database: ${totalCount}`);
