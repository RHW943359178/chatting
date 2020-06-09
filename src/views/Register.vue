<template>
  <div class="m-sign">
    <Background/>
    <div class="m-container">
      <div class="m-sign-box">
        <Header :type="signType" />
        <el-row class="m-sign-body">
          <el-form :model="userInfo" ref="ruleForm" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="userInfo.username" @focus="handleFocus('username')"  placeholder="你的名称" prefix-icon="el-icon-user-solid" clearable></el-input>
              <NoticeBox v-if="validate.username.valid" :message="validate.username.message" />
            </el-form-item>
            <el-form-item :prop="typeChange.prop">
              <el-input v-if="register.type === 1" @focus="handleFocus('phone')" v-model.number="userInfo.phone" placeholder="手机号" prefix-icon="el-icon-mobile-phone" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(1)">{{ register.label }}</el-button>
              </el-input>
              <el-input v-if="register.type === 2" @focus="handleFocus('email')" v-model="userInfo.email" placeholder="邮箱" prefix-icon="el-icon-message" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(2)">{{ register.label }}</el-button>
              </el-input>
              <NoticeBox v-if="typeChange.valid" :message="typeChange.message" />
            </el-form-item>
            <el-form-item prop="check" v-if="userInfo.phone || userInfo.email">
              <el-input v-model="userInfo.check" @focus="handleFocus('check')" placeholder="验证码" prefix-icon="el-icon-s-claim" clearable></el-input>
              <el-button style="position: absolute; top: 9px; right: 9px; " :disabled="checkValid() || buttonValid" type="success" size="small" round @click="sendMessage()">发送验证码</el-button>
              <NoticeBox v-if="validate.check.valid" :message="validate.check.message" />
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="userInfo.pwd" @focus="handleFocus('pwd')" placeholder="设置密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox v-if="validate.pwd.valid" :message="validate.pwd.message" />
            </el-form-item>
            <el-form-item prop="cpwd">
              <el-input v-model="userInfo.cpwd" @focus="handleFocus('cpwd')" placeholder="确认密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox v-if="validate.cpwd.valid" :message="validate.cpwd.message" />
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <el-button class="sign-button" type="success" round @click="handleRegister">注册</el-button>
        </div>
        <div class="m-register-txt">
          <p>
            点击 “注册” 即表示您同意并愿意遵守畅聊
          </p>
          <p>
            <a href="#">用户协议 </a>和<a href="#"> 隐私政策</a>。
          </p>
        </div>
        <Footer/>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../utils/regular'
