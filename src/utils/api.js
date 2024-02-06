import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://render-nc-news.onrender.com/api'
})


export default newsApi