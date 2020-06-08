import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import toastPlugin from "./components/common/toast/"
import FastClick from 'fastclick'
import lazyload from 'vue-lazyload'

Vue.config.productionTip = false

//Vue可以作为事件总线
Vue.prototype.$bus = new Vue();

Vue.use(toastPlugin);
Vue.use(lazyload,{
  loading:require('assets/image/common/placeholder.png')
})


FastClick.attach(document.body);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
