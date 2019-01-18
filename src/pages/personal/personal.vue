<template>
    <div class="personal">
        <!-- 顶部用户信息 -->
        <div class="top_user">
            <div class="user_info"  @click="toMenu('user')">
                <div class="user_name">{{user.user_name||'你好'}}</div>
                <div class="user_id">
                    <svg class="icon" >
                        <use xlink:href="#icon-H_IDhao"></use>
                    </svg> 
                    <span class="NUM">{{user.user_id}}</span> 
                    <span :style="{color:upayColor,borderColor:upayColor,}" class="copy" @click.stop="">复制</span>
                </div>
            </div>
            <div class="user_img">
                <img :src="user.headimgurl" alt="" class="user_iamge">
                <!-- <div class="level">lv7</div> -->
            </div>
            <div class="qrcode_icon" @click.stop="isPay=true">
                <img :src="`${$store.state.iots.bgUrl}default/qr_icon.png`" alt="">
            </div>
        </div>
        <!-- 会员卡信息 优惠券信息 -->
        <div class="mid_card">
            <div class="card" :style="{backgroundColor:upayColor}">
                <div class="card_coin" @click="toMenu('card')">
                    <div class="coin"><span class="bottom">{{unit||'余额'}}:</span><span class="NUM">{{userCard.coin/100}}</span></div>
                    <div class="deadline">有效期:<span class="NUM">{{userCard.indate.split(/-/g)[0] || 2200}}</span>年<span class="NUM">{{userCard.indate.split(/-/g)[1] || 12}}</span>月<span class="NUM">{{userCard.indate.split(/-/g)[2] || 31}}</span>日</div>
                </div>
                <div class="charge_btn" @click.stop="activeClick()" :style="{color:upayColor}">充值</div>
            </div>
            <div class="member">
                <div class="integral " @click="toMenu('integral')">
                    <span class="m_title">积分</span><span class="NUM">{{member.integral}}</span>
                </div>
                <div class="coupons" @click="toMenu('coupons')">
                    <span class="m_title" >卡券</span><span class="NUM">{{couponsLength}}张未使用</span>
                </div>
            </div>
        </div>
        <!-- 功能菜单 -->
        <div class="btm_list" >
            <div class="list" v-for="(item,index) in listData" :key="index" @click="toMenu(index)">
                <div class="list_title">
                    <svg class="icon" >
                        <use :xlink:href="svgUrl[index]"></use>
                    </svg>  
                    <span class="list_name">{{item}}</span>
                </div>
                <div class="list_more">
                    <span v-if="index===0">{{(store.address.substring(0,9)||store.province+store.city+store.area)+'...'}}</span>
                    <svg class="icon more" >
                        <use xlink:href="#icon-H_liebiao_jinru"></use>
                    </svg>  
                </div>
            </div>

        </div>
        <!--充值弹出框-->        
        <charge :isActive='isActive' @isClick="activeClick"></charge>
         <!-- 二维码弹窗 -->
        <qrcode :isPay='isPay' @payClick="payClick"></qrcode>
        <!-- 子路由 -->
        <div class="fixed">
            <transition>
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
import {mapState ,mapGetters ,mapMutations,mapActions } from 'vuex'
// import charge from '../com-components/charge/charge'
// import qrcode from '../com-components/qrcodePopup/'
// import comJS from '../../common/comJS/'
// import transition from '../../common/transition'
export default {
    name:'personal',
    data(){
        return{
            isActive:false,//充值弹窗
            isPay:false,
            upayColor:this.$store.state.iots.Color,
            user:this.$api.storage('userData'),
            store:this.$api.storage('storeData'),
            // userCard:this.$api.storage('cardData'),
            member:this.$api.storage('personalData'),
            listData:[
                '门店简介',
                '我的娃娃',
                '消费记录',
                '消息通知',
                '帮助反馈'
            ],
            svgUrl:[
                '#icon-H_wode_mendianjianjie',
                '#icon-H_wode_wodewawa',
                '#icon-H_wode_xiaofeijilu',
                '#icon-H_wode_xiaoxitongzhi',
                '#icon-H_wode_bangzhufankui'
            ],
            unit:this.$api.storage('unit'),
            coupons:this.$api.storage('coupons') ||[],//优惠券
        }
    },
    computed:{
        couponsLength:function(){
            return this.coupons.length
        },
        ...mapGetters({
            userCard:'card'
        })
    },
    components:{
        // charge,
        // qrcode,
        // transition
        
        
    },
    mounted(){
        console.log(this.userCard)
        // this.init();
    },
    methods:{
        /**
         * 初始化
         */
        init(){
            this.getMyCouponList(1)
        },
        // 点击关闭二维码弹框
        payClick() {
            this.isPay = !this.isPay
        },
        /**
         * 控制充值弹窗
         */
        activeClick(){
            this.isActive = !this.isActive
        },
        /**
         * 路由跳转
         */
        toMenu(index){
            switch(index){
                case 0:
                    this.$router.push({path:"/upay/personal/store"})
                    break;
                case 1:
                    this.$router.push({path:"personal/doll"})
                    break;
                case 2:
                    this.$router.push({path:"/upay/personal/expense"})
                    break;
                case 3:
                    this.$router.push({path:"personal/notice"})
                    break;
                case 4:
                    this.$router.push({path:"personal/help"})
                    break;
                // case 'coupons':
                //     this.$router.push({path:index})
                //     break;
                // case 'integral':
                //     this.$router.push({path:index})
                //     break;
                // case 'card':
                //     this.$router.push({path:index})
                //     break;
                default:
                    this.$router.push({path:index})
                    break;
            }
        },
        
        getMyCouponList(status=0) {
            let params = {
                status,
                store_id: this.$api.storage('deviceData').store_id ,
                mch_id: this.$api.storage('deviceData').mch_id,
                user_id: this.$api.storage('userData').user_id,
            }
            this.$api.postJson(this,'iot/coupon/lists', params, res => {
                let data = res.data.data;
                let date = new Date().getTime();
                let newData = [];
                data.forEach(el => {
                    el.cf = JSON.parse(el.cf);
                });
                data.forEach(el => {
                    let oldDate =new Date(el.cf.end_time);
                    if(oldDate -date >0){
                        newData.push(el);
                    }
                });
                this.coupons = newData;
                this.$api.storage('coupons',this.coupons)
            })

        },
        /**
         * 带参数进入子页面
         */
        routeJump(route,type){
            let path = route
            this.$router.push({
                path:path,
                query:{
                    data:{
                        type,
                    }
                }
            })
        },
        closeAPP(){
            comJS.closed();
        }
    }
}
</script>


