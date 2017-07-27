<template>
  <div>
    <img v-for="img in imgs" :src="img.src" alt="">
  </div>
</template>

<script>
  export default {
      name: 'lazyLoad',
      data () {
          return {
              imgs: [
                {src: 'http://img1.imgtn.bdimg.com/it/u=2714604270,985293181&fm=200&gp=0.jpg'},
                {src: 'http://wx1.sinaimg.cn/mw690/005IY5IEgy1fgpkq5fxg6j30j60qjwm8.jpg'},
                {src: 'http://img1.imgtn.bdimg.com/it/u=1884738033,3459235394&fm=26&gp=0.jpg'},
                {src: 'http://img5.imgtn.bdimg.com/it/u=1607585216,3171392275&fm=26&gp=0.jpg'}
              ]
          }
      }
  }
</script>

<style scoped>
  img{
    float:left;
    width:50%;
    heigth:auto;
  }
</style>
