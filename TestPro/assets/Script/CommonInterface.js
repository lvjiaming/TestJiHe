const CommonInterface = {};
/**
 *  获取地理位置
 *  @param sucFun  接口调用成功的回调
 *  @param errFun  接口调用失败的回调
 *  @param data    详细的配置
 */
CommonInterface.getLocalPos = (sucFun, errFun, data) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sucFun, errFun, data);
    } else {
        console.error(`设备不支持`);
    }
};
module.exports = CommonInterface;
cc.comInterFace = CommonInterface;