const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { validateUserData } = require("../utils/helpers");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");

router.get("/view", ensureAuthenticated, async (req, res) => {
    try {
        const user = req.user;  
        res.json({
            sucess: true,
            user
        });
    } catch (err) {
        res.status(400).json({
            sucess: false,
            error: err.message,
        });
    }
});

router.patch("/edit", ensureAuthenticated, async (req, res) => {
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

        return res.json({
            success: true,
            message: "User updated successfully",
            user: user.toObject({ getters: true })
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message,
        });
    }
});

// router.get("/sa", (req, res) => res.send("dsds"));

module.exports = router;