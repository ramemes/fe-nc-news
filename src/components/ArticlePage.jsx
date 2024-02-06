import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import newsApi from '../utils/api';
import { format } from "date-fns";

const ArticlePage = () => {
  const {article_id} = useParams();
  const [article, setArticle] = useState({})
  const [articleLoaded, setArticleLoaded] = useState(false)

  useEffect(() => {
    newsApi.get(`/articles/${article_id}`)
    .then(({data}) => {
      setArticleLoaded(true)
      setArticle(data.article)
    })
    .catch((err) => {
      window.alert(err.message)
    })
  })

  return (
    <>
    <Link to="/articles">Back to articles</Link>
    {
      articleLoaded ? 
      <div className="article">

        <div className="article-header">
          <h2 className="article-title">{article.title}</h2>
          <p className="article-author">Author: {article.author}</p>
          <p className="article-created_at" >{format(article.created_at, "Mo MMM, yyyy")}</p>
          <p className="article-comment-count">Comments: {article.comment_count}</p>
          <p className="article-votes">Votes: {article.votes}</p>
        </div>

        <div className="article-content">
          <p className="article-body">{article.body}</p>
        </div>

      </div> 
      : 
      <p>
          Loading Article
      </p>
    }
    
    </>
  )
}

export default ArticlePage