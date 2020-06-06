<template>
    <div class="feature">
        <a href="https://act.mogujie.com/zzlx67">
            <img src="~assets/image/home/recommend_bg.jpg" alt="" @load="imgLoaded">
        </a>
    </div>
</template>

<script>
export default {
    methods:{
        imgLoaded(){
            this.$emit('featureViewImageLoaded');
        }
    }
}
</script>

<style lang="less" scoped>
    .feature{
        img{
            width:100%
        }
    }
</style>