const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const indexPath = path.join(buildDir, 'index.html');

function generateIndexPage() {
    // Read all HTML files in the build directory
    fs.readdir(buildDir, (err, files) => {
        if (err) {
            console.error('Error reading build directory:', err);
            return;
        }

        // Filter for HTML files and create links for each
        const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
        const links = htmlFiles.map(file => `<li><a href="./${file}">${file.replace('.html', '')}</a></li>`).join('\n');

        // HTML content for the index page
        const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template Index</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; }
          h1 { color: #333; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 0.5rem 0; }
          a { text-decoration: none; color: #007bff; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Email Templates</h1>
        <ul>
          ${links || '<li>No templates found.</li>'}
        </ul>
      </body>
      </html>
    `;

        // Write the HTML content to index.html in the build directory
        fs.writeFile(indexPath, htmlContent, 'utf-8', err => {
            if (err) {
                console.error('Error writing index.html:', err);
            } else {
                console.log('Index page generated successfully!');
            }
        });
    });
}

// Run the function to generate the index page
generateIndexPage();
