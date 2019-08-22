import state from './state';
import * as getters from './getters';
import mutations from './mutations';
//import * as actions from './mutations';
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
    state,
    getters,
    //actions,
    mutations
})