import NodeMailer from 'nodemailer'
import Email from '../database/config'
import Redis from 'koa-redis'

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
    email: ctx.body.email,
    user: ctx.body.username
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