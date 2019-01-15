import Vue from 'vue'
import axios from 'axios'
import router from '../../router'
let CancelToken = axios.CancelToken //取消请求
let cancelFlag = true
// axios.defaults.withCredentials = true //跨域相关参数
axios.defaults.baseURL = "https://api.iscan.top/"

if (process.env.NODE_ENV === 'development') { //判断vue 环境，开发还是生产 ，这里可以放本地ip 地址
  axios.defaults.baseURL = "https://api.iscan.top/"
}
axios.interceptors.request.use(config => { //request 拦截器
  Vue.$vux.loading.show();
  //设置默认请求头
  // config.headers['X-Requested-With'] =  
  config.headers = {
    'Content-Type': 'application/json' ,// 设置很关键
    'X-Requested-With':'XMLHttpRequest' //请求头配置 异步请求，不加为同步请求
  }
  config.timeout = 20000 // 超时设置
  console.log("axios.conig==>>>>>>>", config, config.data)
  let cancelGroupName; //取消请求的相关参数，具体使用看文档
  if (config.method === 'post') {
    if (config.data && config.data.cancelGroupName) { // post请求ajax取消函数配置
      cancelGroupName = config.data.cancelGroupName
    }
    // config.data = qs.stringify(config.data)
  } else {
    if (config.params && config.params.cancelGroupName) { // get请求ajax取消函数配置
      cancelGroupName = config.params.cancelGroupName
    }
  }
  if (cancelGroupName) {
    if (axios[cancelGroupName] && axios[cancelGroupName].cancel) {
      axios[cancelGroupName].cancel()
    }
    config.cancelToken = new CancelToken(c => {
      axios[cancelGroupName] = {}
      axios[cancelGroupName].cancel = c
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => { //response 拦截器
  Vue.$vux.loading.hide();
  console.log(response.config.url.split('?')[0].split(response.config.baseURL)[1] + "返回数据", response,Vue.$vux)
  // 根据返回code做对应处理
  let errno = response.data.errno;
  if (errno === 0) {
    return response;
  } else if (errno === 2) { //token 过期
    //清空缓存，回到到首页重新授权
    localStorage.clear();
    router.replace({
      path: '/',
      // query: { redirect: router.currentRoute.path },
    })
    // 判断是否无权限
  } else if (errno === 999) {
    // 无权限则不返回
    Vue.$vux.toast.text('暂无权限!')
  } else {
    // 回调错误信息/显示错误信息
    Vue.$vux.toast.text(response.data.errmsg)
    // 取消加载框
    console.log(response.config.url.split('?')[0].split(response.config.baseURL)[1]+'接口错误提示-----', response)
  }
  
  return Promise.reject(response.data.errmsg)

}, error => {
  console.log("请求错误", error.response.data)
  // Indicator.close()         加载框
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message = "连接到服务器失败"
  }
  //   alert(error.message )
  Vue.$vux.toast.text(error.message)
  return Promise.reject(error.message)
})

export default axios
