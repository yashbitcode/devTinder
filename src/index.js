const express = require("express");
const mongoose = require("mongoose");
const connect = require("./config/database");
const User = require("./models/user");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => res.send("HI BRO!"));
app.post("/signup", async (req, res) => {
    try {
        const userData = req.body;
        const doc = new User(userData);

        await doc.save();
        res.send("User Created Successfully!");
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

app.get("/users", async (req, res) => {
    try {
        const allUsers = await User.find({});

        res.json({
            allUsers,
        });
    } catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
});

app.post("/user", async (req, res) => {
    try {
        const emailId = req.body;

        const user = await User.findOne(emailId);

        if(user) return res.json(user);

        return res.status(404).json({
            error: "User not found"
        });
    } catch (err) {
        res.status(500).json({
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
