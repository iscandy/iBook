import axios from '../utils/https'; // 导入http中创建的axios
import { APPKEY } from './config'; //获取到appkey

const Classic = {
    //获取懂啊最新一期
    getNewClassic() {
        return axios.get(`/api/classic/latest?appkey=${APPKEY}`)
    },
    //获取到上一期
    getPrevClassic(index) {
        return axios.get(`/api/classic/${index}/previous?appkey=${APPKEY}`)
    },
    //获取到下一期
    getNextTlassic(index) {
        return axios.get(`/api/classic/${index}/next?appkey=${APPKEY}`)
    },
    //获取到点赞信息
    getFavNums(type, id) {
        return axios.get(`/api/classic/${type}/${id}?appkey=${APPKEY}`)
    }
}

export default Classic;