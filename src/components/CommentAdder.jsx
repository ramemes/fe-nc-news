import { useState, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import newsApi from '../utils/api';

const CommentAdder = (props) => {
  const {article_id, setCommentsWereChanged} = props

  const {loggedInUser} =  useContext(UserContext)


  const [commentBody, setCommentBody] = useState('')
  const [commentIsPosting, setCommentIsPosting] = useState(false)
  

  const postComment = (e) => {
    e.preventDefault()
    if (commentBody) {
      setCommentIsPosting(true)
      newsApi.post(`/articles/${article_id}/comments`, {
        body: commentBody,
        username: loggedInUser.username
      })
      .then((response) => {
        setCommentsWereChanged((commentsWereChanged) => !commentsWereChanged)
        setTimeout(()=>{setCommentIsPosting(false)},"700")
      })
      .catch((err) => {
        window.alert(`comment could not be posted, ${err}`)
        setCommentIsPosting(false)
  
      })
    } else {
      window.alert("cannot post empty comment")
    }


  }

  return (
    <Box
      component="form"
      className="comment-adder"
      noValidate
      autoComplete="off"
    >
        <TextField
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          id="outlined-multiline-static"
          className="comment-add-text" 
          label="Enter Comment"
          multiline
          rows={4}
        />
        <Button className="comment-add-button" onClick={postComment} disabled={commentIsPosting}>
          {commentIsPosting ? "Posting Comment" : "Post Comment"}
        </Button>
    </Box>
  )
}


export default CommentAdder