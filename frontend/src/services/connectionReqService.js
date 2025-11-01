import axios from "axios";
import { apiEndpoints, baseUrl } from "../utils/constants";

class ConnectionReqService {
    baseUrl;

    constructor() {
        this.baseUrl = baseUrl;
    }

    async getAllConnections() {
        try {
            const res = await axios.get(
                this.baseUrl + apiEndpoints.connections,
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async getAllRequests() {
        try {
            const res = await axios.get(this.baseUrl + apiEndpoints.requests, {
                withCredentials: true,
            });

            return res;
        } catch (error) {
            return error;
        }
    }

    async sendRequest(status, userId) {
        try {
            const res = await axios.post(this.baseUrl + apiEndpoints.sendRequest + `/${status}/${userId}`,
                {},
                {
                    withCredentials: true,
                }
            );

            return res;
        } catch (error) {
            return error;
        }
    }

    async reviewRequest(status, reqId) {
        try {
            const res = await axios.post(this.baseUrl + apiEndpoints.reviewReq + `/${status}/${reqId}`,
                {},
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

export default new ConnectionReqService();
