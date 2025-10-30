const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.model");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, emailId, password, photoUrl } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        // const doc = new User(userData);
        // await doc.save();
        await User.insertOne({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            photoUrl
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
        const passwordMatch = await user.validatePasswordHash(password);
        console.log(passwordMatch)

        if (passwordMatch) {
            const token = await user.getJWT();
            res.cookie("token", token, {
                // expires: new Date(Date.now() + 10000),
            });

            return res.json({
                success: true,
                token,
                user,
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

router.post("/logout", ensureAuthenticated, async (req, res) => {
    try {
        res.cookie("token", "", {
            expires: new Date(Date.now())
        });

        res.json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

module.exports = router;