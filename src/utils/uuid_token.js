/*
 * @Author: inzh
 * @Date: 2021-12-19 17:26:15
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-19 17:38:33
 * @Description:
 */
import { v4 as uuidv4 } from 'uuid'

// 给uuid本地存储起一个全局统一名字
const USERTEMPIDKEY = 'USER_TEMP_ID_KEY'

export const getUUID = () => {
  // 先从本地存储找 uuid_token
  let uuid_token = localStorage.getItem(USERTEMPIDKEY)
  // 如果本地不存在 uuid_token，则创建一个新的 uuid_token 并保存到本地
  if (!uuid_token) {
    uuid_token = uuidv4()
    localStorage.setItem(USERTEMPIDKEY, uuid_token)
  }
  // 返回 uuid_token
  return uuid_token
}

