import {useState, useEffect, useRef} from 'react'
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

  const [commentsWereChanged, setCommentsWereChanged] = useState(false)

  const commentRef = useRef(null);

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
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
  }, [commentsWereChanged])
  

  return (
    <>
      {
        articleLoaded ? 
        <>
          <div className="article">
            <Article 
              commentRef={commentRef}
              setArticledChanged={setArticledChanged} 
              article={article}
              />
          </div> 

          <span ref={commentRef} ></span>
          <CommentAdder setCommentsWereChanged={setCommentsWereChanged} article_id={article_id}/>
          {commentsLoaded ? <CommentList 
            setCommentsWereChanged={setCommentsWereChanged} 
            comments={comments}/> : null} 
        </>
        : 
        <p>
          Loading Article
        </p>
      }
    </>
  )
}

export default ArticlePage