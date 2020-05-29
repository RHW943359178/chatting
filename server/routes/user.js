import Router from 'koa-router'
// import Redis from 'koa-redis'
// import NodeMailer from 'nodemailer'

let router = new Router({
  prefix: '/user'
})

router.post('/register', async ctx => {
  console.log(ctx)

  ctx.body = {
    code: 200,
    message: '接口成功',

  }
})

export default router
