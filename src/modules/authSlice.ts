import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from 'react-redux';

const initialState = {
    user: {
        pk: -1,
        username: "",
        is_authenticated: false,
        is_moderator: false,
        active_order: -1,
    }
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUser: (state, { payload }) => {
            state.user.is_authenticated = payload.is_authenticated
            state.user.is_moderator = payload.is_moderator
            state.user.pk = payload.pk
            state.user.username = payload.username
            state.user.active_order = payload.active_order
        },
        cleanUser: (state) => {
            state.user.is_authenticated = false
            state.user.is_moderator = false
            state.user.pk = -1
            state.user.username = ""
            state.user.active_order = -1
        }
    }
})

export const useUser = () =>
    //@ts-ignore
    useSelector(state => state.ourData.user)

export const { updateUser, cleanUser } = authSlice.actions

export default authSlice.reducer