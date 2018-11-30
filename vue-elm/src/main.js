// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// import axios from 'axios';
import api from './api/index';
// window.sell_api = api;
Vue.prototype.sell_api = api;
// 全局引用
require('!style-loader!css-loader!less-loader!./assets/style/index.less');
// import './assets/style/index.less';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
