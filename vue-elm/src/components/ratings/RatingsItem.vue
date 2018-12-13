<template>
  <div class="ratings" ref="ratingsContent">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h3 class='food-score'>{{seller.foodScore}}</h3>
          <div class="title">综合评分</div>
          <div class="rank-rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class='title'>服务态度</span>
            <v-star :size="36" :score="seller.score"></v-star>
            <span class='score'>{{seller.score}}</span>
          </div>
          <div class="score-wrapper">
            <span class='title'>商家态度</span>
            <v-star :size="36" :score="seller.score"></v-star>
            <span class='score'>{{seller.score}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-rating-select :ratings="ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc" @seleRatings="filterRatings"
        @isContent="isContent"></v-rating-select>
      <div class="ratings-wrapper">
        <ul>
          <li class='ratings-item' v-for="(item,index) in ratings" :key="index" v-show="needList(item.rateType,item.text)">
            <div class="avatar">
              <img :src="item.avatar" width='28' height="28" alt="用户头像">
            </div>
            <div class="content">
              <div class="username">
                {{item.username}}
              </div>
              <div class="star-wrapper">
                <v-star :size="24" :score="item.score"></v-star>
                <span class="delivery-time">
                  {{item.deliveryTime}}分钟送达
                </span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend-wrapper">
                <i class="icon-thumb_up"></i>
                <span class="text" v-for="(recommendItem,index) in item.recommend" :key="index" v-show="item.recommend && item.recommend.length">{{recommendItem}}</span>
              </div>
              <div class="rating-time">{{item.rateTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Star from 'components/star/StarItem';
  import Split from 'components/split/Split';
  import RatingSelect from 'components/ratingSelect/RatingSelect';
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  const ALL = 2;
  export default {
    name: 'RatingsItem',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [], // 评论列表
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    components: {
      'v-star': Star,
      'v-split': Split,
      'v-rating-select': RatingSelect
    },
    created() {
      console.log('没发现执行啊');
      this.sell_api.ratings({
        id: 0
      }).then((res) => {
        if (res.errno === ERR_OK) {
          console.log(res);
          this.ratings = res.data;
          this.$nextTick(() => {
            this._initScrool();
          });
        }
      });
    },
    methods: {
      _initScrool() {
        this.ratingScrool = new BScroll(this.$refs.ratingsContent, {
          click: true
        });
      },
      filterRatings(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScrool.refresh();
        });
      },
      isContent(bl) {
        this.onlyContent = bl;
        this.$nextTick(() => {
          this.ratingScrool.refresh();
        });
      },
      needList(type, text) {
        console.log('是否执行');
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .ratings {
    position: fixed;
    top: 176px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ratings-content {
      .overview {
        display: flex;
        padding: 18px 0;
        .overview-left {
          flex: 0 0 137px;
          width: 137px;
          padding-bottom: 6px;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          @media only screen and(max-width: 320px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .food-score {
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }
          .title {
            margin-bottom: 8px;
            font-size: 12px;
            line-height: 12px;
            color: rgb(7, 17, 27);
          }
          .rank-rate {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .overview-right {
          flex: 1;
          padding: 6px 0 0 24px;
          @media only screen and(max-width: 320px) {
            padding-left:6px;
          }
          .score-wrapper {
            margin-bottom: 6px;
            .title {
              display: inline-block;
              line-height: 12px;
              font-size: 12px;
            }
            .star {
              display: inline-block;
              vertical-align: top;
              padding: 0 12px;
              @media only screen and(max-width: 320px) {
                padding:0 6px;
              }
            }

            .score {
              display: inline-block;
              font-size: 12px;
              line-height: 18px;
              color: rgb(255, 153, 0);
            }
          }
          .delivery-wrapper {
            margin-bottom: 6px;
            font-size: 0;
            .title {
              font-size: 12px;
              line-height: 18px;
              padding-right: 12px;
            }
            .delivery-time {
              font-size: 12px;
              line-height: 18px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .ratings-wrapper {
        .ratings-item {
          padding: 18px;
          display: flex;
          .avatar {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            img {
              border-radius: 50%;
            }
          }
          .content {
            flex: 1;
            position: relative;
            .username {
              padding-bottom: 8px;
              font-size: 10px;
              line-height: 12px;
              color: rgb(7, 17, 27);
            }
            .star-wrapper {
              font-size: 0px;
              padding-bottom: 6px;
              .star {
                display: inline-block;
                vertical-align: top;
                margin-right: 6px;
              }
              .delivery-time {
                display: inline-block;
                font-size: 10px;
                font-weight: 200;
                line-height: 12px;
                color: rgb(147, 153, 159);
              }
            }
            .text {
              font-size: 12px;
              line-height: 18px;
              color: rgb(7, 17, 27);
              padding-bottom: 8px;
            }
            .recommend-wrapper {
              width: 100%;
              .icon-thumb_up {
                display: inline-block;
                font-size: 12px;
                line-height: 16px;
                color: rgb(0, 160, 220);
                margin: 0 8px 6px 0;
              }
              .text {
                display: inline-block;
                width: 70px;
                box-sizing: border-box;
                margin-right: 8px;
                padding: 0 6px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 9px;
                line-height: 16px;
                color: rgb(147, 153, 159);
              }
            }
            .rating-time {
              position: absolute;
              right: 0;
              top: 0;
              font-size: 10px;
              font-weight: 200;
              line-height: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
    }
  }

</style>
