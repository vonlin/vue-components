<template>
  <div id="button" class="wrap">
    <input type="button" v-bind:value="txt" class="default" v-bind:style="{backgroundColor: bgcolor}"/>
  </div>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      txt: {
          default: "点击我"
      },
      bgcolor: {
          default: '#999'
      }
    }
  }
</script>

<style scoped>
  #button{
    padding:20px;
  }
  [type='button']{
    width:100%;
    height:40px;
    outline: none;
    border:none;
    border-radius:3px;
    color:#fff;
    font-size:14px;
  }
  .default{
    background:#999;
  }
  .danger{
    background:orange;
  }
</style>
