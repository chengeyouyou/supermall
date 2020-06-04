<template>
  <div class="detail">
    <DetailNavBar />
    <swiper :banners="topImages" class="swiper"/>
  </div>
</template>

<script>
import swiper from 'components/common/swiper/Swiper.vue';

import DetailNavBar from "./children/detailNavbar/DetailNavBar.vue";

import { getDetail } from "network/detail";

export default {
  name: "detail",
  components: {
    swiper,
    DetailNavBar
  },
  data() {
    return {
      iid: undefined,
      topImages:[]
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    this._getDetail(this.iid);
  },
  methods: {
    async _getDetail(iid) {
      let res = await getDetail(iid);
      console.log(res);
      this.topImages = res.result.itemInfo.topImages;
    }
  }
};
</script>

<style lang="less" scoped>
.detail{
  .swiper{
    margin-top:44px;
    height: 300px;
    overflow: hidden;
  }
}
</style>