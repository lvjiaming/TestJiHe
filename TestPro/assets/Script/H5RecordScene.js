const H5Record = require("./H5Record.js");
const EncoderWav = require("./encoder-wav-worker.js");
cc.Class({
    extends: cc.Component,

    properties: {
        banben: {
            default: null,
            type: cc.Label,
        },
        videoPlay: {
            default: null,
            type: cc.Node,
            tooltip: ""
        },
        isGetQuanXian: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.banben) {
            this.banben.string = `版本：11.6`;
        }
        H5Record.getInstance().setNode(this.videoPlay);
        // const self = this;
        if (cc.sys.isBrowser) {
            try {
                if (!navigator.mediaDevices) {
                    console.log("navigator.mediaDevices is null");
                    navigator.mediaDevices = {};
                }
                if (!navigator.mediaDevices.getUserMedia) {
                    console.log("navigator.mediaDevices.getUserMedia is null");
                    navigator.mediaDevices.getUserMedia = function (cont) {
                        const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                        if (!getUserMedia) {
                            return Promise.reject(new Error("not support"));
                        }
                        return new Promise(function (resolve, reject) {
                            getUserMedia.call(navigator, cont, resolve, reject);
                        })
                    }
                }
                navigator.mediaDevices.getUserMedia({
                    audio: {
                        sampleRate: 44100, // 采样率
                        channelCount: 2, // 声道数
                        volume: 1.0,  //音量
                        sampleBits: 16,
                    }
                    // audio: true,
                }).then(function (mediaStream) {
                    H5Record.getInstance().setHasReady(true);
                    // self._mediaStream = mediaStream;
                }).catch(function (e) {
                    console.error("初始化失败", e);
                });
            } catch (e) {
                console.error("不支持")
            }
        }
        this.node.on("touchstart", this._touchStart, this);
        this.node.on("touchend", this._touchEnd, this);
        this.node.on("touchcancel", this._touchCancel, this);
    },

    start () {

    },
    _touchStart() {
        // console.log("开始录音");
        console.log("111");
        if (H5Record.getInstance().getHasReady() && cc.sys.isBrowser) {
            navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleRate: 44100, // 采样率
                    channelCount: 2, // 声道数
                    volume: 1.0,  //音量
                    sampleBits: 16,
                }
                // audio: true,
            }).then(function (mediaStream) {
                console.log("获取mediaStream, 开始录音");
                H5Record.getInstance().startRecord(mediaStream);
            }).catch(function (e) {
                console.error("初始化失败", e);
            });
        }
    },

    _touchEnd() {
        if (cc.sys.isBrowser && H5Record.getInstance().getHasReady()) {
            H5Record.getInstance().stopRecord();
        }
    },

    _touchCancel() {
        if (cc.sys.isBrowser) {
            console.log("取消录音");
            H5Record.getInstance().cancelRecord();
        }
    },

    onEndClick() {
        console.log("结束录音: ");
        this.encoderWorker.postMessage(['dump', this.audioCtx.sampleRate]);
        this.diconnect();
    },

    // update (dt) {},
});
