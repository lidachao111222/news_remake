import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入login页面
import login from '../views/Login.vue'
// 引入register页面
import register from '../views/Register.vue'
// 引入用户页面
import user from '../views/User.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/register',
    component: register
  }, {
    path: '/user/:id',
    component: user
  }]
})

export default router
