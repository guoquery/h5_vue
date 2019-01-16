<template>
    <!-- 充值选择 -->
    <div>
    <popup :isActive='isActive' @isClick="activeClick" @click.stop="" v-if="upay.template==='upay' || upay.template === 'default'" >
        <div class="charge" @click.stop >
            <!-- 套餐信息 -->
            <div class="chargeInfo">
                <div class="storeImg">
                    <img src="//gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico" alt="" v-if="store.pic">
                    <div class="storeInfo" >
                        <div >请选择充值套餐</div>
                        <div class="storeNum">充值成功后，点击“投币启动”启动设备。</div>
                    </div>
                </div>
                <span @click.stop="activeClick">
                    <svg class="icon" >
                        <use xlink:href="#icon-H_Btn_guanbi"></use>
                    </svg>  
                </span>
            </div>
            <!-- 红包码 -->
            <div class="rebpacket"  @click.stop v-if="upay.template==='default'"><input type="text" placeholder="请输入红包码"><span class="btn" :style="{backgroundColor:$store.state.upay.Color}" >立即兑换</span></div>
            <!-- 套餐列表 -->
            <div class="chargeList" @click.stop="" v-if="upay.template==='default'" >
                <ul>
                    <li v-for="(item, key) in chargeList" :key="key" @click.stop="clickPay(item)">
                        <div class="chargeItem">
                            <div class="itemcoin">
                                <em ><span class="big NUM">{{item.coin/100}}</span>币</em>
                            </div>
                            <div class="itemsend">
                                <span></span>
                                <em >送<span class="NUM">{{item.present_coin/100}}</span>币</em>
                            </div>
                        </div>
                        <div class="pay">
                            <!-- <del class="old-price NUM">￥{{item.old/100 ||0}}</del> -->
                            <div class="price NUM" :style="{color:$store.state.upay.Color}">￥<span class="big">{{item.price/100}}</span></div>
                        </div>
                        <!-- <div class="storeButton" :style="{color:$store.state.iots.Color}" @click="storeChange(item, key)">切换</div> -->
                    </li>
                </ul>
            </div>
            <!-- 游付宝默认充值页面主体部分 -->
            <div class="chargeCat"  @click.stop="" v-else-if="upay.template==='upay'">
                <div class="cgtitle">
                    <span>{{unit||'游戏币'}}充值</span>
                    <span class="more">充值越多越优惠</span>
                </div>
                <div class="cgblock" ref="chargeBlock">
                    <ul>
                        <li v-for="(item,index) in chargeList" :key='index' :class="index+1==(2*(parseInt(index/3)+1)+parseInt(index/3))?'singleblock':''" >
                            <!--<div :class="current==index?(item.adticket>0 || (item.values-item.pay/100)>0)?'actived ':'sactived':''"  @click="chargeclick(item,index)">-->
                            <div :class="current==index?'sactived':''"  @click="clickPay(item,index)">
                                <!-- <span class="first-charge" v-if="true">首充</span> -->
                                <span class="money">{{item.coin/100}}{{unit?unit:"币"}}</span>
                                <span class="addticket">
                                    {{`(送${item.present_coin/100}${unit?unit:"币"})`}}
                                </span>
                                <span class="coining"><div class="integral">￥{{item.price/100}}</div></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 底部提示 -->
            <div class="tips">
                <div class="line"></div>
                <span>虚拟金额套餐一经销售。不得退款!</span>
                <div class="line"></div>
            </div>
        </div>
    </popup>
    <!-- mogo -->
    <popup :isActive='isActive' @isClick="activeClick" v-if="upay.template==='mogo'" >
      <div class="popup-choose" @click.stop="">
          <div class="banner" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/homePage/topup_bottom.png)'}">
              <div></div>
              <div class="banner_coin"><span class="coin_money">{{card.coin/100}}</span><span class="coin_num">{{unit||'嗨币'}}</span></div>
              <span class="banner_close"  @click="activeClick" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/homePage/close.png)'}"></span>
          </div>
          <div class="set_meal">
              <ul class="nav">
                  <li class="nav_list" v-for="(item, index) in chargeList" :key="index" @click.stop="clickPay(item,index)" :class="index===current?'select':''">
                      <div>
                        <div class="limit_time"  v-if="item.tag"><p class="limit" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/homePage/label.png)'}">{{item.tag}}</p></div>
                        <div class="num_coin">
                            <div class="number" :class="item.coin/100>10000?'small':''"><span class="NUM">{{item.coin/100}}</span><span class="coin_item">{{unit||'嗨币'}}</span></div>
                            <p v-if="item.present_coin">送 {{item.present_coin/100}} {{'币'}}</p>
                            <!-- <p>赠送礼品名称</p> -->
                        </div>
                        <div class="num_money"><span class="money_sym">￥</span><span class="money_item">{{item.price/100}}</span></div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
    </popup>
    <!-- guwei -->
    <popup :isActive='isActive' @isClick="activeClick" v-if="upay.template==='guwei'" >
        <div class="gw_charge" >
            <div class="account" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/charge_bg.png)'}">
                <div class="account_info">
                    <div class="ac_money">账户余额</div>
                    <div class="ac_addticket" >
                    {{card.coin/100 || 0}}
                    </div>
                    <div class="ac_coining">请选择购币金额</div>
                </div>
                <!-- 关闭弹窗 -->
                <div class="close" @click.stop="activeClick()">
                    <svg class="icon"  >
                        <use xlink:href="#icon-H_Btn_guanbi_big" ></use>
                    </svg> 
                </div>
            </div>
            <!-- <div class="charge">
            </div> -->
            <div class="cgblock" >
            <!-- <div class="cgblock" ref="chargeBlock"> -->
                <ul>
                    <li v-for="(item,index) in chargeList" :key='index'>
                        <div class="charge_box" @click.stop="clickPay(item,index)">
                            <div class="charge_box_box">
                                <!-- <span class="first-charge" >首充</span> -->
                                <span class="money">{{item.price/100}}元</span>
                                <span class="addticket" v-if='item.present_coin>0' >
                                    赠送{{item.present_coin/100}}{{unit}}
                                        <!-- {{item.rules.ticket}} -->
                                    <!-- {{index%2==0?'送'+item.values+'积分':''}} -->
                                </span>
                                <span class="coining">{{item.coin/100}}{{unit}}</span>
                                <!-- <span class="coining">{{item.values}}{{store.mch_id=='zsdc'?'呱币':store.mch_id=='tyj'?'偶币':store.mch_id=='catchCu'?'咔咔币':'游戏币'}}</span> -->
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
                
        </div>
    </popup>

    <payPopup :isPay='isPay' @payClick="payClick" @click.stop="" v-if="isPay"></payPopup>
    </div>

