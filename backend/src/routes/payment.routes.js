const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const { stripeProducts } = require("../utils/constants");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post(
    "/create-checkout-session",
    ensureAuthenticated,
    async (req, res) => {
        try {
            const { _id: userId } = req.user;
            const { membershipType } = req.body;

            if (!["silver", "gold"].includes(membershipType))
                throw Error("Invalid membership type");

            const user = await User.findById(userId);

            if (!user.stripeCustomerId) {
                const customer = await stripe.customers.create({
                    name: user.firstName + " " + user.lastName,
                    email: user.emailId,
                });

                user.stripeCustomerId = customer.id;
                await user.save();
            }

            const order = new Order({
                userId,
                membershipType,
                currency: "usd",
                stripeCustomerId: user.stripeCustomerId,
                stripeProductId: stripeProducts[membershipType].productId,
                amount: stripeProducts[membershipType].amount,
            });

            await order.save();

            const session = await stripe.checkout.sessions.create({
                mode: "subscription",
                payment_method_types: ["card"],
                customer: user.customerId,
                line_items: [
                    {
                        price: stripeProducts[membershipType].priceId,
                        quantity: 1,
                    },
                ],
                success_url: "http://localhost:5173/success",
                cancel_url: "http://localhost:5173/failure",
                metadata: {
                    orderId: order.toObject({ getters: true })._id.toString(),
                    userId: userId.toString(),
                    membershipType
                },
            });

            order.stripeSessionId = session.id;
            await order.save();

            res.json({ success: true, url: session.url });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
);

module.exports = router;
