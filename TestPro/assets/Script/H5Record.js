window.AudioContext = window.AudioContext || window.webkitAudioContext;
const H5Record = cc.Class({
    statics: {
        getInstance() {
            if (!this.record) {
                this.record = new H5Record();
            }
            return this.record;
        },
    },
    _hasReady: null,  //是否已获取权限

    _audioContext: null, // AudioContext实例

    _mediaStream: null, // 麦克风的权限

    _leftDataList: null, // 存放左声道数据的list

    _rightDataList: null, // 存放右声道数据的list

    _curMediaNode: null, // 当前的mediaNode

    _curJsNode: null, // 当前的jsNode

    _recordKey: null, // 录音开关

    _node: null, // 播放节点
    ctor() {
        this._hasReady = false;
        this._leftDataList = [];
        this._rightDataList = [];
        this._recordKey = false;
        this._node= null;
    },

    /**
     *  设置节点
     */
    setNode(node) {
        this._node = node;
    },

    /**
     *  设置是否已获取权限
     */
    setHasReady(state) {
        this._hasReady = state;
    },
    /**
     *  获取是否已获取权限
     * @returns {null}
     */
    getHasReady() {
        return this._hasReady;
    },

    /**
     *  通过audioContext播放声音
     */
    playByAudioContext(arrayBuff) {
        if (arrayBuff) {
            console.log("arrayBuff: ", arrayBuff.size);
            const audioContext = new AudioContext();
            let audioNode = audioContext.createBufferSource();  // 创建一个audioBufferSourceNode实例
            // console.log("audioNode: ", audioNode);
            // 解码
            audioContext.decodeAudioData(arrayBuff, (audioBuffer) => {
                console.log("audioBuffer: ", audioBuffer);
                audioNode.buffer = audioBuffer;
                audioNode.connect(audioContext.destination);  // 连接扬声器
                audioNode.start(0); // 从第0秒开始播放
                setTimeout(() => {
                    audioContext.close();
                    console.log("关闭audioContext");
                }, (audioBuffer.duration + 0.5) * 1000);
            });
        } else {
            console.log("arrayBuff is null");
        }
    },

    /**
     *  通过VideoPlay播放
     */
    playByVideoPlay(arrayBuff) {
        if (this._node) {
            const videoPlay = this._node.getComponent(cc.VideoPlayer);
            if (videoPlay) {
                const blob = new Blob([new Uint8Array(arrayBuff)]);
                console.log("blob: ", blob);
                const url = URL.createObjectURL(blob);
                console.log("url: ", url);
                videoPlay.remoteURL = url;
                videoPlay.play();
            }
        }
    },

    /**
     *  开始录音
     */
    startRecord(mediaStream) {
        if (this._hasReady) {
            console.log("开始录音");
            this._recordKey = true;
            this._leftDataList = [];
            this._rightDataList = [];
            const audioContext = new AudioContext();
            // audioContext.close();
            this._audioContext = audioContext;
            const mediaNode = audioContext.createMediaStreamSource(mediaStream);
            this._curMediaNode = mediaNode;
            const jsNode = this.creatJsNode(audioContext);
            this._curJsNode = jsNode;
            jsNode.connect(audioContext.destination);
            jsNode.onaudioprocess = this.onAudioProcess.bind(this);
            mediaNode.connect(jsNode);
        } else {
            console.log("未获取到权限");
        }
    },

    /**
     * 创建一个javascriptProcessorNode实例
     */
    creatJsNode(audioContext) {
        const BUFFER_SIZE = 4096;  // 缓冲区大小
        const INPUT_CHANNEL_COUNT = 2;  // 输入频道数量（双声道）
        const OUTPUT_CHANNEL_COUNT = 2; // 输出频道数量（双声道）

        // createJavaScriptNode已废弃
        let creator = audioContext.createScriptProcessor || audioContext.createJavaScriptNode;
        creator = creator.bind(audioContext);
        return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
    },

    /**
     *  声音数据的回调(录音时会持续回调)
     */
    onAudioProcess(event) {
        // console.log("声音数据：", event);
        let audioBuffer = event.inputBuffer;
        let leftChannelData = audioBuffer.getChannelData(0);  // 获取左声道的数据
        let rightChannelData = audioBuffer.getChannelData(1); // 获取右声道的数据
        // console.log("左声道：", leftChannelData);
        // console.log("右声道：", rightChannelData);
        this._leftDataList.push(leftChannelData.slice(0));
        this._rightDataList.push(rightChannelData.slice(0));
    },

    /**
     *  停止录音
     */
    stopRecord() {
        console.log("结束录音");
        if (this._recordKey) {
            this._recordKey = false;
            // this._mediaStream.getAudioTracks()[0].stop();
            this._curMediaNode.disconnect();
            this._curJsNode.disconnect();
            if (this._audioContext) {
                this._audioContext.close();
            }
            // console.log("获取的声音数据为：", this._leftDataList, this._rightDataList);
            if (this._leftDataList && this._rightDataList && this._leftDataList.length > 0 && this._rightDataList.length > 0) {
                const lefe = this.mergeArray(this._leftDataList);
                const right = this.mergeArray(this._rightDataList);
                // console.log("合并后的声道数据：", lefe, right);
                const audioData = this.mergeLeftAndRight(lefe, right);
                // console.log("声音数据为：", audioData);
                const wavFileData = this.createWavFile(audioData);
                console.log("wav声音数据：", wavFileData);
                // console.log("base64: ", this.arrayBufferToBase64(wavFileData));
                this.playByAudioContext(wavFileData);
                // this.playByVideoPlay(wavFileData);
            } else {
                console.log("录入时间太短，未收集到音频数据");
            }
        } else {
            console.log("录音开关未开");
        }
    },

    /**
     *  合并单个声道的数据
     */
    mergeArray(list) {
        let length = list.length * list[0].length;
        let data = new Float32Array(length);
        let offset = 0;
        for (let index = 0; index < list.length; index ++) {
            data.set(list[index], offset);
            offset = offset + list[index].length;
        }
        return data;
    },

    /**
     *  合并左右声道的数据（）
     *  wav格式存储的时候并不是先放左声道再放右声道的，而是一个左声道数据，一个右声道数据交叉放的
     */
    mergeLeftAndRight(left, right) {
        const length = left.length + right.length;
        let data = new Float32Array(length);
        for (let index = 0; index < left.length; index++) {
            let k = index * 2;
            data[k] = left[index];
            data[k + 1] = right[index];
        }
        // 压缩
        // let getRawDataion = parseInt(this._audioContext.sampleRate / 44100);
        // let lengths = data.length / getRawDataion;
        // let result = new Float32Array(lengths);
        // let index = 0, j = 0;
        // while (index < lengths) {
        //     result[index] = data[j];
        //     j += getRawDataion;
        //     index++;
        // }
        return data;
    },

    /**
     *  创建wav声音文件
     */
    createWavFile(audioData) {
        const WAV_HEAD_SIZE = 44;
        const bufferLength = audioData.length * 2 + WAV_HEAD_SIZE;
        let buffer = new ArrayBuffer(bufferLength);
        let view = new DataView(buffer);
        // 写入头部信息
        this.writeUTFBytes(view, 0, "RIFF");
        view.setUint32(4, 36 + audioData.length * 2, true);
        // console.log("setUint32: ", view.setUint32);
        // console.log("getUint32: ", view.getUint32());
        this.writeUTFBytes(view, 8, "WAVE");
        this.writeUTFBytes(view, 12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 2, true);
        view.setUint32(24, 44100, true);
        view.setUint32(28, 44100 * 2, true);
        view.setUint16(32, 2 * 2, true);
        view.setUint16(34, 16, true);
        this.writeUTFBytes(view, 36, "data");
        view.setUint32(40, audioData.length * 2, true);

        // 写入声音数据
        const length = audioData.length;
        let index = 44;
        let volum = 1;
        for (let i = 0; i < length; i++) {
            view.setInt16(index, audioData[i] < 0 ? audioData[i] * 0x8000 : audioData[i] * 0x7FFF, true);
            index = index + 2;
        }
        // console.log("view: ", view);
        return buffer;
    },

    writeUTFBytes(view, offset, string) {
        const length = string.length;
        for (let index = 0; index < length; index++) {
            view.setUint8(offset + index, string.charCodeAt(index));
        }
    },

    /**|
     *  base64转ArrayBuffer
     * @param base64String
     */
    base64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    },

    /**
     * ArrayBuffer转base64
     */
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    },
    /**
     *  取消录音
     */
    cancelRecord() {
        if (this._curMediaNode) {
            this._curMediaNode.disconnect();
            this._curMediaNode = null;
        }
        if (this._curJsNode) {
            this._curJsNode.disconnect();
            this._curJsNode = null;
        }
        if (this._audioContext) {
            this._audioContext.close();
        }
        this._recordKey = false;
    },

});