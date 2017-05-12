<template>
  <div>
    <!--<div class="dt-container-mask">-->
      <!--<div class="mask dt-cell-col" v-for="col in maskTypes">-->
        <!--<ul v-bind:coltype="col">-->
          <!--<li class="dt-cell-row" id="curr-select-round-1">{{selectYear-3}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select-round-2">{{selectYear-2}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select-round-3">{{selectYear-1}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select">{{selectYear}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select-round-4">{{selectYear+1}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select-round-5">{{selectYear+2}}</li>-->
          <!--<li class="dt-cell-row"  id="curr-select-round-6">{{selectYear+3}}</li>-->

        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <div class="dt-opt">
      <span class="fl" v-on:touchstart="toYMD" v-show="!currType">&lt;年日月</span>
      <span class="dt-confirm" v-on:touchstart="confirm">完成</span>
      <span class="fr" v-on:touchstart="toHSM" v-show="currType">时分秒&gt;</span>
    </div>
    <div class="dt-container" v-bind:class="swipeClass">
      <!--<dtcell v-for="col in cols" v-bind:coltype="col"></dtcell>-->
      <div class="dt-cell-col" v-for="col in coltypes">
        <ul v-bind:coltype="col" v-datescroll="scrollEnd" v-bind:data-scrolltop="scrolltopvalue(col)">
          <li class="dt-cell-row" v-for="data in getCols(col)">{{data}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import $Util from '../../assets/javascripts/util'
  import '../../directives/datescroll'

  export default {
    name: 'DateTime',
    methods: {
      getCols (coltype) {
        return this.coldatas[coltype].datas;
      },
      setDays (selected,coltype) {
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
        }else if(coltype == 'Y' && this.selectMonth == '02'){
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
      confirm () {
          console.log(this.selectYear + " "+  this.selectMonth +" " +this.selectDay + " " +this.selectHour + "时" +this.selectMinute +"分" +this.selectSecond+"秒")
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
        }else if (coltype == "H") {
          this.selectHour = this.coldatas.H.datas[selected];
        } else if (coltype == "MI") {
          this.selectMinute = this.coldatas.MI.datas[selected];
        } else if (coltype == "S") {
          this.selectSecond = this.coldatas.S.datas[selected];
        }
        this.setDays(selected,coltype);
      }
    },
    data () {
      return {
        coltypes: ["Y", "M", "D","H","MI","S"],
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

        maskYColTypes: [2017,2017,2017,2017,2017,2017],

        swipeClass: "",
        currType: true
      };
    },
    computed: {
        maskTypes () {
            var maskTypes=[];
            var _datas= this.coldatas.Y.datas;
          if(this.currType){
              //年月日
            maskTypes = ["Y", "M", "D"];

            var yIndex = this.coldatas.Y.datas.indexOf(this.selectYear);
            var mIndex = this.coldatas.M.datas.indexOf(this.selectMonth);
            var dIndex = this.coldatas.D.datas.indexOf(this.selectDay);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex-3]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex-2]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex-1]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex+1]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex+2]);
            this.maskYColTypes.push(this.coldatas.Y.datas[yIndex+3]);
          }else {
              //时分秒
            maskTypes = ["H","MI","S"];
          }
          return maskTypes;
        },
        maskColTypes () {
            var maskColTypes;

        }
    }
  }
</script>

<style scoped="scoped">
  .dt-container,.dt-container-mask{
    width: 200%;
    height: 200px;
    position: absolute;
    z-index: 11;
    bottom: 0;
    display: -webkit-box;
    overflow: hidden;
    /*background: -webkit-linear-gradient(top, rgb(247, 247, 247), #f1f1f1 88px, rgb(247, 247, 247),rgb(247, 247, 247),#f1f1f1 110px, rgb(247, 247, 247));*/
  }
  .dt-container{
    /*opacity:0;*/
  }
  .dt-container-mask{
    width:100%;
    z-index: -2;
  }

  .mask{
    width: 100%;
    height: 200px;
    /*position: absolute;*/
    z-index: 10;
    bottom: 0;
    left:0;
    overflow: hidden;
    background: -webkit-linear-gradient(top, rgba(77, 77, 77, 1), white 88px, white 110px, rgba(77, 77, 77, 1));
  }
  .selectRect{
    width: 100%;
    height: 34px;
    border-top:1px solid #e9e9e9;
    border-bottom:1px solid #e9e9e9;
    position: absolute;
    bottom:82px;
    z-index: 11;
    font-size:24px;
    background: green;
  }
  .dt-confirm{
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
    bottom:200px;
    font-size:14px;
    color:#fff;
  }

  .dt-cell-col {
    display: block;
    -webkit-box-flex: 1;
    box-flex: 1;
    text-align: center;
    height: 200px;
    overflow: hidden;
    width:0.16666666666666666%;
    font-size:20px;
  }

  .dt-cell-row {
    padding: 5px 10px 5px;
    height:28px;
  }
  .swipeLeft{
    -webkit-transition: transform .6s;
    transition: transform .6s;
    -webkit-transform: translateX(-50%);
    transform: translateX(-320px);
  }
  .swipeRight{
    -webkit-transition: transform .6s;
    transition: transform .6s;
    -webkit-transform: translateX(-50%);
    transform: translateX(0);
  }

  .mask ul li:nth-child(4),.curr-select{
    font-size:24px;
    height:30px;
    height:auto;
  }
  .curr-select-round-5{
    font-size:12px;
    color:rgb(244,244,244);
    height:auto;
  }

  .curr-select-round-4{
    font-size:16px;
    color:rgb(234,234,234);
    height:auto;
  }
  .mask ul li:nth-child(1),.mask ul li:nth-child(7),.curr-select-round-3{
    font-size:18px;
    color:rgb(224,224,224);
    transform: scaleY(0.4);
    height:20px;
  }
  .mask ul li:nth-child(2),.mask ul li:nth-child(6),.curr-select-round-2{
    font-size:20px;
    color:rgb(214,214,214);
    transform: scaleY(0.6);
    height:auto;
  }
  .mask ul li:nth-child(3),.mask ul li:nth-child(5),.curr-select-round-1{
    font-size:22px;
    color:rgb(204,204,204);
    transform: scaleY(0.9);
    height:auto;
  }

</style>
