<template>
  <div>
    <btn txt="弹出加载圈" bgcolor="#666" v-on:click.native="showloading()"></btn>
    <btn txt="弹出有说明信息的加载圈" bgcolor="green" v-on:click.native="showloading(true)"></btn>
    <btn txt="弹出三个点的加载圈" bgcolor="orange" v-on:click.native="showloading('sc')"></btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  import loading from './loading.js'
  var btn = Vue.component("Button");

  export default {
      name: 'Loading',
      methods: {
        showloading : function(flag){
          loading(flag);
          setTimeout(function(){
            loading(false);
          },5000);
        }
      },
      components: {btn}
  }
</script>
