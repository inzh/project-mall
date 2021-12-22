/*
 * @Author: inzh
 * @Date: 2021-12-12 16:17:52
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-22 11:42:57
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import userinfo from './userinfo'
import trade from './trade'
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
    userinfo,
    trade
  }
})

export default store
