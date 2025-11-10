import { defaultPic } from "../../utils/constants";
import { CustomButton } from "../../custom-components";
import { useNavigate } from "react-router-dom";

const ConnectionCard = ({
    firstName,
    lastName,
    age,
    about,
    photoUrl,
    gender,
    _id: targetUserId
}) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center w-full rounded-xl bg-primary-light p-4">
            <div className="flex gap-4 items-center">
                <div className="size-15 flex items-center rounded-full">
                    <img className="rounded-full w-full h-full object-cover" src={photoUrl || defaultPic} alt="profile-pic" />
                </div>
                <div>
                    <h1 className="text-xl">{firstName + " " + lastName}</h1>
                    <p>{age}, {gender}</p>
                    <p>{about?.substr(0, 30) + "..."}</p>
                </div>
            </div>
            <CustomButton className={"w-fit px-10 bg-secondary"} onClick={() => navigate("/chat/" + targetUserId)}>Chat</CustomButton>
        </div>
    );
};

export default ConnectionCard;