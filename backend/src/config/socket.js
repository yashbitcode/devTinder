const { Server } = require("socket.io");
const Chat = require("../models/chat.model");

const initialiseSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    let onlineUsers = {};

    /* 
        - while joining -> store online status
        - and in disconnecting -> remove the status
        - io emit to update the users

        - {
            [userId]: {
                socketId,
                isOnline: t/f,
                lastSeen: isOnline ? null : Date.now()
            }
        }
    */

    io.on("connection", (socket) => {
        socket.on("joinChat", (userId, ids) => {
            const roomId = ids.sort().join("_");
            socket.roomId = roomId;
            socket.userId = userId;

            if (!onlineUsers[roomId]) onlineUsers[roomId] = {};

            onlineUsers[roomId][userId] = {
                socketId: socket.id,
                isOnline: true,
                lastSeen: null,
            };

            socket.join(roomId);
            io.to(roomId).emit("getOnlineStatus", onlineUsers[roomId]);
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

        socket.on("disconnect", () => {
            if (
                onlineUsers[socket?.roomId]?.[socket?.userId] &&
                onlineUsers[socket?.roomId]?.[socket?.userId]
            ) {
                onlineUsers[socket.roomId][socket.userId].isOnline = false;
                onlineUsers[socket.roomId][socket.userId].socketId = null;
                onlineUsers[socket.roomId][socket.userId].lastSeen = Date.now();

                io.to(socket.roomId).emit(
                    "getOnlineStatus",
                    onlineUsers[socket.roomId]
                );
            }
        });

        socket.on("offline", () => {
            if (
                onlineUsers[socket?.roomId]?.[socket?.userId] &&
                onlineUsers[socket?.roomId]?.[socket?.userId]
            ) {
                onlineUsers[socket.roomId][socket.userId].isOnline = false;
                onlineUsers[socket.roomId][socket.userId].socketId = null;
                onlineUsers[socket.roomId][socket.userId].lastSeen = Date.now();

                io.to(socket.roomId).emit(
                    "getOnlineStatus",
                    onlineUsers[socket.roomId]
                );
            }
        });
    });
};

module.exports = initialiseSocket;
