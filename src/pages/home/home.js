
import date from "../../components/datePicker/selectDateTime.vue"
import sweep from "@/components/qrcodeModule/"
// import charge from "@/components/chargePopup/charge"
import {mapState ,mapGetters ,mapMutations,mapActions } from 'vuex'


export default {
  name: 'home',
  data() {
    return {
      upay: this.$store.state.iots,
      // card: this.$api.storage('cardData')||{},
      isActive: false, //充值弹窗
      isActive2: false, //设备弹窗
      fscan: 1, // 是否反扫
      advertData: '',
      type: '',
      noticeData: '', // 消息公告
      componentName: '', // 引用组件的名字
      advertSwitch: false, // 广告开关
      noticeText: '国庆假期优惠不见断，国庆假期更多好礼等着你，滴滴滴滴', // 消息公告文本
      device: {},
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
    date,
    sweep,
    // charge,

  },
  async mounted() {
    console.log(">>>>>>vm",this,this.$data,this.card)
    this.test();
    let that = this
    this.device = await this.$api.http('iot/device/get', {
      device_sn: "n10811"
    })
    this.$api.storage('deviceData',this.device)
    console.log(this.device)
    this.member = await this.$api.http('iot/member/base', {
      mch_id: that.device.mch_id,
      store_id: that.device.store_id,
    })
    // await this.$api.getUserCard();
    this.updateCard(await this.$api.getUserCard());
  },
  methods: {
    test() {
      this.$api.storage('userData', {
        headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/0jvV72SXgJvCGt7ePechCq2v3ibmmDSwALiae8iaCqfHDJ5MXrwwJdvDxLaOCqWYxiaSiaVXQt4fMPoia2nJcqteUmibQ/132",
        openid: "o0Skd1e0ZFW0SYUYZoZ1zVxe25eI",
        sex: 1,
        // token: "4upayeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDY5MTUyOTEuMjk1LCJleHAiOjE1NDcxNzQ0OTEuMjk1LCJpc3MiOiJ1cGF5IiwiaWQiOiJMTEJVTVVhZ0FBRTAiLCJ0eXBlIjoibWVtYmVyIn0.UzdoLEgwx_Qye2SmFiGhfwpu1jlvuwkIY3Fl_4w2I8A",
        token: "4upayeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDc3MTE5MTUuMDE3LCJleHAiOjE1NDc5NzExMTUuMDE3LCJpc3MiOiJ1cGF5IiwiaWQiOiJMTEJVTVVhZ0FBRTAiLCJzaW11bGF0ZV9sb2dpbiI6IkxMQlVNVWFnQUFFMCIsInR5cGUiOiJtZW1iZXIifQ.gQHPufmbKH2QkzJXzBijO0FPqSXpUMXftRhsrFWcrOU",
        user_id: "LLBUMUagAAE0",
        user_name: "prepares",
        // token: "4iotseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDM5MTY0ODEuNTUxLCJleHAiOjE1NDQxNzU2ODEuNTUxLCJpc3MiOiJpb3RzIiwiaWQiOiJMT0l4eDNyQUFWNDAiLCJzaW11bGF0ZV9sb2dpbiI6IkxMMVZHcDBBQUFFMCIsInR5cGUiOiJtZW1iZXIifQ.Hq2wvZ--gZXFjogJuupVVfm5AsHGIiAuOMFSoqDWabY",
        // user_id: "LOIxx3rAAV40",
        // user_name: "咖啡因🐥"
      })
    },
    ...mapMutations({
      updateCard:'UPDATE_CARD'
    }
    ),
    // ...mapActions([
    //   'updateCard',
    // ])

  },
  computed: {
    // card:function(){
    //   return this.$store.getters.card
    // },
    ...mapGetters([
      'card',
      // ...
    ])
    // card_coin: function () {
    //   return this.$store.state.upay.card.this.$api / 100
    // },
    // integral: function () {
    //   return this.$store.state.upay.member.integral
    // },
    // brand_name: function () {
    //   return this.$store.state.upay.brand
    // }

  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm=>{
    })
  },
  beforeRouteUpdate (to, from, next) {
    alert('beforeRouteUpdate')
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave',to,from,next)
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }

}
