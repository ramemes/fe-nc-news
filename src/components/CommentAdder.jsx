import { useState, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import axios from 'axios'
import newsApi from '../utils/api';

const CommentAdder = (props) => {
  const {article_id, setCommentWasPosted} = props


  const {loggedInUser} =  useContext(UserContext)
  const [commentBody, setCommentBody] = useState('')
  const [commentIsPosting, setCommentIsPosting] = useState(false)
  

  const postComment = (e) => {
    e.preventDefault()
    setCommentIsPosting(true)
    newsApi.post(`/articles/${article_id}/comments`, {
      bod2y: commentBody,
      username: loggedInUser.username
    })
    .then((response) => {
      setCommentWasPosted((commentPosted) => !commentPosted)
      setCommentIsPosting(false)

    })
    .catch((err) => {
      window.alert(`comment could not be posted, ${err}`)
      setCommentIsPosting(false)

    })

  }

  return (
    <Box
      onSubmit={postComment}
      component="form"
      className="comment-adder"
      noValidate
      autoComplete="off"
    >
        <TextField
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          id="outlined-multiline-static"
          label="Enter Comment"
          multiline
          rows={4}
        />
        <Button disabled={commentIsPosting}>Post Comment</Button>
    </Box>
  )
}


export default CommentAdder