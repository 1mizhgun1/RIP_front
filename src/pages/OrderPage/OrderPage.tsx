import { FC, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from "../../hooks/useCart";
import { useAuth } from '../../hooks/useAuth';
import { useSsid } from '../../hooks/useSsid';

import ProductCardWithCount, { ProductCardData } from "../../components/ProductCardWithCount/ProductCardWithCount";
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import axios from 'axios';

import "./OrderPage.css"


interface Position {
    product_cnt: number,
    product: number,
    product_data: ProductCardData
}

interface Response {
    pk: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    status: "I" | "P" | "D" | "A" | "W",
    user: number,
    moderator: number,
    positions: Position[]
}

const OrderPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { session_id } = useSsid()
    const { cart, getCart, sendCart, deleteCart, deleteFromCart } = useCart()
    const { is_authenticated } = useAuth()
    const [ response, setResponse ] = useState<Response> ()

    const getCartData = async () => {
        await getCart()
    }

    const getOrderProducts = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/orders/${id}/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                }
            })
            setResponse(data)
        } catch (error) {
            navigate('/products')
        }
    }

    useEffect(() => {
        if (!id) {
            getCartData()
        } else {
            getOrderProducts()
            // if (response && response.status == 'I') {
            //     navigate('/cart')
            // }
        }
    }, [])

    if (!id && !is_authenticated) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы использовать корзину</h1>
            </Container>
        )
    }

    if (!id && cart == undefined) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Ваша корзина пуста</h1>
            </Container>
        )
    }

    const handleSendCart = async () => {
        await sendCart()
    }

    const handleDeleteCart = async () => {
        await deleteCart()
    }

    const handleDeleteFromCart = async (id: number) => {
        await deleteFromCart(id)
    }

    const getTextStatus = (status: string) => {
        if (status === 'P') {
            return 'отправлен'
        } else if (status === 'A') {
            return 'принят'
        } else if (status == 'W') {
            return 'отклонён'
        }
        return ''
    }

    const getStatusColor = (status: string) => {
        if (status == 'принят') {
            return "rgb(73, 171, 50)"
        } else if (status == 'отклонён') {
            return "rgb(237, 104, 137)"
        } else if (status == 'отправлен') {
            return "rgb(193, 189, 58)"
        } else {
            return "white"
        }
    }

    return (
        <Container>
            <Row>
                {!id ? <Breadcrumbs pages={[ { link: `/orders/`, title: `мои заказы` }, { link: `/cart/`, title: `корзина` } ]} /> :
                response && <Breadcrumbs pages={[ { link: `/orders/`, title: `мои заказы` }, { link: `/orders/${id}/`, title: `Заказ №${response.pk} от ${response.send?.slice(0, 10)}` } ]} /> }
            </Row>
            <Container id="cart-page" style={{ marginLeft: "30px" }}>
                <Row style={{ display: "flex" }}>
                    <Col style={{ width: "60%" }}>
                        {!id && <h1 className="cart-main-text">Вы добавили:</h1>}
                        {id && response && <h1 className="cart-main-text" style={{ color: `${getStatusColor(getTextStatus(response.status))}` }}>{response && `Заказ №${response.pk} от ${response.send?.slice(0, 10)}: ${getTextStatus(response.status)}`}</h1>}
                    </Col>
                    {!id && <Col style={{ display: "flex", marginTop: "22px" }}>
                        <button className="send-button" onClick={handleSendCart}>Отправить заказ</button>
                        <button className="delete-button" onClick={handleDeleteCart}>Удалить заказ</button>
                    </Col>}
                </Row>
                <Row style={{ display: "flex", flexWrap: "wrap", height: "max-content", position: "relative", top: "-10px" }}>
                    {!id ? cart.positions.map((pos: Position)  => {
                        const product = pos.product_data
                        return (
                            <div>
                                <button className="remove-button" onClick={() => {handleDeleteFromCart(product.pk)}}>Убрать из корзины</button>
                                <ProductCardWithCount key={product.pk} pk={product.pk} title={product.title} price={product.price} image={product.image} cnt={product.cnt} product_cnt={pos.product_cnt} can_change_cnt={true} />
                            </div>
                        )}
                    ) : response && response.positions.map((pos: Position)  => {
                        const product = pos.product_data
                        return (
                            <ProductCardWithCount key={product.pk} pk={product.pk} title={product.title} price={product.price} image={product.image} cnt={product.cnt} product_cnt={pos.product_cnt} can_change_cnt={false} />
                        )}
                    )}
                </Row>
            </Container>
        </Container>
    )
}

export default OrderPage