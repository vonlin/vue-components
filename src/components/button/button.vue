<template>
  <div id="button" class="wrap">
    <input type="button" value="success">
  </div>
</template>

<script>
  export default {
    name: 'Button'
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
  }
</style>
