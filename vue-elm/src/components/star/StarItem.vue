<template>
  <div class="star star-48" :class='starType'>
    <span v-for="(item,index) in itemClasses" :key="index" class='star-item' :class="item"></span>
  </div>
</template>

<script>
  // 定义常量，一改全改
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';
  export default {
    name: 'StarItem',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        console.log(this.size);
        return 'star-' + this.size;
      },
      itemClasses() {
         console.log(this.size);
         console.log(this.score);
        let result = []; // 存放star的数组
        let score = Math.floor(this.score * 2) / 2; // 向下取整，大于0.5的保存0.5
        let hasDecimal = score % 1 !== 0; // 判断是否有小数，有效数为半颗星
        let integer = Math.floor(this.score); // 判断是否有小数，有效数为半颗星
        // 存放整星
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        // 是否存放半星
        if (hasDecimal) result.push(CLS_HALF);
        // 是否满5
        while (result.length < LENGTH) {
           result.push(CLS_OFF);
        }
        console.log(result);
        // 返回结果
        return result;
      }
    },
    data() {
      return {

      };
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
  .star {
    font-size: 0px;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url('star48_on@2x.png');
        }
        &.half {
          background-image: url('star48_half@2x.png');
        }
        &.off {
          background-image: url('star48_off@2x.png');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url('star36_on@2x.png');
        }
        &.half {
          background-image: url('star36_half@2x.png');
        }
        &.off {
          background-image: url('star36_off@2x.png');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url('star24_on@2x.png');
        }
        &.half {
          background-image: url('star24_half@2x.png');
        }
        &.off {
          background-image: url('star24_off@2x.png');
        }
      }
    }
  }

</style>
