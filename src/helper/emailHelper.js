import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

exports.sendMail = (email, subject) => {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let transporter = nodemailer.createTransport(transporter);

    let mailOptions = {
        from: `"${process.env.EMAIL_SENDER}" <${process.env.EMAIL_FROM}>`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: "Testing",
        html: `<h3>Test Mail</h3>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error ==> ", error)
            // return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};