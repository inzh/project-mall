/*
 * @Author: inzh
 * @Date: 2021-12-18 11:45:39
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-19 19:40:20
 * @Description:
 */
import { reqDetail, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const detail = {
  state: {
    detailInfo: {},
    // 当挂载 detail这个仓库时，就生成临时 uuid_token
    uuidToken: getUUID()
  },
  getters: {
    // 这里的 state 参数表示当前 modules 中的 state
    categoryView (state) {
      return state.detailInfo.categoryView || {}
    },
    skuInfo (state) {
      return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList (state) {
      return state.detailInfo.spuSaleAttrList || []
    }
  },
  mutations: {
    RECEIVE_DETAIL_INFO (state, detailInfo) {
      state.detailInfo = detailInfo
    }
  },
  actions: {
    async getDetailInfo ({ commit }, skuId) {
      let result = await reqDetail(skuId)
      if (result.data.code == 200) {
        commit('RECEIVE_DETAIL_INFO', result.data.data)
      }
    },
    async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      if (result.data.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('加入购物车失败'))
      }
    }
  }
}

export default detail
