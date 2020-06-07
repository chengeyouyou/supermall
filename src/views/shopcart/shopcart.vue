<template>
  <div class="cart">
    <navbar class="navbar"> 
      <span slot="center">购物车({{productsLength}})</span>
    </navbar>
    <scroll class="scroll" ref="scroll">
      <cart-list :products="products" />
    </scroll>
    <bottom-info />
  </div>
</template>

<script>
import scroll from "components/common/scroll/Scroll.vue";

import CartList from "./children/CartList.vue";
import BottomInfo from "./children/BottomInfo.vue";

import Navbar from "components/common/navbar/Navbar.vue";

import { imgListener } from "common/mixin.ts";
import { mapGetters } from 'vuex';

export default {
  name: "shopCart",
  data() {
    return {
    };
  },
  components: {
    scroll,
    CartList,
    BottomInfo,
    Navbar
  },
  mixins: [imgListener],
  computed:{
    ...mapGetters(['productsLength', 'products'])
  },
  deactivated() {
    this.$bus.$off("imgFinishLoaded", this.imgLoadedListener);
  }
};
</script>
<style lang="less" scoped>
.cart {
  position: relative;
  height: 100vh;
  .scroll {
    height: calc(100%  - 49px - 40px - 44px);
  }
  .navbar{
    position: relative;
    z-index: 10;
    background-color: #ff5777;
    span{
      color:#fff;
      font-size: 16px;
    }
  }
}
</style>