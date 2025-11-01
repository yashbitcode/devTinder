import ConnReq from "../services/connectionReqService";
import { useEffect, useState } from "react";
import RequestCard from "../components/Requests/RequestCard";
import { toast } from "react-toastify";

const AllRequests = () => {
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        const res = await ConnReq.getAllRequests();

        if(res?.data?.success) {
            setRequests(res.data.data);
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }

        setLoading(false);
    };

    const removeReq = (id) => {
        setRequests((prev) => prev.filter((el) => el._id !== id));
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return !loading && (
        <div className="w-full max-w-xl mx-auto">
            <h1 className="text-4xl text-center">Requests</h1>
            <div className="flex flex-col gap-4 mt-7">
                {
                    requests?.length !== 0 ? requests.map((el) => (
                        <RequestCard key={el._id} {...el.fromUserId} removeReq={removeReq} reqId={el._id} />
                    )) : (
                        <div className="bg-white text-black w-fit mx-auto px-3 py-2 text-2xl rounded-md">No Request Found</div>
                    )
                }
            </div>
        </div>
    );
};

export default AllRequests;