import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const ProfilePage = () => {
    const navigate = useNavigate()
    const { logOut, username } = useAuth()

    const handleLogOut = async () => {
        await logOut()
        navigate("/")
    }

    return (
        <div>
            <h3>Профиль</h3>
            <span>{ username }</span>
            <button onClick={ handleLogOut }>Съебаться в ужасе нахуй</button>
        </div>
    )
}

export default ProfilePage