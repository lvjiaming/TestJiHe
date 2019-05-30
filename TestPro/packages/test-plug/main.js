'use strict';
module.exports = {

    /**
     *  插件加载时触发
     */
    load () {
        // 当 package 被正确加载的时候执行
    },

    /**
     *  插件卸载时触发
     */
    unload () {
        // 当 package 被正确卸载的时候执行
    },

    /**
     *  IPC消息
     */
    messages: {
        'open' () {
            Editor.log('Hello World!');
            Editor.Panel.open("test-plug");
        }
    },
};