/*
 * @Author: inzh
 * @Date: 2021-12-11 20:00:13
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 16:24:16
 * @Description: axios二次封装
 * 封装的意义：当 axios 不再维护，只需要改这里，暴露出去的网络请求对象为 requests
 */
import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'
import store from "@/store"
// 当创建 axios 实例时为 axios实例设定默认值
// 当调用 requests(config) 时，类似调用 Object.assign(defaultConfig, config)
// 将传入的 config 和这里默认设置的配置合并
const requests = axios.create({
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: '/api',

  // 请求超时 5000ms
  timeout: 5000,
})

// 添加请求拦截器
requests.interceptors.request.use((config) => {
  // 发送请求之前做些什么
  // 每次请求的请求头都带上 uuidToken， 注意这里的 userTempId 不能随便写
  config.headers['userTempId'] = store.state.detail.uuidToken
  // 如果用户登录，携带有token，则将token加到请求头
  if (store.state.userinfo.token) {
    config.headers.token = store.state.userinfo.token
  }
  // 发送请求之前 启用 nprogress进度条
  nprogress.start()
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(new Error('request Failure'))
})

// 添加响应拦截器
requests.interceptors.response.use((response) => {
  // 对相应数据做些什么
  nprogress.done()
  return response
}, (error) => {
  return Promise.reject(new Error('response Failure'))
})

// 模块仅在第一次导入时执行，然后将导出（export）的内容提供给所有的导入（importer）
// 但是每次调用 axios.create 都会创建一个新的 axios 实例
export default requests
