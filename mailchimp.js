const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
    apiKey: 'YOUR_API_KEY',
    server: 'YOUR_SERVER_PREFIX', // e.g. 'us1'
});

async function addTemplate() {
    try {
        const response = await mailchimp.templates.create({
            name: 'New Template',
            html: fs.readFileSync('./build/your-template.html', 'utf8'),
        });
        console.log('Template Created:', response);
    } catch (e) {
        console.error('Error creating template:', e);
    }
}

addTemplate();
