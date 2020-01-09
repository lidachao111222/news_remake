import axios from '../ulits/axios'

// 得到栏目列表
export const category = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}

// 得到文章列表
export const articlelist = (params) => {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}

// 得到新闻详情
export const articldetail = (id) => {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

// 取消关注用户
export const unfollow = (id) => {
  return axios({
    method: 'get',
    url: `/user_unfollow/${id}`
  })
}

// 关注用户
export const follows = (id) => {
  return axios({
    method: 'get',
    url: `/user_follows/${id}`
  })
}

// 点赞
export const like = (id) => {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}

// 星星文章收藏
export const favouritearticle = (id) => {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}

// 用户关注的列表
export const favouruser = () => {
  return axios({
    method: 'get',
    url: `/user_follows`
  })
}

// 根据文章id得到文章对应的评论
export const getnewscomments = (id, params) => {
  return axios({
    method: 'get',
    url: `/post_comment/${id}`,
    params
  })
}

// 发布评论
export const postcomment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
