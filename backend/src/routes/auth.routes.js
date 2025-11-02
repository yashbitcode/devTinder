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

        res.json({
            success: true,
            message: "User Created Successfully",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
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
            success: false,
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
            success: false,
            error: "Something went wrong",
        });
    }
});

router.patch("/password", async (req, res) => {
    try {  
        const { emailId, oldPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({
            emailId
        });

        if(!user) throw Error("Email doesn't exist");
        if(newPassword !== confirmPassword) throw Error("new pass. and confirm pass.not matching");

        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if(!isMatched) throw Error("Wrong Old Password");

        user.password = newPassword;

        await user.validate(["password"]);

        const newHash = await bcrypt.hash(newPassword, 10);
        user.password = newHash;

        await user.save();
        res.json({
            success: true,
            message: "Password changed successfully!"
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

module.exports = router;
