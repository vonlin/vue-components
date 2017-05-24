<template>
  <div>
    <button v-on:click="showDT">点击弹出日期控件</button>
    <div id="dt-fill" v-on:click="showDT"></div>
  </div>
</template>

<script>
  import DateTime from './dateTime.js'
  import { bus } from '../../../bus.js'
  var dateTime = null;
  export default {
    name: 'DateTime',
    methods: {
      showDT (el) {
        if(!dateTime){
          dateTime = new DateTime({
            bindEl: document.getElementById("dt-fill"),
            confirmCallback (data) {
              this.$toast({
                msg: data,
                icon: 'toast-icon-right'
              });
            }
          });
        }else{
          dateTime.show = true;
        }
      }
    },
//    components : {datetime}
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
