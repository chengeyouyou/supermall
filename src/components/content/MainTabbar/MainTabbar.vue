<template>
  <div>
    <router-view/>
    <tabbar>
        <tabbarItem path="/home">
            <img src="~assets/image/tabbar/home.svg" alt="首页" slot="icon">
                <img src="~assets/image/tabbar/home_active.svg" alt="首页" slot="icon-active">
            <p slot="desc">首页</p>
        </tabbarItem>
        <tabbarItem path="/category">
            <img src="~assets/image/tabbar/category.svg" alt="分类" slot="icon">
                <img src="~assets/image/tabbar/category_active.svg" alt="首页" slot="icon-active">
            <p slot="desc">分类</p>
        </tabbarItem>
        <tabbarItem path="/shopcart">
            <img src="~assets/image/tabbar/shopcart.svg" alt="购物车" slot="icon">
            <img src="~assets/image/tabbar/shopcart_active.svg" alt="购物车" slot="icon-active">
            <p slot="desc">购物车</p>
        </tabbarItem>
        <tabbarItem path="/profile">
            <img src="~assets/image/tabbar/profile.svg" alt="我的" slot="icon">
            <img src="~assets/image/tabbar/profile_active.svg" alt="我的" slot="icon-active">
            <p slot="desc">我的</p>
        </tabbarItem>
    </tabbar>
  </div>
</template>

<script>
import tabbarItem from 'components/common/tabbar/tabbar-item.vue';
import tabbar from "components/common/tabbar/tabbar.vue";

export default {
    components:{
       tabbarItem ,
       tabbar
    }
}
</script>

<style>

</style>