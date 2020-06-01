<template>
  <div class="noticeTop">
    <div class="success" v-if="type === 1">
      测试测试测试测试测试测出删除
    </div>
    <div class="warning" v-if="type === 2">
      测试测试测试测试测试测出删除
    </div>
    <div class="error" v-if="type === 3">
      测试测试测试测试测试测出删除
    </div>
  </div>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/noticeTop.scss';
</style>
