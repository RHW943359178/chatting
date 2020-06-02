import axios from 'axios'
import { Message } from 'element-ui'

//  创建 axios 实例
const instance = axios.create({
  baseUrl: `http://${process.env.HOST || 'localhost'} : ${process.env.PORT || 3000}`,
  timeout: 5000,
  headers: {

  }
})

//  request 拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

//  response 拦截器
instance.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Message.error(response.message)
      return Promise.reject(error)
    } else {
      return response.data
    }
    
  }
)

