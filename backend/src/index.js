const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./config/database");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const userRouter = require("./routes/user.routes");
const requestRouter = require("./routes/request.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");
require("./config/cron");

const app = express();
const PORT = 3000;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

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

connect()
    .then(() => {
        console.log("Connection Estab.");
        app.listen(PORT, () =>
            console.log("Server up and running on PORT: ", PORT)
        );
    })
    .catch(() => console.log("Connection Not Estab."));


