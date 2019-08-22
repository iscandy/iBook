<template>
    <!-- 关于的主页面 -->
    <div class="about_page">
        <div class="about-hd flex-h flex-vc flex-hc">
            <div class="pic">
                 <van-image
                   width="72"
                   height="72"
                    fit="cover"
                    round
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
            </div>
        </div>
        <div class="about-bd flex-h flex-vc flex-hc">
            <div class="text">
                Created By 七月 / 设计  木齐
            </div>
        </div>
        <div class="about-ft">
            <div class="main">
                <p class="mini-text">关注微信公众号</p>
                <p class="lager-text">林间有风</p>
            </div>
            <div class="sub">
                <p class="text">欢迎开发者通过微信公众号向作者反馈BUG</p>
                <p class="text">由于本项目仅作为案例演示，不承诺保留用户相关数据</p>
            </div> 
        </div>
    </div>
</template>

<script>
import {Image} from 'vant'
export default {
    components:{
        [Image.name]:Image,
    },
    data() {
        return {
            bgImage:require('./bg.png')
        }
    },
}
</script>

 <style lang="less" scoped>
 .about_page{
     position: fixed; 
     top: 0px;
     right: 0px;
     bottom: 0px;
     left: 0px;
     overflow-y: auto;
     z-index: 2;
     background:url('./bg.png') no-repeat center;
     background-size: cover;
     .about-hd{
         margin-top: 80px;
         .pic{
              padding: 10px;
              border: 0.5px solid  #fff;
               border-radius: 50%;
         }
         
     }
     .about-bd{
        width: 100%;
        .text{
            margin-top: 16px;
            color: #fff;
            font-size: 12px;
            writing-mode:vertical-lr;
            letter-spacing:4px;
        }
    }

    .about-ft{
         position: fixed;
         bottom: 20px;
         color: #fff;
         padding: 0px 15px;
         .main{
             width: 240px;
             border-bottom: 1px solid #fff;
             padding-bottom: 10px;
            .mini-text{ font-size: 10px; margin-bottom: 6px}
            .lager-text{font-size: 17px}
         }
         .sub{
             margin-top: 10px;
             .text{
                 font-size: 12px;
                  height: 10px;
                  line-height: 10px;
                  border-left: 3px solid #fff;
                  padding-left: 10px;
                  display: block;
                  &:first-child{
                      margin-bottom: 10px;
                  }
             }
         }
    }
 }

    
 </style>
 


