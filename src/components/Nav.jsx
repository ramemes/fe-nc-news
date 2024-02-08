import { Link } from "react-router-dom";

import { useContext } from "react";

import { UserContext } from '../contexts/UserContext';



const Nav = () => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    return (
        <nav className="nav-bar">
            <Link className="nav-link" to="/">Home</Link>
            {loggedInUser ? 
                <Link  to="/profile">
                    <div className="nav-user">
                        <div className="nav-user-avatar-cropper">
                            <img className="nav-user-avatar" src={loggedInUser.avatar_url}/>
                        </div>
                    </div>
                </Link> 
                : 
                <Link className="nav-link"  to="/login" >Login</Link>
            }
            
            


            

        </nav>

    )
}

export default Nav