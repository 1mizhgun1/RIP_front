import { useDispatch} from 'react-redux';
import { updateUser, cleanUser, useUser } from "../modules/authSlice";
import axios from "axios";
import { useSsid } from './useSsid';

export function useAuth() {
    const { is_authenticated, is_moderator, pk, username, active_order } = useUser()
    const { session_id, setSsid, resetSsid } = useSsid()
    const dispatch = useDispatch()

    const setUser = (value: any) => {
        dispatch(updateUser(value))
    }

    const resetUser = () => {
        dispatch(cleanUser())
    }

    const logOut = async () => {
        try {
            console.log(session_id)
            const response = await axios(`http://localhost:8080/accounts/logout/`, {
                method: "POST",
                headers: {
                    'authorization': session_id
                }
            })

            console.log(response.status)
            if (response.status == 200) {
                resetSsid()
                resetUser()
            }
        } catch (error) {
            console.log("Что-то пошло не так")
        }
    }

    const login = async (formData: any) => {
        const response = await axios(`http://127.0.0.1:8080/accounts/login/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            data: formData as FormData
        })

        if (response.status == 201) {
            console.log(response.data)
            setSsid(response.data['session_id'])

            const data = {
                is_authenticated: true,
                is_moderator: response.data["is_moderator"],
                pk: response.data["pk"],
                username: response.data["username"],
                active_order: response.data["active_order"]
            }
        
            console.log(`Добро пожаловать, ${response.data["username"]}!`)
            setUser(data)
            return true
        }
        return false
    }

    const auth = async () => {
        console.log("auth")
        console.log(session_id)
        const response = await axios(`http://localhost:8800/accounts/check/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': session_id
            },
        })

        if (response.status == 200) {
            console.log(response.data)

            const data = {
                is_authenticated: true,
                is_moderator: response.data["is_moderator"],
                pk: response.data["pk"],
                username: response.data["username"],
                active_order: response.data["active_order"]
            }

            setUser(data)
            return true
        }
        return false
    }

    return {
        is_authenticated,
        is_moderator,
        pk,
        username,
        active_order,
        setUser,
        logOut,
        login,
        auth,
    };
}