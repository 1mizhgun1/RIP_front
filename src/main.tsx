import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import ProductListPage from "./pages/ProductList/ProductList.tsx";
import ProductPage from "./pages/Product/Product.tsx";
// import OrderListPage from "./pages/OrderListPage/OrderListPage.tsx";
// import CartPage from "./pages/CartPage/CartPage";
// import LoginPage from "./pages/LoginPage/LoginPage.tsx";
// import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";

import HeadTitle from "./components/HeadTitle/HeadTitle.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
// import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";

import store from "./store/store.ts";

import { Container, Row } from "react-bootstrap";
import "./main.css";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={ queryClient }>
        <Provider store={ store }>
            <BrowserRouter>
                <Container>
                    <Row id="header">
                        <HeadTitle />
                        <Navbar />
                    </Row>
                    <Row>
                        {/* <Breadcrumbs /> */}
                        <Routes>
                            <Route path="/"             element={ <Navigate to="/products" replace /> } />
                            <Route path="products/"     element={ <ProductListPage /> } />
                            <Route path="products/:id"  element={ <ProductPage /> } />
                            {/* <Route path="cart/" element={<Breaches/>}/>
                            <Route path="orders/draft/" element={<BreachPage/>}/>
                            <Route path="login/" element={<LoginPage/>}/>
                            <Route path="profile/" element={<ProfilePage/>}/> */}
                        </Routes>
                    </Row>
                </Container>
            </BrowserRouter>
        </Provider>
    </QueryClientProvider>
);