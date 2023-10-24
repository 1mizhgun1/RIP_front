import { FC } from 'react'
import { useState } from 'react';
import './Filter.css'

export interface Prices {
    priceMin: Number,
    priceMax: Number,
    priceMinAbsolute: Number,
    priceMaxAbsolute: Number
}

export const Filter: FC<Prices> = ({ priceMin, priceMax, priceMinAbsolute, priceMaxAbsolute }) => {
    const [inputPriceMin, setInputPriceMin] = useState(priceMin.toString());
    const [inputPriceMax, setInputPriceMax] = useState(priceMax.toString());

    return (
        <div id="filter">
            <h4 id="filter-title">Фильтр</h4>
            <h4 id="filter-text">Подбор по параметрам</h4>
            <div id="filter-price">
                <h4 id="filter-price-text">Розничная цена</h4>
                <form action="" method="get" className="filter-price-form">
                    <h4 id="filter-price-text-1">от</h4>
                    <h4 id="filter-price-text-2">до</h4>
                    { priceMin == priceMinAbsolute ?
                        <input id="filter-input-price-min" name="price_min" type="text" size={7} placeholder={priceMin.toString()} /> :
                        <input id="filter-input-price-min" name="price_min" type="text" size={7} value={inputPriceMin} onChange={(e) => setInputPriceMin(e.target.value)} />
                    }
                    { priceMax == priceMaxAbsolute ?
                        <input id="filter-input-price-max" name="price_max" type="text" size={7} placeholder={priceMax.toString()} /> :
                        <input id="filter-input-price-max" name="price_max" type="text" size={7} value={inputPriceMax} onChange={(e) => setInputPriceMax(e.target.value)} />
                    }
                    <input id="filter-price-submit" type="submit" value="применить" />
                </form>
            </div>
        </div>
    )
}