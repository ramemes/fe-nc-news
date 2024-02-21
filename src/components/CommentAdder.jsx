import { useState, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


import newsApi from '../utils/api';

const CommentAdder = (props) => {
  const {article_id, setCommentsWereChanged} = props

  const {loggedInUser} =  useContext(UserContext)

  const [commentBody, setCommentBody] = useState('')
  const [commentIsPosting, setCommentIsPosting] = useState(false)
  
  const {setAlerts, setAlertsWereChanged}  = useContext(AlertContext)

  const postComment = (e) => {
    e.preventDefault()
    if (commentBody) {
      setCommentIsPosting(true)
      newsApi.post(`/articles/${article_id}/comments`, {
        body: commentBody,
        username: loggedInUser.username
      })
      .then((response) => {
        setAlerts((alerts) => {
          return [...alerts, {
              severity: "success",
              content: "comment posted successfully"
          }]
        })
        setAlertsWereChanged((x) => !x)

        setCommentBody("")
        setCommentsWereChanged((commentsWereChanged) => !commentsWereChanged)
        setCommentIsPosting(false)

      })
      .catch((err) => {
        setAlerts((alerts) => {
          return [...alerts, {
              severity: "error",
              content: "couldn't post comment"
          }]
        })
        setAlertsWereChanged((x) => !x)
        
        setCommentIsPosting(false)
      })
    } else {
      setAlerts((alerts) => {
        return [...alerts, {
            severity: "warning",
            content: "cannot post empty comment"
        }]
      })
      setAlertsWereChanged((x) => !x)

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