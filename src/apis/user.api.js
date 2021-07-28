import  AxiosClient  from "./AxiosClient";

const userApi = {
    signIn: async(signInData) => {
        const res =  await AxiosClient.post("account/login", signInData)
        return res.data;
    },
    signUp: async(signupData) => {
        const res = await AxiosClient.post("account/signup", signupData);
        return res.data;
    },
    signInByToken: async (token) => {
        AxiosClient.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        try{
            const res = await AxiosClient.get("account")
            return res.data;
        }catch{
            return {};
        }
        
    },
    delete: async (id) => {
        AxiosClient.delete(`user/${id}`)
    },
    getListUsers: async (p) => {
        const res = await AxiosClient.get(`user/page/${p}`)
        console.log(res.data)
        return res.data;
    },
    countPage: async (id) => {
        const res = await AxiosClient.get("user/countpage")
        return res.data;
    }
}

export default userApi;