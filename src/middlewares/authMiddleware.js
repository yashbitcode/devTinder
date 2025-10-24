const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw Error("Invalid Token");

        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verification.userId).exec();
        req.user = user;

        next();
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

module.exports = authMiddleware;