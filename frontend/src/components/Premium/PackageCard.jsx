import { toast } from "react-toastify";
import { CustomButton } from "../../custom-components";
import Pay from "../../services/payService";

const PackageCard = ({
    packageName,
    price,
    features
}) => {
    const handlePay = async () => {
        const res = await Pay.makePayment(packageName);
        console.log(res);

        if (res?.data?.success) {
            window.location.href = res.data.url;
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    };

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
            <CustomButton className={"text-xl rounded-md bg-black/40"} onClick={handlePay}>Pay Now</CustomButton>
        </div>
    );
};

export default PackageCard;