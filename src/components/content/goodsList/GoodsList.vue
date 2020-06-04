<template>
  <div class="goods">
    <GoodsItem
      v-for="item in goods"
      :key="item.data"
      :data="item"
      class="item"
      @click.native="itemClick(item)"
    />
  </div>
</template>

<script>
import GoodsItem from "./goods-item.vue";

export default {
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(item) {
      this.$router.push({
        name: "detail",
        params: {
          iid: item.iid
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .item {
    width: 48%;
  }
}
</style>