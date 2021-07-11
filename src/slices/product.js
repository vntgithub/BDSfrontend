import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productApi from "../apis/product.api"

export const fetchProduct = createAsyncThunk(
    "fetchProduct",
    async (p) => {
       const data =  await productApi.fetch(p);
       return data;
    }
)

export const searchProduct = createAsyncThunk(
    "searchProduct",
    async (urlToCallApi) => {
        return await productApi.search(urlToCallApi);
    }
)

export const fetchProductByUserId = createAsyncThunk(
    "fetchProductByUserId",
    async (userId) => {
        return await productApi.getProductByUserId(userId)
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {data: []},
    reducers:{},
    extraReducers:{
        [fetchProduct.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [searchProduct.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [fetchProductByUserId.fulfilled]: (state, action) => {
            state.data = action.payload;
        }  
    }
})

export default productSlice.reducer;