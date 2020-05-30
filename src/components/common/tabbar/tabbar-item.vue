<template>
  <div class="tabbar-item" @click="itemClick">
      <div class="icon" v-if="!isActive">
        <slot name="icon" >
        </slot>
      </div>
      <div class="icon-active" v-else>
        <slot name="icon-active">
        </slot>
      </div>
      <div class="desc" :style="activeStyle">
          <slot name="desc" ></slot>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props:{
    path:{
      type:String
    }
  },
  computed:{
    isActive(){
      return  this.$route.path == this.path;
    },
    activeStyle(){
      return {
        color: this.isActive ? '#ff5777' : 'black'
      }
    }
  },
  methods:{
    itemClick(e){
      console.log(this.$route);
      this.$route.path != this.path && this.$router.replace(this.path);
    }
  }
}
</script>

<style lang="less" scoped>
    .tabbar-item{
        flex: 1;
        height: 49px;
        font-size: 14px;
        text-align: center;
        img{
          width: 24px;
          height: 24px;
          margin-top: 3px;
          margin-bottom: 2px;
        }
    }
</style>