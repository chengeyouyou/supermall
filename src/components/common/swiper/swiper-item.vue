<template>
  <div class="swiper-item">
      <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .swiper-item{     
        display: inline-block; 
        img{
            width: 100%;
        }
    }
</style>