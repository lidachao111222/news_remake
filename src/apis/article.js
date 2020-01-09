import axios from '../ulits/axios'

export const category = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}

export const articlelist = (params) => {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}

export const articldetail = (id) => {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

export const unfollow = (id) => {
  return axios({
    method: 'get',
    url: `/user_unfollow/${id}`
  })
}

export const follows = (id) => {
  return axios({
    method: 'get',
    url: `/user_follows/${id}`
  })
}

export const like = (id) => {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}

export const favouritearticle = (id) => {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}
