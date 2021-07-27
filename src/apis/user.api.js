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
        
    }
}

export default userApi;