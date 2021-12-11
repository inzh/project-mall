/*
 * @Author: inzh
 * @Date: 2021-12-10 21:23:38
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-11 16:21:23
 * @Description:
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      showFooter: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      showFooter: false
    }
  },
  {
    name: 'search',
    //  path: '/search', 会匹配诸如 /search，/search?searchKeyWord=xxxx 的路径
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    },
    // URL /search?searchKeyWord=123 会将 {query: '123'} 作为属性，传递给 Search 组件
    // 组件中通过 props: ['query'] 获得该属性
    props: route => ({ query: route.query.searchKeyWord })

    // 假设只需要给组件传静态属性， 此时 searchKeyWord 是静态的，值为 123
    // props: { searchKeyWord: '123' }
  },
  // {
  //   name: 'search',
  //   //  path: '/search/:searchKeyWord', 只匹配  /search/xxx
  //   path: '/search/:searchKeyWord',
  //   component: Search,
  //   meta: {
  //     showFooter: true
  //   },
  //   // 如果 props 被设置为 true，则 route.params 将会被设置为组件属性
  //   // 组件中通过 props: ['searchKeyWord'] 获得该属性
  //   props: true
  // },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
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
