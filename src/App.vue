<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:54:48
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-13 20:47:56
 * @Description:
-->
<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer v-show="showFooter" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  computed: {
    showFooter () {
      return this.$route.meta.showFooter
    }
  },
  methods: {

  },
  mounted () {
    // TypeNav 请求数据应该在 根组件被挂载时请求，而不是 TypeNav 组件被挂载时请求
    this.$store.dispatch("getCategoryList")
  }
}
</script>

<style>
</style>
