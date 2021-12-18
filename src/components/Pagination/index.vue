<!--
 * @Author: inzh
 * @Date: 2021-12-17 17:13:31
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-17 18:24:01
 * @Description:
-->
<template>
  <div class="pagination">
    <button
      @click="$emit('changePage', pageNo - 1)"
      :disabled="pageNo == 1 ? true : false"
    >
      上一页
    </button>
    <button
      :class="{ active: pageNo == 1 }"
      v-if="startNumAndEnd.start > 1"
      @click="$emit('changePage', 1)"
    >
      1
    </button>
    <button v-if="startNumAndEnd.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndEnd.continuesArr"
      :key="index"
      :class="{ active: page == pageNo }"
      @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEnd.end < totalPages - 1">···</button>
    <button
      :class="{ active: pageNo == totalPages }"
      v-if="startNumAndEnd.end < totalPages"
      @click="$emit('changePage', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      @click="$emit('changePage', pageNo + 1)"
      :disabled="pageNo == totalPages ? true : false"
    >
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo 表示当前第几页， continues 表示中间连续多少位数字， totalPages 表示总共多少页
  props: ['pageNo', 'continues', 'totalPages'],
  computed: {
    startNumAndEnd () {
      let start = 0
      let end = 0
      if (this.totalPages < this.continues) {
        start = 1
        end = this.totalPages
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        if (start <= 0) {
          start = 1
          end = this.continues
        }
        if (end >= this.totalPages) {
          end = this.totalPages
          start = end - this.continues + 1
        }
      }
      let continuesArr = new Array(this.continues).fill(start).map((item, index) => item + index)
      return { start, end, continuesArr }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
    &.disabled {
      cursor: not-allowed;
    }
  }
}
</style>
