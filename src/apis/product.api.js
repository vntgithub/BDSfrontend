import AxiosClient from "./AxiosClient";

const productApi = {
    fetch: async (page) => {
        const res = await AxiosClient.get(`product/page/${page}`);
        return res.data;
    },
    search: async(url) => {
        const res = await AxiosClient.get(url)
        return res.data
    },

    getNumberOfPage: async () => {
        const res = await AxiosClient.get(`product/numberofpage`);
        return res.data;
    },
    getNumberOfPageOfUser: async (id) => {
        const res = await AxiosClient.get(`product/numberofpage/${id}`);
        return res.data;
    },
    getProductByUserId: async (id, page) => {
        if(id){
            const res = await AxiosClient.get(`product/${id}/${page}`)
            return res.data;
        }
        return [];
    },
    add: async (product) => {
        const res = await AxiosClient.post("product", product)
        return res.data
    },
    edit: async (product) => {
        AxiosClient.put("product", product)
        console.log(product)
    },
    delete: async (id) => {
        AxiosClient.delete(`product/${id}`)
    },
    getProductById: async (id) => {
        const res = await AxiosClient.get(`product/detail/${id}`)
        return res.data;
    },
    

}

export default productApi;