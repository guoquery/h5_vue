import axios from './axios/axiosConfig'

var API = {
  // HOST: 'http://api.youfubao.vip/',
  // HOST: 'http://live-api.youfubao.vip/',
  // HOST: 'http://192.168.1.212:8888/',
  // HOST: 'https://u.youfubao.vip/',
  // HOST: 'http://113.107.7.82:8985/',//tf
  // HOST: 'http://192.168.1.68:8888/',  // 佳鑫
  // HOST: 'http://192.168.1.233:8887/', // 佳鑫
  // HOST: 'http://192.168.0.107:8080/',
  // HOST: 'http://192.168.1.61:8888/', // 乔
  HOST: 'https://api.iscan.top/',
  // HOST: 'https://api-test.iscan.top/',
  KEY: ''
}
// 私有函数
var api = {}
// 签名算法
function signature(postData, _timestamp) {
  const apiKey = '69b01745bb926119db695e2fb6aff8ca'
  // 排序去空
  var strParams = ''
  // console.log('postData',postData);
  var newkey = Object.keys(postData).sort()
  newkey.forEach(function (item) {
    if (postData[item] && typeof postData[item] === 'object') {
      if (strParams) {
        strParams += ('&' + item + '=' + JSON.stringify(postData[item]))
      } else {
        strParams += (item + '=' + JSON.stringify(postData[item]))
      }
    } else if (postData[item]) {
      if (strParams) {
        strParams += ('&' + item + '=' + postData[item])
      } else {
        strParams += (item + '=' + postData[item])
      }
    }
  })
  // 生成字符串
  var stringSignTemp = strParams + '&key=' + apiKey + '&timestamp=' + _timestamp
  if (newkey.length === 0) stringSignTemp = 'key=' + apiKey + '&timestamp=' + _timestamp
  // console.log('signature',postData,stringSignTemp);
  var MD5 = function (string) {
    function RotateLeft(lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    function AddUnsigned(lX, lY) {
      var lX4, lY4, lX8, lY8, lResult
      lX8 = (lX & 0x80000000)
      lY8 = (lY & 0x80000000)
      lX4 = (lX & 0x40000000)
      lY4 = (lY & 0x40000000)
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
        }
      } else {
        return (lResult ^ lX8 ^ lY8)
      }
    }

    function F(x, y, z) {
      return (x & y) | ((~x) & z)
    }

    function G(x, y, z) {
      return (x & z) | (y & (~z))
    }

    function H(x, y, z) {
      return (x ^ y ^ z)
    }

    function I(x, y, z) {
      return (y ^ (x | (~z)))
    }

    function FF(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    };

    function GG(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    };

    function HH(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    };

    function II(a, b, c, d, x, s, ac) {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac))
      return AddUnsigned(RotateLeft(a, s), b)
    };

    function ConvertToWordArray(string) {
      var lWordCount
      var lMessageLength = string.length
      var lNumberOfWordsTemp1 = lMessageLength + 8
      var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
      var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
      var lWordArray = Array(lNumberOfWords - 1)
      var lBytePosition = 0
      var lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    function WordToHex(lValue) {
      var WordToHexValue = ''
      var WordToHexValueTemp = ''
      var lByte
      var lCount
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        WordToHexValueTemp = '0' + lByte.toString(16)
        WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
      }
      return WordToHexValue
    };

    function Utf8Encode(string) {
      string = string.replace(/\r\n/g, '\n')
      var utftext = ''
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n)
        if (c < 128) {
          utftext += String.fromCharCode(c)
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192)
          utftext += String.fromCharCode((c & 63) | 128)
        } else {
          utftext += String.fromCharCode((c >> 12) | 224)
          utftext += String.fromCharCode(((c >> 6) & 63) | 128)
          utftext += String.fromCharCode((c & 63) | 128)
        }
      }
      return utftext
    }
    var x = Array
    var k, AA, BB, CC, DD, a, b, c, d
    var S11 = 7
    var S12 = 12
    var S13 = 17
    var S14 = 22
    var S21 = 5
    var S22 = 9
    var S23 = 14
    var S24 = 20
    var S31 = 4
    var S32 = 11
    var S33 = 16
    var S34 = 23
    var S41 = 6
    var S42 = 10
    var S43 = 15
    var S44 = 21
    string = Utf8Encode(string)
    x = ConvertToWordArray(string)
    a = 0x67452301
    b = 0xEFCDAB89
    c = 0x98BADCFE
    d = 0x10325476
    for (k = 0; k < x.length; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
      d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
      c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
      b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
      a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
      d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
      c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
      b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
      a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
      d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
      c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
      b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
      a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
      d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
      c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
      b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
      a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
      d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
      c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
      b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
      a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
      d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
      b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
      a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
      d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
      c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
      b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
      a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
      d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
      c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
      b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
      a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
      d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
      c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
      b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
      a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
      d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
      c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
      b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
      a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
      d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
      c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
      b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
      a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
      d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
      c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
      b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
      a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
      d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
      c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
      b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
      a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
      d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
      c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
      b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
      a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
      d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
      c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
      b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
      a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
      d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
      c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
      b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
      a = AddUnsigned(a, AA)
      b = AddUnsigned(b, BB)
      c = AddUnsigned(c, CC)
      d = AddUnsigned(d, DD)
    }
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d)
    return temp.toUpperCase()
  }
  var md5 = MD5(stringSignTemp)
  return md5
}
// 共有参数
function getAction(url, _postdata) {
  let Host = localStorage['host']
  if (Host) {
    API.HOST = Host
  }
  // 线上版本，用配置好的地址
  if (process.env.NODE_ENV === 'production') {
    // API.HOST = 'http://113.107.7.82:8888/'
    API.HOST = 'https://api.iscan.top/'

    if (location.href.indexOf('membertest2') !== -1) {
      API.HOST = 'https://api.iscan.top/'
    } else if (location.href.indexOf('test') !== -1) {
      // API.HOST = 'https://api-test.iscan.top/'
      API.HOST = 'https://api.iscan.top/'
    } else {
      API.HOST = 'https://api.iscan.top/'
      // API.HOST = 'http://113.107.7.82:8985/'
    }
  }
  api.storage('access_token','4upayeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDc3MTE5MTUuMDE3LCJleHAiOjE1NDc5NzExMTUuMDE3LCJpc3MiOiJ1cGF5IiwiaWQiOiJMTEJVTVVhZ0FBRTAiLCJzaW11bGF0ZV9sb2dpbiI6IkxMQlVNVWFnQUFFMCIsInR5cGUiOiJtZW1iZXIifQ.gQHPufmbKH2QkzJXzBijO0FPqSXpUMXftRhsrFWcrOU')
  var accessToken = api.storage('access_token') || 'token'
  // 时间戳
  var timestamp = Math.floor(new Date() / 1000)
  // 签名
  var _signature = signature(_postdata, timestamp)
  // api地址
  var apiUrl = API.HOST + url + '?access_token=' + accessToken + '&timestamp=' + timestamp + '&signature=' + _signature
  return apiUrl
}
// 调用接口
api.postJson = function (_this, url, params, callback, errCb) {
  for (let key in params) {
    if (!params[key] && params[key] !== 0 && params[key] !== null) {
      delete params[key]
    }
    params[key] = typeof (params[key]) === 'string' ? params[key].replace(/(^\s*)|(\s*$)/g, "") : params[key]
  }
  var apiUrl = getAction(url, params)

  var loop = function () {
    axios({
      url: apiUrl,
      method: 'post',
      data: params
    }).then(function (res) {
      // 接口请求成功
      if (res.data.errno === 0) {
        try {
          callback && callback(res)
        } catch (e) {
          console.log('cb error', e)
        }
        console.log('返回成功', url, res)
      } else {
        // 用户token过期
        if (res.data.errno === 2) {
          // 清空授权登录记录的token
          api.storage('allData', '')
          api.storage('access_token', '')
          // 跳到首页请求再次加载
          _this.$router.replace({
            path: '/',
            query: {
              id: api.storage('device_id'), // 带上设备id
              payMethods: api.storage('paymethods'), // 带上是否公众号首先支付
              coupon_cf_id: api.storage('coupon_cf_id'), // 如果是优惠券页面未登陆带上优惠券id
              hongbao_id: api.storage('hongbao_id'), // 如果是红包页面未登陆带上红包id
              mch_id: (url === 'iot/coupon/create' || url === 'iot/hongbao/open') ? api.storage('mchData').mch_id : '', // 如果是红包或者优惠券页面未登录则带上商家id
            }
          })
          // 判断是否无权限
        } else if (res.data.errno === 999) {
          // 无权限则不返回
          _this.$vux.toast.text('暂无权限')
        } else {
          // 回调错误信息/显示错误信息
          callback && callback(res)
          _this.$vux.toast.text(res.data.errmsg)
        }
        // 取消加载框
        _this.$vux.loading.hide()
        console.log('接口错误提示-----', url, res)
      }
    }).catch(function (error) {
      _this.$vux.toast.text('网络异常')
      _this.$vux.loading.hide()
      console.log('e', error)
    })
  }
  loop()
}

