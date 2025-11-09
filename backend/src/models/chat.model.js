const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        sender: {
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true
            }
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        messages: [messageSchema],
    },
    {
        timestamps: true,
    }
);

const Chat = new mongoose.model("Chat", chatSchema);
module.exports = Chat;
