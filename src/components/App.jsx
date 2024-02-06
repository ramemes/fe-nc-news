import { useState, useEffect, useContext, useMemo } from 'react'
import { Routes, Route, Link, useNavigate} from 'react-router-dom';

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



function App() {

  const [articles, setArticles] = useState([])
  const [articlesLoaded, setArticlesLoaded] = useState(false)

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const {darkMode, setDarkMode} = useContext(ThemeContext) 

  const navigate = useNavigate()

  useEffect(() => {
    newsApi(`/articles`)
    .then(({data}) => {
      setArticles(data.articles)
      setArticlesLoaded(true)
    })
    .catch((err)=>{
      window.alert(err.message)
    })
    loggedInUser ?  navigate(`/articles`) : null
  }, [])

  return (
    <>
      <Nav/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>

        <Route path='/articles' element={
          <>
            <SearchBar />
            {articlesLoaded ? <ArticleList articles={articles}/> : 
            <p>
              Loading Articles
            </p>}
          </>
        }/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/articles/:article_id' element={<ArticlePage/>}/>
        
      </Routes>

    </>
  )
}

export default App

