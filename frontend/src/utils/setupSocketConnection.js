import { io } from "socket.io-client";
import { baseUrl } from "./constants";

const setupSocketConnection = () => {
    const socket = io(baseUrl, {
        withCredentials: true,
    });
    
    return socket;
};

export default setupSocketConnection;
