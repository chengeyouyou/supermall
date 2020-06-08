<template>
  <div class="toast" v-show="isShow">
      {{message}}
  </div>
</template>

<script>
export default {
  data() {
    return {
        isShow: false,
        message: '',
        timer: 0,        
    };
  },
  methods:{
      show(message, duration){
        clearTimeout(this.timer);
        this.isShow = true;
        this.message = message;
        this.timer = setTimeout(() => {
            this.isShow = false;
        }, duration);
      }
  }
}
</script>

<style lang="less" scoped>
    .toast{
        position: fixed;
        left:50%;
        top:50%;
        z-index: 999;
        color: #fff;
        font-size: 18px;
        padding: 10px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        background-color: rgba(0,0,0, 0.7);
    }
</style>