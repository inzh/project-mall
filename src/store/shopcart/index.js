/*
 * @Author: inzh
 * @Date: 2021-12-19 17:13:11
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-19 19:58:40
 * @Description:
 */
import { reqCartList } from "@/api"
const shopcart = {
  state: {
    cartList: []
  },
  getters: {
    cartInfoList (state) {
      return state.cartList[0] ? state.cartList[0].cartInfoList : []
    }
  },
  mutations: {
    RECEIVE_CART_LIST (state, cartList) {
      state.cartList = cartList
    }
  },
  actions: {
    async getCartList ({ commit }) {
      let result = await reqCartList()
      if (result.data.code == 200) {
        commit('RECEIVE_CART_LIST', result.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('请求购物车列表失败'))
      }
    }
  }
}

export default shopcart
