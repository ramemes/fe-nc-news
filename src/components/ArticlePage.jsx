import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import newsApi from '../utils/api';

import CommentList from './CommentList';
import Article from './Article';


const ArticlePage = () => {
  const {article_id} = useParams();
  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])
  const [articleLoaded, setArticleLoaded] = useState(false)
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      console.log(data)
      setArticle(data.article)
      setArticleLoaded(true)
    })
    .catch((err) => {
      console.log(err.message)
    })

    newsApi.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
      setComments(data.comments)
      setCommentsLoaded(true)
    })
    .catch((err) => {
      console.log(err.message)
    })

  }, [])

  return (
    <>
      <Link to="/articles">Back to articles</Link>
      {
        articleLoaded ? 
          <div className="article">
            <Article article={article}/>
          </div> 
          : 
          <p>
              Loading Article
          </p>
      }
      {commentsLoaded ? <CommentList comments={comments}/> : null} 
    </>
  )
}

export default ArticlePage