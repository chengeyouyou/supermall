<template>
  <div class="home">
    <navbar class="navbar">
      <div slot="center">购物街</div>
    </navbar>
    <scroll class="scroll" ref="scroll" @scroll="scroll" :probe-type="3" @pullingUp="pullingUp">
      <swiper :banners="banners" />
      <recommendView :recommends="recommends" />
      <featureView />
      <tabControl :titles="Object.values(titles)" @tabClick="tabClick" />
      <goodsList :goods="goods[activeTab].list" />
    </scroll>
    <backtop ref="backtop" class="backtop" @click.native="topClick" v-if="isShow" />
  </div>
</template>

<script>
import navbar from "components/common/navbar/Navbar.vue";
import swiper from "components/common/swiper/Swiper.vue";
import scroll from "components/common/scroll/Scroll.vue";
import backtop from "components/common/backtop/BackTop.vue";
import tabControl from "components/content/tabcontrol/TabControl.vue";
import goodsList from "components/content/goodsList/GoodsList.vue";

import recommendView from "./children/RecommendView.vue";
import featureView from "./children/FeatureView.vue";

import { getMultiData, getProduct } from "network/home.ts";

import config from "common/config.ts";

export default {
  components: {
    navbar,
    swiper,
    scroll,
    backtop,
    tabControl,
    goodsList,
    recommendView,
    featureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      activeTab: "pop",
      titles: {
        pop: "流行",
        new: "新款",
        sell: "精选"
      },
      isShow: false
    };
  },
  created() {
    //请求banner和recommend
    this._getMultiData();
    //请求商品
    this._getProduct("pop");
    this._getProduct("new");
    this._getProduct("sell");
    //监听图片刷新
    this.$bus.$on('imgFinishLoaded',()=>{
      this.$refs.scroll.refresh();
    });
  },
  methods: {
    async _getMultiData() {
      const res = await getMultiData();
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    },
    async _getProduct(type) {
      const page = this.goods[type].page + 1;
      const res = await getProduct(type, page);
      this.goods[type].page = page;
      res && this.goods[type].list.push(...res.data.list);
    },
    tabClick(index) {
      this.activeTab = Object.keys(this.titles)[index];
    },
    topClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    scroll(position) {
      if (-position.y >= config.topDistance && !this.isShow) {
        this.$emit("topArrive", true);
        this.isShow = true;
      } else if (-position.y < config.topDistance && this.isShow) {
        this.$emit("topArrive", false);
        this.isShow = false;
      }
    },
    pullingUp() {
      this._getProduct(this.activeTab);
      this.$refs.scroll.finishPullUp();
    }
  },
  watch:{
    '$store.state.counter': function(){
      console.log(123);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  .navbar {
    background-color: #ff5777;
    font-size: 16px;
    color: #fff;
    height: 44px;
  }

  .scroll {
    height: calc(100% - 44px);
    overflow: hidden;
  }

  .backtop {
    position: fixed;
    bottom: 50px;
    right: 20px;
    width: 50px;
    z-index: 10;
  }
}
</style>