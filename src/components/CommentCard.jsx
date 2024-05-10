import { format } from "date-fns";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import BasicAlert from "./BasicAlert";

import {useContext, useState} from "react"
import { UserContext } from "../contexts/UserContext";
import { AlertContext } from "../contexts/AlertContext";

import newsApi from "../utils/api";

const CommentCard = (props) => {
    const {comment, setCommentsWereChanged} = props
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)
    const [commentIsDeleting, setCommentIsDeleting] = useState(false)
    const {setAlerts, setAlertsWereChanged}  = useContext(AlertContext)

    const deleteComment = (e) => {
        e.preventDefault()
        if (comment.author === loggedInUser.username) {
            setCommentIsDeleting(true)
            newsApi.delete(`/comments/${comment.comment_id}`)
            .then(()=>{
                setAlerts((alerts) => {
                    return [...alerts, {
                        severity: "success",
                        content: "comment deleted successfully"
                    }]
                })
                setAlertsWereChanged((x) => !x)
                setTimeout(()=>{
                    setCommentsWereChanged((commentWasChanged) => !commentWasChanged)
                },700) 

            })
            .catch((err) => {
                setAlerts((alerts) => {
                    return [...alerts, {
                        severity: "error",
                        content: "couldn't delete comment"
                    }]
                })
                setAlertsWereChanged((x) => !x)    
            })
            .finally(()=>{
                setTimeout(()=>{
                    setCommentIsDeleting(false)
                },700) 
            })
        }
    }
    return (
        <div className="card-div">
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
                        {loggedInUser ? 
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
                        : 
                            null}
                        
                    </div>
                </CardContent>
            </Card>
        </div>
    )


}


export default CommentCard