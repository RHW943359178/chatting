<template>
  <div class="notice">
    <i class="el-icon-warning-outline"></i>
    {{ message }}
    <div class="notice-big"></div>
    <div class="notice-small"></div>
  </div>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="scss">
  @import '@/assets/css/notice.scss';
</style>
