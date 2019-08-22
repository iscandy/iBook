<template>
    <div  class="search-bar">
        <div class="blur" @click="toSearchPage" v-show="!isFocus">
            <van-icon :name="searchIcon" />
            <p>{{blurText}}</p> 
        </div>

       <form action="/" class="focus" v-show="isFocus">
            <van-search 
                v-model="value"
                :placeholder="blurText"
                input-align="left"
                :left-icon="searchIcon"
                show-action
                @search="onSearch"
                @cancel="onCancel"
                ref="search"
            >
            <div slot="action" @click="back">取消</div>
            </van-search>
        </form>

    </div>
</template>

<script>
import {Search,Icon} from 'vant'
import { debounce}  from '../../utils/util'
export default {
    props:{
        blurText:{
            type:String,
            default:""
        },
        value:{
            type:String,
            default:""
        }

    },
    components:{
        [Search.name]:Search,
        [Icon.name]:Icon
    },
    data() {
        return {
            searchIcon:require('./search.png'),
            isFocus:false
        }
    },
    methods: {
        onSearch(){
             this.$emit('onSearch',this.value)
        },
        onCancel(){
             this.$emit('onCancel')
        },
        toSearchPage(){
            this.$emit('toSearchPage')
        },
        focus(){
            this.isFocus=true
            setTimeout(()=>{
                 this.$refs.search.querySelector('input').focus();
            },10)
        },
        back(){
            this.$emit('back')
        }
    },
    created() {
        this.$watch('value',debounce((newQuery) => {
            this.$emit('changeValue', newQuery)
        },300))
    },
    // watch: {
    //     value(newQuery){
    //         debounce(()=>{
    //             this.$emit('changeValue',newValue)
    //         },200)
    //     }
    // },
}
</script>

<style lang="less" scoped>
.search-bar{
    background: #fff;
    border-bottom: .5px solid #ececec;
    padding: 10px 15px;
    z-index: 100;
    .blur{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999999;
    font-size: 14px;
    
    box-sizing:  border-box;
    background: #f7f8fa;
    border-radius: 30px;
    height: 35px;
    .van-icon{
        margin-right: 10px;
    }
}
.van-search{ padding:0px}
}

</style>

