const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const ConnectionReq = require("../models/connectionRequest.model");

// router.get("/feed", ensureAuthenticated, async (req, res) => {
//     try {
//         const allUsers = await User.find({});

//         res.json({
//             allUsers,
//         });
//     } catch (err) {
//         res.status(400).json({
//             error: err.message,
//         });
//     }
// });

router.get("/requests", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const data = await ConnectionReq.find({
            toUserId: userId,
            status: "interested",
        }).populate("fromUserId", ["_id", "firstName", "lastName", "about"]);

        // aggregation pipeline to get the from user info
        // const data = await ConnectionReq.aggregate([
        //     {
        //         $match: {
        //             toUserId: userId,
        //             status: "interested"
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "fromUserId",
        //             foreignField: "_id",
        //             as: "sender"
        //         }
        //     },
        //     {
        //         $project: {
        //             fromUserId: 0
        //         }
        //     }
        // ]);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get("/connections", ensureAuthenticated, async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const data = await ConnectionReq.aggregate([
            {
                $match: {
                    $or: [
                        {
                            toUserId: userId,
                        },
                        {
                            fromUserId: userId,
                        },
                    ],
                    status: "accepted",
                },
            },
            {
                $addFields: {
                    friendId: {
                        $cond: {
                            if: {
                                $eq: ["$toUserId", userId]
                            },
                            then: "$fromUserId",
                            else : "$toUserId"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                "_id": 1,
                                "firstName": 1,
                                "lastName": 1,
                            }
                        }
                    ],
                    as: "friend"
                }
            },
            {
                $project: {
                    "_id": 1,
                    "friend": 1
                }
            },
            {
                $unwind: "$friend"
            }
        ]);

        res.json(data)
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

module.exports = router;
