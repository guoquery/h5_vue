<template>
    <div class="gw_container">
        <div class="top" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/top_bg.png)'}">
            <div class="user_infor">
                <router-link tag="div" class="user_img" :to="{path:'/upay/user'}">
                    <img v-if="user.headimgurl" :src="user.headimgurl" alt="">
                    <img v-else :src="upay.bgUrl+upay.imgurl+'/user_photo.jpg'" alt="">
                </router-link>
                <div class="user">
                    <h3>{{user.user_name}}</h3>
                    <p >{{unit||'币'}}：{{card.coin/100 || 0}}</p>
                    <!-- <p >{{store.mch_id=='zsdc'?'呱币':store.mch_id=='tyj'?'偶币':store.mch_id=='catchCu'?'咔咔币':'游戏币'}}：{{card.coin || 0}}</p> -->
                </div>
                <div class="buy" @click="isActive=true">
                    <div>点击购币</div>
                </div>
            </div>
        </div>
        <div class="middle" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/mid_bg.png)'}">
            <div class="crab"><img :src="upay.bgUrl+upay.imgurl+'/crab.png'" alt=""></div>
            <div class='code'>
                <sweep></sweep> 
            </div>
        </div>
        <div class="gw_foot" :style="{backgroundImage:'url('+upay.bgUrl+upay.imgurl+'/foot_bg.png)'}">
            <div class="foot">
                 <router-link tag="div" class="gw_home" :to="{path:'/upay/rank'}">
                    <svg class="icon" >
                        <use xlink:href="#icon-gw_zhaozi"></use>
                    </svg>  
                    
                    <span>排行榜</span>
                </router-link>
                <div class="gw_logo" :class="brand.name?(brand.name.length>4?'oj':''):''">
                    {{brand_name||brand.name}}
                    <!-- {{store.mch_id=='zsdc'?'斗爪':store.mch_id=='tyj'?'偶遇偶聚':store.mch_id=='catchCu'?'咔哧':'谷微'}} -->
                    <!-- <div class="dz">斗爪</div> -->
                    <!-- <div class="rank"><u>&nbsp排行榜&nbsp</u></div> -->
                    <!-- <div class="rank"></div> -->
                    <!-- <router-link tag="div" class="rank" :to="{path:'discover/rank'}">
                       排行榜
                    </router-link> -->
                    <!-- <div style='position:fixed;top:0;left:0;width:60px;color:red' onclick='javascript:localStorage.clear()'>清除缓存</div> -->
                </div>
   
                <router-link :to="{path:'/upay/personal'}" class="gw_my" tag="div" >
                    <svg class="icon"  >
                        <use xlink:href="#icon-gw_wode" ></use>
                    </svg>  
                    <span>我的</span>
                </router-link>
            </div>
        </div>
        <!-- 充值弹窗 -->
        <!-- <div v-if="chargeMask">
            <gwCharge @buyNow="buyNow" @closeNow="closeNow" :card="card"></gwCharge>
        </div> -->
        
        <!--充值弹出框-->        
        <charge :isActive='isActive' @isClick="activeClick"></charge>
    </div>
</template>
<script src='./home.js'></script>

