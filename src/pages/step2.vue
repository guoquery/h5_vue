<template>
    <div class="step2">
        <register-step stepIndex='2' @submit="submit()" :nextShow='nextShow' @StartFinger="StartFinger" v-show="panelShow" :panelShow="panelShow"></register-step>  
        <!-- 指纹缺失选择 -->
        <div class="fingerLost">
            <div class="fingerLostLeft">
                <div v-for="(item,index) in fingerTypeL" :key="index" >
                    <input :id="`${item}_missing`" v-model="checkArr[index]" @change='fingerMiss(index)' class="figters" type="checkbox" :disabled='(index<4&&currentStep>0)||currentStep>2'>
                </div>
            </div>
            <div class="fingerLostBett"><span class="fa fa-question-circle-o" style="font-size: 34px;"></span></div>
            <div class="fingerLostRight">
                <div v-for="(item,index) in fingerTypeR" :key="index" >
                    <input :id="`${item}_missing`" v-model="checkArr[index+5]" @change='fingerMiss(index+5)' class="figters" type="checkbox" :disabled='(index>0&&currentStep>1)||currentStep>2'>
                </div>
            </div>
        </div>
        <!-- 指纹图片显示 -->
        <div class="gingerIMG" :style="{height:fingerImgHeight}" style='margin-top:30px;'>
            <!-- 左手图片显示及质量显示 -->
            <div class="left_finger_box">
                <div class="left_finger_l" style="">
                        <img id="fp1" style="" alt="">
                        <div class="" style="" v-show="!checkArr[0]">
                            <span id="fpq1" style="color:#333"></span>
                        </div>
                    </div>

                    <div class="left_finger_l">
                        <img id="fp2" alt="">
                        <div v-show="!checkArr[1]">
                            <span id="fpq2" style="color:#333"></span>
                        </div>
                    </div>

                    <div class="left_finger_l">
                        <img id="fp3" alt="">
                        <div v-show="!checkArr[2]">
                            <span id="fpq3" style="color:#333"></span>
                        </div>
                    </div>
                    <div class="left_finger_l">
                        <img id="fp4" alt="">
                        <div v-show="!checkArr[3]">
                            <span id="fpq4" style="color:#333"></span>
                        </div>
                    </div> 
                    <div class="tow_hus tow_hus_left" style="">
                        <img id="fp9" style="" alt="">
                        <div style="" v-show="!checkArr[4]">
                            <span id="fpq9" style="color:#333"></span>
                        </div>
                    </div>
            </div>
             <!-- 右手图片显示及质量显示 -->
            <div class="right_finger_box">
                <div class="tow_hus tow_hus_right" style="">
                    <img id="fp10" style="width:995; height:99%;" alt="">
                    <div style="" v-show="!checkArr[5]">
                        <span id="fpq10" style="color:#333;"></span>
                    </div>
                </div>
                <div class="right_finger_r">
                    <img id="fp5" alt="">
                    <div v-show="!checkArr[6]">
                        <span id="fpq5" style="color:#333"></span>
                    </div>
                </div>

                <div class="right_finger_r" style="">
                    <img id="fp6" alt="">
                    <div v-show="!checkArr[7]">
                        <span id="fpq6" style="color:#333"></span>
                    </div>
                </div>

                <div class="right_finger_r">
                    <img id="fp7" alt="">
                    <div v-show="!checkArr[8]">
                        <span id="fpq7" style="color:#333"></span>
                    </div>
                </div>

                <div class="right_finger_r">
                    <img id="fp8" alt="">
                    <div v-show="!checkArr[9]">
                        <span id="fpq8" style="color:#333"></span>
                    </div>
                </div>
            </div>
        </div>    
        <!-- 指纹图片对于的字母图 -->
        <div class="fingerLetter">
            <!-- 左手对于的字母图 -->
            <div class="leftfingerLetter">
                <div v-for="(item,index) in fingerLABC" :key="index">
                    <p> {{item}}</p>
                </div>
            </div>
            <!-- 右手对应的字母图 -->
            <div class="rightfingerLetter">
                <div v-for="(item,index) in fingerRABC" :key="index">
                    <p> {{item}}</p>
                </div>
            </div>
        </div>
        <!-- 手掌及画布 -->
        <div class="handCanvas">
            <!-- 左手 -->
            <div class="leftHandfinger">
                <div class="leftHand" style="">
                    <div class="wordsbox">
                        <div class="words" v-for="(item,index) in fingerLABC" :key="index">
                                {{item}}
                        </div>
                    </div>
                    <img src="../../assets/images/leftHand.png" alt="">

                    <div v-for="(item,index) in fingerTypeL" :key="index" :id="item">
                       
                    </div>
                </div>
            </div>
            <!-- 画布 -->
            <div class="fingerCanvas">
                <img id="preview" style="" alt=""/>
            </div>
            <!-- 右手 -->
            <div class="rightHandfinger">
                <div class="rightHand" style="">
                     <div class="wordsbox">
                        <div class="words" v-for="(item,index) in fingerRABC" :key="index">
                                {{item}}
                        </div>
                    </div>
                    <img src="../../assets/images/rightHand.png" alt="">
                    <div v-for="(item,index) in fingerTypeR" :key="index" :id="item"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // import {} from "../../api/jquery.step.min.js";
    // import app from "../../../static/js/fingerprint2.js";
    // import {} from "../../../static/js/jquery.signalR-2.0.3.min.js";
    import RegisterStep from "../../components/registerStep/registerStep.vue";
    export default {
        data() {
            return {
                panelShow:'true',
                currentStep:0,
                nextShow:true,
                checkArr: [false, false, false, false, false, false, false, false, false, false],
                fingerType: ['left_little', 'left_ring', 'left_middle', 'left_index', 'left_thumb', 'right_thumb',
                    'right_index', 'right_middle', 'right_ring', 'right_little'
                ],
                fingerTypeL:['left_little', 'left_ring', 'left_middle', 'left_index', 'left_thumb'],
                fingerTypeR:['right_thumb','right_index', 'right_middle', 'right_ring', 'right_little'],
                missType: ['fp1', 'fp2', 'fp3', 'fp4', 'fp9', 'fp10', 'fp5', 'fp6', 'fp7', 'fp8'], //指纹数据
                fingerLABC:['A','B','C','D','E'],
                fingerRABC:['G','H','I','J','K'],
                start: {},
                stop: {},
                reset: {},
                time: '',
                fingerImgHeight:'100px',
                startBtn:'start', //'start' 'reset'
            };
        },
        components:{
            RegisterStep
        },
        mounted() {
            this.fingerImgHeight = (window.innerWidth * 0.075) +'px'
            // this.$nextTick(() => {
            //     console.log("app>>>>>>>>>>>>>>>",app,$)
            //     this.init();
            // })
        },
        destroyed() {
            function stopped() {
                //alert('扫描已停止');    
            }
            // 停止扫描失败后
            function stopFailed(message) {
            }
            Stop(stopped, stopFailed);
            CloseAAAAA();

        },
        created() {
            window.addEventListener('beforeunload', e => {
                 function stopped() {
                    //alert('扫描已停止');    
                }
                // 停止扫描失败后
                function stopFailed(message) {
                }
                Stop(stopped, stopFailed);
                CloseAAAAA();
            });
        },
        methods: {
            // 刷新事件
            refresh() {
                // fingerprintHub.invoke('close')
                this.$router.go(0);
            },
            // 点击开始
            StartFinger(){
                if(this.startBtn ==='start'){
                    this.DisableFingers('left')
                    this.DisableFingers('right')
                    this.DisableFingers()
                    alert(111)
                    // this.startBtn = 'reset'
                    this.init()
                }else if(this.startBtn ==='reset'){
                    this.resetStart();
                    this.startBtn = 'start'
                }
            },
            init() {
                let that = this;
                $(function () {
                    that.start = start; //保存start
                    that.stop = stop; // 保存stop
                    that.reset = reset; // reset
                    currentStep = 0;
                    that.currentStep = 0;
                    $('#reset').attr('disabled', true);
                    $('.figters').change(function () {
                        // fingerprintHub.off('OnCapture');
                        // fingerprintHub.on('OnCapture',onCaptured);
                        SetMissingFingerCss(this);
                    });

                    Connect(connected, connectFailed, onPreview, onCaptured, onWrongHand);
                    setTimeout(() => {
                        // SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_Yellow);
                        // SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_Yellow);
                        // SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_Yellow);
                        // SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_Yellow);
                    }, 800);

                });

                // 连接成功时
                function connected(url) {
                    console.log('连接成功 ：' + url);
                    Open(opened, openFailed);
                }

                // 连接失败时
                function connectFailed() {
                    console.log('连接失败');
                }

                // 打开设备成功后
                function opened() {
                    console.log('设备已启动！');
                    $('#reset').attr('disabled', true);
                    currentStep = 0;
                    start();
                }
                // 打开设备失败后
                function openFailed(message) {
                    //alert(message.Code + ' : ' + message.Description);
                }

                // 扫描成功开始后
                function started() {
                    console.log('扫描已开始');
                    $('#reset').attr('disabled', false);
                }
                // 扫描打开失败
                function startFailed(message) {
                    if (message.Code === 'BRMS2011') {
                        start();
                        return;
                    }
                    console.log(message.Code + ' : ' + message.Description);
                    $('#reset').attr('disabled', false);
                }

                // 成功停止扫描后
                function stopped() {
                    //alert('扫描已停止');
                    $('#reset').attr('disabled', false);
                }
                // 停止扫描失败后
                function stopFailed(message) {
                    console.log(message.Code + ' : ' + message.Description);

                    $('#reset').attr('disabled', true);
                }

                // 扫描中预览
                function onPreview(image) {
                    $('#preview').attr('src', 'data:image/png;base64,' + image.ImageData);
                }

                function validationFailed() {
                    that.$message({
                        message: that.$t('message.finger_quaity'),
                        type: "warning"
                    })
                    // alert("Low quality, try again");           
                    if (currentStep === 0) {
                        ResetLeftIndexResult();
                        ResetLeftMiddleResult();
                        ResetLeftRingResult();
                        ResetLeftLittleResult();
                    } else if (currentStep === 1) {
                        ResetRightIndexResult();
                        ResetRightMiddleResult();
                        ResetRightRingResult();
                        ResetRightLittleResult();                        
                    } else if (currentStep === 2) {
                        ResetLeftThumbResult();
                        ResetRightThumbResult();
     
                    }
                    setTimeout(start, 1000);
                }
                var isValidationPassed = true;
                // 捕获到指纹
                function onCaptured(data) {
                    alert('OnCapture'+currentStep)
                    isValidationPassed = true;
                    fingerprintHub.off('OnCapture');
                    // fingerprintHub.on('OnCapture',onCaptured);
                    // alert('onCaptured')          // 
                    var index;//取捕获数据数组里面值
                    if (currentStep === 0) {
                        // alert("currentStep0")
                        index = 0;
                        if (!document.getElementById('left_little_missing').checked) {
                            LeftLittleResult.Data = data.Fingerprints[index].ImageData;
                            LeftLittleResult.Quality = data.Fingerprints[index].ImageQuality;
                            LeftLittleResult.State = FingerState_normal;
                            $('#fpq1').html('Q' + LeftLittleResult.Quality);
                            $('#fp1').attr('src', 'data:image/png;base64,' + LeftLittleResult.Data);
                            SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_Green);
                            
                            if (LeftLittleResult.Quality < minimumQuality) {
                                LeftLittleResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                                
                            }
                            
                            index++;
                        }
                        if (!document.getElementById('left_ring_missing').checked) {
                            LeftRingResult.Data = data.Fingerprints[index].ImageData;
                            LeftRingResult.Quality = data.Fingerprints[index].ImageQuality;
                            LeftRingResult.State = FingerState_normal;
                            $('#fpq2').html('Q' + LeftRingResult.Quality);
                            $('#fp2').attr('src', 'data:image/png;base64,' + LeftRingResult.Data);
                            SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_Green);
                            
                            if (LeftRingResult.Quality < minimumQuality) {
                                LeftRingResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                                
                            }
                            index++;
                        }
                        if (!document.getElementById('left_middle_missing').checked) {
                            LeftMiddleResult.Data = data.Fingerprints[index].ImageData;
                            LeftMiddleResult.Quality = data.Fingerprints[index].ImageQuality;
                            LeftMiddleResult.State = FingerState_normal;
                            $('#fpq3').html('Q' + LeftMiddleResult.Quality);
                            $('#fp3').attr('src', 'data:image/png;base64,' + LeftMiddleResult.Data);
                            SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_Green);
                            if (LeftMiddleResult.Quality < minimumQuality) {
                                LeftMiddleResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }

                        if (!document.getElementById('left_index_missing').checked) {
                            LeftIndexResult.Data = data.Fingerprints[index].ImageData;
                            LeftIndexResult.Quality = data.Fingerprints[index].ImageQuality;
                            LeftIndexResult.State = FingerState_normal;
                            $('#fpq4').html('Q' + LeftIndexResult.Quality);
                            $('#fp4').attr('src', 'data:image/png;base64,' + LeftIndexResult.Data);
                            SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_Green);
                            if (LeftIndexResult.Quality < minimumQuality) {
                                LeftIndexResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }
                        if (isValidationPassed) {
                            SetFadeLefts(false);
                            that.currentStep++;
                        } else {
                            validationFailed();
                        }
                    } else if (currentStep === 1) {
                        // alert("currentStep1")
                        index = 0;
                        if (!document.getElementById('right_index_missing').checked) {
                            RightIndexResult.Data = data.Fingerprints[index].ImageData;
                            RightIndexResult.Quality = data.Fingerprints[index].ImageQuality;
                            RightIndexResult.State = FingerState_normal;
                            $('#fpq5').html('Q' + RightIndexResult.Quality);
                            $('#fp5').attr('src', 'data:image/png;base64,' + RightIndexResult.Data);
                            SetFingerImage('right_index', FingerType_RightIndex, FingerColor_Green);
                            if (RightIndexResult.Quality < minimumQuality) {
                                RightIndexResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }

                        if (!document.getElementById('right_middle_missing').checked) {
                            RightMiddleResult.Data = data.Fingerprints[index].ImageData;
                            RightMiddleResult.Quality = data.Fingerprints[index].ImageQuality;
                            RightMiddleResult.State = FingerState_normal;
                            $('#fpq6').html('Q' + RightMiddleResult.Quality);
                            $('#fp6').attr('src', 'data:image/png;base64,' + RightMiddleResult.Data);
                            SetFingerImage('right_middle', FingerType_RightMiddle, FingerColor_Green);
                            if (RightMiddleResult.Quality < minimumQuality) {
                                RightMiddleResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }

                        if (!document.getElementById('right_ring_missing').checked) {
                            RightRingResult.Data = data.Fingerprints[index].ImageData;
                            RightRingResult.Quality = data.Fingerprints[index].ImageQuality;
                            RightRingResult.State = FingerState_normal;
                            $('#fp7').attr('src', 'data:image/png;base64,' + RightRingResult.Data);
                            $('#fpq7').html('Q' + RightRingResult.Quality);
                            SetFingerImage('right_ring', FingerType_RightRing, FingerColor_Green);
                            if (RightRingResult.Quality < minimumQuality) {
                                RightRingResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }

                        if (!document.getElementById('right_little_missing').checked) {
                            RightLittleResult.Data = data.Fingerprints[index].ImageData;
                            RightLittleResult.Quality = data.Fingerprints[index].ImageQuality;
                            RightLittleResult.State = FingerState_normal;
                            $('#fpq8').html('Q' + RightLittleResult.Quality);
                            $('#fp8').attr('src', 'data:image/png;base64,' + RightLittleResult.Data);
                            SetFingerImage('right_little', FingerType_RightLittle, FingerColor_Green);
                            if (RightLittleResult.Quality < minimumQuality) {
                                RightLittleResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }
                        if (isValidationPassed) {
                            SetFadeRights(false);
                            that.currentStep++;
                            // setTimeout(fingerprintHub.on('OnCapture',onCaptured), 10000);
                            
                        } else {
                            validationFailed();
                        }

                    } else if (currentStep === 2) {
                        // alert("currentStep"+currentStep)
                        index = 0;
                        if (!document.getElementById('left_thumb_missing').checked) {
                            if(!that.checkArr[4]&&!that.checkArr[5]){
                                index =1
                            }
                            LeftThumbResult.Data = data.Fingerprints[index].ImageData;
                            LeftThumbResult.Quality = data.Fingerprints[index].ImageQuality;
                            LeftThumbResult.State = FingerState_normal;
                            $('#fpq9').html('Q' + LeftThumbResult.Quality);
                            $('#fp9').attr('src', 'data:image/png;base64,' + LeftThumbResult.Data);
                            SetFingerImage('left_thumb', FingerType_LeftThumb, FingerColor_Green);
                            if (LeftThumbResult.Quality < minimumQuality) {
                                LeftThumbResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }

                        if (!document.getElementById('right_thumb_missing').checked) {
                            if(!that.checkArr[4]&&!that.checkArr[5]){
                                index =0
                            }
                            RightThumbResult.Data = data.Fingerprints[index].ImageData;
                            RightThumbResult.Quality = data.Fingerprints[index].ImageQuality;
                            RightThumbResult.State = FingerState_normal;
                            $('#fpq10').html('Q' + RightThumbResult.Quality);
                            $('#fp10').attr('src', 'data:image/png;base64,' + RightThumbResult.Data);
                            SetFingerImage('right_thumb', FingerType_RightThumb, FingerColor_Green);
                            SetFadeThumbs(false);
                            if (RightThumbResult.Quality < minimumQuality) {
                                RightThumbResult.State = FingerState_notset;
                                isValidationPassed = false;
                            }else{
                            

                            }
                            index++;
                        }
                        if (isValidationPassed) {
                            SetFadeThumbs(false);
                            that.currentStep++;
                            that.nextShow =false;
                        } else {
                            validationFailed();

                        }
                    }
                    index = 0;
                    if (isValidationPassed) {

                        if (currentStep < 2) {
                            if (currentStep === 0) {
                                DisableFinger('left_little_missing', true);
                                DisableFinger('left_ring_missing', true);
                                DisableFinger('left_middle_missing', true);
                                DisableFinger('left_index_missing', true);

                            }else if(currentStep ===1){
                                DisableFinger('right_index_missing', true);
                                DisableFinger('right_middle_missing', true);
                                DisableFinger('right_ring_missing', true);
                                DisableFinger('right_little_missing', true);
                            }

                            // alert('捕获数据后currentStep++')
                            currentStep++;
                            setTimeout(start, 1000);

                        } else {
                            // that.DisableFingers()
                            DisableFinger('left_thumb_missing', true);
                            DisableFinger('right_thumb_missing', true);
                            // currentStep = 0;
                            $('#reset').attr('disabled', false);
                            that.$nextTick(function(){
                                fingerprintHub.invoke('stop').done(function (data) {
                                    var json = $.parseJSON(data);
                                    if (json.HasSucceeded) {
                                        // alert('录完指纹，关闭仪器！')
                                    }
                                    else {
                                        // alert('录完指纹，关闭仪器失败！')
                                    }
                                });
                            })
                            return;
                            //  CloseAAAAA();
                        }
                    }
                    Stop(stopped, stopFailed);
                    // alert('stop')
                }


                // 手掌错误
                function onWrongHand() {
                    // fingerprintHub.off('OnWrongCapture');
                    // alert('手掌错误'+currentStep);
                    if(currentStep==2){
                        return
                    }else{
                        setTimeout(Start(steps[currentStep].Value, started, startFailed), 1500);
                    }
                }

                function start(par) {
                    // fingerprintHub.off('OnCapture');
                    // fingerprintHub.on('OnCapture',onCaptured);
                    $('#reset').attr('disabled', true);
                    // $('#desc').html('Put ' + steps[currentStep].Name + ' on device');
                    // 如果是第一步，则设置左四指
                    if (currentStep === 0) {
                        if (!that.checkArr[0]) {
                           SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_Yellow);
                        }
                        if (!that.checkArr[1]) {
                           SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_Yellow);
                        }
                        if (!that.checkArr[2]) {
                           SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_Yellow);
                        }
                        if (!that.checkArr[3]) {
                           SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_Yellow);
                        }
                        SetFadeLefts(true);
                        SetFadeRights(false);
                        SetFadeThumbs(false);
                        if (!that.checkArr[0]) {
                           StartFade('left_little', FingerType_LeftLittle);
                        }
                        if (!that.checkArr[1]) {
                           StartFade('left_ring', FingerType_LeftRing);
                        }
                        if (!that.checkArr[2]) {
                           StartFade('left_middle', FingerType_LeftMiddle);
                        }
                        if (!that.checkArr[3]) {
                           StartFade('left_index', FingerType_LeftIndex);
                        }
                        // SetMissing(false, false, false,false,false,false) 设置和检查左手缺失
                        SetMissing(false, false, that.checkArr[0], that.checkArr[1], that.checkArr[2], that.checkArr[3])
                        
                        if (that.checkArr[0] && that.checkArr[1] && that.checkArr[2] && that.checkArr[3]) {
                            that.RightMissingChecked();
                        }else{
                            setTimeout(Start(steps[currentStep].Value, started, startFailed), 800);
                        }
                    }

                    if (currentStep === 1) {
                        that.DisableFingers('left')
                        if (!that.checkArr[6]) {
                            SetFingerImage('right_index', FingerType_RightIndex, FingerColor_Yellow);
                            // StartFade('right_index', FingerType_RightIndex);
                        }
                        if (!that.checkArr[7]) {
                            SetFingerImage('right_middle', FingerType_RightMiddle, FingerColor_Yellow);
                        }
                        if (!that.checkArr[8]) {
                            SetFingerImage('right_ring', FingerType_RightRing, FingerColor_Yellow);
                        }
                        if (!that.checkArr[9]) {
                            SetFingerImage('right_little', FingerType_RightLittle, FingerColor_Yellow);
                        }
                        // 
                        SetFadeLefts(false);
                        SetFadeRights(true);
                        SetFadeThumbs(false);
                        if (!that.checkArr[6]) {
                            StartFade('right_index', FingerType_RightIndex);
                        }
                        if (!that.checkArr[7]) {
                            StartFade('right_middle', FingerType_RightMiddle);
                        }
                        if (!that.checkArr[8]) {
                            StartFade('right_ring', FingerType_RightRing);
                        }
                        if (!that.checkArr[9]) {
                            StartFade('right_little', FingerType_RightLittle);
                        }


                        SetMissing(false, false, false,false,false,false)
                        setTimeout(Start(steps[currentStep].Value, started, startFailed), 800);
                        setTimeout(that.fingerMiss('right'), 820);
                        //开始扫描前检查指纹缺失
                    }

                    if (currentStep === 2) {
                        that.DisableFingers('right')
                        if (!that.checkArr[4]) {
                            SetFingerImage('left_thumb', FingerType_LeftThumb, FingerColor_Yellow);
                        }
                        if (!that.checkArr[5]) {
                            SetFingerImage('right_thumb', FingerType_RightThumb, FingerColor_Yellow);
                        }
                        SetFadeLefts(false);
                        SetFadeRights(false);
                        SetFadeThumbs(true);
                        if (!that.checkArr[4]) {
                            StartFade('left_thumb', FingerType_LeftThumb);
                        }
                        if (!that.checkArr[5]) {
                            StartFade('right_thumb', FingerType_RightThumb);
                        }
                        SetMissing(false, false, false, false, false, false)
                        if (par) {
                            setTimeout(Start(Value, started, startFailed), 800);
                            // that.fingerMiss("thumb") //开始扫描前检查指纹缺失
                        } else {
                            setTimeout(Start(steps[currentStep].Value, started, startFailed), 800);     
                            if (that.checkArr[4] || that.checkArr[5]) {
                                that.fingerMiss("thumb") //开始扫描前检查指纹缺失
                            }         
                        }
                    }

                }

                function stop() {
                    $('#reset').attr('disabled', true);
                    Stop(stopped, stopFailed);
                }

                function reset() {
                    // CloseGreenBit() 
                    fingerprintHub.off('OnPreview');
                    fingerprintHub.off('OnCapture');
                    fingerprintHub.off('OnWrongCapture');
                    fingerprintHub.invoke('close')
                    // Stop(stopped, stopFailed);
                    $(".figters").prop("checked", "");
                    $(".left_finger").find("img").attr("src", "");
                    $(".left_finger").find("span").html("");
                    // that.checkArr = [false, false, false, false, false, false, false, false, false, false];
                    ResetLeftThumbResult();
                    ResetLeftIndexResult();
                    ResetLeftMiddleResult();
                    ResetLeftRingResult();
                    ResetLeftLittleResult();
                    ResetRightThumbResult();
                    ResetRightIndexResult();
                    ResetRightMiddleResult();
                    ResetRightRingResult();
                    ResetRightLittleResult();

                    currentStep = 0;
                    SetFadeAll(false);
                    SetFingerImage('left_thumb', FingerType_LeftThumb, FingerColor_Normal);
                    SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_Yellow);
                    SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_Yellow);
                    SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_Yellow);
                    SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_Yellow);

                    SetFingerImage('right_thumb', FingerType_RightThumb, FingerColor_Normal);
                    SetFingerImage('right_index', FingerType_RightIndex, FingerColor_Normal);
                    SetFingerImage('right_middle', FingerType_RightMiddle, FingerColor_Normal);
                    SetFingerImage('right_ring', FingerType_RightRing, FingerColor_Normal);
                    SetFingerImage('right_little', FingerType_RightLittle, FingerColor_Normal);

                    DisableFinger('left_thumb_missing', false);
                    DisableFinger('left_index_missing', false);
                    DisableFinger('left_middle_missing', false);
                    DisableFinger('left_ring_missing', false);
                    DisableFinger('left_little_missing', false);

                    DisableFinger('right_thumb_missing', false);
                    DisableFinger('right_index_missing', false);
                    DisableFinger('right_middle_missing', false);
                    DisableFinger('right_ring_missing', false);
                    DisableFinger('right_little_missing', false);

                    // that.init();

                }

            },
            //点击设置缺失手指
            fingerMiss(index) {
                let missType = this.missType;
                switch (index) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        SetFade(this.fingerType[index], !this.checkArr[index])
                        // if (!this.checkArr[index]) {
                        //     SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_Yellow);
                        //     StartFade(this.fingerType[index], this.fingerType[index]);
                        //     $("#" + missType[index]).attr('src', '');
                        //     $("#" + missType[index]).removeAttr('src');
                        //     // alert(666)
                        // } else {
                        //     SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                        //     $("#" + missType[index]).attr('src', 'static/images/FingerprintMissing_40x40.png');
                        // }
                        if (!this.checkArr[index]) {
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            // alert("2removowe")
                            $("#" + missType[index]).removeAttr('src');
                            
                        } else {
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            $("#" + missType[index]).attr('src', 'static/images/FingerprintMissing_40x40.png');
                        }
                        if (currentStep != 0) {
                            return;
                        } else {
                            if(!this.checkArr[index]){
                                SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                                // StartFade(this.fingerType[index], this.fingerType[index]);
                            }
                            console.log(currentStep, this.checkArr[3], this.checkArr[2], this.checkArr[1], this.checkArr[
                                0])
                            SetMissing(false, false, this.checkArr[3], this.checkArr[2], this.checkArr[1], this.checkArr[
                                0])
                            if (this.checkArr[3] && this.checkArr[2] && this.checkArr[1] && this.checkArr[0]) {
                                this.LeftMissingChecked();
                            }
                        }
                        break;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        SetFade(this.fingerType[index], !this.checkArr[index])
                        console.log(currentStep, this.checkArr[6], this.checkArr[7], this.checkArr[8], this.checkArr[9])
                        if (!this.checkArr[index]) {
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            // alert("2removowe")
                            $("#" + missType[index]).removeAttr('src');
                            
                        } else {
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            $("#" + missType[index]).attr('src', 'static/images/FingerprintMissing_40x40.png');
                        }
                        if (currentStep != 1) {
                            return;
                        } else {
                            if(!this.checkArr[index]){
                                SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_Yellow);
                                StartFade(this.fingerType[index], this.fingerType[index]);

                            }
                            SetMissing(false, false, this.checkArr[6], this.checkArr[7], this.checkArr[8], this.checkArr[
                                9])
                            if (this.checkArr[6] && this.checkArr[7] && this.checkArr[8] && this.checkArr[9]) {
                                this.RightMissingChecked();
                            }
                        }
                        break;
                    // case 'left':
                    //     SetMissing(false, false, this.checkArr[0], this.checkArr[1], this.checkArr[2], this.checkArr[
                    //             3])
                    //         if (this.checkArr[0] && this.checkArr[1] && this.checkArr[2] && this.checkArr[3]) {
                    //             this.RightMissingChecked();
                    //         }
                    //     break;
                    case 'right':
                        SetMissing(false, false, this.checkArr[6], this.checkArr[7], this.checkArr[8], this.checkArr[
                                9])
                            if (this.checkArr[6] && this.checkArr[7] && this.checkArr[8] && this.checkArr[9]) {
                                this.RightMissingChecked();
                            }
                        break;
                    case 'thumb':
                        if (this.checkArr[4] || this.checkArr[5]) {
                                this.ThumbMissingChecked();
                            }
                        break;
                    case 4: //左大拇指
                    case 5: //右大拇指
                        SetFade(this.fingerType[index], !this.checkArr[index])
                        if (!this.checkArr[index]) {
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            $("#" + missType[index]).removeAttr('src');
                        } else {
                            // alert('miss')
                            SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_DimGray);
                            $("#" + missType[index]).attr('src', 'static/images/FingerprintMissing_40x40.png');

                        }
                        if (currentStep != 2) {
                            return;
                        } else {
                            if(!this.checkArr[index]){
                                SetFingerImage(this.fingerType[index], this.fingerType[index], FingerColor_Yellow);
                                StartFade(this.fingerType[index], this.fingerType[index]);

                            }
                            console.log(currentStep, this.checkArr[4], this.checkArr[5])
                            //拇指不存在缺失，任何一个手指缺失，都需要更改指纹仪启动模式到Single模式
                            if (this.checkArr[4] || this.checkArr[5]) {
                                this.ThumbMissingChecked();
                            }
                        }
                        break;
                }
            },
            //检查是否四指丢失  左
            LeftMissingChecked() {
                let that = this;
                this.DisableFingers('left')
                $('#reset').attr('disabled', true);
                that.stop();
                SetFadeLefts(false);
                setTimeout(function () {
                    currentStep++;
                    setTimeout(that.start, 1000);

                }, 500);
            },
            //检查是否四指丢失  右
            RightMissingChecked() {
                let that = this;
                this.DisableFingers('right')
                Stop(function () {}, function () {});
                SetFadeRights(false);
                fingerprintHub.off('OnWrongCapture');
                setTimeout(function () {
                    currentStep++;
                    setTimeout(that.start, 800);
                }, 500);
            },
            //检查是否拇指丢失  
            ThumbMissingChecked() {
                let that = this;
                
                //两个手指都缺失，才停止闪烁，否则，单手指缺失，需要换模式打开设备
                if (document.getElementById('left_thumb_missing').checked && document.getElementById('right_thumb_missing').checked) {
                    this.DisableFingers()
                    // setTimeout(() => {
                        // }, 1000);
                    SetFadeThumbs(false);
                    // Stop(function () {}, function () {})
                    fingerprintHub.invoke('stop')
                    that.currentStep++
                    that.nextShow=false
                    // alert('close')
                    return;
                }
                Stop(function () {}, function () {});
                Start(1, function () {}, function () {})
                // setTimeout(Start(1,function(){}, function(){}), 10);
                return;

            },
            // 设置缺失或录取指纹后设置禁止选择
            DisableFingers(hands){
                if(hands==="left"){
                    for(let i = 0;i<4;i++){
                        DisableFinger(this.fingerType[i]+'_missing', true);
                    }
                }else if(hands==="right"){
                    for(let i = 6;i<10;i++){
                        DisableFinger(this.fingerType[i]+'_missing', true);
                    }
                }else{
                    DisableFinger(this.fingerType[4]+'_missing', true);
                    DisableFinger(this.fingerType[5]+'_missing', true);
                }

            },
            resetStart(){
                fingerprintHub.off('OnPreview');
                fingerprintHub.off('OnCapture');
                fingerprintHub.off('OnWrongCapture');
                fingerprintHub.invoke('close')
                // Stop(stopped, stopFailed);
                $(".figters").prop("checked", "");
                $(".left_finger").find("img").attr("src", "");
                $(".left_finger").find("span").html("");
                that.checkArr = [false, false, false, false, false, false, false, false, false, false];
                ResetLeftThumbResult();
                ResetLeftIndexResult();
                ResetLeftMiddleResult();
                ResetLeftRingResult();
                ResetLeftLittleResult();
                ResetRightThumbResult();
                ResetRightIndexResult();
                ResetRightMiddleResult();
                ResetRightRingResult();
                ResetRightLittleResult();

                currentStep = 0;
                SetFadeAll(false);
                SetFingerImage('left_thumb', FingerType_LeftThumb, FingerColor_Normal);
                SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_Yellow);
                SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_Yellow);
                SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_Yellow);
                SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_Yellow);

                SetFingerImage('right_thumb', FingerType_RightThumb, FingerColor_Normal);
                SetFingerImage('right_index', FingerType_RightIndex, FingerColor_Normal);
                SetFingerImage('right_middle', FingerType_RightMiddle, FingerColor_Normal);
                SetFingerImage('right_ring', FingerType_RightRing, FingerColor_Normal);
                SetFingerImage('right_little', FingerType_RightLittle, FingerColor_Normal);

                DisableFinger('left_thumb_missing', false);
                DisableFinger('left_index_missing', false);
                DisableFinger('left_middle_missing', false);
                DisableFinger('left_ring_missing', false);
                DisableFinger('left_little_missing', false);

                DisableFinger('right_thumb_missing', false);
                DisableFinger('right_index_missing', false);
                DisableFinger('right_middle_missing', false);
                DisableFinger('right_ring_missing', false);
                DisableFinger('right_little_missing', false);
                // this.init();
            },
            submit() {
                let params = {
                    CombinedTemplate: null,
                    MinimumNFIQ: 1,
                    Fingerprints: [
                        // 左小拇指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: LeftLittleResult.Data,
                            MinutiaesCount: 0,
                            Score: LeftLittleResult.Quality,
                            Quality: LeftLittleResult.Quality,
                            Type: 5,
                            State: LeftLittleResult.State
                        },
                        // 左无名指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: LeftRingResult.Data,
                            MinutiaesCount: 0,
                            Score: LeftRingResult.Quality,
                            Quality: LeftRingResult.Quality,
                            Type: 4,
                            State: LeftRingResult.State
                        },
                        // 左中指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: LeftMiddleResult.Data,
                            MinutiaesCount: 0,
                            Score: LeftMiddleResult.Quality,
                            Quality: LeftMiddleResult.Quality,
                            Type: 3,
                            State: LeftMiddleResult.State
                        },
                        // 左食指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: LeftIndexResult.Data,
                            MinutiaesCount: 0,
                            Score: LeftIndexResult.Quality,
                            Quality: LeftIndexResult.Quality,
                            Type: 2,
                            State: LeftIndexResult.State
                        },
                        // 左大拇指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: LeftThumbResult.Data,
                            MinutiaesCount: 0,
                            Score: LeftThumbResult.Quality,
                            Quality: LeftThumbResult.Quality,
                            Type: 1,
                            State: LeftThumbResult.State
                        },
                        // 右大拇指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: RightThumbResult.Data,
                            MinutiaesCount: 0,
                            Score: RightThumbResult.Quality,
                            Quality: RightThumbResult.Quality,
                            Type: 6,
                            State: RightThumbResult.State
                        },
                        // 右食指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: RightIndexResult.Data,
                            MinutiaesCount: 0,
                            Score: RightIndexResult.Quality,
                            Quality: RightIndexResult.Quality,
                            Type: 7,
                            State: RightIndexResult.State
                        },
                        // 右中指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: RightMiddleResult.Data,
                            MinutiaesCount: 0,
                            Score: RightMiddleResult.Quality,
                            Quality: RightMiddleResult.Quality,
                            Type: 8,
                            State: RightMiddleResult.State
                        },
                        // 右无名指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: RightRingResult.Data,
                            MinutiaesCount: 0,
                            Score: RightRingResult.Quality,
                            Quality: RightRingResult.Quality,
                            Type: 9,
                            State: RightRingResult.State
                        },
                        // 右小指
                        {
                            Extension: ".bmp",
                            ImageDataFormattedString: RightLittleResult.Data,
                            MinutiaesCount: 0,
                            Score: RightLittleResult.Quality,
                            Quality: RightLittleResult.Quality,
                            Type: 10,
                            State: RightLittleResult.State
                        }
                    ],
                    Ticket: api.storage("inforTickt")
                };

                api.postJson(this, "/api/BRMS/SaveFingerprint", params, res => {
                    if (res.data.Result === true) {
                        api.storage("fingerTickt", res.data.Data);
                        this.$router.push('/applicant/register' + '/step3');
                    } else {
                        this.$message.error({
                            message: res.data.Message
                        }); 
                    }
                });
            },
        },
        computed:{
            setDisableL:function(index){
                // alert(index)
                if(index<4){
                    if(this.currentStep>0){
                        return true
                    }
                }else if(index===4){
                    if(this.currentStep>2){
                        return true
                    }
                }else{
                    return false
                }
                
            },
            setDisableR(index){
                if(1<index){
                    if(this.currentStep>1){
                        return true
                    }
                }else if(index===0){
                    if(this.currentStep>2){
                        return true
                    }
                }else{
                    return false
                }
                
            },
        }
    };
