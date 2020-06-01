import Router from 'koa-router'
import user from '../service/user'
import Redis from 'koa-redis'

//  获取Redis客户端
let Store = new Redis().client

let router = new Router({
  prefix: '/user'
})

/**
 * 邮箱认证
 */
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username

  console.log(ctx, 123)

  const saveExpire = await Store.hget(`nodeMail: ${username}`, 'expire')

  //  限制频繁请求验证，5分钟一次
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      message: '验证请求过于频繁，验证码5分钟内有效'
    }
    return false
  }
  // user.sendEmail(ctx)
  ctx.body = {
    code: 0,
    message: '验证码已发送，有效期5分钟'
  }
})

router.post('/register', async ctx => {
  console.log(ctx)

  ctx.body = {
    code: 200,
    message: '接口成功',

  }
})

export default router
