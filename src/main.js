/*
 * @Author: inzh
 * @Date: 2021-12-10 20:54:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 09:42:16
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'
import '@/mock/mockServer'

// 定义 TypeNav 为全局组件
Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
