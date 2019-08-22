import axios from '../utils/https'; // 导入http中创建的axios
import { APPKEY } from './config'; //获取到appkey
import qs from 'qs'; // 根据需求是否导入qs模块

const Favor = {
    //进行点赞
    setLike(params) {
        return axios.post(`/api/like?appkey=${APPKEY}`, params)
    },
    //取消点赞
    cancelLike(params) {
        return axios.post(`/api/like/cancel?appkey=${APPKEY}`, params)
    },
    //获取到点赞信息
    getLikeInfo(params) {
        //http://bl.7yue.pro/v1/classic/300/2/favor?appkey=RdshydjBvcYZhMZC
        return axios.post(`/api/like/cancel?appkey=${APPKEY}`, params)
    },
    getFavor() {
        return axios.get(`/api/classic/favor?appkey=${APPKEY}`)
    }

}

export default Favor;