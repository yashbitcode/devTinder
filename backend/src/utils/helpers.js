const { fieldsCanBeUpdated } = require("../utils/constants");

const validateUserData = (data) => {
    if (!data) return false;

    return Object.keys(data).every((key) => fieldsCanBeUpdated.includes(key));

    // return Object.fromEntries(Object.entries(data).filter(([key]) => fieldsCanBeUpdated.includes(key)));
};

const getHtmlMessage = (status, sender, receiver) => {
    if (!["interested", "accepted"].includes(status)) return "";
    return status === "interested"
        ? `
                <body>
                    <p>Hi ${receiver},</p>
                    <p>You have received a new request from ${sender}.</p>
                    <a href="/" style="background-color:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">View Request</a>
                </body>
            `
        : `
                <body>
                    <p>Hi ${sender},</p>
                    <p>Your request to ${receiver} is accepted.</p>
                    <a href="/" style="background-color:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">View Connection</a>
                </body>
            `;
};

module.exports = {
    validateUserData,
    getHtmlMessage
};
