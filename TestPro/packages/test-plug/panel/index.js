Editor.Panel.extend({
    /**
     *  样式
     */
    style: `
    :host { margin: 5px; }
    h2 { color: #f90; }
  `,

    /**
     *  模板
     */
    template: `
    <h2>标准面板</h2>
    <ui-button id="btn">点击</ui-button>
    <hr />
    <div>状态: <span id="label">--</span></div>
  `,

    /**
     *  获取界面的ui元素
     */
    $: {
        btn: '#btn',
        label: '#label',
    },

    ready () {
        this.$btn.addEventListener('confirm', () => {
            this.$label.innerText = '你好';
            setTimeout(() => {
                this.$label.innerText = '--';
            }, 500);
        });
    },
});