import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: 'user',
    initialState: {
        user_id: -1,
        user_name: "",
        is_authenticated: false,
        is_moderator: false,
    },
    reducers: {
        updateUser: (state, { payload }) => {
            state.is_authenticated = payload.is_authenticated
            state.is_moderator = payload.is_moderator
            state.user_id = payload.user_id
            state.user_name = payload.user_name
        },
        cleanUser: (state) => {
            state.is_authenticated = false
            state.is_moderator = false
            state.user_id = -1
            state.user_name = ""
        }
    }
})

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer