import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import productFilterSlice from "./productFilterSlice"


export default configureStore({
    reducer: {
        user: authReducer,
        cart: cartReducer,
        productFilter: productFilterSlice,
    }
})