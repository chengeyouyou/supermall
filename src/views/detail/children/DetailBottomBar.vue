<template>
  <div class="bottom-bar">
    <div class="server">
      <div class="icon"></div>
      <span class="title">客服</span>
    </div>
    <div class="store">
      <div class="icon"></div>
      <span class="title">店铺</span>
    </div>
    <div class="collect">
      <div class="icon"></div>
      <span class="title">收藏</span>
    </div>
    <div class="cart" @click="addCart">加入购物车</div>
    <div class="buy" @click="buy">购买</div>
  </div>
</template>

<script>
export default {
  methods:{
    addCart(){
      this.$emit('addCart');
    },
    buy(){

    }
  }
};
</script>

<style lang="less" scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 49px;
  text-align: center;
  border-top: 1px solid #cccccc;
  .server,
  .store,
  .collect {
    flex: 1;
    font-size: 13px;

    .icon {
      height: 26px;
      background-size: 26px;
      background-image: url("~assets/image/detail/detail_bottom.png");
      background-repeat: no-repeat;
      margin-bottom: 4px;
    }
  }
  .cart,
  .buy {
    flex: 2;
    line-height: 49px;
  }
  .cart {
    background-color: #eeff00de;
  }
  .buy {
    background-color: #ff5777;
    color: #ffffff;
  }
  .server .icon {
    background-position: center -61px;
  }

  .store .icon {
    background-position: center -114px;
  }

  .collect .icon {
    background-position: center 2px;
  }
}
</style>