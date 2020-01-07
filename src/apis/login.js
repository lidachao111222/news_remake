import axios from '../ulits/axios'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
