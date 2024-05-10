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
import Post from './Post';

import ArticlePage from './ArticlePage';
import HomePage from './HomePage';

import BasicAlert from "./BasicAlert";
import AlertList from './AlertList';

function App() {

  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const {darkMode, setDarkMode} = useContext(ThemeContext)
  const {alertStatus}  = useContext(AlertContext)
  const [articleChanged, setArticledChanged] = useState(false)
  const [topics, setTopics] = useState([])

  useEffect(() => {
    newsApi(`/topics`)
    .then(({data}) => {
      setTopics(data.topics.map((topic) => topic.slug))
    })
    .catch((err)=>{
      console.log(err.response.data.msg)
    })
    0}, [])

  return (
    <>
      <Nav/>
      {/* {alertStatus ? <BasicAlert /> : null} */}
      <AlertList />
      <div className="main-div">
      <Routes>
        <Route path='/' element={
          <>
            { topics ? <ArticleList 
            articleChanged={articleChanged} 
            setArticledChanged={setArticledChanged}
            topics={topics} 
            setTopics={setTopics}
            /> : null}
          </>
        }/>


        <Route path='/post' element={<Post topics={topics}/>}/>
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
    </div>
    </>
  )
}

export default App
