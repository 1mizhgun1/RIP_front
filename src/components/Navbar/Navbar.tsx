import { FC, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "./Navbar.css"

import { useAuth } from '../../hooks/useAuth';


const Navbar: FC = () => {
    const { is_authenticated, username, auth } = useAuth()

    useEffect(() => {
        auth()
    }, []);

    return (
        <Container id="navbar" style={{ paddingLeft: "30px", width: "200%" }}>
            <Row id="navbar-row" style={{ display: "flex", marginTop: "47px" }}>
                {!is_authenticated &&
                    <Col style={{ width: "70%", marginLeft: "30px" }}>
                        <a href="/">Смотреть товары</a>
                    </Col>
                }
                {!is_authenticated &&
                    <Col style={{ width: "15%", marginLeft: "30px" }}>
                        <a href="/register">Регистрация</a>
                    </Col>
                }
                {!is_authenticated &&
                    <Col style={{ width: "15%", marginLeft: "30px" }}>
                        <a href="/login">Вход</a>
                    </Col>
                }   

                {is_authenticated &&
                    <Col style={{ width: "50%", marginLeft: "30px" }}>
                        <a href="/">Смотреть товары</a>
                    </Col>
                }
                {is_authenticated &&
                    <Col style={{ width: "20%", marginLeft: "30px" }}>
                        <a href="/orders">Мои заказы</a>
                    </Col>
                }
                {is_authenticated && 
                    <Col style={{ width: "15%", marginLeft: "30px" }}>
                        <a href={`/cart`}>Корзина</a>
                    </Col>
                }
                {is_authenticated && 
                    <Col style={{ width: "20%", marginLeft: "30px" }}>
                        <a href="/profile">{username}</a>
                    </Col>
                }      
            </Row>
        </Container>
    )
}

export default Navbar