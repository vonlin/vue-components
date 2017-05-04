<template>
  <li v-bind:ckey="ckey" class="iconfont" v-bind:class="ckey">
      <router-link v-bind:to="dynaPath">
        {{labelText}}
      </router-link>
  </li>
</template>

<script>

  export default {
    name: 'Homeli',
    props: {
      ckey: '',
      cname: '',
      cpath: ''
    },
    computed: {
      labelText () {
        return this.ckey + ' (' + this.cname + ')';
      },
      dynaPath () {
          return this.cpath + "/" +this.cname;
      }
    }
  }
</script>

<style scoped>
  .v-c-c-list > li{
    text-align:left;
    border-top: 1px solid #e9e9e9;
    position:relative;
    width:100%;
    height:54px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .v-c-c-list > li::after{
    content: '';
    position:absolute;
    height:10px;
    width:10px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    border-right:1px solid #999;
    border-top:1px solid #999;
    right:20px;
    top:24px;
  }
  .v-c-c-list > li >a {
    font-family: "Microsoft YaHei"!important;
    line-height: 27px;
    font-size:14px;
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 53px;
    padding-left: 36px;
  }
</style>
