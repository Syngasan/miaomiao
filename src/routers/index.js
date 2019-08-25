import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie';
import cinemaRouter from './cinema';
import mineRouter from './mine';
import adminRouter from './admin';

Vue.use(Router)

export default new Router({
  mode: 'history', //
  // base: process.env.BASE_URL,
  // 修改根路径
  base: 'miaomaio',
  // 引入路由
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path: "/*", //重定向到movie
      redirect: "/movie"
    }
  ]
})
