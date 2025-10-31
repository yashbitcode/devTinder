import { CustomButton } from "../../custom-components";
import { defaultPic } from "../../utils/constants";

const FeedCard = ({
    firstName, 
    lastName,
    about,
    photoUrl,
}) => {
    return (
        <div className="w-full max-w-2xs rounded-md bg-primary-light">
            <div className="w-full max-h-[330px] overflow-hidden">
                <img src={photoUrl || defaultPic} alt="photo-pic" className="rounded-t-md w-full h-full object-cover" />
            </div>

            <div className="p-2">
                <h1>{firstName + " " + lastName}</h1>
                <p>{about}</p>

                <div className="mt-2 flex gap-3">
                    <CustomButton className={"bg-pink-500 rounded-xl"}>Interested</CustomButton>
                    <CustomButton className={"bg-purple-700 rounded-xl"}>Ignore</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;