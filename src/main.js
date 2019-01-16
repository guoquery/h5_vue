// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/'
import router from './router'
// import axios from './api/axios/axios'
import flexible from 'lib-flexible'
import api from './api/api'
import FastClick from 'fastclick'

console.log(Vue.config,Vue.version)
FastClick.attach(document.body)

Vue.config.productionTip = false

/* 原型上面添加方法 */
Vue.prototype.$api = api; //网络请求相关

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: {
//     App
//   },
//   template: '<App/>'
// })
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
}).$mount()

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
