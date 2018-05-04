import Vue from 'vue';
import Vuetify from 'vuetify';

import 'babel-polyfill';

window.Vue = Vue;

Vue.use(Vuetify);

const app = new Vue({
  el : '#app'
});