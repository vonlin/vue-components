//公共样式文件
import '../static/css/normalize.css'
import '../static/css/style.css'

import Toast from './components/toast';
import DateTime from './components/dateTime';
import MessageBox from './components/messagebox';
import Button from './components/button';
import Loading from './components/loading';


const install = (Vue,options = {}) => {
  Vue.component(Button.name,Button);

  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$DateTime = Vue.prototype.$DateTime = DateTime;
  Vue.$messgeBox = Vue.prototype.$messageBox = MessageBox;
  Vue.$loading = Vue.prototype.$loading = Loading;
};

if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue);
}

export default {
  install,
  Toast,
  DateTime,
  MessageBox,
  Button,
  Loading
}
