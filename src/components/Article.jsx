import { format } from "date-fns";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import newsApi from "../utils/api";

import { useState, useContext } from 'react';
import { UserContext } from "../contexts/UserContext";


const Article = (props) => {
  const {article} = props
  const {loggedInUser, setLoggedInUser} = useContext(UserContext)
  const [votes, setVotes] = useState(article.votes)
  const voteKey = `alreadyVoted${article.article_id}${loggedInUser.username}`
  const [alreadyVoted, setAlreadyVoted] = useState(!!localStorage.getItem(voteKey))
  
  //mimic user with localStorage
  const handleVotes = (e) => {
    e.preventDefault()
    const alreadyVoted = localStorage.getItem(voteKey)
    voteFunc(!alreadyVoted)  
  } 

  const voteFunc = (upVote) => {
    setVotes((votes) => {
      return upVote ? Math.max(votes + 1, 0) : Math.max(votes - 1, 0)
    })
    localStorage.setItem(voteKey, upVote ? `true` : ``)
    setAlreadyVoted(upVote)

    newsApi.patch(`/articles/${article.article_id}`,{
      inc_votes: upVote ? 1 : -1
    })
    .catch((err) => {
      console.log(err)
      setVotes((votes) => {
        return upVote ? Math.max(votes - 1, 0) : Math.max(votes + 1, 0)
      })
      localStorage.setItem(voteKey, upVote ? `` : `true`)
      setAlreadyVoted(false)

    })
  }

  return (
    <>
        <h2 className="article-title">{article.title}</h2>



        <div className="article-author-date-comment-votes">

          <div className="article-author-date">
            <p className="article-author">Author: {article.author}</p>
            <p className="article-date" >{format(article.created_at, "M MMM, yyyy")}</p>
          </div>

          <div className="article-comment-votes">

            <div className="article-comment-count" >
              <Tooltip title="Post a comment" placement="top">
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </Tooltip>
              {article.comment_count}
            </div>

            <div onClick={handleVotes} className="article-votes">
              <Tooltip title="Upvote article" placement="top">
                <IconButton>
                  <KeyboardArrowUpIcon className={alreadyVoted ? 'voted' : null}/> 
                </IconButton>
              </Tooltip>
              {votes}
            </div>  
          </div>

        </div>
      <img src={article.article_img_url}/>
      <div className="article-content">
        <p className="article-body">{article.body}</p>
      </div>
    </>
  )
}

export default Article