<template>
  <div class="m-register">
    <!-- <img :src="imgSrc" alt=""> -->
    <Sign></Sign>
    <div class="m-register-box">
      <el-row class="m-register-title">
        <h4>
          <a href="">登录</a>
          <b>·</b>
          <a href="" class="m-register-active">注册</a>
        </h4>
      </el-row>
      <el-row class="m-register-body">
        <el-form>
          <el-form-item>
            <el-input v-model="userInfo.name" placeholder="你的名称" style="width: 300px" prefix-icon="el-icon-user-solid" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userInfo.name" placeholder="手机号" style="width: 300px" prefix-icon="el-icon-mobile-phone" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userInfo.name" placeholder="设置密码" style="width: 300px" prefix-icon="el-icon-lock" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="userInfo.name" placeholder="确认密码" style="width: 300px" prefix-icon="el-icon-lock" clearable></el-input>
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
      <div class="m-register-footer">
        <p>社交帐号直接注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '../components/public/sign.vue'
export default {
  components: {
    Sign
  },
  data () {
    return {
      imgSrc: require('../../static/imgs/chat_logo.jpg'),
      userInfo: {
        name: ''
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/public/sign.scss';
  @import '../assets/css/register.scss';
</style>
