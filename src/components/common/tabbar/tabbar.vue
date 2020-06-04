<template>
    <div class="tabbar">
        <slot></slot>
    </div>
   
</template>

<script>

export default {

}


</script>

<style lang="less" scoped>
    .tabbar{
        display: flex;
        background-color: #f6f6f6;
        position:fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 2;
        box-shadow: 0 -1px 1px rgba(100,100,100,.2);
    }
</style>