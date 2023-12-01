import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"


export default configureStore({
    reducer: combineReducers({
        ourData: cartReducer
    })
})