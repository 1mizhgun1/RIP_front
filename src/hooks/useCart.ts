import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from "../store/cartSlice";
import axios from "axios";
import { useSsid } from "./useSsid";


export function useCart() {
    const { session_id } = useSsid()

    //@ts-ignore
    const cart = useSelector(state => state.cart.order);
    const dispatch = useDispatch()

    const setCart = (value: any) => {
        dispatch(updateCart(value))
    }

    const getCart = async () => {
        const response = await axios(`http://localhost:8080/orders/cart/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status == 202) {
            setCart(response.data)
        }
    }

    const addToCart = async (product_id: number) => {
        const response = await axios(`http://localhost:8080/products/${product_id}/`, {
            method: "POST",
            headers: {
                'authorization': session_id
            },
        })

        if (response.status == 202) {
            setCart(response.data)
        }
    }

    const sendCart = async () => {
        const response = await axios(`http://localhost:8080/orders/`, {
            method: "PUT",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 202) {
            setCart(undefined)
        }
    }

    const deleteCart = async () => {
        const response = await axios(`http://localhost:8080/orders/`, {
            method: "DELETE",
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 204) {
            setCart(undefined)
        }
    }

    const deleteFromCart = async (product_id: number) => {
        const response = await axios(`http://localhost:8080/links/`, {
            method: "DELETE",
            data: {
                'product': product_id
            },
            headers: {
                'authorization': session_id
            }
        })

        if (response.status == 202) {
            if (response.data == "undefined") {
                setCart(undefined)
            } else {
                setCart(response.data)
            }
        }
    }

    return {
        cart,
        addToCart,
        sendCart,
        deleteCart,
        deleteFromCart,
        getCart
    };
}