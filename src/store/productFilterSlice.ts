import { createSlice } from "@reduxjs/toolkit"


interface Filter {
    searchValue: string,
    minPriceValue: number | undefined,
    maxPriceValue: number | undefined
}

const initialState: Filter = {
    searchValue: "",
    minPriceValue: undefined,
    maxPriceValue: undefined
}

const productFilterSlice = createSlice({
    name: 'productFilter',
    initialState: initialState,
    reducers: {
        updateSearchValue: (state, action) => {
            console.log(`payload: ${action.payload}`)
            state.searchValue = action.payload
        },
        updateMinPriceValue: (state, action) => {
            console.log(`payload: ${action.payload}`)
            state.searchValue = action.payload
        },
        updateMaxPriceValue: (state, action) => {
            console.log(`payload: ${action.payload}`)
            state.searchValue = action.payload
        },
    }
})

export const { updateSearchValue, updateMinPriceValue, updateMaxPriceValue } = productFilterSlice.actions

export default productFilterSlice.reducer