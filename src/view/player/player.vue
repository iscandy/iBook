<template>
    <div>
        <!-- 
             @ended="songEnd"
             @timeupdate="timeupdate"
        -->
        <audio 
        :src="music.url"
        controls
        ref="audio" 
        v-show="false"
        @canplay="canplay"
        @error="error"
        loop="true"
        ></audio>
    </div>
</template>

<script>
import { mapGetters,mapMutations} from 'vuex'
import {Toast} from 'vant'
export default {
    components:{
        [Toast.name]:Toast  
    },
    data() {
        return {
           //currentTime:0,//当前的时间
           ready:false
        }
    },
    computed: {
         ...mapGetters(['music','currentIndex','isplaying'])
    },
    methods: {
        ...mapMutations({
            set_playing:'SET_PLAYING' 
        }),
        // songEnd(){//当歌曲播放完成的时候
        //    this.$refs.audio.currentTime=0//设置当前从头开始播放
        // },
        play(){
            this.$refs.audio.play();
        },
        pause(){
            this.$refs.audio.pause();
        },
        // timeupdate(e){//获取到歌曲的时间
        //     this.currentTime=e.target.currentTime 
        // },
        canplay(){//当歌曲读取正确
          
        },
        error(){
             Toast("音乐加载失败~~");    
        }
    },
    watch: {
        isplaying(flag){
            if(!flag){
                this.pause()
            }else{
                this.play()
            }
        },
        music(){
            //延时
            setTimeout(()=>{
                 this.play()
            },200)
        }
    },
    
}
</script>
<style lang="less">
audio{ display:none}
</style>

