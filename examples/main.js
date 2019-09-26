import Vue from 'vue'
import App from './App.vue'
import router from './router'
import demoBlock from './components/demo-block.vue'

// 导入组件库
import FungweyUI from './../packages/index'
// 注册组件库
Vue.use(FungweyUI)
Vue.component('demo-block', demoBlock)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
