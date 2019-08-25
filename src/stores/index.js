import Vue from 'vue'
import Vuex from 'vuex'
import city from './city';
import user from './user';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{ //引入状态组件
    city,
    user
  }
})
