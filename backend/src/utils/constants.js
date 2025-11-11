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
        productId: "prod_TP6FOQydHfx2Md",
        priceId: "price_1SSI3NKXpXbuf1qostkxdCS6",
        durationMonths: 3,
        amount: 39900
    },
    gold: {
        productId: "prod_TP6Fa9V0nv5ehO",
        priceId: "price_1SSI30KXpXbuf1qoIxdPHrRu",
        durationMonths: 6,
        amount: 59900
    },
};

module.exports = {
    fieldsCanBeUpdated,
    stripeProducts
};
