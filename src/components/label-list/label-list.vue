<template>
    <div class="label-bar">
        <h2 class="title">
            {{title}}
        </h2>
        <ul class="clearfix">
            <li v-for="(item,index) in list" :key="index" @click="selectItem(item)">
                <div class="label-inner">
                   {{item}}
                </div>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    props:{
        title:{
            type:String,
            default:""
        },
        list:{
            type:Array,
            default:[]
        }
    },
    methods: {
        selectItem(item){
            this.$emit('selectItem',item)
        }
    },
}
</script>



<style lang="less">
.label-bar{
    .title{
        color: #010101;
        font-size: 14px;
        padding-left: 15px;
        height: 13px;
        line-height: 13px;
        border-left: 3px solid #010101;
        font-weight: normal;
        box-sizing:border-box;
    }
    ul{
      padding-left: 8px;
       li{
            float: left;
            padding: 7px 7px;
            .label-inner{color: #666666; font-size: 14px; padding: 5px 8px; background: #F7F7F7}
        }
    }
}
</style>
