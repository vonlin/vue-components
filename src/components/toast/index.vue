<!--
  模态弹框组件
  1、带提示信息的弹框
  2、带提示信息和状态图标的弹框

  PS：可以定制弹框位置
-->
<template>
    <transition name="fade" v-on:after-leave="afterLeave">
      <div v-show="show">
        <div class="vc-toast-mask"></div>
        <div class="vc-toast-content iconfont_toast" :class="[position,icon]">
          <span class="vc-toast-msg">{{msg}}</span>
        </div>
      </div>
    </transition>
</template>

<script>
  import { bus } from '../../bus.js'
  export default {
      name: "Toast",
      data () {
        return {
          show: false,
          msg: 'default msg',
          position: 'middle',
          icon:''
        }
      },
      props: {
      },
    computed: {
    },
    methods:{
      afterLeave (el) {

      }
    }
  }
</script>

<style scoped="scoped">
  @import "../../../static/fonts/toast/iconfont.css";
  .fade-enter-active, .fade-leave-active {
    background-color: rgba(0,0,0,0.7);
    -webkit-transition: opacity .5s linear;
    transition: opacity .5s linear;
  }
  .fade-enter, .fade-leave-active {
    opacity:0;
  }
  .vc-toast-mask{
    width:100%;
    height:100%;
  }

  .vc-toast-mask{
    position:absolute;
    background:transparent;
    z-index: 10;
    height: 100%;
    width: 100%;
    top: 0;
  }

  .vc-toast-content{
    position: fixed;
    height:auto;
    text-align: center;
    max-width:90%;
    border-radius:3px;
    padding:14px 16px;
    background-color: rgba(0,0,0,0.7);
  }
  /*中间位置*/
  .vc-toast-content.middle{
    left:50%;
    top:50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  /*头部位置*/
  .vc-toast-content.top{
    left:50%;
    top:100px;
    -webkit-transform: translate(-50%,0);
    transform: translate(-50%,0);
  }
  /*底部位置*/
  .vc-toast-content.bottom{
    left:50%;
    bottom:100px;
    -webkit-transform: translate(-50%,0);
    transform: translate(-50%,0);
  }
  .vc-toast-msg{
    color:#FFFFFF;
    font-size:14px;
    display:block;
  }

</style>
