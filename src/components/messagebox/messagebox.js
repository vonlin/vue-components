/**
 * Created by Administrator on 2017/5/23.
 */
import Vue from 'vue'

let messagebox_vue =require('./index');
let Class_MessageBox = Vue.extend(messagebox_vue);

let instancePool = [];

let getInstance = function(){
  if(instancePool.length > 0){
    return instancePool[0];
  }
  return new Class_MessageBox({
    el: document.createElement("div")
  });
};



let MessageBox = (options = {}) => {
  let msgbox = getInstance();
  instancePool.push(msgbox);

  msgbox.type = options.type || "ok";
  msgbox.msg = typeof options === "string" ? options : options.msg;
  document.body.appendChild(msgbox.$el);
  msgbox.show = true;
};

export default MessageBox;
