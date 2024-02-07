import { format } from "date-fns";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import {useNavigate} from 'react-router-dom'

const ArticleCard = (props) => {
    const {article} = props
    const navigate = useNavigate()

    const openArticle = (e) => {
        e.preventDefault()
        navigate(`/${article.article_id}`)

    }

    return (
        <div onClick={openArticle} className="card-div">
            <Card className="card" sx={{ maxWidth: 700 }}>
            <CardActionArea>
                <CardMedia
                className="card-media"
                component="img"
                height="250"
                image={article.article_img_url}
                alt={article.article_img_url}
                />
                <CardContent className="card-content">
                <Typography className="card-title" gutterBottom variant="h5" component="div">
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {article.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Topic: {article.topic}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Votes: {article.votes}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {format(article.created_at, "Mo MMM, yyyy")}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </div>
      );
}


export default ArticleCard