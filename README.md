Here's a sample README file tailored for your **AdaptiveEmailLibrary** project, including a summary of update release notes for today’s push.

---

# AdaptiveEmailLibrary

A collection of responsive email templates built with MJML, designed for seamless compatibility across major email clients. This library focuses on providing flexible, modular templates for a range of email types, from marketing newsletters to transactional messages, ensuring that your emails look great on any device.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Template Structure](#template-structure)
- [Release Notes](#release-notes)
- [License](#license)

## Overview

**AdaptiveEmailLibrary** is built using MJML, a markup language created by Mailjet for responsive email design. By leveraging MJML, the templates in this library provide a robust structure for delivering beautifully styled emails that adapt seamlessly to different screen sizes. This library includes several core scripts for building, inlining styles, deploying, and previewing templates.

## Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/yourusername/AdaptiveEmailLibrary.git
cd AdaptiveEmailLibrary
```

Then, install the dependencies:

```bash
npm install
```

## Usage

### Building Templates

To compile the MJML templates into HTML, run:

```bash
npm run build
```

This will convert all `.mjml` files in `src/templates` to `.html` files in the `build` directory.

### Inlining Styles

To inline styles for email client compatibility, use the following command:

```bash
npm run inline
```

### Local Preview

To preview the compiled templates in a browser, run:

```bash
npm run serve
```

This will start a local server at `http://127.0.0.1:8080`, where you can view the compiled templates.

### Watching for Changes

For continuous development, use the watch command to recompile templates automatically when changes are detected:

```bash
npm run watch
```

## Scripts

- **`build`**: Compiles MJML files in `src/templates` to HTML in `build`.
- **`inline`**: Applies inline styles to the generated HTML files for email client compatibility.
- **`serve`**: Starts a local server to preview the templates.
- **`watch`**: Watches for changes in the MJML templates and rebuilds automatically.
- **`deploy-template`**: Deploys the templates (customizable for deployment needs).
- **`test-email`**: Sends a test email using Nodemailer and MJML (customizable with ESP or testing configuration).

## Template Structure

The templates are organized in a modular fashion to allow flexibility and easy customization. Each template includes sections like headers, content blocks, and footers, which can be easily customized or reused.

Example template directory structure:

```
AdaptiveEmailLibrary/
├── src/
│   └── templates/
│       ├── welcome.mjml
│       ├── newsletter.mjml
│       └── ...
└── build/
    └── [compiled HTML files]
```

## Release Notes

### Update: November 4, 2024

#### Key Updates
- **MJML Build Fix**: Adjusted the `package.json` build script to ensure correct template compilation. The new build script now directly specifies the template location (`src/templates/*.mjml`) to prevent build errors.
- **New Scripts**: Added `inline` script for inlining styles and `serve` script for local previewing.
- **Documentation Improvements**: Improved usage instructions and modularized README for easier onboarding.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

This README should provide clear guidance on the project’s setup and usage, with release notes highlighting recent improvements. Let me know if you want to add anything specific!