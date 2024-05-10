import { useContext, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { AlertContext } from '../contexts/AlertContext';

import newsApi from "../utils/api"

const Login = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [userNameInput, setUserNameInput] = useState("tickle122")
    const {setAlerts, setAlertsWereChanged}  = useContext(AlertContext)

    const navigate = useNavigate()

    const handleLogIn = (e) => {
        e.preventDefault()
        newsApi.get(`/users/${userNameInput}`)
        .then(({data}) => {
            setLoggedInUser(data.user)
            console.log(data)
            navigate("/")
        })
        .catch((err) => {
            console.log(err)
            setAlerts((alerts) => {
                return [...alerts, {
                    severity: "error",
                    content: "user not found"
                }]
              })
              setAlertsWereChanged((x) => !x)
        
        })
    }
    return (
        <form onSubmit={handleLogIn} className="login">
            <label htmlFor="username-input" >Enter Username: </label>   
            <input value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)}></input>
            <button> Login </button>
        </form>

    )
}


export default Login