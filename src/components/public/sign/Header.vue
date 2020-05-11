<template>
  <div class="m-sign-header">
    <h4>
      <a href="/signin" :class="type == 2 ? 'm-sign-active' : ''">登录</a>
      <b>·</b>
      <a href="/register" :class="type == 1 ? 'm-sign-active' : ''">注册</a>
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
