import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios';
Vue.config.productionTip = false
Vue.prototype.axios = axios
// 过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

import Scroller from '@/components/Scroller';
import Loading from '@/components/Loading';

Vue.component('Scroller', Scroller);
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
