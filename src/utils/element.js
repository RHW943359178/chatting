import { Notification, Loading } from 'element-ui'

/**
 * 封装 element 的 Notification 组件，避免重复多写多余的代码
 */
export const notify = (message, type) => {
  switch (type) {
    case 1:
      return Notification({ title: '成功', message: message, duration: 3000, type: 'success' })
    case 2:
      return Notification({ title: '警告', message: message, duration: 3000, type: 'warning' })
    case 3:
      return Notification({ title: '信息', message: message, duration: 3000, type: 'info' })
    case 4:
      return Notification({ title: '失败', message: message, duration: 3000, type: 'error' })
  }
}

/**
 * 封装 element 的 Loading 组件，设置全站 loading 效果
 */
export const loading = message => {
  const options = {
    lock: true,
    text: message,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)'
  }
  return Loading.service(options)
}

/**
 * 处理 element-ui 校验返回的object
 */
export const validObject = object => {
  const arr = []
  Object.getOwnPropertyNames(object).forEach(key => {
    arr.push({ field: key, message: object[key][0].message })
  })
  return arr
}
