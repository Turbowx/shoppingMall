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
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <!-- 复选框 -->
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked"
              @change="getIsChecked(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="tremble(modify('sub', -1, item), 2000)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="
                tremble(modify('input', $event.target.value * 1, item), 2000)
              "
            />
            <a class="plus" @click="tremble(modify('add', 1, item), 2000)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteGoods(item.skuId)">删除</a>
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
          :checked="isAllChecked && cartList.length > 0"
          @change="quanxuan($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toTradeView">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {
      // AllChecked: false,
    };
  },
  computed: {
    ...mapGetters(["shopCartList"]),
    cartList() {
      return this.shopCartList.cartInfoList || [];
    },
    //总价
    totalPrice() {
      let sum = 0;
      this.cartList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    //全选
    isAllChecked() {
      // let res;
      // this.cartList.forEach((item, index) => {
      //   console.log("第" + index + "个", item.isChecked == 1);
      //   if (item.isChecked != 1) {
      //     // res = false;
      //     return false;
      //   }
      // });
      // return true;
      // console.log(res);
      // this.AllChecked = res;

      return this.cartList.every((item, index) => {
        item.isChecked == 1;
      });
    },
  },
  mounted() {
    //派发获取购物车列表actions
    this.getShopCart();
    // setTimeout(() => {
    //   // console.log(this.isAllChecked);
    // }, 500);
  },
  methods: {
    //获取购物车数据
    getShopCart() {
      this.$store.dispatch("getShopCart");
    },
    //改变选中状态
    getIsChecked(item) {
      let checked = item.isChecked == 1 ? 0 : 1;
      this.$store.dispatch("getIsChecked", {
        skuId: item.skuId,
        isChecked: checked,
      });

      this.getShopCart();
    },
    //修改商品个数
    modify: _.debounce(async function (way, num, item) {
      switch (way) {
        case "add":
          num = 1;
          break;
        case "sub":
          num = item.skuNum > 1 ? -1 : 0;
          break;
        case "input":
          num = isNaN(num) || num < 1 ? 0 : parseInt(num) - item.skuNum;
          break;
      }
      try {
        await this.$store.dispatch("addToCart", {
          skuid: item.skuId,
          skuNum: num,
        });
        this.getShopCart();
      } catch (error) {}
    }, 1000),
    //删除商品
    deleteGoods(skuId) {
      this.$store.dispatch("deleteGoods", skuId);
      this.getShopCart();
    },
    //删除选中商品
    async deleteAllGoods() {
      try {
        await this.$store.dispatch("deleteAllGoods");
        this.getShopCart();
      } catch (error) {
        console.log(error);
      }
    },
    //全选
    async quanxuan(e) {
      try {
        let isChecked = e.target.checked ? "1" : "0";
        await this.$store.dispatch("selectAll", isChecked);
        this.getShopCart();
      } catch (error) {
        console.log(error.message);
      }
    },
    //到订单页面
    toTradeView(){
      this.$router.push({name:'trade'})
    },

    
  },
};
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
        display: flex;
        align-items: center;
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
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>