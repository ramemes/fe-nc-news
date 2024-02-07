import ArticleCard from "./ArticleCard"


const ArticleList = (props) => {
    const {articles} = props
    
    return (
        <div className="article-list">
            {articles.map((article) => {
                return (  
                    <ArticleCard key={article.article_id} article={article}/>
                )
            })}
        </div>
    )
}   


export default ArticleList  