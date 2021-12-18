<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑导航 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 售卖属性面包屑导航 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(':')[1] }}<i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tradeMarkInfo="tradeMarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOrderOne }" @click="changeOrder('1')">
                  <a href="javascript:;"
                    >综合<span
                      v-show="isOrderOne"
                      class="iconfont"
                      :class="{ 'icon-Up-': isUp, 'icon-Down-': isDown }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isOrderTwo }" @click="changeOrder('2')">
                  <a href="javascript:;"
                    >销量<span
                      v-show="isOrderTwo"
                      class="iconfont"
                      :class="{ 'icon-Up-': isUp, 'icon-Down-': isDown }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div style="text-align: center">
            <Pagination
              :pageNo="pageNo"
              :continues="5"
              :totalPages="totalPages"
              @changePage="changePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        props: [],
        trademark: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 4
      }
    }
  },
  components: {
    SearchSelector
  },
  // 从首页三级联菜单跳转到 search 组件时会触发 search 组件的 beforeMount 方法
  beforeMount () {
    // Object.assign 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    // 当search组件挂载，就分发一次 action 向服务器请求数据
    this.getSearchInfo()
  },
  methods: {
    // 将分发 action 封装成一个函数，以便随处使用
    getSearchInfo () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    removeCategory () {
      // 将 searchParams 对应参数设置为 undefined，向后台请求时，searchParams 不会包含这些参数
      // 当删除分类面包屑时，需要将 searchParams 中所有与分类有关的参数置为 undefined
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 点击 X 号去掉面包屑导航时，需要重新再请求一次
      this.getSearchInfo()
      // 如果路径中没有 params 参数，则 this.$route.params 返回 空对象，空对象是真值
      // 如果还有 params 参数 需要带上 params 参数跳转
      // 再次访问 search 组件并不会重新挂载 search 组件，这里是通过监听路由变化实现请求数据
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    removeKeyword () {
      // 当删除关键字面包屑时，需要将 searchParams 中的 keyword 参数置为 undefined
      this.searchParams.keyword = undefined
      this.getSearchInfo()
      // 通过 $bus 事件总线 发送一个全局事件，清除 搜索框中的关键字
      this.$bus.$emit("clearKeyword")
      // 如果路由中还有query参数，应当保留下来
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 如果子组件事件抛出一个值，则这个值将会作为第一个参数传入父组件监听事件函数
    tradeMarkInfo (tradeMark) {
      // 请求格式为 "ID:品牌名称"
      this.searchParams.trademark = `${tradeMark.tmId}:${tradeMark.tmName}`
      this.getSearchInfo()
    },
    removeTrademark () {
      this.searchParams.trademark = undefined
      this.getSearchInfo()
    },
    attrInfo (attrReq) {
      if (this.searchParams.props.indexOf(attrReq) == -1) {
        this.searchParams.props.push(attrReq)
        this.getSearchInfo()
      }
    },
    removeProp (index) {
      this.searchParams.props.splice(index, 1)
      this.getSearchInfo()

    },
    changeOrder (flag) {
      // 获取初始的 order，判断排序方式是否变化
      let originalFlag = this.searchParams.order.split(':')[0]
      let originalOrder = this.searchParams.order.split(':')[1]
      // 若排序方式未发生变化，则修改 升降序
      if (flag === originalFlag) {
        this.searchParams.order = originalOrder == 'desc' ? `${flag}:asc` : `${flag}:desc`
      } else {
        // 若排序方式发生变化，则直接将 排序修改为新的排序方式，默认降序
        this.searchParams.order = `${flag}:desc`
      }
      // 然后再次发送请求
      this.getSearchInfo()
    },
    changePage (page) {
      this.searchParams.pageNo = page
      this.getSearchInfo()
    }
  },
  computed: {
    // 请注意 mapGetters 不存在模块的概念，所有模块的 Getters 都在 this.$store.getters.xxx
    // mapGetters 传入数组，若想为 getter 属性取别名，使用对象形式
    ...mapGetters(['goodsList']),
    isOrderOne () {
      return this.searchParams.order.indexOf('1') != -1
    },
    isOrderTwo () {
      return this.searchParams.order.indexOf('2') != -1
    },
    isUp () {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDown () {
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      pageNo: state => state.search.searchList.pageNo,
      totalPages: state => state.search.searchList.totalPages
    })
  },
  // 监听路由变化实现 再次发送请求
  watch: {
    // 注意不要加 this
    $route () {
      // 因为并不是每次都会有 category1Id、category2Id、category3Id，
      // 上一次的请求可能只包含category1Id，而没有category2Id、category3Id
      // 每次请求就不会覆盖上一次的category1Id、category2Id、category3Id，因此请求之前应该将其清空
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      // 路由一旦发送变化，就拼合路由的请求参数，然后再发送请求
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getSearchInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                span {
                  font-size: 6px;
                  margin-left: 2px;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
