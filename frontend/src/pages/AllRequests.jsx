import axios from "axios";
import { useEffect, useState } from "react";
import RequestCard from "../components/Requests/RequestCard";

const AllRequests = () => {
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/requests", {
                withCredentials: true
            });
            setRequests(res.data.data);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    const removeReq = (id) => {
        setRequests((prev) => prev.filter((el) => el._id !== id));
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return !loading && (
        <div className="w-full max-w-xl mx-auto">
            <h1 className="text-4xl text-center">Connections</h1>
            <div className="flex flex-col gap-4 mt-7">
                {
                    requests ? requests.map((el) => (
                        <RequestCard key={el._id} {...el.fromUserId} removeReq={removeReq} reqId={el._id} />
                    )) : (
                        <div className="bg-white px-3 py-2 text-2xl rounded-md">No Requests</div>
                    )
                }
            </div>
        </div>
    );
};

export default AllRequests;