const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/ELECTRO-RIMO/.gemini/antigravity/brain/3de6ce7e-dc58-4c48-955e-c5fa1b722241/';
const destDir = 'C:/Users/ELECTRO-RIMO/Desktop/Lively Website/Sherif-Bach/images/CAR Models/';
const map = {
  'dacia_logan_mcv_i_1771980322868.png': 'Dacia Logan MCV I.png',
  'dacia_logan_pick_up_1771980340622.png': 'Dacia Logan Pick-Up.png',
  'dacia_spring_1771980357088.png': 'Dacia Spring (Electric).png',
  'dacia_jogger_1771980374992.png': 'Dacia Jogger.png',
  'dacia_bigster_1771980443193.png': 'Dacia Bigster.png'
};

// Copy files
for (const [src, dest] of Object.entries(map)) {
  const srcPath = path.join(srcDir, src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(destDir, dest));
  }
}

// Update database
let db = fs.readFileSync('JS/vehicles_data.js', 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = db.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
let data = JSON.parse(jsonStr);
let count = 0;
const modelsToLink = [
  'Dacia Logan MCV I',
  'Dacia Logan Pick-Up',
  'Dacia Spring (Electric)',
  'Dacia Jogger',
  'Dacia Bigster'
];

data['Dacia'].forEach(v => {
  if (modelsToLink.includes(v.model)) {
    v.image = 'images/CAR Models/' + v.model + '.png';
    count++;
  }
});
fs.writeFileSync('JS/vehicles_data.js', prefix + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully linked ' + count + ' Dacia images in DB.');

// Clean up prompt file
let content = fs.readFileSync('CARS Prompts/Dacia_prompts.txt', 'utf8');
let lines = content.split('\n');
let modifiedLines = [];
let skipMode = false;
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.startsWith('### PROMPT FOR: ')) {
    let match = false;
    for (const model of modelsToLink) {
      if (line.includes(model)) {
        match = true;
        break;
      }
    }
    
    if (match) {
      skipMode = true; 
      removedCount++;
      if (modifiedLines.length > 0 && modifiedLines[modifiedLines.length - 1].startsWith('----')) {
        modifiedLines.pop();
      }
      continue;
    } else {
      skipMode = false;
    }
  }

  if (!skipMode) {
    modifiedLines.push(line);
  }
}

// Write the file back
fs.writeFileSync('CARS Prompts/Dacia_prompts.txt', modifiedLines.join('\n'), 'utf8');
console.log(`Successfully removed ${removedCount} prompt blocks from the file.`);
