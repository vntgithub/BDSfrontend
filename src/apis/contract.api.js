import AxiosClient from "./AxiosClient";

const contractApi = {
    get: async (month, year) => {
        const res = await AxiosClient.get(`contract/${month}/${year}`)
        return res.data;
    },
    create: async (userId, productId) => {
        
        let data = {
            product: {id: productId},
            user: {id: userId}
        }
       AxiosClient.post("contract", data)
    }
}

export default contractApi;