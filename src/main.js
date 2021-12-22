/*
 * @Author: inzh
 * @Date: 2021-12-10 20:54:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-22 11:37:52
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import '@/mock/mockServer'
import Pagination from './components/Pagination'
import * as API from '@/api'
// 定义 TypeNav 为全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

new Vue({
  router,
  store,
  // 所有生命周期钩子的 this 上下文将自动绑定至实例中
  beforeCreate () {
    // 在 Vue 原型上绑定一个 bus 实例
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  },
  render: h => h(App)
}).$mount("#app")
