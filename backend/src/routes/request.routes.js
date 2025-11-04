const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const ConnectionReq = require("../models/connectionRequest.model");
const User = require("../models/user.model");
const { sendMail } = require("../config/mailer");
const router = express.Router();

router.post("/send/:status/:toUserId", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: fromUserId, firstName, lastName } = req.user;
        const { toUserId, status } = req.params;

        if (!toUserId) throw Error("Receiver id is required");
        if(!["interested", "ignored"].includes(status)) throw Error("Invalid status type");
        if(!ConnectionReq.validateObjectId(toUserId)) throw Error("Not a valid receiver id");
        if(toUserId.toString() === fromUserId.toString()) throw Error("Sender and receiver can't be same");

        const existingReq = await ConnectionReq.findOne({
            $or: [
                {
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                },
            ]
        });

        if(existingReq) throw Error("Request already exists");
        const requestedUser = await User.findById(toUserId);

        if (!requestedUser) throw Error("Receiver id is not valid");

        const request = new ConnectionReq({
            fromUserId,
            toUserId,
            status,
        });

        await request.save();
        const requestDoc = request.toObject({
            getters: true,
        });

        if(status === "interested") {
            await sendMail(requestedUser.emailId, requestedUser.firstName + ' ' + requestedUser.lastName, firstName + ' ' + lastName, status);
        }

        res.json({
            success: true,
            message: status[0].toUpperCase() + status.substring(1) + " request sent",
            data: {
                _id: requestDoc._id,
                fromUserId: requestDoc.fromUserId,
                toUserId: requestDoc.toUserId,
                status: requestDoc.status,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/*
    A --send-> B
    B --accept/reject--> A
*/

router.patch("/review/:status/:reqId", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: fromUserId, firstName, lastName } = req.user;
        const { status, reqId } = req.params;
        if(!["accepted", "rejected"].includes(status)) throw Error("Invalid status type");
        if(!ConnectionReq.validateObjectId(reqId)) throw Error("Not a valid request id");

        const doc = await ConnectionReq.findOneAndUpdate({
            _id: reqId,
            toUserId: fromUserId,
            status: "interested"
        }, {
            status
        }, {
            returnDocument: "after"
        }).populate("fromUserId", ["_id", "firstName", "lastName", "emailId"]);

        if(!doc) throw Error("Connection request not found");

        if(status === "accepted") {
            await sendMail(doc.fromUserId.emailId, firstName + ' ' + lastName, doc.fromUserId.firstName + ' ' + doc.fromUserId.lastName, status);
        }

        res.json({
            success: true,
            message: status[0].toUpperCase() + status.substring(1) + " request sent",
            data: doc
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;
