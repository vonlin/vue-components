<template>
  <div id="Main">
    <router-view name="cheader"></router-view>
    <div class="dn"></div>
    <router-view name="cmain"></router-view>
  </div>
</template>

<script>
  export default {
      name: 'Main'
  }
</script>
