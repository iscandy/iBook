<template>
    <div>
        <!-- 喜欢的主页面 -->
         <scroll class="favor_page"  v-show="!isShowDetail" :data="list">
            <div>
                <div class="favor-hd">
                    <div class="pic">
                        <van-image
                        :src="bgpic"
                        />
                        <div class="center-pic flex-V flex-vc flex-hc">
                            <van-image
                            width="62"
                            height="62"
                            round
                            src="https://img.yzcdn.cn/vant/cat.jpeg"
                            fit="cover"
                            />
                            <p class="name">candy</p>
                        </div>
                    </div>

                    <div class="flex-h flex-vc flex-hc tab-hd-item">
                        <div class="flex1 flex-v flex-hc flex-vc hd_item" @click="aboutClick">
                            <van-icon :name="aboutIcon" size="18"/>
                            <p class="text">关于我们</p>
                        </div>
                        <div class="flex1 flex-v flex-hc flex-vc hd_item">
                        <p>{{count}}</p>
                            <p class="text">我的书单</p>
                        </div>
                    </div>

                </div>

            
                <div class="favor-bd" >
                    <h2 class="flex-h flex-vc flex-hc favor-title">
                            <van-image
                            width="60"
                            height="22"
                            :src="titleIcon"
                            />
                    </h2> 

                    <p class="nodata"  v-if="!list.length">暂无数据</p>


                    <div class="favor-list_wrapper" v-if="list.length">
                        <ul class="favor-list clearfix">
                            <li class="flex-h flex-vc flex-hc" v-for="(item,index) in list" :key="index" @click="clickItem(item)">
                                <div class="inner" @click="toFavorDetail(item)">
                                    <div class="flex-h flex-vc title_wrapper">
                                        <span class="title flex1">{{getTypeText(item.type)}}</span>
                                        <!-- <like :classic="item" @changeFavor="changeFavor"></like>  -->
                                        <like :num="item.fav_nums" :like_status="item.like_status" @changeFavor="changeFavor"></like>  
                                    </div>
                                    <van-image
                                    v-if="item.type==200"
                                        height="120"
                                        width="120"
                                        :src="item.image"
                                        round
                                    />
                                    <van-image
                                        v-if="item.type!=200"
                                        height="120"
                                        width="100%"
                                        :src="item.image"
                                    />
                                    <p class="text">
                                    {{item.content}}
                                    </p>
                                </div>
                            
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="favor-ft">
                </div>
            </div>
        </scroll>
        <!-- 其他页面 -->
        <div class="page_wrapper"  v-show="isShowDetail">
            <classic-details   
            :classic="classic"
            :isShowbtn="false"
            @changeFavor="changeFavor"
            @changeShare="changeShare">
            </classic-details>
         </div>
    </div>
</template>

<script>
import {Image,Icon,Toast} from 'vant'
import api from '../../api/favor'
import {TIMEOUT,TYPE} from '../../common/js/config'
import like from '../../components/like/like'
// import {likeMixin} from '../../common/js/mixin'
import classicDetails from '../../view/details/details'
import {detailMixin} from '../../common/js/mixin'
import capi from '../../api/classic'
import bapi from '../../api/book'

import scroll from '../../components/scroll/scroll'


export default {
         mixins:[detailMixin],
        components:{
            [Image.name]:Image,
            [Icon.name]:Icon,
            like,
            classicDetails,
            [Toast.name]:Toast,
            scroll
        },
        data() {
            return {
               titleIcon:require('./title.png'),
               aboutIcon:require('./about.png'),
               bgpic:require('./bg1.png'),
               favor:{
                   normal:require('./like.png'),
                   active:require('./like-active.png')
               },
               list:[],
               isShowDetail:false,
               classic:{},
               count:0
            }
        },
        mounted() {
          this.getFavor();
          this.getFavorBookNum();
        },
        methods: {
            getFavor(){
                Toast.loading({
                    duration:TIMEOUT,       // 持续展示 toast
                })
                api.getFavor().then(res=>{
                    if(res.data.length){
                        this.list=res.data
                    }
                    Toast.clear()
                })      
             },
             //获取到喜欢的书籍
             getFavorBookNum(){
                 bapi.getFavorBookNum().then(res=>{
                     this.count=res.data.count
                 })
             },
             getTypeText(type){
                 return  type===TYPE.music ? "音乐" : type===TYPE.movie ? "电影" : type===TYPE.sentence ? "句子" : "书本"
             },
            clickItem(item){
                this.classic=item
            },
            toFavorDetail(item){
                capi.getFavNums(item.type,item.id).then(res=>{
                    this.classic=res.data;
                    this.isShowDetail=true;
                })
            },
            //去到关于我们的页面
            aboutClick(){
                this.$router.push({
                    path:"/about"
                });
            }
        }
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
 .favor_page{
     position: fixed; 
     top: 0px;
     right: 0px;
     bottom: 45px;
     overflow: none;
     background: #f1f1f1;
     .favor-hd{
        .pic{
            .van-image{
                display: block;
            }
        position: relative;
        .center-pic{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -31px;
            margin-top: -20px;
            .name{
                text-align: center;
                font-size: 17px;
                color: #000000;
                margin-top: 5px;
            }
        }
      }

      .tab-hd-item{
          background: #fff;
          padding:15px 0px;
          margin-top: -65px;
          position: relative;
          z-index: 10;
          .text{
              color: #999;
              font-size: 12px;
              margin-top: 11px;
          }

      }
     }
     .nodata{ 
             text-align: center; 
             padding: 10px 0px;
             text-align: center;
             color: #888;
        }
     .favor-bd{
        
        margin-top: 15px;
        padding-bottom:50px;
        background: #fff;
        .favor-title{
            padding-top: 23px;
            padding-bottom: 12px;
        }

        .favor-list{
            li{ float: left; width: 50%;
            margin-bottom:20px;
                .inner{
                    background: #fff;
                    box-shadow: 0px 0px 30px #efefef;
                    width: 165px;
                    height: 225px;
                    .van-image{
                         margin: 0 auto;
                         display: block
                    }
                    .title_wrapper{
                        padding:10px 15px;
                         .title{
                    color: #0f0f0f;
                            font-size: 12px;
                        }
                        .icon{
                            margin-right: 15px;
                            position: relative;
                            .num{
                                position:absolute;
                                right: -18px;
                                top: -3px;
                                font-size: 9px;
                                color: #bbbbbb;
                            }
                        }
                    } 
                    .text{
                        margin-top: 13px;
                        color: #999999;
                        font-size: 12px;
                        line-height: 21px;
                        padding: 0px 15px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
            }
        }
        
    }
 }

    
 </style>
 