</template>
<script>
// import popup from '../../../common/popup/popup/'
// import popupCenter from '../../../common/popup/popupCenter/'
// import payPopup from '../payPopup/'
// import comJS from '../../../common/comJS/index.js'
export default {
    name: 'charge',
    data () {
        return {
            upay:this.$store.state.upay,
            uColor:this.$store.state.upay.Color,
            isPay: false,//支付弹窗
            chargeList:[ ],// 门店列表],
            unit:api.storage('unit'),
            card:api.storage('cardData'),
            store:api.storage('storeData'),
            current:'',
               
        }
    },
    components: {
        // popup,
        // payPopup,
        // popupCenter
        // topup
    },
    props:{
        isActive: {
            type: Boolean,
            default: false
        }
    },
    mounted () {
        return;
        this.init();
        console.log(this.upay.template)
    },
    methods: {
        async init(){
            const a = await api.storage('storeData')
            // console.log("charge=>>>>>>>>",444)
            comJS.getChargePackage().then(()=>{
                let data = api.storage("chargeList");
                this.dataDeal(data);
                // this.chargeList = api.storage("chargeList")
            });
        },
        //支付弹窗
        clickPay(item,index){
            this.$store.state.upay.chargeItem= item;
            console.log(66666,this.$store.state.upay)
            this.current=index;
            this.isPay = true;
            this.activeClick();
        },
        // 点击关闭框
        activeClick () {
            this.$emit('isClick')
        },
        // 点击充值
        topupClick () {
            if (this.$store.state.guide < 3) return
            this.isTopup = true
        },
        payClick(){
            this.isPay = false;
            this.activeClick();
            // this.$emit('payClick')
        },
        /**
         * 充值列表数据处理
         */
        dataDeal(data){
            let dataList=[];
            data.forEach(el => {
                if (el.continue)
                    el.tag = '续充'
                if (el.recommend)
                    el.tag = '推荐'
                if (el.first)
                    el.tag = '首充'
                if ((el.end_time != "0000-00-00 00:00:00" && el.end_time != null) && (el.start_time != "0000-00-00 00:00:00" && el.start_time != null)) {
                    let time = new Date().getTime();
                    let end_time = new Date(el.end_time).getTime()
                    let start_time = new Date(el.start_time).getTime()
                    if (time > start_time && time < end_time) {
                        el.tag = '限时'
                    } else {
                        el.used = '不可用'
                    }
                }
            });
            if (this.card.charge > 0) {
                data.forEach(el => {
                    if (el.first < 1 && el.used != '不可用') {
                        dataList.push(el)
                    }
                });
                this.chargeList = [...dataList.sort((a, b) => {
                    return a.price - b.price
                })]
            } else {
                data.forEach(el => {
                    if (el.used != '不可用') {
                        dataList.push(el)
                    }
                });
                this.chargeList = [...dataList.sort((a, b) => {
                    return a.price - b.price
                })]
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
    @import '../../common/styl/public.styl'
    .charge{
        max-height: 65%;
        min-height: 10%;
        background #fff
        width 100%;
        border-radius:rem(20) rem(20) 0px 0px;
        flex-d()
        flex-j()
        padding:0 rem(30)
        .chargeInfo{
            // u-WH(690,140)
            // background #000
            position relative;
            height:rem(140);
            margin-top:rem(-30)
            // display: flex;
            // flex :1;
            // flex-daj(,,space-between)
            .storeImg{
                flex-daj(,,flex-start)
                img{
                    border-radius 50%
                    background: #e0e0e0
                    overflow hidden
                    border:rem(2) solid #fff
                    // width 100%;
                    // height 100%
                    icon(140, 140)
                    margin-right: rem(30)
                }
                .storeInfo{
                    height:rem(140);
                    flex-daj(column,flex-start,flex-end)
                    >div{
                        font(32);
                        color:#333
                    }
                    >div.storeNum{
                        margin-top: rem(20)
                        font(24)
                        color:#999
                    }
                }
            }
            span{
                position absolute;
                top 50%;
                right: 0;
                .icon{
                    color:#999
                    icon(32, 32)
                }
            }

        }

        // 红包
        .rebpacket{
            margin-top rem(20)
            height:rem(120)
            u-font(28)
            flex-daj(,center,space-between);
            border-radius: rem(10);
	        background-color: #eeeeee
            padding rem(10) rem(10) rem(10) rem(30)
            // box-sizing border-box;
            input{
                background-color #eeeeee
                width:70%;
            }
            .btn{
                u-WH(160,66);   
                // u-font(28)
                line-height rem(66)
                text-align center;
                border-radius rem(10);
                background-color $upayColor;
                color:#fff;
            }
        }
        // 充值列表
        .chargeList{
            flex:1;
            overflow auto
            margin-bottom rem(70);
            >ul>li{
                width 100%;
                height rem(120)
                border-bottom:rem(1) solid #e5e5e5
                flex-a()
                .chargeItem ,.pay{
                    flex:1;
                    u-font(30)
                    padding:rem(23) 0 

                }
                .chargeItem {
                    flex-daj(,flex-end,flex-start)
                    .itemcoin{
                        margin-right  rem(12)    
                    }
                }
                .pay{ 
                    flex-daj(,flex-end,flex-end)
                    .price{
                        margin-left rem(12)    
                    }
                }
                .big{
                    u-font(40)
                }
                
                .storeButton{
                    padding-left:rem(30)
                    font(32)
                    height 100%;
                    flex-a()
                }
            }
        }
        
        .chargeList::-webkit-scrollbar { width: 0 !important }
    }
    // 支付弹窗
    .payPop{
        u-WH(570,620)
        width rem(570) !important
        background-color rgb(241,241,241);
        border-radius:rem(24);
        flex-daj()
        .pay{
            u-WH(550,600)
            padding rem(50) 0 rem(30) 0 
            background #fff
            border-radius:rem(24);
            flex-daj(column,center,space-between)
            .content{
                width:100%;
                padding 0 rem(30)
                flex-daj(column,center,space-between)
                // 头部部分
                .type{  
                    width:100%;
                    >div.device{
                        flex-daj(column,center,space-between)
                        >p{
                            margin-bottom rem(40)
                            u-font(26)
                            color:#333;
                        }                
                    }
                    >div.goods{
                        height:rem(168)
                        flex-daj(,center,flex-start)
                        // margin rem(40)  0
                        img{
                            icon(30,60)
                            margin 0 rem(40)
                        }
                        .goodsItem{
                            height:100%;
                            flex-daj(column,flex-start,center)
                            .title{
                                u-font(28)
                            }
                            .num{
                                u-font(26)
                                color:#999;
                                margin rem(25) 0 
                            }
                            .price{
                                u-font(32)
                            }
                        }

                    }
                    .big{
                        u-font(60)
                    }
                }
                .tips{
                    u-font(26)
                    color:#999;
                }  
                .red{
                    u-font(30)
                    color:#f54e55
                }
                // 优惠部分
                .discount{
                    width:100%;
                    u-font(30)
                    >div{
                        flex-daj(,center,space-between)
                    }
                    >.coupons{
                        height:rem(44)
                    }
                    >.integral{
                        padding rem(16) 0
                        flex-daj(column,flex-start,space-between)
                        .title{
                            width:100%;
                            flex-daj(,center,space-between)
                            margin-bottom rem(25)
                            input{
                                u-WH(36,36)
                                background #000
                            }
                        }
                    }
                }

                // 总计
                .money{
                    width:100%;
                    padding rem(32) 0 
                    u-font(30)
                    flex-daj(,center,space-between)
                    .total{
                        flex-daj(,center,space-between)
                        .payMoney{
                            u-font(50);
                            margin-left rem(10)
                        }
                    }
                }

                
            }
            // 支付按钮
            .btn{
                u-WH(510,88);    
                u-font(32);
                line-height rem(88);
                text-align center;
                border-radius rem(10);
                color:#fff;
            }
        }
    }
    // 提示
    .tips{
        position fixed;
        left 0 ;
        bottom:rem(17);
        padding 0 rem(64)
        flex-daj(,,space-between);
        width:100%
        u-font(24)
        color:#999;
        .line{
            u-WH(100,2);
            background-color #ddd;
        }
    }
    //游付宝充值弹窗
    .chargeCat {
        flex:1;
        width: 100%;
        // padding: rem(30);
        margin-bottom rem(70);
        background-color: #fff;

        .cgtitle {
            font-size: rem(29);
            color: #444444;
            height: rem(55);
            line-height: rem(55);

            .more {
                background: #f96267;
                color: #fff;
                display: inline-block;
                padding: rem(4) rem(20) rem(0) rem(16);
                height: rem(30);
                line-height: rem(30);
                font-size: rem(21);
                border-radius: rem(8);
                border-bottom-left-radius: 0;
                position: relative;
                margin-left: rem(20);

                &:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: rem(-8);
                    border: rem(8) solid transparent;
                    border-right-color: #f96267;
                    border-bottom-color: #f96267;
                }
            }
        }

        .cgblock {
            // height rem(300)
            // overflow hidden
            margin-top: rem(10);

            ul {
                /* display flex */
                /* justify-content flex-start */
                /* align-items flex-start */
                /* flex-wrap wrap */
                display: block;
                // float left
                width: 100%;
                height: 100%;
                overflow: auto;
                overflow-x: hidden;

                // li.singleblock {
                //     margin-right: rem(30);
                //     margin-left: rem(30);
                // }
                li:nth-child(3n+2){
                    margin-right: rem(30);
                    margin-left: rem(30);
                }

                li {
                    float: left;
                    // display flex
                    // flex-wrap wrap
                    margin-bottom: rem(20);

                    // padding-top rem(5)
                    // padding-left rem(6)
                    // padding-right rem(6)
                    div {
                        // width 100%
                        position: relative;
                        z-index: 1000;
                        padding: rem(16) 0 rem(8);
                        box-sizing: border-box;
                        width: rem(210);
                        height: rem(168);
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        align-items: center;
                        background: #ffffff;
                        border: 1px solid #e3eef3;
                        border-radius: rem(10);
                        overflow: hidden;
                    }
                    // 首充的样式
                    .first-charge {
                        font-size: rem(24);
                        color: #ffffff;
                        background-color: #f96267;
                        padding-top:rem(4);
                        display: inline-block;
                        width: rem(110);
                        height: rem(34);
                        // padding rem(1) 0
                        line-height: rem(34);
                        text-align: center;
                        position: absolute;
                        top: rem(2);
                        left: rem(-34);
                        z-index: 1;
                        transform: rotate(-45deg);
                    }

                    .money {
                        font-size: rem(24);
                        color: #333;
                        font-weight: bold;
                        // margin-top rem(8)
                        // display flex
                        // align-items flex-end
                    }

                    .coining {
                        // display block
                        // width rem(140)
                        // height rem(50)
                        margin-bottom: rem(8);
                        padding: rem(4) 0 0;
                        font-size: rem(20);
                        color: #0aa7f9;

                        .integral {
                            padding: 0;
                            width: rem(140);
                            height: rem(50);
                            line-height: rem(50);
                            align-self: center;
                            border: rem(1) solid #9ddcfd;
                            border-radius: rem(25);
                        }
                    }

                    .addticket {
                        font-size: rem(16);
                        // border-top 1px dashed #d8dfe9
                        color: #666;
                        margin-right: rem(10);
                        margin-left: rem(10);
                        no-wrap();
                        // display flex
                        // align-items center
                        // justify-content center
                    }

                    span {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }

                    div.actived {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        background: #0aa7f9;
                        border: rem(1) solid #0aa7f9;
                        border-radius: rem(10);

                        .money {
                            font-size: rem(24);
                            color: #ffffff;
                            display: flex;
                            align-items: flex-end;
                        }

                        .coining {
                            font-size: rem(18);
                            color: #91d8fd;
                        }

                        .addticket {
                            font-size: rem(16);
                            border-top: 1px dashed #73cefd;
                            color: #73cefd;
                            margin-right: rem(10);
                            margin-left: rem(10);
                            no-wrap();
                        }
                    }

                    div.sactived {
                        // width 100%
                        // display flex
                        // flex-wrap wrap
                        background: #ffffff;
                        border: rem(2) solid #0aa7f9;
                        border-radius: 5px;
                        // box-shadow 0 0 0 rem(6) rgba(10, 167, 249, 0.53)
                        box-sizing: border-box;
                        border-radius: rem(10);

                        .money {
                            // font-size rem(24)
                            color: #0aa7f9;
                            // font-weight bold
                            // display flex
                            // align-items flex-end
                        }

                        .coining {
                            // font-size rem(18)
                            // color #73cefd
                            .integral {
                                color: #ffffff;
                                background-color: #3bb9fa;
                            }
                        }

                        .addticket {
                            color: #0aa7f9;
                        }
                    }
                }
            }
        }
    }
    // mogo样式
    .popup-choose {
    .banner {
        width: 100%
        height rem(219)
        bgUrl('upay/mogong/homePage/topup_bottom.png')
        background-size: 100% 100%
        flex-lra()
        .banner_coin {
            flex-ajd()
            position: relative
            top: rem(25)
            .coin_money {
                font(54)
                color: #ffe04f
                font-family:number-webfont;
                display: block
            }
            .coin_num {
                font(34)
                color: #ffffff
            }
        }
        .banner_close {
            width: rem(30)
            height rem(30)
            display: block
            position: relative
            right rem(30)
            bgUrl('upay/mogong/homePage/close.png')
            background-size: 100% 100%
        }
    }
    .set_meal {
        width: 100%
        height rem(622)
        background-color: #f4f4f4
        .nav {
            width: 100%
            height 100%
            display: flex
            justify-content: space-between;
            padding 0 rem(20)
            flex-wrap: wrap
            >li {
                width: rem(210)
                height rem(266)
                box-shadow: 0px rem(8) 0px 0px #e1e1e1;
                border-radius: rem(20);
                background-color: #f59095
                margin-top: rem(30)
                &:nth-child(4), &:nth-child(5), &:nth-child(6) {
                    margin-bottom: rem(30)
                }
                &.select {
                    background-color: #f54e55
                    color: #f54e55
                }
            }
        }
    }
    }
    .nav_list {
        flex-ajd()
        position: relative
        top: 0
        left: 0
        right: 0
        .num_coin {
            width: rem(202)
            height rem(184)
            background-color: #ffffff
            border-radius: rem(16) rem(16) 0 0
            flex-ajd()
            .number {
                font(60)
                font-family:number-webfont;
                display: flex;
                align-items: baseline;
                .coin_item {
                    font(20)
                }
            }
            >p {
                font(26)
                color: #999999
            }
            
        }
        .num_money {
            width: rem(202)
            height rem(78)
            flex-aj()
            
            color: #ffffff
            .money_sym {
                font(30)
            }
            .money_item {
                font(40)
                font-family:number-webfont;
            }
        }
        .limit_time {
            width: rem(88)
            height rem(88)
            bgUrl('upay/mogong/homePage/label.png')
            background-size: 100% 100%
            position: absolute;
            top: -2px;
            left: -2px;
            .limit {
                color: #573d2e
                font(24)
                transform rotateZ(-45deg)
            }
        }
    }
    // guwei样式
    .gw_charge {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 100;

        .account {
            width: rem(750);
            // width: 100%;
            height: rem(280);
            // background: url('../image/charge_bg.png') no-repeat center;
            bgUrl('upay/guwei/charge_bg.png')
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding-bottom: rem(10);
            position: relative;

            .account_info {
                // display: flex;
                // flex-direction column;
                // justify-content: flex-start;
                // align-items: center;
                text-align: center;
                font-size: rem(30);
                // margin-top :rem(20);
                height: rem(120);

                .ac_money {
                    font-weight: bold;
                    line-height: rem(36);
                }

                .ac_addticket {
                    font-size: rem(20);
                    font-weight: bold;
                    line-height: rem(40);
                }

                .ac_coining {
                    font-size: rem(20);
                    color: #686767;
                    line-height: rem(36);
                }
            }

            .close {
                position: absolute;
                top: rem(80);
                right: rem(52);
                color: #fff;
                .icon{
                    icon(60,60)
                }
            }
        }

        // 充值样式
        .cgblock {
            // margin-top: rem(10);
            background-color: #fff;
            padding: 0 rem(36) 0;

            ul {
                /* display flex */
                /* justify-content flex-start */
                /* align-items flex-start */
                /* flex-wrap wrap */
                display: block;
                // float left
                width: 100%;
                height: 100%;
                // overflow: auto;
                overflow-x: hidden;

                li:nth-child(3n+2 ) {
                    margin-right: rem(30);
                    margin-left: rem(30);
                }

                li {
                    float: left;
                    margin-bottom: rem(20);

                    div.charge_box {
                        height: rem(160);
                        width: rem(205);
                        // width: 30%;
                        background: #ffffff;
                        border: solid rem(3) #000000;
                        border-radius: rem(10);
                        overflow: hidden;
                        box-sizing: border-box;

                        .addticket {
                            font-size: rem(8);
                            // -webkit-transform: scale(0.6);
                            color: #f5922e;
                        }

                        div.charge_box_box {
                            // width 100%
                            position: relative;
                            z-index: 1000;
                            // padding: rem(2) 0 rem(8);
                            width: rem(205);
                            // width: 30%
                            height: rem(147);
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start;
                            align-items: center;
                            border: none;
                            box-sizing: border-box;

                            // .first-charge {
                            // font-size: rem(24);
                            // box-sizing: border-box;
                            // color: #ffffff;
                            // background-color: #f96267;
                            // padding-top: rem(4);
                            // display: inline-block;
                            // width: rem(110);
                            // height: rem(28);
                            // // padding rem(1) 0
                            // line-height: rem(28);
                            // text-align: center;
                            // position: absolute;
                            // top: rem(2);
                            // left: rem(-34);
                            // z-index: 1;
                            // transform: rotate(-45deg);
                            // }
                            .money {
                                font-size: rem(30);
                                color: #f5922e;
                                font-weight: bold;
                            }

                            .coining {
                                height: rem(54);
                                line-height: rem(54);
                                background-color: #f5922e;
                                font-size: rem(24);
                                color: #fff;
                                font-weight: bold;
                            }

                            span {
                                width: 100%;
                                display: flex;
                                justify-content: center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