<style lang="stylus" scoped>
@import '../../common/styl/public.styl';
// @import '../../../common/stylus/mixin.styl';
// .aa{
//     position fixed;
//     top:30%;
//     width:rem(750)
//     height:100px;
//     background:red;
// }
.gw_container {
    width: 100%;
    height: 100%;
    background-color: #ffa442;
    padding: rem(10) rem(28);
    display:flex;
    flex-direction column;
    justify-content space-between;
    align-items center;
    
    .top {
        margin: 0 auto;
        width: 100%;
        // width: rem(699);
        // height: rem(194);
        height:16%;
        // background: url('../image/top_bg.png') no-repeat center;
        bgUrl('upay/guwei/top_bg.png')
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .user_infor {
            width: 90%;
            // width: rem(632);
            height: rem(130);
            display: flex;
            justify-content: space-around;
            align-items: center;

            .user_img {
                width: rem(117);
                height: rem(117);
                border-radius: 50%;
                margin-right rem(10)
                img {
                    width: rem(117);
                    height: rem(117);
                    border-radius: 50%;
                }
            }

            .user {
                margin-left: rem(-36);
                font-size: rem(26);
                color: #fff;

                h3 {
                    padding: 0;
                    margin: 0;
                    margin-bottom: rem(26);
                }
            }

            .buy {
                // align-self baseline;
                    display flex;
                    justify-content center;
                    align-items center;
                    flex-direction column
                div {
                    width: rem(224);
                    height: rem(64);
                    line-height: rem(64);
                    flex:1;
                    background-color: #f83c3c;
                    color: #fff;
                    border-radius: rem(32);
                    font-size: rem(40);
                    text-align: center;
                }
            }
        }
    }

    .middle {
        margin: rem(6) auto 0;
        // width: rem(699);
        width: 100%;
        // height: rem(816);
        height:67%;
        // background: url('../image/mid_bg.png') no-repeat center;
        bgUrl('upay/guwei/mid_bg.png')
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        // 螃蟹图片
        .crab {
            margin-top: rem(20);
            // width: rem(660);
            width: 94%;
            // height: rem(360);
            height: 44%;
            img {
                width: 100%;
                height: 100%;
            }
        }

        // 二维码部分
        .code {
            flex:1;
            flex-daj(column,center,center)
            height:100%;
            width:100%;
            #sweep.sweep{
                margin-top rem(-80)
                height 100%;
                padding:3% 0
                flex-ajd()
                justify-content: flex-start !important;


            }
            // flex:1;
            // // text-align: center;
            // // margin-top: rem(-64);
            // margin-top: -7.6%;
            // display: flex;
            // flex-direction: column;
            // justify-content: flex-start;
            // align-items: center;
            // // overflow hidden
            // .qr_code {
            //     // text-align: center;
            //     // width: rem(370);
            //     // height: rem(370);
            //     // margin-top: rem(-64);
            //     // background-color: red;
            //     display: flex;
            //     flex-direction: column;
            //     justify-content: center;
            //     align-items: center;
            //     overflow hidden
            //     #qrcode {
            //     /*opacity: 0*/
            //     // display: flex;
            //     // align-items: center;
            //     // justify-content: center;
            //     // margin: auto;
            //     /*margin-top: 4rem;*/
            //     /*width: 100vw;
            //     height: 100vh;*/
            //     // height:rem(360);
            //     // width:rem(360);
            //         img{
            //             position absolute;
            //         }
            //     }
            // }

            // .tips {
            //     text-align: center;
            //     font-size: rem(20);
            //     // -webkit-transform : scale(0.84,0.84)
            // }
        }
    }

    .gw_foot {
        // position: fixed;
        // bottom: 0;
        // left: 50%;
        // transform: translateX(-50%);
        // margin: rem(8) auto 0;
        // align-items: center;
        // width: rem(699);
        width: 100%;
        height: 15%;
        // height: rem(180);
        // background: url('../image/foot_bg.png') no-repeat center;
        bgUrl('upay/guwei/foot_bg.png')
        
        background-size: 100% 100%;

        .foot {
            // width: rem(699);
            width: 100%;
            // height: rem(180);
            height: 100%;
            margin:0 auto;
            font-size: rem(32);
            color: #744a22;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:0 rem(76)
            .gw_logo{
                align-self baseline
                padding: 0 rem(20);
                margin-left rem(-8);
                font-size: rem(40);
                font-weight 700;
                align-self center;
                color #744a22;
                // margin-bottom rem(-10);
                
                // line-height :rem(60);
                // .dz{
                //     font-size: rem(70);
                //     align-self center;
                //     // margin-left rem(8);
                //     margin-bottom rem(-10);
                // }  
            }
            .oj{
                font-size: rem(35)
                // color:#ffa442;
            }
            .gw_home, .gw_my {
                // height:rem(126);
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                margin-top: rem(-8);
                color #744a22;
                font-weight 600;
                .icon{
                    
                    icon(60,66)
                    // background-color #744a22
                    

                }
                

                span {
                    margin-top: rem(6);
                    color #744a22;
                    font-weight 600;
                }
            }
            .gw_home{
                margin-left rem(-12);
            }
            .gw_my{
                margin-right rem(4)
            }
        }
       
    }
    
    //  svg{
    //                 fill #744a22;

    //             }
  
}
.mask {
    // position relative
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;

    // .gw_charge {
    //     position: fixed;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 100;

    //     .account {
    //         width: rem(750);
    //         // width: 100%;
    //         height: rem(280);
    //         // background: url('../image/charge_bg.png') no-repeat center;
    //         bgUrl('upay/guwei/charge_bg.png')
    //         background-size: 100% 100%;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: flex-end;
    //         align-items: center;
    //         padding-bottom: rem(10);
    //         position: relative;

    //         .account_info {
    //             // display: flex;
    //             // flex-direction column;
    //             // justify-content: flex-start;
    //             // align-items: center;
    //             text-align: center;
    //             font-size: rem(30);
    //             // margin-top :rem(20);
    //             height: rem(120);

    //             .ac_money {
    //                 font-weight: bold;
    //                 line-height: rem(36);
    //             }

    //             .ac_addticket {
    //                 font-size: rem(36);
    //                 font-weight: bold;
    //                 line-height: rem(40);
    //             }

    //             .ac_coining {
    //                 font-size: rem(20);
    //                 color: #686767;
    //                 line-height: rem(36);
    //             }
    //         }

    //         .close {
    //             position: absolute;
    //             top: rem(80);
    //             right: rem(52);
    //             color: #fff;
    //             .icon{
    //                 icon(60,60)
    //             }
    //         }
    //     }

    //     // 充值样式
    //     .cgblock {
    //         // margin-top: rem(10);
    //         background-color: #fff;
    //         padding: 0 rem(36) 0;

    //         ul {
    //             /* display flex */
    //             /* justify-content flex-start */
    //             /* align-items flex-start */
    //             /* flex-wrap wrap */
    //             display: block;
    //             // float left
    //             width: 100%;
    //             height: 100%;
    //             // overflow: auto;
    //             overflow-x: hidden;

    //             li:nth-child(3n+2 ) {
    //                 margin-right: rem(30);
    //                 margin-left: rem(30);
    //             }

    //             li {
    //                 float: left;
    //                 margin-bottom: rem(20);

    //                 div.charge_box {
    //                     height: rem(160);
    //                     width: rem(205);
    //                     // width: 30%;
    //                     background: #ffffff;
    //                     border: solid rem(3) #000000;
    //                     border-radius: rem(10);
    //                     overflow: hidden;
    //                     box-sizing: border-box;

    //                     .addticket {
    //                         font-size: rem(8);
    //                         // -webkit-transform: scale(0.6);
    //                         color: #f5922e;
    //                     }

    //                     div.charge_box_box {
    //                         // width 100%
    //                         position: relative;
    //                         z-index: 1000;
    //                         // padding: rem(2) 0 rem(8);
    //                         width: rem(205);
    //                         // width: 30%
    //                         height: rem(147);
    //                         display: flex;
    //                         flex-wrap: wrap;
    //                         justify-content: flex-start;
    //                         align-items: center;
    //                         border: none;
    //                         box-sizing: border-box;

    //                         // .first-charge {
    //                         // font-size: rem(24);
    //                         // box-sizing: border-box;
    //                         // color: #ffffff;
    //                         // background-color: #f96267;
    //                         // padding-top: rem(4);
    //                         // display: inline-block;
    //                         // width: rem(110);
    //                         // height: rem(28);
    //                         // // padding rem(1) 0
    //                         // line-height: rem(28);
    //                         // text-align: center;
    //                         // position: absolute;
    //                         // top: rem(2);
    //                         // left: rem(-34);
    //                         // z-index: 1;
    //                         // transform: rotate(-45deg);
    //                         // }
    //                         .money {
    //                             font-size: rem(30);
    //                             color: #f5922e;
    //                             font-weight: bold;
    //                         }

    //                         .coining {
    //                             height: rem(54);
    //                             line-height: rem(54);
    //                             background-color: #f5922e;
    //                             font-size: rem(24);
    //                             color: #fff;
    //                             font-weight: bold;
    //                         }

    //                         span {
    //                             width: 100%;
    //                             display: flex;
    //                             justify-content: center;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // }
}
.gw-enter-active,.gw-leave-active {
        transition: all .3s linear;
}
.gw-leave-active {
      // opacity: 1;
    transform:translateY(100%)
}
.gw-enter-active {
      // opacity: 1;
    transform:translateY(-100%)
}
</style>
