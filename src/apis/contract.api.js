import AxiosClient from "./AxiosClient";

const contractApi = {
    get: async (month, year) => {
        const res = await AxiosClient.get(`contract/${month}/${year}`)
        return res.data;
    }
}

export default contractApi;