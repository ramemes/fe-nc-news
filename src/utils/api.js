import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-859i.onrender.com/api'
})

// const articlesApi = axios.create({
//     baseURL: 'https://render-nc-news.onrender.com/api/articles'
// })

export default newsApi