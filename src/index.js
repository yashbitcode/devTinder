const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const connect = require("./config/database");
const User = require("./models/user");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => res.send("HI BRO!"));

app.get("/profile", async (req, res) => {
    try {
        const { token } = req.cookies;
        if(!token) throw Error("Invalid Token");

        const verification = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verification.userId).exec();

        if (user) return res.json(user);
        throw Error("User Doesn't exisit");
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        // const doc = new User(userData);
        // await doc.save();
        await User.insertOne({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        res.send("User Created Successfully!");
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({
            emailId,
        });

        if (!user) throw Error("Email doesn't exist");
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign(
                {
                    userId: user._id,
                },
                process.env.JWT_SECRET, 
                {
                    expiresIn: "0d"
                }
            );

            res.cookie("token", token, {
                expires: new Date(Date.now() + 10000)
            });
            return res.json({
                success: true,
                message: "Login Successful!",
            });
        }

        throw Error("Password doesn't match with the email!");
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

app.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.json({
            allUsers,
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

app.post("/user", async (req, res) => {
    try {
        const emailId = req.body.emailId;
        const user = await User.findOne({
            emailId,
        }).exec();

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

app.patch("/user/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const user = await User.findByIdAndUpdate(userId, userData, {
            returnDocument: "after",
            runValidators: true,
        });

        console.log(user);

        return res.json({
            id: userId,
            success: "Data updated successfully!",
        });
    } catch (err) {
        res.status(400).json({
            err,
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
