import { useParams } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";
import { useEffect, useRef, useState } from "react";
import setupSocketConnection from "../utils/setupSocketConnection";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((state) => state.userReducer.user);
    const msgRef = useRef(null);
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // verify the connection

        // setting io conn
        const socket = setupSocketConnection();
        socketRef.current = socket;

        socket.on("receivedMessage", (msgObj) => {
            msgObj.id = Date.now();
            msgObj.receiver = true;

            setMessages((prev) => [
                ...prev,
                msgObj,
            ]);
        });

        socket.emit("joinChat", [targetUserId, user._id]);

        return () => socket.disconnect();
    }, [user, targetUserId]);

    const sendMessage = () => {
        const msgObj = {
            name: user.firstName,
            message: msgRef.current.value,
            id: Date.now(),
            receiver: false
        };

        socketRef.current.emit("sendMessage", msgObj);
        msgRef.current.value = "";

        setMessages((prev) => [
            ...prev,
            msgObj
        ]);
    };

    return (
        <div className="max-w-3xl mx-auto w-full">
            <div className="text-2xl w-full p-4 border-2 border-gray-600">
                Chat
            </div>

            <div className="w-full border-l-2 flex flex-col gap-2 border-r-2 p-4 h-96 border-gray-600 overflow-y-scroll no-scrollbar">
                {
                    messages.map((msg) => (
                        <div className={twMerge("max-w-xs w-full", !msg.receiver && "self-end text-end")} key={msg.id}>
                            <h1>{msg.name}</h1>
                            <p className={twMerge("w-fit py-2 px-3 text-sm mt-1 rounded-md bg-primary-light", !msg.receiver && "ml-auto")}>{msg.message}</p>
                        </div>
                    ))
                }
            </div>

            <div className="w-full p-4 flex gap-4 items-center border-gray-600 border-2">
                <CustomInput ref={msgRef} />
                <CustomButton className={"shrink w-full max-w-30"} onClick={sendMessage}>Send</CustomButton>
            </div>
        </div>
    );
};

export default Chat;