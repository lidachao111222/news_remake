import axios from '../ulits/axios'

export const category = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}
