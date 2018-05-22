import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../view/Login/Login';
import Home from '../view/Home/Home';
import Test from '../view/Test';

const router = new VueRouter({
  routes : [
    {
      path      : '/login',
      name      : Login.name,
      component : Login
    },
    {
      path      : '/home',
      name      : Home.name,
      component : Home
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