<template>
  <div class="goods-item">
    <a href="javascript:;"> 
      <img v-lazy="imgSrc" alt class="img" @load="imgLoad" />
      <div class="desc">
        <p class="title">{{data.title}}</p>
        <span class="price">{{data.price}}</span>
        <span class="cfav">{{data.cfav}}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
    imgSrc(){
      return (this.data.show && this.data.show.img) || this.data.image;
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgFinishLoaded");
    }
  }
};
</script>

<style lang="less" scoped>
.goods-item {
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  position: relative;
  padding-bottom: 42px;

  a .img {
    width: 100%;
  }
  a .desc {
    position: absolute;
    width: 100%;
    height: 42px;
    bottom: 0;
    left: 0;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 5px 0;
      color: #000;
    }

    .price {
      color: #ff5777;
    }

    .cfav {
      padding-left: 20px;
      margin-left: 5px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: -2px;
        background-image: url("../../../assets/image/common/collect.svg");
        background-repeat: no-repeat;
        background-size: 17px 17px;
        background-position: center;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>