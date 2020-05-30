<template>
  <div id="app">
     <mainTabbar/>
  </div>
</template>

<script>
  import mainTabbar from "components/content/MainTabbar/MainTabbar.vue";
  export default {
    name: 'app',
    components:{
      mainTabbar
    }
  }
</script>

<style lang="less">
  @import 'assets/css/base';
</style>



