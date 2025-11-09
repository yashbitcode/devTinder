const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const Chat = require("../models/chat.model");
const router = express.Router();

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

module.exports = router;
