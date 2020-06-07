import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//Vue可以作为事件总线
Vue.prototype.$bus = new Vue();



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
