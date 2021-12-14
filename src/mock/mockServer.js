/*
 * @Author: inzh
 * @Date: 2021-12-14 08:52:36
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 08:55:08
 * @Description:
 */
import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'

Mock.mock('/mock/banners', {
  code: 200,
  data: banners
})

Mock.mock('/mock/floors', {
  code: 200,
  data: floors
})
