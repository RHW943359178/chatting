import axios from '../../src/utils/axios'
import qs from 'qs'

const user = {

  //  邮箱验证
  verify (data) {
    return axios({
      url: '/api/user/verify',
      method: 'post',
      data: qs.stringify(data)
    })
  },
  //  用户注册
  register (data) {
    return axios({
      url: '/api/user/register',
      method: 'post',
      data: qs.stringify(data)
    })
  }
}

export default user
