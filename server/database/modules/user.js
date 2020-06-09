import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const SALT_WORK_FACTORY = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true,
    type: String
  },
  mailPhone: {  //  注册方式：手机注册和邮箱注册两种方式
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  lockUntil: Number,  //  锁定时间
  loginAttempts: {  //  允许用户输入错误密码最大的次数
    type: Number,
    required: true,
    default: 0
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//  虚拟字段
userSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

//  判断是否是第一次创建
userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  }
  next()
})

//  密码加盐
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(SALT_WORK_FACTORY, (err, salt) => {
    if (err) {
      return next(err)
    }
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) {
        return next(error)
      }
      this.password = hash
      next()
    })
  })
})

//  对象上methods扩展
userSchema.methods = {
  //  增加密码比较
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) {
          resolve(isMatch)
        } else {
          reject(err)
        }
      })
    })
  },
  //  设置用户密码错误锁定次数
  incLoginAttempts: user => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, err => {
          if (!err) {
            resolve(true)
          } else {
            reject(err)
          }
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && this.isLocked) {
          update.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) {
            resolve(true)
          } else {
            reject(err)
          }
        })
      }
    })
  }
}

export default mongoose.model('User', userSchema)


