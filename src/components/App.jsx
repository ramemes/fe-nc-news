import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom';


import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

import Nav from './Nav';

import SearchBar from './SearchBar';
import Profile from './Profile';
import Login from './Login';
import ArticleList from './ArticleList';

import '../App.scss';

import newsApi from '../utils/api';


function App() {

  const [articles, setArticles] = useState([])
  const [articlesLoaded, setArticlesLoaded] = useState(false)

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const {darkMode, setDarkMode} = useContext(ThemeContext) 


  useEffect(() => {
    newsApi.get(`/articles`)
    .then(({data}) => {
      console.log(data)
      setArticles(data.articles)
      setArticlesLoaded(true)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [])

  return (
    <>
      <Nav/>
      <Routes>
        <Route path='/' element={
          <>
            <SearchBar />
            {articlesLoaded ? <ArticleList articles={articles}/> : 
            <p>
              Loading Articles
            </p>}
          </>
        }/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}
          />
      </Routes>

    </>
  )
}

export default App

