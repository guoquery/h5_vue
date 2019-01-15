export default{     
        // 连接成功时
        connected(url) {
            console.log('连接成功 ：' + url);
            Open(opened, openFailed);
        },

        // 连接失败时
        connectFailed() {
            console.log('连接失败');
        },

        // 打开设备成功后
        opened() {
            console.log('设备已启动！');
            $('#reset').attr('disabled', true);
            currentStep = 0;
            start();
        },
        // 打开设备失败后
        openFailed(message) {
            //alert(message.Code + ' : ' + message.Description);
        },

        // 扫描成功开始后
        started() {
            console.log('扫描已开始');
            $('#reset').attr('disabled', false);
        },
        // 扫描打开失败
        startFailed(message) {
            if (message.Code === 'BRMS2011') {
                start();
                return;
            }
            console.log(message.Code + ' : ' + message.Description);
            $('#reset').attr('disabled', false);
        },

        // 成功停止扫描后
        stopped() {
            //alert('扫描已停止');
            $('#reset').attr('disabled', false);
        },
        // 停止扫描失败后
        stopFailed(message) {
            console.log(message.Code + ' : ' + message.Description);

            $('#reset').attr('disabled', true);
        },

        // 扫描中预览
        onPreview(image) {
            $('#preview').attr('src', 'data:image/png;base64,' + image.ImageData);
        },

        validationFailed() {
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
        },
        // var isValidationPassed = true;
        // 捕获到指纹
        onCaptured(data) {
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
                        fingerprintHub.invoke('stop').done((data) {
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
        },


        // 手掌错误
        onWrongHand() {
            // fingerprintHub.off('OnWrongCapture');
            // alert('手掌错误'+currentStep);
            if(currentStep==2){
                return
            }else{
                setTimeout(Start(steps[currentStep].Value, started, startFailed), 1500);
            }
        },

        start(par) {
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

        },

        stop() {
            $('#reset').attr('disabled', true);
            Stop(stopped, stopFailed);
        },

        reset() {
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



}