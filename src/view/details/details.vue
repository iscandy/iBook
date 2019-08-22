<template>
    <div class="page_details" v-show="classic.id">
        <div class="classic_hd">

            <div class="flex-h flex-vc">
            <div class="date flex-h flex1">
                <span class="unit">
                    No.
                </span>
                <span class="day">
                    {{pubdate.day}}
                </span>
                <div class="flex-v flex-hc desc">
                    <span class="mouth"> {{pubdate.month | formatMonth}}</span>
                    <span class="year">{{pubdate.year}}</span>
                </div>
            </div>

            <div class="flex-h flex-vc hd-right">
                <!-- 喜欢的按钮 -->
                <like :num="classic.fav_nums" :like_status="classic.like_status" @changeFavor="changeFavor"></like>  
                <div class="share_wrapper">
                    <share @changeShare="changeShare"></share>
                </div>
            </div>
            </div>
        </div>

        <div class="classic_bd">
            <div class="pic-box">

                <div class="music-box" v-show="isMusic">
                    <van-image  class="music-pic"
                        width="210px"
                        height="210px"
                        round
                        fit="cover"
                        :src="classic.image"
                        :class="{rotate:isPlay}"
                    />
                    <van-icon :name="centerIcon" class="music-icon" size="60" @click="trigglePlay" />
                </div>

                <van-image  class="music-pic"
                    height="270px"
                    fit="contain"
                    :src="classic.image"
                    v-if="!isMusic"
                />


                <van-image
                    class="flag-pic"
                    width="27px"
                    height="80px"
                    :src="picItem"
                />
            </div>
            <p class="text">
               {{classic.content}}
            </p>
        </div>
        <div class="classic_ft">
            <control :title="classic.title" @prev="prev" @next="next" 
            :isShowbtn="isShowbtn"
                ref="control"
             ></control>
        </div>
    </div>
</template>

<script>
import {TYPE} from '../../common/js/config'
import {Icon,Image } from 'vant';
import control from '../../components/control/control'
import {mapGetters,mapMutations} from 'vuex'

import like from '../../components/like/like'
import share from '../../components/share/share'
export default {
    props:{
        classic:{
            type:Object,
            default:null
        },
        isShowbtn:{
            type:Boolean,
            default:false
        }
    },
    components:{
        [Icon.name]:Icon,
        [Image.name]:Image,
        control,
        like,
        share
    },
    data() {
        return {
             flagPic:{
                movie: require('./movie.png'),
                book: require('./book.png'),
                music: require('./music.png'),
             },
             musicIcon:{
                 play:require('./play.png'),
                 pause:require('./pause.png')
             }
        }
    },
    computed: {
        ...mapGetters(['currentIndex','maxIndex','isplaying','music']),
        picItem(){
            let {classic,flagPic}=this;
            return classic.type==TYPE.movie ? flagPic.movie :   classic.type==TYPE.music ? flagPic.music : flagPic.book 
        },
        isMusic(){
            return this.classic.type==TYPE.music
        },
        pubdate(){
            let date=new Date(this.classic.pubdate)
            return {
                day:date.getDate(),
                month:date.getMonth(),
                year:date.getFullYear()
            }
        },
        isPlay(){
            return this.isplaying && this.classic.id === this.music.id
        },
        centerIcon(){
            return this.isPlay ? this.musicIcon.play :  this.musicIcon.pause
        }
    },
    filters:{
         formatMonth(value){
             const MONTHARR=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
             return MONTHARR[value]
        }
    },
    methods: {
        ...mapMutations({
            set_music:'SET_MUSIC',
            set_playing:'SET_PLAYING'
        }),
        prev(){
            this.$emit('prev')
        },
        next(){
           this.$emit('next') 
        },
        trigglePlay(){
            if(this.isPlay){
                this.set_playing(false);
            }else{
                if(this.music.id!=this.classic.id){
                    this.set_music(this.classic);
                }
                this.set_playing(true);
            }
        },
        changeShare(){
            this.$emit('changeShare')
        },
        changeFavor(flag){
            this.$emit('changeFavor',flag)
        }
    },
    watch: {
        currentIndex(value){
            if(value===1){
                this.$refs.control._setNextDisabled()
            }else{
                 this.$refs.control._setNextEnable()
            }

            if(value===this.maxIndex){
                this.$refs.control._setPrevDisabled()
            }else{
                 this.$refs.control._setPrevEnable()
            }
        }
    },
    
}
</script>

<style lang="less" scoped>
.classic_hd{
    background: #fff;
    border-bottom: .5px solid #ececec;
    padding: 13px;
    .date{
        color:#000000;
        align-items: flex-end;
        .unit{
            font-size: 16px;
             color: #888;
        }
        .day{
             font-size: 29px;
              line-height: 23px;
              font-weight: bold;
        }
        .desc{
            position:  relative;
            padding-left: 16px;
            &::before{
                content: "";
                border-left: 1.5px solid #000; 
                display: block;
                 height: 22px;
                 left: 8px;
                 top: 50%;
                 margin-top: -11px;
                 position: absolute;
            }
            .mouth{
                font-size: 12px;
                margin-bottom: 3px;
            }
            .year{
                 font-size: 10px;
                 color: #888;
            }
        }
        
    }

    .hd-right{
        justify-content: flex-end;
        .share_wrapper{
            margin-left: 35px;
        }
    }

    
}

.classic_bd{
    .text{
        color: #0f0f0f;
        font-size: 17px;
        width: 280px;
        margin: 0  auto;
        margin-top: 55px;
        line-height: 25px;
    }
    .pic-box{
        position: relative;
        .flag-pic{
            position: absolute;
            bottom:-35px;
            left: 15px;
        }

        .music-box{
             height: 250px;
             display: flex;
             justify-content: center;
             align-items: center;
             position: relative;
             .music-pic{
                 box-shadow: 2px 2px 25px #bbb;
             }
             .music-icon{
                 position: absolute;
             }
        }
    }
}


.classic_ft{
    display: flex;
    justify-content: center;
    left: 0px;
    right: 0px;
    position: absolute;
    bottom: 30px;
}


@keyframes rotate{
    0%{
        transform: rotate(0);
    }
    50%{
        transform:rotate(180deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
 
.rotate{
    transition: 0.5s;
    animation: rotate 10s linear infinite;  /*开始动画后无限
    循环，用来控制rotate*/
}

audio{
    position: fixed; z-index: 10;
    left: 15px;
    top:15px;
}
</style>

