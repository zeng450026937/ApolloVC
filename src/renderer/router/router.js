import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../view/Login';
import Navigation from '../view/Navigation';
import Test from '../view/Test';

const router = new VueRouter({
  routes : [
    {
      path      : '/login',
      name      : Login.name,
      component : Login
    },
    {
      path      : '/meeting',
      name      : Navigation.name,
      component : Navigation
    },
    {
      path      : '/test',
      name      : Test.name,
      component : Test
    },
    {
      path     : '*',
      redirect : '/login'
    }
  ]
});

export default router;