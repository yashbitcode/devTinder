import ConnReq from "../../services/connectionReqService";
import { CustomButton } from "../../custom-components";
import { defaultPic } from "../../utils/constants";
import { toast } from "react-toastify";

const FeedCard = ({
    firstName, 
    lastName,
    about,
    photoUrl,
    removeUser,
    _id: userId
}) => {
    const handleReq = async (status) => {
        const res = await ConnReq.sendRequest(status, userId);

        console.log(res)

        if(res?.data?.success) {
            toast.success(res.data.message);
            removeUser(userId);
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    };

    return (
        <div className="w-full max-w-2xs rounded-md bg-primary-light">
            <div className="w-full max-h-[330px] overflow-hidden">
                <img src={photoUrl || defaultPic} alt="photo-pic" className="rounded-t-md w-full h-full object-cover" />
            </div>

            <div className="p-4">
                <h1 className="text-xl font-semibold">{firstName + " " + lastName}</h1>
                <p className="mt-2">{about?.substr(0, 30) + "..."}</p>

                <div className="mt-4 flex gap-3">
                    <CustomButton className={"bg-pink-500 rounded-xl"} onClick={() => handleReq("interested")}>Interested</CustomButton>
                    <CustomButton className={"bg-purple-700 rounded-xl"} onClick={() => handleReq("ignored")}>Ignore</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;