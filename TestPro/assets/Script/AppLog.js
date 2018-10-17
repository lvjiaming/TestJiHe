const AppLog = cc.Class({
    statics: {
        getInstance() {
            if (!this.appLog) {
                this.appLog = new AppLog();
            }
            return this.appLog;
        },
    },
    _getData() {
        const d = new Date();
        let str = d.getHours()+"";
        let timeStr = "";
        timeStr += (str.length==1 ? ("0"+str) : str) + ":";
        str = d.getMinutes()+"";
        timeStr += (str.length==1 ? ("0"+str) : str) + ":";
        str = d.getSeconds()+"";
        timeStr += (str.length==1 ? ("0"+str) : str) + ".";
        str = d.getMilliseconds()+"";
        if( str.length==1 ) str = "00"+str;
        if( str.length==2 ) str = "0"+str;
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
    },
    _getStack(index) {
        const e = new Error();
        let lines = e.stack.split(""); // 将字符串分割成数组
        lines.shift(); // 删除数组第一项
        const result = [];
        lines.forEach(function (line) {
            line = line.substring(7);
            let lineBreak = line.split(" ");
            if (lineBreak.length<2) {
                result.push(lineBreak[0]);
            } else {
                result.push({[lineBreak[0]] : lineBreak[1]});
            }
        });
        const list = [];
        if(index <= result.length-1){
            for(let a in result[index]){
                list.push(a);
            }
        }
        if( list.length > 0 ) {
            let splitList = list[0].split(".");
            if( splitList.length >=2 ) {
                return ("["+splitList[0] + ".js->" + splitList[1] + "]");
            }
        }
        return "";
    },
    log(msg) {
        const backLog = cc.log || console.log ||  window["log"];
        // if(!AppLog.OPEN_LOG_FLAG){
        //     return;
        // }
        backLog.call(this,"%s%s "+cc.js.formatStr.apply(cc,arguments),this._getData(), this._getStack(2));
    },
    info(msg) {
        const backLog = cc.log || console.log ||   window["log"];
        // if(!AppLog.OPEN_LOG_FLAG){
        //     return;
        // }
        backLog.call(this,"%c%s%s "+cc.js.formatStr.apply(cc,arguments),"color:#00CD00;",this._getData(), this._getStack(2));
    },
});
window.customLog = AppLog.getInstance();