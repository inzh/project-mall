/*
 * @Author: inzh
 * @Date: 2021-12-12 16:17:52
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 15:31:25
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import userinfo from './userinfo'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  getters: {},
  mutations: {
  },
  actions: {},
  modules: {
    home,
    search,
    detail,
    shopcart,
    userinfo
  }
})

export default store
