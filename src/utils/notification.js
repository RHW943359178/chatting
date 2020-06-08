import { Notification } from 'element-ui'

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
