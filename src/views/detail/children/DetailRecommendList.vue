<template>
  <div class="recommend" v-if="goods.length != 0">
    <div class="titile">商品推荐</div>
    <GoodsList :goods="goods" />
  </div>
</template>

<script>
import GoodsList from "components/content/goodsList/GoodsList.vue";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style lang="less" scoped>
.recommend {
  margin-top: 20px;
  .titile {
    height: 40px;
    font-size: 20px;
    padding-left: 10px;
    line-height: 40px;
    color: #ff5777;
    padding-bottom: 10px;
  }
}
</style>