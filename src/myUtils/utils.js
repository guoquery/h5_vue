// 时间转换
api.secondChange = function (time, format) {
    let date = new Date(time)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (!format || format.indexOf('-') !== -1) {
      var nowDate = year + "-" + month + "-" + day;
    } else if (format.indexOf(':') !== -1) {
      var nowDate = year + ":" + month + ":" + day;
    }
    return nowDate
  }
  // 时间计算换算
  api.secondComputed = function (msd) {
    var time = parseFloat(msd) / 1000
    if (time !== null && time !== '') {
      time = (parseInt(time / 3600.0) < 10 ? ('0' + parseInt(time / 3600.0)) : parseInt(time / 3600.0)) + ':' + (parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60) < 10 ? ('0' + parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60)) : parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60)) + ':' + (parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) < 10 ? '0' + parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) : parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60))
    }
    return time
  }