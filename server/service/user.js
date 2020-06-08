import NodeMailer from 'nodemailer'
import Email from '../database/config'
import Redis from 'koa-redis'
/**
 * 踩坑记录：在此处引用 axios 是为了校验写库是否成功，但是不能引用已经封装过的 axios，否则会报错 document is not defined
 */
import axios from 'axios'
import qs from 'qs'

//  获取Redis客户端
let Store = new Redis().client

export const sendEmail = async ctx => {
  let transporter = NodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  //  邮箱内容
  let mailOption = {
    from: `"认证邮箱" <${Email.smtp.user}>`,
    to: ko.email,
    subject: `《畅聊网邮箱认证》 注册码`,
    html: `您在 《畅聊网邮箱认证》 中注册，您的邀请码是 ${ko.code}，有效期5分钟`
  }

  //  发送邮箱
  await transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      throw new Error(err)
    } else {
      console.log('send email success')
      Store.hmset(`nodeMail: ${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
}

/**
 * 校验写库状态
 * 判断 nUser 是否存在（判断存在之后，再使用 axios 请求登录接口用于验证，这一步的作用有待解读）
 * @param {} ctx 
 */
export const examDatabase = async (ctx, nUser) => {
  if (nUser) {
    let result = await axios.post('http://127.0.0.1:8082/api/user/register', qs.stringify({
      username: nUser.username,
      password: nUser.password
    }))
    console.log(result, 'result')
    if (result.data && result.data.code === 0) {
      ctx.body = {
        code: 200,
        message: '用户注册成功！'
      }
    } else {
      ctx.body = {
        code: -1,
        message: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      message: '注册失败'
    }
  }
}
