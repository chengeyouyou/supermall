<template>
  <div v-if="products.length != 0">
    <list-item v-for="(product, index) in products" :key="index" :product="product" />
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  components: {
    ListItem
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      }
    }
  },

};
</script>

<style lang="less" scoped>
</style>