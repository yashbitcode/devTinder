const cron = require("node-cron");
const ConnectionReq = require("../models/connectionRequest.model");
const { sendMail } = require("./mailer");

cron.schedule("0 8 * * *", async () => {
    try {
        const yesterdayDate = new Date();
        yesterdayDate.setDate(new Date().getDate() - 1);

        const pendingRequests = await ConnectionReq.find({
            status: "interested",
            createdAt: {
                $gte: new Date(yesterdayDate.setUTCHours(0, 0, 0, 0)),
                $lte: new Date(yesterdayDate.setUTCHours(23, 59, 59, 999)),
            },
        }).populate("toUserId", ["firstName", "lastName", "emailId"]);

        const emailsList = [
            ...new Set(
                pendingRequests.map((el) => ({
                    emailId: el.toUserId.emailId,
                    name: el.toUserId.firstName + " " + el.toUserId.lastName,
                }))
            ),
        ];

        emailsList.forEach(async (user) => {
            await sendMail(user.emailId, user.name, "", "review");
        });
    } catch (error) {
        console.error(error);
    }
});
