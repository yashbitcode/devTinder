const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    emailId: {
        type: String,
        required: true,
        unique: [true, "Email can't be duplicate"],
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    gender: {
        type: String,
        enum: { values: ['Male', 'Female'], message: '{VALUE} is not supported' }
    },
    photoUrl: String,
    about: {
        type: String,
        default: "this is default about"
    },
    skills: [String]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;