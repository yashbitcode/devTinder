import axios from "axios";
import { apiEndpoints, baseUrl } from "../utils/constants";

class AuthService {
    baseUrl;

    constructor() {
        this.baseUrl = baseUrl;
    }

    async createAccount({ firstName, lastName, emailId, password }) {
        try {
            const res = await axios.post(
                this.baseUrl + apiEndpoints.signUp,
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async loginAccount({ emailId, password }) {
        try {
            const res = await axios.post(
                this.baseUrl + apiEndpoints.login,
                {
                    emailId,
                    password,
                },
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async forgotPassword({
        emailId,
        oldPassword,
        newPassword,
        confirmPassword,
    }) {
        try {
            const res = await axios.patch(
                this.baseUrl + apiEndpoints.forgotPassword,
                {
                    emailId,
                    oldPassword,
                    newPassword,
                    confirmPassword,
                },
                {
                    withCredentials: true
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async logout() {
        try {
            const res = await axios.post(this.baseUrl + apiEndpoints.logout, {}, {
                withCredentials: true
            });

            return res;
        } catch (error) {
            return error;
        }
    }
}

export default new AuthService();
