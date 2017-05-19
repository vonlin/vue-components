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


var FastClick = require('../static/lib/fastclick')
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

/*
* 解决 IOS 10 Safari 浏览器meta设置禁止缩放无效问题
*/
window.onload=function () {
  document.addEventListener('touchstart',function (event) {
    if(event.touches.length>1){
      event.preventDefault();
    }
  })
  var lastTouchEnd=0;
  document.addEventListener('touchend',function (event) {
    var now=(new Date()).getTime();
    if(now-lastTouchEnd<=300){
      event.preventDefault();
    }
    lastTouchEnd=now;
  },false)
}

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

let indexScrollTop = 0;
router.beforeEach((route, redirect, next) => {
  if (route.path !== '/home') {
    indexScrollTop = document.getElementById("home").scrollTop;
  }
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(route => {
  if (route.path !== '/home') {
    document.body.scrollTop = 0;
  } else {
    Vue.nextTick(() => {
      document.getElementById("home").scrollTop = indexScrollTop;
    });
  }
});


