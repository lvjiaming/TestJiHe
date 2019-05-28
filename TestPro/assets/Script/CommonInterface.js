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
/**
 *  H5复制功能
 * @type {{}}
 */
CommonInterface.webCopyStr = (str) => {
    const textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
};
/**
 *  高德地图的接入
 * @constructor
 */
CommonInterface.Amap = () => {
    if (AMap) {
        let map, geolocation;
        //加载地图，调用浏览器定位服务
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
            AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
        });
        //解析定位结果
        function onComplete(data) {
            var str = [];
            str.push(data.position.getLat());
            str.push(data.position.getLng());
            cc.log(str);
        }
        //解析定位错误信息
        function onError(data) {
            switch(data.info) {
                case 'PERMISSION_DENIED':
                    cc.log( '浏览器阻止了定位操作');
                    break;
                case 'POSITION_UNAVAILBLE':
                    cc.log( '无法获得当前位置');
                    break;
                case 'TIMEOUT':
                    cc.log( '定位超时');
                    break;
                default:
                    cc.log( '未知错误');
                    break;
            }
        }
    }
};
/**
 *  uint8Array转字符串
 * @param fileData
 * @returns {string}
 */
CommonInterface.uint8ArrayToString = (fileData) => {
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString
};
/**
 *  字符串转uint8Array
 * @param str
 * @returns {Uint8Array}
 */
CommonInterface.stringToUint8Array = (str) => {
    let arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }

    let tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
};
/**
 *  base64的编码与解码
 * @type {{_keyStr: string, encode: CommonInterface.Base64.encode, decode: CommonInterface.Base64.decode, _utf8_encode: CommonInterface.Base64._utf8_encode, _utf8_decode: CommonInterface.Base64._utf8_decode}}
 */
CommonInterface.Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = CommonInterface.Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = CommonInterface.Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        // let c = c1 = c2 = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

};
/**
 *  原生平台截屏
 */
CommonInterface.nativeCaptureScreen = function () {
    var size = cc.director.getWinSize();
    var fileName = "result_share.jpg";
    var fullPath = jsb.fileUtils.getWritablePath() + fileName;
    if (jsb.fileUtils.isFileExist(fullPath)) {
        jsb.fileUtils.removeFile(fullPath);
    }
    var width = Math.floor(size.width);
    var height = Math.floor(size.height);
    var texture = new cc.RenderTexture(width, height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
    texture.setPosition(cc.p(size.width / 2, size.height / 2));
    texture.begin();
    cc.director.getRunningScene().visit();
    texture.end();
    texture.saveToFile(fileName, cc.IMAGE_FORMAT_JPG);
};

/**
 *  原生平台复制
 */
CommonInterface.nativeCopy = (str) => {
    if (cc.sys.isNative) {
        jsb.copyTextToClipboard(str);
    }
};

module.exports = CommonInterface;
cc.comInterFace = CommonInterface;