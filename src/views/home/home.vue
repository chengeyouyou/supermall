<template>
  <div>
      <navbar class="navbar">
        <div slot="center">购物街</div>
      </navbar>
      <swiper :banners="banners"/>
  </div>
</template>

<script>
import navbar from 'components/common/navbar/Navbar.vue';
import swiper from "components/common/swiper/swiper.vue";


import {
  getMultiData
} from 'network/home.ts';

export default {
  components:{
    navbar,
    swiper
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created(){
    getMultiData().then(res=>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style lang="less">
  .navbar{
    background-color: #ff5777;
    font-size: 16px;
    color: #fff;
  }
</style>