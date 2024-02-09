import ArticleCard from "./ArticleCard"

import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';

import newsApi from "../utils/api";
import { Search } from "@mui/icons-material";

const ArticleList = (props) => {
    const {setArticleChanged,articleChanged} = props

    const [searchParams, setSearchParams] = useSearchParams();
    const topicQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")


    const [articles, setArticles] = useState([])
    const [topics, setTopics] = useState([])
    const [articlesLoaded, setArticlesLoaded] = useState(false)

    const [topicChoice, setTopicChoice] = useState(topicQuery);



    useEffect(() => {
        let searchStr = `/articles`
        newsApi(`/topics`)
        .then(({data}) => {
          setTopics(data.topics.map((topic) => topic.slug))
        })
        .catch((err)=>{
          console.log(err.message)
        })
        
        if (topicQuery && topicQuery !== "") {
            searchStr += `?topic=${topicQuery}`
        }



        newsApi(searchStr)
        .then(({data}) => {
          setArticles(data.articles)
          setArticlesLoaded(true)
        })
        .catch((err)=>{
          console.log(err.message)
        })
        
      }, [topicQuery])


    const handleSubmit = (e) => {
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams);
        newParams.set("topic",topicChoice)
        setSearchParams(newParams)
        
    }
     


    return articlesLoaded ? (
        <div className="article-list">
        <form onSubmit={handleSubmit}>
            <label htmlFor="topic-selector"> Choose a topic</label>
            <select 
                id="topic-selector"
                value={topicChoice}
                onChange={(e) => setTopicChoice(e.target.value)}
            >
                <option  key="no-filter" value="">No filter</option>
                
                {topics.map((topic) => {
                    return  <option key={topic}>{topic}</option>
                })}

            </select>

            <button> Search Articles </button>
        </form>
        
            {articles.map((article) => {
                return (  
                    <ArticleCard key={article.article_id} article={article}/>
                )
            })}
    </div>
    ) : (<p>Articles Loading</p>)
}   



export default ArticleList  