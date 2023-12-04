import { FC, useEffect, useState } from "react"
import { Container, Row } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useSsid } from '../../hooks/useSsid';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import OrderTable from '../../components/OrderTable/OrderTable';

import axios from 'axios';


interface Response {
    pk: number,
    created: string,
    send: string | undefined,
    closed: string | undefined,
    status: "I" | "P" | "D" | "A" | "W",
    user: number,
    moderator: number
}

const OrderListPage: FC = () => {
    const { session_id } = useSsid()
    const { is_authenticated } = useAuth()
    const [ response, setResponse ] = useState<Response[]> ()

    const getOrders = async () => {
        try {
            const { data } = await axios(`http://127.0.0.1:8080/orders/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                }
            })
            setResponse(data)
        } catch {
            console.log("Что-то пошло не так")
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    if (!is_authenticated) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заказов</h1>
            </Container>
        )
    }

    if (response && response.length == 0) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Вы не совершили ни одного заказа</h1>
            </Container>
        )
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

    const getTransformedData = () => {
        let result: any = []
        response?.map((order) => {
            if (order.status != 'I') {
                result.push({
                    pk: order.pk,
                    send: order.send?.slice(0, 10),
                    status: getTextStatus(order.status)
                })
            }
        })
        return result
    }

    return (
        <Container>
            <Row>
                <Breadcrumbs pages={[ { link: `/orders/`, title: `мои заказы` } ]} />
            </Row>
            <Row>
                <h1 className="cart-main-text" style={{ marginTop: "30px", marginLeft: "30px" }}>Список ваших заказов: </h1>
            </Row>
            <Row>
                <OrderTable orders={getTransformedData()}/>
            </Row>
        </Container>
    )
}

export default OrderListPage