/**
 * Created by Administrator on 2017/5/19.
 */
import Vue from 'vue'

let toast_vue = require('./index.vue');
let Class_Toast = Vue.extend(toast_vue);

let toastPool = [];//池子

let getInstance = () => {
  if(toastPool.length > 0){
    return toastPool[0];
  }
  return new Class_Toast({
    el: document.createElement("div")
  });
};

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance);
  }
};

Class_Toast.prototype.close = function() {
  this.show = false;
  returnAnInstance(this);
};

let Toast = (options = {}) => {
  let duration = options.duration || 3000;

  let toast = getInstance();
  toast.msg = typeof options == 'string' ? options : options.msg;
  toast.position = options.position || 'middle';
  toast.icon = options.icon || '';
  toast.afterLeave = options.afterLeave;
  document.body.appendChild(toast.$el);
  Vue.nextTick(function(){
    toast.show = true;
    setTimeout(()=>{
      toast.close();
    },duration);
  });
  return toast;

};
export default Toast;
