require("dotenv/config");
const nodemailer = require("nodemailer");
const { getHtmlMessage } = require("../utils/helpers");

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
                    : status === "review" ? "Review yesterday's requests" : "Your request accepted",
            html: getHtmlMessage(status, sender, receiver),
            // attachments: [{ filename: 'test.txt', content: 'Hello file' }]
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
