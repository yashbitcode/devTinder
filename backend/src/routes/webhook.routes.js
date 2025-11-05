const express = require("express");
const router = express.Router();
const Order = require("../models/order.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
    "/",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        let signingSecret = process.env.WEBHOOK_SIGNING_SECRET;
        const payload = req.body;
        const sign = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                sign,
                signingSecret
            );
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
            });
        }

        const obj = event.data.object;

        switch (event.type) {
            case "checkout.session.completed": {
                await Order.findByIdAndUpdate(obj.metadata.orderId, {
                    paymentStatus: obj.payment_status,
                    stripeSubscriptionId: obj.subscription,
                });
                break;
            }
            case "payment_intent.payment_failed": {
                await Order.findByIdAndUpdate(obj.metadata.orderId, {
                    paymentStatus: "failed",
                });
                break;
            }
            case "charge.refund.updated": {
                await Order.findByIdAndUpdate(obj.metadata.orderId, {
                    paymentStatus: "refunded",
                });
                break;
            }
            case "checkout.session.canceled": {
                await Order.findByIdAndUpdate(obj.metadata.orderId, {
                    paymentStatus: "canceled",
                });
                break;
            }
            case "checkout.session.expired": {
                await Order.findByIdAndUpdate(obj.metadata.orderId, {
                    paymentStatus: "expired",
                });
                break;
            }
        }
        
        res.json({
            success: true,
        });
    }
)

module.exports = router;