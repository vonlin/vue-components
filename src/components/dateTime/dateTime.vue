<template>
  <div>
    <button v-on:touchstart="show">点击弹出/隐藏日期控件</button>
    <div id="dt-fill" v-on:touchstart="show"></div>
    <datetime v-bind:cshow="cshow" v-bind:target="'dt-fill'"></datetime>
  </div>
</template>

<script>
  import datetime from './index.vue'
  import { bus } from '../../bus.js'
  export default {
    name: 'DateTime',
    data () {
      return {
        cshow:"dn"
      }
    },
    mounted() {
      bus.$on('hideOrShow', (cls) => {
        this.cshow = cls;
      })
    },
    methods: {
      show () {
        if(this.cshow == "fadeIn"){
          this.cshow = "fadeOut";
        }else{
          this.cshow = "fadeIn";
        }
      }
    },
    components : {datetime}
  }
</script>

<style scoped="scoped">
  button,#dt-fill{
    width:80%;
    margin:20px auto;
    height:36px;
    line-height: 36px;
    display: block;
    background: transparent;
    border:1px solid #999;
    border-radius:3px;
  }
  #dt-fill{
    text-align: center;
    color: red;
  }
</style>
