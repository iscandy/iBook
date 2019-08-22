import * as types from './mutation-types';
import { setHstStorage, getHstStorage } from '../utils/storage'
export default {
    [types.CHANGE_CURRENTINDEX](state, index) {
        state.currentIndex = index
    },
    [types.CHANGE_MAXINDEX](state, index) {
        state.maxIndex = index
    },
    [types.SET_MUSIC](state, music) {
        state.music = music
    },
    [types.SET_PLAYING](state, playing) {
        state.isplaying = playing
    },
    [types.CHANGE_BOOK](state, book) {
        state.book = book
    },
    [types.SET_HST_STORAGE](state, val) {
        setHstStorage(val)
        let arr = getHstStorage();
        state.hstStorage = arr
    }
}