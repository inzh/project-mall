<!--
 * @Author: inzh
 * @Date: 2021-12-10 20:58:19
 * @LastEditors: inzh
 * @LastEditTime: 2021-12-10 22:33:11
 * @Description:
-->
<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <!-- <a href="###">登录</a>
            <a href="####" class="register">免费注册</a> -->
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
        <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchKeyWord"
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
      searchKeyWord: '',
    }
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
      this.$router.push({ name: 'search', query: { searchKeyWord: this.searchKeyWord } })

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
