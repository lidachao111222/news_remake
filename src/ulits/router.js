import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入login页面
import login from '../views/Login.vue'
// 引入register页面
import register from '../views/Register.vue'
// 引入用户页面
import user from '../views/User.vue'

// 引入editprofile页面
import editprofile from '../views/EditProfile.vue'

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
  }, {
    path: '/editprofile/:id',
    component: editprofile
  }]
})

// 设置路由守卫
router.beforeEach((to, from, next) => {
//   console.log(to)
  if (to.path.indexOf('/user') === 0) {
    if (localStorage.getItem('user_token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
