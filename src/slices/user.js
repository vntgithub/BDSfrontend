import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../apis/user.api"

export const signIn = createAsyncThunk(
    "signIn",
    async (signInData) => {
        return await userApi.signIn(signInData);
        
    }
)



const userSlice = createSlice({
    name: "user",
    initialState: {data: {avt: "#"}},
    reducers:{
        signInByToken (state, action) {
            state.data = action.payload;
        },
        logout (state) {
            state.data = {avt: "#"}
        }
    },
    extraReducers:{
        [signIn.fulfilled]: (state, action) => {
            state.data = action.payload.user;
        }
    }
})

export const { signInByToken, logout } = userSlice.actions
export default userSlice.reducer;