import mongoose from 'mongoose'
import config from './config'
import glob from 'glob'
import { resolve } from 'path'

/**
 * 使用 Node 自带 Promise 代替 mongoose 的 Promise
 */
mongoose.Promise = global.Promise

//  定义数据库连接失败函数（重启或者报错）
function databaseFail (connectNum, message) {
  connectNum ++
  if (connectNum < 5) {
    mongoose.connect(config.dbs, {
      useNewUrlParse: true,
      useUnifiedTopology: true
    })
  } else {
    throw new Error(message)
  }
}

const init = {
  initSchema: () => {
    glob.sync(resolve(__dirname, './modules', '**/*.js')).forEach(require)
  },
  connect: () => {
    //  最大连接次数
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true)
      }
      //  解决  DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead  警告
      mongoose.set('useCreateIndex', true)
      //  mongodb连接
      mongoose.connect(config.dbs, {
        useNewUrlParse: true,
        useUnifiedTopology: true
      })
      //  mongodb断线重连（小于最大连接次数）
      mongoose.connection.on('disconnected', () => {
        databaseFail(maxConnectTimes, '数据库重启超过最大次数，重启失败')
      })
      //  数据库连接出错
      mongoose.connection.on('error', err => {
        databaseFail(maxConnectTimes, '数据库连接出错，连接失败')
      })
    })
  }
}
export default init
