/*
 * @Author: inzh
 * @Date: 2021-12-21 15:21:46
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 20:52:39
 * @Description:
 */
import { reqRegisterCode, reqRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const userinfo = {
  state: {
    code: '',
    token: getToken(),
    userInfo: {}
  },
  getters: {},
  mutations: {
    RECEIVE_REGISTER_CODE (state, code) {
      state.code = code
    },
    RECEIVE_TOKEN (state, token) {
      state.token = token
    },
    RECEIVE_USER_INFO (state, data) {
      state.userInfo = data
    },
    CLEAR_USER_INFO (state) {
      state.userInfo = {}
      removeToken()
      state.token = {}
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
    },
    async userRegister ({ commit }, userData) {
      let result = await reqRegister(userData)
      if (result.data.code == 200) {
        return '注册成功'
      } else if (result.data.code == 223) {
        return Promise.reject(new Error('手机号已经存在'))
      } else {
        return Promise.reject(new Error('注册失败'))
      }
    },
    async userLogin ({ commit }, userData) {
      let result = await reqUserLogin(userData)
      if (result.data.code == 200) {
        commit('RECEIVE_TOKEN', result.data.data.token)
        setToken(result.data.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('登录失败'))
      }
    },
    async getUserInfo ({ commit }) {
      let result = await reqUserInfo()
      if (result.data.code == 200) {
        commit('RECEIVE_USER_INFO', result.data.data)
      }
    },

    async userLogout ({ commit }) {
      let result = await reqLogout()
      if (result.data.code == 200) {
        commit('CLEAR_USER_INFO')
        return 'ok'
      } else {
        return Promise.reject(new Error('注销失败'))
      }
    },
  }
}

export default userinfo
