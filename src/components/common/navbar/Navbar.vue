<template>
    <div class="nav-bar">
        <div class="left">
            <slot name="left"/>
        </div>
        <div class="center">
            <slot name="center"/>
        </div>
        <div class="right">
            <slot name="right"/>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .nav-bar{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        height: 44px;
        text-align: center;
        display: flex;
        font-size: 14px;
        line-height: 44px;
        box-shadow: 0 1px 1px  rgba(100, 100, 100, 0.3);
        .left, .right{
            width: 44px;
            height: 44px;
        }
        .center{
            flex: 1;
            height: 44px;
          
        }
    }

</style>