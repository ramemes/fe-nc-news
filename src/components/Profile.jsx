import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"


const Profile = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    const navigate = useNavigate()

    const handleLogOut = (e) => {
        e.preventDefault()
        setLoggedInUser(null)
        navigate("/")
    }
    return (
        <div>
            {loggedInUser.username}
            <button 
                onClick={handleLogOut}
                className="logout">
                Logout
            </button>
        </div>

    )
}


export default Profile