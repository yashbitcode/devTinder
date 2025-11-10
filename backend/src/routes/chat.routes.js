const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const Chat = require("../models/chat.model");
const router = express.Router();
const ConnectionReq = require("../models/connectionRequest.model");

router.get("/:targetUserId", ensureAuthenticated, async (req, res) => {
    try {
        const { targetUserId } = req.params;
        const user = req.user;

        if (targetUserId === user._id.toString())
            throw Error("Target user ID can't be same as user");

        let chat = await Chat.findOne({
            participants: {
                $all: [targetUserId, user._id.toString()],
            },
        });

        if (!chat) {
            chat = await new Chat({
                participants: [targetUserId, user._id],
                messages: [],
            });

            chat.save();
        }

        res.json({
            success: true,
            chat,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

/* 
    fromUserId -isEqual-> userId, targetId,
    toUserId -isEqual-> userId, targetId,
*/
router.get("/verify/:targetUserId", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { targetUserId } = req.params;

        if (targetUserId === userId.toString()) throw Error();

        const conn = await ConnectionReq.findOne({
            $or: [
                {
                    fromUserId: userId,
                    toUserId: targetUserId
                },
                {
                    fromUserId: targetUserId,
                    toUserId: userId,
                },
            ],
            status: "accepted"
        }).populate("toUserId fromUserId", "firstName lastName photoUrl");

        if(!conn) throw Error();

        res.json({
            success: true,
            data: conn.fromUserId._id.toString() === targetUserId ? conn.fromUserId : conn.toUserId,
        });
    } catch {
        res.status(400).json({
            success: false,
            error: "Connection doesn't exist"
        });
    }
});

module.exports = router;
