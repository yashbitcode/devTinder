import { CustomButton } from "../../custom-components";

const PackageCard = ({
    packageName,
    price,
    features
}) => {
    return (
        <div className="p-4 flex flex-col gap-4 bg-primary-light w-full max-w-xs rounded-md">
            <h1 className="uppercase text-2xl">{packageName}</h1>
            <h2 className="text-5xl font-semibold">${price}</h2>
            <div className="flex flex-col gap-3">
                {
                    features?.map((el) => (
                        <div className="flex gap-2 items-center text-white text-xl">
                            &#10004;
                            <p>{el}</p>
                        </div>
                    ))
                }
            </div>
            <CustomButton className={"text-xl rounded-md bg-black/40"}>Pay Now</CustomButton>
        </div>
    );
};

export default PackageCard;