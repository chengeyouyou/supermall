import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const home = ()=>import("views/home/home.vue");
const category = ()=>import("views/category/category.vue");
const shopcart = ()=>import("views/shopcart/shopcart.vue");
const profile = ()=>import("views/profile/profile.vue");

const routes:Array<RouteConfig> = [
    {
        name:'root',
        path:'/',
        redirect:{
            name:'home'
        }
    },
    {
        name:'home',
        path:'/home',
        component: home
    },
    {
        name:'category',
        path:'/category',
        component: category
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component: shopcart,
        
    },
    {
        name:'profile',
        path:'/profile',
        component: profile
    },
]


const router:VueRouter = new VueRouter({
    routes,
    mode:'history'
});

export default router