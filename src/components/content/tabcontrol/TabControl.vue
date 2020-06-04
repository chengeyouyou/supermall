<template>
  <div class="tabcontrol">
    <div
      class="item"
      v-for="(item, index) in titles"
      :key="index"
      :class="{'active': activeIndex == index}"
      @click="itemClick(index)"
    >
      <span :style="showBorder ? '' : 'border:none'">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      data() {
        return [];
      }
    },
    showBorder:{
        type:Boolean,
        default:true
    }
  },
  data() {
    return {
      activeIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.$emit("tabClick", index);
      this.activeIndex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.tabcontrol {
  display: flex;
  text-align: center;
  background-color: #fff;
  z-index: 1;
  .item {
    flex: 1;
    span {
      padding: 5px 0;
    }
  }

  .active {
    color: #ff5777;
    span {
      border-bottom: 1px solid #ff5777;
    }
  }
}
</style>