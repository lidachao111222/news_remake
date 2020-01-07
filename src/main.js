import Vue from 'vue'
import App from './App.vue'

// 引入router
import router from '../src/ulits/router'

// 引入css初始化样式
import './style/reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
