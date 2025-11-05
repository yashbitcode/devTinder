const fieldsCanBeUpdated = [
    "firstName",
    "lastName",
    "age",
    "photoUrl",
    "about",
    "gender",
    "skills",
];

const stripeProducts = {
    silver: {
        productId: "prod_TMkTy8RNlvsBZJ",
        priceId: "price_1SQ0yaKXpXbuf1qolm5JzpM1",
        durationMonths: 3,
        amount: 39900
    },
    gold: {
        productId: "prod_TMkU6xcfj6kZiZ",
        priceId: "price_1SQ0zrKXpXbuf1qoCxO7PTLF",
        durationMonths: 6,
        amount: 59900
    },
};

module.exports = {
    fieldsCanBeUpdated,
    stripeProducts
};
