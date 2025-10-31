import { useEffect, useState } from "react";
import axios from "axios";
import ConnectionCard from "../components/Connections/ConnectionCard";

const AllConnections = () => {
    const [connections, setConnections] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchConnections = async () => {
        try {
            const res = await axios.get("http://localhost:3000/user/connections", {
                withCredentials: true
            });

            setConnections(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);
    
    return !loading && (
        <div className="w-full max-w-xl mx-auto">
            <h1 className="text-4xl text-center">Connections</h1>
            <div className="flex flex-col gap-4 mt-7">
                {
                    connections ? connections.map((el) => (
                        <ConnectionCard key={el.friend._id} {...el.friend} />
                    )) : (
                        <div className="bg-white px-3 py-2 text-2xl rounded-md">No Connections</div>
                    )

                }
            </div>
        </div>
    );
};

export default AllConnections;