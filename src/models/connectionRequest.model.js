const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Sender id is required"]
    },
    toUserId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Receiver id is required"]
    },
    status: {
        type: String,
        enum: {
            values: ["accepted", "rejected", "ignored", "interested"],
            message: "{VALUE} is not valid status type"
        },
        required: [true, "Status is required"]
    }
}, {
    timestamps: true
});

// connectionReqSchema.pre("save", function(next) {
//     console.log(this);
//     this.toUserId = "5f92cdce0cf217478ba93563";
//     this.status = "ignored"
//     console.log(this);
//     next();
// });

connectionReqSchema.index({
    fromUserId: 1,
    fromUserId: 1,
});

const ConnectionReq = new mongoose.model("connectionRequest", connectionReqSchema);

module.exports = ConnectionReq;