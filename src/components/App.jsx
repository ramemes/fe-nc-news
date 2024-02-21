import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';

import '../App.scss';
import newsApi from '../utils/api';

import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { AlertContext } from '../contexts/AlertContext';

import Nav from './Nav';

import SearchBar from './SearchBar';
import Profile from './Profile';
import Login from './Login';
import ArticleList from './ArticleList';

import ArticlePage from './ArticlePage';
import HomePage from './HomePage';

import BasicAlert from "./BasicAlert";
import AlertList from './AlertList';

function App() {

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const {darkMode, setDarkMode} = useContext(ThemeContext)
  const {alertStatus}  = useContext(AlertContext)
  const [articleChanged, setArticledChanged] = useState(false)


  return (
    <>
      <Nav/>
      {/* {alertStatus ? <BasicAlert /> : null} */}
      <AlertList />
      <Routes>
        <Route path='/' element={
          <>
            <ArticleList articleChanged={articleChanged} setArticledChanged={setArticledChanged}/>
          </>
        }/>



        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route 
        path='/:article_id' 
        element={
          <ArticlePage 
            setArticledChanged={setArticledChanged}
          />
        }/>
        
      </Routes>

    </>
  )
}

export default App
