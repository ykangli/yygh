'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//export default使得getList()和save()方法能被别的js调用
exports.default = {
    getList: function getList() {
        console.log('获取讲师列表');
    },
    save: function save() {
        console.log('保存讲师');
    }
};