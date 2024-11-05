const Email = require('email-templates');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
});

email
    .send({
        template: 'template-name', // replace with the name of your template
        message: {
            to: 'test-recipient@example.com',
        },
        locals: {
            name: 'John Doe', // you can pass variables to your template
        },
    })
    .then(() => console.log('Test email sent!'))
    .catch(console.error);
