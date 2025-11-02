import { defaultPic } from "../../utils/constants";

const ConnectionCard = ({
    firstName,
    lastName,
    age,
    about,
    photoUrl,
    gender
}) => {
    return (
        <div className="flex gap-4 items-center w-full rounded-xl bg-primary-light p-4">
            <div className="size-15 flex items-center rounded-full">
                <img className="rounded-full w-full h-full object-cover" src={photoUrl || defaultPic} alt="profile-pic" />
            </div>
            <div>
                <h1 className="text-xl">{firstName + " " + lastName}</h1>
                <p>{age}, {gender}</p>
                <p>{about?.substr(0, 30) + "..."}</p>
            </div>
        </div>
    );
};

export default ConnectionCard;