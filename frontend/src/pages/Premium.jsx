import PackageCard from "../components/Premium/PackageCard";
import { packages } from "../utils/constants";

const Premium = () => {
    return (
        <div>
            <h1 className="text-4xl text-center">Premium Plans</h1>
            <div className="flex flex-wrap gap-4 mt-10 justify-center">
            {
                packages?.map((pack) => <PackageCard {...pack} /> )
            }
        </div>
        </div>
    );
};

export default Premium