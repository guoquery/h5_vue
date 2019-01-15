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
    console.log('支付宝支付', data)
    AlipayJSBridge.call("tradePay", {
      tradeNO: data.TradeNo ? data.TradeNo : data.data.trade_no
    }, function (data) {
      // 私人添加
      _this.isPay = true
      _this.$vux.loading.hide()
      // debug.alert(data)
      console.log('支付回调', data)
      if (data.resultCode === "9000") {
        fn.storage('record_id', data.record_id)
        sucCb(data)
      } else if (data.resultCode === "6001") {
        console.log(data)
      } else {
        errorCb('支付失败')
        console.log(data)
      }
    })
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
      //jssdk 
      ap.scan({
        type: 'qr'
      }, function (res) {
        if (res.error === 10) {
          // 错误码为10：用户取消操作
          // _this.$vux.toast.text('取消扫码')
          // ...
        } else if (res.error === 11) {
          // 错误码为11：扫码失败
          _this.$vux.toast.text('扫码失败')
          // ....
        } else {
          if (type !== undefined) {
            callback(res.code)
          } else {
            if (res.code.indexOf('http') !== -1) {
              location.replace(res.code)
            } else {
              alert(res.code)
            }
          }
          console.log(res.code)
          // res.code为扫码返回的结果
        }
      })

    } else {
      _this.$vux.toast.text('正在调起')
    }
  }

  /************** async/await写法 *************/

}
