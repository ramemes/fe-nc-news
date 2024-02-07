import { format } from "date-fns";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useState } from 'react';


const Article = (props) => {
  const {article} = props


  return (
    <>
      {/* <div className="article-header"> */}
        <h2 className="article-title">{article.title}</h2>
        <div className="article-author-date">
          <p className="article-author">Author: {article.author}</p>
          <p className="article-date" >{format(article.created_at, "Mo MMM, yyyy")}</p>
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

          <div className="article-votes">
            <Tooltip title="Upvote article" placement="top">
              <IconButton>
                <KeyboardArrowUpIcon /> 
              </IconButton>
            </Tooltip>
            {article.votes}
          </div>  
        </div>


      {/* </div> */}
      <img src={article.article_img_url}/>
      <div className="article-content">
        <p className="article-body">{article.body}</p>
      </div>
    </>
  )
}

export default Article