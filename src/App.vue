<template>
  <div id="app">
    <keep-alive>
      <transition name="van-fade">
        <router-view />
      </transition>
    </keep-alive>
    <tab></tab>
    <player></player>
  </div>
</template>

<script>
import  tab  from './view/tab/tab'
import player from './view/player/player'
export default {
    components:{
      tab,
      player
    }
}
</script>

<style>
*{
  padding: 0px; 
 margin:0px;
}
body{
  color: #323233;
    font-family: 'PingFang SC', Helvetica, 'STHeiti STXihei', 'Microsoft YaHei', Tohoma, Arial, sans-serif;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
}

#app{
   font-size: 14px;
}



.flex-h {
	display:flex;
}
.flex-hc {
	justify-content:center;
}
.flex-v {
	display:flex;
	flex-direction:column;
}
.flex-vc {
	align-items:center;
}
.flex1 {
	flex: 1;  
}


.ellipsis{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.clearfix::after{display: block;
	content: "";
	width: 100%;
	clear: both;}


	.right{ position: relative;}
	.right::after{
		content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 2px;
}


</style>


