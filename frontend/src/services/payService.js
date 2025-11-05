import axios from "axios";
import { apiEndpoints, baseUrl } from "../utils/constants";

class PayService {
    baseUrl;

    constructor() {
        this.baseUrl = baseUrl;
    }

    async makePayment(membershipType) {
        try {
            const res = await axios.post(this.baseUrl + apiEndpoints.payment, {
                membershipType
            }, {
                withCredentials: true
            });
            
            return res;
        } catch(error) {
            console.log(error)
            return error;
        }
    }   
}

export default new PayService();
