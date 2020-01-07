import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入login页面
import login from '../views/Login.vue'
// 引入register页面
import register from '../views/Register.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/register',
    component: register
  }]
})

export default router
