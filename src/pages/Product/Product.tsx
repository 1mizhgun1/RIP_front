import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product, getProduct } from '../../modules/getDataFromAPI'
import ProductInfo, {Param} from '../../components/ProductInfo/ProductInfo'
import "./Product.css"

const ProductPage: FC = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<Product>();
    const [parameters, setParameters] = useState<Param[]>([]);

    const getParams = (source: Product) => {
        let params: Param[] = []
        params.push({key: "Пол", value: source.param_sex})
        params.push({key: "Материал", value: source.param_material})
        params.push({key: "Тип оправы", value: source.param_type})
        params.push({key: "Цвет оправы", value: source.param_color})
        params.push({key: "Форма", value: source.param_form})
        params.push({key: "Время без замены", value: source.param_time})
        params.push({key: "Бренд", value: source.param_brand})
        return params
    }

    useEffect(() => {
        id && getProduct(id)
            .then((response) => {
                setProduct(response);
                setParameters(getParams(response))
            })
            .then(() => {
                console.log(parameters);
            })
    }, []);

    return (
        product && parameters && id && <ProductInfo pk={parseInt(id)} title={product.title} price={product.price} cnt={product.cnt} parameters={parameters} image={product.image} />
    )
}

export default ProductPage;