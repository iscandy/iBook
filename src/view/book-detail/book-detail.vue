<template>
      <div class="book-detail_page"  v-if="details.id" >

        <div class="book-hd">
            <search-bar blurText="搜索图书" @toSearchPage="toSearchPage"></search-bar>
        </div>

        <scroll class="book-bd" :data="pageData">
            <div class="book-bd-inner">
                <div class="book-base  flex-v flex-vc">
                        <van-image
                        width="100"
                        height="150"
                        fit="cover"
                        :src="details.image"
                        />
                        <p class="name">
                             {{details.title}}
                        </p>
                        <p class="author"> {{details.author[0]}}</p>
                </div>

                <div class="detail-item">
                    <div class="title">
                            短评
                    </div>

                    <div class="comments-loading flex-h fex-vc flex-hc" v-if="!comments.length">
                        <van-loading size="16" color="#1989fa" />
                    </div>


                    <div class="container">
                        <ul class="clearfix label-list">
                            <li v-for="(item, index) in comments" :key="index">
                                <div class="label-inner flex-h flex-vc">
                                    <p class="text">{{item.content}}</p>
                                    <span class="num">+{{item.nums}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="detail-item">
                    <div class="title">
                            内容简介
                    </div>
                    <div class="container">
                        <p class="content">
                           {{details.summary}}
                        </p>
                    </div>
                </div>

                <div class="detail-item">
                    <div class="title">
                            书本信息
                    </div>
                    <div class="container">
                        <ul class="detail">
                            <li class="flex-h flex-vc">
                                <span class="title">出版社</span>
                                <p class="text">{{details.publisher}}</p>
                            </li>
                            <li class="flex-h flex-vc">
                                <span class="title">出版年</span>
                                <p class="text">{{details.pubdate}}</p>
                            </li>
                             <li class="flex-h flex-vc">
                                <span class="title">页数</span>
                                <p class="text">{{details.pages}}</p>
                            </li>
                            <li class="flex-h flex-vc">
                                <span class="title">定价</span>
                                <p class="text">{{details.price}}</p>
                            </li>
                             <li class="flex-h flex-vc">
                                <span class="title">装帧</span>
                                <p class="text">{{details.binding}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </scroll>

        <div class="book-ft">
            <div class="inner flex-h flex-vc">
                <!-- <div class="back flex-h flex-vc flex-hc" @click="back">
                    <van-icon name="arrow-left" />
                </div> -->
                <div class="flex1 flex-h flex-vc flex-hc">
                    <div class="write flex-h flex-vc" @click="showComment" >
                        <van-icon :name="icon.rate" size="14" class="rate" />
                        <p>留下你的短评</p>
                    </div>
                </div>
                <!-- 喜欢 -->
                 <!-- 喜欢的按钮 -->
                <like :num="classic.fav_nums" :like_status="classic.like_status" 
                v-if="classic.id"
                @changeFavor="changeFavor"></like>  
                <!-- share -->
                <div class="share_wrapper">
                 <share @changeShare="changeShare"></share>
                 </div>
            </div>
        </div>

       <van-popup v-model="isShow" position="bottom">
           <div class="comments">
           <div class="comments-hd">
               <p class="flex1 tip">短评 {{message.length}}/{{maxNum}}</p>
           </div>
           <div class="comments-bd">
                <van-field
                    v-model.trim="message"
                    type="textarea"
                    placeholder="请输入评论"
                    rows="1"
                    autosize
                    :readonly="isloading"
                />
           </div>
            <div class="comments-ft">
                <van-button  
                :disabled=isdisabled  
                :loading=isloading 
                @click="sumbitComments"
                type="primary" 
                size="small" round>确定</van-button>
            </div>
            </div>
       </van-popup>

    </div>
</template>

<script>
const MAXNUM=12 //最大的长度
import {Image,Icon,Loading,Toast,Popup,Field,Button}  from 'vant'
import  scroll  from '../../components/scroll/scroll'
import searchBar  from '../../components/search-bar/search-bar'
import api from '../../api/book'
import {TIMEOUT,TYPE} from '../../common/js/config'
import { mapGetters,mapMutations} from "vuex"
import like from '../../components/like/like'
import share from '../../components/share/share'
import favor from '../../api/favor';
import {EROOR_CODE} from '../../api/config';
import {detailMixin} from '../../common/js/mixin'
import {toSearchPageMinxin} from '../../common/js/mixin'

export default {
    mixins:[detailMixin,toSearchPageMinxin],
    components:{
        searchBar,
        [Image.name]:Image ,
        [Icon.name]:Icon,
        scroll,
        [Toast.name]:Toast,
        [Loading.name]:Loading,
        [Icon.name]:Icon,
        [Popup.name]:Popup,
        like,
        share,
         [Field.name]:Field,
         [Button.name]:Button,
    },
    data() {
        return {
            icon:{
                favor:require('./favor.png'),
                rate:require('./rate.png'),
                share:require('./share.png')
            },
            details:{},
            comments:[],
            isShow:false,
            message:"",
            maxNum:MAXNUM,
            isdisabled:true,
            isloading:false,
          //  classic: this.$store.state.book 
        }
    },
    computed: {
        ...mapGetters(['book']),
        pageData(){
             return this.comments.concat(this.details)
        },
    },
    mounted() {
        //当在当前的页面刷新的时候做处理
        if(!this.book.id){
            this.$router.push({
                path:'/book'
            })
        }else{
            this.getBookDetail()
            this.getBookRate();
            this.classic=Object.assign(this.book)
            this.$set(this.classic,'type',400) 
        }
    },
    methods: {
        ...mapMutations({
            change_book:'CHANGE_BOOK'
        }),
        getBookDetail(){
            Toast.loading({
                duration:TIMEOUT
            })
            api.getBookDetail(this.$route.params.id).then(res=>{
                this.details=res.data;
                Toast.clear();
            })
        },
        getBookRate(){
            api.getBookRate(this.$route.params.id).then(res=>{
                this.comments=res.data.comments;
            })
        },
        // back(){
        //     this.$router.back();
        // },
        //喜欢和取消喜欢
        // changeFavor(flag){
        //     let art_id=this.book.id;
        //     let type=TYPE.book;
        //    if(flag){//当需要点击的时候
        //         favor.setLike({art_id,type}).then(res=>{
        //             if(res.data.error_code==EROOR_CODE){
        //                 this.book.like_status=1
        //                 this.book.fav_nums=this.book.fav_nums+1
        //                 this.change_book(this.book);
        //             }else{
        //                  Toast(res.data.msg)
        //             }
        //         })
        //    }else{
        //        favor.cancelLike({art_id,type}).then(res=>{
        //             if(res.data.error_code==EROOR_CODE){
        //                 this.book.like_status=0
        //                 this.book.fav_nums=this.book.fav_nums-1
        //                  this.change_book(this.book);
        //             }else{
        //                  Toast(res.data.msg)
        //             }
        //         })
        //    }
        // },
        // //取消分享
        // changeShare(){
        //      Toast("敬请期待");
        // },
        //展示评论信息
        showComment(){
            this.isShow=true;
        },
        //提交短评
        sumbitComments(){
            Toast.loading({
                mask:true,
                duration:TIMEOUT
            })
            if(!this.isdisabled){
                api.setComment(this.book.id,this.message).then(res=>{
                    if(res.data.error_code==EROOR_CODE){
                        this.getBookRate();
                        this.isShow=false;
                        Toast.clear()
                        this.message="";
                    }else{
                        Toast(res.data.msg.content[0])
                    }
                    
                })
                
           }
        }
    },
    watch: {
        message(value){
            if(value.length>=this.maxNum){
                this.message=value.substring(0,this.maxNum)
            }
            if(!value.length){
               this.isdisabled=true 
            }else{
                this.isdisabled=false
            }
        },
        book(value){
            console.log(value)
        }
    }
}
</script>

 <style lang="less" scoped>
    .book-bd{
        background: #f5f5f5;
        position: fixed;
        left: 0px;
        right: 0px;
        bottom: 45px;
        top:55px;
        overflow-y:auto;
        z-index: 2;
    }
    .book-base{
        margin-top: 10px;
         margin-bottom: 10px;
        background: #fff;
        padding: 23px 15px;
        .name{
            font-size: 19px;
            color: #000;
            margin-top: 15px;
        }
        .author{
            margin-top: 8px;
            color:#999999;
            font-size: 14px
        }
    }

    .detail-item{
        margin-bottom: 10px;
        background: #fff;
        padding-bottom: 15px;
     .title{
            text-align: center;
            font-size: 15px;
            color: #333;
            padding:15px 0px;
        }
        .container{
            padding: 0px 15px;

            .label-list{
                li{
                    float:left;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    &:first-child .label-inner{
                        background: #FFFADD
                    }
                     &:nth-child(2) .label-inner{
                        background: #EEFAFF
                    }
                    

                    .label-inner{
                        border-radius: 30px;
                     background: #F7F7F7;
                        padding: 6px 10px;
                        .text{
                            font-size: 12px;
                            color: #666666;
                        }
                        .num{
                            margin-left: 10px;
                            font-size: 10px;
                            color:#bbbbbb;
                        }
                    }
                    
                }
            }

            .content{
                color:#666;
                font-size: 14px;
                line-height: 23px
            }

            .detail{
                li{
                    height: 25px;
                }
                .title{
                    color: #999;
                    font-size: 12px;
                    width: 55px;
                    text-align: right;
                    margin-right: 15px;
                }
                .text{
                    color: #666666;
                    font-size: 12px;
                }
            }
        }
    }

    .book-ft{
            position:fixed;
            bottom: 0px;
            height: 45px;
            background: #fff;
            left:0px;
            right:0px;
            z-index: 2;
            padding:0px 15px;
            border-top: 0.5px solid #ccc;
            .inner{
                height: 100%;
                .back{
                    height: 100%;
                    padding-right: 15px;
                }
            .write{
                height: 30px;
                width: 100%;
                margin-right: 30px;
                // margin-left: 15px;
                box-sizing: border-box;
                padding: 0px 15px;
                border-radius: 30px;
                border: 0.5px solid #808080;
                box-sizing: border-box;
                .rate{
                    margin-right: 10px
                }
             } 
             .like{
                 position: relative;
                 .text{
                     position: absolute;
                     right:23px;
                     top:-3px;
                     color: #010101;
                     font-size: 9px;
                 }
                 .favor{
                        margin-right: 40px
                    }
             }
             
            }
            .share_wrapper{
                margin-left: 35px
            }
      }

    // 弹窗部分
    .comments{
        background: url('./bg.jpg') no-repeat center;
        background-size: contain;
        .comments-hd{
            padding: 15px;
            font-size: 13px;
            color:#bbbbbb;
            border-bottom: .5px solid #ececec;
        }

        .comments-bd{ 
        padding:15px;
        .van-field{
                background:rgba(238, 250, 255, 0.7);
                border-radius: 20px;
                font-size: 14px;
                .van-field__control{
                    font-size: 13px;
                }
            }
        }
        
        .comments-ft{
            display: flex;
            justify-content:flex-end;
            padding: 0px 15px;   
            .van-button{
                margin-bottom: 15px;
            }
        }
    }
    

</style>


