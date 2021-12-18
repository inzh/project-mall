<!--
 * @Author: inzh
 * @Date: 2021-12-18 10:58:42
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-18 17:07:36
 * @Description:
-->
<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in imgList"
        :key="img.id"
        @click="changeActive(index)"
      >
        <img :src="img.imgUrl" :class="{ active: index == currentIndex }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

export default {
  name: "ImageList",
  data () {
    return {
      currentIndex: 0
    }
  },
  props: ['imgList'],
  methods: {
    changeActive (index) {
      this.currentIndex = index
      this.$bus.$emit('changeZoomImg', index)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
