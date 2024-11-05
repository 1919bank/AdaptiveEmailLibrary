const fs = require('fs');
const juice = require('juice');

const folderPath = './build';
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file) => {
        if (file.endsWith('.html')) {
            const filePath = `${folderPath}/${file}`;
            const htmlContent = fs.readFileSync(filePath, 'utf8');
            const inlinedHtml = juice(htmlContent);

            fs.writeFileSync(filePath, inlinedHtml, 'utf8');
            console.log(`Styles inlined for ${file}`);
        }
    });
});