<style scoped lang="stylus">
    @import '../../common/styl/public.styl';
    .personal{
    flex:1;
    flex-daj(column,center,flex-start)
    background-color: #fff;
    .top_user{
        flex-daj(row, flex-start, space-between);
        margin: rem(0) rem(30);
        padding: rem(50) rem(40) 0;
        height: rem(230);
        width: 100%;
        background-color: rgba(100, 100, 255, 0);
        text-align: center;
        position relative;
        >.user_img {
            position relative;
            z-index 10;
            flex-daj(column, center, center);
            >img {
                width: rem(130);
                height: rem(130);
                border-radius: 50%;
            }

            >.level {
                background-color: rgb(255, 115, 125);
                width: rem(100);
                height: rem(34);
                line-height: rem(34);
                color:#fff;
                border-radius:rem(17)
                margin-top rem(-10)
            }
        }
        >.user_info {
            text-align :left;
            >.user_name{
                margin-top rem(14)
                font-size:rem(50);
                margin-bottom rem(24)
                color:#333;
            }
            >.user_id{
                font-size:rem(30);
                color:#999;
                .icon{
                    icon(32,32)
                }
            }
            .copy{ 
                width:rem(80);
                height:rem(30);
                line-height:rem(30);
                display inline-block;
                font(20)
                text-align: center;
                border: rem(1) solid #fff;
                border-radius: rem(15)
            }

        }
        .qrcode_icon{
            position absolute;
            top 0;
            right 0;
            u-WH(100,100)
            flex-daj();
            img{
                width:100%;
                height:100%;
            }
        }
    }

    .mid_card{
        padding: 0 rem(30);
        .card{
            padding: 0 rem(30);
            u-WH(690,178)
            flex-daj(,flex-start,space-between);
            upayBg();
            border-radius: rem(20)
            color:#fff;
            .card_coin{
                font(30)
                margin-top rem(30)
                flex-daj(column,flex-start,);
                .coin{
                    flex-daj(,flex-end,);
                    span.bottom{
                        margin-bottom rem(-5)
                    }
                    span.NUM{ 
                        margin-left: rem(22)
                        u-font(60)
                    }
                    
                }
                .deadline{
                    margin-top: rem(20)
                    span.NUM{
                        margin 0 rem(4)
                    }
                }
            }
            .charge_btn{
                u-WH(200,60);
                font(30)
                margin-top rem(50)
                border-radius: rem(30);
                line-height: rem(60);
                color:$upayColor;
                text-align: center;
                background-color #fff;
            }
        }
        .member{
            margin rem(-28) auto 0;
            u-WH(630,172);
            border:rem(2) solid #eee
            border-radius: rem(10)
            padding rem(30)
            background-color #fff
            flex-daj(column, center,center);
            u-font(32)
            .integral , .coupons{
                width:100%;
                flex-daj(,center,space-between);
                .m_title{
                    u-font(28)
                }
            }
            .coupons{
                margin-top: rem(40)    
            }
            
        }
    }

    .btm_list{
        flex:1;
        overflow-y: scroll;
        width:100%;
        // height: rem(450)
        padding rem(20) rem(30) 0 
        u-font(32)
        div.list{
            width:100%;
            // height:rem(100);
            padding rem(34) rem(20)
            flex-daj(, center,space-between);
            .list_name{
                margin-left: rem(16)
            }
            .list_more{
                color:#999;
                u-font(28)
                .icon.more{
                    icon(14,24)
                    margin-left: rem(8)
                }
                
            }
        }
    }

    .icon{
        icon(32,32)    
    }
    
    
}
</style>


