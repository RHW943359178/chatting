import Koa from 'koa'
import users from './routes/user'
// import koaBody from 'koa-body'
import bodyParser from 'koa-bodyparser'
import init from '../server/database/init'

const app = new Koa()

async function start () {
  const host = 'localhost'
  const port = 8082

  //  配置数据库
  init.initSchema() //  初始化 mongoose 中的Schema
  init.connect()  //  连接到 mongodb 数据库

  app.use(bodyParser())
  app.use(users.routes()).use(users.allowedMethods())

  app.listen(port, host, err => {
    if (err) throw err
    console.log(`服务启动在${port}端口`)
  })
}

start()
