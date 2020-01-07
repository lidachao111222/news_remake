import axios from '../ulits/axios'

export const upload = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
