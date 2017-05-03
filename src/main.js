// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from './App'
// import router from './router'
import routes from './router';
import Homepage from '@/components/Main'


import 'normalize.css'
import '../static/css/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#Main',
  router,
  template: '<Homepage/>',
  components: { Homepage }
});

router.beforeEach((route, redirect, next) => {
  if (route.path !== '/') {
  }
  document.title = route.meta.title || document.title;
  next();
});

