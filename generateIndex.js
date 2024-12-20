const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const emailsDir = path.join(buildDir, 'emails');
const indexPath = path.join(buildDir, 'index.html');

function generateIndexPage() {
    // Read all HTML files in the emails directory
    fs.readdir(emailsDir, (err, files) => {
        if (err) {
            console.error('Error reading emails directory:', err);
            return;
        }

        // Filter for HTML files
        const htmlFiles = files.filter(file => file.endsWith('.html'));

        // Generate template cards dynamically
        // const templateCards = htmlFiles
        //     .map(file => {
        //         const templateName = file.replace('.html', '');
        //         return `
                    // <div class="col-md-4 mb-4">
                    //     <div class="card">
                    //         <div class="card-body">
                    //             <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="${templateName} Template">
                    //             <h5 class="card-title">${templateName}</h5>
                    //             <p class="card-text">This is the ${templateName} email template. Perfect for various use cases.</p>
                    //             <a href="./emails/${file}" class="btn btn-card">Preview</a>
                    //             <a href="./emails/${file}" download class="btn btn-card">Download</a>
                    //         </div>
                    //     </div>
                    // </div>
        //         `;
        //     })
        //     .join('\n');

        // HTML content for the index page
        const htmlContent = `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="theme-color" content="#3498db">
    <meta name="description" content="Responsive Email Templates Dashboard - Download customizable HTML email templates">
    <meta name="keywords" content="email templates, responsive email, HTML email">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Email Templates Dashboard</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --dark-color: #2c3e50;
            --light-color: #ecf0f1;
            --text-color: #34495e;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--light-color);
        }

        /* Modern Navbar */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 5%;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--dark-color);
            text-decoration: none;
        }

        .navbar-toggler {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }

        .navbar-toggler-icon {
            display: block;
            width: 24px;
            height: 2px;
            background-color: var(--dark-color);
            position: relative;
            transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before,
        .navbar-toggler-icon::after {
            content: '';
            position: absolute;
            width: 24px;
            height: 2px;
            background-color: var(--dark-color);
            transition: all 0.3s ease;
        }

        .navbar-toggler-icon::before {
            top: -6px;
        }

        .navbar-toggler-icon::after {
            bottom: -6px;
        }

        .navbar-nav {
            display: flex;
            align-items: center;
            list-style: none;
        }

        .nav-item {
            margin-left: 1.5rem;
        }

        .nav-link {
            text-decoration: none;
            color: var(--text-color);
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .nav-link:hover {
            color: var(--primary-color);
        }

        @media (max-width: 991px) {
            .navbar-toggler {
                display: block;
            }

            .navbar-collapse {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                padding: 1rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }

            .navbar-collapse.show {
                display: block;
            }

            .navbar-nav {
                flex-direction: column;
                align-items: flex-start;
            }

            .nav-item {
                margin: 0.5rem 0;
                width: 100%;
            }

            .nav-link {
                display: block;
                padding: 0.5rem 0;
            }

            .btn-main {
                width: 100%;
                text-align: center;
                margin-top: 1rem;
            }
        }

        .btn-main {
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-main:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        /* Header Section */
        .header-section {
            text-align: center;
            padding: 4rem 1rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .header-section h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            font-weight: 800;
        }

        .header-section p {
            max-width: 700px;
            margin: 0 auto 2rem;
            opacity: 0.9;
        }

        /* Template Cards */
        .template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            padding: 3rem 5%;
        }

        .template-previews-section {
            padding: 3rem 0;
        }

        .card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .card-img-top {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .card-body {
            padding: 1.5rem;
        }

        .card-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: var(--dark-color);
        }

        .btn-card {
            display: inline-block;
            background-color: var(--secondary-color);
            color: white;
            padding: 0.5rem 1rem;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 1rem;
            transition: background-color 0.3s ease;
        }

        .btn-card:hover {
            background-color: var(--primary-color);
        }

        /* Modern Footer Styles */
        .footer {
            background-color: var(--dark-color);
            color: var(--light-color);
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .footer-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
        }

        .footer-column {
            flex: 1;
            margin: 20px;
            min-width: 200px;
        }

        .footer-logo {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: white;
        }

        .footer-description {
            color: rgba(255,255,255,0.7);
            margin-bottom: 1.5rem;
        }

        .social-icons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .social-icon {
            color: white;
            font-size: 1.5rem;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .social-icon:hover {
            color: var(--primary-color);
        }

        .footer-links {
            list-style: none;
            padding: 0;
        }

        .footer-links li {
            margin-bottom: 0.75rem;
        }

        .footer-links a {
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: white;
            text-decoration: underline;
        }

        .footer-title {
            color: white;
            font-weight: 600;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        @media (max-width: 768px) {
            .footer-content {
                flex-direction: column;
                align-items: center;
            }

            .footer-column {
                margin: 1rem 0;
            }
        }

        .how-to-use-section {
            padding: 3rem 0;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--dark-color);
        }

        .section-description {
            font-size: 1rem;
            color: var(--text-color);
            margin-bottom: 1.5rem;
        }

        .btn-main {
            background-color: var(--primary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-main:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
            .why-choose {
            padding: 4rem 2rem;
            text-align: center;
        }

        .why-choose h2 {
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #333;
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .feature {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .feature-icon {
            width: 80px;
            height: 80px;
            background-color: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            position: relative;
        }

        .feature-icon::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: var(--primary-color);
            opacity: 0.2;
            border-radius: 50%;
            transform: scale(1.2);
            z-index: -1;
        }

        .feature-icon svg {
            width: 40px;
            height: 40px;
            fill: white;
        }

        .feature h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #333;
        }

        .feature p {
            color: #666;
            max-width: 300px;
            margin: 0 auto;
        }

        .footer {
            background-color: #f8f9fa;
            padding: 4rem 2rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
        }

        .footer-column h4 {
            color: #333;
            margin-bottom: 1.5rem;
            font-size: 1.2rem;
        }

        .footer-links {
            list-style: none;
        }

        .footer-links li {
            margin-bottom: 0.75rem;
        }

        .footer-links a {
            color: #666;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: var(--primary-color);
        }

        .community-icons {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .community-icons img {
            width: 32px;
            height: 32px;
            border-radius: 4px;
        }

        @media (max-width: 768px) {
            .features {
                grid-template-columns: 1fr;
                gap: 2rem;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
        }

        @media (max-width: 768px) {
            .how-to-use-section .row {
                flex-direction: column;
                text-align: center;
            }

            .how-to-use-section .col-md-6 {
                margin-bottom: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#">AELF</a>
        <button class="navbar-toggler" type="button" onclick="toggleNav()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="/resources.html">Resources</a></li>
                <li class="nav-item"><a class="nav-link" href="/docs.html">Docs</a></li>
                <li class="nav-item"><a class="nav-link btn btn-main" href="/getting-started.html">Getting Started</a></li>
            </ul>
        </div>
    </nav>

    <script>
        function toggleNav() {
            const navbarCollapse = document.getElementById('navbarNav');
            navbarCollapse.classList.toggle('show');
        }
    </script>

                <!-- Header Section -->
                <div class="header-section">
                    <h1>Responsive Email Templates</h1>
                    <p>Get 6 ultra-customizable responsive HTML email templates. Download all the templates and get free tutorials on responsive email design, development, and marketing strategy.</p>
                    <a href="https://github.com/1919bank/AdaptiveEmailLibrary/tree/main/build/emails" class="btn btn-main">Download</a>
                </div>

                <!-- Template Previews Section -->
                <section class="template-previews-section">
                    <div class="container mt-5">
                        <div class="row text-center">
                            <!-- Card 1 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Inquire Template">
                                        <h5 class="card-title">Inquire</h5>
                                        <p class="card-text">This is the Inquire email template. Perfect for various use cases.</p>
                                        <a href="./emails/inquire.html" class="btn btn-card" aria-label="Preview Inquire Template">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/inquire.html" download class="btn btn-card" aria-label="Download Inquire Template">Download</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card 2 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Template 2">
                                        <h5 class="card-title">Template 2</h5>
                                        <p class="card-text">Description for Template 2.</p>
                                        <a href="./emails/template2.html" class="btn btn-card" aria-label="Preview Template 2">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/template2.html" download class="btn btn-card" aria-label="Download Template 2">Download</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card 3 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Template 3">
                                        <h5 class="card-title">Template 3</h5>
                                        <p class="card-text">Description for Template 3.</p>
                                        <a href="./emails/template3.html" class="btn btn-card" aria-label="Preview Template 3">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/template3.html" download class="btn btn-card" aria-label="Download Template 3">Download</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card 4 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Template 4">
                                        <h5 class="card-title">Template 4</h5>
                                        <p class="card-text">Description for Template 4.</p>
                                        <a href="./emails/template4.html" class="btn btn-card" aria-label="Preview Template 4">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/template4.html" download class="btn btn-card" aria-label="Download Template 4">Download</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card 5 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Template 5">
                                        <h5 class="card-title">Template 5</h5>
                                        <p class="card-text">Description for Template 5.</p>
                                        <a href="./emails/template5.html" class="btn btn-card" aria-label="Preview Template 5">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/template5.html" download class="btn btn-card" aria-label="Download Template 5">Download</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Card 6 -->
                            <div class="col-md-4 mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <img src="https://via.placeholder.com/150" class="card-img-top mb-3" alt="Template 6">
                                        <h5 class="card-title">Template 6</h5>
                                        <p class="card-text">Description for Template 6.</p>
                                        <a href="./emails/template6.html" class="btn btn-card" aria-label="Preview Template 6">Preview</a>
                                        <a href="https://github.com/1919bank/AdaptiveEmailLibrary/blob/main/build/template6.html" download class="btn btn-card" aria-label="Download Template 6">Download</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- How to Use Section -->
                <section class="how-to-use-section">
                    <div class="container how-to-use-section">
                        <div class="row align-items-center">
                            <!-- Text Column -->
                            <div class="col-md-6">
                                <h2 class="section-title">How to Use Our Email Templates</h2>
                                <p class="section-description">
                                    Our email templates are designed to be easy to use and customize. Follow our step-by-step guide to integrate them into your email marketing strategy and enhance your communication with clients.
                                </p>
                                <a href="#" class="btn btn-main">Learn More</a>
                            </div>
                            <!-- Image Column -->
                            <div class="col-md-6">
                                <img src="https://via.placeholder.com/500" alt="How to use email templates" class="img-fluid">
                            </div>
                        </div>
                    </div>
                </section>

     <section class="why-choose">
        <h2>Why choose Adaptive Email Library Framework?</h2>
        <div class="features">
            <div class="feature">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                </div>
                <h3>Easy and quick</h3>
                <p>Write less code, save time and code more efficiently with Adaptive Email Library Framework's semantic syntax.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
                    </svg>
                </div>
                <h3>Responsive</h3>
                <p>Adaptive Email Library Framework is responsive by design on most popular email clients, even Outlook.</p>
            </div>
            <div class="feature">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M4 11h4c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1zm10 0h4c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1zM4 21h4c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1zm10 0h4c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z"/>
                    </svg>
                </div>
                <h3>Component based</h3>
                <p>Write high-level code thanks to reusable and extensible components.</p>
            </div>
        </div>
    </section>

                <!-- Footer -->
                <footer class="footer">
                    <div class="footer-content">
                        <div class="footer-column">
                            <h4>DISCOVER</h4>
                            <ul class="footer-links">
                                <li><a href="#">Homepage</a></li>
                                <li><a href="#">Try it live</a></li>
                                <li><a href="#">Documentation</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>ABOUT ARET</h4>
                            <ul class="footer-links">
                                <li><a href="#">Resources</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">About</a></li>
                            </ul>
                        </div>
                        <div class="footer-column">
                            <h4>JOIN THE COMMUNITY</h4>
                            <ul class="footer-links">
                                <li><a href="#">Join the slack community</a></li>
                                <li><a href="#">Support the open source project</a></li>
                                <li><a href="https://github.com/1919bank/AdaptiveEmailLibrary">Github</a></li>
                            </ul>
                            <div class="community-icons">
                                <img src="/placeholder.svg?height=32&width=32" alt="Community member 1">
                                <img src="/placeholder.svg?height=32&width=32" alt="Community member 2">
                                <img src="/placeholder.svg?height=32&width=32" alt="Community member 3">
                                <img src="/placeholder.svg?height=32&width=32" alt="Community member 4">
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
            </html>
        `;

        // Write the HTML content to index.html in the build directory
        fs.writeFile(indexPath, htmlContent, 'utf-8', err => {
            if (err) {
                console.error('Error writing index.html:', err);
            } else {
                console.log('index.html generated successfully.');
            }
        });
    });
}

// Run the function to generate the index page
generateIndexPage();
