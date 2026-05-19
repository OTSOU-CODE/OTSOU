const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images/CAR Models');
const dataFile = path.join(__dirname, '../JS/vehicles_data.js');
const outputFile = path.join(__dirname, '../mismatched_assets.txt');

// Helper to load data
let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
const data = JSON.parse(jsonStr);

const imagesInFolder = new Set(fs.readdirSync(imgDir).filter(file => /\.(png|jpeg|jpg)$/i.test(file)));

const referencedImages = new Set();
const missingImages = []; // broken links or placeholders

for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        const imgPath = vehicle.image;
        if (!imgPath || imgPath === 'images/placeholder.jpg') {
            missingImages.push(`${brand} ${vehicle.model} (Placeholder)`);
        } else if (imgPath.startsWith('images/CAR Models/')) {
            const fileName = imgPath.replace('images/CAR Models/', '');
            if (imagesInFolder.has(fileName)) {
                referencedImages.add(fileName);
            } else {
                missingImages.push(`${brand} ${vehicle.model} (Missing file: ${fileName})`);
            }
        } else {
            missingImages.push(`${brand} ${vehicle.model} (Invalid path: ${imgPath})`);
        }
    });
}

const unassociatedImages = [...imagesInFolder].filter(img => !referencedImages.has(img)).sort();

let output = `### IMAGES NOT ASSOCIATED WITH A CARD ###\n`;
unassociatedImages.forEach(img => output += `${img}\n`);

output += `\n### CARDS MISSING AN IMAGE ###\n`;
missingImages.sort().forEach(item => output += `${item}\n`);

fs.writeFileSync(outputFile, output, 'utf8');
console.log(`Created ${outputFile}`);
