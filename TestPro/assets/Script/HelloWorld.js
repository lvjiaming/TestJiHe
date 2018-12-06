cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',
        huihuaNode: {
            default: null,
            type: cc.Graphics,
            tooltip: "绘画工具",
        },
        curHuiHuaNode: null,  // 当前绘画的节点
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        // cc.AppLog._getStack();
        // customLog.info("哈哈哈",{a: 1, b: 2});
        // cc.comInterFace.getLocalPos((data) => {
        //     cc.log("接口调用成功");
        //     cc.log(data);
        // }, (err) => {
        //     cc.error(err);
        // });
        this.node.on("touchstart", (event) => {
            this.curHuiHuaNode = new cc.Node();
            this.node.addChild(this.curHuiHuaNode);
            this.curHuiHuaNode.addComponent(cc.Graphics);
            if (this.curHuiHuaNode) {
                const pos = this.curHuiHuaNode.convertToNodeSpaceAR(event.touch._point);
                this.curHuiHuaNode.getComponent(cc.Graphics).lineWidth = 10;
                this.curHuiHuaNode.getComponent(cc.Graphics).lineJoin = cc.Graphics.LineJoin.ROUND;
                this.curHuiHuaNode.getComponent(cc.Graphics).lineCap = cc.Graphics.LineCap.ROUND;
                this.curHuiHuaNode.getComponent(cc.Graphics).strokeColor = new cc.Color(255, 0, 0);
                this.curHuiHuaNode.getComponent(cc.Graphics).moveTo(pos.x, pos.y);
                cc.log("开始");
            }
        });
        this.node.on("touchmove", (event) => {
            if (this.curHuiHuaNode) {
                const pos = this.curHuiHuaNode.convertToNodeSpaceAR(event.touch._point);
                this.curHuiHuaNode.getComponent(cc.Graphics).lineTo(pos.x, pos.y);
                this.curHuiHuaNode.getComponent(cc.Graphics).stroke();
                cc.log("移动");
            }
        });
        this.node.on("touchend", (event) => {
            // if (this.huihuaNode) {
            //     this.huihuaNode.clear();
            //     cc.log("结束");
            // }
        });
        this.huihua();
    },

    huihua() {
        if (this.huihuaNode) {
            this.huihuaNode.rect(20,20,150,100);
            this.huihuaNode.lineWidth = 10;
            this.huihuaNode.fillColor = new cc.Color(125, 1542, 125);
            this.huihuaNode.stroke();
            this.huihuaNode.fill();

            this.huihuaNode.lineWidth = 2;
            this.huihuaNode.rect(100, 100, 100, 100);
            this.huihuaNode.stroke();
        }
    },

    // called every frame
    update: function (dt) {

    },
});
