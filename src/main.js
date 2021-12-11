/*
 * @Author: inzh
 * @Date: 2021-12-10 20:54:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-11 20:51:55
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from './views/Home/TypeNav'
import { reqCategoryList } from './api'

console.log(reqCategoryList())
// 定义 TypeNav 为全局组件
Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
