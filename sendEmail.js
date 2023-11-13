const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Replace with your desired port

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Endpoint to handle the email sending
app.post('/send-email', (req, res) => {
    const { recipient, subject, title, message } = req.body;

    if (!recipient || !subject || !title || !message) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: 'support@alyaf.online',
            pass: 'AIHs@2023'
        },
    });

    const mailOptions = {
        from: '"ألياف ضوئية" <support@alyaf.online>',
        to: recipient,
        subject: subject,
        html: `<html> 
    <head> 
        <meta charset="UTF-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <title>Document</title> 
        <style> 
            body { 
                font-family: "Alexandria"; 
            } 
            h1 { 
                direction: rtl; 
                font-size: 24; 
            } 
            p { 
                line-height: 1.6; 
                direction: rtl; 
                font-size: 16; 
            } 
            section { 
                margin: 1.5em 0em; 
            } 
            section p{ 
                line-height: 1.6; 
                direction: rtl; 
                font-size: 10; 
                font-weight: 700; 
            } 
            footer p { 
                line-height: 1.6; 
                direction: rtl; 
                text-align: center; 
                font-size: 13; 
            } 
            footer span { 
                opacity: 0.5; 
            } 
        </style> 
    </head> 
    <body> 
        <h1>${title}</h1> 
        <p>${message}</p> 
        <section><p>فائق الإحترام والتقدير،<br>فريق ألياف ضوئية</p></section> 
        <footer><p><span>تواجه مشكلة؟</span><br><a href="mailto:support@alyaf.online">support@alyaf.online</a></p></footer> 
    </body> 
    </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error.message);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        console.log('Message sent:', info.messageId);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});