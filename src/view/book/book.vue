<template>
    <div>
        
       <div class="book-list_page"   v-show="$route.path=='/book'" >
            <div class="book-hd" >
                <search-bar :isFocus="false" blurText="搜索图书" @toSearchPage="toSearchPage"></search-bar>
            </div>

            <scroll class="book-bd" :data="list"  v-show="list.length" ref="scroll">
               <div class="book-bd-inner">
                    <h2 class="flex-h flex-vc flex-hc book-title">
                        <van-image
                            width="60"
                            height="22"
                            lazy-load
                            :src="titleIcon"
                            />
                    </h2> 
                    <div class="book-list_box">
                        <book-List :list="list" @selectItem="selectItem"></book-List>
                    </div>
               </div>
            </scroll>
       </div>


       <!--去到详情页面-->
       <div  v-show="$route.path!='/book'">
        <router-view></router-view>
       </div> 
    </div>
</template>


<script>
import  scroll  from '../../components/scroll/scroll'
import searchBar  from '../../components/search-bar/search-bar'
import {Image,Toast,Card, Tag,Button} from 'vant'
import bookList from '../../components/book-list/book-list'
import api from '../../api/book'
import {CODE} from '../../api/config'
import { TIMEOUT } from '../../common/js/config';
import {mapMutations} from 'vuex'
import {toSearchPageMinxin}  from '../../common/js/mixin'
export default {
    mixins:[toSearchPageMinxin],
    components:{
        searchBar,
        [Image.name]:Image,
        [Toast.name]:Toast,
        bookList,
        scroll,
        [Card.name]:Card,
        [Tag.name]:Tag,
        [Button.name]:Button,
    },
    data() {
        return {
            titleIcon:require('./title.png'),
            list:[]
        }
       
    },
     mounted() {
        this.getBookList()
    },
    methods: {
         ...mapMutations({
            change_book:'CHANGE_BOOK'
        }),
        getBookList(){
            Toast.loading({
                mask:false,
                duration:TIMEOUT
            });
            api.getBookList().then(res=>{
                if(res.status===CODE){
                    this.list=res.data
                }else{
                    Toast(res.msg.type);
                }
                Toast.clear();
            })
        },
        selectItem(item){
            //获取id去到详情页
            this.$router.push({
                path:`/book/detail/${item.id}`
            })
            this.change_book(item)
        }
    },
    watch: {
         list(value){
             if(value.length){
                 this.$refs.scroll.refresh()
             }  
         }
    },
}
</script>

<style lang="less" scoped>
.hello{
     justify-content: flex-end
}
.book-title{
   
    margin-bottom:15px;
}

.blur_result{
    padding: 25px 15px;
    .hst{
        margin-bottom: 40px;
    }
}

.book-bd{
    .book-bd-inner{
         padding-top: 25px;
    }
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 45px;
    top: 55px;
    overflow: hidden;
}

</style>
