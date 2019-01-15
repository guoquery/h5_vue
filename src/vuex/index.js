import Vue from 'vue'
import Vuex from 'vuex'
import {
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin,
  Toast,
  Loading,
  Confirm
} from 'vux'
Vue.use(ToastPlugin, Toast, Loading, Confirm)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(Vuex)
console.log(Vue.loading)
const store = new Vuex.Store({
  state: {
    percent: 0, // 按摩椅专用的时间倒数进度条
    timerComputer: 0, // 按摩椅专用的时间计算变化
    guide: 0, // 新手引导下标
    personalData: {}, // 个人数据
    AMY_time: '00:00:00', // 按摩椅倒数时间
    iots: {
      guide: { // 新手引导
        goodsGuide: 0,
        chainGuide: 0,
        fscalGuide: 0
      },
      data: {}, // 保存数据
      noticeRead: false, // 是否提示有新消息公告
      timeout: '', // 全局定时器
      bgUrl: 'http://m.weimoke.com/decoder2.0/img/iots/default/', // 引用图片的路径
      Color: '#fd7461', // 主题颜色
      shadowColor: '254, 145, 117', // 主题阴影颜色
      linearColor: '#ff997a', // 主题渐变颜色
      chainTextColor: '#cb7416', // 设备游玩页面按钮文本颜色
      chainButtonColor: '#ffe9b3', // 设备游玩页面按钮颜色
      buttonColor: '#ffe14d', // 按钮主题颜色
      promptColor: '#e5b858', // 主题首页提示颜色
      compontent: [], // 引入主题的组件
    },
    upay: {
      bgUrl: 'http://m.weimoke.com/decoder2.0/img/upay/', // 引用图片的路径
      Color: 'rgba(14,186,70,1)',
      Color2: 'rgba(14,186,70,0.5)',
      shadowColor: 'rgba(254, 145, 117, 0.5)',
      linearColor: '#ff997a',
      buttonColor: '#fbb8bb', // 按钮主题颜色
      compontent: [],
      device_type: [],
      device: {},
      card: {},
      member: {},
      chargeItem: {},
      expense_Detail: {},
      config: {
        brand: ''
      },
      template: 'upay',
      detail: {},
      brand: '',
      imgUrl: ''
    }
  },
  mutations: {
    itemDetail(state, obj) {
      state.upay.detail = obj;
    },
    brand_name(state, n) {
      state.upay.brand = n
    }
  }
})

Vue.use(store)
export default store
