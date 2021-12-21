/*
 * @Author: inzh
 * @Date: 2021-12-21 15:21:46
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 15:38:25
 * @Description:
 */
import { reqRegisterCode } from '@/api'
const userinfo = {
  state: {
    code: ''
  },
  getters: {},
  mutations: {
    RECEIVE_REGISTER_CODE (state, code) {
      state.code = code
    }
  },
  actions: {
    async getRegisterCode ({ commit }, phone = 'xxx') {
      let result = await reqRegisterCode(phone)
      if (result.data.code == 200) {
        commit('RECEIVE_REGISTER_CODE', result.data.data)
        return 'ok'
      } else {
        return Promise.reject(new Error('获取验证码失败'))
      }
    }
  }
}

export default userinfo
