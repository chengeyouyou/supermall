<template>
  <div class="detail">
    <DetailNavBar @tabClick="tabClick" ref="navbar" class="navbar" />
    <Scroll class="scroll" ref="scroll" @scroll="scroll" :probe-type="3" :pull-up-load="false">
      <Swiper :banners="topImages" class="swiper scroll_0" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shopInfo" />
      <DetailGoodsInfo :goodsInfo="detailInfo" @imgLoad="imgLoad" />
      <DetailParamInfo :paramInfo="paramInfo" class="param scroll_1" ref="param" />
      <DetailCommentInfo :commentInfo="commentInfo" class="comment scroll_2" ref="comment" />
      <DetailRecommendList :goods="recommends" class="recommend scroll_3" ref="recommend" />
    </Scroll>
    <DetailBottomBar @addCart="addCart" />
    <BackTop v-show="isShowBackTop" @click.native="topClick" class="BackTop" />
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import DetailNavBar from "./children/DetailNavBar.vue";
import DetailBaseInfo from "./children/DetailBaseInfo.vue";
import DetailShopInfo from "./children/DetailShopInfo.vue";
import DetailGoodsInfo from "./children/DetailGoodsInfo.vue";
import DetailParamInfo from "./children/DetailParamInfo.vue";
import DetailCommentInfo from "./children/DetailCommentInfo.vue";
import DetailRecommendList from "./children/DetailRecommendList.vue";
import DetailBottomBar from "./children/DetailBottomBar.vue";

import {
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo
} from "network/detail";

import config from "common/config.ts";
import { imgListener, backTopListener } from "common/mixin.ts";

export default {
  name: "detail",
  components: {
    Swiper,
    Scroll,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendList,
    DetailBottomBar
  },
  data() {
    return {
      iid: undefined,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      isShowBackTop: false,
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeOffsetTops: [0, 0, 0, 0]
    };
  },
  mixins: [imgListener, backTopListener],
  created() {
    this.iid = this.$route.params.iid;
    this._getDetail(this.iid);
  },
  destroyed() {
    this.$bus.$off("imgFinishLoaded", this.imgLoadedListener);
  },
  methods: {
    async _getDetail(iid) {
      let res = await getDetail(iid);
      if (!res) return;
      const data = res.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;
      //获取商品基本信息
      this.goods = new GoodsBaseInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo);
      //获取商品详情
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new ParamInfo(data.itemParams);
      //获取用户评价
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0];
      }

      //获取推荐商品
      let recommends = await getRecommends();
      console.log(recommends);
      this.recommends = recommends.data.list;
    },
    scroll(position) {
      // console.log(position);
      if (-position.y >= config.topDistance && !this.isShowBackTop) {
        this.isShowBackTop = true;
      } else if (-position.y < config.topDistance && this.isShowBackTop) {
        this.isShowBackTop = false;
      }
      this._setThemeIndex(position.y);
    },
    _setThemeIndex(scrollY) {
      for (let index = 1; index < this.themeOffsetTops.length; index++) {
        const offsetTop = -this.themeOffsetTops[index];
        if (scrollY > offsetTop) {
          if (this.$refs.navbar.getCurrentIndex() != index - 1) {
            this.$refs.navbar.setCurrentIndex(index - 1);
          }
          break;
        }
      }
    },
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    //在goodsList的imgListener里获取
    getThemeOffsetTop() {
      this.themeOffsetTops = [];
      this.themeOffsetTops.push(0);
      this.themeOffsetTops.push(this.$refs.param.$el.offsetTop);
      this.themeOffsetTops.push(this.$refs.comment.$el.offsetTop);
      this.themeOffsetTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeOffsetTops.push(Number.MAX_VALUE - 1000);
      // console.log(this.themeOffsetTops);
    },

    tabClick(index) {
      let clazz = "";
      switch (index) {
        case 0:
          clazz = ".scroll_0";
          break;
        case 1:
          clazz = ".scroll_1";
          break;
        case 2:
          clazz = ".scroll_2";
          break;
        case 3:
          clazz = ".scroll_3";
          break;
      }
      this.$refs.scroll.bscroll.scrollToElement(clazz);
      //this.$refs.scroll.scrollTo(0, -this.themeOffsetTops[index], 100);
    },

    addCart() {
      const product = {};
      product.iid = this.iid;
      product.imageURL = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.count = 1;
      product.status = false;
      // console.log(product);
      this.$store.dispatch('addCart', product);
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  position: relative;
  z-index: 10;
  margin-top: 44px;
  background-color: #fff;
  .navbar {
    background-color: #fff;
  }
  .scroll {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    .swiper {
      height: 300px;
      overflow: hidden;
    }
  }
  .BackTop {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    z-index: 10;
  }
}
</style>