<template>
  <transition name="move">
    <div class="food-info" v-show="showFlag" ref="foodInfo">
      <div class="food-content">
        <div class="img-header">
          <img class='img' :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="extra">
            <span class="count">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="pirce">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <v-cart-control :food="food"></v-cart-control>
          </div>
          <transition name="addCartMove">
            <div class="addCartShop" @click="addFirst($event)" v-show="!food.count || food.count===0">加入购物车</div>
          </transition>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="info" v-show="food.info">
          <h3 class="title">商品信息</h3>
          <p class="text">{{food.info}}</p>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="rating">
          <h3 class="title">商品评价</h3>
          <v-rating-select :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @seleRatings="filterRatings"
            @isContent="isContent"></v-rating-select>
          <div class="rating-wraper">
            <ul v-show='food.ratings && food.ratings.length'>
              <li class='rating-item' v-for="(item,index) in food.ratings" :key='index' v-show="needShowList(item.rateType,item.text)">
                <div class="rating-time">{{item.rateTime|formatDate('yyyy-MM-dd hh:mm')}}</div>
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <img class="avatar" :src="item.avatar" width="12" height="12">
                </div>
                <p class='text'>
                  <i class="icon" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
                  <span>{{item.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no_ratings" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import 'common/js/formdate';
  import BScroll from 'better-scroll';
  import CartControl from 'components/cartControl/CartControl';
  import Split from 'components/split/Split';
  import RatingSelect from 'components/ratingSelect/RatingSelect';
  const ALL = 2;
  export default {
    name: 'foodInfo',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        onlyContent: false, // 只看有内容的评论,因为这里有的监听，v-show里面的函数才会实时变化
        selectType: ALL,
        testShow: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      initShow() {
        console.log('get到了这个技能点');
        console.log(this.food);
        this.showFlag = true;
        this.onlyContent = false; // 默认为false，显示所有
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.foodInfo, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) { // 添加商品到购物车
        if (!event._constructed) { // 阻止pc端点击后执行两次
          return;
        }
        console.log('click');
        Vue.set(this.food, 'count', 1);
        this.$root.eventHub.$emit('cart.add', event.target); // 传输点击的目标元素,动画
      },
      filterRatings(type) {
        console.log(type);
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShowList(type, text) {
        console.log('是v-show吗');
        // console.log(this.onlyContent, text);
        if (this.onlyContent && !text) {
          return false;
        }
        // 是否显示所有评论
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      },
      isContent(bl) {
        this.onlyContent = bl;
        // this.testShow = bl;// 用来测试v-show函数怎么触发更新。在函数里面使用这个属性就行
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    components: {
      'v-cart-control': CartControl,
      'v-split': Split,
      'v-rating-select': RatingSelect
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/style/mixin.less';
  .food-info {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 38px;
    z-index: 30;
    width: 100%;
    background-color: #fff;
    transition: all .3s;
    &.move-enter-active {
      transform: translate3d(0, 0, 0);
    }
    &.move-enter,
    &.move-leave-to {
      transform: translate3d(100%, 0, 0);
      /*transform: translateX(100%);*/
    }
    .food-content {
      .img-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        .img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          left: 10px;
          top: 10px;
          z-index: 1;
          color: #fff;
        }
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          margin-bottom: 8px;
          font-weight: 700px;
          color: rgb(7, 17, 27);
        }
        .extra {
          margin-bottom: 18px;
          height: 10px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
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
            margin-right: 0px;
          }
          .now {
            font-size: 24px;
            font-weight: 700px;
            color: rgb(240, 20, 20);
          }
          .old {
            font-size: 10px;
            color: rgb(147, 153, 159);
            text-decoration: line-through;
          }
        }
        .cartControl-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .addCartShop {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          padding: 0 12px;
          text-align: center;
          line-height: 24px;
          height: 24px;
          font-size: 10px;
          background: rgb(0, 160, 220);
          color: #fff;
          border-radius: 12px;
          box-sizing: border-box;
          transition: all .2s;
          &.addCartMove-enter-active {
            opacity: 1;
          }
          &.addCartMove-enter,
          &.addCartMove-leave-to {
            opacity: 0;
          }
        }
      }
      .info {
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .text {
          color: rgb(77, 85, 93);
          line-height: 24px;
          font-size: 12px;
          font-weight: 200;
          padding: 0 8px;
        }
      }
      .rating {
        padding-top: 18px;
        .title {
          line-height: 14px;
          margin-left: 18px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .rating-wraper {
          padding: 0 18px;
          .rating-item {
            position: relative;
            padding: 16px 0;
            font-size: 0;
            .border-1px(rgba(7,
            17,
            27,
            0.1));
            .rating-time {
              display: inline-block;
              position: absolute;
              left: 0;
              top: 16px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
            .user {
              display: inline-block;
              position: absolute;
              right: 0;
              top: 16px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              .name {
                font-size: 10px;
                line-height: 12px;
                color: rgb(147, 153, 159);
                vertical-align: top;
              }
              .avatar {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                vertical-align: top;
              }
            }
            .text {
              font-size: 12px;
              line-height: 24px;
              color: rgb(7, 17, 27);
              margin-top: 18px;
              .icon {
                margin-right: 4px;
                &.icon-thumb_up {
                  color: rgb(0, 160, 220);
                }
              }
            }
          }
          .no-ratings {
            text-align: center;
          }
        }
      }
    }
  }

</style>
