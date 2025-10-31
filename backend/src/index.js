const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./config/database");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const userRouter = require("./routes/user.routes");
const requestRouter = require("./routes/request.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");

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

// app.post("/user", async (req, res) => {
//     try {
//         const emailId = req.body.emailId;
//         const user = await User.findOne({
//             emailId,
//         }).exec();

//         if (user) return res.json(user);

//         res.status(404).json({
//             error: "User not found",
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: "Something went wrong",
//         });
//     }
// });

// app.get("/userById/:id", async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const user = await User.findById(userId).exec();

//         if (user) return res.json(user);

//         res.status(404).json({
//             error: "User not found",
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: "Something went wrong",
//         });
//     }
// });

// app.delete("/user/:id", async (req, res) => {
//     try {
//         const userId = req.params.id;
//         await User.findByIdAndDelete(userId).exec();
//         res.json({
//             id: userId,
//             success: "User deleted successfully!",
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: "Something went wrong",
//         });
//     }
// });

connect()
    .then(() => {
        console.log("Connection Estab.");
        app.listen(PORT, () =>
            console.log("Server up and running on PORT: ", PORT)
        );
    })
    .catch(() => console.log("Connection Not Estab."));
