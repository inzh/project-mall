/*
 * @Author: inzh
 * @Date: 2021-12-10 20:54:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-10 21:27:28
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
