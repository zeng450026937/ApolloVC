import 'babel-polyfill';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuetify from 'vuetify';

window.Vue = Vue;
Vue.use(Vuetify);

import i18n from './i18n/i18n';
import router from './router/router';
import App from './view/App.vue';

/* eslint-disable no-unused-vars */
const app = new Vue({
  el         : '#app',
  i18n       : i18n,
  router     : router,
  template   : '<App/>',
  components : { App }
});
/* eslint-enable no-unused-vars */