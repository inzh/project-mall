<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:58:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-21 22:44:40
 * @Description:
-->
<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请 </span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###">登录</a>
            <a href="####" class="register">免费注册</a> -->
          </p>
          <p v-else>
            {{ userInfo.name }} | <a @click="clearUserLogin">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to="/home" class="logo" title="尚品汇">
          <img src="./images/logo.png" alt="" />
        </router-link>
        <!-- <a class="logo" title="尚品汇" href="/home">
          <img src="./images/logo.png" alt="" />
        </a> -->
      </h1>
      <div class="searchArea">
        <form class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      keyword: '',
    }
  },
  mounted () {
    // Header 组件一旦挂载，就监听事件总线中的 clearKeyword 事件
    this.$bus.$on('clearKeyword', () => {
      this.keyword = ''
    })
  },
  methods: {
    goSearch () {
      // // 不传参数
      // this.$router.push('search')
      // this.$router.push({ path: 'search' })
      // this.$router.push({ name: 'search' }) // name 为路由的命名

      // // 传入 params 参数   /search/:searchKeyWord 取路径中的参数命名为 searchKeyWord
      // // 如请求路径为 /search/iPhone13 则可以通过 $route.params.searchKeyWord 取得 iPhone13
      // // params 对象中 属性 searchKeyWord 与路由中 path: '/search:searchKeyWord' 对应
      // // params 需提供路由的 name 或使用模板字符串手写完整的带有参数的 path
      // this.$router.push({ name: 'search', params: { searchKeyWord: this.searchKeyWord } })
      // this.$router.push({ path: `/search${this.searchKeyWord}` })

      // 传入 query 参数  /search?searchKeyWord=xxxx
      // this.$router.push({ path: '/search', query: { searchKeyWord: this.searchKeyWord } })
      // this.$router.push({ name: 'search', query: { searchKeyWord: this.searchKeyWord } })

      // this.$router.push 返回一个 Promise，底层设定重复调用同一个push会触发底层的 reject 回调，在控制台输出
      // 可以手动将 push 方法的 reject 回调函数重写，让其不在控制台打印该种错误
      // 但是这样操作，每次调用 push 方法都要重写回调，很麻烦，因此修改 VueRouter原型上的 push方法
      // this.$router.push('search', () => { }, () => { })

      // 如果路径中还有 query 参数， 需要将 query参数 和 params 参数合并
      if (this.$route.query) {
        let location = { name: 'search', params: { keyword: this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
      }
    },
    async clearUserLogin () {
      try {
        await this.$store.dispatch('userLogout')
        this.$router.push('/')
      } catch (error) {
        alert('注销失败')
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userinfo.userInfo
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
