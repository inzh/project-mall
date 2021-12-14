<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:57:04
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 17:42:40
 * @Description:
-->
<template>
  <div id="home">
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floors" :key="floor.id" :floorList="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  // 应该在Home组件中请求 floor 数据
  mounted () {
    this.$store.dispatch('getFloors')
  },
  computed: {
    ...mapState({
      floors: store => store.home.floors
    })
  }
}
</script>

<style>
</style>
