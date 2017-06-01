<template>
  <div class="loading-mask" v-show="visibile">
    <div class="loading-container">
      <!--type one -->
      <div class="loading-inner-mask" :class="loadingType" v-show="type == 'rl'">
        <canvas id="rotate-loading" width="60" height="60"></canvas>
      </div>

      <!--type two-->
      <div class="loading-inner-mask-sc" :class="loadingType" v-show="type == 'sc'">
        <div id="scale-circular-1" :class="sc1"></div>
        <div id="scale-circular-2" :class="sc2"></div>
        <div id="scale-circular-3" :class="sc3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    data () {
      return {
        loadingType: 'default',
        visibile: false,
        ctx: null,
        type: 'rl',
        sc1: 'sc',
        sc2: '',
        sc3: ''
      }
    },
    methods: {
        loadingshow:function(type){
          if(type == true || type == 'rl'){
            this.type = 'rl';
            this.loadingType = "loadinginfo"
            this.drawLoading4info(this.ctx);
            this.visibile = true;
          }else if(type == false){
            this.hide();
          }else if(type == 'sc'){
            this.type = 'sc';
            this.visibile = true;
            this.scEffect();
          }else{
            this.type = 'rl';
            this.loadingType = "default"
            this.drawLoading(this.ctx);
            this.visibile = true;
          }
        },
      hide: function(el){
        if(window.interId){
          clearInterval(interId);
        }
        if(window.scinterid){
          clearInterval(scinterid);
        }
        this.$el.parentNode.removeChild(this.$el)
      },
      drawLoading: function (ctx) {
        this.loadingType = "default";
        ctx.canvas.setAttribute("width",60);
        ctx.canvas.setAttribute("height",60);
        this.actionEffect(ctx,30,30);
      },
      drawLoading4info: function(ctx){
        this.loadingType = "loadinginfo";
        ctx.canvas.setAttribute("width",80);
        ctx.canvas.setAttribute("height",80);
        this.actionEffect(ctx,40,40);
      },
      actionEffect: function(ctx,x,y){
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#fff";
        var radian = -Math.PI / 2;
        var a = 0.08;
        var temp = 0;
        window.interId = setInterval(function () {
          temp += 1;
          if (radian >= -Math.PI / 2 && radian <= Math.PI * 3 / 2) {
            ctx.beginPath();
            radian = -Math.PI / 2 + a * temp;
            ctx.clearRect(0, 0, 100, 100);
            ctx.arc(x, y, 12, radian, Math.PI * 3 / 2, false);
            ctx.stroke();
          }
          if (radian >= Math.PI * 3 / 2) {
            radian = -Math.PI / 2;
          }
        }, 19.6);
      },
      scEffect: function(){
          let count = 2;
          window.scinterid = setInterval(() => {
            if(count % 2 == 0){
              this.sc2 = 'sc';
              this.sc1 = '';
              this.sc3 = '';
            }else if(count%3 == 0){
              this.sc3 = 'sc';
              this.sc1 = '';
              this.sc2 = '';
            }else if(count%1 == 0){
              this.sc1 = 'sc';
              this.sc2 = '';
              this.sc3 = '';
            }
            count ++ ;
            if(count == 4){
                count = 1;
            }
          },805);
      }
    }


  }
</script>

<style scoped="scoped">
  .loading-mask {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0);
    display: table;
  }

  .loading-container {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }

  .loading-inner-mask,.loading-inner-mask-sc {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align:center;
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, .7);
    margin: 0 auto;
    text-align: center;
    border-radius: 3px;
    position: relative;
  }

  .loading-inner-mask-sc{
    width:120px!important;
    background-color: transparent;
  }

  .loading-inner-mask.loadinginfo::after {
    content: '加载中...';
    position: absolute;
    width: 80px;
    left: 0;
    bottom: 10px;
    color: #fff;
    font-size: 12px;
    letter-spacing: 2px;
  }

  /*type one*/
  #rotate-loading {
     animation: rt 1.5s ease infinite;
   }

  /*type two*/
  #scale-circular-1,
  #scale-circular-2,
  #scale-circular-3{
    display:inline-block;
    width:12px;
    height:12px;
    background:orange;
    border-radius:100%;
    vertical-align: middle;
    margin:0 auto;
    -webkit-box-flex: 1;
  }
  /*#scale-circular-1{*/
    /*animation: type2-loading-ani2 .5s linear infinite alternate;*/
  /*}*/

  /*#scale-circular-2{*/
    /*animation: type2-loading-ani2-1 .5s linear infinite alternate;*/
  /*}*/

  /*#scale-circular-3{*/
    /*animation: type2-loading-ani2-1 .5s linear infinite alternate;*/
  /*}*/

  .sc{
    animation: type2-loading-ani2 .4s linear infinite alternate;
  }

  .loadinginfo #rotate-loading{
    margin-top: -10px;
  }

  @keyframes rt {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes type2-loading-ani2 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(.1);
    }
  }

  .default{
    width: 60px;
    height: 60px;
  }
  .loadinginfo{
    width: 80px;
    height: 80px;
  }
</style>
