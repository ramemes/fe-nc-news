import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import newsApi from '../utils/api';

import CommentList from './CommentList';
import Article from './Article';

import CommentAdder from './CommentAdder';

const ArticlePage = (props) => {
  const {setArticledChanged} = props
  const {article_id} = useParams();

  const [article, setArticle] = useState({})
  const [comments, setComments] = useState([])

  const [articleLoaded, setArticleLoaded] = useState(false)
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  const [commentWasPosted, setCommentWasPosted] = useState(false)

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setArticle(data.article)
      setArticleLoaded(true)
    })
    .catch((err) => {
      window.alert(err)
    })

    newsApi.get(`/articles/${article_id}/comments`)
    .then(({data}) => {
      setComments(data.comments)
      setCommentsLoaded(true)
    })
    .catch((err) => {
      window.alert(err)

    })
  }, [commentWasPosted])
  

  return (
    <>
      {
        articleLoaded ? 
          <div className="article">
            <Article 
              setArticledChanged={setArticledChanged} 
              article={article}
              />
            
          </div> 
          : 
          <p>
              Loading Article
          </p>
      }
      <CommentAdder setCommentWasPosted={setCommentWasPosted} article_id={article_id}/>
      {commentsLoaded ? <CommentList comments={comments}/> : null} 
    </>
  )
}

export default ArticlePage