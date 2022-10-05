require('dotenv').config;
const nodemailer = require('nodemailer');

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER, // generated ethereal user
        pass: EMAIL_PASSWORD, // generated ethereal password
    },
});

exports.handler = async function (event, context) {
    switch (event.httpMethod) {
        case 'POST':
            const { name, email, subject, message } = JSON.parse(event.body);
            if (!name || !email || !subject || !message) {
                return {
                    statusCode: 400,
                    body: 'All fields are required!',
                };
            }
            try {
                await transporter.sendMail({
                    from: 'Lee <some@email.com>', // sender address
                    to: `${name} <${email}>`, // list of receivers
                    subject: subject, // Subject line
                    text: message, // plain text body
                    html: `<b>${message}</b>`, // html body
                });
                return {
                    statusCode: 200,
                    body: 'Success!',
                };
            } catch (error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify(error.message),
                };
            }
        default:
            return {
                statusCode: 405,
                body: 'Only POST request allowed!',
            };
    }
};
