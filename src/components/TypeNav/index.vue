<!--
 * @Author: inzh
 * @Date: 2021-12-11 19:03:38
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-13 20:44:37
 * @Description:
-->
<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派，只有当鼠标移除父亲元素才执行相应方法 -->
      <div @mouseenter="enterSort" @mouseleave="leaveSort(-1)">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="showSort">
            <!-- 不要为每个 a 标签都绑定点击事件，麻烦且消耗性能，为所有 a 标签的父亲绑定点击事件，即事件委托/代理
          事件委托： 利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeTypeNavBg(index)"
              >
                <!-- a 标签最好不要使用 <router-link> 代替，因为<router-link>是一个组件
              每次渲染组件都需要消耗内存，会出现卡顿现象 -->
                <h3 :class="{ cur: index == currentIndex }">
                  <a
                    href="javascript:;"
                    :data-categoryname="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
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
                        <a
                          href="javascript:;"
                          :data-categoryname="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="javascript:;"
                            :data-categoryname="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
      showSort: true
    }
  },
  // 当该组件被挂载时执行 组件分发 Action，目标为 getCategoryList
  mounted () {
    if (this.$route.path != '/home') {
      this.showSort = false
    }
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
    }, 40),

    // 菜单路由跳转，最好的解决方案是 编程式导航 + 事件委派
    goSearch (event) {
      // 存在问题：事件委派，所有子节点如 h3，div，dt，dl 的事件都委派给了父节点
      // 只有点击 a 标签才会发送路由跳转，而且需要确定点击的是哪一个 a 标签

      // event.target 获取当前触发事件的元素,
      // event.target.dataset 获取触发事件元素上的自定义属性
      // 如自定义属性 data-categoryname='xxx' 则获得 { categoryname: 'xxx' }
      let element = event.target
      // element.dataset 返回{ v-18b3c0cc: '', categoryname: '图书、音像、电子书刊' } 解构赋值获得 categoryname
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 只有 a 标签才有 categoryname 属性， 因此可以判断点击的是否为 a 标签
      if (categoryname) {
        // location 最终形式应该是 {name: 'search, query: { categoryName: '', categoryId: '' } }
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        // 为三级菜单再设置自定义属性 category1id 来判断点击的是哪一级菜单
        if (category1id) {
          query.categoryId = category1id
        } else if (category2id) {
          query.categoryId = category2id
        } else if (category3id) {
          query.categoryId = category3id
        }
        location.query = query
        this.$router.push(location)
      }
    },
    enterSort () {
      if (this.$route.path != '/home') {
        this.showSort = true
      }
    },
    leaveSort (index) {
      this.changeTypeNavBg(index)
      if (this.$route.path != '/home') {
        this.showSort = false
      }
    }
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

    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all 0.3s linear;
    }

    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0px;
    }
    .sort-leave-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
