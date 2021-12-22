
/*
 * @Author: inzh
 * @Date: 2021-12-22 11:39:56
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-22 13:46:53
 * @Description:
 */
import { reqUserAddressInfo, reqUserTradeInfo } from '@/api'
const trade = {
  state: {
    addressInfo: {},
    tradeInfo: {}
  },
  getters: {
    addressInfo (state) {
      return state.addressInfo
    }
  },
  mutations: {
    RECEIVE_ADDRESS_INFO (state, addressInfo) {
      state.addressInfo = addressInfo
    },
    RECEIVE_TRADE_INFO (state, tradeInfo) {
      state.tradeInfo = tradeInfo
    }
  },
  actions: {
    async getUserAddressInfo ({ commit }) {
      let result = await reqUserAddressInfo()
      if (result.data.code == 200) {
        commit('RECEIVE_ADDRESS_INFO', result.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('获取用户地址信息失败'))
      }
    },
    async getUserTradeInfo ({ commit }) {
      let result = await reqUserTradeInfo()
      if (result.data.code == 200) {
        commit('RECEIVE_TRADE_INFO', result.data.data)
      }
    }
  }
}
export default trade
