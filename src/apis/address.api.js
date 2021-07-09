import AxiosClient from './AxiosClient';

const addressApi = {
    getProvinceCity: async () => {
        const res = await AxiosClient.get("province_city");
        return res.data;
    },
    getDistrict: async (cityId) => {
        const res = await AxiosClient.get(`district/${cityId}`)
        return res.data;
    },
    getWard: async (districtId) => {
        const res = await AxiosClient.get(`ward/${districtId}`)
        return res.data;
    },
    getStreet: async (wardId) => {
        const res = await AxiosClient.get(`street/${wardId}`)
        return res.data;
    }
}

export default addressApi;