</script>,

<style lang="less" scoped>
    @import '../../style/rem.less';
    .step2 {
        width: 100%;
        margin-bottom: 20px;
        border:1px solid #ddd;
        // #hand {
        //     background: url("../../assets/images/BigTowHand_713x311.png");
        //     width: 713px;
        //     height: 311px;
        //     position: absolute;
        //     bottom: 0px;
        // }

        #left_thumb,
        #left_index,
        #left_middle,
        #left_ring,
        #left_little,
        #right_thumb,
        #right_index,
        #right_middle,
        #right_ring,
        #right_little {
            width: 65px;
            height: 120px;
            background: url("../../assets/images/BigLeftIndex_DimGray_65x120.png");
        }

        #left_thumb {
            background: url("../../assets/images/BigLeftThumb_DimGray_65x120.png");
            position: absolute;
            left: 283px;
            top: 272px;
        }

        #right_thumb {
            position: absolute;
            left: 364px;
            top: 272px;
            background-image: url("../../assets/images/BigRightThumb_DimGray_65x120.png");
        }


        //    .logingReset{
        //     padding: 6px 10px;
        //     position: absolute;
        //     top: 3px;
        //     right: 70px;   
        //    }
        .refresh {
            padding: 6px 10px;
            position: absolute;
            top: 3px;
            right: 70px;
        }
        img[src=""],img:not([src]){opacity:0;}
        .preview{
            border:3px solid yellow !important;
        }
        // ----------------------------------------------------
        .fingerLost{
            display: flex;
            background-color: rgb(227, 227, 227);
            padding-top:8px;
            .fingerLostLeft,.fingerLostRight{
                width:42%;
                display:flex;
                justify-content:space-between;
                >div{
                    width:20%;
                    text-align: center;
                    >input{
                        -webkit-appearance:none;background-color: white;
                    }
                    >input[type=checkbox]:checked:after {
                    content: "Ⅹ";
                    font-size: 20px;
                    font-weight:1000;
                    font-weight:bold;
                    }
                }
            }
            .fingerLostBett{
                width:16%;
                text-align: center;
            }
        }
        .gingerIMG{
            display:flex;
            justify-content: space-between;
            .left_finger_box,.right_finger_box{
                width:42%;
                display: flex;
                justify-content: space-around;
                &>div{
                    width:25%;
                    margin-right:5px;
                    box-sizing: border-box;
                    border:1px solid #bbb;
                    height:100%;
                    position:relative;
                    &>img{
                        height:100%;
                        width:100%;
                    }
                    &>div{
                        width: 43%;
                        height: 25%;
                        background: #ff9800;
                        position: absolute;
                        top: 0;
                        right: 0;
                        padding-top: 5%;
                        text-align: center;
                        box-sizing: border-box;
                        &>span{
                            font-size: 0.8vw;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .fingerLetter{
            // border:1px solid red;
            display: flex;
            justify-content:  space-between;
            .leftfingerLetter,.rightfingerLetter{
                width:42%;
                // border:1px solid red;
                display: flex;
                justify-content:space-around;
                div{
                    // width:25%;
                    margin-right:5px;
                    box-sizing: border-box;
                    p{
                        // width:50%;
                        // height:50px;
                        // width:rem(5px);
                        // height:rem(5px);
                        .wh(30);
                        .flex-daj();
                        border-radius: 50%;
                        // margin-left:25%;
                        text-align: center;
                        border:1px solid #bbb;
                        // line-height: 50px;
                        margin-top:20px;
                        color: #101010;
                        // font-size: 30px;
                        font-size: 1rem;
                        font-weight: 800;;
                    }
                }
            }

        }
        .handCanvas{
            display: flex;
            justify-content: space-around;
            min-height:200px;
            margin-top:50px;
            .leftHandfinger{
                width:25%;
                min-height:200px;
                margin:auto;
                
                .leftHand{
                    height:100%;
                    margin-top:200px;
                    position: relative;
                    margin-left: 17%;
                    img{
                        width:80%;
                        height:80%;
                    }
                    
                }
                #left_little,#left_ring,#left_middle,#left_index,#left_thumb{
                    position:absolute;
                    background-size:100% 100% !important;  
                    background-repeat:no-repeat !important;
                    width: 16%;
                    height: 40%;
                    top: 0;

                }
                #left_little{
                    // width: 15%;
                    // height:30%;
                    top: -6%;
                    left:-1.5%;
                }
                #left_ring{
                    // width: 16%;
                    // height: 24%;
                    top: -32%;
                    left: 15%;
                }
                #left_middle{
                    // height: 35%;
                    top: -40%;
                    left: 31.5%;

                }
                #left_index{
                    top: -28%;
                    left: 48.5%;
                }
                #left_thumb{
                    top: 25%;
                    left: 65%;
                }
                
            }
            .fingerCanvas{
                width:50%;
                border:1px solid #ddd;
                text-align: center;
                line-height: 100%;
                img{
                    // margin-top:10%;
                }
            }
            .rightHandfinger{
                width:25%;
                min-height:200px;
                margin:auto; 
                .rightHand{
                    height:100%;
                    margin-top:200px;
                    position: relative;
                    margin-left: 17%;
                    img{
                        width:80%;
                        height:80%;
                    }
                    
                }
                #right_little,#right_ring,#right_middle,#right_index,#right_thumb{
                    position:absolute;
                    background-size:100% 100% !important;  
                    background-repeat:no-repeat !important;
                    width: 16%;
                    height: 40%;
                    top: 0;

                }
                #right_thumb{
                   top: 25%;
                   left: -1.5%;
                }
                #right_little{
                    // width: 15%;
                    // height:30%;
                    top: -6%;
                    left: 65.5%;
                }
                #right_ring{
                    // width: 16%;
                    // height: 24%;
                   top: -32%;
                   left: 49%;
                }
                #right_middle{
                    // height: 35%;
                    top: -40%;
                    left: 32.5%;

                }
                #right_index{
                    top: -28%;
                    left: 16%;
                }
            }
            .wordsbox{
                        width:100%;
                        height:20%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        .words{
                            // display: flex;
                            // justify-content: center;
                            // align-items: center;
                            // width: 16%;
                            // height: 10%;.wh(20);
                            .wh(20);
                            .flex-daj();
                            font-size: 0.8rem;
                            margin:-60px 0 0 0;
                            text-align: center;
                            border:1px solid #ddd;
                            border-radius: 50%;
                            margin-top: -80%;
                            margin-left: -20%;
                        }
                    }
        }   
         .figters {
            // position: relative;
            width: 27px;
            height: 27px;
            background-color: aliceblue;
            // left: 17px;
            // top: 30px;
        }

    }
</style>