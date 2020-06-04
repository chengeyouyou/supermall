<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(ObserveDOM);
BScroll.use(Pullup);

export default {
  data() {
    return {
      bscroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      scrollY: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true
    });
    this.bscroll.on("scroll", this._onScroll);
    this.bscroll.on("pullingUp", this._pullingUp);
  },
  methods: {
    _onScroll(position) {
      this.$emit("scroll", position);
    },
    _pullingUp() {
      this.$emit("pullingUp");
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp();
    },
    scrollTo(x, y, time = 500) {
      this.bscroll && this.bscroll.scrollTo(x, y, time);
    },
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY(){
      return this.bscroll ? this.bscroll.y : 0
    }
  }
};
</script>

<style lang="less" scoped>
</style>