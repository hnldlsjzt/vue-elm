<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商家</div>
      <div class="tab-item">评论</div>
      <div class="tab-item">优惠</div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import header from './components/header/header';
  export default {
    name: 'App',
    components: {
      'v-header': header // vue组件命名统一用v-开头
    }
  };

</script>

<style scoped lang='less'>
  #app {
    .tab {
      display: flex;
      height: 40px;
      line-height: 40px;
      text-align: center;
      .tab-item {
        flex: 1;
      }
    }
  }

</style>
