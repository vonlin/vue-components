<template>
  <transition name="pop" enter-active-class="fadeIn" leave-active-class="fadeOut" v-on:after-leave="afterLeave">
    <div v-show="show">
      <div class="dt-opt">
        <span class="fl" v-on:click="toYMD" v-show="!currType">&lt;年日月</span>
        <span class="dt-confirm" v-on:click="confirm">完成</span>
        <span class="fr" v-on:click="toHSM" v-show="currType">时分秒&gt;</span>
      </div>
      <div class="mask"></div>
      <div class="selectRect"></div>
      <div class="dt-container-wrap">
        <div class="dt-container" v-bind:class="swipeClass">
          <div class="dt-cell-col" v-for="col in coltypes">
            <ul v-bind:coltype="col" v-datescroll="scrollEnd" v-bind:data-scrolltop="scrolltopvalue(col)">
              <li class="dt-cell-row" v-for="data in getCols(col)">{{data}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import $Util from '../../../assets/javascripts/util'
  import '../../../directives/datescroll'
  import { bus } from '../../../bus.js'
  export default {
    name: 'DateTime',
    methods: {
      afterLeave (el) {
        this.confirmCallback(this.value);
      },
      getCols (coltype) {
        return this.coldatas[coltype].datas;
      },
      setDays (selected, coltype) {
        let _tempDays = $Util.generateDays;
        selected = Math.round(selected)
        if (coltype == 'M') {
          //根据月份初始化天数
          if ([4, 6, 9, 11].indexOf(selected + 1) != -1) {
            this.coldatas.D.datas = _tempDays.evenDatas;
          } else if ([1, 3, 5, 7, 8, 10, 12].indexOf(selected + 1) != -1) {
            this.coldatas.D.datas = _tempDays.oddDatas;
          } else if ((selected + 1) == 2) {
            //2月份
            if ((!this.selectYear % 4 && this.selectYear % 100 != 0) || !this.selectYear % 400) {
              //闰年
              this.coldatas.D.datas = _tempDays.datas2days29;
            } else {
              //平年
              this.coldatas.D.datas = _tempDays.datas2days28;
            }
          }
        } else if (coltype == 'Y' && this.selectMonth == '02') {
          //2月份
          if ((!this.selectYear % 4 && this.selectYear % 100 != 0) || !this.selectYear % 400) {
            //闰年
            this.coldatas.D.datas = _tempDays.datas2days29;
          } else {
            //平年
            this.coldatas.D.datas = _tempDays.datas2days28;
          }
        }

      },
      toHSM () {
        this.swipeClass = "swipeLeft";
        this.currType = !this.currType;
      },
      toYMD () {
        this.swipeClass = "swipeRight";
        this.currType = !this.currType;
      },
      confirm (e) {
        var msg =  this.selectYear + "年" + this.selectMonth + "月" + this.selectDay + "日" + this.selectHour + "时" + this.selectMinute + "分" + this.selectSecond + "秒";
        this.value = msg;
        this.show = false;
        this.bindEl.innerText = msg;
      },
      scrolltopvalue (coltype) {
        let _index = this.coldatas[coltype].datas.indexOf(this.coldatas[coltype].curr) - 3;
        return (_index >= 0 ? -_index : _index) * 28;
      },
      scrollEnd (e) {
        let coltype = e.el.getAttribute("coltype");
        let selected = Math.round((84 - e.moveDisY) / 28);
        //获取年，月，日
        if (coltype == "Y") {
          this.selectYear = this.coldatas.Y.datas[selected];
        } else if (coltype == "M") {
          this.selectMonth = this.coldatas.M.datas[selected];
        } else if (coltype == "D") {
          this.selectDay = this.coldatas.D.datas[selected];
        } else if (coltype == "H") {
          this.selectHour = this.coldatas.H.datas[selected];
        } else if (coltype == "MI") {
          this.selectMinute = this.coldatas.MI.datas[selected];
        } else if (coltype == "S") {
          this.selectSecond = this.coldatas.S.datas[selected];
        }
        this.setDays(selected, coltype);
      }
    },
    data () {
      return {
        coltypes: ["Y", "M", "D", "H", "MI", "S"],
        coldatas: {
          Y: $Util.generateYears(),
          M: $Util.generateMonths,
          D: $Util.generateDays,
          H: $Util.generateHours,
          MI: $Util.generateMinutes,
          S: $Util.generateSeconds
        },
        selectYear: $Util.generateYears().curr,
        selectMonth: $Util.generateMonths.curr,
        selectDay: $Util.generateDays.curr,
        selectHour: $Util.generateHours.curr,
        selectMinute: $Util.generateMinutes.curr,
        selectSecond: $Util.generateSeconds.curr,

        swipeClass: "",
        currType: true,
        show: false,
        bindEl: null,
        value:''
      };
    },
    computed: {
      maskTypes () {
        var maskTypes = [];
        var _datas = this.coldatas.Y.datas;
        if (this.currType) {
          //年月日
          maskTypes = ["Y", "M", "D"];

          var yIndex = this.coldatas.Y.datas.indexOf(this.selectYear);
          var mIndex = this.coldatas.M.datas.indexOf(this.selectMonth);
          var dIndex = this.coldatas.D.datas.indexOf(this.selectDay);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex - 3]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex - 2]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex - 1]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex + 1]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex + 2]);
          this.maskYColTypes.push(this.coldatas.Y.datas[yIndex + 3]);
        } else {
          //时分秒
          maskTypes = ["H", "MI", "S"];
        }
        return maskTypes;
      }
    }
  }
