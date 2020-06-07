<template>
  <div class="list-item" v-if="product">
    <div class="status" @click="itemSelect">
      <span class="iconfont icon-xuanzhong" v-if="product.status"></span>
      <span class="iconfont icon-weixuanzhong" v-else></span>
    </div>
    <div class="content">
      <div class="productImg">
        <img :src="product.imageURL" @load="imgLoaded" />
      </div>
      <div class="productDesc">
        <div class="title">{{product.title}}</div>
        <div class="desc">{{product.desc}}</div>
        <div class="priceInfo">
          <div class="price">￥{{product.price}}</div>
          <div class="count">x{{product.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    itemSelect() {
      this.$store.commit('changeItemStatusByiid', {
        iid:this.product.iid,
        status:!this.product.status
      });
    },
    imgLoaded() {
      this.$bus.$emit("imgFinishLoaded");
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.list-item {
  height: 120px;
  display: flex;
  padding: 10px 0 10px 5px;

  .status {
    flex: 1;
    text-align: center;
    line-height: 100px;
    span {
      font-size: 25px;
      &.icon-xuanzhong {
        color: #ff5777;
      }
    }
  }
  .content {
    width: 90%;
    display: flex;

    .productImg {
      width: 80px;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }
    .productDesc {
      flex: 1;
      padding: 0 10px 0;
      min-width: 0px;
      position: relative;
      .title,
      .desc {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 20px;
      }

      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .desc {
        font-size: 14px;
        color: #3c3c3c;
      }
    }
    .priceInfo {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      .price {
        color: orange;
        font-size: 18px;
        position: relative;
        left: 10px;
      }
      .count {
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
  }
}
</style>