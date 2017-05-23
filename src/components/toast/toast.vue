<template>
  <div>
    <button v-on:click="showToast('middle')">点击在中间弹出提示框</button>
    <button v-on:click="showToast('top')">点击在顶部弹出提示框</button>
    <button v-on:click="showToast('bottom')">点击在底部弹出提示框</button>
    <button v-on:touchstart="showToast('middle','toast-icon-right')">点击弹出带图标的提示框</button>

    <!--<transition name="fade" mode="in-out" v-on:after-enter="afterEnter">-->
      <!--<toast v-if="show"></toast>-->
    <!--</transition>-->
  </div>
</template>

<script>
//  import toast from './index.vue'
  import { bus } from '../../bus.js'
  import Toast from './toast.js'
  export default {
    name: 'Toast',
    data () {
      return {
        show : false
      }
    },
    mounted() {
      bus.$on('hideOrShow', (cls) => {
        this.cshow = cls;
      })
    },
    methods: {
        showToast (position,icon) {
          Toast({
            icon: icon || "",
            msg: 'This is a Toast',
            duration: 2000,
            position: position,
            afterLeave: function(){
              console.log("callback")
            }
          });
        },
      afterEnter: function (el) {
        setTimeout(() => {
          this.show=!this.show;
        },2000);
      }
    },
//    components : {toast}
  }
</script>

<style scoped="scoped">
  button{
    width:80%;
    margin:20px auto;
    height:36px;
    line-height: 36px;
    display: block;
    background: transparent;
    border:1px solid #3bb593;
    border-radius:3px;
  }
</style>
