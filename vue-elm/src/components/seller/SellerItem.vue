<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h3 class="title">{{seller.name}}</h3>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="text">{{seller.ratingCount}}</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class='remark'>
          <li class='block'>
            <h3 class='text'>起送价</h3>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="text">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="text">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>


      </div>
      <v-split></v-split>
      <div class="bulletin-wrapper">
        <h3 class="title">公告与活动</h3>
        <p class="text">{{seller.bulletin}}</p>
        <ul class='supports-wrapper'>
          <li class='supports-item' v-for='(item,index) in seller.supports' :key='index'>
            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            <span class="desc">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="pics">
        <h3 class="title">
          商家实景
        </h3>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class='pic-list' ref='picList'>
            <li class='pic-item' v-for="(picItem,index) in seller.pics" :key="index">
              <img class="pic" width="120" height="90" :src="picItem" alt="商家店铺图片">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="info-wrapper">
        <h3 class="title">商家信息</h3>
        <ul class="info-list">
          <li class="info-item" v-for="(infoItem,index) in seller.infos" :key='index'>
            <span class="text">{{infoItem}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'components/star/StarItem';
  import Split from 'components/split/Split';
  import BScroll from 'better-scroll';
  export default {
    name: 'SellerItem',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
    },
    methods: {
      _initScroll() {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        });
      },
      _initPicScroll() {
        if (this.seller.pics) {
          let picW = 120;
          let margin = 6;
          let w = (picW + margin) * this.seller.pics.length - 6;
          let picList = this.$refs.picList;
          picList.style.width = w + 'px';
          // this.$refs.picList.style.width = w + "px";
          // console.log(this.$refs.picList);
          // console.log(w);
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical', // 滚动方向横向
                click: true
              })
            } else {
              this.picScroll.refresh();
            }
          });

        }

      }
    },
    components: {
      'v-star': Star,
      'v-split': Split
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  @import '../../assets/style/mixin.less';
  .seller {
    position: fixed;
    top: 176px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .seller-content {
      .overview {
        padding: 0 18px;
        position: relative;
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          padding: 18px 0 8px 0;
        }
        .desc {
          padding-bottom: 18px;
          .border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 8px;
            vertical-align: top;
          }
          .text {
            display: inline-block;
            vertical-align: top;
            margin-right: 12px;
            line-height: 18px;
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
        .remark {
          padding: 18px 0;
          display: flex;
          .block {
            flex: 3;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            &:last-child {
              border-right: none;
            }
            .text {
              font-size: 10px;
              line-height: 10px;
              color: rgb(147, 153, 159);
            }
            .content {
              margin-top: 14px;
              font-size: 10px;
              line-height: 14px;
              color: rgb(7, 17, 27);
              .stress {
                font-size: 24px;
                font-weight: 200;
              }
            }
          }
        }
      }
      .bulletin-wrapper {
        padding: 0 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          padding: 18px 0 8px 0;
        }
        .text {
          padding: 0 12px 16px;
          font-size: 12px;
          line-height: 24px;
          font-weight: 200;
          color: rgb(240, 20, 20);
          .border-1px(rgba(7, 17, 27, 0.1));
        }
        .supports-item {
          padding: 16px 12px;
          .border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            &:after {
              border: none;
            }
          }
          .icon {
            margin-right: 2px;
            display: inline-block;
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            /*vertical-align: top;*/
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
          .desc {
            vertical-align: top;
            line-height: 16px;
            font-weight: 200;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
        }
      }
      .pics {
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          padding-bottom: 12px;
        }
        .pic-wrapper {
          width: 100%;
          overflow: hidden;
          .pic-list {
            font-size: 0;
            .pic-item {
              display: inline-block;
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
      .info-wrapper {
        padding: 18px;
        .title {
          font-size: 14px;
          line-height: 14px;
          color: rgb(7, 17, 27);
          padding-bottom: 12px;
          .border-1px(rgba(7,
          17,
          27,
          0.1));
        }
        .info-item {
          padding: 16px 12px;
          .border-1px(rgba(7,
          17,
          27,
          0.1));
          &:last-child {
            &:after {
              border: none;
            }
          }
          .text {
            font-size: 12px;
            line-height: 16px;
          }
        }
      }
    }
  }

</style>
