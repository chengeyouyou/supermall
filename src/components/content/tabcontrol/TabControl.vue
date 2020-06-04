<template>
    <div class="tabcontrol">
        <div class="item" v-for="(item, index) in titles" :key="index" :class="{'active': activeIndex == index}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        titles:{
            type:Array,
            data(){
                return [];
            }
        }
    },
    data(){
        return {
            activeIndex:0
        }
    },
    methods:{
        itemClick(index){
            this.$emit('tabClick', index);
            this.activeIndex = index;
        }
    }
}
</script>

<style lang="less" scoped>
    .tabcontrol{
        display: flex;
        text-align: center;
        margin: 10px 0 ;
        position:sticky;
        top:44px;
        background-color: #fff;
        z-index: 1;
        .item{
            flex: 1;
            padding: 10px 0;
            span{
                padding: 10px 0;
            }
        }

        .active{
            color: #ff5777;
            span{
                 border-bottom: 1px solid #ff5777;
            }
        }
    }
</style>