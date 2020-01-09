// import Vue from 'vue'
import axios from 'axios'

import router from '../ulits/router'

axios.defaults.baseURL = 'http://localhost:3000'

// 设置header
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 每次请求的时候，拦截下来，并设置token值给请求头
  if (localStorage.getItem('user_token')) {
    config.headers.Authorization = localStorage.getItem('user_token')
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response.data.message === '用户信息验证失败')
  if (response.data.message === '用户信息验证失败') {
    router.push({ path: `/login` })
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// Vue.use(axios)
export default axios
