const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const ConnectionReq = require("../models/connectionRequest.model");
const User = require("../models/user.model");
const router = express.Router();

router.post("/send/:status/:toUserId", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: fromUserId } = req.user;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        if (!toUserId) throw Error("Receiver id is required");
        if(!["interested", "ignored"].includes(status)) throw Error("Invalid status type");
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

        // console.log(toUserId + '\n');
        await request.save();
        const requestDoc = request.toObject({
            getters: true,
        });

        res.json({
            sucess: true,
            data: {
                _id: requestDoc._id,
                fromUserId: requestDoc.fromUserId,
                toUserId: requestDoc.toUserId,
                status: requestDoc.status,
            },
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

module.exports = router;
