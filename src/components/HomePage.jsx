import { Routes, Route, Link } from 'react-router-dom';
import { useContext, useEffect } from "react";

import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate()

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)

  
  return (
    <>
      <Link to="/articles">View articles</Link>
    </>
  )

}

export default HomePage