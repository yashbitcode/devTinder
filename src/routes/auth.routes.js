const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
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

router.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({
            emailId,
        });

        if (!user) throw Error("Email doesn't exist");
        const passwordMatch = user.validatePasswordHash(password);

        if (passwordMatch) {
            const token = await user.getJWT();

            console.log(token)

            res.cookie("token", token, {
                // expires: new Date(Date.now() + 10000),
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

module.exports = router;