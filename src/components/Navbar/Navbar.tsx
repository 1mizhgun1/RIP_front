import { FC } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./Navbar.css"
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useEffect } from 'react';

const Navbar: FC = () => {
    // const { is_authenticated, username, auth } = useAuth()

    // useEffect(() => {
    //     auth()
    // }, []);

    return (
        <Container style={{ paddingLeft: "30px", width: "200%", backgroundColor: "antiquewhite" }}>
            <Row style={{ display: "flex" }}>
                <Col style={{ width: "70%", margin: "30px" }}>
                    example text
                </Col>
                <Col style={{ width: "30%", margin: "30px" }}>
                    example text 2
                </Col>

                {/* <Link to={ `/` }>
                    <li><a href="#">Штрафы</a></li>
                </Link>

                <Link to={ `/cart` }>
                    <li><a href="#">Нарушения</a></li>
                </Link>

                {!is_authenticated && 
                    <Link to={ `/login` }>
                        <li><a href="#">Вход</a></li>
                    </Link>
                }      

                {is_authenticated && 
                    <Link to={ `/profile` }>
                        <li><a href="#">{ username }</a></li>
                    </Link>
                }       */}
            </Row>
        </Container>
    )
}

export default Navbar