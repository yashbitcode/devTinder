const express = require("express");
const cookieParser = require("cookie-parser");
const connect = require("./config/database");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const userRouter = require("./routes/user.routes");
const User = require("./models/user");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/", userRouter);

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

app.get("/userById/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).exec();

        if (user) return res.json(user);

        res.status(404).json({
            error: "User not found",
        });
    } catch (err) {
        res.status(400).json({
            error: "Something went wrong",
        });
    }
});

app.delete("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId).exec();
        res.json({
            id: userId,
            success: "User deleted successfully!",
        });
    } catch (err) {
        res.status(400).json({
            error: "Something went wrong",
        });
    }
});

connect()
    .then(() => {
        console.log("Connection Estab.");
        app.listen(PORT, () =>
            console.log("Server up and running on PORT: ", PORT)
        );
    })
    .catch(() => console.log("Connection Not Estab."));
