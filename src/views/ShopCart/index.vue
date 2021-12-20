<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="changeSelect($event, cart.skuId)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum(cart, 'minus', -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum(cart, 'change', $event.target.value * 1)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum(cart, 'add', 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteSku(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="selectAll && cartInfoList.length > 0"
          @change="changeSelectAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectedSku">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedSkuNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted () {
    this.getCartList()
  },
  methods: {
    async getCartList () {
      try {
        await this.$store.dispatch('getCartList')
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteSku (skuId) {
      try {
        await this.$store.dispatch('deleteSku', skuId)
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    },
    changeSkuNum: throttle(async function (cart, type, disNum) {
      switch (type) {
        case 'minus':
          if (cart.skuNum > 1) {
            disNum = -1
          } else {
            disNum = 0
          }
          break
        case 'add':
          disNum = 1
          break
        case 'change':
          isNaN(disNum) || disNum < 1 ? disNum = 0 : disNum = parseInt(disNum) - cart.skuNum
          break
      }
      try {
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        this.getCartList()
        return 'ok'
      } catch (error) {
        return Promise.reject(new Error('修改失败'))
      }
    }, 1000),
    async changeSelectAll (e) {
      let isChecked = e.target.checked == true ? 1 : 0
      try {
        await this.$store.dispatch('modifyAllSelected', isChecked)
        this.getCartList()
      } catch {

      }
    },
    async changeSelect (e, skuId) {
      try {
        if (e.target.checked == true) {
          await this.$store.dispatch('modifySelected', { skuId: skuId, isChecked: 1 })
        } else {
          await this.$store.dispatch('modifySelected', { skuId: skuId, isChecked: 0 })
        }
        this.getCartList()
      } catch {
        return Promise.reject(new Error('修改失败'))
      }

    },
    async deleteSelectedSku () {
      try {
        await this.$store.dispatch('deleteSelectedSku')
        this.getCartList()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartInfoList']),
    selectedSkuNum () {
      return this.cartInfoList.reduce((num, item) => item.isChecked == 1 ? num += 1 : num += 0, 0)
    },
    totalPrice () {
      return this.cartInfoList.reduce((price, item) => item.isChecked == 1 ? price += (item.cartPrice * item.skuNum) : price += 0, 0)
    },
    selectAll () {
      let flag = true
      this.cartInfoList.forEach(item => {
        if (item.isChecked == 0) {
          flag = false
        }
      })
      return flag
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
