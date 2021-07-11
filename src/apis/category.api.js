import AxiosClient from "./AxiosClient";

const categoryApi = {
    getAll: async () => {
        const res = await AxiosClient.get("category")
        return res.data;
    }
}

export default categoryApi;