<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease">
        <div class="inner icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default {
    name: 'CartControl',
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    methods: {
      addCart(event) {
        if (!event._constructed) { // 阻止pc端点击后执行两次
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 定义的新的公共实例eventHub，归按钮组件和购物车组件公用，传输数据
        this.$root.eventHub.$emit('cart.add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) { // 阻止pc端点击后执行两次
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    },
    computed: {

    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cart-control {
    font-size: 0;
    color: rgb(0, 160, 220);
    .cart-decrease {
      display: inline-block;
      padding: 6px;
      transition: all 0.4s linear;
      .inner {
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }

    .cart-add {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
    }
    .cart-count {
      display: inline-block;
      vertical-align: top;
      padding: 6px;
      font-size: 10px;
      line-height: 24px;
      width: 12px;
      color: rgb(147, 153, 159);
    }
  }

  .move-enter-active,
  .move-leave-active {
    transition: opacity .5s;
    transform: translate3d(0, 0, 0);
    /*opacity: 1;*/
    .inner {
      transform: rotate(0)
    }
  }

  .move-enter,
  .move-leave-to {
    opacity: 0;
    transform: translate3d(24px, 0, 0);
    .inner {
      transform: rotate(180deg)
    }
  }

</style>
