import { useEffect, useState } from "react";
import ConnReq from "../services/connectionReqService";
import ConnectionCard from "../components/Connections/ConnectionCard";
import { toast } from "react-toastify";

const AllConnections = () => {
    const [connections, setConnections] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        const res = await ConnReq.getAllConnections();
        
        if(res?.data?.success) {
            setConnections(res.data.data);
            toast.success(res.message);
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchConnections();
    }, []);
    
    return !loading && (
        <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-4xl text-center">Connections</h1>
            <div className="flex flex-col gap-4 mt-7">
                {
                    connections?.length > 0 ? connections.map((el) => (
                        <ConnectionCard key={el.friend._id} {...el.friend} />
                    )) : (
                        <div className="bg-white text-black w-fit mx-auto px-3 py-2 text-2xl rounded-md">No Connections Found</div>
                    )

                }
            </div>
        </div>
    );
};

export default AllConnections;