<template>
    <div class="page_wrapper">
    <classic-details
        v-show="classic.id"
        :classic="classic"
        :isShowbtn="true"
        @changeFavor="changeFavor"
        @changeShare="changeShare"
        @prev="prev"
        @next="next"
        ></classic-details >
    </div>
</template>


<script>

import classicDetails from '../details/details'
import api from '../../api/classic';
import {CODE} from '../../api/config';
import {TIMEOUT}  from '../../common/js/config'
import {mapGetters,mapMutations } from 'vuex'
import {detailMixin} from '../../common/js/mixin'
import {Toast} from 'vant' 
export default {
    mixins:[detailMixin],
    components:{
        classicDetails,
        scroll,
        [Toast.name]:Toast
    },
    data() {
        return {
           classic:{},
        }
    },
    mounted() {
        this.getNewClassic()
    },
    computed: {
           ...mapGetters(['currentIndex'])
    },
    methods: {
        ...mapMutations({
             change_currentindex:'CHANGE_CURRENTINDEX',
             change_maxindex:'CHANGE_MAXINDEX',
        }),
        getNewClassic(){
           Toast.loading({duration:TIMEOUT})
            api.getNewClassic().then(res=>{
                this.classic=res.data
                let index=res.data.index
                this.change_currentindex(index);
                this.change_maxindex(index);
                Toast.clear()
            })
        },
        //上一个
        prev(){
           Toast.loading({duration:TIMEOUT})
            let index=this.currentIndex;
            api.getNextTlassic(index).then(res=>{
                this.classic=res.data
                let index=res.data.index
                this.change_currentindex(index);
            })
            Toast.clear()
        },
        //下一条
        next(){
            Toast.loading({duration:TIMEOUT})
            let index=this.currentIndex;
            api.getPrevClassic(index).then(res=>{
                this.classic=res.data
                let index=res.data.index
                this.change_currentindex(index);
            })
            Toast.clear()
        },
    },
}
</script>



<style lang="less" scoped>
.page_wrapper{
    position: fixed;
    bottom: 45px;
    top: 0px;
    right: 0px;
    left: 0px;
    background: #fff;
}
</style>



