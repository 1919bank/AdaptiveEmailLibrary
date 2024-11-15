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

        // Filter for HTML files (excluding the index.html file)
        const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');

        // Generate template cards dynamically
        const templateCards = htmlFiles
            .map(file => {
                const templateName = file.replace('.html', '');
                return `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="${templateName} Template">
                                <h5 class="card-title">${templateName}</h5>
                                <p class="card-text">This is the ${templateName} email template. Perfect for various use cases.</p>
                                <a href="./${file}" class="btn btn-card">Preview</a>
                                <a href="./${file}" download class="btn btn-card">Download</a>
                            </div>
                        </div>
                    </div>
                `;
            })
            .join('\n');

        // HTML content for the index page
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Responsive Email Templates Dashboard</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    /* Add your CSS styles here */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8f8f8;
                        color: #333333;
                    }
                    .navbar {
                        background-color: #1a1a1a;
                    }
                    .navbar-brand, .navbar-nav .nav-link {
                        color: #ffffff;
                    }
                    .header-section {
                        background-color: #333333;
                        color: #ffffff;
                        padding: 60px 20px;
                        text-align: center;
                    }
                    .header-section h1 {
                        font-size: 36px;
                        font-weight: bold;
                    }
                    .header-section p {
                        font-size: 16px;
                        color: #cccccc;
                    }
                    .btn-main {
                        background-color: #ff5a5f;
                        color: #ffffff;
                        font-weight: bold;
                        padding: 10px 20px;
                        border-radius: 5px;
                    }
                    .card {
                        border: none;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        transition: 0.3s;
                    }
                    .card:hover {
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                    }
                    .card-title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #333333;
                    }
                    .card-text {
                        font-size: 14px;
                        color: #555555;
                    }
                    .btn-card {
                        background-color: #ff5a5f;
                        color: #ffffff;
                        font-weight: bold;
                        border-radius: 5px;
                        margin: 5px;
                    }
                </style>
            </head>
            <body>

                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg">
                    <a class="navbar-brand" href="#">Adaptive Email Library Framework</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Getting Started</a></li>
<!--                            <li class="nav-item"><a class="nav-link" href="#">Inliner</a></li>-->
<!--                            <li class="nav-item"><a class="nav-link" href="#">Email Templates</a></li>-->
                            <li class="nav-item"><a class="nav-link" href="#">Resources</a></li>
                            <li class="nav-item"><a class="nav-link" href="#">Docs</a></li>
                            <li class="nav-item"><a class="nav-link btn btn-main" href="#">Getting Started</a></li>
                        </ul>
                    </div>
                </nav>

                <!-- Header Section -->
                <div class="header-section">
                    <h1>Responsive Email Templates</h1>
                    <p>Get 6 ultra-customizable responsive HTML email templates. Download all the templates and get free tutorials on responsive email design, development, and marketing strategy.</p>
                    <button class="btn btn-main">Download</button>
                </div>

                <!-- Template Previews -->
                <div class="container mt-5">
                    <div class="row text-center">
                        ${templateCards || '<p>No templates found.</p>'}
                    </div>
                </div>

            </body>
            </html>
        `;

        // Write the HTML content to index.html in the build directory
        fs.writeFile(indexPath, htmlContent, 'utf-8', err => {
            if (err) {
                console.error('Error writing index.html:', err);
            } else {
                console.log('Index page with header generated successfully!');
            }
        });
    });
}

// Run the function to generate the index page
generateIndexPage();
