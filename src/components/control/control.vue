<template>
    <div class="control flex-h  flex-hc flex-vc">
        <div class=" flex-h flex-vc">
            <van-icon 
            :name="icon.prev" 
            size="16"  
            :class="{disabled:!prevstate}" 
            @click="prev" 
            v-if="isShowbtn"
            />
            <p class="text">{{title}}</p>
            <van-icon 
            :name="icon.next" 
            size="16"
            :class="{disabled:!nextstate}" 
             @click="next"
              v-if="isShowbtn"
              />
        </div>
    </div>
</template>

<script>
import {Icon } from 'vant'
export default {
    components:{
        [Icon.name]:Icon 
    },
    props:{
        isShowbtn:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:""
        } 
    },
    data() {
        return {
            icon:{
               prev:require('./prev.png'),
               next:require('./next.png') 
            },
            prevstate:true,
            nextstate:true
        }
    },
    methods: {
        prev(){
            if(this.prevstate){
                 this.$emit('prev')
            }
        },
        next(){
            if(this.nextstate){
                this.$emit('next')
            }
        },
        _setPrevDisabled(){
            this.prevstate=false
        },
        _setPrevEnable(){
            this.prevstate=true
        },
        _setNextDisabled(){
            this.nextstate=false
        },
        _setNextEnable(){
            this.nextstate=true
        }
    },
}
</script>

<style lang="less" scoped>
.control{
    max-width: 300px;
    margin: 0 auto;
    background: #F7F7F7;
    padding: 0px 10px;
    height: 40px;
    box-sizing: border-box;
    .text{
        text-align: center;
        color: #000000;
        font-size: 12px;
        width: 250px;
        height: 18px;
    }
    .disabled{
        opacity: 0.2;
    }
}
</style>

