import { configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"

import userReducer from "./slices/user"
import productReducer from "./slices/product"

const reducer = combineReducers({
    user: userReducer,
    product: productReducer
});

export default configureStore({reducer});
