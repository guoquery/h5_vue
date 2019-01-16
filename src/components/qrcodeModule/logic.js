import { Qrcode, Divider } from 'vux'
// import comJS from '../../../common/comJS/index.js'
export default{
    name: 'sweep',
    data () {
        return {
            upay:this.$store.state.upay,
            code: this.$api.storage('qstring')||"123",
            qrSize: 130,
            user:this.$api.storage('userData'),
            userCard:this.$api.storage('cardData')||{},
            member:this.$api.storage('member'),
            interval:{},
        }
    },
    components: {
        Qrcode,
        Divider
    },
    mounted () {
        return;
        let  that = this;
        that.getSeepQrcode();
        this.interval = setInterval(that.getSeepQrcode,3000)
        
       setTimeout(() => {
            let qrSize = parseInt(window.getComputedStyle(this.$refs.ele).height) / 2
            console.log(qrSize);
            this.qrSize = qrSize < 174 ? qrSize*1.3 : (qrSize > 210 ? 210 : qrSize)
       }, 100) 
    },
    methods:{
        getSeepQrcode(){
            if(!this.$api.storage('cardData')){
                return
            }
            let params = {
                card_id: this.$api.storage('cardData').card_id,
                // card_id: app.getParams('card').card_id,
                device_sn: this.$api.storage('deviceData').device_sn,
            };
            this.$api.postJson(this,'iot/card/sweepQrcode', params, res => {
                // this._imgLoader.visible =true;
                if (!res.data.data.qr_string)
                    return
                if (res.data.data.body) {
                    comJS.getUserCard();
                    this.$vux.toast.text(res.data.data.body);
                    this.createQrString();
                    return;
                }
                let str = res.data.data.qr_string;
                if (str == this.$api.storage('qstring')) {
                    return;
                }
                this.$api.storage('qstring', str)
                this.code = str;

            })
        }
    },
    destroyed(){
        clearInterval(this.interval);
        console.log("清除定时器！")
    }
    

}