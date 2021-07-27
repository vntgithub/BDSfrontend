import { configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"

import userReducer from "./slices/user"
import productReducer from "./slices/product"
import viewReducer from './slices/view'

const reducer = combineReducers({
    user: userReducer,
    product: productReducer,
    view: viewReducer
});

export default configureStore({reducer});
