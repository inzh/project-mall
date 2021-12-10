<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:54:48
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-10 22:18:59
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

  }
}
</script>

<style>
</style>
