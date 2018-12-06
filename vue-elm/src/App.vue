<template>
  <div id="app">
    <v-header-item :seller="seller"></v-header-item>
    <ul class="tab border-1px">
      <li class="tab-item">
        <router-link to="/GoodsItem">商品</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/RatingsItem">评论</router-link>
      </li>
      <li class="tab-item" to="/SellerItem">
        <router-link to="/SellerItem">优惠</router-link>
      </li>
    </ul>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import HeaderItem from './components/header/HeaderItem';
  const ERR_OK = 0;
  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.sell_api.seller({
        id: 0
      }).then((res) => {
        if (res.errno === ERR_OK) {
          console.log(res);
          this.seller = Object.assign({}, res.data);
        }
      });
    },
    components: {
      'v-header-item': HeaderItem // vue组件命名统一用v-开头
    }
  };

</script>

<style scoped lang="less">
  @import './assets/style/mixin.less';
  .tab {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    .border-1px(#ccc);
    .tab-item {
      flex: 1;
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      .active {
        display: block;
        color: rgb(240, 20, 20);
      }
    }
  }

</style>
