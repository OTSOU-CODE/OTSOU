const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'DATA');
const outputFile = path.join(dataDir, 'csv_list.json');

fs.readdir(dataDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const csvFiles = files.filter(file => file.endsWith('.csv'));
    
    fs.writeFile(outputFile, JSON.stringify(csvFiles, null, 2), (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log(`Successfully created ${outputFile} with ${csvFiles.length} files.`);
        }
    });
});
