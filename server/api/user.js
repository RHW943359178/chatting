import axios from '../../src/utils/axios'
// import qs from 'qs'

const user = {
  //  邮箱验证
  verify (data) {
    // console.log(qs.stringify(data), 'data')
    return axios({
      url: '/api/user/verify',
      method: 'post',
      data: JSON.parse(data)
    })
  }
}

export default user
