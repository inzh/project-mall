/*
 * @Author: inzh
 * @Date: 2021-12-21 20:34:53
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 20:52:06
 * @Description:
 */

const USERTOKEN = 'TOKEN'
export const setToken = (token) => {
  localStorage.setItem(USERTOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(USERTOKEN) || {}
}

export const removeToken = () => {
  localStorage.removeItem(USERTOKEN)
}
