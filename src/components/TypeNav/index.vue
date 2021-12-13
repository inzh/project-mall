<!--
 * @Author: inzh
 * @Date: 2021-12-11 19:03:38
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-13 16:52:58
 * @Description:
-->
<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派，只有当鼠标移除父亲元素才执行相应方法 -->
      <div @mouseleave="changeTypeNavBg(-1)">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="changeTypeNavBg(index)"
            >
              <h3 :class="{ cur: index == currentIndex }">
                <a href="">{{ c1.categoryName }}</a>
              </h3>
              <!-- 动态赋予样式 -->
              <div
                class="item-list clearfix"
                :style="{ display: index == currentIndex ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a href="">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  // TypeNav导航，全局组件
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
    }
  },
  // 当该组件被挂载时执行 组件分发 Action，目标为 getCategoryList
  mounted () {
    this.$store.dispatch("getCategoryList")
  },
  computed: {
    // mapState() 辅助函数返回一个对象，包含生成的计算属性
    // 可以用对象展开运算符将这些生成的计算属性暴露出来
    // mapState() 函数需要传入一个对象进行配置映射
    ...mapState({
      // 当前 vuex Modules home 中存在一个 state categoryList
      // 普通 rootState 方法为 this.$store.stateName
      // 获取 Modules 中的 state 方法为 this.$store.Modules.stateName

      // 1、函数参数  自定义计算属性名：state => state.categoryList
      // 会自动映射 自定义计算属性名 和 state.categoryList
      // 这里就会创建一个 计算属性 categoryList
      // 这里的 state 参数是 rootState
      categoryList: state => state.home.categoryList

      // 2、字符串参数 传字符串参数 'categoryList' 等同于 `state => state.categoryList`
      // 无法获取 Modules 中的 State
      // categoryList: 'categoryList'
    }),
  },
  methods: {
    // 调用 lodash 节流函数 在 wait 秒内最多执行 func 一次
    // throttle() 返回一个经过节流处理的 function
    // throttle() 最后别使用箭头函数，可能会出现上下文情况
    // debounce的特点是当事件快速连续不断触发时，动作只会执行一次
    changeTypeNavBg: throttle(function (index) {
      this.currentIndex = index
    }, 40)

  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .cur {
            background-color: skyblue;
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
      }
    }
  }
}
</style>
