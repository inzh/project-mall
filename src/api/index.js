/*
 * @Author: inzh
 * @Date: 2021-12-11 20:00:36
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 16:12:10
 * @Description: 将 API 统一管理，防止 URL 发生改变时需要到处修改 URL
 */
import requests from './requests'
import mockAjax from './mockAjax'

// axios 实例应该有返回值，而不是简单调用，所以要 return requests
export const reqCategoryList = () => {
  // 传入的配置会和默认配置合并
  return requests({
    // 相当于  /api/product/getBaseCategoryList
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

export const reqBanners = () => mockAjax.get('/banners')
export const reqFloors = () => mockAjax.get('/floors')
