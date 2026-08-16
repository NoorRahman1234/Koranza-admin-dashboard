import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Change port if your backend uses another port
});



export const paymentAPI = {
    updateStatus: async (transactionId, status) => {
        const response = await api.put(
            `/payments/${transactionId}`,
            { status }
        );

        return response.data;
    }
};





export default api;