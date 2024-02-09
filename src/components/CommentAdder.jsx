import { useState, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import BasicAlert from "./BasicAlert";


import newsApi from '../utils/api';

const CommentAdder = (props) => {
  const {article_id, setCommentsWereChanged} = props

  const {loggedInUser} =  useContext(UserContext)

  const [commentBody, setCommentBody] = useState('')
  const [commentIsPosting, setCommentIsPosting] = useState(false)
  
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState("")
  const [alertContent, setAlertContent] = useState("")

  const postComment = (e) => {
    e.preventDefault()
    if (commentBody) {
      setCommentIsPosting(true)
      newsApi.post(`/articles/${article_id}/comments`, {
        body: commentBody,
        username: loggedInUser.username
      })
      .then((response) => {
        setAlertSeverity("success")
        setAlertContent("comment posted successfully")
        setAlertStatus(true)

        setCommentBody("")

        setCommentsWereChanged((commentsWereChanged) => !commentsWereChanged)
        setCommentIsPosting(false)

        setTimeout(()=>{
          setAlertStatus(false)
        },1300)
      })
      .catch((err) => {
        setAlertSeverity("error")
        setAlertContent("couldn't post comment")
        setAlertStatus(true)
        
        setCommentIsPosting(false)

        setTimeout(()=>{
          setAlertStatus(false)
        },1300)
  
      })
    } else {
      setAlertSeverity("warning")
      setAlertContent("cannot send empty comment")
      setAlertStatus(true)
      setTimeout(()=>{
        setAlertStatus(false)
      },1300)
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
        {alertStatus ? <div className="basic-alert">
        <BasicAlert severity={alertSeverity} content={alertContent}/>
        </div> : null}
        
    </Box>
  )

  
}


export default CommentAdder