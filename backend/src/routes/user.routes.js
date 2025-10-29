const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth.middleware");
const ConnectionReq = require("../models/connectionRequest.model");
const User = require("../models/user.model");
const { pageLimit } = require("../utils/constants");

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
                                $eq: ["$toUserId", userId],
                            },
                            then: "$fromUserId",
                            else: "$toUserId",
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "friendId",
                    foreignField: "_id",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                firstName: 1,
                                lastName: 1,
                            },
                        },
                    ],
                    as: "friend",
                },
            },
            {
                $project: {
                    _id: 1,
                    friend: 1,
                },
            },
            {
                $unwind: "$friend",
            },
        ]);

        res.json(data);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

router.get("/feed", ensureAuthenticated, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit);

        limit = limit <= 10 ? limit : 10;

        console.log(page, limit);
        const allConnections = await ConnectionReq.find({
            $or: [
                {
                    fromUserId: loggedInUser._id,
                },
                {
                    toUserId: loggedInUser._id,
                },
            ],
        });

        const excludedUsers = new Set();

        allConnections.forEach((el) => {
            excludedUsers.add(el.fromUserId.toString())
            excludedUsers.add(el.toUserId.toString())
        });

        const feedUsers = await User.find({
            _id: {
                $nin: [...excludedUsers]
            }
        }, "firstName lastName photoUrl about skills").limit(limit).skip(limit * (page - 1));
        
        /* 

        - users -> ID 
        - find user(user collection) where "allCollections" fromUserId/toUserId !== userID

        68ff33582791733e0b7c2712
        68ff33582791733e0b7c2712
        allCollection
        [
            {
                "_id": "690095ac8f01885b67ed54ed",
                "fromUserId": "68ff33582791733e0b7c2712",
                "toUserId": "68fa234034d2b8174d3216b8"
            },
            {
                "_id": "6900a5302296c156a08b8427",
                "fromUserId": "68ff33582791733e0b7c2712",
                "toUserId": "6900a5202296c156a08b8422"
            }
        ]

*/
        // const feedUsers = await ConnectionReq.aggregate([
        //     {
        //         $match: {
        //             _id: {
        //                 $ne: loggedInUser._id
        //             }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'connectionrequests',
        //             let: {
        //                 potentialConn: "$_id"
        //             },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 {
        //                                     $in: [loggedInUser._id, ["$fromUserId", "toUserId"]]
        //                                 },
        //                                 {
        //                                     $in: ["$$potentialConn", ["$fromUserId", "toUserId"]]
        //                                 },
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: "friend"
        //         }
        //     }
        // ]);

        // const feedUsers = User.aggregate([
        //     {
        //         $lookup: {
        //             from: "connectionrequests",
        //             localField: "_id",

        //         }
        //     }
        // ])

        res.json(feedUsers);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});

/* 
    1st appr.
        - all users filter --(logged user and existing req.)--> filtered users
        - on every conn. req. getting new sets of users
    2nd appr.
        - corresponding conn.
            {
                [logged user]: [all connections]
            }
        - find all users except the connected one
*/

module.exports = router;
