import  AxiosClient  from "./AxiosClient";

const userApi = {
    signIn: async(signInData) => {
        const res =  await AxiosClient.post("account/login", signInData)
        return res.data;
    },
    signUp: async(signupData) => {
        const res = await AxiosClient.post("account/signup", signupData);
        return res.data;
    }
}

export default userApi;