</script>

<style scoped="scoped">
  .fadeIn {
    animation: fadeIn .3s ease-out;
    width: 100%;
    height: 240px;
    position: fixed;
    /*bottom: 0;*/
  }

  .fadeOut {
    animation: fadeOut .3s ease-out;
    width: 100%;
    height: 240px;
    position: fixed;
    /*bottom: -240px;*/
  }

  @-webkit-keyframes fadeIn {
    from {
      bottom: -240px;
    }
    to {
      bottom: 0;
    }
  }

  @-webkit-keyframes fadeOut {
    from {
      bottom: 0;
    }
    to {
      bottom: -240px;
    }
  }

  .dt-container {
    width: 200%;
    height: 200px;
    z-index: 1;
    position: relative;
    bottom: 0;
    display: -webkit-box;
    overflow: hidden;
  }

  .dt-container-wrap {
    width: 100%;
    position: absolute;
    bottom: 0;
    overflow: hidden;
  }

  .mask {
    width: 100%;
    height: 200px;
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    overflow: hidden;
    pointer-events: none;
    background: -webkit-linear-gradient(top, rgb(255, 255, 255) 0, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0) 41%, rgba(255, 255, 255, 0) 54%, rgba(255, 255, 255, 0.5) 55%, rgb(255, 255, 255) 100%);
  }

  .selectRect {
    width: 100%;
    height: 34px;
    border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    position: absolute;
    bottom: 83px;
    z-index: 11;
    font-size: 24px;
    pointer-events: none;
  }

  .dt-confirm {
    position: absolute;
    left: 45%;
  }

  .dt-opt {
    width: 100%;
    border-top: 1px solid #bbb;
    position: absolute;
    height: 40px;
    text-align: center;
    line-height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    background: #3bb593;
    bottom: 200px;
    font-size: 14px;
    color: #fff;
  }

  .dt-cell-col {
    display: block;
    -webkit-box-flex: 1;
    box-flex: 1;
    text-align: center;
    height: 200px;
    overflow: hidden;
    width: 0.16666666666666666%;
    font-size: 20px;
  }

  .dt-cell-row {
    padding: 5px 10px 5px;
    height: 28px;
  }

  .swipeLeft {
    -webkit-transition: transform .6s;
    transition: transform .6s;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }

  .swipeRight {
    -webkit-transition: transform .6s;
    transition: transform .6s;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  .mask ul li:nth-child(4), .curr-select {
    font-size: 21px;
  }

  .curr-select-prev-5 {
    /*font-size:12px;*/
    /*color:rgb(244,244,244);*/
    /*height:auto;*/
  }

  .curr-select-prev-4 {
    /*font-size:16px;*/
    /*color:rgb(234,234,234);*/
    /*height:auto;*/
  }

  .curr-select-prev-3, .curr-select-prev-2, .curr-select-prev-1 ,.curr-select-after-3,.curr-select-after-2,.curr-select-after-1{
    -webkit-transition: opacity 1s, transform;
  }

  .curr-select-prev-3 {
    /*font-size:18px;*/
    /*color:rgb(224,224,224);*/
    /*transform: scaleY(0.4);*/
    /*height:20px;*/
    -webkit-transform: rotateX(63deg) translateZ(-6px);
  }

  .curr-select-prev-2 {
    /*font-size:20px;*/
    /*color:rgb(214,214,214);*/
    /*transform: scaleY(0.6);*/
    /*height:auto;*/
    -webkit-transform: rotateX(37deg) translateZ(0px);
  }

  .curr-select-prev-1 {
    /*font-size:22px;*/
    /*color:rgb(204,204,204);*/
    /*transform: scaleY(0.9);*/
    /*height:auto;*/
    -webkit-transform: rotateX(2deg) translateZ(1px);
  }

  .curr-select-after-5 {
    /*font-size:12px;*/
    /*color:rgb(244,244,244);*/
    /*height:auto;*/
  }

  .curr-select-after-4 {
    /*font-size:16px;*/
    /*color:rgb(234,234,234);*/
    /*height:auto;*/
  }

  .curr-select-after-3 {
    /*font-size:18px;*/
    /*color:rgb(224,224,224);*/
    /*transform: scaleY(0.4);*/
    -webkit-transform: rotateX(-63deg) translateZ(-6px);
  }

  .curr-select-after-2 {
    /*font-size:20px;*/
    /*color:rgb(214,214,214);*/
    /*transform: scaleY(0.6);*/
    /*height:auto;*/
    -webkit-transform: rotateX(-37deg) translateZ(0px);
  }

  .curr-select-after-1 {
    /*font-size:22px;*/
    /*color:rgb(204,204,204);*/
    /*transform: scaleY(0.9);*/
    /*height:auto;*/
    -webkit-transform: rotateX(-2deg) translateZ(-1px);
  }

</style>
