import Ajax from './api.js';
// 模拟数据api
export default {
  seller(arg) {
    return Ajax.ajaxGet('seller', arg);
  }
};
