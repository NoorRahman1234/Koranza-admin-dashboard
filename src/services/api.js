import axios from "axios";
const api = axios.create({
  baseURL: "https://koranza-backend.vercel.app/api",
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