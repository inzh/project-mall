/*
 * @Author: inzh
 * @Date: 2021-12-18 11:38:50
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-18 22:38:26
 * @Description:
 */

import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
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
  // {
  //   name: 'search',
  //   //  path: '/search', 会匹配诸如 /search，/search?searchKeyWord=xxxx 的路径
  //   path: '/search',
  //   component: Search,
  //   meta: {
  //     showFooter: true
  //   },
  //   // URL /search?searchKeyWord=123 会将 {query: '123'} 作为属性，传递给 Search 组件
  //   // 组件中通过 props: ['query'] 获得该属性
  //   props: route => ({ query: route.query.searchKeyWord })

  //   // 假设只需要给组件传静态属性， 此时 searchKeyWord 是静态的，值为 123
  //   // props: { searchKeyWord: '123' }
  // },
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
  {
    name: 'search',
    // path: '/search/:searchKeyWord?', 既可以匹配 /search/searchKeyWord 也可以 /search?searchKeyWord
    // 还可以 /search/searchKeyWord？searchKeyWord=xxx
    path: '/search/:keyword?',
    component: Search,
    meta: {
      showFooter: true
    },
    // 如果 props 被设置为 true，则 route.params 将会被设置为组件属性
    // 组件中通过 props: ['searchKeyWord'] 获得该属性
    props: true
  },
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: Detail,
    meta: {
      showFooter: true
    }
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: {
      showFooter: true
    }
  },

]

export default routes
