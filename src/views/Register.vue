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
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="phone" v-if="register.type === 1">
              <el-input v-model="userInfo.phone" placeholder="手机号" prefix-icon="el-icon-mobile-phone" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(1)">{{ register.label }}</el-button>
              </el-input>
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="mail"  v-if="register.type === 2">
              <el-input v-model="userInfo.mail" placeholder="邮箱" prefix-icon="el-icon-message" clearable>
                <el-button slot="append" :class="register.class" @click="phoneMialChange(2)">{{ register.label }}</el-button>
              </el-input>
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="userInfo.pwd" placeholder="设置密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="cpwd">
              <el-input v-model="userInfo.cpwd" placeholder="确认密码" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox/>
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <el-button class="sign-button" type="success" round>注册</el-button>
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
      rules: { //  注册表格校验规则
        username: [
          { required: true, type: 'string', message: '请输入名称', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'string', message: '请输入邮箱', trigger: 'blur' },
          { required: true, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        phone: [
          { required: true, type: 'number', message: '请输入手机号', trigger: 'blur' },
          { required: true, pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        pwd: [
          { required: true, type: 'string', message: '请输入密码', trigger: 'blur' }
        ],
        cpwd: [
          { required: true, type: 'string', message: '请再次输入密码', trigger: 'blur' },
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
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/public/sign-footer.scss';
  @import '../assets/css/public/sign-header.scss';
  @import '../assets/css/sign.scss';
</style>
