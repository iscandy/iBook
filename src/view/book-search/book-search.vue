<template>
    <div>
        <div class="book-hd" >
           <search-bar  
            blurText="图书搜索"   
            @onSearch="onSearch"
            @onCancel="onCancel"
            @changeValue="changeValue"
            @back="back"
            ref="search"
            :value="query"
             >
           </search-bar>
       </div>
        <!--失去焦点的时候 -->
        <div class="book-bd blur_result" v-show="!query.length">
            <div class="hst" v-show="hstStorage.length">
                 <label-list title="搜索历史" :list="hstStorage"   @selectItem="selectItem"></label-list>
            </div>
            <div class="hot" v-show="hot_list.length">
                 <label-list title="热门搜索" :list="hot_list"  @selectItem="selectItem"></label-list>
             </div>
        </div>
        <!-- 获取到焦点的时候 -->
        <div class="book-bd focus_result"  v-show="query.length">
            <more-list :query="query"></more-list>
        </div>
    </div>
</template>


<script>
import searchBar  from '../../components/search-bar/search-bar'
import labelList from '../../components/label-list/label-list'
import moreList from '../../components/more-list/more-list'
import api from '../../api/book'
import {mapGetters} from 'vuex'
export default {
    components:{
        searchBar,
        labelList,
        moreList
    },
    data() {
        return {
            isFocus:true,
            hot_list:[],
            query:""
        }
    },
    computed: {
        ...mapGetters(['hstStorage'])
    },
    mounted() {  
        this.getHotList()
        this.$refs.search.focus();
    },
    methods: {
        // ...mapMutations({
        //     setHstStorage:'SET_HST_STORAGE'
        // }),
        getHotList(){
            api.getHotList().then(res=>{
                this.hot_list=res.data.hot
            })
        },
        selectItem(item){
           this.changeValue(item);
        },
        onSearch(query){
            alert("搜索");
        },
        onCancel(){
            alert("取消")
        },
        changeValue(query){
            this.query=query
        },
        back(){
            this.$router.back();
        }
    },
}
</script>

<style scoped lang="less" scoped>
.book-bd{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 45px;
    top: 55px;
    overflow-y: auto;
    &.blur_result{
         padding: 25px 15px;
         .hst{ margin-bottom: 25px;}
    }
}
</style>

