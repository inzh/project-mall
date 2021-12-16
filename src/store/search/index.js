/*
 * @Author: inzh
 * @Date: 2021-12-12 16:20:45
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-16 16:54:10
 * @Description:
 */
import { reqSearchList } from '@/api'
const search = {
  state: {
    searchList: {}
  },
  getters: {
    attrsList (state) {
      // 当访问 state.searchList.attrsList 失败时，应返回一个空数组
      // || 运算符返回第一个为 true 的值
      return state.searchList.attrsList || []
    },
    goodsList (state) {
      return state.searchList.goodsList || []
    },
    trademarkList (state) {
      return state.searchList.trademarkList || []
    }

  },
  mutations: {
    RECEIVE_SEARCH_LIST (state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    // /api/list 这个接口至少需要一个空对象参数
    async getSearchList ({ commit }, params = {}) {
      let result = await reqSearchList(params)
      if (result.data.code == 200) {
        commit('RECEIVE_SEARCH_LIST', result.data.data)
      }
    }
  }
}

export default search
