var url = 'http://localhost:30000';
var fingerprintHub;

// 指纹录入模式
var steps = [ { Name: 'Left4', Value: 22 }, { Name: 'Right4', Value: 23 }, { Name: 'Thumbs', Value: 21 },{ Name: 'Single', Value: 1 }];

// 当前录入步骤 0——left4,1——right4,2——Thumbs
var currentStep = 0;

// 最低录入质量
var minimumQuality = 75;

// 手指状态？？
var FingerState_notset = 0;
var FingerState_normal = 1;
var FingerState_missing = 2;
var FingerState_invalid = 3;

// 手指背景颜色
var FingerColor_Red = 'Red';
var FingerColor_Green = 'Green';
var FingerColor_Yellow = 'Yellow';
var FingerColor_Normal = 'Normal';
var FingerColor_DimGray = 'DimGray';

// 手指类型
var FingerType_LeftLittle = 'left_little';
var FingerType_LeftRing = 'left_ring';
var FingerType_LeftMiddle = 'left_middle';
var FingerType_LeftIndex = 'left_index';
var FingerType_LeftThumb = 'left_thumb';
var FingerType_RightLittle = 'right_little';
var FingerType_RightRing = 'right_ring';
var FingerType_RightMiddle = 'right_middle';
var FingerType_RightIndex = 'right_index';
var FingerType_RightThumb = 'right_thumb';

// 录制结果
var LeftThumbResult = { Data: null, State: 0, Quality: 0 };
var LeftIndexResult = { Data: null, State: 0, Quality: 0 };
var LeftMiddleResult = { Data: null, State: 0, Quality: 0 };
var LeftRingResult = { Data: null, State: 0, Quality: 0 };
var LeftLittleResult = { Data: null, State: 0, Quality: 0 };

var RightThumbResult = { Data: null, State: 0, Quality: 0 };
var RightIndexResult = { Data: null, State: 0, Quality: 0 };
var RightMiddleResult = { Data: null, State: 0, Quality: 0 };
var RightRingResult = { Data: null, State: 0, Quality: 0 };
var RightLittleResult = { Data: null, State: 0, Quality: 0 };

// 动画
var leftThumbAnimate = false;
var leftIndexAnimate = false;
var leftMiddleAnimate = false;
var leftRingAnimate = false;
var leftLittleAnimate = false;
var rightThumbAnimate = false;
var rightIndexAnimate = false;
var rightMiddleAnimate = false;
var rightRingAnimate = false;
var rightLittleAnimate = false;
var onCaptured1;
var onWrongHand1;

