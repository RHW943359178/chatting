import axios from 'axios'
import { Message, Notification } from 'element-ui'
// import qs from 'qs'

//  创建 axios 实例
const instance = axios.create({
  baseUrl: `http://${process.env.HOST || 'localhost'} : ${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {
    // "Content-Type": "application/json;charset=UTF-8"
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

//  request 拦截器
instance.interceptors.request.use(
  config => {
    // if (config.method.toLocaleLowerCase() === 'post'
    //   || config.method.toLocaleLowerCase() === 'put'
    //   || config.method.toLocaleLowerCase() === 'delete') {
    //     // config.data = qs.parse(config.data)
    //   }
    return config
  },
  error => {
    Notification.error(error)
    console.log(error, 'request')
    Promise.reject(error)
  }
)

//  response 拦截器
instance.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Message.error(response.message)
      return Promise.reject(response.message)
    } else {
      return response.data
    }
  }
)

export default instance
