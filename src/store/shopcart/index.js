/*
 * @Author: inzh
 * @Date: 2021-12-19 17:13:11
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-20 20:31:48
 * @Description:
 */
import { reqCartList, reqModifyChecked, reqDeleteSku } from "@/api"
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
    },
    async modifySelected ({ commit }, { skuId, isChecked }) {
      let result = await reqModifyChecked(skuId, isChecked)
      if (result.data.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('修改选中状态失败'))
      }
    },
    async modifyAllSelected ({ dispatch, getters }, isChecked) {
      let promiseArr = []
      for (let cart of getters.cartInfoList) {
        let p = await dispatch('modifySelected', { skuId: cart.skuId, isChecked })
        promiseArr.push(p)
      }
      let getCartList = await dispatch('getCartList')
      promiseArr.push(getCartList)
      return Promise.all(promiseArr)
    },
    async deleteSku ({ commit }, skuId) {
      let result = await reqDeleteSku(skuId)
      if (result.data.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('删除失败'))
      }
    },
    deleteSelectedSku ({ dispatch, getters }) {
      let promiseArr = []
      getters.cartInfoList.forEach(item => {
        if (item.isChecked == 1) {
          let p = dispatch('deleteSku', item.skuId)
          promiseArr.push(p)
        }
      })
      return Promise.all(promiseArr)
    }
  }
}

export default shopcart
