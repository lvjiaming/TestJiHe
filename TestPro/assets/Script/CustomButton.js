

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart", (event) => {
            cc.log("停止时间派发");
            event.stopPropagation();
        });
    },

    start () {

    },

    // update (dt) {},
});
