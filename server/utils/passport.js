import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import User from '../database/modules/user'

passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  }
  let result = await User.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '用户名或密码错误')
    }
  } else {
    return done(null, false, '用户名不存在')
  }
}))

/**
 * 序列化
 */
passport.serializeUser((user, done) => {
  return done(null, user)
})

/**
 * 反序列化
 */
passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default passport
