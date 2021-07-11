import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userApi from "../apis/user.api"

export const signIn = createAsyncThunk(
    "signIn",
    async (signInData) => {
        return await userApi.signIn(signInData);
        
    }
)

export const signInByToken = createAsyncThunk(
    'signInByToken',
    async (token) => {
        return await userApi.signInByToken(token);
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {data: {}},
    reducers:{},
    extraReducers:{
        [signIn.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [signInByToken.fulfilled]: (state, action) => {
            state.data = action.payload;
        }   
    }
})

export default userSlice.reducer;