<template>
  <div class="m-user">
    <el-button size="medium" @click="signIn">立即登录</el-button>
    <el-button size="medium" class="m-button-color" @click="register">免费注册</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    signIn () {
      this.$router.push('/signin')
    }
  }
}
</script>

<style>

</style>