// 异步请求
/**
 * 
 * @param {string} url 
 * @param {JSON} params 
 * @param {string} method 
 */
api.http = async function (url, params,method='post') {
  for (let key in params) {
    if (!params[key] && params[key] !== 0 && params[key] !== null) {
      delete params[key]
    }
    params[key] = typeof (params[key]) === 'string' ? params[key].replace(/(^\s*)|(\s*$)/g, "") : params[key]
  }
  var apiUrl = getAction(url, params)
  const res = await axios({
    url: apiUrl,
    method: method,
    data: params
  })
  return res.data.data
//   }else{
//       return Promise.reject('没有数据');
//   }

}
// getUserId
api.getUserId = function () {
  return api.storage('user').user_id
}
api.getUserCard= function(){
  let params = {
    user_id: api.storage('userData').user_id, // 用户id
		store_id: api.storage('deviceData').store_id // 门店id
  }
  return api.http('iot/card/get',params)
}
// 本地缓存封装
api.storage = function (key, value) {
  if (value !== undefined) {
    value = typeof value === 'string' ? value : JSON.stringify(value)
    localStorage[key] = value
    return
  }
  try {
    return JSON.parse(localStorage[key])
  } catch (err) {
    return localStorage[key]
  }
}
// 公共函数
export default api
