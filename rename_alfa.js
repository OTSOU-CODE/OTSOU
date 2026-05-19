const fs = require('fs');
const path = require('path');

const dir = 'images/CAR Models/';
const map = {
  '1onr2v1onr2v1onr': 'Alfa Romeo Giulietta (Type 940)',
  'h2jupgh2jupgh2ju': 'Alfa Romeo 159',
  'ihztrbihztrbihzt': 'Alfa Romeo Tonale',
  'ihztrbihztrbihzt (1)': 'Alfa Romeo 155', // Duplicate used for another distinct car
  'qpp4w8qpp4w8qpp4': 'Alfa Romeo 164',
  'sk0786sk0786sk07': 'Alfa Romeo 145 - 146',
  'u00n9bu00n9bu00n': 'Alfa Romeo GTV - Spider (Type 916)',
  'vrwptdvrwptdvrwp': 'Alfa Romeo Stelvio',
  'x0qcf3x0qcf3x0qc': 'Alfa Romeo Junior (Milano)',
  'x4zyc5x4zyc5x4zy': 'Alfa Romeo 156',
  'yyikw1yyikw1yyik': 'Alfa Romeo Giulia (Type 952)'
};

let db = fs.readFileSync('JS/vehicles_data.js', 'utf8');
const prefix = '// Auto-generated vehicle data\nexport const VEHICLES_DATA = ';
let jsonStr = db.slice(prefix.length);
if (jsonStr.trim().endsWith(';')) jsonStr = jsonStr.trim().slice(0, -1);
let data = JSON.parse(jsonStr);
let count = 0;

for (const [hash, safeName] of Object.entries(map)) {
  const oldFile = path.join(dir, 'Gemini_Generated_Image_' + hash + '.png');
  const newFile = path.join(dir, safeName + '.png');
  
  if (fs.existsSync(oldFile)) {
    fs.renameSync(oldFile, newFile);
  } else {
    console.warn("Could not find:", oldFile);
  }

  // Handle the slashes which exist in the db model names but not the file names
  // e.g. "Alfa Romeo 145 / 146" -> file is "Alfa Romeo 145 - 146"
  let modelName = safeName.replace(' - ', ' / ');
  
  // Link to db
  if (data['Alfa Romeo']) {
    data['Alfa Romeo'].forEach(v => {
      // Direct match or sanitized match
      if (v.model === modelName || v.model === safeName) {
        v.image = 'images/CAR Models/' + safeName + '.png';
        count++;
      }
    });
  }
}

fs.writeFileSync('JS/vehicles_data.js', prefix + JSON.stringify(data, null, 2) + ';\n');
console.log('Successfully renamed and linked ' + count + ' Alfa Romeo images.');
