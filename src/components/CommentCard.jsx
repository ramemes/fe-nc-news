import { format } from "date-fns";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext";

import newsApi from "../utils/api";
import BasicAlert from "./BasicAlert";

const CommentCard = (props) => {
    const {comment, setCommentsWereChanged} = props
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [commentIsDeleting, setCommentIsDeleting] = useState(false)
    const [responseReceived, setResponseReceived] = useState(false)
    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertContent, setAlertContent] = useState('')

    const deleteComment = (e) => {
        e.preventDefault();
        if (comment.author === loggedInUser.username) {
            setCommentIsDeleting(true)
            newsApi.delete(`/comments/${comment.comment_id}`)
            .then(()=>{
                setResponseReceived(true)
                setAlertSeverity("success")
                setAlertContent("comment deleted successfully")
                

                setCommentIsDeleting(false)

                setTimeout(()=>{
                    setCommentsWereChanged((commentsWereChanged) => !commentsWereChanged) 
                },700) 
                

            })
            .catch((err) => {
                setAlertSeverity("error")
                setAlertContent("comment could not be deleted")
                setResponseReceived(true)
                
                setCommentIsDeleting(false)
                

            })
        }
    }
    return (

        <div className="card-div">
            {responseReceived ? <BasicAlert severity={alertSeverity} content={alertContent}/> : null}

            <Card className="card" sx={{ maxWidth: 700 }}>
                <CardContent className="card-content">
                    <Typography className="comment-body" variant="body2" color="text.secondary">
                        {comment.body}
                    </Typography>
                    <div className="comment-info-delete">
                        <div className="comment-info">
                            <Typography variant="body2" color="text.secondary">
                                Author: {comment.author}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Votes: {comment.votes}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {format(comment.created_at, "Mo MMM, yyyy")}
                            </Typography>
                        </div>
                        <Button 
                        onClick={deleteComment} 
                        className="comment-delete" 
                        disabled={commentIsDeleting}
                        sx={{color: "red"}}
                        >    
                        {comment.author === loggedInUser.username ?
                            commentIsDeleting ? "Deleting Comment" : "Delete Comment"
                        : null }
                        </Button>
                    </div>
                </CardContent>

            
            </Card>
        </div>
      );
}


export default CommentCard