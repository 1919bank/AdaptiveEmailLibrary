const fs = require('fs');
const path = require('path');
const juice = require('juice');

const buildDir = path.join(__dirname, 'build');

// Function to inline CSS for each HTML file in the build directory
function inlineStyles() {
    fs.readdir(buildDir, (err, files) => {
        if (err) {
            console.error('Error reading build directory:', err);
            return;
        }

        // Filter for HTML files
        const htmlFiles = files.filter(file => file.endsWith('.html'));

        htmlFiles.forEach(file => {
            const filePath = path.join(buildDir, file);

            // Read the HTML file content
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                // Inline styles using juice
                const inlinedHtml = juice(data);

                // Write the inlined HTML back to the file
                fs.writeFile(filePath, inlinedHtml, 'utf-8', err => {
                    if (err) {
                        console.error(`Error writing file ${file}:`, err);
                    } else {
                        console.log(`Successfully inlined styles for ${file}`);
                    }
                });
            });
        });
    });
}

// Run the function
inlineStyles();