// 连接设备
function Connect(connected, failed, onPreview, onCaptured, onWrongHand) {
    $.connection.hub.url = url + '/signalr';
    if ($.connection.greenBitFngerprintHub === undefined) {
        failed();
        return;
    }
    onCaptured1 = onCaptured;
    onWrongHand1 = onWrongHand;

    fingerprintHub = $.connection.greenBitFngerprintHub;
    fingerprintHub.on('OnPreview', onPreview);
    fingerprintHub.off('OnCapture');
    // alert("on")
    fingerprintHub.on('OnCapture', onCaptured);
    fingerprintHub.on('OnWrongCapture', onWrongHand);

    $.connection.hub.start().done(function () {
        connected($.connection.hub.url);
    });
}
function Connects(connected, failed, onPreview, onCaptured, onWrongHand) {
    $.connection.hub.url = url + '/signalr';
    if ($.connection.fingerprintHub === undefined) {
        failed();
        return;
    }
    fingerprintHub = $.connection.fingerprintHub;
    fingerprintHub.on('OnPreview', onPreview);
    fingerprintHub.on('OnCapture', onCaptured);
    fingerprintHub.on('OnWrongCapture', onWrongHand);
    $.connection.hub.start().done(function () {
        connected($.connection.hub.url);
    });
}
function Open(done, failed) {
    fingerprintHub.invoke('open')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 启动设备，开始扫描
function Start(captureMode, done, failed) {
    if(captureMode===1){
        // alert('单手模式？')
        setTimeout(() => {
            // alert('单手模式？')s
            fingerprintHub.invoke('start', captureMode)
            .done(function (data) {
                var json = $.parseJSON(data);
                if (json.HasSucceeded) {
                    done();
                }
                else {
                    failed(json.Message);
                }
            });
        }, 2000);
        return;
    }
    fingerprintHub.invoke('start', captureMode)
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}

// 设置手指缺失
function SetMissing(leftThumb, rightThumb, index, middle, ring, little,) {
    console.log(">>>>>>>>>>>>>>>指纹仪对象",fingerprintHub)
    fingerprintHub.invoke('setMissing', leftThumb, rightThumb, index, middle, ring, little)
        .done(function (data) {
            // fingerprintHub.on('OnPreview', onPreview);
            fingerprintHub.off('OnCapture');
            fingerprintHub.off('OnWrongCapture');
            // alert("on")
            fingerprintHub.on('OnCapture', onCaptured1);
            fingerprintHub.on('OnWrongCapture', onWrongHand1);
        });
}
// 停止设备，停止扫描
function Stop(done, failed) {
    fingerprintHub.invoke('stop')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 关闭设备
function Close(done, failed) {
    fingerprintHub.invoke('close')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 设置动画
function SetFadeAll(isFade) {
    SetFadeLefts(isFade);
    SetFadeRights(isFade);
    SetFadeThumbs(isFade);
}

function SetFadeLefts(isFade) {
    SetFade(FingerType_LeftMiddle, isFade);
    SetFade(FingerType_LeftLittle, isFade);
    SetFade(FingerType_LeftIndex, isFade);
    SetFade(FingerType_LeftRing, isFade);
    SetFade(FingerType_LeftThumb, isFade);
}

function SetFadeRights(isFade) {
    SetFade(FingerType_RightThumb, isFade);
    SetFade(FingerType_RightIndex, isFade);
    SetFade(FingerType_RightMiddle, isFade);
    SetFade(FingerType_RightRing, isFade);
    SetFade(FingerType_RightLittle, isFade);
}

function SetFadeThumbs(isFade) {
    SetFade(FingerType_LeftThumb, isFade);
    SetFade(FingerType_RightThumb, isFade);
}

function SetFade(fingerType, isFade) {
    if (fingerType === FingerType_LeftIndex) {
        leftIndexAnimate = isFade;
    }
    if (fingerType === FingerType_LeftLittle) {
        leftLittleAnimate = isFade;
    }
    if (fingerType === FingerType_LeftMiddle) {
        leftMiddleAnimate = isFade;
    }
    if (fingerType === FingerType_LeftRing) {
        leftRingAnimate = isFade;
    }
    if (fingerType === FingerType_LeftThumb) {
        leftThumbAnimate = isFade;
    }

    if (fingerType === FingerType_RightIndex) {
        rightIndexAnimate = isFade;
    }
    if (fingerType === FingerType_RightLittle) {
        rightLittleAnimate = isFade;
    }
    if (fingerType === FingerType_RightMiddle) {
        rightMiddleAnimate = isFade;
    }
    if (fingerType === FingerType_RightRing) {
        rightRingAnimate = isFade;
    }
    if (fingerType === FingerType_RightThumb) {
        rightThumbAnimate = isFade;
    }
}

function DisableFinger(controlId, disable) {
    $('#' + controlId).attr('disabled', disable);
}

function StartFade(controlId, fingerType) {

    if (fingerType === FingerType_LeftIndex) {
        if (leftIndexAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_LeftLittle) {
        if (leftLittleAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_LeftMiddle) {
        if (leftMiddleAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_LeftRing) {
        if (leftRingAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_LeftThumb) {
        if (leftThumbAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_RightIndex) {
        if (rightIndexAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_RightLittle) {
        if (rightLittleAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_RightMiddle) {
        if (rightMiddleAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_RightRing) {
        if (rightRingAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }

    if (fingerType === FingerType_RightThumb) {
        if (rightThumbAnimate) {
            $('#' + controlId).fadeTo('fast', 0.6, function () {
                $('#' + controlId).fadeTo('slow', 1, StartFade(controlId, fingerType));
            });
        }
        else {
            $('#' + controlId).css('opacity', 1);
        }
    }
}

function SetFingerImage(controlId, fingerType, color) {

    if (fingerType === FingerType_LeftIndex) {
        
        $('#' + controlId).css('background', 'url(static/images/BigLeftIndex_' + color + '_65x120.png)');

    }

    if (fingerType === FingerType_LeftLittle) {
        $('#' + controlId).css('background', 'url(static/images/BigLeftLittle_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_LeftMiddle) {
        $('#' + controlId).css('background', 'url(static/images/BigLeftMiddle_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_LeftRing) {
        $('#' + controlId).css('background', 'url(static/images/BigLeftRing_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_LeftThumb) {
        
        $('#' + controlId).css('background', 'url(static/images/BigLeftThumb_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_RightIndex) {
        $('#' + controlId).css('background', 'url(static/images/BigRightIndex_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_RightLittle) {
        
        $('#' + controlId).css('background-image', 'url(static/images/BigRightLittle_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_RightMiddle) {
        $('#' + controlId).css('background-image', 'url(static/images/BigRightMiddle_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_RightRing) {
        $('#' + controlId).css('background-image', 'url(static/images/BigRightRing_' + color + '_65x120.png)');
    }

    if (fingerType === FingerType_RightThumb) {
        
        $('#' + controlId).css('background-image', 'url(static/images/BigRightThumb_' + color + '_65x120.png)');
    }
}

function SetMissingFingerCss(e) {

    var controlId = "";
    if (e.checked) {    
        if ($(e).attr("id") == "left_little_missing") {
            ResetLeftLittleResult();
            LeftLittleResult.State = FingerState_missing;
            SetFingerImage('left_little', FingerType_LeftLittle, FingerColor_DimGray);
            controlId = "#fp1";            
        } else if ($(e).attr("id") == "left_ring_missing") {
            ResetLeftRingResult();
            LeftRingResult.State = FingerState_missing;
            SetFingerImage('left_ring', FingerType_LeftRing, FingerColor_DimGray);
            controlId = "#fp2";
        } else if ($(e).attr("id") == "left_middle_missing") {
            ResetLeftMiddleResult();
            LeftMiddleResult.State = FingerState_missing;
            SetFingerImage('left_middle', FingerType_LeftMiddle, FingerColor_DimGray);
            controlId = "#fp3";
        } else if ($(e).attr("id") == "left_index_missing") {
            ResetLeftIndexResult();
            LeftIndexResult.State = FingerState_missing;
            SetFingerImage('left_index', FingerType_LeftIndex, FingerColor_DimGray);
            controlId = "#fp4";
        } else if ($(e).attr("id") == "right_little_missing") {
            ResetRightLittleResult();
            RightLittleResult.State = FingerState_missing;
            SetFingerImage('right_little', FingerType_RightLittle, FingerColor_DimGray);
            controlId = "#fp8";
        } else if ($(e).attr("id") == "right_ring_missing") {                     
            ResetRightRingResult();
            RightRingResult.State = FingerState_missing;
            SetFingerImage('right_ring', FingerType_RightRing, FingerColor_DimGray);
            controlId = "#fp7";
        } else if ($(e).attr("id") == "right_middle_missing") {
            ResetRightMiddleResult();
            RightMiddleResult.State = FingerState_missing;
            SetFingerImage('right_middle', FingerType_RightMiddle, FingerColor_DimGray);
            controlId = "#fp6";
        } else if ($(e).attr("id") == "right_index_missing") {
            ResetRightIndexResult();
            RightIndexResult.State = FingerState_missing;
            SetFingerImage('right_index', FingerType_RightIndex, FingerColor_DimGray);
            controlId = "#fp5";
        } else if ($(e).attr("id") == "left_thumb_missing") {
            ResetLeftThumbResult();
            LeftThumbResult.State = FingerState_missing;
            SetFingerImage('left_thumb', FingerType_LeftThumb, FingerColor_DimGray);
            controlId = "#fp9";
        } else if ($(e).attr("id") == "right_thumb_missing") {
            ResetRightThumbResult();
            RightThumbResult.State = FingerState_missing;
            SetFingerImage('right_thumb', FingerType_RightThumb, FingerColor_DimGray);
            controlId = "#fp10";
        }
        if (controlId) {
            $(controlId).attr('src', 'static/images/FingerprintMissing_40x40.png');
        }
    }
}

function ResetLeftThumbResult() {
    LeftThumbResult.Data = null;
    LeftThumbResult.State = 0;
    LeftThumbResult.Quality = 0;
}
function ResetLeftIndexResult() {
    LeftIndexResult.Data = null;
    LeftIndexResult.State = 0;
    LeftIndexResult.Quality = 0;
}
function ResetLeftMiddleResult() {
    LeftMiddleResult.Data = null;
    LeftMiddleResult.State = 0;
    LeftMiddleResult.Quality = 0;
}
function ResetLeftRingResult() {
    LeftRingResult.Data = null;
    LeftRingResult.State = 0;
    LeftRingResult.Quality = 0;
}
function ResetLeftLittleResult() {
    LeftLittleResult.Data = null;
    LeftLittleResult.State = 0;
    LeftLittleResult.Quality = 0;
}

function ResetRightThumbResult() {
    RightThumbResult.Data = null;
    RightThumbResult.State = 0;
    RightThumbResult.Quality = 0;
}
function ResetRightIndexResult() {
    RightIndexResult.Data = null;
    RightIndexResult.State = 0;
    RightIndexResult.Quality = 0;
}
function ResetRightMiddleResult() {
    RightMiddleResult.Data = null;
    RightMiddleResult.State = 0;
    RightMiddleResult.Quality = 0;
}
function ResetRightRingResult() {
    RightRingResult.Data = null;
    RightRingResult.State = 0;
    RightRingResult.Quality = 0;
}
function ResetRightLittleResult() {
    RightLittleResult.Data = null;
    RightLittleResult.State = 0;
    RightLittleResult.Quality = 0;
}
function CloseGreenBit() {
    $.connection.hub.stop();
}



// 指纹登陆连接方法
// ----------------------------------------------------------------------------------
//  链接signalr
function ConnectSMALL(connected, failed) {
    $.connection.hub.url = url + '/signalr';
    if ($.connection.bioMiniFingerprintHub === undefined) {
        failed();
        return;
    }
    bioMiniHub = $.connection.bioMiniFingerprintHub;
    $.connection.hub.start().done(function () {
        connected($.connection.hub.url);
    });
}
// 打开设备
function OpenSMALL(done, failed) {
    bioMiniHub.invoke('open')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 开始扫描
function StartSMALL(done, failed) {
    bioMiniHub.invoke('start')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done(json, 1111111);
            }
            else {
                failed(json.Message);
            }
        });
}
// 停止扫描
function StopSMALL(done, failed) {
    bioMiniHub.invoke('stop')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 关闭signalr连接
function CloseSMALL(done, failed) {
    bioMiniHub.invoke('close')
        .done(function (data) {
            var json = $.parseJSON(data);
            if (json.HasSucceeded) {
                done();
            }
            else {
                failed(json.Message);
            }
        });
}
// 设备连接关闭
function CloseAAAAA() {
    $.connection.hub.stop();
}