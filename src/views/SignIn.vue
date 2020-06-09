<template>
  <div class="m-sign">
    <Background></Background>
    <div class="m-container">
      <div class="m-sign-box">
        <Header :type="signType" />
        <el-row class="m-sign-body">
          <el-form :model="userInfo" ref="ruleForm" :rules="rules">
            <el-form-item>
              <el-input v-model="userInfo.mailPhone" placeholder="手机号或邮箱" style="width: 300px" prefix-icon="el-icon-mobile-phone" clearable></el-input>
              <NoticeBox v-if="validate.mailPhone.valid" :message="validate.mailPhone.message" />
            </el-form-item>
            <el-form-item>
              <el-input v-model="userInfo.password" placeholder="密码" style="width: 300px" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox v-if="validate.password.valid" :message="validate.password.message" />
            </el-form-item>
            <el-form-item>
              <div class="m-sign-remember">
                <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                <a href="/findPassword">忘记密码？</a>
              </div>
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <el-button class="sign-button" type="success" :disabled="loginForbidden" round @click="handleLogin">登录</el-button>
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
      userInfo: {
        mailPhone: '',
        password: ''
      },
      rememberMe: false,
      //  判断是注册还是登陆，注册是1，登陆是2
      signType: 2,
      loginForbidden: false,  //  禁止登录标志：默认是 false
      rules: {  //  登录表格校验规则
        mailPhone: [
          { required: true, type: 'string', message: '请输入手机号或邮箱', trigger: 'submit' }
        ],
        password: [
          { required: true, type: 'string', message: '密码', trigger: 'submit' },
        ],
      },
      validate: {
        mailPhone: {
          valid: false,
          message: ''
        },
        password: {
          valid: false,
          message: ''
        },
      },
    }
  },
  methods: {
    handleLogin () {
      let params = {
        mailPhone: this.userInfo.mailPhone,
        password: this.userInfo.password
      }
      USER.login(params).then(result => {

      })
    }
  }
}
</script>

<style>
  @import '../assets/css/public/sign-footer.scss';
  @import '../assets/css/public/sign-header.scss';
  @import '../assets/css/sign.scss';
</style>
