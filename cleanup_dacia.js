const fs = require('fs');
let content = fs.readFileSync('images/all_car_prompts.txt', 'utf8');

// The car models we just generated
const modelsToRemove = [
  'Dacia 1325 Liberta',
  'Dacia Nova',
  'Dacia SupeRNova',
  'Dacia Solenza'
];

let lines = content.split('\n');
let modifiedLines = [];
let skipMode = false;
let removedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.startsWith('### PROMPT FOR: ')) {
    let match = false;
    for (const model of modelsToRemove) {
      if (line.includes(model)) {
        match = true;
        break;
      }
    }
    
    if (match) {
      skipMode = true; // start skipping this whole block
      removedCount++;
      // Also remove the preceding dashed line if it exists
      if (modifiedLines.length > 0 && modifiedLines[modifiedLines.length - 1].startsWith('----')) {
        modifiedLines.pop();
      }
      continue;
    } else {
      skipMode = false; // stop skipping since we hit a new, non-matching prompt
    }
  }

  if (!skipMode) {
    modifiedLines.push(line);
  }
}

fs.writeFileSync('images/all_car_prompts.txt', modifiedLines.join('\n'), 'utf8');
console.log(`Successfully removed ${removedCount} prompt blocks.`);
