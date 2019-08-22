<template>
   <div class="book-list">
               <ul class="clearfix">
                   <li v-for="(item, index) in list" :key="index" @click="selectItem(item, index)">
                      <div class="list-inner">
                           <van-image
                                width="120"
                                fit="cover"
                                :src="item.image"
                            />
                            <div class="text">
                                <p class="name">
                                    {{item.title}}
                                </p>
                                <p class="author">
                                    {{item.author}}
                                </p>
                                <p class="num">
                                    {{item.fav_nums}}喜欢
                                </p>
                            </div>
                      </div>
                   </li>
               </ul>
           </div>
</template>

<script>

import {Image} from 'vant'
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    },
     components:{
        [Image.name]:Image
    },
    methods: {
        selectItem(item, index){
            this.$emit('selectItem',item, index)
        }
    },
}
</script>


<style lang="less" scoped>
.book-list{
    padding: 0px 30px;
    li{
        float: left;
        width: 50%;
        margin-bottom: 30px;
    }
    .list-inner{
         width: 120px;
         margin: 0 auto;
         box-shadow: 5px 5px 25px #ececec;
         padding-bottom:10px;
         .van-image{
             max-height: 110px;
            overflow: hidden;
         }
         .text{
             padding: 0px 6px;
             .name{
                color: #1f1f1f;
                font-size: 12px;
                margin-top: 10px;
            }
            .author{
                color: #999999;
                font-size: 10px;
                margin-top: 5px;
            }
            .num{
                color: #bbbbbb;
                font-size: 10px;
                text-align: right;
                 margin-top: 10px;
            }
         }
    }
}
</style>
