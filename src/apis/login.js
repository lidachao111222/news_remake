import axios from '../ulits/axios'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

export const userdata = (data) => {
  return axios({
    method: 'get',
    url: `/user/${data}`
  })
}

export const updateinfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
