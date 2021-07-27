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
    async (userId, p) => {
        return await productApi.getProductByUserId(userId, p)
    }
)
export const addProduct = createAsyncThunk(
    'addProduct',
    async (product) => {
        return await productApi.add(product)
    }
)
export const editProduct = createAsyncThunk(
    'editProduct',
    async (product, index) => {
        productApi.edit(product)
        return {p: product, i: index}
    }
)
export const deleteProduct = createAsyncThunk(
    'deleteProduct',
    async (id, index) => {
        productApi.delete(id)
        return index;
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
        },
        [editProduct.fulfilled]: (state, action) => {
            let newState = [...state.data]
            newState[action.payload.p] = {...action.payload.p}
            state.data = [...newState]
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.data.splice(action.payload, 1);
        }  
    }
})

export default productSlice.reducer;