<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="search"
            :error.sync="error"
            :error-text="errorText"
            >
            <van-cell-group>
                <van-cell  v-for="(item,index) in list"
    :key="index" @click="selectItem(item)">
                    <div class="title" slot="title">
                        <div class="title-inner flex-h">
                            <van-image
                            width="32" 
                            fit="cover"
s                            :src="item.image"
                            />
                           <div class="text">
                                <p class="name">{{item.title}}</p>
                                <p class="author">{{getAuthor(item.author)}}</p>
                           </div>
                        </div>
                    </div>

                </van-cell>
            </van-cell-group>
        </van-list>
    </div>
</template>

<script>
const COUNT=20//每页多少条
const  SUMMARY=1//简单信息传1，具体信息传1
import { List,Cell,CellGroup,Image } from 'vant';
import  api from  '../../api/book'
import {mapMutations}  from  'vuex'
export default {
    props:{
        query:{
            type:String,
            default:""
        }  
    },
    components:{
        [List.name]:List,
        [Cell.name]:Cell, 
        [CellGroup.name]:CellGroup,
        [Image.name]:Image,
    },
    data() {
        return {
            list: [],
            loading: false,
            finished: false,
            start:0,
            params:{},
            error: false,
            errorText:"",
            total:0
        }
    },
    methods: {
        ...mapMutations({
            setHstStorage:'SET_HST_STORAGE'
        }),
        getAuthor(author){
            return author.join(`、`);
        },
        search(){
            this.start++;
            this.getSearchResult();
        },
        getSearchResult(){
            this.errorText=""
            this.params={
                count:COUNT,
                start:this.start,
                q:this.query,
                summary:SUMMARY,
            }
            api.getSearchResult(this.params).then(res=>{
                // 加载状态结束
                this.loading = false;
               if(res.data.books.length>0){
                   this.list=this.list.concat(res.data.books)
                    // 数据全部加载完成
                    this.total=res.data.total
                    if (this.list.length >=res.data.total) {
                        this.finished = true;
                    }
                    this.setHstStorage(this.query);
               }else{
                   //暂无数据了
                   this.error = true;
                   this.errorText="暂无数据"
               }
           })
        },
        selectItem(item){
            this.$router.push({
                path:`/book/detail/${item.id}`
            })
        }
    },
    watch: {
        query(value){
            //重置状态
            this.loading = true;
            this.finished = false;
            this.start=0;
            this.list=[];
            if(`${value}`.length>0){
                this.getSearchResult()
            } 
        }
    },
}
</script>

<style lang="less" scoped>
.title-inner{
    .van-image{ min-width: 32px}
    .text{ 
        margin-left: 10px;
        .name{
            font-size:14px;
            color: #010101;
             display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        .author{
            font-size:10px;
            color: #999999;
             display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
    }
}
</style>

