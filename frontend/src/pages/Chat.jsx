import { useParams } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";
import { useCallback, useEffect, useRef, useState } from "react";
import setupSocketConnection from "../utils/setupSocketConnection";
import { useSelector } from "react-redux";
import ChatService from "../services/chatService";
import { twMerge } from "tailwind-merge";
import { toast } from "react-toastify";
import { defaultPic } from "../utils/constants";

/* 
    - getting intial chats
    - then afterwards if user sending
        - make the state update not db pull
        - {
            senderId,
            message,
            _id,
            creation date,
        } 
*/

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((state) => state.userReducer.user);
    const msgRef = useRef(null);
    const socketRef = useRef(null);
    const [targetUserStatus, setTargetUserStatus] = useState(false);
    const [targetUser, setTargetUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState({
        load: true,
        resolved: false
    });

    const fetchChats = useCallback(async () => {
        const res = await ChatService.getUserChats(targetUserId);

        if (res?.data?.success) {
            setMessages(res.data.chat.messages);
            setLoading({
                load: false,
                resolved: true
            });
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong");
            setLoading({
                load: false,
                resolved: false
            });
        }
    }, [targetUserId]);

    const verifyConn = useCallback(async () => {
        const res = await ChatService.verifyUserConnection(targetUserId);

        if (res?.data?.success) {
            setTargetUser(res.data.data);
            return true;
        }
        else {
            toast.error(res?.response?.data?.error || "Something went wrong");
            return false;
        }
    }, [targetUserId]);

    useEffect(() => {
        verifyConn().then((res) => {
            if (socketRef.current) return;

            if (!res) {
                setLoading({
                    load: false,
                    resolved: false
                });

                return;
            }

            fetchChats();

            const socket = setupSocketConnection();

            socketRef.current = socket;

            socket.on("receivedMessage", (msgObj) => {
                msgObj._id = crypto.randomUUID();
                msgObj.createdAt = Date.now().toString();

                setMessages((prev) => [
                    ...prev,
                    msgObj,
                ]);
            });

            socket.on("getOnlineStatus", (status) => {
                console.log(status);
                setTargetUserStatus(status[targetUserId]);
            });

            socket.emit("joinChat", user._id, [targetUserId, user._id]);
        });

        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, [user, targetUserId, fetchChats, verifyConn]);

    const sendMessage = (e) => {
        e.preventDefault();

        const msgObj = {
            sender: {
                senderId: user._id,
                name: user.firstName
            },
            message: msgRef.current.value,
            _id: crypto.randomUUID(),
            createdAt: Date.now().toString(),
        };

        socketRef.current.emit("sendMessage", {
            sender: msgObj.sender,
            message: msgObj.message,
            ids: [targetUserId, user._id],
        });

        msgRef.current.value = "";

        setMessages((prev) => [
            ...prev,
            msgObj
        ]);
    };


    if (!loading.load && !loading.resolved) return <div className="bg-white text-black w-fit mx-auto px-3 py-2 text-2xl rounded-md">Connection Doesn't Exist</div>

    return !loading.load && (
        <div className="max-w-3xl mx-auto w-full">
            <div className="w-full p-4 border-2 flex justify-between border-gray-600 items-center">
                <h1 className="text-2xl">Chat</h1>
                <div className="flex items-center gap-2">
                    {
                        targetUserStatus?.isOnline ? <div className={"size-2.5 rounded-full bg-green-500"} /> : targetUserStatus?.lastSeen && <div>Last Seen {new Date(targetUserStatus.lastSeen).toLocaleString()}</div>
                    }
                    <h2>{targetUser?.firstName}</h2>
                    <div className="size-10 flex items-center rounded-full">
                        <img className="rounded-full w-full h-full object-cover" src={targetUser?.photoUrl || defaultPic} alt="profile-pic" />
                    </div>
                </div>
            </div>

            <div className="w-full border-l-2 flex flex-col gap-2 border-r-2 p-4 h-96 border-gray-600 overflow-y-scroll no-scrollbar">
                {
                    messages?.map((msg) => (
                        <div className={twMerge("max-w-xs w-full", (user._id === msg.sender.senderId) && "self-end text-end")} key={msg._id}>
                            <h1 className="text-sm">{msg.sender.name}</h1>
                            <p className={twMerge("w-fit py-2 px-3 text-sm mt-1 rounded-md bg-neutral-700", (user._id === msg.sender.senderId) && "ml-auto")}>{msg.message}</p>
                        </div>
                    ))
                }
            </div>

            <form className="w-full p-4 flex gap-4 items-center border-gray-600 border-2" onSubmit={sendMessage}>
                <CustomInput ref={msgRef} />
                <CustomButton type="submit" className={"shrink w-full max-w-30"} >Send</CustomButton>
            </form>
        </div>
    );
};

export default Chat;