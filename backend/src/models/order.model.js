const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    membershipType: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        default: "inr",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed", "canceled", "expired", "refunded"],
        default: "pending",
    },
    amount: {
        type: Number,
    },
    stripeSessionId: String, 
    stripeProductId: String, 
    stripeCustomerId: String, 
    stripeSubscriptionId: String, 
}, {
    timestamps: true
});

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;
