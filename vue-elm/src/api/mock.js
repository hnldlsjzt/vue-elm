import Ajax from './api.js';
// 模拟数据api
export default {
  seller(arg) {
    return Ajax.ajaxGet('seller', arg);
  },
  goods(arg) {
    return Ajax.ajaxGet('goods', arg);
  },
  ratings(arg) {
    return Ajax.ajaxGet('ratings', arg);
  }
};
