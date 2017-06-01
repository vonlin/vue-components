/**
 * Created by Administrator on 2017/5/26.
 */
import Vue from 'vue'

let loading_vue = require('./index.vue');
let Class_Loading = Vue.extend(loading_vue);

let pool = [];//池子
let canvas = null;

let getInstance = () => {
  if(pool.length > 0){
    return pool[0];
  }
  return new Class_Loading({
    el: document.createElement("div")
  });
};

Class_Loading.prototype.show = function(type) {
  document.body.appendChild(this.$el);
  canvas = canvas || document.getElementById("rotate-loading");
  this.ctx = canvas.getContext("2d");
  if(type === false){
    canvas = null;
    this.ctx = null;
  }
  this.loadingshow(type);
}


let Loading = (type) => {
  let loading = getInstance();
  pool.push(loading);
  loading.show(type);
  return loading;

};
export default Loading;
