<template>
  <div class="bottom-info">
    <div @click="itemSelect" class="status">
      <span class="iconfont icon-xuanzhong" v-if="bottomInfo.allSelected"></span>
      <span class="iconfont icon-weixuanzhong" v-else></span>
      <span class="all">全选</span>
    </div>
    <div class="total">合计￥{{bottomInfo.total}}</div>
    <div class="pay">去计算({{bottomInfo.selectedCount}})</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["bottomInfo"])
  },
  methods: {
    itemSelect() {
      this.$store.dispatch("changeAllStatus", !this.bottomInfo.allSelected);
    }
  }
};
</script>

<style lang="less" scoped>
.bottom-info {
  position: absolute;
  bottom: 49px;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  line-height: 40px;
  .status {
    width: 20%;
    text-align: center;
    span {
      font-size: 25px;
      &.icon-xuanzhong {
        color: #ff5777;
      }
    }
    .all{
      font-size: 14px;
      padding-left: 4px;
      vertical-align: 3px;
    }
  }
  .total {
    flex: 3;
  }
  .pay {
    flex: 2;
    background-color: #f00;
    color: #fff;
    text-align: center;
  }
}
</style>