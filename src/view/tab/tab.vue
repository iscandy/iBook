<template>
    <div class="tab" route> 
        <van-tabbar   active-color="#000000" inactive-color="#C7C7C7"  class="tab" v-model="active"  >
            <van-tabbar-item
                v-for="(item,index) in tabbars" 
                :key="index"
                :to="item.path"
                replace
            >
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? item.active : item.normal"
                >
                {{item.title}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem} from 'vant';
export default {
    components:{
        [Tabbar.name]:Tabbar,
        [TabbarItem.name]:TabbarItem
    },
    data() {
        return {
        active: 0,
        tabbars: [
            {
                path: "/classic",
                title: "期刊",
                normal: require('./classic.png'),
                active:require('./classic@highlight.png') 
            },
            {
                path: "/book",
                title: "书单",
                normal: require('./book.png'),
                active:require('./book@highlight.png') 
            },
            {
                path: "/favor",
                title: "喜欢",
                normal: require('./favor.png'),
                active:require('./favor@highlight.png') 
            }
        ]
        }
    },
    watch: {
        $route(to){   
       //console.log(to,this.tabbars.findIndex(item=>item.path.indexOf(to.name)!=-1));
          this.active=this.tabbars.findIndex(item=>item.path.indexOf(to.name)!=-1)
        }
    },
}
</script>

<style lang="less" scoped>
.tab{
     height: 45px; 
     border-top: 0.5px solid #ececec;
     z-index: 100;
     .router-link-active{ color: red;}
     img{ height: 24px; margin-bottom: -5px;}
 }
</style>

 