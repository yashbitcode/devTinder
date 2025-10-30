import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/store-slices/feedSlice";
import FeedCard from "../components/Feed/FeedCard";

const Feed = () => {
    const userFeed = useSelector((state) => state.feedReducer.feed);
    const dispatch = useDispatch();

    const fetchFeed = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/feed", {
                withCredentials: true
            });

            dispatch(addFeed(res.data));
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (userFeed) return;
        fetchFeed();
    }, []);

    return (
        <div className="flex gap-4">
            {
                userFeed?.map((el) => (
                    <FeedCard key={el._id} {...el} />
                ))
            }
        </div>
    );
};

export default Feed;