<template>
  <header>
    <router-link v-bind:to="'home'" :class="isBack" class="back">
      返回
      </router-link>
    <!--<span class="back" :class="isBack" v-on:touchstart="back">返回</span>-->
    {{$route.name || "组件列表"}}
  </header>
</template>

<script>
  export default {
      name : 'cheader',
      computed: {
          isBack () {
              return this.$route.name ? "" : "dn";
          },
      }
  }
</script>

<style scoped>
  header{
    top:0;
    left:0;
    width:100%;
    padding:16px 0;
    text-align: center;
    position:relative;
  }
  .back{
    position:absolute;
    height:50px;
    left:16px;
    line-height: 50px;
    top:0;
  }
  .back::before{
    content:'';
    display: inline-block;
    height:9px;
    width:9px;
    margin-right:2px;
    border-top:1px solid #000;
    border-left:1px solid #000;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
