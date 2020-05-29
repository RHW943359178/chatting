import Koa from 'koa'

const app = new Koa()

async function start () {
  const host = 'localhost'
  const port = 8082

  app.use(ctx => {
    ctx.body = 'hello'
  })

  app.listen(port, host, err => {
    if (err) throw err
    console.log(`服务启动在${port}端口`)
  })
  
}

start()
