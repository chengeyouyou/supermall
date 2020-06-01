<template>
    <div class="swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="banner" :style="moveStyle">
            <swiperItem v-if="banners.length > 0">
                <a :href="banners[banners.length - 1].link">
                    <img :src="banners[banners.length - 1].image">
                </a>
            </swiperItem>
            <swiperItem v-for="(item, index) in banners" :key="index">
                <a :href="item.link">
                    <img :src="item.image">
                </a>
            </swiperItem>
            <swiperItem v-if="banners.length > 0">
                <a :href="banners[0].link">
                    <img :src="banners[0].image">
                </a>
            </swiperItem>
        </div>
        <div class="indicator">
            <a href="javascript:;" v-for="(item, index) in banners" :key="index" :style="activeIndex == index ? 'background:#ff5777' : 'background:rgba(0,0,0,0.5)'"></a>
        </div>  

        <div class="left-right" v-if="directionButton">
            <img src="~assets/image/swiper/left.svg" alt="" class="left" @click="next()" @touchstart.stop="">
            <img src="~assets/image/swiper/right.svg" alt="" class="right" @click="prev()" @touchstart.stop="">
        </div>  
    </div>
</template>

<script>
import swiperItem from "components/common/swiper/swiper-item.vue";
export default {
    components:{
        swiperItem
    },
    data(){
        return {    
            //banner移动的距离
            move: 0,
            //spiwer的宽度
            swiperWidth: 0,
            //默认选中下标
            activeIndex: 0,
            //初始化时第一张的偏移量
            defaultFirstOffset: 0,
            //初始化时第一张的偏移量
            defaultLastOffset: 0,
            //是否可以点击下一张或上一张,防止频繁点击
            isGo: true,
            //初始化时滚动的方向
            direction: 'left',
            //记录单张图片滚动的距离
            increment: 0,
            //单张图片滚动定时器的编号
            num: 0,
            //启动图片滚动定时器的定时器编号
            no: 0,
            //点击位置的x坐标
            clientX: 0
        }
    },
    props:{
        banners:{
            type:Array,
            default(){
                return [];
            }
        },
        interval:{
            type:Number,
            default: 3000
        },
        directionButton:{
            type:Boolean,
            default: false
        },
        ratio:{
            type: Number,
            default:0.25
        },
        duration:{
            type:Number,
            default:2000
        }
    },
    computed:{
        moveStyle(){
            return {
                'margin-left': this.move + 'px'
            }
        }
    },
    mounted(){
        const swiper = document.getElementsByClassName('swiper')[0];
        this.swiperWidth = swiper.offsetWidth;
        this.defaultFirstOffset = -this.swiperWidth * 1;
        this.move = this.defaultFirstOffset;
        this.autoMove(this.interval);
    },
    methods:{
        autoMove(delay){
            this.no = setTimeout(() => {
                if(this.direction == 'left'){
                    this.next(()=>{
                        this.autoMove(this.interval);
                    });
                }else{
                    this.prev(()=>{
                        this.autoMove(this.interval);
                    });
                }
            }, delay);
        },
        stopMove(){
            clearInterval(this.num);
            clearInterval(this.no);
        },
        next(notify){
            if(this.directionButton && !this.isGo) return;
            this.isGo = false;
            let swiperWidth = this.swiperWidth;
            if(this.activeIndex == this.banners.length - 1){
                this.activeIndex = 0;
            }else{
                this.activeIndex++;
            }
            this.num = setInterval(() => {
                let res = swiperWidth - this.increment;
                if(res == 0){
                    this.isGo = true;
                    this.increment = 0;
                    (this.activeIndex == 0) && (this.move = this.defaultFirstOffset); 
                    this.stopMove(notify);
                    notify && notify();
                }else{
                    let step = res < 10 ? res : Math.ceil(res / 10);
                    this.move -= step;
                    this.increment += step;
                }
            }, 20);
        },
        prev(notify){
            if(this.directionButton && !this.isGo) return;
            this.isGo = false;
            let swiperWidth = this.swiperWidth;
            if(this.activeIndex == 0){
                this.activeIndex = this.banners.length - 1;
            }else{
                this.activeIndex--;
            }
            this.num = setInterval(() => {
                let res = swiperWidth - this.increment;
                if(res == 0){
                    this.isGo = true;
                    this.increment = 0;
                    (this.activeIndex == this.banners.length - 1) && (this.move = this.defaultLastOffset); 
                    this.stopMove();
                    notify && notify();
                }else{
                    let step = res < 10 ? res : Math.ceil(res / 10);
                    this.move += step;
                    this.increment += step;
                }
            }, 10);
        },

        restore(notify, distance, direction){
            const num = setInterval(() => {
                if(distance == 0){
                    clearInterval(num);
                    this.increment = 0;
                    notify && notify();
                }else{
                    let step = distance < 10 ? distance : Math.ceil(distance / 10);
                    distance = distance - step;
                    direction == 'left' ? this.move += step : this.move -= step; 
                }
            }, 10);
        },  

        touchstart(e){
            this.stopMove();
            this.clientX = e.targetTouches[0].clientX;
        },

        touchmove(e){
            const moveX = e.targetTouches[0].clientX - this.clientX;
            moveX > 0 ? this.direction = 'right' : this.direction = 'left';
            this.increment += Math.abs(moveX);
            this.move += moveX;
            this.clientX = e.targetTouches[0].clientX;
        },

        touchend(){
            if(this.swiperWidth * this.ratio < this.increment){
                 this.autoMove(0);
            }else{
                this.restore(()=>{
                   this.autoMove(this.interval);      
                }, this.increment, this.direction) 
            } 
        }
    },
    watch:{
        banners(){
            this.defaultLastOffset = -this.swiperWidth * this.banners.length;
        }
    }
}
</script>

<style lang="less">
    .swiper{
        overflow: hidden;
        position: relative;
        .banner{
            width:1000%;
            .swiper-item{
                width: 10%
            }
        }
        .indicator{
            position: absolute;
            left: 0;
            bottom: 0;
            text-align: center;
            width: 100%;
            margin-bottom: 15px;
            a{
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #f00;
                border-radius: 50%;
                margin-left: 10px;
            }
        }
        .left-right{
            .left, .right{
                position: absolute;
                width: 40px;
                bottom: 0;
                top: 0;
                margin: auto;
            }
            .left{
                left: 0;
            }
            .right{
                right:0
            }
        }

    }
</style>