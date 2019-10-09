export default class {
  constructor() {}
  money = val => {
    val = Number(val);
    return !isNaN(val) ? val.toFixed(2) : '0.00';
  };
  earnings = val => {
    val = Number(val);
    return !isNaN(val) ? (val.toFixed(2) > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)) : '0.00';
  };
  chngPct = (val, rate = 1) => {
    val = Number(val);
    if (!isNaN(val)) {
      if (val > 0) {
        return `+${(val * rate).toFixed(2)}%`;
      } else {
        return `${(val * rate).toFixed(2)}%`;
      }
    } else {
      return '--';
    }
  };
  formatVolume = val => {
    val = Number(val);
    if (Object.prototype.toString.call(val) === '[object Number]') {
      if (val >= 100000000 || val <= -10000000) {
        val = (val / 100000000).toFixed(8);
        val = val.substring(0, val.lastIndexOf('.') + 3) + '亿';
      } else if (val >= 10000 && val < 100000000) {
        val = (val / 10000).toFixed(5);
        val = val.substring(0, val.lastIndexOf('.') + 3) + '万';
      } else {
        val = val.toFixed(2);
      }
      return val;
    } else {
      return '--';
    }
  };
  timestamp = val => {
    var date = new Date(val); // 获取一个时间对象
    date.getFullYear(); // 获取完整的年份(4位,1970)
    // var mon = String(date.getMonth()).length === 1 ? '0' + date.getMonth() : date.getMonth() // 获取月份(0-11,0代表1月,用的时候记得加上1)
    // var day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate() // 获取日(1-31)
    var hour = String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours(); // 获取小时数(0-23)
    var min = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟数(0-59)
    var second =
      String(date.getSeconds()).length === 1 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒数(0-59)

    return hour + ':' + min + ':' + second;
  };
  formatDate = (date, format) => {
    date = new Date(date);
    var paddNum = function(num) {
      num += '';
      return num.replace(/^(\d)$/, '0$1');
    };
    // 指定格式字符
    var cfg = {
      yyyy: date.getFullYear(), // 年 : 4位
      yy: date
        .getFullYear()
        .toString()
        .substring(2), // 年 : 2位
      M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
      MM: paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
      d: date.getDate(), // 日 : 如果1位的时候不补0
      dd: paddNum(date.getDate()), // 日 : 如果1位的时候补0
      h: date.getHours(), // 时
      hh: paddNum(date.getHours()), // 时:如果1位的时候补0
      m: date.getMinutes(), // 分
      mm: paddNum(date.getMinutes()), // 分:如果1位的时候补0
      s: date.getSeconds(), // 秒
      ss: paddNum(date.getSeconds()), // 秒
    };
    format || (format = 'yyyy-MM-dd');
    return format.replace(/([a-z])(\1)*/gi, function(m) {
      return cfg[m];
    });
  };
  dayTime = val => {
    typeof val === 'string' && (val = parseInt(val));
    var date = new Date(val); // 获取一个时间对象
    var year = date.getFullYear(); // 获取完整的年份(4位,1970)
    var mon =
      String(date.getMonth()).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
    var day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate(); // 获取日(1-31)
    var hour = String(date.getHours()).length === 1 ? '0' + date.getHours() : date.getHours(); // 获取小时数(0-23)
    var min = String(date.getMinutes()).length === 1 ? '0' + date.getMinutes() : date.getMinutes(); // 获取分钟数(0-59)
    var second =
      String(date.getSeconds()).length === 1 ? '0' + date.getSeconds() : date.getSeconds(); // 获取秒数(0-59)

    return year + '.' + mon + '.' + day + ' ' + hour + ':' + min + ':' + second;
  };
  week = val => {
    val = val.replace(/-/g, '/');
    // 定义一个日期对象;
    var dateTime = new Date(val);
    // 获得系统年份;
    var year = dateTime.getFullYear();
    // 获得系统月份;
    var month = dateTime.getMonth() + 1;
    // 获得系统当月分天数;
    var day = dateTime.getDate();
    // 获得系统小时;
    var hours = dateTime.getHours();
    // 获得系统分钟;
    var minutes = dateTime.getMinutes();
    // 获得系统秒数;
    var second = dateTime.getSeconds();
    // 获得系统星期几;
    var dayCycle = dateTime.getDay();
    // 使用数组更改日期样式;
    var dayCycleArray = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 0; i < 7; i++) {
      if (dayCycle === i) {
        // 将dayCycleArray的数赋值到系统星期几里面中去;
        dayCycle = dayCycleArray[i];
      }
    }
    month = month < 10 ? '0' + month : month;
    // hours = hours < 10 ? '0' + hours : hours
    // minutes = minutes < 10 ? '0' + minutes : minutes
    // second = second < 10 ? '0' + second : second
    // 打印完整的系统日期;
    let dateStr =
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      '星期' +
      dayCycle +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      second;
    dateStr = month + '月' + day + '日' + '  ' + '星期' + dayCycle;
    console.log('dateStr: ');
    console.log(dateStr);

    return dateStr;
  };
  timeDesc = (val, type = 1) => {
    var dateTimeStamp = val; // 传入时间戳
    var dateType = parseInt(type);
    if (dateTimeStamp.indexOf('-') === -1) {
      dateTimeStamp = parseInt(val);
    } else {
      dateTimeStamp = dateTimeStamp.replace(/-/g, '/');
    }

    if (dateTimeStamp !== undefined && dateTimeStamp != null && dateTimeStamp !== '') {
      if (dateTimeStamp.length === 13) {
        dateTimeStamp = parseInt(dateTimeStamp);
      } else {
        var timestamp = Date.parse(new Date(dateTimeStamp));
        dateTimeStamp = timestamp;
      }
      var now = new Date().getTime();
      var dayConver = 1000 * 60 * 60 * 24;
      var hourConver = 1000 * 60 * 60;
      var minConver = 1000 * 60;
      var timeConver = now - dateTimeStamp;
      var tempConver;
      var date = new Date(dateTimeStamp);
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      if (timeConver / dayConver < 1) {
        if (dateType === 1) {
          tempConver = timeConver / hourConver;
          if (tempConver >= 1) {
            return parseInt(tempConver) + '小时前';
          } else {
            tempConver = timeConver / minConver;
            if (tempConver >= 1) {
              return parseInt(tempConver) + '分钟前';
            } else {
              return '刚刚';
            }
          }
        } else {
          return h + m;
        }
      } else {
        var curTimeMillis = new Date().getTime(); // 系统当前时间戳
        var curDate = new Date(curTimeMillis);
        var todayHoursSeconds = curDate.getHours() * 60 * 60;
        var todayMinutesSeconds = curDate.getMinutes() * 60;
        var todaySeconds = curDate.getSeconds();
        var todayMillis = (todayHoursSeconds + todayMinutesSeconds + todaySeconds) * 1000;
        var todayStartMillis = curTimeMillis - todayMillis;
        var oneDayMillis = 24 * 60 * 60 * 1000;
        var yesterdayStartMilis = todayStartMillis - oneDayMillis;
        if (dateTimeStamp >= yesterdayStartMilis) {
          return '昨天 ' + h + m;
        } else {
          return M + D + h + m;
        }
      }
    } else {
      return '--';
    }
  };
  mul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {}
    try {
      m += s2.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
  }
}
