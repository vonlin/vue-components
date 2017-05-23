/**
 * Created by Administrator on 2017/5/19.
 */
import Vue from 'vue'

let dateTime_vue = require('./index.vue');
let Class_DateTime = Vue.extend(dateTime_vue);

let getInstance = () => {
  return new Class_DateTime({
    el: document.createElement("div")
  });
};

Class_DateTime.prototype.close = function() {
  this.show = false;
};

/**
 * {
 *    type: 'YYYY-MM-DD',
 *    confirm: function(data){},
 * }
 * @param options
 * @constructor
 */

let DateTime = (options = {}) => {
  let dt = getInstance();
  dt.type = options.position || 'YY-MM-DD';
  dt.confirmCallback = options.confirmCallback;
  dt.bindEl = options.bindEl;
  document.body.appendChild(dt.$el);
  Vue.nextTick(function(){
    dt.show = true;
  });
  return dt;
};
export default DateTime;
