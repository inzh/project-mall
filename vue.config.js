/*
 * @Author: inzh
 * @Date: 2021-12-10 17:49:03
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-11 20:58:01
 * @Description:
 */

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      // 请求 /api/xxx 现在会被代理到请求 http://39.98.123.211/api/xxx,
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: { '^/api': '' } // 重写路径 请求 /api/xxx 现在会被代理到请求 http://39.98.123.211/xxx,
      }
    }
  }
}
