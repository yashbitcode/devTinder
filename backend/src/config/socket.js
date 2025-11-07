const { Server } = require("socket.io");

const initialiseSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
        },
    });

    io.on("connection", (socket) => {

    });
};

module.exports = initialiseSocket;