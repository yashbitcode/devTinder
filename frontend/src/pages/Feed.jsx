import ConnReq from "../services/connectionReqService";
import { useEffect, useState } from "react";
import FeedCard from "../components/Feed/FeedCard";
import { toast } from "react-toastify";

const Feed = () => {
    const [userFeed, setUserFeed] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchFeed = async () => {
        const res = await ConnReq.getFeed();
        
        if (res?.data?.success) {
            setUserFeed(res.data.feedUsers);
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }

        setLoading(false);
    };

    const removeUser = (id) => {
        setUserFeed((prev) => prev.filter((el) => el._id !== id));
    };

    useEffect(() => {
        if (userFeed) return;
        fetchFeed();
    }, []);

    return (
        <div>
            <h1 className="text-4xl text-center mb-5">Feed</h1>
            {
                !loading && (
                    <div className="flex gap-4">
                        {
                            userFeed?.length > 0 ? userFeed.map((el) => (
                                <FeedCard key={el._id} removeUser={removeUser} {...el} />
                            )) : (
                                <div className="bg-white text-black w-fit mx-auto px-3 py-2 text-2xl rounded-md">No Feed</div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Feed;