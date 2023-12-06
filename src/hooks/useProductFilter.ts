import { useDispatch, useSelector } from 'react-redux';
import { updateSearchValue, updateMinPriceValue, updateMaxPriceValue } from "../store//productFilterSlice";


export function useProductFilter() {
    //@ts-ignore
    const searchValue: string = useSelector(state => state.productFilter.searchValue)
    //@ts-ignore
    const minPriceValue: number | undefined = useSelector(state => state.productFilter.minPriceValue)
    //@ts-ignore
    const maxPriceValue: number | undefined = useSelector(state => state.productFilter.maxPriceValue)

    const dispatch = useDispatch()

    const setSearchValue = (value: any) => {
        dispatch(updateSearchValue(value))
        console.log(`new search = ${value}`)
    }

    const setMinPriceValue = (value: any) => {
        dispatch(updateMinPriceValue(value))
        console.log(`new min price = ${value}`)
    }

    const setMaxPriceValue = (value: any) => {
        dispatch(updateMaxPriceValue(value))
        console.log(`new max price = ${value}`)
    }

    return {
        searchValue,
        minPriceValue,
        maxPriceValue,
        setSearchValue,
        setMinPriceValue,
        setMaxPriceValue
    }
}