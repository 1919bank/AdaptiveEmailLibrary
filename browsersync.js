// browsersync.js
const browserSync = require('browser-sync').create();
const path = require('path');

const buildDir = path.join(__dirname, 'build');

browserSync.init({
    server: buildDir,
    files: [`${buildDir}/*.html`],  // Watch for changes in HTML files
    open: false,                    // Set to true to automatically open the browser
    port: 3000,                      // Set a custom port if needed
    notify: false                    // Disable the notification popup
});

// Reload browser on changes to CSS/JS (if you add them in the future)
browserSync.watch(`${buildDir}/**/*`).on('change', browserSync.reload);
