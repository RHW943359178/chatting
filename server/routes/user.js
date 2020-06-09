import Router from 'koa-router'
import { sendEmail, examDatabase } from '../service/user'
import User from '../database/modules/user'
// import Passport from '../utils/passport'
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
  const saveExpire = await Store.hget(`nodeMail: ${username}`, 'expire')

  //  限制频繁请求验证，5分钟一次
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      message: '验证请求过于频繁，验证码5分钟内有效'
    }
    return false
  }
  //  调用service服务中的发送邮件服务
  sendEmail(ctx)
  // console.log(sendEmail, 'sendEmail')
  ctx.body = {
    code: 200,
    message: '验证码已发送，有效期5分钟'
  }
})

/**
 * 用户注册
 */
router.post('/register', async ctx => {
  let { username, mailPhone, code, password } = ctx.request.body
  //  校验验证码
  if (code) {
    const saveCode = await Store.hget(`nodeMail: ${username}`, 'code')
    const saveExpire = await Store.hget(`nodeMail: ${username}`, 'expire')

    //  判断请求体中的 code 和 redis 中的是否一样
    if (code === saveCode) {
      //  判断验证码是否过期
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          message: '验证码已过期，请重新校验'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        message: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      message: '请输入验证码'
    }
    return false
  }
  //  校验用户名和密码
  let user = await User.find({
    username
  })
  //  判断用户名是否已经被注册
  if (user.length) {
    ctx.body = {
      code: -1,
      message: '该用户名已被注册'
    }
    return
  }
  //  写入数据库
  let nUser = await User.create({
    username,
    password,
    mailPhone
  })
  //  调用校验写库状态
  examDatabase(ctx, nUser)
})

/**
 * 用户登录
 */
router.post('/login', async (ctx, next) => {
  /**
   * 使用 mongoose 的扩展方法需要实例化 model 模型
   */
  const user = new User()
  let { mailPhone, password } = ctx.request.body
  //  校验手机号或邮箱是否存在
  let userData = await User.findOne({
    mailPhone
  })
  if (userData) {
    let result = await user.comparePassword(password, userData.password)
    if (result) {
      ctx.body = {
        code: 200,
        message: '登录成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        message: '密码错误，请重试'
      }
      console.log(result)
    }
  } else {
    ctx.body = {
      code: -1,
      message: '该手机号或邮箱不存在'
    }
  }
})

export default router
