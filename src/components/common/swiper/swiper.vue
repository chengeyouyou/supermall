<template>
  <div
    class="swiper"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    ref="swiper"
  >
    <div class="banner" :style="moveStyle">
      <swiperItem v-if="banners.length > 1">
        <a :href="banners[banners.length - 1].link">
          <img :src="banners[banners.length - 1].image" />
        </a>
      </swiperItem>
      <swiperItem v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" />
        </a>
      </swiperItem>
      <swiperItem v-if="banners.length > 1">
        <a :href="banners[0].link">
          <img :src="banners[0].image" />
        </a>
      </swiperItem>
    </div>
    <div class="indicator" v-if="banners.length > 1">
      <a
        href="javascript:;"
        v-for="(item, index) in banners"
        :key="index"
        :style="activeIndex == index ? 'background:#ff5777' : 'background:rgba(0,0,0,0.5)'"
      ></a>
    </div>

    <div class="left-right" v-if="directionBtn">
      <img src="~assets/image/swiper/left.svg" alt class="left" @click="next()" @touchstart.stop />
      <img src="~assets/image/swiper/right.svg" alt class="right" @click="prev()" @touchstart.stop />
    </div>
  </div>
</template>

<script>
import swiperItem from "components/common/swiper/Swiper-item.vue";
export default {
  components: {
    swiperItem
  },
  data() {
    return {
      //banner移动的距离
      move: 0,
      //spiwer的宽度
      swiperWidth: 0,
      //默认选中下标
      activeIndex: 0,
      //初始化时第一张的偏移量
      defaultFirstOffset: 0,
      //初始化时最后一张的偏移量
      defaultLastOffset: 0,
      //是否可以点击下一张或上一张,防止频繁点击
      isGo: true,
      //初始化时滚动的方向
      direction: "left",
      //单张图片滚动定时器的编号
      num: 0,
      //启动图片滚动定时器的定时器编号
      no: 0,
      //点击位置的x坐标
      clientX: 0,
      //上一张图片的位置
      prevMove: 0
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    },
    interval: {
      type: Number,
      default: 3000
    },
    directionBtn: {
      type: Boolean,
      default: false
    },
    ratio: {
      type: Number,
      default: 0.25
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    moveStyle() {
      return {
        "margin-left": this.move + "px"
      };
    }
  },
  methods: {
    autoMove(delay = 0) {
      this.no = setTimeout(() => {
        if (this.direction == "left") {
          this.next(() => {
            this.autoMove(this.interval);
          });
        } else {
          this.prev(() => {
            this.autoMove(this.interval);
          });
        }
      }, delay);
    },
    stopMove() {
      clearInterval(this.num);
      clearTimeout(this.no);
    },
    next(notify, isBack = false) {
      if (this.directionBtn && !this.isGo) return;
      this.isGo = false;
      this.num = setInterval(() => {
        let res = this.swiperWidth - Math.abs(this.prevMove - this.move);
        if (res == 0) {
          this.isGo = true;
          this.activeIndex++;
          if (this.activeIndex == this.banners.length) {
            this.activeIndex = 0;
            this.move = this.defaultFirstOffset;
          }
          this.stopMove();
          this.prevMove = this.move;
          notify && notify();
        } else {
          let step = res < 10 ? res : Math.ceil(res / 10);
          this.move -= step;
        }
      }, 20);
    },
    prev(notify) {
      if (this.directionBtn && !this.isGo) return;
      this.isGo = false;
      this.num = setInterval(() => {
        let res = this.swiperWidth - Math.abs(this.prevMove - this.move);
        if (res == 0) {
          this.isGo = true;
          this.activeIndex--;
          if (this.activeIndex == -1) {
            this.activeIndex = this.banners.length - 1;
            this.move = this.defaultLastOffset;
          }
          this.prevMove = this.move;
          this.stopMove();
          notify && notify();
        } else {
          let step = res < 10 ? res : Math.ceil(res / 10);
          this.move += step;
        }
      }, 20);
    },
    //回弹
    restore(notify, distance, direction) {
      const num = setInterval(() => {
        if (distance == 0) {
          clearInterval(num);
          notify && notify();
        } else {
          let step = distance < 10 ? distance : Math.ceil(distance / 10);
          distance = distance - step;
          direction == "left" ? (this.move += step) : (this.move -= step);
        }
      }, 10);
    },

    touchstart(e) {
      this.stopMove();
      this.clientX = e.targetTouches[0].clientX;
    },

    touchmove(e) {
      const moveX = e.targetTouches[0].clientX - this.clientX;
      this.move += moveX;
      this.clientX = e.targetTouches[0].clientX;
    },

    touchend() {
      this.direction = this.move > this.prevMove ? "right" : "left";
      let distance = Math.abs(this.prevMove - this.move);
      if (this.swiperWidth * this.ratio < distance) {
        this.autoMove();
      } else {
        this.restore(
          () => {
            this.autoMove(this.interval);
          },
          distance,
          this.direction
        );
      }
    }
  },
  watch: {
    banners() {
      const swiper = this.$refs.swiper;
      this.swiperWidth = swiper.offsetWidth;
      this.defaultFirstOffset =
        this.banners.length > 1 ? -this.swiperWidth * 1 : 0;
      this.move = this.defaultFirstOffset;
      this.defaultLastOffset =
        this.banners.length > 1 ? -this.swiperWidth * this.banners.length : 0;
      this.prevMove = this.defaultFirstOffset;
      this.autoMove(this.interval);
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  .banner {
    width: 1000%;
    .swiper-item {
      width: 10%;
    }
  }
  .indicator {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    width: 100%;
    margin-bottom: 15px;
    a {
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: #f00;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
  .left-right {
    .left,
    .right {
      position: absolute;
      width: 40px;
      bottom: 0;
      top: 0;
      margin: auto;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
}
</style>