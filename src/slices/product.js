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
export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        return await productApi.add(product)
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
        },
        [addProduct.fulfilled]: (state, action) => {
            const newData = [...state.data, action.payload]
            state.data = newData;
        }  
    }
})

export default productSlice.reducer;