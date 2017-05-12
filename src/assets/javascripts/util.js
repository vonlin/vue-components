/**
 * Created by Administrator on 2017/5/8.
 */
var $Util = {};

const MONTHDATAS = (() => {
    let returns = [];
    for (let i = 1; i <= 12; i++) {
      returns.push(i < 10 ? "0" + i : i);
    }
    return returns;
  })(),
  DAYDATAS = (() => {
    let returns = [];
    for (let i = 1; i <= 31; i++) {
      returns.push(i < 10 ? "0" + i : i);
    }
    return returns;
  })(),
  HOURSDATAS = (() => {
    let returns = [];
    for (let i = 0; i <= 23; i++) {
      returns.push(i < 10 ? "0" + i : i);
    }
    return returns;
  })(),
  MINUTESDATAS = (() => {
    let returns = [];
    for (let i = 0; i <= 59; i++) {
      returns.push(i < 10 ? "0" + i : i);
    }
    return returns;
  })(),
  SECONDSDATAS = MINUTESDATAS;

const formatAddZero = function(val){
  return val < 10 ? "0" +val : val;
}

const datetimegenerater = () => {
  let datetimer = new Date();

  return {
    currYear: datetimer.getFullYear(),
    currMonth: formatAddZero(datetimer.getMonth() + 1),
    currDay: formatAddZero(datetimer.getDate()),
    currHours: formatAddZero(datetimer.getHours()),
    currMinutes: formatAddZero(datetimer.getMinutes()),
    currSeconds: formatAddZero(datetimer.getSeconds())
  }
};

$Util.generateYears = () => {
  let yearDatas = [];
  let currYear = datetimegenerater().currYear;
  let currYear2 = datetimegenerater().currYear;
  while (currYear) {
    yearDatas.push(currYear);
    currYear--;
    if (currYear <= currYear2 - 150) {
      currYear = currYear2 + 1;
      yearDatas.reverse()
      break;
    }
  }
  while (currYear) {
    yearDatas.push(currYear);
    currYear++;
    if (currYear >= currYear2 + 150) {
      break;
    }
  }
  return {
    datas: yearDatas,
    curr: currYear2
  };
};

$Util.generateMonths = {
  datas: MONTHDATAS,
  curr: datetimegenerater().currMonth
};

$Util.generateDays = {
  datas: DAYDATAS,
  oddDatas:["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30,31],
  evenDatas:["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,30],
  datas2days29:["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,29],
  datas2days28:["01", "02", "03", "04", "05", "06", "07", "08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  curr: datetimegenerater().currDay
};

$Util.generateHours = {
  datas: HOURSDATAS,
  curr: datetimegenerater().currHours
};

$Util.generateMinutes = {
  datas: MINUTESDATAS,
  curr: datetimegenerater().currMinutes
};

$Util.generateSeconds = {
  datas: SECONDSDATAS,
  curr: datetimegenerater().currSeconds
};

export default $Util
