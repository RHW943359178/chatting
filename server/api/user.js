import axios from '../../src/utils/axios'

const user = {
  //  邮箱验证
  verify (data) {
    return axios({
      url: '/api/user/verify',
      data,
      method: 'post'
    })
  }
}

export default user

