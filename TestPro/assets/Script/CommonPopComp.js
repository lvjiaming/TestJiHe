const ActionType = cc.Enum({ // 动画的类型
    NONE: 1, // 无动画
    MOVE: 2, // 移动
    SCALE: 3, // 大小变换
});
cc.Class({
    extends: cc.Component,
    ctor() {
        // this.actionType = ActionType.NONE;
        this.actionTime = 0.5;
        this.startScale = 0;
        this.endScale = 1;
    },
    // editor: {
    //     executeInEditMode: true, // 开启编辑器刷新，去调用周期函数
    // },
    properties: {
        actionType: {
            default: ActionType.NONE,
            type: ActionType,
            tooltip: "动作类型\nNONE: 无动画\nMOVE: 移动动画\nSCALE: 放大缩小动画",
        },
        moveStartPos: {
            default: cc.v2(0 ,0),
            tooltip: "开始时的位置",
            visible: function () {
                return this.actionType == ActionType.MOVE ? true : false;
            },
        },
        moveEndPos: {
            default: cc.v2(0 ,0),
            tooltip: "变换后的位置",
            visible: function () {
                return this.actionType == ActionType.MOVE ? true : false;
            },
        },
        startScale: {
            default: 0,
            type: cc.Float,
            tooltip: "开始时的大小",
            visible: function () {
                return this.actionType == ActionType.SCALE ? true : false;
            },
        },
        endScale: {
            default: 0,
            type: cc.Float,
            tooltip: "变化后的大小",
            visible: function () {
                return this.actionType == ActionType.SCALE ? true : false;
            },
        },
        actionNode: {
            default: null,
            type: cc.Node,
            tooltip: "动作的节点",
            visible: function () {
                return this.actionType == ActionType.NONE ? false : true;
            }
        },
        actionTime: {
            default: 0,
            type: cc.Float,
            tooltip: "动作的时间",
            visible: function () {
                return this.actionType == ActionType.NONE ? false : true;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.actionNode) {
            switch (this.actionType) {
                case ActionType.MOVE: {
                    this.actionNode.position = this.moveStartPos;
                    this.actionNode.runAction(cc.moveTo(this.actionTime, this.moveEndPos));
                    break;
                }
                case ActionType.SCALE: {
                    this.actionNode.scale = this.startScale;
                    this.actionNode.runAction(cc.scaleTo(this.actionTime, this.endScale));
                    break;
                }
            }
        } else {
            cc.log(`动画节点未空`)
        }
    },

    start () {

    },

    // update (dt) {},
});
