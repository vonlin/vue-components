/**
 * Created by Administrator on 2017/5/8.
 */
import Vue from 'vue'

Vue.directive('datescroll',{
  bind: function(el,binding,vonde){
    //定位当前日期
    el.style.transform = "translateY("+parseInt(el.dataset.scrolltop) + "px)";
    setMaskVal(el.dataset.scrolltop);
    let startX,startY,endX,endY = 0,moveDisY=0,touchendY=0,isFirstTouch=true,
      //最大滚动高度
      maxScrollH;

    var v,//速度
      lastY,//上次位置
      nowY,//停止滚动的位置
      stopMove,//是否停止滚动
      startTime;//记录开始触摸时间

    var currel = null,
        currel1 =null,
        currel2 =null,
        currel3 =null,
        currel4 =null,
        currel5 =null,
        currel6 =null;

    function setMaskVal(disY){
      var tempELs = el.childNodes;
      for(let childNode of tempELs){
        childNode.className="dt-cell-row";
      }
      var selectNum = Math.round((84 - disY) / 28);
        if(tempELs[selectNum]) tempELs[selectNum].className += " curr-select";
        if(tempELs[selectNum-1]) tempELs[selectNum-1].className += " curr-select-round-1";
        if(tempELs[selectNum-2]) tempELs[selectNum-2].className += " curr-select-round-2";
        if(tempELs[selectNum-3]) tempELs[selectNum-3].className += " curr-select-round-3";
        if(tempELs[selectNum-4]) tempELs[selectNum-4].className += " curr-select-round-4";
        if(tempELs[selectNum-5]) tempELs[selectNum-5].className += " curr-select-round-5";


        if(tempELs[selectNum+1]) tempELs[selectNum+1].className += " curr-select-round-1";
        if(tempELs[selectNum+2]) tempELs[selectNum+2].className += " curr-select-round-2";
        if(tempELs[selectNum+3]) tempELs[selectNum+3].className += " curr-select-round-3";
        if(tempELs[selectNum+4]) tempELs[selectNum+4].className += " curr-select-round-4";
        if(tempELs[selectNum+5]) tempELs[selectNum+5].className += " curr-select-round-5";

    }

    el.addEventListener("touchstart",function(e){
      e.cancelBubble = true;
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;

      startTime = Date.now();
      lastY = startY;

      currel = document.getElementById("curr-select"),
        currel1 = document.getElementById("curr-select-round-1"),
        currel2 = document.getElementById("curr-select-round-2"),
        currel3 = document.getElementById("curr-select-round-3"),
        currel4 = document.getElementById("curr-select-round-4"),
        currel5 = document.getElementById("curr-select-round-5"),
        currel6 = document.getElementById("curr-select-round-6");
    },{passive:false});

    el.addEventListener("touchmove",function(e){
      e.cancelBubble = true;
      endX = e.changedTouches[0].pageX;
      endY = e.changedTouches[0].pageY;
      if(isFirstTouch){
        //定位当前日期
        moveDisY = endY - startY + touchendY +parseInt(el.dataset.scrolltop) ;
      }else{
        moveDisY = endY - startY + touchendY;
      }
      setMaskVal(moveDisY);
      el.style.transform = "translateY(" + moveDisY + "px)";
    },{passive:false});

    el.addEventListener("touchend",function(e){
      e.cancelBubble = true;
      isFirstTouch = false;
      //记录松开时的滚动位置
      //如果小于一栏的高度，则偏移为0
      if(moveDisY <28 && moveDisY > 0) moveDisY = 0;
      touchendY = moveDisY || 0;
      maxScrollH = (el.childNodes.length - 4) * 28

      function setTransY(){
        el.style.transform = "translateY("+touchendY+"px)";
        setMaskVal(touchendY);
        binding.value.call(null,{
          el: el,
          moveDisY: touchendY
        });
      }

      if(touchendY > 3* 28){
        //拖动到最上面那条数据 不能再拖动
        touchendY= 84;
        setTransY();
      }else if(touchendY < -maxScrollH){
        //拖动到最下面那条数据 不能再拖动
        touchendY= -maxScrollH;
        setTransY();
      }else {
        //缓动效果
        el.style.transform = "translateY(" + moveDisY + "px)";

        var endTime = Date.now();
        nowY = e.changedTouches[0].pageY;
        v = (nowY - lastY) / (endTime - startTime);
        (function(v, startTime, contentY) {
          var dir = v > 0 ? -1 : 1; //加速度方向
          var deceleration = dir*0.0006;
          var duration = v / deceleration; // 速度消减至0所需时间
          var dist = v * duration / 2; //最终移动多少
          function inertiaMove() {
            if(stopMove) return;
            var nowTime = Date.now();
            var t = nowTime-startTime;
            var nowV = v + t*deceleration;

            var moveY = (v + nowV)/2 * t;
            var tempY = contentY + moveY;
            touchendY = tempY;
            if(touchendY > 3* 28){
              //拖动到最上面那条数据 不能再拖动
              touchendY= 84;
              setTransY();
              return;
            }else if(touchendY < -maxScrollH){
              //拖动到最下面那条数据 不能再拖动
              touchendY= -maxScrollH;
              setTransY();
              return;
            }
            // 速度方向变化表示速度达到0了
            if(dir*nowV > 0) {
              tempY = tempY - Math.round(tempY%28);
              touchendY = tempY;
              setTransY();
              return;
            }
            el.style.transform = "translateY(" + tempY + "px";
            setMaskVal(tempY);
            requestAnimationFrame(inertiaMove);
          }
          inertiaMove();
        })(v, endTime, moveDisY);
      }

    },{passive:false});
  }
});
