<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgLoaded" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      counter: 0
    };
  },
  methods: {
    imgLoaded() {
      if (++this.counter == this.recommends.length) {
        this.$emit("recommendImageLoaed");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 13px;
  padding-bottom: 20px;
  border-bottom: 10px solid #eee;
  .recommend-item {
    flex: 1;
    overflow: hidden;
    a {
      display: inline-block;
      width: 95%;
      text-decoration: none;
      color: #ff5777;
      img {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
