import { FC } from 'react'
import { useCart, useCartSum } from "../../modules/cartSlice";
// import { useDispatch } from "react-redux";

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import ProductCard from "../../components/ProductCard/ProductCard"


const Cart: FC = () => {
    // const dispatch = useDispatch()
    const products = useCart()
    const total = useCartSum()

    return(
        <Container>
            <Row>
                <h2>{ `Итого: ${total}₽` }</h2>
            </Row>
            <Container>
            {//@ts-ignore
                products && products.map((product) =>
                    <Row>
                        <ProductCard key={product.pk.toString()}
                                pk={product.pk}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                                cnt={product.cnt}/>
                    </Row>
                )}
            </Container>
        </Container>
    )
}

export default Cart