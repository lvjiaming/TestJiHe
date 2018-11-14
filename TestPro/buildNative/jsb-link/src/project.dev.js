__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AppLog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a22cckcLi9GOquDVR3T139C", "AppLog");
    "use strict";
    function _defineProperty(obj, key, value) {
      key in obj ? Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      }) : obj[key] = value;
      return obj;
    }
    var AppLog = cc.Class({
      statics: {
        getInstance: function getInstance() {
          this.appLog || (this.appLog = new AppLog());
          return this.appLog;
        }
      },
      _getData: function _getData() {
        var d = new Date();
        var str = d.getHours() + "";
        var timeStr = "";
        timeStr += (1 == str.length ? "0" + str : str) + ":";
        str = d.getMinutes() + "";
        timeStr += (1 == str.length ? "0" + str : str) + ":";
        str = d.getSeconds() + "";
        timeStr += (1 == str.length ? "0" + str : str) + ".";
        str = d.getMilliseconds() + "";
        1 == str.length && (str = "00" + str);
        2 == str.length && (str = "0" + str);
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
      },
      _getStack: function _getStack(index) {
        var e = new Error();
        var lines = e.stack.split("");
        lines.shift();
        var result = [];
        lines.forEach(function(line) {
          line = line.substring(7);
          var lineBreak = line.split(" ");
          lineBreak.length < 2 ? result.push(lineBreak[0]) : result.push(_defineProperty({}, lineBreak[0], lineBreak[1]));
        });
        var list = [];
        if (index <= result.length - 1) for (var a in result[index]) list.push(a);
        if (list.length > 0) {
          var splitList = list[0].split(".");
          if (splitList.length >= 2) return "[" + splitList[0] + ".js->" + splitList[1] + "]";
        }
        return "";
      },
      log: function log(msg) {
        var backLog = console.log || cc.log || window["log"];
        backLog.call(this, "%s%s " + cc.js.formatStr.apply(cc, arguments), this._getData(), this._getStack(2));
      },
      info: function info(msg) {
        var backLog = cc.log || console.log || window["log"];
        var argArr = [];
        for (var i in arguments) arguments[i] instanceof Object && argArr.push(arguments[i]);
        1 == argArr.length && (argArr = argArr[0]);
        backLog.call(this, "%c%s%s \n", "color:#00CD00;", this._getData(), this._getStack(2), argArr);
      }
    });
    window.customLog = AppLog.getInstance();
    cc._RF.pop();
  }, {} ],
  CommonInterface: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31894rUUJROipiqHOJxY5ui", "CommonInterface");
    "use strict";
    var CommonInterface = {};
    CommonInterface.getLocalPos = function(sucFun, errFun, data) {
      navigator.geolocation ? navigator.geolocation.getCurrentPosition(sucFun, errFun, data) : console.error("\u8bbe\u5907\u4e0d\u652f\u6301");
    };
    module.exports = CommonInterface;
    cc.comInterFace = CommonInterface;
    cc._RF.pop();
  }, {} ],
  CommonPopComp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "af37emmObFAQpYmYRVwx6lH", "CommonPopComp");
    "use strict";
    var ActionType = cc.Enum({
      NONE: 1,
      MOVE: 2,
      SCALE: 3
    });
    cc.Class({
      extends: cc.Component,
      ctor: function ctor() {
        this.actionTime = .5;
        this.startScale = 0;
        this.endScale = 1;
      },
      properties: {
        actionType: {
          default: ActionType.NONE,
          type: ActionType,
          tooltip: "\u52a8\u4f5c\u7c7b\u578b\nNONE: \u65e0\u52a8\u753b\nMOVE: \u79fb\u52a8\u52a8\u753b\nSCALE: \u653e\u5927\u7f29\u5c0f\u52a8\u753b"
        },
        moveStartPos: {
          default: cc.v2(0, 0),
          tooltip: "\u5f00\u59cb\u65f6\u7684\u4f4d\u7f6e",
          visible: function visible() {
            return this.actionType == ActionType.MOVE;
          }
        },
        moveEndPos: {
          default: cc.v2(0, 0),
          tooltip: "\u53d8\u6362\u540e\u7684\u4f4d\u7f6e",
          visible: function visible() {
            return this.actionType == ActionType.MOVE;
          }
        },
        startScale: {
          default: 0,
          type: cc.Float,
          tooltip: "\u5f00\u59cb\u65f6\u7684\u5927\u5c0f",
          visible: function visible() {
            return this.actionType == ActionType.SCALE;
          }
        },
        endScale: {
          default: 0,
          type: cc.Float,
          tooltip: "\u53d8\u5316\u540e\u7684\u5927\u5c0f",
          visible: function visible() {
            return this.actionType == ActionType.SCALE;
          }
        },
        actionNode: {
          default: null,
          type: cc.Node,
          tooltip: "\u52a8\u4f5c\u7684\u8282\u70b9",
          visible: function visible() {
            return this.actionType != ActionType.NONE;
          }
        },
        actionTime: {
          default: 0,
          type: cc.Float,
          tooltip: "\u52a8\u4f5c\u7684\u65f6\u95f4",
          visible: function visible() {
            return this.actionType != ActionType.NONE;
          }
        }
      },
      onLoad: function onLoad() {
        if (this.actionNode) switch (this.actionType) {
         case ActionType.MOVE:
          this.actionNode.position = this.moveStartPos;
          this.actionNode.runAction(cc.moveTo(this.actionTime, this.moveEndPos));
          break;

         case ActionType.SCALE:
          this.actionNode.scale = this.startScale;
          this.actionNode.runAction(cc.scaleTo(this.actionTime, this.endScale));
        } else cc.log("\u52a8\u753b\u8282\u70b9\u672a\u7a7a");
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  FunctionUILayer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f36c2vi4vhI/5MUAwe//o0X", "FunctionUILayer");
    "use strict";
    var voiceNative = require("VoiceNative");
    var FunctionUILayer = cc.Class({
      extends: cc.Component,
      properties: {
        SoundBtnNode: cc.Node,
        _lastPlayTime: null
      },
      statics: {
        _instance: null,
        _shopList: null,
        _voiceList: []
      },
      onLoad: function onLoad() {
        voiceNative.init();
        FunctionUILayer._instance = this;
        this.SoundBtnNode.active = true;
        this.showMicBtn(true);
      },
      showMicBtn: function showMicBtn(enable) {
        var self = this;
        cc.log("GameManager ShowMicBtn: " + enable);
        var lastTouchTime = null;
        cc.sys.isvoiceNative && (self.SoundBtnNode.active = enable);
        var micBtnDown = function micBtnDown(event) {
          cc.log("\u5f00\u59cb\u5f55\u97f3");
          lastTouchTime = Date.now();
          voiceNative.prepare("record.amr");
        };
        var micBtnUp = function micBtnUp(event) {
          cc.log("GameManager micBtn event up");
          if (Date.now() - lastTouchTime < 100) {
            voiceNative.cancel();
            cc.log("\u65f6\u95f4\u5c0f\u4e8e\u4e00\u79d2");
          } else if (null != lastTouchTime) {
            voiceNative.release();
            var time = Date.now() - lastTouchTime;
            cc.log("\u73b0\u5728\u65f6\u95f4\u3002\u3002\u3002\u3002\u3002  " + Date.now());
            cc.log("\u5f00\u59cb\u65f6\u95f4\u3002\u3002\u3002\u3002\u3002  " + lastTouchTime);
            cc.log("\u5f55\u97f3\u65f6\u95f4\u3002\u3002\u3002\u3002\u3002  " + time);
            var msgStr = voiceNative.getVoiceData("record.amr");
            cc.log(" \u53d1\u9001\u7684\u5b57\u7b26\u4e32\u5f55\u97f3\u6587\u4ef6\u3002\u3002\u3002\u3002\u3002  " + msgStr);
            cc.sys.isNative && self.PlayVoiceNotes(time, msgStr);
          }
        };
        var micBtnCancel = function micBtnCancel(event) {
          cc.log("GameManager micBtn event cancel");
          voiceNative.cancel();
        };
        if (true == this.SoundBtnNode.active) {
          this.SoundBtnNode.on(cc.Node.EventType.TOUCH_START, micBtnDown);
          this.SoundBtnNode.on(cc.Node.EventType.TOUCH_END, micBtnUp);
          this.SoundBtnNode.on(cc.Node.EventType.TOUCH_CANCEL, micBtnCancel);
        } else {
          this.SoundBtnNode.off(cc.Node.EventType.TOUCH_START, micBtnDown);
          this.SoundBtnNode.off(cc.Node.EventType.TOUCH_END, micBtnUp);
          this.SoundBtnNode.off(cc.Node.EventType.TOUCH_CANCEL, micBtnCancel);
        }
      },
      PlayVoiceNotes: function PlayVoiceNotes(time, data) {
        var msgfile = "cord.amr";
        var self = this;
        var dataView = new Uint8Array(data.buffer, data.offset);
        voiceNative.writeVoice(msgfile, dataView);
        cc.log("\u5373\u5c06\u8981\u64ad\u653e\u7684\u8bed\u97f3\u5185\u5bb9" + dataView);
        setTimeout(function() {
          self.showSpeaker(msgfile);
          self._lastPlayTime = Date.now() + time;
        }, 100);
      },
      showSpeaker: function showSpeaker(msgfile) {
        voiceNative.play(msgfile);
      },
      onPlayerOver: function onPlayerOver() {
        cc.audioEngine.resumeAll();
      },
      update: function update(dt) {
        if (null != this._lastPlayTime && Date.now() > this._lastPlayTime + 200) {
          this.onPlayerOver();
          this._lastPlayTime = null;
        }
      }
    });
    cc._RF.pop();
  }, {
    VoiceNative: "VoiceNative"
  } ],
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        text: "Hello, World!"
      },
      onLoad: function onLoad() {
        this.label.string = this.text;
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ],
  Pop1: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "929b3uIt+lLY5iMFKU5gO24", "Pop1");
    "use strict";
    var CommonPopComp = require("./CommonPopComp.js");
    cc.Class({
      extends: CommonPopComp,
      properties: {},
      onLoad: function onLoad() {
        this._super();
      }
    });
    cc._RF.pop();
  }, {
    "./CommonPopComp.js": "CommonPopComp"
  } ],
  VoiceNative: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f357H666JKII9fZOS4fueu", "VoiceNative");
    "use strict";
    var radix = 12;
    var base = 128 - radix;
    function crypto(value) {
      value -= base;
      var h = Math.floor(value / radix) + base;
      var l = value % radix + base;
      return String.fromCharCode(h) + String.fromCharCode(l);
    }
    var encodermap = {};
    var decodermap = {};
    for (var i = 0; i < 256; ++i) {
      var code = null;
      var v = i + 1;
      code = v >= base ? crypto(v) : String.fromCharCode(v);
      encodermap[i] = code;
      decodermap[code] = i;
    }
    function encode(data) {
      var content = "";
      var len = data.length;
      cc.log("encode, len=" + len + ", data=" + data);
      var a = len >> 24 & 255;
      var b = len >> 16 & 255;
      var c = len >> 8 & 255;
      var d = 255 & len;
      content += encodermap[a];
      content += encodermap[b];
      content += encodermap[c];
      content += encodermap[d];
      for (var i = 0; i < data.length; ++i) content += encodermap[data[i]];
      return content;
    }
    function getCode(content, index) {
      var c = content.charCodeAt(index);
      c = c >= base ? content.charAt(index) + content.charAt(index + 1) : content.charAt(index);
      return c;
    }
    function decode(content) {
      var index = 0;
      var len = 0;
      for (var i = 0; i < 4; ++i) {
        var c = getCode(content, index);
        index += c.length;
        var v = decodermap[c];
        len |= v << 8 * (3 - i);
      }
      var newData = new Uint8Array(len);
      var cnt = 0;
      while (index < content.length) {
        var c = getCode(content, index);
        index += c.length;
        newData[cnt] = decodermap[c];
        cnt++;
      }
      return newData;
    }
    var AndroidClassName = "org/cocos2dx/javascript/VoiceRecorder";
    var IosClassName = "VoiceSDK";
    var VoiceNative = cc.Class({
      extends: cc.Component,
      properties: {
        _voiceMediaPath: null
      },
      onLoad: function onLoad() {},
      init: function init() {
        if (cc.sys.isNative) {
          this._voiceMediaPath = jsb.fileUtils.getWritablePath() + "/voicemsgs/";
          this.setStorageDir(this._voiceMediaPath);
        }
      },
      prepare: function prepare(filename) {
        if (!cc.sys.isNative) return;
        cc.audioEngine.pauseAll();
        this.clearCache(filename);
        cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(AndroidClassName, "prepare", "(Ljava/lang/String;)V", filename) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(IosClassName, "prepareRecord:", filename));
      },
      release: function release() {
        if (!cc.sys.isNative) return;
        cc.audioEngine.resumeAll();
        cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(AndroidClassName, "release", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(IosClassName, "finishRecord"));
      },
      cancel: function cancel() {
        if (!cc.sys.isNative) return;
        cc.audioEngine.resumeAll();
        cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod(AndroidClassName, "cancel", "()V") : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(IosClassName, "cancelRecord"));
      },
      writeVoice: function writeVoice(filename, voiceData) {
        if (!cc.sys.isNative) return;
        if (voiceData && voiceData.length > 0) {
          var url = this._voiceMediaPath + filename;
          this.clearCache(filename);
          jsb.fileUtils.writeDataToFile(voiceData, url);
        }
      },
      clearCache: function clearCache(filename) {
        if (cc.sys.isNative) {
          var url = this._voiceMediaPath + filename;
          jsb.fileUtils.isFileExist(url) && jsb.fileUtils.removeFile(url);
          jsb.fileUtils.isFileExist(url + ".wav") && jsb.fileUtils.removeFile(url + ".wav");
        }
      },
      play: function play(filename) {
        if (!cc.sys.isNative) return;
        cc.audioEngine.pauseAll();
        cc.sys.os == cc.sys.OS_ANDROID ? jsb.reflection.callStaticMethod("org/cocos2dx/javascript/VoicePlayer", "play", "(Ljava/lang/String;)V", filename) : cc.sys.os == cc.sys.OS_IOS && jsb.reflection.callStaticMethod(IosClassName, "play:", filename);
      },
      getVoiceData: function getVoiceData(filename) {
        if (cc.sys.isNative) {
          var url = this._voiceMediaPath + filename;
          console.log("getVoiceData:" + url);
          var fileData = jsb.fileUtils.getDataFromFile(url);
          if (fileData) {
            var content = fileData;
            return content;
          }
        }
        return "";
      },
      getDataString: function getDataString(data) {
        var content = encode(data);
        return content;
      },
      setStorageDir: function setStorageDir(dir) {
        if (!cc.sys.isNative) return;
        if (cc.sys.os == cc.sys.OS_ANDROID) jsb.reflection.callStaticMethod(AndroidClassName, "setStorageDir", "(Ljava/lang/String;)V", dir); else if (cc.sys.os == cc.sys.OS_IOS) {
          jsb.reflection.callStaticMethod(IosClassName, "setStorageDir:", dir);
          jsb.fileUtils.isDirectoryExist(dir) || jsb.fileUtils.createDirectory(dir);
        }
      }
    });
    VoiceNative = new VoiceNative();
    module.exports = VoiceNative;
    cc._RF.pop();
  }, {} ]
}, {}, [ "AppLog", "CommonInterface", "CommonPopComp", "FunctionUILayer", "HelloWorld", "Pop1", "VoiceNative" ]);