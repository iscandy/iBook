import { getHstStorage } from "../utils/storage";
export default {
    currentIndex: 0, // //当前的搜索
    maxIndex: 0, //最大的索引
    music: {}, //当前的播放的music的id
    isplaying: false, //当前的播放的状态 
    book: {}, //存书籍信息
    hstStorage: getHstStorage()
}