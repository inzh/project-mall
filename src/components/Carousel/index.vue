<!--
 * @Author: inzh
 * @Date: 2021-12-14 17:25:20
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 17:34:09
 * @Description:
-->
/*
 * @Author: inzh
 * @Date: 2021-12-14 17:25:20
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-14 17:25:20
 * @Description:
 */
<template>
  <div class="swiper" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in carouselList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min.js'
import 'swiper/swiper-bundle.min.css'
export default {
  name: 'Carousel',
  props: ['carouselList'],
  watch: {
    carouselList: {
      // 无论数据有没有变化，上来立即监听一次
      immediate: true,
      handler () {
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.cur, {
            autoplay: true,
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
