import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from "./modules/store";
import { Provider } from "react-redux";

import HeadTitle from './components/HeadTitle/HeadTitle'
import Navbar from './components/Navbar/Navbar'
// import MainPage from './pages/MainPage/MainPage';
import ProductListPage from './pages/ProductList/ProductList'
import ProductPage from './pages/Product/Product'
import Cart from './pages/Cart/Cart.tsx';
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "./main.css"
import { getBase } from '../path_config.ts';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const router = createBrowserRouter([
    // {
    //     path: '/',
    //     element: <MainPage />
    // },
    {
        path: `${getBase()}/`,
        element: <ProductListPage />
    },
    {
        path: `${getBase()}/products/:id/`,
        element: <ProductPage />
    },
    {
        path: `${getBase()}/cart/`,
        element: <Cart />
    },
    {
        path: `${getBase()}/login/`,
        element: <LoginPage />
    },
    {
        path: `${getBase()}/profile/`,
        element: <ProfilePage />
    },
])
  
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={ store } >
        <Container>
            <Row id="header">
                <HeadTitle />
                <Navbar />
            </Row>
            <Row>
                <RouterProvider router={router} />
            </Row>
        </Container>
    </Provider>
)