// import sweep from '../home-components/sweep/'
// import charge from '../com-components/charge/charge'
// import payPopup from '../com-components/payPopup/'
// import devicePopup from '../com-components/devicePopup/'
// import advert from '../home-components/advert/advert'
// import vHeader from '../home-components/vHeader/'
// import notice from '../home-components/notice/'
// import user from '../home-components/userInfo/'
// import goodsDe from '../home-components/goodsDefault/'
// import goodsAdv from '../home-components/goodsAdv/'
// import startDevice from '../home-components/startDevice/'
// import Swiper from '../../../../../static/js/swiper.min.js'
// import popup from '../../common/popup/popup/'
// import comJS from '../../common/comJS/index.js'
// import exchangeCoin from '../../common/exchangeCoin/'
// import XButton from 'vux/src/components/x-button'
// import bugCoin from '../../common/bugCoin/'


export default {
  name: 'home',
  data() {
    return {
      upay: this.$store.state.upay,
      card: this.$api.storage('cardData'),
      isActive: false, //充值弹窗
      isActive2: false, //设备弹窗
      fscan: 1, // 是否反扫
      advertData: '',
      type: '',
      noticeData: '', // 消息公告
      componentName: '', // 引用组件的名字
      advertSwitch: false, // 广告开关
      noticeText: '国庆假期优惠不见断，国庆假期更多好礼等着你，滴滴滴滴', // 消息公告文本
      device: this.$store.state.upay.device,
      user: this.$api.storage('userData'),
      store: this.$api.storage('storeData'),
      member: this.$api.storage('personalData'),
      device: this.$api.storage('deviceData'),
      device_type: [], //设备类型组件
      unit: this.$api.storage('unit'),
      brand: {},
      chargeList: [],
      deviceList: [],
      isPay: false,
      ismoreStore: false,
      storeLists: [],
      height: 100,
      exchangeCoin: false, //兑币机
    }
  },
  components: {
    // sweep,
    // vHeader,
    // notice,
    // user,
    // startDevice,
    // advert,
    // popup,
    // charge,
    // devicePopup,
    // goodsDe,
    // goodsAdv,
    // payPopup,
    // XButton,
    // exchangeCoin,
    // bugCoin
  },
  async mounted() {
    this.test();
    let that = this
    this.device = await this.$api.http('iot/device/get', {
      device_sn: "n10811"
    })
    console.log(this.device)
    this.member = await this.$api.http('iot/member/base', {
      mch_id: that.device.mch_id,
      store_id: that.device.store_id,
    })
    this.card = await this.$api.http('iot/card/get', {
      user_id: that.$api.storage('userData').user_id,
      store_id: that.device.store_id
    })

    return
    // 获取消息公告
    if (this.device.type === '兑币机') {
      this.exchangeCoin = true;
    }
    this.$store.state.upay.card = this.$api.storage('cardData')
    this.$store.state.upay.member = this.$api.storage('personalData')
    
    this.card = this.$store.state.upay.card;
    this.getNotice()
    // 获取广告

    //获取设备信息
    // this.init();

    // 主题特殊接口
    console.log(this.upay.template)
    if (this.upay.template === 'guwei') {
      this.getBrand();
      comJS.getChargePackage().then(() => {
        this.chargeList = this.$api.storage("chargeList")
      });
    }
  },
  methods: {
    test() {
      this.$api.storage('userData', {
        headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/0jvV72SXgJvCGt7ePechCq2v3ibmmDSwALiae8iaCqfHDJ5MXrwwJdvDxLaOCqWYxiaSiaVXQt4fMPoia2nJcqteUmibQ/132",
        openid: "o0Skd1e0ZFW0SYUYZoZ1zVxe25eI",
        sex: 1,
        // token: "4upayeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDY5MTUyOTEuMjk1LCJleHAiOjE1NDcxNzQ0OTEuMjk1LCJpc3MiOiJ1cGF5IiwiaWQiOiJMTEJVTVVhZ0FBRTAiLCJ0eXBlIjoibWVtYmVyIn0.UzdoLEgwx_Qye2SmFiGhfwpu1jlvuwkIY3Fl_4w2I8A",
        token: "4upayeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDc0MzM4MjkuOTk3LCJleHAiOjE1NDc2OTMwMjkuOTk3LCJpc3MiOiJ1cGF5IiwiaWQiOiJMTEJVTVVhZ0FBRTAiLCJ0eXBlIjoibWVtYmVyIn0.pdKN2HzGsChZ9xlRXrbqIfMCCMt5e15dXvdk_oVByPU",
        user_id: "LLBUMUagAAE0",
        user_name: "prepares",
        // token: "4iotseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDM5MTY0ODEuNTUxLCJleHAiOjE1NDQxNzU2ODEuNTUxLCJpc3MiOiJpb3RzIiwiaWQiOiJMT0l4eDNyQUFWNDAiLCJzaW11bGF0ZV9sb2dpbiI6IkxMMVZHcDBBQUFFMCIsInR5cGUiOiJtZW1iZXIifQ.Hq2wvZ--gZXFjogJuupVVfm5AsHGIiAuOMFSoqDWabY",
        // user_id: "LOIxx3rAAV40",
        // user_name: "咖啡因🐥"
      })
    },
    // 获取消息函数
    getNotice() {
      this.noticeSwitch = true
    },
    // 获取广告函数
    getAdvert() {
      this.componentName = 'sweep'
      var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    // 点击关闭消息
    noticeClose() {
      this.noticeSwitch = false
    },
    // 点击关闭充值框 
    activeClick() {
      this.isActive = false;
    },
    activeClick2() {
      this.isActive2 = !this.isActive2
    },
    activeClick3() {
      this.exchangeCoin = !this.exchangeCoin
    },
    /**
     * 初始化，获取设备信息，获取主题模板
     */
    async init() {
      const device = await this.$api.storage('deviceData');
      this.device = device;
      if (device.fscan === 1) {
        this.$api.storage('device_type', ['sweep'])
      } else if (device.fscan == 0) {
        this.$api.storage('device_type', ['startDevice'])
      }
      if (device.type != '娃娃机') {
        this.$api.storage('device_type', ['goodsAdv'])
      }
      this.$store.state.upay.device_type = this.$api.storage('device_type');
      // if(device.template_id){
      //     this.getTemplate(device.template_id);
      // }else{
      //     this.getMember()
      // }
      // this.$store.commit('brand_name',this.brand.name)

    },
    /**
     * 获取品牌
     */
    getBrand() {
      let params = {
        channel_id: this.device.mch_id
      }
      this.$api.postJson(this, 'channel/brand/get', params, res => {
        if (res.data.data.name) {
          res.data.data.name = res.data.data.name.replace(/\s+/g, '')
        }
        if (res.data.data.channel_id === 'iotskuateshijie' && res.data.data.brand_id === 'LM96mrYgAJ00' && res.data.data.name === '夸特二次元') {
          res.data.data.name = '夸特' + '\n' + '二次元'
        }
        // app.brand = { ...res.data.data };
        this.brand = res.data.data
        this.$api.storage('brand', this.brand)
        this.$store.commit('brand_name', this.brand.name)
      })
    },
    /**
     * 获取会员信息
     * @param action 有参数刷新
     */
    getMember(action) {
      let params = {
        user_id: this.$api.storage('userData').user_id,
        mch_id: this.device.mch_id
      };
      this.$api.postJson(this, 'iot/member/get', params, res => {
        let member = res.data.data;
        this.$api.storage('member', res.data.data)
        if (action) {
          return
        }
        if (res.data.data.member_id) {
          this.getUserCard();
        } else {
          this.createusercard();
        }
      })
    },
    /**
     * 获取或者刷新会员卡 ： 有参数刷新
     * @param action 
     */
    getUserCard(action) {
      let params = {
        user_id: this.$api.storage('userData').user_id,
        mch_id: this.$api.storage('deviceData').mch_id,
        store_id: this.$api.storage('storeData').store_id,
        status: 1
      }
      this.$api.postJson(this, 'iot/card/get', params, res => {
        let data = res.data.data;
        this.$api.storage('cardData', data);
        this.card = { ...data
        }
        if (data.card_id) {
          if (action) {
            return;
          }
        } else {
          let param = {
            user_id: app.getParams('user').user_id,
            headimgurl: app.getParams('user').headimgurl,
            user_name: app.getParams('user').user_name,
            mch_id: app.getParams('device').mch_id || app.redPacket_store.mch_id,
            store_id: app.getParams('store').store_id,
          }
          this.$api.postJson(this, 'iot/card/create', param, r => {
            if (r.data.data) {
              this.getUserCard("refresh");
            }

          })
        }
      })

    },
    payClick() {
      this.isPay = false;
      // this.activeClick();
      // this.$emit('payClick')
    },
    chargeclick(item, index) {
      this.$store.state.upay.chargeItem = item;
      console.log(66666, this.$store.state.upay)
      this.isPay = true;
      this.isActive = false;
    },
    // mogo导航
    // 底部栏图标点击事件
    footerClick(key) {
      if (key === 0) {
        this.$router.push("rank")
      } else if (key === 1) {
        this.$router.push("home")
      } else if (key === 2) {
        this.$router.push("personal")
      }
    },
    /**
     * 路由跳转
     */
    toMenu(index) {
      switch (index) {
        default:
          this.$router.push({
            path: index
          })
          break;
      }
    },




  },
  computed: {
    card_coin: function () {
      return this.$store.state.upay.card.coin / 100
    },
    integral: function () {
      return this.$store.state.upay.member.integral
    },
    brand_name: function () {
      return this.$store.state.upay.brand
    }

  }

}
