/*
 * @Author: inzh
 * @Date: 2021-12-10 20:54:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-12 16:24:57
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from './components/TypeNav'

// 定义 TypeNav 为全局组件
Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
