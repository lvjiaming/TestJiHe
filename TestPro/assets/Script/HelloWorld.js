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
        customLog.info({a: 1, b: 2});
    },

    // called every frame
    update: function (dt) {

    },
});
