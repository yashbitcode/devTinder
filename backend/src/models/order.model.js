const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        customerId: {
            type: String,
            required: true
        },
        membershipType: {
            type: String,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },        
        amount: {
            type: Number,
            required: true
        },        
    }
);

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;