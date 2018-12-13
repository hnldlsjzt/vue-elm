<template>
  <div class="goods">
    <div class="menu-wraper" ref="menuWrapper">
      <ul>
        <li class='menu-item' v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
          <span class="text"> <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wraper" ref="foodWrapper">
      <ul>
        <li class='foods-list foods-list-hook' v-for="(item,index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class='foods-item' v-for="(food,index) in item.foods" :key="index" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating ? food.rating : 0}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-ontrol-wraper">
                  <v-cart-control :food="food"></v-cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></v-shopcart>
    <v-food-info :food="selectedFood" ref="foodInfo"></v-food-info>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Shopcart from 'components/shopcart/Shopcart';
  import CartControl from 'components/cartControl/CartControl';
  import FoodInfo from 'components/foodInfo/FoodInfo';
  const ERR_OK = 0;
  export default {
    name: 'GoodsItem',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0, // 页面滚动距离
        selectedFood: {}
      };
    },
    components: {
      'v-shopcart': Shopcart,
      'v-cart-control': CartControl,
      'v-food-info': FoodInfo
    },
    computed: {
      currentIndex() {
        // console.log('计算属性不计算');
        for (let i = 0; i < this.listHeight.length; i++) {
          let currentHeight = this.listHeight[i];
          let nextHeight = this.listHeight[i + 1];
          if (!nextHeight || (this.scrollY >= currentHeight && this.scrollY < nextHeight)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((item, i) => {
          item.foods.forEach((v, i) => {
            if (v.count) {
              foods.push(v);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.sell_api.goods().then((data) => {
        if (data.errno === ERR_OK) {
          this.goods = data.data;
          this.$nextTick(() => {
            this.initBScroll();
            this.calculateHeight();
          });
        }
      });
    },
    methods: {
      initBScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // better-scroll默认只监听touch事件，其他给阻止了
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          click: true,
          probeType: 3 // 实时监测滚动位置
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight() {
        let height = 0;
        let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook');
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight; // 元素高度，叠加
          this.listHeight.push(height);
        }
      },
      selectMenu(index, event) {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook');
        let foodli = foodList[index]; // 点击menu后，对应的foodlist[index]
        this.foodScroll.scrollToElement(foodli, 300);
      },
      selectFood(food, event) {
        this.selectedFood = food;
        this.$refs.foodInfo.initShow();
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/style/mixin.less';
  .goods {
    display: flex;
    position: absolute;
    top: 176px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .menu-wraper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        text-align: center;
        .border-1px(#ccc);
        &.current {
          margin-top: -1px;
          z-index: 10;
          background: #fff;
          &:after {
            display: none;
          }
        }
        .icon {
          margin-right: 2px;
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          &.decrease {
            background-image: url('decrease_3@2x.png');
          }
          &.discount {
            background-image: url('discount_3@2x.png');
          }
          &.guarantee {
            background-image: url('guarantee_3@2x.png');
          }
          &.invoice {
            background-image: url('invoice_3@2x.png');
          }
          &.special {
            background-image: url('special_3@2x.png');
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
    .foods-wraper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .foods-item {
        display: flex;
        margin: 18px 18px 0;
        padding-bottom: 18px;
        .border-1px(rgba(7,
        17,
        27,
        0.1));
        &.last-child {
          &:after {
            display: none;
          }
        }
        .icon {
          flex: 0 0 57px;
          margin: 10px;
        }
        .content {
          flex: 1;
          .name {
            font-size: 14px;
            line-height: 14px;
            height: 14px;
            margin: 2px 0 8px 0;
            color: rgb(7, 17, 27);
          }
          .desc,
          .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            line-height: 24px;
            font-weight: 700;
            .now,
            .old {
              line-height: 24px;
              font-size: 0;
            }
            .now {
              font-size: 14px;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }
            .old {
              font-size: 10px;
              color: rgb(147, 153, 159);
              text-decoration: line-through;
            }
          }
          .cart-ontrol-wraper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }

</style>
