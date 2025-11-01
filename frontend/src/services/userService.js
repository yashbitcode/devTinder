import axios from "axios";
import { apiEndpoints, baseUrl } from "../utils/constants";

class UserService {
    baseUrl;

    constructor() {
        this.baseUrl = baseUrl;
    }

    async getUserProfile() {
        try {
            const res = await axios.get(this.baseUrl + apiEndpoints.profile, {
                withCredentials: true,
            });

            return res;
        } catch (error) {
            return error;
        }
    }

    async updateUserProfile(payload) {
        try {
            const res = await axios.patch(this.baseUrl + apiEndpoints.updateUser, payload, {
                withCredentials: true
            });

            return res;            
        } catch (error) {
            return error;
        }
    }

    async getFeed() {
        try {
            const res = await axios.get(this.baseUrl + apiEndpoints.feed, {
                withCredentials: true
            });

            return res;
        } catch (error) {
            return error;
        }
    }
}

export default new UserService();
