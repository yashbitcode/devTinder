const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateUserData } = require("../utils/helpers");

router.get("/view", authMiddleware, async (req, res) => {
    try {
        const user = req.user;        
        res.json(user);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

router.patch("/edit", authMiddleware, async (req, res) => {
    try {
        const userData = req.body;
        if(!validateUserData(userData)) throw Error("Invalid fields passed");
        
        const user = req.user;
        Object.entries(userData).forEach(([key, val]) => user[key] = val);

        await user.save();
        // const user = await User.findByIdAndUpdate(_id, userData, {
        //     returnDocument: "after",
        //     runValidators: true,
        // });

        console.log(user);

        return res.json({
            id: userData._id,
            success: "Data updated successfully!",
        });
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
});

router.patch("/password", authMiddleware, async (req, res) => {
    try {  
        const user = req.user;
        const { oldPassword, newPassword } = req.body;

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
            error: err.message,
        });
    }
});

// router.get("/sa", (req, res) => res.send("dsds"));

module.exports = router;