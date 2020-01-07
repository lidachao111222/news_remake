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
