// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from './App'
// import router from './router'
import Home from '@/components/Home'

import 'normalize.css'
import '../static/css/style.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home'
    }
  ],
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
  el: '#app',
  router,
  template: '<Home/>',
  components: { Home }
})
