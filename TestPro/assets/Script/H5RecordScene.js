const H5Record = require("./H5Record.js");
cc.Class({
    extends: cc.Component,

    properties: {
        banben: {
            default: null,
            type: cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // const test = H5Record.getInstance();
        if (this.banben) {
            this.banben.string = `版本：5.4`;
        }
        if (cc.sys.isBrowser) {
            try {
                if (!navigator.mediaDevices) {
                    navigator.mediaDevices = {};
                }
                if (!navigator.mediaDevices.getUserMedia) {
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
                    H5Record.getInstance(mediaStream);
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
        if (cc.sys.isBrowser) {
            H5Record.getInstance().startRecord();
        }
    },

    _touchEnd() {
        if (cc.sys.isBrowser) {
            H5Record.getInstance().stopRecord();
        }
    },

    _touchCancel() {

    },

    // update (dt) {},
});
