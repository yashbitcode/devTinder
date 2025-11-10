const { Server } = require("socket.io");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Chat = require("../models/chat.model");

const initialiseSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.use(verifyToken).on("connection", (socket) => {
        socket.on("joinChat", (ids) => {
            const roomId = ids.sort().join("_");

            socket.roomId = roomId;
            socket.join(roomId);
        });

        socket.on("sendMessage", async ({ sender, message, ids }) => {
            try {
                let chat = await Chat.findOne({
                    participants: {
                        $all: ids,
                    },
                });

                if (!chat) return;

                chat.messages.push({
                    sender,
                    message,
                });

                await chat.save();

                socket
                    .to(socket.roomId)
                    .emit("receivedMessage", { sender, message });
            } catch {
                return;
            }
        });
    });
};

const verifyToken = async (socket, next) => {
    try {
        const token = socket.handshake.headers?.cookie?.split("=")?.[1];
        if (!token) throw Error("Missing Token");

        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verification.userId);

        if (!user) throw Error("Invalid token");

        next();
    } catch (error) {
        next(new Error(error.message));
    }
};

// const verifyConnection = async (socket, next) => {
//     try {
//         const 
//     } catch (error) {
//         next(new Error(error.message));
//     }
// }

module.exports = initialiseSocket;
