const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/feed", authMiddleware, async (req, res) => {
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

// router.post("/sa", (req, res) => {
//     res.cookie("token", "", {
//         // expires: new Date(Date.now()),
//     }).send("dsds");
// });

module.exports = router;
