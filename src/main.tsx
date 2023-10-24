import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HeadTitle from './components/HeadTitle/HeadTitle'
import MainPage from './pages/ProductList/ProductList'
import ProductPage from './pages/Product/Product'

import "./main.css"
import Navigation from './components/Navbar/Navbar';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/products/:id',
        element: <ProductPage />
    }
])
  
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <div className="head">
            <HeadTitle />
            <Navigation />
        </div>
        <RouterProvider router={router} />
    </React.StrictMode>,
)