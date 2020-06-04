<template>
  <div id="app">
     <mainTabbar/>
  </div>
</template>

<script>
  import mainTabbar from "components/content/mainTabbar/MainTabbar.vue";
  export default {
    name: 'app',
    components:{
      mainTabbar
    }
  }
</script>

<style lang="less" scoped>
  @import 'assets/css/base';
</style>



