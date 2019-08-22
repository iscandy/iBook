import axios from '../utils/https'; // 导入http中创建的axios
import { APPKEY } from './config'; //获取到appkey


const book = {
    getBookList() {
        return axios.get(`/api/book/hot_list?appkey=${APPKEY}`)
    },
    getBookDetail(id) {
        return axios.get(`/api/book/${id}/detail?appkey=${APPKEY}`)
    },
    getBookRate(id) {
        return axios.get(`/api/book/${id}/short_comment?appkey=${APPKEY}`)
    },
    getHotList() { //获取都到热门书籍
        return axios.get(`/api/book/hot_keyword?appkey=${APPKEY}`)
    },
    getSearchResult(data) {
        return axios.get(`/api/book/search?appkey=${APPKEY}`, { params: data })
    },
    getFavorBookNum() {
        return axios.get(`/api/book/favor/count?appkey=${APPKEY}`)
    },
    setComment(book_id, content) {
        return axios.post(`/api/book/add/short_comment?appkey=${APPKEY}`, { book_id, content })
    }
}

export default book