<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wraper">
          <div class="logo" :class="{'highlight':totalPrice > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalPrice > 0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice > 0}"> ￥{{totalPrice}}元</div>
        <div class="desc" v-show="deliveryPrice > 0">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="minPriceDesc" :class="isEnough">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-contain">
      <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-for="(item,index) in balls" :key="index" v-show="item.show">
          <span class="inner inner-hook icon-remove_circle_outline"></span>
        </div>
      </transition-group>
    </div>
    <transition name='fold'>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h3 class='title'>购物车</h3>
          <div class="empty" @click.stop.prevent="empty">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class='food' v-for="(item,index) in selectFoods" :key="index">
              <div class="food-l">
                <span class='name'>{{item.name}}</span>
                <span class='price'>
                {{item.price*item.count}}
                </span>
              </div>
              <div class="food-r">
                <v-cart-control :food="item"></v-cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="maskMove">
      <div class="mask" v-show="listShow" @click.stop.prevent="hideList"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import CartControl from 'components/cartControl/CartControl';
  export default {
    name: 'Shopcart',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            count: 0,
            price: 0
          }];
        }
      },
      // 运费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 最低起送
      minPrice: {
        type: Number,
        default: 0
      }
    },
    components: {
      'v-cart-control': CartControl
    },
    data() {
      return {
        inner: null,
        // 定义多个对象，表示页面中做多同时运动的小球
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        fold: true // true标识折叠
      };
    },
    created() {
      // 获取按钮组件的点击元素，用在drop里面
      this.$root.eventHub.$on('cart.add', this.drop);
      this.$nextTick(() => {
        this.inner = document.getElementsByClassName('inner-hook')[0];
      });
    },
    computed: {
      totalCount() {
        let totalCount = 0;
        this.selectFoods.forEach((v, i) => {
          totalCount += v.count;
        });
        console.log(totalCount);
        return totalCount;
      },
      totalPrice() {
        let totalPrice = 0;
        this.selectFoods.forEach((v, i) => {
          totalPrice += v.count * v.price;
        });
        return totalPrice;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.minPrice > this.totalPrice) {
          let differPrice = this.minPrice - this.totalPrice;
          return `还差${differPrice}元起送`;
        } else {
          return '去结算';
        }
      },
      isEnough() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow() {
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh(); // 刷新
            }
          });
        }
        return show;
      }
    },
    methods: {
      drop(ele) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          // 找到空闲的小球
          if (!ball.show) {
            ball.show = true; // 表示可以有下落动画
            ball.el = ele;
            this.dropBalls.push(ball);
            return false;
          }
        }
      },
      beforeEnter(ele) {
        let len = this.balls.length;
        while (len--) {
          let ball = this.balls[len];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); // 获取某个元素相对于窗口的位置
            let x = rect.left - 32; // 购物车中心点
            let y = -(window.innerHeight - rect.top - 22);
            ele.style.display = '';
            ele.style.webkitTransform = `translate3d(0,${y}px,0)`;
            ele.style.transform = `translate3d(0,${y}px,0)`;
            // let inner = ele.getElementsByClassName('inner-hook')[0];
            this.inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            this.inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(ele) {
        let e = ele.offsetHeight; // 触发浏览器重排 因为是'即时计算'所有会导致页面重排，offset,scroll,client等方法都可以触发
        ele.style.webkitTransform = 'translate3d(0, 0, 0)';
        ele.style.transform = 'translate3d(0, 0, 0)';
        // let inner = ele.getElementsByClassName('inner-hook')[0];
        this.inner.style.webkitTransform = 'translate3d(0,0,0)';
        this.inner.style.transform = 'translate3d(0,0,0)';
      },
      afterEnter(ele) {
        // 小球落完之后
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          ele.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) { // 表示购物车没有商品
          return;
        };
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      empty() {
        this.selectFoods.forEach((v, i) => {
          console.log(v);
          v.count = 0;
        });
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/style/mixin.less';
  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;
    height: 48px;
    width: 100%;
    .content {
      display: flex;
      background: #141d27;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        .logo-wraper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          box-sizing: border-box;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          background: #141d27;
          text-align: center;
          line-height: 44px;
          .logo {
            width: 100%;
            height: 100%;
            background: #2b343c;
            border-radius: 50%;
            &.highlight {
              background: rgb(0, 160, 220);
            }
            .icon-shopping_cart {
              font-size: 24px;
              color: #80858a;
              /*line-height: 48px;*/
              &.highlight {
                color: rgb(255, 255, 255);
              }
            }
          }
          .num {
            position: absolute;
            right: 0;
            top: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          padding-right: 12px;
          margin-top: 12px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          height: 100%;
          margin: 12px 0 0 12px;
          line-height: 24px;
          font-size: 12px;
          box-sizing: border-box;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        height: 56px;
        text-align: center;
        .minPriceDesc {
          font-size: 12px;
          font-weight: 700;
          line-height: 48px;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-contain {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        color: #fff;
        &.drop-enter,
        &.drop-enter-active {
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
          .inner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.4s linear;
          }
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      &.fold-enter-active,
      &.fold-leave-active {
        transition: all 0.5s;
      }
      &.fold-leave-active {
        transform: translate3d(0, -100%, 0);
      }
      &.fold-enter,
      &.fold-leave-active {
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          font-size: 14px;
        }
        .empty {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        height: 217px;
        max-height: 217px;
        /*padding: 0 18px;*/
        background-color: #fff;
        overflow: hidden;
        .food {
          position: relative;
          z-index: 50;
          display: flex;
          padding: 12px 0;
          .border-1px(rgba(7,
          17,
          27,
          0.1));
          .food-l {
            flex: 1;
            display: flex;
            justify-content: space-between;
            line-height: 36px;
            font-size: 14px;
            padding-left: 18px;
            .name {
              color: rgb(7, 17, 27);
            }
            .price {
              font-weight: 700;
              color: rgb(240, 20, 20);
            }
          }
          .food-r {
            flex: 0 0 100px;
            width: 100px;
          }
        }
      }
    }
    .mask {
      position: fixed;
      left: 0;
      top: 0;
      z-index: -2;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.6);
      filter: blur(10px);
      backdrop-filter: blur(10px);
      &.maskMove-enter-active,
      &.maskMove-leave-active {
        transition: all .5s;
      }
      &.maskMove-enter {
        opacity: 1;
      }
      &.maskMove-leave-active {
        opacity: 0;
      }
    }
  }

</style>
