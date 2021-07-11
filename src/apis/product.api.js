import AxiosClient from "./AxiosClient";

const productApi = {
    fetch: async (page) => {
        const res = await AxiosClient.get(`product/page/${page}`);
        return res.data;
    },
    search: async(url) => {
        console.log(url)
        const res = await AxiosClient.get(url)
        return res.data
    },

    getNumberOfPage: async () => {
        const res = await AxiosClient.get("product/numberofpage");
        return res.data;
    },
    getProductByUserId: async (id) => {
        if(id){
            const res = await AxiosClient.get(`product/${id}`)
            return res.data;
        }
        return [];
    }

}

export default productApi;