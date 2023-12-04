import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./authSlice"
import cartReducer from "./cartSlice"


export default configureStore({
    reducer: {
        user: authReducer,
        cart: cartReducer
    }
})