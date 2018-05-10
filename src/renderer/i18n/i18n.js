import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

import messages from './messages';

const locale = navigator.languages[0] || navigator.language || navigator.browserLanguage;

const i18n = new VueI18n({
  locale         : locale,
  fallbackLocale : 'en',
  messages       : messages
});

export default i18n;