import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate, useParams} from 'react-router-dom';

import '../App.scss';
import newsApi from '../utils/api';

import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';


import Nav from './Nav';

import SearchBar from './SearchBar';
import Profile from './Profile';
import Login from './Login';
import ArticleList from './ArticleList';

import ArticlePage from './ArticlePage';
import HomePage from './HomePage';

import BasicAlert from "./BasicAlert";

function App() {

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const {darkMode, setDarkMode} = useContext(ThemeContext) 

  const [articleChanged, setArticledChanged] = useState(false)
  const [topics, setTopics] = useState([])


  

  return (
    <>
      <Nav/>
      <Routes>

        <Route path='/' element={
          <>
            <ArticleList articleChanged={articleChanged} setArticledChanged={setArticledChanged} topics={topics}/>
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
