<template>
  <div class="m-sign">
    <Background></Background>
    <div class="m-container">
      <div class="m-sign-box">
        <Header :type="signType" />
        <el-row class="m-sign-body">
          <el-form :model="userInfo" ref="ruleForm" :rules="rules">
            <el-form-item prop="username" style="">
              <el-input v-model="userInfo.username" placeholder="你的名称" prefix-icon="el-icon-user-solid" clearable></el-input>
              <NoticeBox v-if="validate.userName.valid" :message="validate.userName.message" />
            </el-form-item>
            <el-form-item prop="phone" v-if="register.type === 1">
              <el-input v-model.number="userInfo.phone" placeholder="手机号" prefix-icon="el-icon-mobile-phone" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(1)">{{ register.label }}</el-button>
              </el-input>
              <NoticeBox v-if="validate.phone.valid" :message="validate.phone.message" />
            </el-form-item>
            <el-form-item prop="mail"  v-if="register.type === 2">
              <el-input v-model="userInfo.mail" placeholder="邮箱" prefix-icon="el-icon-message" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(2)">{{ register.label }}</el-button>
              </el-input>
              <NoticeBox v-if="validate.mail.valid" :message="validate.mail.message" />
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="userInfo.pwd" placeholder="设置密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox v-if="validate.pwd.valid" :message="validate.pwd.message" />
            </el-form-item>
            <el-form-item prop="cpwd">
              <el-input v-model="userInfo.cpwd" placeholder="确认密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox v-if="validate.cpwd.valid" :message="validate.cpwd.message" />
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <el-button class="sign-button" type="success" round @click="handleRegister">注册</el-button>
        </div>
        <div class="m-register-txt">
          <p>
            点击 “注册” 即表示您同意并愿意遵守简书
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
import Background from '../components/public/sign/background.vue'
import Footer from '../components/public/sign/footer.vue'
import Header from '../components/public/sign/Header.vue'
import NoticeBox from '../components/public/NoticeBox.vue'
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
        name: ''
      },
      signType: 1, //  判断是注册还是登陆，注册是1，登陆是2
      register: { //  注册时使用邮箱或者手机号码 1 是手机号类；2是邮箱类
        type: 1,
        label: '邮箱',
        class: 'el-icon-message'
      },
      validate: {
        userName: {
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
          { required: true, type: 'string', message: '请输入邮箱', trigger: 'submit' },
          { required: true, type: 'email', message: '邮箱格式不正确', trigger: 'submit' }
        ],
        phone: [
          { required: true, type: 'number', message: '请输入手机号', trigger: 'submit' },
          { required: true, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号码格式不正确', trigger: 'submit' }
        ],
        pwd: [
          { required: true, type: 'string', message: '请输入密码', trigger: 'submit' }
        ],
        cpwd: [
          { required: true, type: 'string', message: '请再次输入密码', trigger: 'submit' },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.userInfo.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    //  注册列表邮箱、密码切换
    phoneMialChange (val) {
      if (val === 1) {
        this.register = {
          type: 2,
          label: '手机号',
          class: 'el-icon-mobile-phone'
        }
      } else {
        this.register = {
          type: 1,
          label: '邮箱',
          class: 'el-icon-message'
        }
      }
    },
    //  注册验证
    handleRegister () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(2211)
        } else {
          this.$refs.ruleForm.validateField('username', valid => {
            if (valid) {
              this.validate.userName.valid = true
              this.validate.userName.message = valid
            } else {
              this.validate.userName.valid = false
            }
          })
          this.$refs.ruleForm.validateField('email', valid => {
            if (valid) {
              this.validate.email.valid = true
              this.validate.email.message = valid
            } else {
              this.validate.email.valid = false
            }
          })
          this.$refs.ruleForm.validateField('phone', valid => {
            console.log(valid)
            if (valid) {
              this.validate.phone.valid = true
              this.validate.phone.message = valid
            } else {
              this.validate.phone.valid = false
            }
          })
          this.$refs.ruleForm.validateField('pwd', valid => {
            if (valid) {
              this.validate.pwd.valid = true
              this.validate.pwd.message = valid
            } else {
              this.validate.pwd.valid = false
            }
          })
          this.$refs.ruleForm.validateField('cpwd', valid => {
            if (valid) {
              this.validate.cpwd.valid = true
              this.validate.cpwd.message = valid
            } else {
              this.validate.cpwd.valid = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/public/sign-footer.scss';
  @import '../assets/css/public/sign-header.scss';
  @import '../assets/css/sign.scss';
</style>
