require("dotenv/config");
const nodemailer = require("nodemailer");
const { getHtmlMessage } = require("../utils/helpers");
// const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
// const { getHtmlMessage } = require("../utils/helpers");

// const mailerSend = new MailerSend({
//     apiKey: process.env.MAILERSEND_API,
// });

// const sentFrom = new Sender(process.env.MY_EMAIL, "YashBitCode DevTinder");

// async function sendMail(emailId, receiver, sender, status) {
//     try {
//         const recipient = [new Recipient(emailId, receiver)];

//         const emailParams = new EmailParams()
//             .setFrom(sentFrom)
//             .setTo(recipient)
//             .setReplyTo(sentFrom)
//             .setSubject("This is a Subject")
//             .setHtml(getHtmlMessage(status, sender, receiver));

//         await mailerSend.email.send(emailParams);
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = {
//     sendMail,
// };

const sendMail = async (emailId, receiver, sender, status) => {
    try {
        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        const message = {
            from: "DevTinder <notification@dev.tinder>",
            to: emailId,
            subject:
                status === "interested"
                    ? "You received new request"
                    : "Your request accepted",
            html: getHtmlMessage(status, sender, receiver),
            attachments: [{ filename: 'test.txt', content: 'Hello file' }]
        };

        const info = await transporter.sendMail(message);
        console.log("URL:", nodemailer.getTestMessageUrl(info));

        return info;
    } catch(error) {
        throw Error(error);
    }
};

module.exports = {
    sendMail,
};
