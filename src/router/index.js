/*
 * @Author: inzh
 * @Date: 2021-12-10 21:23:38
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-10 22:31:20
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
    //  path: '/search/:searchKeyWord', 只匹配  /search/xxx
    //  path: '/search', 会匹配诸如 /search，/search?searchKeyWord=xxxx 的路径
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
