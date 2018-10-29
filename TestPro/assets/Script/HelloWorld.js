cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        // cc.AppLog._getStack();
        customLog.info("哈哈哈",{a: 1, b: 2});
        cc.comInterFace.getLocalPos((data) => {
            cc.log("接口调用成功");
            cc.log(data);
        }, (err) => {
            cc.error(err);
        });
    },

    // called every frame
    update: function (dt) {

    },
});
