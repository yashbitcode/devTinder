const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return next();

        // if(!tokenHeader.startsWith("Bearer")) throw Error("Token should starts with Bearer");

        // const verification = jwt.verify(tokenHeader.split(" ")[1], process.env.JWT_SECRET);
        const verification = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verification.userId);

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
};

const ensureAuthenticated = (req, res, next) => {
    try {
        if(!req.user) throw Error("You must be authenticated");
        
        next();        
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
}

module.exports = {
    authMiddleware,
    ensureAuthenticated
};