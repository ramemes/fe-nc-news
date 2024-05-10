import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

import { Box, Button, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import newsApi from '../utils/api';


const Post = (props) => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    const {topics} = props
    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [body, setBody] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [articleIsPosting, setArticleIsPosting] = useState(false)
    const navigate = useNavigate()


    const postArticle = (e) => {
        e.preventDefault()
        if (!loggedInUser) {
          window.alert("you must be logged in to make a post")
        }
        else {
          if (body && topic && title) {
            setArticleIsPosting(true)
              newsApi.post(`/articles`, {
                title: title,
                topic: topic,
                username: loggedInUser.username,
                body: body,
                imageUrl: imageUrl
              })
              .then(({data}) => {
                setArticleIsPosting(false)
                navigate(`/${data.article.article_id}`)
              })
              .catch((err) => {
                setArticleIsPosting(false)
                window.alert(err.msg)
              })
            } else {
                window.alert("please enter the article details")
            }
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-multiline-static"
          className="comment-add-text" 
          label="Enter Title"
          multiline
          rows={2}
        />
        <InputLabel id="demo-simple-select-label">Select Topic</InputLabel>
        <Select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          id="outlined-multiline-static"
          className="comment-add-text" 
          label="Enter Topic"
          multiline
          rows={1}
        >
          {topics.map((topic) => <MenuItem key={topic} value={topic}>{topic}</MenuItem>)}
        </Select>
        <TextField
          value={body}
          onChange={(e) => setBody(e.target.value)}
          id="outlined-multiline-static"
          className="comment-add-text" 
          label="Enter Body"
          multiline
          rows={7}
        />
                <TextField
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          id="outlined-multiline-static"
          className="comment-add-text" 
          label="Enter Image URL"
          multiline
          rows={1}
        />

        <Button className="comment-add-button" onClick={postArticle} disabled={!body || !topic || !title}>
          {articleIsPosting ? "Posting Article" : "Post Article"}
        </Button>
        
    </Box>

        

    )
}


export default Post