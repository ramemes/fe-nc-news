import { format } from "date-fns";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const CommentCard = (props) => {
    const {comment} = props


    return (
        <div className="card-div">
            <Card className="card" sx={{ maxWidth: 700 }}>
            <CardActionArea>
                <CardContent className="card-content">
                <Typography className="comment-body" variant="body2" color="text.secondary">
                    {comment.body}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {comment.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Votes: {comment.votes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {format(comment.created_at, "Mo MMM, yyyy")}
                </Typography>

                </CardContent>
            </CardActionArea>
            </Card>
        </div>
      );
}


export default CommentCard