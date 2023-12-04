import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	order: undefined
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		updateCart(state, action) {
			state.order = action.payload
		}
	}
})

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;