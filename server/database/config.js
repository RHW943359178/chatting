export default {
  //  mongodb数据库配置
  dbs: 'mongodb://127.0.0.1:27017/chatting',

  //  redis配置
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  //  配置邮箱smtp服务
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '943359178@qq.com'
    },
    get pass() {
      return 'akxyobrhyhdkbbbc'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60*1000
      }
    }
  }
}

