<template>
     <div class="share" @click="changeShare"> 
        <van-icon :name="share.normal" size="14" />
    </div>
</template>

<script>
import {Icon} from 'vant'
export default {
    components:{
        [Icon.name]:Icon
    },
    data() {
        return {
             share: {
                normal: require('./share.png'),
             }
        }
    },
    methods: {
        changeShare(){
            this.$emit('changeShare')
        },
    },
}
</script>

