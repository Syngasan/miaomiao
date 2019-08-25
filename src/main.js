import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false
// 把axios赋值到全局中
Vue.prototype.axios = axios

// 过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})
// 引入为全局组件
import Scroller from '@/components/Scroller'; //滑动
import Loading from '@/components/Loading'; //加载
// 注册为全局组件
Vue.component('Scroller', Scroller);
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
