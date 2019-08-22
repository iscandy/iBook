<template>
      <div class="favor flex-h flex-vc flex-hc" @click="changeFavor"> 
            <van-icon :name="favorIcon" size="16" />
            <span class="num">{{num}}</span>
        </div>
</template>

<script>
import { Icon } from 'vant';

export default {
    props:{
        num:{
            type:Number,
            default:0  
        },
        like_status:{
            ype:Number,
            default:0  
        }
    },
    components:{
        [Icon.name]:Icon
    },
    data() {
        return {
             favor: {
                normal: require('./like.png'),
                active:require('./like-active.png') 
             }
        }
    },
    computed: {
        favorIcon(){
           return this.like_status ?  this.favor.active :this.favor.normal
        },
    },
    methods: {
        changeFavor(){
            let flag=!this.like_status;
            this.$emit('changeFavor',flag)
        }
    },
}
</script>

<style lang="less" scoped>
 .favor{
    position: relative;
    width: 16px;
    .num{
        position: absolute;
        font-size: 9px;
        color: #bbbbbb;
        top: -5px;
        left: 18px;
    }
}
</style>