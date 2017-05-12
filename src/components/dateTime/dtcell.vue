<template>
    <div class="dt-cell-col">
      <ul v-bind:coltype="coltype" v-datescroll="scrollEnd" v-bind:data-scrolltop="scrolltopvalue">
        <li class="dt-cell-row" v-for="data in cols">{{data}}</li>
      </ul>
    </div>
</template>

<script>
  import $Util from '../../assets/javascripts/util'
  import '../../directives/datescroll'

  export default {
    name: 'dtcell',
    props: {
      coltype: "",
      pos: 1
    },
    methods: {
      scrollEnd (e) {
          let coltype = e.el.getAttribute("coltype");
          let selected = (84 - e.moveDisY)/28;
        //获取年，月，日
        if(coltype == "Y"){
          this.selectYear =  this.coldatas.Y.datas[selected];
        }else if(coltype == "M"){
          this.selectMonth =  this.coldatas.M.datas[selected+1];
        }else if(coltype == "D"){
          this.selectDay =  this.coldatas.D.datas[selected];
        }

        let _tempDays = $Util.generateDays;
        console.log(this.selectYear)
        if(coltype == 'M'){
          //根据月份初始化天数
//          console.log($Util.generateDays.datas)
              if([4,6,9,11].indexOf(selected + 1) != -1){
                this.coldatas.D.datas = _tempDays.evenDatas;
              }else if([1,3,5,7,8,10,12].indexOf(selected + 1) != -1){
                  console.log(_tempDays)
                this.coldatas.D.datas = _tempDays.oddDatas;
              }else if((selected + 1) == 2){
                //2月份
                if((!this.selectYear % 4 && this.selectYear % 100 != 0) || !this.selectYear % 400){
                    //闰年
                  this.coldatas.D.datas = _tempDays.datas2days29;
                }else{
                    //平年
                  this.coldatas.D.datas = _tempDays.datas2days28;
                }
              }
          }
      }
    },
    data () {
      return {
          coldatas:
            {Y : $Util.generateYears(),
            M : $Util.generateMonths,
            D : $Util.generateDays},
//            {H : $Util.generateHours},
//            {M : $Util.generateMinutes},
//            {S : $Util.generateSeconds},
          selectYear: $Util.generateYears().curr,
          selectMonth: $Util.generateMonths.curr,
          selectDay: $Util.generateDays.curr
      };
    },
    computed: {
      cols () {
        return this.coldatas[this.coltype].datas;
      },
      scrolltopvalue () {
          return this.dataIndex*28
      },
      dataIndex () {
          let _index = this.cols.indexOf(this.coldatas[this.coltype].curr) - 3;
          return _index >=0 ? -_index : _index;
      }
    }
  }
</script>

<style scoped="scoped">
  .dt-cell-col{
    display:block;
    -webkit-box-flex: 1;
    box-flex: 1;
    text-align:center;
    margin-top:40px;
    height:200px;
    overflow:hidden;
    background:-webkit-linear-gradient(top,rgba(77, 77, 77, 1), white 88px ,white 110px ,rgba(77, 77, 77, 1));
  }
  .dt-cell-row{
    padding:5px 10px 5px;
  }
</style>
