import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


interface ProductInCart {
    pk: number,
    title: string,
    price: number,
    cnt: number,
    image: string
}

interface Cart {
    products: ProductInCart[],
    total: number
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        total: 0
    } as Cart,
    reducers: {
        addProduct(state, { payload }) {
            state.products.push(payload)
        }
    }
})

export const useCart = () =>
    //@ts-ignore
    useSelector((state) => state.ourData.products)

export const useCartSum = () =>
    //@ts-ignore
    useSelector((state) => state.ourData.total)

export const {
    addProduct: setProductsAction
} = cartSlice.actions

export default cartSlice.reducer