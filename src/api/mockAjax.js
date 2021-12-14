/*
 * @Author: inzh
 * @Date: 2021-12-14 08:56:09
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 09:36:22
 * @Description:
 */
import axios from "axios"

const mockAjax = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

mockAjax.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(new Error('request Failure'))
})

mockAjax.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(new Error('response Failure'))
})

export default mockAjax
