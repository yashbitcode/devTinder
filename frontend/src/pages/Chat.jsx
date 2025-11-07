import { useParams } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";

const Chat = () => {
    const { targetUserId } = useParams();

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-2xl w-full p-4 border-2 border-gray-600">
                Chat
            </div>

            <div className="w-full border-l-2 border-r-2 p-4 h-96 border-gray-600">

            </div>

            <div className="w-full p-4 flex gap-4 items-center border-gray-600 border-2">
                <CustomInput /> 
                <CustomButton className={"shrink w-full max-w-30"}>Send</CustomButton>
            </div>
        </div>
    );
};

export default Chat;