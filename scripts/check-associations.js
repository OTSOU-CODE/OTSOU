const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images/CAR Models');
const dataFile = path.join(__dirname, '../JS/vehicles_data.js');
const reportFile = path.join(__dirname, '../unassociated_assets_report.txt');

if (!fs.existsSync(imgDir)) {
    console.error(`Image directory not found: ${imgDir}`);
    process.exit(1);
}

// 1. Get all images in the folder
const imagesInFolder = new Set(fs.readdirSync(imgDir).filter(file => /\.(png|jpeg|jpg)$/i.test(file)));
console.log(`Found ${imagesInFolder.size} images in ${imgDir}`);

// 2. Parse VEHICLES_DATA
let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
let data;
try {
    data = JSON.parse(jsonStr);
} catch (e) {
    console.error('Error parsing VEHICLES_DATA. Please check for trailing semicolons or format issues.');
    process.exit(1);
}

// 3. Track associations
const referencedImages = new Set();
const cardsWithPlaceholders = [];
const cardsWithBrokenImages = [];

for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        const imgPath = vehicle.image;
        if (!imgPath || imgPath === 'images/placeholder.jpg') {
            cardsWithPlaceholders.push(`${brand} ${vehicle.model} (ID: ${vehicle.id})`);
        } else if (imgPath.startsWith('images/CAR Models/')) {
            const fileName = imgPath.replace('images/CAR Models/', '');
            if (imagesInFolder.has(fileName)) {
                referencedImages.add(fileName);
            } else {
                cardsWithBrokenImages.push(`${brand} ${vehicle.model} (ID: ${vehicle.id}) - Missing: ${fileName}`);
            }
        } else {
            // Some other path
            cardsWithBrokenImages.push(`${brand} ${vehicle.model} (ID: ${vehicle.id}) - Unknown path: ${imgPath}`);
        }
    });
}

// 4. Find unassociated images
const unassociatedImages = [...imagesInFolder].filter(img => !referencedImages.has(img));

// 5. Generate Report
let report = `Asset Association Report - Generated on ${new Date().toLocaleString()}\n`;
report += `======================================================================\n\n`;

report += `SUMMARY:\n`;
report += `- Total images in folder: ${imagesInFolder.size}\n`;
report += `- Total unassociated images: ${unassociatedImages.length}\n`;
report += `- Total cards with placeholder.jpg: ${cardsWithPlaceholders.length}\n`;
report += `- Total cards with broken image links: ${cardsWithBrokenImages.length}\n\n`;

report += `UNASSOCIATED IMAGES (In folder but not referenced in data):\n`;
report += `-----------------------------------------------------------\n`;
if (unassociatedImages.length > 0) {
    unassociatedImages.sort().forEach(img => report += `- ${img}\n`);
} else {
    report += `None. All images are referenced.\n`;
}
report += `\n`;

report += `CAR CARDS WITH PLACEHOLDERS (Referencing placeholder.jpg):\n`;
report += `----------------------------------------------------------\n`;
if (cardsWithPlaceholders.length > 0) {
    cardsWithPlaceholders.sort().forEach(card => report += `- ${card}\n`);
} else {
    report += `None. All cards have non-placeholder images.\n`;
}
report += `\n`;

report += `CAR CARDS WITH BROKEN IMAGE LINKS (Referenced file doesn't exist):\n`;
report += `--------------------------------------------------------------\n`;
if (cardsWithBrokenImages.length > 0) {
    cardsWithBrokenImages.sort().forEach(card => report += `- ${card}\n`);
} else {
    report += `None. All referenced image files exist.\n`;
}

fs.writeFileSync(reportFile, report, 'utf8');
console.log(`Report generated successfully: ${reportFile}`);
console.log(`- Unassociated images: ${unassociatedImages.length}`);
console.log(`- Placeholder cards: ${cardsWithPlaceholders.length}`);
console.log(`- Broken links: ${cardsWithBrokenImages.length}`);
