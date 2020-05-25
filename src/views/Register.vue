<template>
  <div class="m-sign">
    <Background></Background>
    <div class="m-container">
      <div class="m-sign-box">
        <Header :type="signType" />
        <el-row class="m-sign-body">
          <el-form :model="userInfo" ref="ruleForm" :rules="rules">
            <el-form-item prop="username" style="">
              <el-input v-model="userInfo.username" placeholder="你的名称" style="width: 300px; position: relative" prefix-icon="el-icon-user-solid" clearable></el-input>
              <NoticeBox v-if="false"/>
            </el-form-item>
            <el-form-item prop="phoneMail">
              <el-input v-model="userInfo.phoneMail" placeholder="手机号或邮箱" style="width: 300px" prefix-icon="el-icon-mobile-phone" clearable></el-input>
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="pwd">
              <el-input v-model="userInfo.pwd" placeholder="设置密码" style="width: 300px" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox/>
            </el-form-item>
            <el-form-item prop="cpwd">
              <el-input v-model="userInfo.cpwd" placeholder="确认密码" style="width: 300px" prefix-icon="el-icon-lock" clearable></el-input>
              <NoticeBox/>
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <el-button type="success" round>注册</el-button>
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
      //  判断是注册还是登陆，注册是1，登陆是2
      signType: 1,

      //  注册表格校验规则
      rules: {
        username: [
          { required: true, type: 'string', message: '请输入名称', trigger: 'blur' }
        ]
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
