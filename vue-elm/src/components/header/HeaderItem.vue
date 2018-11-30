<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width='64' height='64' :src="seller.avatar" alt="商品头像">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="des">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if='seller.supports' class="support">
          <span class='icon' :class="classMap[seller.supports[0].type]"></span>
          <span class='text'>
            {{seller.supports[0].description}}
          </span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports">
        <span class="count">
         {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderItem',
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    data() {
      return {};
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  /*@import '../../assets/style/mixin.less';*/

  .header {
    color: #fff;
    background: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 6px;
        font-size: 14px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 18px;
            background-image: url('brand@2x.png');
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
        }
        .des {
          line-height: 12px;
          margin-bottom: 10px;
          font-size: 12px;
        }
        .support {
          .icon {
            display: inline-block;
            margin-right: 2px;
            vertical-align: top;
            width: 16px;
            height: 16px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease {
              background-image: url('decrease_1@2x.png');
            }
            &.discount {
              background-image: url('discount_1@2x.png');
            }
            &.guarantee {
              background-image: url('guarantee_1@2x.png');
            }
            &.invoice {
              background-image: url('invoice_1@2x.png');
            }
            &.special {
              background-image: url('special_1@2x.png');
            }
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        .count {
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          font-size: 10px;
          margin-left: 2px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wrapper {
      height: 28px;
      line-height: 28px;
      padding: 0 28px 0 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7, 17, 27, 0.2);
      .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background-image: url("bulletin@2x.png");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
    }
  }

</style>
