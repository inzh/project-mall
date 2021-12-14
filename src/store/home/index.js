/*
 * @Author: inzh
 * @Date: 2021-12-12 16:20:41
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 09:47:11
 * @Description:
 */
import { reqCategoryList, reqBanners, reqFloors } from '@/api'
const home = {
  state: {
    categoryList: [],
    banners: [],
    floors: [],
  },
  getters: {},
  mutations: {
    // 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
    // 可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）这里是 categoryList
    RECEIVE_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList.slice(0, categoryList.length - 1)
    },
    RECEIVE_BANNERS (state, Banners) {
      state.banners = Banners
    },
    RECEIVE_FLOORS (state, Floors) {
      state.floors = Floors
    }
  },
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
    // context.commit 提交一个 mutation
    // 或者通过 context.state 和 context.getters 来获取 state 和 getters
    // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
    // 解构赋值语法从 context 中获取 commit
    // async 确保函数返回 Promise，await 关键字让 JavaScript 引擎等待直到 promise 完成并返回结果
    async getCategoryList ({ commit }) {
      let result = await reqCategoryList()
      if (result.status === 200) {
        commit("RECEIVE_CATEGORY_LIST", result.data.data)
      }
    },

    async getBanners ({ commit }) {
      let result = await reqBanners()
      if (result.data.code === 200) {
        commit('RECEIVE_BANNERS', result.data.data)
      }
    },

    async getFloors ({ commit }) {
      let result = await reqFloors()
      if (result.data.code === 200) {
        commit('RECEIVE_FLOORS', result.data.data)
      }
    }
  }
}

export default home
