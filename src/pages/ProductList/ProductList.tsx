import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Product, getProductList, getPrices } from '../../modules/getDataFromAPI'
import ProductCard from '../../components/ProductCard/ProductCard';
import { Prices, Filter }  from '../../components/Filter/Filter';
import "./ProductList.css"

// TODO
// 1. Поиск по названию
// 2. Фильтр по полу (можно даже рядом с каждым пунктом указать количество товаров)
// 3. 3 карточки-заглушки, если API не отвечает
// 4. Дефолтная пикчу для карточки, если у неё нет своей
// 5. Navbar из списка базовых страниц
// 6. Путь до текущей страницы
// 7. Развернуть фронтенд на Github Pages

const MainPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [prices, setPrices] = useState<Prices>();
    const engName: string  = '';

    const location = useLocation();
    const request = new URLSearchParams(location.search);
    const requestPriceMin = request.get('price_min');
    const requestPriceMax = request.get('price_max');

    useEffect(() => {
        
        getPrices(engName)
            .then((response) => {
                const minValueAbsolute = response.price_min;
                const maxValueAbsolute = (response.price_max == 10000000000 ? 0 : response.price_max);
                const minValue = (requestPriceMin ? parseInt(requestPriceMin) : minValueAbsolute);
                const maxValue = (requestPriceMax ? parseInt(requestPriceMax) : maxValueAbsolute);
                setPrices({
                    priceMin: minValue,
                    priceMax: maxValue,
                    priceMinAbsolute: minValueAbsolute,
                    priceMaxAbsolute: maxValueAbsolute
                });
                
                getProductList(minValue, maxValue, engName)
                    .then((response) => {
                        setProducts(response);
                    });
            })

    }, []);

    return (
        <div id='main-page'>
            {prices && <Filter priceMin={prices.priceMin} priceMax={prices.priceMax} priceMinAbsolute={prices.priceMinAbsolute} priceMaxAbsolute={prices.priceMaxAbsolute} />}
            <div className='box'>
                {products && products.map((product) => (
                    <ProductCard key={product.pk.toString()} pk={product.pk} title={product.title} price={product.price} image={product.image} cnt={product.cnt}/>
                ))}
            </div>
        </div>
    );
}

export default MainPage