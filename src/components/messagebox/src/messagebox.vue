<template>
  <div>
    <h6>弹框定制</h6>
    <ul>
      <li>
        <label for="">msg：</label>
        <input type="text" v-model="msg"/>
      </li>
      <li>
        <label for="">type：</label>
        <input type="text" v-model="type">
      </li>
    </ul>
    <button v-on:click="create">生成</button>
  </div>
</template>

<script>
  import MessageBox from './messagebox.js';
  export default {
    data () {
      return {
          msg: "这是弹框的内容",
          type:"ok"
      }
    },
    methods: {
      create: function(){
        MessageBox({
          msg: this.msg,
          type: this.type
        });
      }
    }
  }
</script>

<style scoped="scoped">
  h6{
    padding:20px 20px;
  }
  ul{
    padding:20px 20px;
  }
  li{
    display:table;
    padding:10px 0;
    width: 100%;
  }
  li>input,li>label{
    display: table-cell;
    height:36px;
    outline:none;
  }
  li>span{
    width:40px;
  }
  li>input{
    width:100%;
    font-size:16px;
  }
  button{
    width:80%;
    margin:20px auto;
    height:36px;
    line-height: 36px;
    display: block;
    background: transparent;
    border:1px solid #3bb593;
    border-radius:3px;
  }
</style>
