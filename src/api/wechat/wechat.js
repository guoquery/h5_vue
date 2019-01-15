/**
 * @overview 微信浏览器中的相关方法
 */

import fn from "../api.js"
export default {
  /************** 回调写法 *************/
  /**
   * 唤起收银台
   * @param {Object} _this vue实例对象
   * @param {Object} data 相关配置信息
   * @param {Function} sucCb 成功回调
   * @param {Function} errorCb 错误回调
   */
  Pay(_this, data, sucCb, errorCb) {
    _this.$vux.loading.hide()

    function onBridgeReady() {
      // 加载框
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          'appId': data.appId, // 公众号名称，由商户传入
          'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
          'nonceStr': data.nonceStr, // 随机串
          'package': data.package,
          'signType': data.signType, // 微信签名方式：
          'paySign': data.paySign // 微信签名
        },
        function (res) {
          // 私人添加
          _this.isPay = true
          // 判断支付状态
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            sucCb(data)
            console.log(res)
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            console.log(res)
          } else {
            errorCb(res.err_msg)
            console.log(res)
          }
        }
      )
    }
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
      }
    } else {
      onBridgeReady()
    }
  },
  /**
   * 调用扫一扫功能
   * @param {Object} _this  vue实例对象
   * @param {Function} callback  成功回调
   * @param {number} type  微信扫一扫类型  默认为0，扫描结果由微信处理，1则直接返回扫描结果，
   */
  scanQRCode(_this, callback, type) {
    // 限制1.5秒后才可以重新点击扫一扫，不然会点出好多个扫一扫
    if (!fn.storage('scodeTime') || new Date().getTime() - fn.storage('scodeTime') > 1500) {
      // 更新限制时间
      fn.storage('scodeTime', new Date().getTime())
      // 如果是安卓手机则更新
      let url = location.href
      let params_config = {
        appid: 'wxee0af8f19942f488',
        url: url.split('#')[0]
      }
      // 请求拿到功能权限
      fn.postJson(_this, 'platform/wechat/app/jssign', params_config, (res) => { //到服务器获取公众好相关配置信息
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
          appId: res.data.data.appid, // 必填，公众号的唯一标识
          timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.data.signature, // 必填，签名，见附录1
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
      })
      // 如果已经初始化微信功能
      wx.ready(function () {
        wx.scanQRCode({
          needResult: type === 'result' ? 1 : 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'],
          success: (data) => {
            if (data.resultStr !== undefined) {
              callback(res.code)
            }
          },
          fail: (data) => {
            console.log(data)
            _this.$vux.toast.text('调起扫描失败,请打开微信扫一扫进行扫码')
          },
          trigger: function (data) {}
        })
      })
    } else {
      _this.$vux.toast.text('正在调起')
    }
  }

  /***
   * *********** async/await写法 *************/
}
