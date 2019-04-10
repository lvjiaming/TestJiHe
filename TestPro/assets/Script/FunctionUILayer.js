
const voiceNative = require("VoiceNative");

var FunctionUILayer = cc.Class({
    extends: cc.Component,

    properties: {

        SoundBtnNode: cc.Node,

        _lastPlayTime: null,
    },

    statics: {
        _instance: null,
        _shopList: null,

        // 语音队列
        _voiceList: [],
    },

    // use this for initialization
    onLoad: function () {

        if (cc.sys.isBrowser) {
            cc.log("初始化语音");
            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            var self = this;
            cc.log(navigator.getUserMedia);
            if (!navigator.getUserMedia) {
                cc.log("navigator.getUserMedia 方法未找到");
                return ;
            }
            navigator.getUserMedia(
                {
                    "audio": true,
                    //     {
                    //     "mandatory": {
                    //         "googEchoCancellation": "false",
                    //         "googAutoGainControl": "false",
                    //         "googNoiseSuppression": "false",
                    //         "googHighpassFilter": "false"
                    //     },
                    //     "optional": []
                    // },
                }, function (stream) {
                    // Create analyser node
                    cc.log("初始化成功");
                    // var audioContext = self._audioContext;
                    // var inputPoint = audioContext.createGain();
                    //
                    // var audioInput = audioContext.createMediaStreamSource(stream);
                    // audioInput.connect(inputPoint);
                    //
                    // var analyserNode = audioContext.createAnalyser();
                    // analyserNode.fftSize = 2048;
                    // inputPoint.connect(analyserNode);
                    //
                    // var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
                    // analyserNode.getByteFrequencyData(freqByteData);
                    //
                    // self._freqByteData = freqByteData;
                    // self._analyserNode = analyserNode;
                    // self._audioInput = audioInput;
                    //
                    // self._inited = true;
                }, function (e) {
                    alert('Error getting audio');
                    console.log(e);
                    // self._inited = false;
                });
            return;
        }

        voiceNative.init();
        FunctionUILayer._instance = this;
        this.SoundBtnNode.active = true;
        this.showMicBtn(true);
    },




    //是否显示麦克风按钮，并根据显示状态注册监听事件
    showMicBtn: function (enable) {
        var self = this;
        cc.log("GameManager ShowMicBtn: " + enable);
        var lastTouchTime = null;
        if (cc.sys.isvoiceNative) {
            self.SoundBtnNode.active = enable;
        }
        //this.SoundBtnNode.active = true;
        var micBtnDown = function (event) {
            cc.log("开始录音");
            // voiceNativeCall.SetMicMute(false);
            lastTouchTime = Date.now();
            //开始录音
            voiceNative.prepare("record.amr");
        };

        var micBtnUp = function (event) {
            cc.log("GameManager micBtn event up");
            // voiceNativeCall.SetMicMute(true);
            if (Date.now() - lastTouchTime < 100) {
                voiceNative.cancel();
                cc.log("时间小于一秒");
                // require("TipsUtil").ShowFloatText("时间小于1秒", require("TipsUtil").FloatType.type2);
            } else {
                if (lastTouchTime != null) {
                    // 录音结束
                    voiceNative.release();
                    // 录音时间
                    var time = Date.now() - lastTouchTime;
                    cc.log("现在时间。。。。。  " + Date.now());
                    cc.log("开始时间。。。。。  " + lastTouchTime);
                    cc.log("录音时间。。。。。  " + time);
                    // 读取录音文件
                    var msgStr = voiceNative.getVoiceData("record.amr");
                    cc.log(" 发送的字符串录音文件1。。。。。  " + msgStr);
                    const uintStr = cc.comInterFace.uint8ArrayToString(msgStr);
                    cc.log(" 发送的字符串录音文件2。。。。。  " + uintStr);
                    const base64data = cc.comInterFace.Base64.encode(uintStr);
                    cc.log(" 发送的字符串录音文件3。。。。。  " + base64data);
                    // const base64Str = cc.comInterFace.Base64.decode(base64data);
                    // cc.log(" 发送的字符串录音文件4。。。。。  " + base64Str);
                    // msgStr = cc.comInterFace.stringToUint8Array(base64Str);
                    // cc.log(" 发送的字符串录音文件5。。。。。  " + msgStr);
                    // 等待发送
                    // var baseData = require("BaseScript")._utf8_encode(msgStr);
                    // cc.log(" base64 打包录音文件。。。。。  " + baseData);
                    // 直接发送二进制 
                    // require("VoiceMsgHandler").GetCS_VoiceChatReq(time, msgStr);
                    if (cc.sys.isNative) {
                        self.PlayVoiceNotes(time, base64data);
                    }
                    // 本地测试测试
                    // setTimeout(function () {
                    //     // 间隔两秒播放录音
                    //     var msgfile = "record.amr";
                    //     voiceNative.play(msgfile);
                    //     // 到这里结束
                    //     //voiceNative.writeVoice 根据msgStr 文件  和命名 把后端发送过来的语音存放本地
                    //     // 本地测试不需要这步
                    //     voiceNative.writeVoice(msgfile, msgStr);
                    //     cc.log("即将要播放的语音内容" + msgStr);
                    //     self.showSpeaker(msgfile);
                    //     self._lastPlayTime = Date.now() + time;                        
                    // }, 2000)

                }
            }
        };
        var micBtnCancel = function (event) {
            cc.log("GameManager micBtn event cancel");
            // voiceNativeCall.SetMicMute(true);
            voiceNative.cancel();
        };

        if (this.SoundBtnNode.active == true) {
            this.SoundBtnNode.on(cc.Node.EventType.TOUCH_START, micBtnDown);
            this.SoundBtnNode.on(cc.Node.EventType.TOUCH_END, micBtnUp);
            this.SoundBtnNode.on(cc.Node.EventType.TOUCH_CANCEL, micBtnCancel);
        }
        else {
            this.SoundBtnNode.off(cc.Node.EventType.TOUCH_START, micBtnDown);
            this.SoundBtnNode.off(cc.Node.EventType.TOUCH_END, micBtnUp);
            this.SoundBtnNode.off(cc.Node.EventType.TOUCH_CANCEL, micBtnCancel);
        }
    },

    // 播放语音通知 
    PlayVoiceNotes: function (time, data) {
        cc.log("即将要播放的语音内容" + data);
        var msgfile = "cord.amr";
        const baseStr = cc.comInterFace.Base64.decode(data);
        const uintStr = cc.comInterFace.stringToUint8Array(baseStr);
        var self = this;
        // var baseData = require("BaseScript")._utf8_decode(data);
        var dataView = new Uint8Array(uintStr.buffer, uintStr.offset);
        // cc.log("dataView=" + dataView);
        voiceNative.writeVoice(msgfile, uintStr);
        cc.log("即将要播放的语音内容" + uintStr);
        setTimeout(function () {
            self.showSpeaker(msgfile);
            self._lastPlayTime = Date.now() + time;
        }, 100)
    },

    showSpeaker: function (msgfile) {
        voiceNative.play(msgfile);
    },

    onPlayerOver: function () {
        cc.audioEngine.resumeAll();
    },

    update: function (dt) {
        //cc.log("updateTime...dt=" + dt);
        if (this._lastPlayTime != null) {
            if (Date.now() > this._lastPlayTime + 200) {
                this.onPlayerOver();
                this._lastPlayTime = null;
            }
        } else {
            // FunctionUILayer.SetPlayVice();
        }
    },

});
