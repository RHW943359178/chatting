import Koa from 'koa'
import users from './routes/user'

const app = new Koa()

async function start () {
  const host = 'localhost'
  const port = 8082

  // app.use(ctx => {
  //   ctx.body = 'hello'
  // })

  app.use(users.routes()).use(users.allowedMethods())

  app.listen(port, host, err => {
    if (err) throw err
    console.log(`服务启动在${port}端口`)
  })
  
}

start()
