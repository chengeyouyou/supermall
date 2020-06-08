//以插件的方式注册组件
import Toast from "./Toast.vue";
import { VueConstructor } from 'vue/types/umd';

const toastPlugin = {
    //通过Vue.use注册插件，会调用install方法
    install(Vue:any){
        //Vue.extend生成Vue子类,即组件
        const ToastContrustor:VueConstructor = Vue.extend(Toast);
        //实例化组件对象
        const toastComponent = new ToastContrustor();
        //将模板挂载到div节点上
        toastComponent.$mount(document.createElement('div'));
        //最后将第三步生成的html节点挂载到body的尾部， toastComponent.$el就是组件控制的html元素
        document.body.appendChild(toastComponent.$el);
        Vue.prototype.$toast = toastComponent;
    }
}

export default toastPlugin;