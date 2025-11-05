import PackageCard from "../components/Premium/PackageCard";
import { packages } from "../utils/constants";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const Premium = () => {
    const user = useSelector((state) => state.userReducer.user);
    
    return user.isPremium ? (
        <div className="text-black bg-white rounded-xl text-3xl w-fit mx-auto p-4">
            Your Are Already A {user.membershipType[0].toUpperCase() + user.membershipType.substr(1)}
        </div>
    ) : (
        <div>
            <h1 className="text-4xl text-center">Premium Plans</h1>
            <div className="flex flex-wrap gap-4 mt-10 justify-center">
                {
                    packages?.map((pack) => <PackageCard {...pack} />)
                }
            </div>
        </div>
    );
};

export default Premium