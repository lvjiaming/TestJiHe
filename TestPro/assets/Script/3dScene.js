const CHANGE_CONFIG = {
    MOVE_SPACE: 1,
    ROTATION_SPACE: 1,
    SIZE_SPACE: 1,
};
cc.Class({
    extends: cc.Component,

    properties: {
        moduleNode: {
            default: null,
            type: cc.Node,
            tooltip: "模型节点",
        },
        labelNode: {
            default: null,
            type: cc.Node,
            tooltip: "文字节点",
        },
        cameraNode: {
            default: null,
            type: cc.Node,
            tooltip: "相机节点",
        },
        islandNode: {
            default: null,
            type: cc.Node,
            tooltip: "地面节点",
        },
    },


    onLoad () {
        // if (this.moduleNode) {
        //     let pos = cc.v3(0, 0, 0);
        //     if (this.labelNode) {
        //         pos = this.labelNode.position;
        //     }
        //     cc.log(pos);
        //     // pos = cc.v3(0, 0, 0);
        //     this.moduleNode.lookAt(pos);
        // }
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
        // if (this.islandNode) {
        //     this.islandNode.on("touchstart", (event) => {
        //         debugger;
        //     });
        // }
        const euler = cc.v3(-28.00000000000054, -1.4911121105328213e-16, 1.000000000000002);
        if (this.cameraNode) {
            this.cameraNode.eulerAngles = euler;
        }
    },
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this);
    },

    start () {

    },
    keyDown(event) {
        if (this.cameraNode) {
            const cameras = this.cameraNode.getComponent(cc.Camera);
            switch (event.keyCode) {
                case cc.macro.KEY.w: {  // 上移
                    this.cameraNode.y = this.cameraNode.y + CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.s: { // 下移
                    this.cameraNode.y = this.cameraNode.y - CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.a: { // 左移
                    this.cameraNode.x = this.cameraNode.x - CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.d: { // 右移
                    this.cameraNode.x = this.cameraNode.x + CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.q: { // 前进
                    this.cameraNode.z = this.cameraNode.z - CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.e: { // 后退
                    this.cameraNode.z = this.cameraNode.z + CHANGE_CONFIG.MOVE_SPACE;
                    break;
                }
                case cc.macro.KEY.x: { // x轴旋转(增加)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.x = myEuler.x + CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.c: { // x轴旋转(减少)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.x = myEuler.x - CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.y: { // y轴旋转(增加)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.y = myEuler.y + CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.t: { // y轴旋转(减少)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.y = myEuler.y - CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.z: { // z轴旋转(增加)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.z = myEuler.z + CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.v: { // z轴旋转(减少)
                    const myEuler = this.cameraNode.eulerAngles;
                    myEuler.z = myEuler.z - CHANGE_CONFIG.ROTATION_SPACE;
                    this.cameraNode.eulerAngles = myEuler;
                    break;
                }
                case cc.macro.KEY.space: { // 打印相机的数据
                    cc.log(this.cameraNode);
                    break;
                }
                case cc.macro.KEY.o: { // 放大视角
                    if (cameras) {
                        cameras.orthoSize = cameras.orthoSize + CHANGE_CONFIG.SIZE_SPACE;
                    }
                    break;
                }
                case cc.macro.KEY.p: { // 缩小视角
                    if (cameras) {
                        cameras.orthoSize = cameras.orthoSize - CHANGE_CONFIG.SIZE_SPACE;
                    }
                    break;
                }
            }
        }
    },

    // update (dt) {},
});
