/* 
* @Author: Marte
* @Date:   2020-10-14 17:05:58
* @Last Modified by:   Marte
* @Last Modified time: 2020-10-14 17:56:11
*/

//时间补零
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

//时间日期格式化
function formatTime(timestamp, type) {
  const date = new Date(timestamp * 1000)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')
  if(type>6){
    return `${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}`
  }else if(type > 5){
    return `${formatNumber(hour)}` //xx时
  }else if(type > 4){
    return `${month}月${day}日${formatNumber(hour)}时` // x月x日xx时
  }else if (type > 3) {
    return `${formatNumber(hour)}:${formatNumber(minute)}`
  } else if (type > 2) {
    return `${month}月${day}日 ${formatNumber(hour)}:${formatNumber(minute)}` // x月x日 xx时xx分
  } else if (type > 1) {
    return `${month}月${day}日`
  } else if (type) {
    return `${year}年${month}月${day}日`
  }
  return `${t1} ${t2}`
}

//补零操作
function addZero(i){
  return i < 10 ? "0" + i: i + "";
}

// 倒计时
function countDown(time){
  var nowtime = new Date();
  console.log('nowtime',nowtime.getTime())

  var endtime = new Date(time);//"2019/03/16,17:57:00"
  var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
  console.log('lefttime',lefttime)
  if(lefttime <= 0){
    return '活动已结束'
  }
  var d = parseInt(lefttime / (24*60*60))
  var h = parseInt(lefttime / (60 * 60) % 24);
  var m = parseInt(lefttime / 60 % 60);
  var s = parseInt(lefttime % 60);
  d = addZero(d);
  h = addZero(h);
  m = addZero(m);
  s = addZero(s);
  return  `${d}天 ${h} 时 ${m} 分 ${s} 秒`;
}