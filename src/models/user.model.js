const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },
        lastName: {
            type: String,
            minLength: 4,
            maxLength: 50,
        },
        emailId: {
            type: String,
            required: true,
            unique: [true, "Email can't be duplicate"],
            trim: true,
            lowercase: true,
            validate(val) {
                if (!validator.isEmail(val))
                    throw new Error("Not a valid email");
            },
            // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"]
        },
        password: {
            type: String,
            required: true,
            validate(val) {
                if (!validator.isStrongPassword(val))
                    throw new Error("Not a Strong Password");
            },
            // match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password Invalid"]
        },
        age: {
            type: Number,
            min: [18, "Minimum age is 18"],
        },
        gender: {
            type: String,
            enum: {
                values: ["Male", "Female"],
                message: "{VALUE} is not supported",
            },
        },
        photoUrl: {
            type: String,
            validate(val) {
                if (!validator.isURL(val)) throw new Error("Invalid photo URL");
            },
        },
        about: {
            type: String,
            default: "this is default about",
        },
        skills: {
            type: [String],
            validate: {
                validator: (arr) => {
                    if (arr.length < 10) return true;
                    return false;
                },
                message: () => "Skills cannot be more than 3",
            },
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.getJWT = async function () {
    const token = jwt.sign(
        {
            userId: this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

    return token;
};

userSchema.methods.validatePasswordHash = async function (passInput) {
    return await bcrypt.compare(passInput, this.password)
};

const User = mongoose.model("User", userSchema);
module.exports = User;
