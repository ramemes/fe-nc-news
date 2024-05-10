import ArticleCard from "./ArticleCard"

import { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';

import newsApi from "../utils/api";

const ArticleList = (props) => {

    const {setArticleChanged,articleChanged,topics, setTopics} = props
    const [searchParams, setSearchParams] = useSearchParams()

    const topicQuery = searchParams.get("topic")
    const sortQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")


    const [articles, setArticles] = useState([])
    
    const [articlesLoaded, setArticlesLoaded] = useState(false)

    const [topicChoice, setTopicChoice] = useState(topicQuery || "");
    const [sortChoice, setSortChoice] = useState(sortQuery || "");
    const [orderChoice, setOrderChoice] = useState(orderQuery || "");


    useEffect(() => {
        let searchStr = `/articles/`
        // newsApi(`/topics`)
        // .then(({data}) => {
        //   setTopics(data.topics.map((topic) => topic.slug))
        // })
        // .catch((err)=>{
        //   console.log(err.response.data.msg)
        // })
        if (topicQuery) {
            searchStr += `?topic=${topicQuery}`
        }
        if (sortQuery) {
            searchStr += searchStr.includes("?") ?  `&` : `?`
            searchStr += `sort_by=${sortQuery}`
        }
        if (orderQuery) {
            searchStr += searchStr.includes("?") ?  `&` : `?`
            searchStr += `order=${orderQuery}`
        }

        newsApi(searchStr)
        .then(({data}) => {
          setArticles(data.articles)
          setArticlesLoaded(true)
        })
        .catch((err)=>{
          console.log(err.response.data.msg)
        })
        
      }, [searchParams])


    const handleSubmit = (e) => {
        e.preventDefault()
        const newParams = new URLSearchParams(searchParams)
        topicChoice ? newParams.set('topic',topicChoice) : newParams.delete('topic')
        sortChoice ? newParams.set('sort_by',sortChoice) : newParams.delete('sort_by')
        orderChoice ? newParams.set('order',orderChoice) : newParams.delete('order')

        setSearchParams(newParams)
    }
     


    return articlesLoaded ? (
        <>
            <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="topic-selector"> Choose a topic</label>
                <select 
                    id="topic-selector"
                    className="filter-selector"
                    value={topicChoice}
                    onChange={(e) => setTopicChoice(e.target.value)}
                >
                    <option  key="no-topic-filter" value="">No filter</option>
                    
                    {topics.map((topicOption) => {
                        return  <option key={topicOption}>{topicOption}</option>
                    })}

                </select>

                <label htmlFor="sortby-selector">Sort by</label>
                <select 
                    id="sortby-selector"
                    className="filter-selector"
                    value={sortChoice}
                    onChange={(e) => setSortChoice(e.target.value)}
                >
                    <option  key="no-sort-filter" value="">No filter</option>
                    
                    {['created_at','comment_count','votes'].map((sortOption) => {
                        return  <option key={sortOption}>{sortOption}</option>
                    })}

                </select>

                <label htmlFor="order-selector">Order</label>
                <select 
                    id="order-selector"
                    className="filter-selector"
                    value={orderChoice}
                    onChange={(e) => setOrderChoice(e.target.value)}
                >
                    <option  key="no-order-filter" value="">No filter</option>
                    
                    {['asc','desc'].map((orderOption) => {
                        return  <option key={orderOption}>{orderOption}</option>
                    })}

                </select>

                <button className="search-articles"> Search Articles </button>
            </form>
            <div className="article-list">
                {articles.map((article) => {
                    return (  
                        <ArticleCard key={article.article_id} article={article}/>
                    )
                })}
            </div>
        </>
    ) : (<p>Articles Loading</p>)
}   



export default ArticleList  