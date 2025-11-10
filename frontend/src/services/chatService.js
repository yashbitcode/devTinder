import axios from "axios";
import { apiEndpoints, baseUrl } from "../utils/constants";

class ChatService {
    baseUrl;

    constructor() {
        this.baseUrl = baseUrl;
    }

    async getUserChats(targetUserId) {
        try {
            const res = await axios.get(
                this.baseUrl + apiEndpoints.chats + `/${targetUserId}`,
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async verifyUserConnection(targetUserId) {
        try {
            const res = await axios.get(
                this.baseUrl + apiEndpoints.chats + `/${targetUserId}`,
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }
}

export default new ChatService();
