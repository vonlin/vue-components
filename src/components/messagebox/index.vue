<template>
  <transition name="msg-box-pop">
    <div class="msg-box-mask" v-show="show">
      <div class="msg-box-wrapper">
        <div class="msg-box-container">
          <div class="msg-box-title">{{title}}</div>
          <div class="msg-box-content">{{msg}}</div>
          <div class="msg-box-footer">
            <span class="msg-box-cancel" v-on:click="cancel" v-show="type == 'cancel-ok'">取消</span>
            <span class="msg-box-ok" v-on:click="ok">确认</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
      name: 'MessageBox',
      data () {
          return {
              title: "提示",
              msg: "是什么让他如此",
              type: 'cancel-ok',
              show: false
          }
      },
      methods: {
        cancel: function(){
            this.show = false;
        },
        ok: function(){
          this.show = false;
        }
      }
  }
</script>

<style scoped="scoped">
  .msg-box-mask{
    position:fixed;
    z-index:9999;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:table;
    transition: opacity .3s ease;
    background:rgba(0,0,0,.5);
  }

  .msg-box-wrapper{
    display: table-cell;
    vertical-align: middle;
  }

  .msg-box-container{
    background-color:#fff;
    width:250px;
    margin:0 auto;
    transition:all .3s ease;
    border-radius:2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }

  .msg-box-title{
    text-align:center;
    padding:16px 10px 5px;
    font-size:16px;
    font-weight: bold;
  }

  .msg-box-content{
    padding:10px 20px 30px;
    border-bottom:1px solid #999;
  }

  .msg-box-footer{
    display:table;
    width:100%;
    position:relative;
  }

  .msg-box-cancel,.msg-box-ok{
    display:table-cell;
    width:50%;
    text-align: center;
    padding:12px 0;
  }
  .msg-box-ok{
    color: #0babb5;
  }
  .msg-box-cancel{
    color:#999;
  }

  .msg-box-cancel::after{
    content:'';
    position:absolute;
    border-right:1px solid #999;
    width:1px;
    top:0;
    right:50%;
    height:100%;
  }

  .msg-box-pop-enter{
    opacity:0;
  }

  .msg-box-pop-leave-active{
    opacity:0;
  }

  .msg-box-pop-enter .msg-box-container,
  .msg-box-pop-leave-active .msg-box-container{
    -webit-transform: scale(1.5);
    transform: scale(1.5);
  }

</style>
