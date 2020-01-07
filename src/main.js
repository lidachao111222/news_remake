import Vue from 'vue'
import App from './App.vue'

// 引入router
import router from '../src/ulits/router'

// 引入css初始化样式
import './style/reset.css'

// 引入vant组件
import {
  Button,
  Field,
  Toast,
  Cell,
  CellGroup,
  NavBar
} from 'vant'

Vue.use(Button).use(Field).use(Toast).use(Cell).use(CellGroup).use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
