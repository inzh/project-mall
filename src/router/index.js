/*
 * @Author: inzh
 * @Date: 2021-12-10 21:23:38
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-18 11:41:26
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})


// 重写 VueRouter 原型上的 push方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  // 如果在调用 push 方法时手动传入了 onComplete 或者 onAbort 方法，则调用下面这个
  if (onComplete || onAbort) {
    // originalPush 的调用者是 window， 应该使用 call 指定调用者为 VueRouter
    // this.$router.push 应该返回一个 Promise，所以这里应该 return
    return originalPush.call(this, location, onComplete, onAbort)
  }
  // 如果未手动传 onComplete 或者 onAbort 方法，则采用默认错误捕捉
  return originalPush.call(this, location).catch(err => err)
}

// 重写 VueRouter 原型上的 replace 方法
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    return originalReplace.call(this, location, onComplete, onAbort)
  }
  return originalReplace.call(this, location).catch(err => err)
}


export default router
