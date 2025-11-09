require("dotenv/config");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("node:http");
const connect = require("./config/database");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const userRouter = require("./routes/user.routes");
const requestRouter = require("./routes/request.routes");
const paymentRouter = require("./routes/payment.routes");
const webhookRouter = require("./routes/webhook.routes");
const chatRouter = require("./routes/chat.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");
const initialiseSocket = require("./config/socket");
// require("./config/cron");

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use("/webhook", webhookRouter)

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(authMiddleware);

app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    next();
});

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/payment", paymentRouter);
app.use("/chat", chatRouter);


const httpServer = createServer(app);
initialiseSocket(httpServer);

connect()
    .then(() => {
        console.log("Connection Estab.");
        httpServer.listen(process.env.PORT, () =>
            console.log("Server up and running on PORT: ", process.env.PORT)
        );
    })
    .catch(() => console.log("Connection Not Estab."));