import { notify, validObject } from '../utils/element'
import Background from '../components/public/sign/background.vue'
import Footer from '../components/public/sign/footer.vue'
import Header from '../components/public/sign/Header.vue'
import NoticeBox from '../components/public/NoticeBox.vue'
import USER from '../../server/api/user'
export default {
  components: {
    Background,
    Footer,
    Header,
    NoticeBox
  },
  data () {
    return {
      imgSrc: require('../../static/imgs/chat_logo.jpg'),
      userInfo: {
        username: '',
        phone: '',
        email: '',
        registerWay: '',
        check: '',
        pwd: '',
        cpwd: ''
      },
      showOff: false,
      message: '',
      signType: 1, //  判断是注册还是登陆，注册是1，登陆是2
      msgType: 1, //  注册登录页面信息提示，1 成功信息 2.警告信息 3.失败信息
      buttonValid: false, //  验证码有效期内，不允许重复发送
      register: { //  注册时使用邮箱或者手机号码 1 是手机号类；2是邮箱类
        type: 1,
        label: '邮箱',
        class: 'el-icon-message'
      },
      typeChange: { //  用于控制手机号与邮箱触发校验框控制
        prop: 'phone',
        valid: false,
        message: ''
      },
      validate: {
        username: {
          valid: false,
          message: ''
        },
        email: {
          valid: false,
          message: ''
        },
        phone: {
          valid: false,
          message: ''
        },
        check: {
          valid: false,
          message: ''
        },
        pwd: {
          valid: false,
          message: ''
        },
        cpwd: {
          valid: false,
          message: ''
        }
      },
      rules: { //  注册表格校验规则
        username: [
          { required: true, type: 'string', message: '请输入名称', trigger: 'submit' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'submit' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'submit' }
          // { required: true, pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, message: '邮箱格式不正确', trigger: 'submit' }
        ],
        phone: [
          { required: true, type: 'number', message: '请输入手机号', trigger: 'submit' },
          { pattern: util.phone, message: '手机号码格式不正确', trigger: 'submit' }
        ],
        check: [
          { required: true, type: 'string', message: '请输入验证码', trigger: 'submit' }
        ],
        pwd: [
          { required: true, type: 'string', message: '请输入密码', trigger: 'submit' }
        ],
        cpwd: [
          { required: true, type: 'string', message: '请再次输入密码', trigger: 'submit' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码').message)
              } else if (value !== this.userInfo.pwd) {
                callback(new Error('两次输入密码不一致').message)
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    //  发送验证码
    sendMessage () {
      const params = {
        username: this.userInfo.username,
        email: this.userInfo.email
      }
      USER.verify(params).then(result => {
        console.log(result, 12)
        if (result.code === 200) {
          notify(result.message, 1)
        } else if (result.code === -1) {
          notify(result.message, 2)
        } else {
          notify('验证码发送失败', 4)
        }
      })
    },
    //  注册列表邮箱、密码切换
    phoneMialChange (val) {
      if (val === 1) {
        this.register = {
          type: 2,
          label: '手机号',
          class: 'el-icon-mobile-phone'
        }
        this.typeChange = {
          prop: 'email',
          valid: this.validate.email.valid
        }
        this.$refs.ruleForm.clearValidate('phone')
        this.userInfo.phone = ''
      } else {
        this.register = {
          type: 1,
          label: '邮箱',
          class: 'el-icon-message'
        }
        this.typeChange = {
          prop: 'phone',
          valid: this.validate.phone.valid
        }
        this.$refs.ruleForm.clearValidate('email')
        this.userInfo.email = ''
      }
    },
    //  input框获取焦点之后取消验证
    handleFocus (val) {
      this.$refs.ruleForm.clearValidate(val)
      this.validate[val].valid = false
      if (val === 'phone' || val === 'email') {
        this.typeChange.valid = false
      }
    },
    //  注册验证
    handleRegister () {
      this.$refs.ruleForm.validate((valid, object) => {
        if (valid) {
          const params = {
            username: this.userInfo.username,
            mailPhone: this.register.type === 1 ? this.userInfo.phone : this.userInfo.email,
            code: this.userInfo.check,
            password: this.userInfo.pwd
          }
          USER.register(params).then(result => {
            console.log(result, 'result')
            if (result && result.code === 200) {
              notify(result.message, 1)
              location.href = '#/signin'
            } else {
              notify(result.message, 4)
            }
          })
        } else {
          const validList = validObject(object)
          for (let i = 0; i < validList.length; i++) {
            const item = validList[i]
            if (item.field === 'phone' || item.field === 'email') {
              this.typeChange.valid = true
              this.typeChange.message = item.message
            } else {
              this.validate[item.field].valid = true
              this.validate[item.field].message = item.message
            }
            break
          }
        }
      })
    },
    //  处理发送验证码按钮置灰功能，校验成功后可以点击
    checkValid () {
      if (this.register.type === 1) {
        // if ()
      } else {
        if (util.email.test(this.userInfo.email)) {
          return false
        } else {
          return true
        }
      }
    },
  }
}
</script>

<style lang="scss">
  @import '../assets/css/public/sign-footer.scss';
  @import '../assets/css/public/sign-header.scss';
  @import '../assets/css/sign.scss';
</style>
