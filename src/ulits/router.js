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

// 引入home页面
import home from '../views/Home.vue'

// 引入新闻详情页面
import newsdetail from '../views/NewsDetail.vue'

// 引入我的收藏页面
import myfavouruser from '../views/MyFavouriteUser.vue'

// 引入精彩评论页面
import newscomments from '../views/NewsComments.vue'

// 引入栏目管理页面
import changchannel from '../views/ChangeChannel.vue'

// 引入搜索页面
import Search from '../views/Search.vue'

Vue.use(VueRouter)

let router = new VueRouter({
  routes: [{
    path: '/login',
    component: login
  }, {
    path: '/changchannel',
    component: changchannel
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/register',
    component: register
  }, {
    path: '/user/:id',
    component: user
  }, {
    path: '/editprofile/:id',
    component: editprofile
  }, {
    path: '/home',
    component: home
  }, {
    path: '/',
    component: home,
    redirect: '/home'
  },
  {
    path: '/newsdetail/:id',
    component: newsdetail
  },
  {
    path: '/myfavouruser/:id',
    component: myfavouruser
  },
  {
    path: '/newscomments/:id',
    component: newscomments
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
