<template>
  <div>
    <div id="container">
      <img v-for="(img,index) in imgs" :datasrc="img.src" alt="">
    </div>
  </div>
</template>

<script>
  export default {
      name: 'lazyLoad',
      data () {
          return {
              imgs: [
                {src: 'http://img1.imgtn.bdimg.com/it/u=2714604270,985293181&fm=200&gp=0.jpg'},
                {src: 'http://img1.imgtn.bdimg.com/it/u=1884738033,3459235394&fm=26&gp=0.jpg'},
                {src: 'http://img5.imgtn.bdimg.com/it/u=1607585216,3171392275&fm=26&gp=0.jpg'},
                {src: 'http://wx1.sinaimg.cn/mw690/005IY5IEgy1fgpkq5fxg6j30j60qjwm8.jpg'},
                {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502445297&di=5034f770a8e44263b82df18eee57aedf&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F09%2F64%2F39i58PICmgE.jpg'},
                {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501850584574&di=a26e1852baec556218036378426eca5a&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F024f78f0f736afc34a24c98eb119ebc4b7451234.jpg'},
                {src: 'http://wx1.sinaimg.cn/mw690/005IY5IEgy1fgpkq5fxg6j30j60qjwm8.jpg'},
                {src: 'http://img5.imgtn.bdimg.com/it/u=1607585216,3171392275&fm=26&gp=0.jpg'},
                {src: 'http://img1.imgtn.bdimg.com/it/u=2714604270,985293181&fm=200&gp=0.jpg'},
                {src: 'http://img1.imgtn.bdimg.com/it/u=1884738033,3459235394&fm=26&gp=0.jpg'},
                {src: 'http://img5.imgtn.bdimg.com/it/u=1607585216,3171392275&fm=26&gp=0.jpg'},
                {src: 'http://wx1.sinaimg.cn/mw690/005IY5IEgy1fgpkq5fxg6j30j60qjwm8.jpg'},
                {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502445297&di=5034f770a8e44263b82df18eee57aedf&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F11%2F09%2F64%2F39i58PICmgE.jpg'},
                {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1501850584574&di=a26e1852baec556218036378426eca5a&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F024f78f0f736afc34a24c98eb119ebc4b7451234.jpg'},
                {src: 'http://wx1.sinaimg.cn/mw690/005IY5IEgy1fgpkq5fxg6j30j60qjwm8.jpg'},
                {src: 'http://img5.imgtn.bdimg.com/it/u=1607585216,3171392275&fm=26&gp=0.jpg'},
              ]
          }
      },
      created: function(){
        this.$nextTick(function(){
          var count=0;
          var images = document.querySelector("#container").childNodes;
          function addHeight(num){
            if(num == 0 || num ==1){
              return 0
            }
            num -= 2;
            var initHeight =  +window.getComputedStyle(images[num],null).getPropertyValue("height").replace("px","")+10;
            return  initHeight+= addHeight(num);
          }

          function setSrc(i){
            images[i].setAttribute("src",images[i].getAttribute("datasrc"))
            images[i].onload = function(){
              if(i == images.length -1){
                document.querySelector("#container").style.height = parseFloat(addHeight(i)) + "px";
              }
              images[i].style.top = addHeight(i) + "px";
              count++;
              if(count<images.length){
                setSrc(count);
              }
            }
          }


          setSrc(count);

//          for(var i=0;i<images.length;i++){
//              var temp = images[i];
//            (function(i){
//              images[i].onload = function(){
//                if(i == images.length -1){
//                  document.querySelector("#container").style.height = parseFloat(addHeight(i)) + "px";
//                }
//                images[i].style.top = addHeight(i) + "px";
//              }
//            })(i);
//          }
        });
      },
      methods: {
      },
      computed: {
      }
  }
</script>

<style scoped>
  div#container{
    position:relative;
    /*padding-top:50px;*/
    /*height:1000px;*/
  }
  img{
    /*float:left;*/
    vertical-align: top;
    position:absolute;
    width:46%;
    heigth:auto;
    margin-bottom:10px;
    margin-left:8px;
  }
  img:nth-child(2n){
    left:50%;
  }
  img:nth-child(2n+1){
  }
</style>
