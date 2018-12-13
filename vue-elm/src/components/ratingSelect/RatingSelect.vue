<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="positive block" :class="{'active': selectType===2}" @click='select(2,$event)'>
         {{desc.all}} <span class="count" >{{ratings.length}}</span>
      </span>
      <span class="positive block" :class="{'active':selectType===0}" @click='select(0,$event)'>
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="negative block" :class="{'active':selectType===1}" @click='select(1,$event)'>
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    name: 'RatingSelect',
    data() {
      return {
        selectType1: 3,
        onlyContent: false
      };
    },
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((v) => {
          return v.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        console.log(type, event);
        if (!event._constructed) {
          return;
        }
        // this.selectType1 = type;
        // 直接通过emit提交给父组件，然后父组件在传过来修改样式。 不要直接修改prop的值
        this.$emit('seleRatings', type);
      },
      toggleContent() {
        if (!event._constructed) {
          return;
        }
        this.onlyContent = !this.onlyContent;
        this.$emit('isContent', this.onlyContent);
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/style/mixin.less';
  .ratingselect {
    .rating-type {
      padding: 18px 0;
      margin: 0 18px;
      font-size: 0;
      .border-1px(rgba(7,
      17,
      27,
      0.1));
      .block {
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77, 85, 93);
        font-size: 12px;
        line-height: 24px;
        &.active {
          color: #fff;
        }
        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          &.active {
            background: rgb(0, 160, 220)
          }
        }
        &.negative {
          background: rgba(77, 85, 93, 0.2);
          &.active {
            background: rgb(77, 85, 93);
          }
        }
        .count {
          margin-left: 2px;
          font-size: 8px;
          line-height: 16px;
        }
      }
    }
    .switch {
      padding: 12px 18px;
      line-height: 24px;
      color: rgb(147, 153, 159);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }
      .icon-check_circle {
        margin-right: 4px;
        font-size: 24px;
      }
      .text {
        font-size: 12px;
        vertical-align: top;
      }
      .no_rating {
        padding: 16px 0;
        font-size: 12px;
        line-height: 24px;
        color: rgb(147, 153, 159);
      }
    }
  }

</style>
