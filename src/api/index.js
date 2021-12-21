/*
 * @Author: inzh
 * @Date: 2021-12-11 20:00:36
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 15:44:15
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
export const reqSearchList = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

export const reqDetail = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get'
})

export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})
// /api/cart/cartList
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

export const reqModifyChecked = (skuID, isChecked) => requests({
  url: `/cart/checkCart/${skuID}/${isChecked}`,
  method: 'get'
})

export const reqDeleteSku = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

export const reqRegisterCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

export const reqRegister = (data) => requests({
  url: '/user/passport/register',
  method: 'POST',
  data
})
