const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../images/CAR Models');
const dataFile = path.join(__dirname, '../JS/vehicles_data.js');

if (!fs.existsSync(imgDir)) {
    console.error(`Image directory not found: ${imgDir}`);
    process.exit(1);
}

// 1. Identify files to delete
const filesToDelete = fs.readdirSync(imgDir).filter(file => /\s\([23]\)\.(png|jpeg|jpg)$/i.test(file));
console.log(`Found ${filesToDelete.length} files to delete.`);

// 2. Update vehicles_data.js
let dbContent = fs.readFileSync(dataFile, 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = dbContent.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
const data = JSON.parse(jsonStr);

let updateCount = 0;
for (const [brand, vehicles] of Object.entries(data)) {
    vehicles.forEach(vehicle => {
        if (vehicle.image && /\s\([23]\)\.(png|jpeg|jpg)$/i.test(vehicle.image)) {
            console.log(`Updating reference in card: ${brand} ${vehicle.model} (ID: ${vehicle.id})`);
            const originalImage = vehicle.image.replace(/\s\([23]\)/, '');
            const originalPath = path.join(__dirname, '..', originalImage);
            
            if (fs.existsSync(originalPath)) {
                vehicle.image = originalImage;
                console.log(`  -> Restored to original: ${originalImage}`);
            } else {
                vehicle.image = 'images/placeholder.jpg';
                console.log(`  -> No original found, setting to placeholder.`);
            }
            updateCount++;
        }
    });
}

// 3. Save database
const newContent = prefix + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(dataFile, newContent, 'utf8');
console.log(`Successfully updated ${updateCount} vehicle references in database.`);

// 4. Delete physical files
filesToDelete.forEach(file => {
    const filePath = path.join(imgDir, file);
    try {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
    } catch (e) {
        console.error(`Failed to delete ${file}: ${e.message}`);
    }
});

console.log('Duplicate removal complete.');
