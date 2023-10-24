export interface Product {
    pk: Number,
    title: string,
    file_extension: 'jpg' | 'png',
    price: Number,
    cnt: Number,
    status: 'A' | 'N',
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex: string,
    param_material: string,
    param_type: string,
    param_color: string,
    param_form: string,
    param_time: string,
    param_brand: string,
    last_modified: string,
    image: string
}

interface Prices {
    price_min: Number,
    price_max: Number
}

export const getProductList = async (priceMin: Number, priceMax: Number, type: string): Promise<Product[]> => {
    return fetch(`http://127.0.0.1:8080/products/?status=A&type=${type}&price_min=${priceMin}&price_max=${priceMax}`)
        .then((response) => response.json())
        .catch(() => [])
}

export const getPrices = async (type: string): Promise<Prices> => {
    return fetch(`http://127.0.0.1:8080/prices/?status=A&type=${type}`)
        .then((response) => response.json())
        .catch(() => undefined)
}

export const getProduct = async (id: string): Promise<Product> => {
    return fetch(`http://127.0.0.1:8080/products/${id}/`)
        .then((response) => response.json())
        .catch(() => undefined)
}