<template>
  <btn message="clck"></btn>
</template>

<script>
  import btn from './index.vue'
  export default {
    name: 'Button',
    components: {btn}
  }
</script>

<style scoped>
  #button{
    padding:20px;
  }
  [type='button']{
    width:100%;
    height:56px;
    background:green;
    outline: none;
    border:none;
    border-radius:3px;
    color:#fff;
    font-size:18px;
  }
</style>
