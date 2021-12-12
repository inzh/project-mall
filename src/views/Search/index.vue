<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:57:04
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-12 16:27:05
 * @Description:
-->
<template>
  <div>
    <!-- 通过$route获取query值，耦合度太高 -->
    <!-- <h1>{{ $route.query.searchKeyWord }}</h1> -->
    <h1>{{ query }}</h1>
  </div>
</template>

<script>
export default {
  // 在路由中设置 props: true 则 route.params 会被设置为组件属性
  // 在路由中设置 props: route=>({query: route.query.searchKeyWord})
  props: ['searchKeyWord', 'query']
}
</script>

<style>
</style>
