<template>
  <navbar class="navbar">
    <div slot="left">
      <img src="~assets/image/common/back.svg" @click="back" />
    </div>
    <div slot="center" class="center">
      <tabControl
        :showBorder="false"
        :titles="titiles"
        @tabClick="tabClick"
        ref="tabcontrol"
        class="tab-control"
      />
    </div>
  </navbar>
</template>

<script>
import navbar from "components/common/navbar/Navbar.vue";
import tabControl from "components/content/tabcontrol/TabControl.vue";
export default {
  components: {
    navbar,
    tabControl
  },
  data() {
    return {
      titiles: ["商品", "参数", "评论", "推荐"]
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    tabClick(index) {
      this.$emit('tabClick', index);
    },
    setCurrentIndex(index){
      this.$refs.tabcontrol.activeIndex = index;
    },
    getCurrentIndex(){
      return this.$refs.tabcontrol.activeIndex;
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  .center {
    .tab-control {
      height: 100%;
      box-sizing: border-box;
    }
  }
  img{
    margin-top:10px;
  }
}
</style>