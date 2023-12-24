import { FC, useState, ChangeEvent, FormEvent } from "react"

export interface ProductFormData {
    title: string,
    price: number,
    cnt: number,
    type: 'frames' | 'sunglasses' | 'lenses',
    param_sex?: string,
    param_material?: string,
    param_type?: string,
    param_color?: string,
    param_form?: string,
    param_time?: string,
    param_brand: string,
    image?: string
}

interface ProductFormProps {
    onSubmit: (product: ProductFormData) => void;
    initialValues: ProductFormData;
}

const ProductForm: FC<ProductFormProps> = ({ onSubmit, initialValues }) => {
    const [values, setValues] = useState<ProductFormData> (initialValues)
    const [image, setImage] = useState<File | undefined> ()
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setImage(file ? file : undefined)
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ ...values });

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageString = reader.result as string;
                setValues((prevValues) => ({
                    ...prevValues,
                    ['image']: imageString,
                }));
            }
            reader.readAsDataURL(image);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Название</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Цена</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="cnt">Количество на складе</label>
                <input
                    type="number"
                    id="cnt"
                    name="cnt"
                    value={values.cnt}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="type">Тип товара</label>
                <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                >
                    <option value="frames">оправа для очков</option>
                    <option value="sunglasses">солнцезащитные очки</option>
                    <option value="lenses">контактные линзы</option>
                </select>
            </div>
            <div>
                <label htmlFor="param_sex">Пол</label>
                <input
                    type="text"
                    id="param_sex"
                    name="param_sex"
                    value={values.param_sex}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_material">Материал оправы</label>
                <input
                    type="text"
                    id="param_material"
                    name="param_material"
                    value={values.param_material}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_type">Тип оправы</label>
                <input
                    type="text"
                    id="param_type"
                    name="param_type"
                    value={values.param_type}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_color">Цвет оправы</label>
                <input
                    type="text"
                    id="param_color"
                    name="param_color"
                    value={values.param_color}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_form">Форма</label>
                <input
                    type="text"
                    id="param_form"
                    name="param_form"
                    value={values.param_form}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_time">Время без замены</label>
                <input
                    type="text"
                    id="param_time"
                    name="param_time"
                    value={values.param_time}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="param_brand">Бренд</label>
                <input
                    type="text"
                    id="param_brand"
                    name="param_brand"
                    value={values.param_brand}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="image">Изображение товара</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit">Сохранить</button>
        </form>
    )
}

export default ProductForm