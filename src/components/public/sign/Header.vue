<template>
  <div class="m-sign-header">
    <h4>
      <router-link to="signin" :class="[type == 2 ? 'm-sign-active' : '', 'router_link']">登录</router-link>
      <b>·</b>
      <router-link to="register" :class="[type == 1 ? 'm-sign-active' : '', 'router_link']">注册</router-link>
    </h4>
  </div>
</template>

<script>
export default {
  props: ['type']
}
</script>

<style>

</style>
