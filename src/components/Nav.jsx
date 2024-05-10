import { Link } from "react-router-dom";

import { useContext } from "react";

import { UserContext } from '../contexts/UserContext';



const Nav = () => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    return (
        <nav className="nav-bar">

            <div className="nav-left">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/post">Post</Link>
            </div>

            <div className="nav-right">
            {loggedInUser ? 
                <Link  to="/profile">
                    
                    <div className="nav-user">
                    {loggedInUser.username}
                        <div className="nav-user-avatar-cropper">
                            <img className="nav-user-avatar" src={loggedInUser.avatar_url}/>
                        </div>
                    </div>
                </Link> 
                : 
                <Link className="nav-link" to="/login" >Login</Link>
            }
            </div>


        </nav>

    )
}

export default Nav