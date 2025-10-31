import { CustomButton } from "../../custom-components";
import { defaultPic } from "../../utils/constants";

const RequestCard = ({
    firstName,
    lastName,
    about,
    photoUrl,
}) => {
    return (
        <div className="flex gap-4 items-center w-full rounded-xl bg-primary-light p-4">
            <div className="size-15 flex items-center rounded-full">
                <img className="rounded-full w-full h-full object-cover" src={photoUrl || defaultPic} alt="profile-pic" />
            </div>
            <div className="grow">
                <h1 className="text-xl">{firstName + " " + lastName}</h1>
                <p>{about}</p>
            </div>
            <div className="flex gap-3">
                    <CustomButton className={"bg-pink-500 rounded-xl"}>Accept</CustomButton>
                    <CustomButton className={"bg-purple-700 rounded-xl"}>Reject</CustomButton>
                </div>
        </div>
    );
};

export default RequestCard;